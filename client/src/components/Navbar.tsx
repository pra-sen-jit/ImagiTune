import { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // ← added useLocation
import { useTheme } from "./ThemeProvider";
import { MoonIcon, SunIcon, MenuIcon, XIcon } from "lucide-react";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const location = useLocation(); // ← get current route

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive(path)
        ? "text-red-600 font-semibold"
        : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
    }`;

  return (
    <nav className=" sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                ImagiTune
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className={linkClass("/")}>Home</Link>
            <Link to="/about" className={linkClass("/about")}>About</Link>
            <Link to="/how-it-works" className={linkClass("/how-it-works")}>How It Works</Link>
            <Link to="/upload" className={linkClass("/upload")}>Create Music</Link>
            <Link to="/contact" className={linkClass("/contact")}>Contact</Link>

            <button
              onClick={toggleTheme}
              className="ml-3 p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <SunIcon size={20} /> : <MoonIcon size={20} />}
            </button>

            <Link
              to="/signup"
              className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 mr-2"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <SunIcon size={20} /> : <MoonIcon size={20} />}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Open menu"
            >
              {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <Link to="/" className={linkClass("/")}>Home</Link>
            <Link to="/about" className={linkClass("/about")}>About</Link>
            <Link to="/how-it-works" className={linkClass("/how-it-works")}>How It Works</Link>
            <Link to="/upload" className={linkClass("/upload")}>Create Music</Link>
            <Link to="/contact" className={linkClass("/contact")}>Contact</Link>
            <Link
              to="/signup"
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
