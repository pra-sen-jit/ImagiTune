import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  ImageIcon,
  MusicIcon,
  SparklesIcon,
  WandIcon,
  BrainIcon,
  SmileIcon,
  HeadphonesIcon,
} from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 dark:from-black dark:via-purple-950 dark:to-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How ImagiTune Works
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our advanced AI technology transforms your images into unique
            musical compositions through a sophisticated process of analysis and
            generation.
          </p>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-20 bg-yellow-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Process</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From image upload to musical composition in three simple steps.
            </p>
          </div>
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 hidden md:block"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Step 1 */}
              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-transform transform hover:scale-105 hover:shadow-lg duration-300 relative z-10">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <ImageIcon
                    size={32}
                    className="text-purple-600 dark:text-purple-400"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">
                  1. Upload Your Image
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  Select any image from your device or choose from our gallery
                  of sample images to get started.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-transform transform hover:scale-105 hover:shadow-lg duration-300 relative z-10">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <BrainIcon
                    size={32}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">
                  2. AI Analysis
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  Our AI analyzes your image for colors, shapes, composition,
                  and emotional elements to determine musical attributes.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-transform transform hover:scale-105 hover:shadow-lg duration-300 relative z-10">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <MusicIcon
                    size={32}
                    className="text-green-600 dark:text-green-400"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">
                  3. Generate Music
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  Our composition engine creates a unique piece of music based
                  on the analysis, which you can then download or share.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Technology
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              How our AI converts visual data into musical elements.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Image Analysis */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Image Analysis</h3>
              <div className="space-y-8">
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                      <WandIcon
                        size={20}
                        className="text-purple-600 dark:text-purple-400"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">
                      Color Processing
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Colors are mapped to musical keys and tonal qualities.
                      Warm colors like red and orange create major keys and
                      bright tones, while cool colors like blue create minor
                      keys and mellow tones.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <SparklesIcon
                        size={20}
                        className="text-blue-600 dark:text-blue-400"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">
                      Pattern Recognition
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Our AI identifies patterns, shapes, and compositional
                      elements that influence rhythm, tempo, and musical
                      structure in the final composition.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <SmileIcon
                        size={20}
                        className="text-green-600 dark:text-green-400"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">
                      Emotional Analysis
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      The AI evaluates the emotional quality of the image
                      through color psychology and composition, translating
                      these elements into musical mood and intensity.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Music Generation */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Music Generation</h3>
              <div className="space-y-8">
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                      <MusicIcon
                        size={20}
                        className="text-purple-600 dark:text-purple-400"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">
                      Melody Creation
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Based on the image analysis, our AI composes a melody that
                      reflects the dominant visual elements and emotional
                      qualities of your image.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <SparklesIcon
                        size={20}
                        className="text-blue-600 dark:text-blue-400"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">
                      Harmonic Structure
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      The AI builds a harmonic framework based on color
                      relationships in the image, creating chord progressions
                      that support the melody.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <HeadphonesIcon
                        size={20}
                        className="text-green-600 dark:text-green-400"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">
                      Instrumentation
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      The system selects appropriate instruments and timbres
                      based on the texture, detail, and style of the image to
                      create a cohesive musical experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See It In Action
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experience the transformation from image to music with our
              interactive demo.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-semibold mb-4">Try It Yourself</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Upload your own image to our demo and hear what it sounds like
                  as a musical composition. No account required to try it out.
                </p>
                <Link
                  to="/signup"
                  className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-colors self-start flex items-center"
                >
                  Try Demo <ArrowRightIcon size={18} className="ml-2" />
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur-xl opacity-20"></div>
                <div className="relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                  <img
                    src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1000&auto=format&fit=crop"
                    alt="Mountain landscape"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Mountain Sunrise</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Tranquil ambient composition
                        </p>
                      </div>
                      <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
                        <MusicIcon
                          size={20}
                          className="text-purple-600 dark:text-purple-400"
                        />
                      </button>
                    </div>
                    <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to create your own musical compositions?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Sign up today and start transforming your images into unique musical
            experiences.
          </p>
          <Link
            to="/signup"
            className="inline-block px-8 py-4 rounded-lg bg-white text-gray-900 font-medium hover:bg-gray-100 transition-colors"
          >
            Get Started for Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
