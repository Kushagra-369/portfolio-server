import { Request, Response } from "express";
import Message from "../Model/message_model";
import { IMessage , IReview } from "../interface/all_interface";
import { errorHandling } from "../error/errorhandling";
import Review from "../Model/review_model"; // your mongoose model

export const create_message = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: IMessage = req.body;

    if (!data.name || !data.email || !data.message) {
      res.status(400).json({ error: "Name, email, and message are required." });
      return;
    }

    const newMessage = new Message({
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      message: data.message,
    });

    await newMessage.save();

    res.status(201).json({ message: "Message created successfully", data: newMessage });
  } catch (error) {
    errorHandling(error, res);
  }
};

export const get_all_messages = async (req: Request, res: Response): Promise<void> => {
  try {
    const messages = await Message.find({ isDeleted: false }).sort({ createdAt: -1 });
    res.status(200).json({ messages });
  } catch (error) {
    errorHandling(error, res);
  }
};


export const delete_message = async (req: Request, res: Response): Promise<void> => {
  try {
    const messageId = req.params.id;
    await Message.findByIdAndUpdate(messageId, { isDeleted: true });
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    errorHandling(error, res);
  }
};

export const send_rating = async (req: Request, res: Response): Promise<void> => {
  try {
    const { rating }: { rating?: number } = req.body;

    // Validate rating
    if (rating === undefined || rating === null) {
      res.status(400).json({ error: "Rating is required." });
      return;
    }

    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      res.status(400).json({ error: "Rating must be a number between 1 and 5." });
      return;
    }

    // Create and save review
    const newReview = new Review({ rating });

    await newReview.save();

    res.status(201).json({
      success: true,
      message: "Rating submitted successfully.",
      data: newReview,
    });
  } catch (error) {
    errorHandling(error, res);
  }
};

export const get_ratings = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await Review.find();

    const totalRatings = reviews.length;
    const averageRating =
      totalRatings > 0
        ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / totalRatings
        : 0;

    res.status(200).json({
      success: true,
      totalRatings,
      averageRating: parseFloat(averageRating.toFixed(1)),
      reviews,
    });
  } catch (error) {
    errorHandling(error, res);
  }
};

