const mongoose = require("mongoose");

// Sub-schema for individual projects
const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tools: [
    {
      type: String,
      required: true,
    },
  ],
  githubLink: {
    type: String,
    required: true,
  },
  deploymentLink: {
    type: String,
  },
});

// Main schema for portfolio categories
const portfolioSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["Frontend", "Full Stack"], // only these two allowed
      required: true,
    },
    profilePhoto: {
      type: String, // Store image URL (e.g. from Cloudinary, S3, etc.)
      required: false,
    },
    projects: [projectSchema], // array of project objects
  },
  { timestamps: true } // adds createdAt and updatedAt
);

// Model export
module.exports = mongoose.model("Portfolio", portfolioSchema);
