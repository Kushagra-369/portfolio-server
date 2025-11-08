import { Request, Response } from "express";
import Portfolio from "../Model/user_model";
import { IUser } from "../interface/all_interface";
import { errorHandling } from "../error/errorhandling";
import { upload_project_img, deleteImg } from '../img/upload'
import { otpVerificationAdmin } from "../mailer/user_mail"; // ✅ import your mailer
import bcrypt from 'bcrypt';

export const create_user = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ Validate inputs
    if (!name || !email || !password) {
      errorHandling({ name: "ValidationError", message: "All fields (name, email, password) are required" }, res);
      return;
    }

    // 2️⃣ Check existing user
    const existingUser = await Portfolio.findOne({ email });
    if (existingUser) {
      errorHandling({ name: "CustomError", message: "User already exists with this email" }, res);
      return;
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create user
    const newUser: Partial<IUser> = { name, email, password: hashedPassword };
    const user = await Portfolio.create(newUser);

    // 5️⃣ Generate OTP
    const randomOTP = Math.floor(100000 + Math.random() * 900000).toString(); // e.g. "472839"

    // 6️⃣ Send OTP email
    await otpVerificationAdmin(name, email, randomOTP);

    // 7️⃣ Respond to frontend
    res.status(201).json({
      status: "success",
      message: "User created successfully. OTP has been sent to your email.",
      user,
      otpSent: true,
    });
  } catch (error: any) {
    console.error("❌ Error in create_user:", error);
    errorHandling({ name: "ServerError", message: error.message || "Server error" }, res);
  }
};













// first create admin account name , email and password
// then logIn create jwt token 256 bit
// updated profile like img updated profile like name, social media links same api
