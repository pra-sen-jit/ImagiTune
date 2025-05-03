import FormData from "form-data";
import { Readable } from "stream";

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://localhost:8000";

export const generateMusicFromImage = async (imageFile, settings, userId) => {
  try {
    // Create FormData instance
    const formData = new FormData();

    // Append file with metadata
    formData.append("image", imageFile);

    formData.append("settings", JSON.stringify(settings));
    console.log(ML_SERVICE_URL);

    const response = await fetch(`${ML_SERVICE_URL}/music/generate`, {
      method: "POST",
      body: formData,
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    });

    return response.data;
  } catch (error) {
    console.error("ML Service Error:", {
      inputData: {
        imageType: typeof imageFile,
        settingsType: typeof settings,
        userIdType: typeof userId,
      },
      error: error.response?.data || error.message,
      stack: error.stack,
    });
    throw new Error("Music generation failed");
  }
};
