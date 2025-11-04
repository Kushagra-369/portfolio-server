import mongoose, { Schema } from "mongoose";
import { IPortfolio } from "../interface/all_interface";


const portfolioSchema = new Schema<IPortfolio>(
  {
    profilePhoto: { type: Object, required: false, trim: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    tools: [{ type: String, required: true }],
    githubLink: { type: String, required: true },
    deploymentLink: { type: String },
    category: { type: String, enum: ["Frontend", "Full Stack"], required: true },
  },
  { timestamps: true }
);

const Portfolio = mongoose.model<IPortfolio>("Portfolio", portfolioSchema);
export default Portfolio;
