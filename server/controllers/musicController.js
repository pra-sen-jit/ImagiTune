import { generateMusicFromImage } from "../services/mlServiceClient.js";
import MusicGeneration from "../models/MusicGeneration.js";

export const createMusicGeneration = async (req, res) => {
  let data = req.body;
  console.log("hello");
  console.log(data);

  try {
    const imageFile = data.image; // From Multer
    const settings = data.settings; // Already parsed
    const userId = data.userId; // From auth middleware

    // if (!imageFile) {
    //   return res.status(400).json({ error: "No image file provided" });
    // }

    const result = await generateMusicFromImage(
      imageFile, // ✅ Correct file reference
      settings,
      userId // ✅ Correct user ID
    );

    // Save generation record
    const generation = new MusicGeneration({
      user: data.userId,
      imageUrl: data.file.path,
      audioUrl: result.audio_url,
      settings: settings,
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
    const generations = await MusicGeneration.find({ user: data.userId })
      .sort("-createdAt")
      .lean();

    res.json(generations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch generations" });
  }
};
