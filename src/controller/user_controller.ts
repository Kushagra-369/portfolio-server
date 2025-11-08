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

        if (!name || !email || !password) {
            errorHandling(
                { name: "ValidationError", message: "All fields (name, email, password) are required" },
                res
            );
            return;
        }

        // 2️⃣ Generate OTP and expiry time
        const randomOTP = Math.floor(1000 + Math.random() * 9000).toString();
        const expireOTPAt = new Date(Date.now() + 5 * 60 * 1000); 


        // 3️⃣ Check if user already exists → update OTP if exists
        const existingUser = await Portfolio.findOneAndUpdate(
            { email },
            {
                $set: {
                    "admin.AdminOTP": randomOTP,
                    "admin.expireOTP": expireOTPAt,
                    "admin.isOtpVerified": "0",
                },
            },
            { new: true }
        );

        if (existingUser) {
            await otpVerificationAdmin(existingUser.name, existingUser.email, randomOTP);

            res.status(200).json({
                status: "success",
                message: "OTP sent successfully to existing user email.",
                user: existingUser,
                otpSent: true,
            });
            return;
        }

        // 4️⃣ If new user → hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser: Partial<IUser> = {
            name,
            email,
            password: hashedPassword,
            admin: {
                isAccountActive: true,
                AdminOTP: randomOTP,
                isOtpVerified: false,
                expireOTP: expireOTPAt,
            },
        };

        const user = await Portfolio.create(newUser);

        // 5️⃣ Send OTP email
        await otpVerificationAdmin(name, email, randomOTP);

        // 6️⃣ Respond
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
