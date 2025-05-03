import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

// require("dotenv").config({ path: "./.env" });
import musicRoutes from "./routes/musicRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import errorHandler from "./middleware/errorMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Validate critical environment variables
const requiredEnvVars = ["MONGO_URI", "JWT_SECRET", "CLOUDINARY_CLOUD_NAME"];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(
      `❌ Error: Missing required environment variable: ${varName}`
    );
    process.exit(1);
  }
});

const app = express();

// Create a CORS options object
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://your-frontend-domain.com"
      : "http://localhost:5174",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Explicitly handle OPTIONS requests
app.options("*", cors(corsOptions)); // ⚠️ Crucial fix
app.use("/api/music", musicRoutes);

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", express.json(), authRoutes);

// Error handling
app.use(errorHandler);

// Database connection with retry logic
const connectWithRetry = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => {
      console.error(`❌ MongoDB connection error: ${err.message}`);
      console.log("⌛ Retrying connection in 5 seconds...");
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

// Server setup
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌿 Environment: ${process.env.NODE_ENV || "development"}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error(`❌ Uncaught Exception: ${err.message}`);
  server.close(() => process.exit(1));
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("💤 Process terminated");
    process.exit(0);
  });
});

export default server;
