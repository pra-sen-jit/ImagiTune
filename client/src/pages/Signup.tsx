import React, { useState } from "react";
import { Eye, EyeOff, Music } from "lucide-react";
import { Link } from "react-router-dom";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Reset errors if validation passes
    setErrors({});
    console.log("Sign up with:", {
      name: formData.name,
      email: formData.email,
    });
    // Implement your signup logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-gray-900 bg-opacity-70 backdrop-blur-sm rounded-lg shadow-xl p-8">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <Music size={36} className="text-purple-400" />
          </div>
          <h1 className="text-3xl font-bold text-white">Join AudioVision</h1>
          <p className="text-purple-300 mt-2">
            Transform your images into musical experiences
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-purple-200 text-sm font-medium mb-2"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className={`w-full bg-gray-800 text-white border ${
                errors.name ? "border-red-500" : "border-purple-700"
              } rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500`}
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="mt-1 text-red-400 text-xs">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-purple-200 text-sm font-medium mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`w-full bg-gray-800 text-white border ${
                errors.email ? "border-red-500" : "border-purple-700"
              } rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500`}
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="mt-1 text-red-400 text-xs">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-purple-200 text-sm font-medium mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className={`w-full bg-gray-800 text-white border ${
                  errors.password ? "border-red-500" : "border-purple-700"
                } rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-purple-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-red-400 text-xs">{errors.password}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-purple-200 text-sm font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              className={`w-full bg-gray-800 text-white border ${
                errors.confirmPassword ? "border-red-500" : "border-purple-700"
              } rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500`}
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-red-400 text-xs">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-md transition duration-200 ease-in-out"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
