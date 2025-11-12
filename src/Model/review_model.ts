import mongoose, { Schema } from "mongoose";
import { IReview } from "../interface/all_interface";

const ReviewSchema = new Schema<IReview>(
  {
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

export default mongoose.model<IReview>("Review", ReviewSchema);
