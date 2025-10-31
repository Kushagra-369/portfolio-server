import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURL = process.env.MongoDBURL;

if (!mongoURL) {
  throw new Error("❌ MongoDB connection URL (MongoDBURL) not found in .env file");
}

// Connect to MongoDB and start the server
mongoose
  .connect(mongoURL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ MongoDB connection failed:", error.message));

   app.listen(PORT, () => console.log(`🌐 Server is running on port ${PORT}`));