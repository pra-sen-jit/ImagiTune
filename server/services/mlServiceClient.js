import axios from "axios";

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://localhost:8000";

export const generateMusicFromImage = async (imageFile, settings, userId) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile.buffer, imageFile.originalname);
    formData.append("settings", JSON.stringify(settings));

    const response = await axios.post(
      `${ML_SERVICE_URL}/api/v1/music/generate`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-User-ID": userId,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("ML Service Error:", error.response?.data || error.message);
    throw new Error("Music generation failed");
  }
};
