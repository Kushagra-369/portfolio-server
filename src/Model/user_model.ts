import mongoose, { Schema } from "mongoose";
import { IUser } from "../interface/all_interface";
import { ValidName } from '../validation/AllValidation'
import multer = require("multer");


const user_Schema = new Schema<IUser>(
    {
        profileImg: { type: { public_id: String, secure_url: String }, required: false, trim: true },
        name: { type: String, validate: [ValidName, "Invalid name"], required: true, },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, },
        role: { type: String, required: true, enum: ["admin", "user"], default: "user" },
        admin: {
            isAccountActive: { type: Boolean, default: true },
            AdminOTP: { type: String, default: "0" },
            isOtpVerified: { type: String, default: false }, // Or change to Boolean if preferred
            expireOTP: { type: Date, default: null } // ✅ ADD THIS
        }
    },
    { timestamps: true }
);

const Portfolio = mongoose.model<IUser>("user", user_Schema);
export default Portfolio;
