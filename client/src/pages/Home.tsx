import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  MusicIcon,
  ImageIcon,
  SparklesIcon,
  ZapIcon,
  StarIcon,
} from "lucide-react";
const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 dark:from-black dark:via-purple-950 dark:to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Transform Images Into
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Musical Experiences
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-lg">
                Our AI-powered platform converts visual elements from your
                images into unique musical compositions tailored to match the
                mood and essence of your pictures.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/how-it-works"
                  className="px-6 py-3 rounded-lg bg-white text-gray-900 font-medium hover:bg-gray-100 hover:shadow-md hover:scale-105 transition-all duration-300 flex items-center justify-center"
                >
                  Learn More
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 hover:shadow-md hover:scale-105 transition-all duration-300 flex items-center justify-center"
                >
                  Get Started <ArrowRightIcon size={18} className="ml-2" />
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
                <div className="relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
                  <img
                    src="https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1000&auto=format&fit=crop"
                    alt="Image to music conversion visualization"
                    className="w-full h-64 object-cover opacity-80"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/50 backdrop-blur-sm p-4 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <ImageIcon size={24} className="text-purple-400" />
                        <div className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                        <MusicIcon size={24} className="text-blue-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="bg-yellow-50 dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How ImagiTune Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our advanced AI analyzes the visual elements of your images to
              create custom musical compositions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-transform transform hover:scale-105 hover:shadow-lg duration-300">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-6">
                <ImageIcon
                  size={24}
                  className="text-purple-600 dark:text-purple-400"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">Upload Your Image</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Upload any image you'd like to transform into music. Our AI
                works with landscapes, portraits, abstract art, and more.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-transform transform hover:scale-105 hover:shadow-lg duration-300">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
                <SparklesIcon
                  size={24}
                  className="text-blue-600 dark:text-blue-400"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Analysis</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our powerful AI analyzes colors, shapes, composition, and
                emotional elements in your image to determine musical
                attributes.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-transform transform hover:scale-105 hover:shadow-lg duration-300">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                <MusicIcon
                  size={24}
                  className="text-green-600 dark:text-green-400"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">Receive Your Music</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Download a unique musical composition that captures the essence
                and emotion of your image in audio form.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              ImagiTune offers advanced tools to create the perfect audio
              representation of your images.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex">
              <div className="mr-4">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <ZapIcon
                    size={20}
                    className="text-purple-600 dark:text-purple-400"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Multiple Music Styles
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose from various musical genres and styles to match your
                  preferences and the mood of your image.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <StarIcon
                    size={20}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Customizable Output
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Adjust the length, tempo, and complexity of your musical
                  composition to suit your needs.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <MusicIcon
                    size={20}
                    className="text-green-600 dark:text-green-400"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  High-Quality Audio
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Download your compositions in high-quality audio formats ready
                  for sharing or professional use.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4">
                <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                  <SparklesIcon
                    size={20}
                    className="text-amber-600 dark:text-amber-400"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Batch Processing</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Transform multiple images at once and create cohesive musical
                  collections from your photo albums.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to transform your images into music?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already using ImagiTune to create
            unique musical experiences.
          </p>
          <Link
            to="/signup"
            className="inline-block px-8 py-4 rounded-lg bg-white text-gray-900 font-medium hover:bg-gray-100 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};
export default Home;
