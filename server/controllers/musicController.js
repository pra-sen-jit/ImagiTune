import { generateMusicFromImage } from "../services/mlServiceClient";
import MusicGeneration from "../models/MusicGeneration";

export const createMusicGeneration = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    // Process with ML service
    const result = await generateMusicFromImage(
      req.file,
      req.body.settings,
      req.user._id
    );

    // Save generation record
    const generation = new MusicGeneration({
      user: req.user._id,
      imageUrl: req.file.path,
      audioUrl: result.audio_url,
      settings: req.body.settings,
    });

    await generation.save();

    res.json({
      audioUrl: result.audio_url,
      bpm: result.bpm,
      instruments: result.instruments,
      duration: result.duration,
      waveform: result.waveform,
      hueHistogram: result.hue_histogram,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message || "Music generation failed",
    });
  }
};

export const getUserGenerations = async (req, res) => {
  try {
    const generations = await MusicGeneration.find({ user: req.user._id })
      .sort("-createdAt")
      .lean();

    res.json(generations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch generations" });
  }
};
