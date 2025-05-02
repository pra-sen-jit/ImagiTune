import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Play as PlayIcon,
  Pause as PauseIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  RefreshCw,
} from "lucide-react";

const Results = () => {
  const location = useLocation();
  const { imageUrl } = (location.state as { imageUrl: string }) || {
    imageUrl: null,
  };
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generationComplete, setGenerationComplete] = useState(false);

  useEffect(() => {
    // Simulate music generation
    const timer = setTimeout(() => {
      setGenerationComplete(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 300);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (percentage: number) => {
    // Assume a 3-minute song
    const totalSeconds = 180;
    const currentSeconds = Math.floor((percentage / 100) * totalSeconds);
    const minutes = Math.floor(currentSeconds / 60);
    const seconds = currentSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!imageUrl) {
    return (
      <div className="py-12 min-h-screen bg-gradient-to-br from-black via-purple-900 to-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            No Image Found
          </h1>
          <p className="mt-4 text-lg text-purple-300">
            Please upload an image to generate music.
          </p>
          <div className="mt-8">
            <Link
              to="/upload"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700"
            >
              Go to Upload
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 min-h-screen bg-gradient-to-br from-black via-purple-900 to-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Your Musical Creation
          </h1>
          <p className="mt-4 text-lg text-purple-300">
            We've transformed your image into a unique musical composition.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={imageUrl}
                alt="Uploaded"
                className="rounded-lg object-contain w-full h-64 bg-gray-900 bg-opacity-50 border border-purple-700"
              />
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-medium text-white">Image Analysis</h2>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <div className="bg-gray-900 bg-opacity-70 p-3 rounded-md border border-purple-800">
                  <div className="text-sm font-medium text-purple-300">
                    Dominant Colors
                  </div>
                  <div className="mt-1 flex space-x-2">
                    <div className="h-6 w-6 rounded-full bg-blue-500"></div>
                    <div className="h-6 w-6 rounded-full bg-purple-500"></div>
                    <div className="h-6 w-6 rounded-full bg-indigo-300"></div>
                  </div>
                </div>
                <div className="bg-gray-900 bg-opacity-70 p-3 rounded-md border border-purple-800">
                  <div className="text-sm font-medium text-purple-300">
                    Mood
                  </div>
                  <div className="mt-1 text-sm font-medium text-white">
                    Calm & Reflective
                  </div>
                </div>
                <div className="bg-gray-900 bg-opacity-70 p-3 rounded-md border border-purple-800">
                  <div className="text-sm font-medium text-purple-300">
                    Complexity
                  </div>
                  <div className="mt-1 text-sm font-medium text-white">
                    Medium
                  </div>
                </div>
                <div className="bg-gray-900 bg-opacity-70 p-3 rounded-md border border-purple-800">
                  <div className="text-sm font-medium text-purple-300">
                    Brightness
                  </div>
                  <div className="mt-1 text-sm font-medium text-white">
                    Moderate
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-gray-900 bg-opacity-70 backdrop-blur-sm p-6 rounded-lg border border-purple-800">
              <h2 className="text-lg font-medium text-white">Your Music</h2>
              {!generationComplete ? (
                <div className="mt-6 flex flex-col items-center justify-center py-8">
                  <svg
                    className="animate-spin h-10 w-10 text-purple-500"
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
                  <p className="mt-4 text-sm text-purple-300">
                    Generating your musical composition...
                  </p>
                </div>
              ) : (
                <>
                  <div className="mt-6 flex items-center justify-center">
                    <button
                      onClick={togglePlay}
                      className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      {isPlaying ? (
                        <PauseIcon className="h-8 w-8" />
                      ) : (
                        <PlayIcon className="h-8 w-8" />
                      )}
                    </button>
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-between text-sm text-purple-300">
                      <span>{formatTime(progress)}</span>
                      <span>3:00</span>
                    </div>
                    <div className="mt-1 h-2 bg-gray-800 rounded-full">
                      <div
                        className="h-full bg-purple-600 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="mt-8 grid grid-cols-3 gap-4">
                    <button className="inline-flex flex-col items-center justify-center px-4 py-3 border border-purple-700 rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 bg-opacity-50 hover:bg-gray-700">
                      <DownloadIcon className="h-5 w-5 text-purple-400" />
                      <span className="mt-1">Download</span>
                    </button>
                    <button className="inline-flex flex-col items-center justify-center px-4 py-3 border border-purple-700 rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 bg-opacity-50 hover:bg-gray-700">
                      <ShareIcon className="h-5 w-5 text-purple-400" />
                      <span className="mt-1">Share</span>
                    </button>
                    <button className="inline-flex flex-col items-center justify-center px-4 py-3 border border-purple-700 rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 bg-opacity-50 hover:bg-gray-700">
                      <RefreshCw className="h-5 w-5 text-purple-400" />
                      <span className="mt-1">Regenerate</span>
                    </button>
                  </div>
                </>
              )}
              <div className="mt-8">
                <h3 className="text-sm font-medium text-white">
                  Music Properties
                </h3>
                <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                  <div className="text-purple-100">
                    <span className="font-medium text-purple-300">Genre:</span>{" "}
                    Ambient
                  </div>
                  <div className="text-purple-100">
                    <span className="font-medium text-purple-300">Tempo:</span>{" "}
                    72 BPM
                  </div>
                  <div className="text-purple-100">
                    <span className="font-medium text-purple-300">Key:</span> C
                    Minor
                  </div>
                  <div className="text-purple-100">
                    <span className="font-medium text-purple-300">
                      Duration:
                    </span>{" "}
                    3:00
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Link
                to="/upload"
                className="inline-flex items-center px-4 py-2 border border-purple-500 text-sm font-medium rounded-md text-purple-100 bg-purple-900 bg-opacity-40 hover:bg-purple-800"
              >
                Upload Another Image
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
