import mongoose, { Schema } from "mongoose";
import { IPortfolio } from "../../interface/all_interface";
import { ValidName } from '../../validation/AllValidation'
import multer = require("multer");


const portfolioSchema = new Schema<IPortfolio>(
  {
    profilePhoto: { type: {public_id: String,secure_url: String}, required: false, trim: true },
    name: { type: String, validate: [ValidName, "Invalid name"], required: true, unique: true },
    description: { type: String, required: true },
    tools: [{ type: String, required: true }],
    githubLink: { type: String, required: true },
    deploymentLink: { type: String },
    category: { type: String, enum: ["Frontend", "Full Stack"], required: true },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Portfolio = mongoose.model<IPortfolio>("Portfolio", portfolioSchema);
export default Portfolio;
