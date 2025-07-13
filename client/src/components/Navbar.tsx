// src/components/Navbar.tsx
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeProvider";
import {
  MoonIcon,
  SunIcon,
  MenuIcon,
  XIcon,
  LogOutIcon,
  User,
  Settings,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive(path)
        ? "text-red-600 font-semibold"
        : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
    }`;

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
    navigate("/login");
  };

  const handleProfileClick = () => {
    setIsProfileMenuOpen(false);
    navigate("/profile");
  };

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/how-it-works", label: "How It Works" },
    { path: "/contact", label: "Contact" },
  ];

  if (isAuthenticated) {
    navItems.splice(3, 0, { path: "/upload", label: "Create Music" });
  }

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Mobile: Hamburger + Logo (Left) */}
            <div className="flex items-center md:hidden flex-shrink-0">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 mr-2"
                aria-label="Open menu"
              >
                <MenuIcon size={24} />
              </button>
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                  ImagiTune
                </span>
              </Link>
            </div>

            {/* Desktop: Logo (Left) */}
            <div className="hidden md:flex items-center flex-shrink-0">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                  ImagiTune
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Items (Center) */}
            <div className="hidden md:flex items-center space-x-4 flex-1 justify-center">
              <Link to="/" className={linkClass("/")}>
                Home
              </Link>
              <Link to="/about" className={linkClass("/about")}>About</Link>
              <Link to="/how-it-works" className={linkClass("/how-it-works")}>How It Works</Link>
              {isAuthenticated && (
                <Link to="/upload" className={linkClass("/upload")}>Create Music</Link>
              )}
              <Link to="/contact" className={linkClass("/contact")}>Contact</Link>
            </div>

            {/* Desktop/Tablet: Profile Dropdown (md and up) */}
            <div className="hidden md:flex items-center space-x-2 flex-shrink-0">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <SunIcon size={20} /> : <MoonIcon size={20} />}
              </button>
              {isAuthenticated ? (
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700">
                      {user?.username?.[0]?.toUpperCase() || <User size={20} />}
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      className="min-w-[220px] bg-white dark:bg-gray-800 rounded-md shadow-lg p-1"
                      sideOffset={5}
                    >
                      {/* User Info Section */}
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {user?.fullName || user?.username}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {user?.email}
                        </div>
                      </div>
                      {/* Actions Section */}
                      <DropdownMenu.Item
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                        onClick={() => navigate("/profile")}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Profile
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                        onClick={handleLogout}
                      >
                        <LogOutIcon className="mr-2 h-4 w-4" />
                        Log Out
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              ) : (
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Get Started
                </Link>
              )}
            </div>
            {/* Mobile: Theme toggle + Profile (Right) */}
            <div className="flex md:hidden items-center space-x-2 flex-shrink-0">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <SunIcon size={20} /> : <MoonIcon size={20} />}
              </button>
              {isAuthenticated ? (
                <button
                  onClick={() => setIsProfileMenuOpen(true)}
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700"
                >
                  {user?.username?.[0]?.toUpperCase() || <User size={20} />}
                </button>
              ) : (
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Side Menu - Slides from Left */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
          onClick={closeMenus}
        />
        {/* Side Menu */}
        <div
          className={`absolute left-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                Menu
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <XIcon size={24} />
              </button>
            </div>
            {/* Navigation Items */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={closeMenus}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Profile Menu - Slides from Right */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          isProfileMenuOpen ? "block" : "hidden"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
          onClick={closeMenus}
        />
        
        {/* Profile Menu */}
        <div
          className={`absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out ${
            isProfileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                Profile
              </span>
              <button
                onClick={() => setIsProfileMenuOpen(false)}
                className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <XIcon size={24} />
              </button>
            </div>

            {/* User Info */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                  {user?.username?.[0]?.toUpperCase() || <User size={24} />}
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {user?.fullName || user?.username}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Actions */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              <button
                onClick={handleProfileClick}
                className="w-full flex items-center px-4 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Settings className="mr-3 h-5 w-5" />
                Profile Settings
              </button>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center px-4 py-3 rounded-lg text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <LogOutIcon className="mr-2 h-5 w-5" />
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
