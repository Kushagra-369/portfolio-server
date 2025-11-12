import mongoose, { Schema } from "mongoose";
import { ValidName } from '../validation/AllValidation'
import multer = require("multer");
import { IAdmin } from "../interface/all_interface";

const AdminSchema = new Schema<IAdmin>(
    {
        name: { type: String, required: true },
        isDeleted: { type: Boolean, default: false },
        resume: {
            public_id: { type: String, required: true },
            secure_url: { type: String, required: true },
            format: { type: String, default: "pdf" },
        },
        socialLinks: [
            {
                name: { type: String, required: true },
                link: { type: String, required: true },
            },
        ],
        profileImg: {
            public_id: { type: String, required: true },
            secure_url: { type: String, required: true },
        },
    },
    { timestamps: true }
);

export default mongoose.model<IAdmin>("Admin", AdminSchema);