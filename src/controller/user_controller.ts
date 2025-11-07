import { Request, Response } from "express";
import Portfolio from "../Model/user_model";
import { IUser } from "../interface/all_interface";
import { errorHandling } from "../error/errorhandling";
import { upload_project_img, deleteImg } from '../img/upload'
import bcrypt from 'bcrypt';

export const create_user = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            errorHandling({ name: "ValidationError", message: "All fields (name, email, password) are required" }, res);
            return;
        }

        const existingUser = await Portfolio.findOne({ email });
        if (existingUser) {
            errorHandling({ name: "CustomError", message: "User already exists with this email" }, res);
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser: Partial<IUser> = {
            name,
            email,
            password: hashedPassword,
        };

        const user = await Portfolio.create(newUser);

        res.status(201).json({
            status: "success",
            message: "User created successfully",
            user,
        });
    } catch (error: any) {
        errorHandling({ name: "ServerError", message: error.message || "Server error" }, res);
    }
}













// first create admin account name , email and password
// then logIn create jwt token 256 bit
// updated profile like img updated profile like name, social media links same api
