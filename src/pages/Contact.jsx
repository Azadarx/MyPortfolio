import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../context/ThemeContext";
import api from "../services/api.js";

const Contact = () => {
  const { currentTheme } = useTheme();
  const isDark = currentTheme === "dark";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const [loading, setLoading] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const gradientRef = useRef(null);

  const validation = {
    name: formData.name.trim().length >= 2,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
    subject: formData.subject.trim().length >= 3,
    message: formData.message.trim().length >= 10,
  };

  const isFormValid = Object.values(validation).every(Boolean);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  useEffect(() => {
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    const contactSection = document.getElementById("contact");
    if (contactSection) observer.observe(contactSection);

    return () => {
      clearInterval(interval);
      if (contactSection) observer.unobserve(contactSection);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      Object.keys(formData).forEach((key) => {
        setTouched((prev) => ({ ...prev, [key]: true }));
      });
      toast.error("Please fix the errors in the form");
      return;
    }

    setLoading(true);

    try {
      // ✅ FIXED: Use api service instead of fetch
      await api.post("/contact", formData);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setTouched({
        name: false,
        email: false,
        subject: false,
        message: false,
      });

      toast.success("Message sent successfully! I'll get back to you soon.");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className={`relative py-12 sm:py-16 px-4 ${
        isDark ? "bg-slate-900" : "bg-slate-50"
      } overflow-hidden min-h-screen flex items-center justify-center transition-colors duration-300`}
    >
      {/* Background elements */}
      <div
        ref={gradientRef}
        data-rotation="0"
        className={`absolute inset-0 w-full h-full ${
          isDark ? "opacity-40" : "opacity-30"
        }`}
      />

      <div
        className={`absolute inset-0 w-full h-full ${
          isDark
            ? "bg-[radial-gradient(ellipse_at_30%_20%,rgba(20,184,166,0.2),transparent_60%),radial-gradient(ellipse_at_80%_80%,rgba(6,182,212,0.25),transparent_60%)]"
            : "bg-[radial-gradient(ellipse_at_30%_20%,rgba(20,184,166,0.15),transparent_60%),radial-gradient(ellipse_at_80%_80%,rgba(6,182,212,0.15),transparent_60%)]"
        }`}
      />

      <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl opacity-10 animate-pulse-slow"></div>

      <ToastContainer
        position="bottom-right"
        theme={isDark ? "dark" : "light"}
      />

      <div className="relative mt-12 z-10 w-full max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className={`text-2xl sm:text-3xl font-bold ${
              isDark ? "text-white" : "text-slate-800"
            } mb-3 sm:mb-4 transition-colors duration-300`}
          >
            Get In Touch
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 mx-auto"></div>
          <p
            className={`mt-4 sm:mt-6 px-2 text-sm sm:text-base ${
              isDark ? "text-slate-300" : "text-slate-600"
            } transition-colors duration-300`}
          >
            Have a project in mind or just want to say hello? Feel free to reach
            out!
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="mt-6 sm:mt-10 px-1 sm:px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <motion.div className="relative" variants={itemVariants}>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`peer block w-full rounded-lg border ${
                    isDark
                      ? "bg-slate-800/50 backdrop-blur-sm text-white border-slate-700 focus:border-teal-500 focus:ring-teal-500"
                      : "bg-white/80 backdrop-blur-sm text-slate-900 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                  } px-3 sm:px-4 pt-6 pb-2 text-sm sm:text-base ${
                    touched.name && !validation.name
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  } focus:outline-none focus:ring-2 transition-colors duration-300`}
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="name"
                  className={`absolute left-3 sm:left-4 top-5 z-10 origin-[0] -translate-y-4 scale-75 transform text-xs sm:text-sm duration-200 ${
                    touched.name && !validation.name
                      ? "text-red-500"
                      : formData.name
                      ? "text-teal-400"
                      : isDark
                      ? "text-slate-400"
                      : "text-slate-500"
                  } peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-teal-400 transition-colors duration-300`}
                >
                  Name
                </label>
              </div>
              {touched.name && !validation.name && (
                <p className="mt-1 text-xs text-red-500">
                  Name must be at least 2 characters
                </p>
              )}
            </motion.div>

            <motion.div className="relative" variants={itemVariants}>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`peer block w-full rounded-lg border ${
                    isDark
                      ? "bg-slate-800/50 backdrop-blur-sm text-white border-slate-700 focus:border-teal-500 focus:ring-teal-500"
                      : "bg-white/80 backdrop-blur-sm text-slate-900 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                  } px-3 sm:px-4 pt-6 pb-2 text-sm sm:text-base ${
                    touched.email && !validation.email
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  } focus:outline-none focus:ring-2 transition-colors duration-300`}
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="email"
                  className={`absolute left-3 sm:left-4 top-5 z-10 origin-[0] -translate-y-4 scale-75 transform text-xs sm:text-sm duration-200 ${
                    touched.email && !validation.email
                      ? "text-red-500"
                      : formData.email
                      ? "text-teal-400"
                      : isDark
                      ? "text-slate-400"
                      : "text-slate-500"
                  } peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-teal-400 transition-colors duration-300`}
                >
                  Email
                </label>
              </div>
              {touched.email && !validation.email && (
                <p className="mt-1 text-xs text-red-500">
                  Please enter a valid email address
                </p>
              )}
            </motion.div>
          </div>

          <motion.div className="relative mt-4 sm:mt-6" variants={itemVariants}>
            <div className="relative">
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`peer block w-full rounded-lg border ${
                  isDark
                    ? "bg-slate-800/50 backdrop-blur-sm text-white border-slate-700 focus:border-teal-500 focus:ring-teal-500"
                    : "bg-white/80 backdrop-blur-sm text-slate-900 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                } px-3 sm:px-4 pt-6 pb-2 text-sm sm:text-base ${
                  touched.subject && !validation.subject
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : ""
                } focus:outline-none focus:ring-2 transition-colors duration-300`}
                placeholder=" "
                required
              />
              <label
                htmlFor="subject"
                className={`absolute left-3 sm:left-4 top-5 z-10 origin-[0] -translate-y-4 scale-75 transform text-xs sm:text-sm duration-200 ${
                  touched.subject && !validation.subject
                    ? "text-red-500"
                    : formData.subject
                    ? "text-teal-400"
                    : isDark
                    ? "text-slate-400"
                    : "text-slate-500"
                } peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-teal-400 transition-colors duration-300`}
              >
                Subject
              </label>
            </div>
            {touched.subject && !validation.subject && (
              <p className="mt-1 text-xs text-red-500">
                Subject must be at least 3 characters
              </p>
            )}
          </motion.div>

          <motion.div className="relative mt-4 sm:mt-6" variants={itemVariants}>
            <div className="relative">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows="4"
                className={`peer block w-full rounded-lg border ${
                  isDark
                    ? "bg-slate-800/50 backdrop-blur-sm text-white border-slate-700 focus:border-teal-500 focus:ring-teal-500"
                    : "bg-white/80 backdrop-blur-sm text-slate-900 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                } px-3 sm:px-4 pt-6 pb-2 text-sm sm:text-base ${
                  touched.message && !validation.message
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : ""
                } focus:outline-none focus:ring-2 transition-colors duration-300`}
                placeholder=" "
                required
              />
              <label
                htmlFor="message"
                className={`absolute left-3 sm:left-4 top-5 z-10 origin-[0] -translate-y-4 scale-75 transform text-xs sm:text-sm duration-200 ${
                  touched.message && !validation.message
                    ? "text-red-500"
                    : formData.message
                    ? "text-teal-400"
                    : isDark
                    ? "text-slate-400"
                    : "text-slate-500"
                } peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-teal-400 transition-colors duration-300`}
              >
                Message
              </label>
            </div>
            {touched.message && !validation.message && (
              <p className="mt-1 text-xs text-red-500">
                Message must be at least 10 characters
              </p>
            )}
          </motion.div>

          <motion.div
            className="mt-6 sm:mt-8"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-lg bg-gradient-to-r from-teal-600 to-teal-500 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white shadow-lg shadow-teal-500/20 border border-teal-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/30 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                loading ? "cursor-not-allowed opacity-70" : ""
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin text-white"
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
                  Sending...
                </div>
              ) : (
                "Send Message"
              )}
            </button>
          </motion.div>
        </motion.form>

        {/* Contact Info Cards */}
        <motion.div
          className="mt-12 sm:mt-16 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className={`flex flex-col items-center rounded-lg ${
              isDark
                ? "bg-slate-800/60 backdrop-blur-sm border-slate-700/50"
                : "bg-white/70 backdrop-blur-sm border-slate-200/70"
            } p-4 sm:p-6 text-center shadow-lg border transition-all duration-300`}
            variants={itemVariants}
          >
            <div
              className={`mb-3 sm:mb-4 rounded-full ${
                isDark ? "bg-teal-900/60" : "bg-teal-50"
              } p-2 sm:p-3 text-teal-400`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3
              className={`mb-1 sm:mb-2 text-base sm:text-lg font-medium ${
                isDark ? "text-white" : "text-slate-800"
              }`}
            >
              Email
            </h3>
            <p
              className={`text-sm sm:text-base break-words ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              syedazadarhussayn@gmail.com
            </p>
          </motion.div>

          <motion.div
            className={`flex flex-col items-center rounded-lg ${
              isDark
                ? "bg-slate-800/60 backdrop-blur-sm border-slate-700/50"
                : "bg-white/70 backdrop-blur-sm border-slate-200/70"
            } p-4 sm:p-6 text-center shadow-lg border transition-all duration-300`}
            variants={itemVariants}
          >
            <div
              className={`mb-3 sm:mb-4 rounded-full ${
                isDark ? "bg-teal-900/60" : "bg-teal-50"
              } p-2 sm:p-3 text-teal-400`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3
              className={`mb-1 sm:mb-2 text-base sm:text-lg font-medium ${
                isDark ? "text-white" : "text-slate-800"
              }`}
            >
              Location
            </h3>
            <p
              className={`text-sm sm:text-base ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Near MGBS, Kali Khaber, Hyderabad, Telangana - 500024
            </p>
          </motion.div>

          <motion.div
            className={`flex flex-col items-center rounded-lg ${
              isDark
                ? "bg-slate-800/60 backdrop-blur-sm border-slate-700/50"
                : "bg-white/70 backdrop-blur-sm border-slate-200/70"
            } p-4 sm:p-6 text-center shadow-lg border transition-all duration-300`}
            variants={itemVariants}
          >
            <div
              className={`mb-3 sm:mb-4 rounded-full ${
                isDark ? "bg-teal-900/60" : "bg-teal-50"
              } p-2 sm:p-3 text-teal-400`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3
              className={`mb-1 sm:mb-2 text-base sm:text-lg font-medium ${
                isDark ? "text-white" : "text-slate-800"
              }`}
            >
              Working Hours
            </h3>
            <p
              className={`text-sm sm:text-base ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Mon - Fri: 9AM - 9PM
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;