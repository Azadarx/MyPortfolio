import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Eye, EyeOff, ArrowRight, Key } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";
import api from "../../services/api.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    // Check if already logged in
    const token = localStorage.getItem("jwtToken");
    if (token) {
      // Verify token is valid
      api.get("/auth/verify")
        .then(() => {
          navigate("/admin/dashboard");
        })
        .catch(() => {
          // Token invalid, remove it
          localStorage.removeItem("jwtToken");
        });
    }

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
      console.log("🔐 Attempting login with:", formData.email);
      
      const { data } = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password
      });

      console.log("✅ Login successful:", data);

      if (data.token) {
        localStorage.setItem("jwtToken", data.token);
        toast.success("Login successful! Redirecting...");
        
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1000);
      } else {
        throw new Error("No token received from server");
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      
      const errorMessage = error.message || 
                          error.response?.data?.message || 
                          "Invalid credentials. Please try again.";
      
      setLoginError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

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
      <ToastContainer position="top-right" autoClose={3000} theme={currentTheme} />

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

      <Particles />

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
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full opacity-30 blur-xl"></div>
          <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-gradient-to-tr from-cyan-400 to-teal-500 rounded-full opacity-30 blur-xl"></div>

          <div className="relative z-10">
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
            </div>

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

            <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-3 sm:space-y-4">
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
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

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
                      autoComplete="current-password"
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

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full relative overflow-hidden group flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium text-white bg-gradient-to-r from-teal-600 to-teal-500 rounded-lg gap-2 shadow-lg shadow-teal-500/20 border border-teal-500/20 transition-all duration-300 hover:shadow-teal-500/30 ${
                  isSubmitting ? "opacity-80 cursor-not-allowed" : "hover:scale-[1.02]"
                }`}
              >
                <span className="absolute -inset-3 scale-x-0 group-hover:scale-x-100 bg-gradient-to-r from-teal-500 to-cyan-500 opacity-30 transform origin-left transition-transform duration-500"></span>
                <span className="relative flex items-center">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight
                        size={16}
                        className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </>
                  )}
                </span>
              </button>
            </form>

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