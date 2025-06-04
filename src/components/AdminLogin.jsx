import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Eye, EyeOff, ArrowRight, Key } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { currentTheme } = useTheme();
  const [isInView, setIsInView] = useState(false);
  const gradientRef = React.useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      navigate("/admin/dashboard");
    }

    // Set isInView for animations
    setIsInView(true);

    // Background gradient animation
    const interval = setInterval(() => {
      if (gradientRef.current) {
        const currentRotation = parseInt(
          gradientRef.current.getAttribute("data-rotation") || "0"
        );
        const newRotation = (currentRotation + 1) % 360;
        gradientRef.current.setAttribute("data-rotation", newRotation);
        gradientRef.current.style.backgroundImage = `linear-gradient(${newRotation}deg, rgba(56, 189, 248, 0.2) 0%, rgba(6, 182, 212, 0.15) 25%, rgba(20, 184, 166, 0.2) 50%, rgba(45, 212, 191, 0.15) 75%, rgba(56, 189, 248, 0.2) 100%)`;
      }
    }, 100);

    return () => clearInterval(interval);
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    if (loginError) {
      setLoginError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    setLoginError("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Authentication failed");
      }
      localStorage.setItem("jwtToken", data.token);
      navigate("/admin/dashboard");
    } catch (error) {
      setLoginError(error.message || "Invalid credentials. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Particles component for background effect
  const Particles = () => {
    const particles = Array.from({ length: 15 });

    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((_, index) => {
          const size = Math.floor(Math.random() * 4) + 2;
          const duration = Math.floor(Math.random() * 8) + 15;
          const delay = Math.random() * 3;
          const opacity = Math.random() * 0.4 + 0.2;

          const colors = ["bg-teal-400/30", "bg-cyan-400/30", "bg-blue-400/20"];
          const colorClass = colors[Math.floor(Math.random() * colors.length)];

          return (
            <div
              key={index}
              className={`absolute rounded-full ${colorClass} animate-float`}
              style={{
                width: size,
                height: size,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                opacity: opacity,
                transform: "translateY(0)",
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center overflow-hidden relative ${
        currentTheme === "dark" ? "bg-slate-900" : "bg-slate-50"
      } transition-colors duration-300 px-4 py-8 sm:px-6`}
    >
      {/* Background gradient effects */}
      <div
        ref={gradientRef}
        data-rotation="0"
        className="absolute inset-0 w-full h-full opacity-40 dark:opacity-40"
      />

      <div
        className={`absolute inset-0 w-full h-full ${
          currentTheme === "dark"
            ? "bg-[radial-gradient(ellipse_at_30%_20%,rgba(20,184,166,0.2),transparent_60%),radial-gradient(ellipse_at_80%_80%,rgba(6,182,212,0.25),transparent_60%)]"
            : "bg-[radial-gradient(ellipse_at_30%_20%,rgba(20,184,166,0.1),transparent_60%),radial-gradient(ellipse_at_80%_80%,rgba(6,182,212,0.15),transparent_60%)]"
        }`}
      />

      {/* Accent blurs */}
      <div
        className={`absolute -top-20 -right-20 w-64 h-64 bg-teal-500 rounded-full filter blur-3xl ${
          currentTheme === "dark" ? "opacity-10" : "opacity-5"
        } animate-pulse`}
      ></div>
      <div
        className={`absolute -bottom-16 -left-16 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl ${
          currentTheme === "dark" ? "opacity-10" : "opacity-5"
        } animate-pulse-slow`}
      ></div>

      {/* Particles */}
      <Particles />

      {/* Login card */}
      <div
        className={`relative z-10 w-full max-w-xs xs:max-w-sm sm:max-w-md lg:max-w-lg ${
          isInView ? "animate-fade-in" : "opacity-0"
        }`}
      >
        <div
          className={`relative overflow-hidden rounded-2xl shadow-xl backdrop-blur-sm border ${
            currentTheme === "dark"
              ? "bg-slate-800/80 border-slate-700/50 shadow-slate-900/50"
              : "bg-white/90 border-slate-200 shadow-slate-200/50"
          } p-4 xs:p-5 sm:p-6 md:p-8 transition-all duration-300 transform hover:shadow-lg`}
        >
          {/* Decorative elements */}
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full opacity-30 blur-xl"></div>
          <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-gradient-to-tr from-cyan-400 to-teal-500 rounded-full opacity-30 blur-xl"></div>

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="relative">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 shadow-lg shadow-teal-500/20">
                    <Key size={24} className="text-white" />
                  </div>
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 opacity-30 blur-sm animate-pulse"></div>
                </div>
              </div>
              <h2
                className={`text-2xl xs:text-2xl sm:text-3xl font-bold ${
                  currentTheme === "dark" ? "text-white" : "text-slate-800"
                } tracking-tight`}
              >
                Admin Portal
              </h2>
              <p
                className={`mt-1 sm:mt-2 text-xs sm:text-sm ${
                  currentTheme === "dark" ? "text-slate-300" : "text-slate-600"
                }`}
              >
                Sign in to manage your portfolio
              </p>
              <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full filter blur-3xl opacity-20"></div>
            </div>

            {/* Login error */}
            {loginError && (
              <div
                className={`mb-4 sm:mb-6 ${
                  currentTheme === "dark" ? "bg-red-900/30" : "bg-red-50"
                } border-l-4 border-red-500 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg relative animate-fade-in`}
                role="alert"
              >
                <div className="flex items-center">
                  <div className="mr-2">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span
                    className={`text-xs sm:text-sm ${
                      currentTheme === "dark" ? "text-red-200" : "text-red-700"
                    }`}
                  >
                    {loginError}
                  </span>
                </div>
              </div>
            )}

            {/* Form */}
            <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-3 sm:space-y-4">
                {/* Email field */}
                <div>
                  <label
                    htmlFor="email"
                    className={`block text-xs sm:text-sm font-medium ${
                      currentTheme === "dark"
                        ? "text-slate-300"
                        : "text-slate-700"
                    } mb-1`}
                  >
                    Email Address
                  </label>
                  <div
                    className={`relative rounded-lg shadow-sm border ${
                      errors.email
                        ? "border-red-500"
                        : currentTheme === "dark"
                        ? "border-slate-600 focus-within:border-teal-500"
                        : "border-slate-300 focus-within:border-teal-500"
                    } focus-within:ring focus-within:ring-teal-500/20 transition-all duration-300`}
                  >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail
                        size={16}
                        className={
                          errors.email
                            ? "text-red-500"
                            : currentTheme === "dark"
                            ? "text-slate-400"
                            : "text-slate-500"
                        }
                      />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 sm:py-3 border-0 rounded-lg focus:ring-0 focus:outline-none text-xs sm:text-sm ${
                        currentTheme === "dark"
                          ? "bg-slate-800/80 text-white placeholder-slate-400"
                          : "bg-white text-slate-900 placeholder-slate-400"
                      }`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Password field */}
                <div>
                  <label
                    htmlFor="password"
                    className={`block text-xs sm:text-sm font-medium ${
                      currentTheme === "dark"
                        ? "text-slate-300"
                        : "text-slate-700"
                    } mb-1`}
                  >
                    Password
                  </label>
                  <div
                    className={`relative rounded-lg shadow-sm border ${
                      errors.password
                        ? "border-red-500"
                        : currentTheme === "dark"
                        ? "border-slate-600 focus-within:border-teal-500"
                        : "border-slate-300 focus-within:border-teal-500"
                    } focus-within:ring focus-within:ring-teal-500/20 transition-all duration-300`}
                  >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock
                        size={16}
                        className={
                          errors.password
                            ? "text-red-500"
                            : currentTheme === "dark"
                            ? "text-slate-400"
                            : "text-slate-500"
                        }
                      />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-10 py-2 sm:py-3 border-0 rounded-lg focus:ring-0 focus:outline-none text-xs sm:text-sm ${
                        currentTheme === "dark"
                          ? "bg-slate-800/80 text-white placeholder-slate-400"
                          : "bg-white text-slate-900 placeholder-slate-400"
                      }`}
                      placeholder="Enter your password"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`focus:outline-none ${
                          currentTheme === "dark"
                            ? "text-slate-400 hover:text-teal-400"
                            : "text-slate-500 hover:text-teal-600"
                        } transition-colors duration-300`}
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full relative overflow-hidden group flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium text-white bg-gradient-to-r from-teal-600 to-teal-500 rounded-lg gap-2 shadow-lg shadow-teal-500/20 border border-teal-500/20 transition-all duration-300 hover:shadow-teal-500/30 ${
                  isSubmitting ? "opacity-80" : "hover:scale-[1.02]"
                }`}
              >
                <span className="absolute -inset-3 scale-x-0 group-hover:scale-x-100 bg-gradient-to-r from-teal-500 to-cyan-500 opacity-30 transform origin-left transition-transform duration-500"></span>
                <span className="relative flex items-center">
                  {isSubmitting ? "Signing in..." : "Sign In"}
                  <ArrowRight
                    size={16}
                    className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                  />
                </span>
              </button>
            </form>

            {/* Decorative code snippet */}
            <div
              className={`absolute bottom-2 right-2 sm:bottom-3 sm:right-3 text-[8px] xs:text-[10px] sm:text-xs ${
                currentTheme === "dark"
                  ? "text-teal-500/50"
                  : "text-teal-600/30"
              } font-mono max-w-xs overflow-hidden hidden xs:block`}
            >
              {`{secure: true, theme: "${currentTheme}"}`}
            </div>
          </div>
        </div>

        {/* Version tag */}
        <div className="mt-3 text-center">
          <p
            className={`text-[10px] sm:text-xs ${
              currentTheme === "dark" ? "text-slate-500" : "text-slate-400"
            }`}
          >
            v1.0.2 • Secure Connection
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
