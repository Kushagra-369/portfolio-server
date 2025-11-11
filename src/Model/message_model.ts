import mongoose, { Schema } from "mongoose";
import { IMessage } from "../interface/all_interface";
import { ValidName } from '../validation/AllValidation'
import multer = require("multer");


const message_Schema = new Schema<IMessage>(
    {
        name: { type: String, validate: [ValidName, "Invalid name"], required: true, },
        email: { type: String, required: true, unique: true },
        message: { type: String, required: true,},
        phoneNumber: { type: Number, required: false, },
        isDeleted: { type: Boolean, default: false }
    },
    { timestamps: true }
);

const Message = mongoose.model<IMessage>("message", message_Schema);
export default Message;
