import mongoose from "mongoose";

const musicGenerationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  audioUrl: {
    type: String,
    required: true,
  },
  settings: {
    dominantInstrument: String,
    scaleType: String,
    noteLength: Number,
    bpmMultiplier: Number,
    volumeMultiplier: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("MusicGeneration", musicGenerationSchema);
