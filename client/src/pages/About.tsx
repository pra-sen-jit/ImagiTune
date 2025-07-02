import { AwardIcon, BookOpenIcon, UsersIcon, HeartIcon } from "lucide-react";
import PremImage from '../photo/prem.jpeg';
import PrasenjitImage from '../photo/prasenjit.jpeg';
import GauravImage from '../photo/gaurav.jpeg';
import OliviaImage from '../photo/olivia.jpeg';

const About = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 dark:from-black dark:via-purple-950 dark:to-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About ImagiTune
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're on a mission to revolutionize the way people experience visual
            art through the power of music.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 font-serif dark:text-gray-400 mb-4">
                ImagiTune began with a simple question: What if we could hear
                what we see? Our founder, a synesthete who experiences sound and
                color as intertwined sensations, wanted to share this unique
                perception with the world.
              </p>
              <p className="text-gray-600 font-serif dark:text-gray-400 mb-4">
                Founded in 2021, our team of musicians, AI researchers, and
                visual artists came together to create technology that bridges
                the gap between visual and auditory experiences.
              </p>
              <p className="text-gray-600 font-serif dark:text-gray-400">
                Today, ImagiTune serves creators, educators, therapists, and
                curious minds who want to explore the relationship between
                images and sound in new and exciting ways.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur-xl opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
                alt="The AudioVision team collaborating"
                className="relative rounded-lg shadow-lg w-full h-auto transition-transform duration-300 transform hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
      <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        The principles that guide our work and shape our company culture.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/** Value Card */}
      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-transform transform hover:scale-105 hover:shadow-lg duration-300">
        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-6">
          <BookOpenIcon size={24} className="text-purple-600 dark:text-purple-400" />
        </div>
        <h3 className="text-xl font-semibold mb-3">Innovation</h3>
        <p className="text-gray-600 dark:text-gray-400">
          We push the boundaries of what's possible at the intersection of AI, music, and visual art.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transform transition duration-300 hover:shadow-md hover:scale-[1.03]">
        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
          <UsersIcon size={24} className="text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-xl font-semibold mb-3">Inclusivity</h3>
        <p className="text-gray-600 dark:text-gray-400">
          We design our technology to be accessible to everyone, regardless of musical or technical background.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transform transition duration-300 hover:shadow-md hover:scale-[1.03]">
        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
          <AwardIcon size={24} className="text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-xl font-semibold mb-3">Excellence</h3>
        <p className="text-gray-600 dark:text-gray-400">
          We strive for the highest quality in both our technology and the artistic experiences we create.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transform transition duration-300 hover:shadow-md hover:scale-[1.03]">
        <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-6">
          <HeartIcon size={24} className="text-amber-600 dark:text-amber-400" />
        </div>
        <h3 className="text-xl font-semibold mb-3">Creativity</h3>
        <p className="text-gray-600 dark:text-gray-400">
          We believe in the power of creative expression to transform how we understand and connect with the world.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* Team Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The passionate individuals behind ImagiTune's innovative
              technology.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Prasenjit Datta */}
  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden">
    <img
      src={PrasenjitImage}
      alt="Prasenjit Datta"
      className="w-full h-64 object-cover transition-transform duration-300 transform hover:scale-105"
    />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-1">Prasenjit Datta</h3>
      <p className="text-blue-600 dark:text-blue-400 mb-4">Team Leader</p>
      {/* <p className="text-gray-600 dark:text-gray-400">
        AI engineer with extensive experience in machine learning
        models for creative applications.
      </p> */}
    </div>
  </div>


  {/* Prem Ghosh */}
  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden">
    <img
      src={PremImage}
      alt="Prem Ghosh"
      className="w-full h-64 object-cover transition-transform duration-300 transform hover:scale-105"
    />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-1">Prem Ghosh</h3>
      <p className="text-purple-600 dark:text-purple-400 mb-4">
        Team Member
      </p>
      {/* <p className="text-gray-600 dark:text-gray-400">
        Music producer and AI researcher with a passion for exploring
        the connections between different sensory experiences.
      </p> */}
    </div>
  </div>

  
  {/* Maya Rodriguez */}
  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden">
    <img
      src={OliviaImage}
      alt="Olivia chatterjee"
      className="w-full h-64 object-cover transition-transform duration-300 transform hover:scale-105"
    />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-1">Olivia Chatterjee</h3>
      <p className="text-purple-600 dark:text-purple-400 mb-4">
        Team Member
      </p>
      {/* <p className="text-gray-600 dark:text-gray-400">
        Visual artist and composer who brings a unique perspective to
        our image-to-music algorithms.
      </p> */}
    </div>
  </div>

  {/* Gaurav Majumder */}
  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden">
    <img
      src={GauravImage}
      alt="Gaurav Majumder"
      className="w-full h-64 object-cover transition-transform duration-300 transform hover:scale-105"
    />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-1">Gaurav Majumder</h3>
      <p className="text-purple-600 dark:text-purple-400 mb-4">
        Team Member
      </p>
      {/* <p className="text-gray-600 dark:text-gray-400">
        Full-stack developer specializing in building scalable web applications for creative AI systems.
      </p> */}
    </div>
  </div>
</div>

        </div>
      </section>
    </div>
  );
};

export default About;
