import express from "express";
import {
  createMusicGeneration,
  getUserGenerations,
} from "../controllers/musicController.js";
import upload from "../middleware/uploadMiddleware.js";
import { rateLimit } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post(
  "/generate",
  rateLimit(5, 60), // Rate limiting
  upload.single("image"), // File upload
  // (req, res, next) => {
  //   try {
  //     req.body.settings = JSON.parse(req.body.settings);
  //     next();
  //   } catch (err) {
  //     return res.status(400).json({ error: "Invalid settings format" });
  //   }
  // },
  createMusicGeneration
);

router.get("/history", getUserGenerations); // Added protect here too

export default router;
