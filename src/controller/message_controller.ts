import { Request, Response } from "express";
import Message from "../Model/message_model";
import { IMessage } from "../interface/all_interface";
import { errorHandling } from "../error/errorhandling";

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