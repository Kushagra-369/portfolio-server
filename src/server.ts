import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/routes";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = Number(process.env.PORT) || 1080;
const mongoURL = process.env.MongoDBURL;

if (!mongoURL) {
  throw new Error("MongoDB connection URL (MongoDBURL) not found in .env file");
}

// Simple root route / health check
app.get("/", (_req, res) => {
  res.send("✅ Backend is running (root route).");
});

// other routes
app.use("/api", router); // recommend namespacing API routes under /api

mongoose.connect(mongoURL)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🌐 Server is running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  });
