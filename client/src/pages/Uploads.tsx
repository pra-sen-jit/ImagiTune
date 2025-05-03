import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload as UploadIcon,
  Image as ImageIcon,
  X as XIcon,
  Music,
  Settings,
  Disc,
  Gauge,
  Volume2,
  Clock,
} from "lucide-react";

const Upload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    dominant: "Acoustic Grand Piano",
    scaleType: "Major",
    noteLen: 32,
    volumeMult: 1.0,
    bpmMult: 1.0,
    rhythmComplexity: 0.5,
  });
  useEffect(() => {
    if (selectedImage) {
      console.log(selectedImage);
    } else {
      console.log("No image selected");
    }
  });

  // File handling functions
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFiles(e.dataTransfer.files[0]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFiles(e.target.files[0]);
  };

  const handleFiles = (file: File) => {
    console.log("File");
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_FILE_SIZE) {
      alert("File size exceeds 10MB limit");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setSelectedImage(e.target.result as string);
        console.log(selectedImage);
      }
    };
    reader.readAsDataURL(file);
  };

  // Submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedImage) {
      alert("Please select an image first");
      return;
    }

    // if (!fileInputRef.current?.files?.length) {
    //   alert("No file selected");
    //   return;
    // }

    const file = selectedImage;
    setProcessing(true);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("settings", JSON.stringify(settings));
      let userId = localStorage.getItem("userId");
      if (userId) {
        formData.append("userId", JSON.stringify(userId));
      }

      const response = await fetch("http://localhost:5000/api/music/generate", {
        method: "POST",
        body: formData,
        credentials: "include", // Send cookies/auth tokens
        headers: {
          // Add authorization header if using JWT
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Response:", response);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Generation failed");
      }

      const result = await response.json();

      navigate("/results", {
        state: {
          audioUrl: `http://localhost:8000${result.audio_url}`,
          bpm: result.bpm,
          instruments: result.instruments,
          duration: result.duration,
          waveform: result.waveform,
          hueHistogram: result.hue_histogram,
          imageUrl: selectedImage,
        },
      });
    } catch (error) {
      console.error("Generation error:", error);
      alert(error instanceof Error ? error.message : "Music generation failed");
    } finally {
      setProcessing(false);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="py-12 min-h-screen bg-gradient-to-br from-black via-purple-900 to-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Create Musical Art
          </h1>
          <p className="mt-4 text-lg text-purple-300">
            Transform visual beauty into auditory experience
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Left Column - Upload Section */}
          <div className="lg:col-span-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 transition-all
                  ${
                    dragActive
                      ? "border-purple-500 bg-purple-900/30"
                      : "border-purple-700 bg-gray-900/50"
                  }
                  ${selectedImage ? "h-64" : "h-96"}`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
              >
                {!selectedImage ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-4">
                    <ImageIcon className="h-16 w-16 text-purple-400" />
                    <div className="text-center">
                      <label className="cursor-pointer text-purple-400 hover:text-purple-300">
                        <span className="font-medium">Select image</span>
                        <input
                          id="file-upload"
                          ref={fileInputRef}
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleChange}
                        />
                      </label>
                      <p className="mt-2 text-sm text-gray-400">
                        or drag and drop
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-full">
                    <img
                      src={selectedImage}
                      alt="Preview"
                      className="w-full h-full object-contain rounded-md"
                    />
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute top-2 right-2 p-1 bg-gray-900/70 rounded-full hover:bg-gray-800"
                    >
                      <XIcon className="h-5 w-5 text-purple-400" />
                    </button>
                  </div>
                )}
              </div>

              {/* Music Settings Controls */}
              <div className="space-y-4 bg-gray-900/50 p-6 rounded-lg">
                <h3 className="flex items-center text-lg font-medium text-white">
                  <Settings className="mr-2 h-5 w-5" />
                  Composition Settings
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="flex items-center text-sm text-purple-300">
                      <Music className="mr-2 h-4 w-4" />
                      Lead Instrument
                    </label>
                    <select
                      value={settings.dominant}
                      onChange={(e) =>
                        setSettings({ ...settings, dominant: e.target.value })
                      }
                      className="w-full bg-gray-800 text-white rounded-md p-2 border border-purple-700 focus:ring-2 focus:ring-purple-500"
                    >
                      {Object.keys(INSTRUMENT_MAP).map((instrument) => (
                        <option key={instrument} value={instrument}>
                          {instrument}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center text-sm text-purple-300">
                        <Disc className="mr-2 h-4 w-4" />
                        Scale Type
                      </label>
                      <select
                        value={settings.scaleType}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            scaleType: e.target.value,
                          })
                        }
                        className="w-full bg-gray-800 text-white rounded-md p-2 border border-purple-700"
                      >
                        {Object.keys(SCALE_MODES).map((scale) => (
                          <option key={scale} value={scale}>
                            {scale}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center text-sm text-purple-300">
                        <Clock className="mr-2 h-4 w-4" />
                        Note Count
                      </label>
                      <input
                        type="number"
                        min="8"
                        max="128"
                        value={settings.noteLen}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            noteLen: Number(e.target.value),
                          })
                        }
                        className="w-full bg-gray-800 text-white rounded-md p-2 border border-purple-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center text-sm text-purple-300">
                      <Volume2 className="mr-2 h-4 w-4" />
                      Volume Multiplier
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="3"
                      step="0.1"
                      value={settings.volumeMult}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          volumeMult: Number(e.target.value),
                        })
                      }
                      className="w-full accent-purple-500"
                    />
                    <span className="text-xs text-purple-400">
                      {settings.volumeMult}x
                    </span>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center text-sm text-purple-300">
                      <Gauge className="mr-2 h-4 w-4" />
                      Tempo Multiplier
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="3"
                      step="0.1"
                      value={settings.bpmMult}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          bpmMult: Number(e.target.value),
                        })
                      }
                      className="w-full accent-purple-500"
                    />
                    <span className="text-xs text-purple-400">
                      {settings.bpmMult}x
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={!selectedImage || processing}
                className={`w-full py-3 px-6 rounded-md font-medium transition-all
                  ${
                    processing || !selectedImage
                      ? "bg-purple-800/50 text-gray-400 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  }`}
              >
                {processing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin mr-3">
                      <Disc className="h-5 w-5" />
                    </div>
                    Composing Your Masterpiece...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <UploadIcon className="mr-2 h-5 w-5" />
                    Generate Music
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Right Column - Tips Section */}
          <div className="lg:col-span-1 bg-gray-900/50 p-6 rounded-lg h-fit">
            <h3 className="flex items-center text-lg font-medium text-white mb-4">
              <Music className="mr-2 h-5 w-5 text-purple-400" />
              Composition Tips
            </h3>
            <ul className="space-y-4 text-sm text-purple-300">
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                High contrast images create more dynamic rhythm patterns
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Warm colors tend to produce higher pitched melodies
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Complex textures generate richer harmonic content
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Vertical lines influence tempo, horizontal lines affect sustain
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Experiment with different instrument combinations
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Constants matching your ML model
const INSTRUMENT_MAP = {
  "Acoustic Grand Piano": 0,
  "Electric Guitar (jazz)": 26,
  "Acoustic Guitar (nylon)": 24,
  Violin: 40,
  Trumpet: 56,
  "Alto Sax": 65,
  Flute: 73,
  "Synth Pad": 88,
  "Steel Drums": 114,
  "Drum Kit": 118,
};

const SCALE_MODES = {
  Major: [0, 2, 4, 5, 7, 9, 11],
  "Natural Minor": [0, 2, 3, 5, 7, 8, 10],
  Pentatonic: [0, 3, 5, 7, 10],
  Blues: [0, 3, 5, 6, 7, 10],
  Dorian: [0, 2, 3, 5, 7, 9, 10],
};

export default Upload;
