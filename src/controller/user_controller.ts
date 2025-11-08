import { Request, Response } from "express";
import Portfolio from "../Model/user_model";
import { IUser } from "../interface/all_interface";
import { errorHandling } from "../error/errorhandling";
import { otpVerificationAdmin } from "../mailer/user_mail";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const create_admin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      errorHandling(
        { name: "ValidationError", message: "All fields (name, email, password) are required" },
        res
      );
      return;
    }

    // 1️⃣ Generate 4-digit OTP & expiry (5 min)
    const randomOTP = Math.floor(1000 + Math.random() * 9000).toString();
    const expireOTPAt = new Date(Date.now() + 5 * 60 * 1000);

    // 2️⃣ Check if admin already exists → update OTP
    const existingAdmin = await Portfolio.findOneAndUpdate(
      { email },
      {
        $set: {
          role: "admin",
          "admin.AdminOTP": randomOTP,
          "admin.expireOTP": expireOTPAt,
          "admin.isOtpVerified": "0",
        },
      },
      { new: true }
    );

    if (existingAdmin) {
      await otpVerificationAdmin(existingAdmin.name, existingAdmin.email, randomOTP);

      res.status(200).json({
        status: "success",
        message: "OTP sent successfully to existing admin email.",
        user: existingAdmin,
        otpSent: true,
      });
      return;
    }

    // 3️⃣ Create new admin
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin: Partial<IUser> = {
      name,
      email,
      password: hashedPassword,
      role: "admin", // ✅ force admin role
      admin: {
        isAccountActive: true,
        AdminOTP: randomOTP,
        isOtpVerified: false,
        expireOTP: expireOTPAt,
      },
    };

    const admin = await Portfolio.create(newAdmin);

    // 4️⃣ Send OTP email
    await otpVerificationAdmin(name, email, randomOTP);

    // 5️⃣ Respond
    res.status(201).json({
      status: "success",
      message: "Admin created successfully. OTP has been sent to your email.",
      user: admin,
      otpSent: true,
    });
  } catch (error: any) {
    console.error("❌ Error in create_admin:", error);
    errorHandling({ name: "ServerError", message: error.message || "Server error" }, res);
  }
};


export const verify_admin_otp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { otp } = req.body;

    // 1️⃣ Validate OTP
    if (!otp) {
      res.status(400).json({ status: "fail", message: "OTP is required" });
      return;
    }

    // 2️⃣ Find admin by OTP
    const admin = await Portfolio.findOne({
      "admin.AdminOTP": String(otp),
      $or: [{ role: "admin" }, { "admin.AdminOTP": { $exists: true } }],
    });

    if (!admin) {
      res.status(404).json({ status: "fail", message: "Invalid or expired OTP" });
      return;
    }

    // 3️⃣ Check expiry
    if (admin.admin.expireOTP && new Date(admin.admin.expireOTP) < new Date()) {
      res.status(400).json({ status: "fail", message: "OTP has expired. Please request a new one." });
      return;
    }

    // 4️⃣ Mark as verified
    admin.admin.isOtpVerified = true;
    admin.admin.AdminOTP = "0"; // clear OTP
    await admin.save();

    // 5️⃣ Generate JWT
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_Admin_SECRET_KEY as string,
      { expiresIn: "1h" }
    );

    // 6️⃣ Respond success
    res.status(200).json({
      status: "success",
      message: "OTP verified successfully. Admin logged in.",
      token,
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        isOtpVerified: admin.admin.isOtpVerified,
      },
    });
  } catch (error: any) {
    console.error("❌ Error in verify_admin_otp:", error);
    res.status(500).json({ status: "error", message: error.message || "Server error" });
  }
};


