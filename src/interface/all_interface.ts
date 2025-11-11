import { Document } from "mongoose";

export interface IPortfolio extends Document {
  name: string;
  description: string;
  tools: string[];
  githubLink: string;
  deploymentLink: string;
  socialLinks: Object[];
  category: "Frontend" | "Full Stack";
  profilePhoto: { public_id: string, secure_url: string };
  isDeleted: boolean;
  file?: Express.Multer.File;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  socialLinks: [
    { name: string, link: string },
  ];
  verification: {
    isVerified: boolean,
    verificationCode: string
    isDeleted: boolean;
  },
  role: string;
  feedback: { name: string, email: string, phone: string, message: string }
  profileImg: { public_id: string, secure_url: string };
  file?: Express.Multer.File;
  admin: {
    isAccountActive: boolean;     // ✅ just boolean
    AdminOTP: string;             // ✅ just string
    isOtpVerified: boolean;       // ✅ changed from string to boolean
    expireOTP: Date | null;       // ✅ allows null until OTP generated
  };
}

export interface IMessage extends Document {
  name: string;
  email: string;
  phoneNumber : number;
  message: string;
  isDeleted: boolean;
}