import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload as UploadIcon,
  Image as ImageIcon,
  X as XIcon,
} from "lucide-react";

const Upload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  const handleFiles = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setSelectedImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) return;
    setProcessing(true);
  
    const inputFile = document.getElementById("file-upload") as HTMLInputElement;
    if (!inputFile || !inputFile.files || inputFile.files.length === 0) return;
  
    const formData = new FormData();
    formData.append("image", inputFile.files[0]);
  
    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      setProcessing(false);
  
      if (response.ok) {
        navigate("/results", {
          state: {
            imageUrl: data.image_url,
          },
        });
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong while uploading.");
      setProcessing(false);
    }
  };
  

  const clearImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="py-12 min-h-screen bg-gradient-to-br from-black via-purple-900 to-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Upload Your Image
          </h1>
          <p className="mt-4 text-lg text-purple-300">
            Upload any image and our AI will transform it into a unique musical
            composition.
          </p>
        </div>
        <div className="mt-12">
          <form onSubmit={handleSubmit}>
            {!selectedImage ? (
              <div
                className={`max-w-lg mx-auto flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md 
                  ${
                    dragActive
                      ? "border-purple-500 bg-purple-900 bg-opacity-30"
                      : "border-purple-700 bg-gray-900 bg-opacity-50"
                  }`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
              >
                <div className="space-y-1 text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-purple-400" />
                  <div className="flex text-sm text-gray-300">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-transparent rounded-md font-medium text-purple-400 hover:text-purple-300 focus-within:outline-none"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-400">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            ) : (
              <div className="max-w-lg mx-auto">
                <div className="relative">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-full h-64 object-contain rounded-md border border-purple-700 bg-gray-900 bg-opacity-50"
                  />
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute top-2 right-2 bg-gray-900 bg-opacity-70 rounded-full p-1 shadow-md hover:bg-gray-800"
                  >
                    <XIcon className="h-5 w-5 text-purple-400" />
                  </button>
                </div>
              </div>
            )}
            <div className="mt-8 text-center">
              <button
                type="submit"
                disabled={!selectedImage || processing}
                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white 
                  ${
                    !selectedImage || processing
                      ? "bg-purple-800 bg-opacity-50 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700"
                  }`}
              >
                {processing ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Your Music...
                  </>
                ) : (
                  <>
                    <UploadIcon className="-ml-1 mr-2 h-5 w-5" />
                    Generate Music
                  </>
                )}
              </button>
            </div>
          </form>
          <div className="mt-12 bg-gray-900 bg-opacity-70 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-lg font-medium text-white">
              Tips for best results:
            </h2>
            <ul className="mt-4 text-sm text-purple-300 list-disc list-inside space-y-2">
              <li>Use high-quality images with clear subjects</li>
              <li>
                Images with strong colors and contrast create more dynamic music
              </li>
              <li>
                Landscapes, abstract art, and portraits work particularly well
              </li>
              <li>
                Very dark or very bright images may produce more subtle
                compositions
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
