import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Play,
  Pause,
  Volume2,
  Disc,
  Music,
  Palette,
  Gauge,
  Clock,
  X,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [volume, setVolume] = React.useState(1.0);

  // Get state from navigation
  const {
    audioUrl,
    bpm,
    instruments,
    duration,
    waveform,
    hueHistogram,
    imageUrl,
  } = location.state || {};

  // Redirect if missing state
  useEffect(() => {
    if (!location.state) {
      navigate("/upload");
    }
  }, [location.state, navigate]);

  // Audio controls
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  if (!location.state) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate("/upload")}
          className="mb-8 text-purple-400 hover:text-purple-300 flex items-center"
        >
          <X className="mr-2 h-5 w-5" /> Back to Upload
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image and Audio Controls */}
          <div className="space-y-8">
            <div className="bg-gray-900/50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                Original Image
              </h2>
              <img
                src={imageUrl}
                alt="Source"
                className="w-full h-96 object-contain rounded-lg border border-purple-700"
              />
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Music className="mr-2 h-6 w-6 text-purple-400" />
                Music Player
              </h2>

              <audio
                ref={audioRef}
                src={audioUrl}
                onEnded={() => setIsPlaying(false)}
              />

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={togglePlay}
                    className="p-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {isPlaying ? (
                      <Pause className="h-6 w-6" />
                    ) : (
                      <Play className="h-6 w-6" />
                    )}
                  </button>

                  <div className="flex-1">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-full accent-purple-500"
                    />
                    <div className="flex justify-between text-purple-300 text-sm">
                      <span>Volume</span>
                      <span>{Math.round(volume * 100)}%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <WaveformVisualization
                    waveform={waveform}
                    isPlaying={isPlaying}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Visualizations and Info */}
          <div className="space-y-8">
            <div className="bg-gray-900/50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Palette className="mr-2 h-6 w-6 text-purple-400" />
                Color Analysis
              </h2>
              <HueHistogram data={hueHistogram} />
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Disc className="mr-2 h-6 w-6 text-purple-400" />
                Composition Details
              </h2>

              <div className="grid grid-cols-2 gap-4 text-purple-300">
                <div className="flex items-center space-x-2">
                  <Gauge className="h-5 w-5" />
                  <span>{bpm} BPM</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>{Math.round(duration)} seconds</span>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-medium text-white mb-2">
                  Instruments Used
                </h3>
                <ul className="space-y-2 text-purple-300">
                  {instruments.map((instrument: string, index: number) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Music className="h-4 w-4" />
                      <span>{instrument}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Waveform Visualization Component
const WaveformVisualization = ({
  waveform,
  isPlaying,
}: {
  waveform: number[];
  isPlaying: boolean;
}) => (
  <div className="relative h-32 w-full bg-gray-800 rounded-lg overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-between px-4">
      {waveform.map((value, index) => (
        <div
          key={index}
          className="h-full w-1 bg-purple-500 transition-all duration-300 ease-in-out"
          style={{
            height: `${Math.abs(value) * 100}%`,
            opacity: isPlaying ? 0.8 : 0.4,
            transform: `scaleY(${isPlaying ? 1.2 : 1})`,
          }}
        />
      ))}
    </div>
  </div>
);

// Hue Histogram Component
const HueHistogram = ({ data }: { data: number[] }) => (
  <BarChart
    width={500}
    height={300}
    data={data.map((value, index) => ({ hue: index * 15, value }))}
    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
  >
    <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
    <XAxis
      dataKey="hue"
      label={{ value: "Hue Angle", position: "bottom" }}
      tickFormatter={(value) => `${value}°`}
      stroke="#9F7AEA"
    />
    <YAxis stroke="#9F7AEA" />
    <Tooltip
      contentStyle={{ backgroundColor: "#1A202C", border: "none" }}
      itemStyle={{ color: "#9F7AEA" }}
      formatter={(value: number) => [value.toFixed(2), "Intensity"]}
    />
    <Bar dataKey="value" fill="#9F7AEA" radius={[4, 4, 0, 0]} />
  </BarChart>
);

export default Results;
