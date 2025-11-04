import { Document } from "mongoose";

export interface IPortfolio extends Document {
  name: string;
  description: string;
  tools: string[];
  githubLink: string;
  deploymentLink: string;
  category: "Frontend" | "Full Stack";
  profilePhoto: Object;
}
