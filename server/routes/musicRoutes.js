import express from "express";
import {
  createMusicGeneration,
  getUserGenerations,
} from "../controllers/musicController";
import { protect } from "../middleware/authMiddleware";
import upload from "../middleware/uploadMiddleware";
import rateLimit from "../middleware/rateLimiter";

const router = express.Router();

router.post(
  "/generate",
  protect,
  rateLimit(5, 60), // 5 requests per minute
  upload.single("image"),
  createMusicGeneration
);

router.get("/history", protect, getUserGenerations);

export default router;
