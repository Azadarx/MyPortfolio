import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../../context/ThemeContext";
import api from "../../services/api.js";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

const Contact = () => {
  const { currentTheme } = useTheme();
  const isDark = currentTheme === "dark";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    subject: false,
    message: false,
  });

  const [loading, setLoading] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const validation = {
    name: formData.name.trim().length >= 2,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
    phone: formData.phone === "" || /^[0-9]{10}$/.test(formData.phone.replace(/\D/g, "")),
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    const contactSection = document.getElementById("mr-contact");
    if (contactSection) observer.observe(contactSection);

    return () => {
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
      // Use the same contact endpoint - backend will handle it
      await api.post("/contact", {
        ...formData,
        subject: `[MR Portfolio] ${formData.subject}`, // Prefix to distinguish MR contacts
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setTouched({
        name: false,
        email: false,
        phone: false,
        subject: false,
        message: false,
      });

      toast.success("Message sent successfully! I'll get back to you soon.");
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error?.message ||
        error?.error ||
        "Failed to send message. Please try again later.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="mr-contact"
      className={`relative py-16 px-4 ${
        isDark ? "bg-slate-900" : "bg-slate-50"
      } overflow-hidden min-h-screen flex items-center justify-center transition-colors duration-300`}
    >
      {/* Background elements */}
      <div
        className={`absolute inset-0 w-full h-full ${
          isDark
            ? "bg-[radial-gradient(ellipse_at_30%_20%,rgba(37,99,235,0.15),transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(59,130,246,0.1),transparent_50%)]"
            : "bg-[radial-gradient(ellipse_at_30%_20%,rgba(37,99,235,0.08),transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(59,130,246,0.06),transparent_50%)]"
        }`}
      />

      <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl opacity-5 animate-pulse"></div>
      <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-indigo-600 rounded-full filter blur-3xl opacity-5 animate-pulse"></div>

      <ToastContainer
        position="bottom-right"
        theme={isDark ? "dark" : "light"}
      />

      <div className="relative mt-12 z-10 w-full max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className={`text-4xl sm:text-5xl font-bold ${
              isDark ? "text-white" : "text-slate-900"
            } mb-4 transition-colors duration-300`}
          >
            Get In Touch
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 mx-auto mb-6"></div>
          <p
            className={`text-lg ${
              isDark ? "text-slate-300" : "text-slate-600"
            } transition-colors duration-300`}
          >
            Let's discuss pharmaceutical sales opportunities and collaborations
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="mt-10 px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
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
                      ? "bg-slate-800/50 backdrop-blur-sm text-white border-slate-700 focus:border-blue-600 focus:ring-blue-600"
                      : "bg-white/80 backdrop-blur-sm text-slate-900 border-slate-200 focus:border-blue-600 focus:ring-blue-600"
                  } px-4 pt-6 pb-2 text-base ${
                    touched.name && !validation.name
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  } focus:outline-none focus:ring-2 transition-colors duration-300`}
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="name"
                  className={`absolute left-4 top-5 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm duration-200 ${
                    touched.name && !validation.name
                      ? "text-red-500"
                      : formData.name
                      ? "text-blue-600"
                      : isDark
                      ? "text-slate-400"
                      : "text-slate-500"
                  } peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 transition-colors duration-300`}
                >
                  Full Name
                </label>
              </div>
              {touched.name && !validation.name && (
                <p className="mt-1 text-xs text-red-500">
                  Name must be at least 2 characters
                </p>
              )}
            </motion.div>

            {/* Email Field */}
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
                      ? "bg-slate-800/50 backdrop-blur-sm text-white border-slate-700 focus:border-blue-600 focus:ring-blue-600"
                      : "bg-white/80 backdrop-blur-sm text-slate-900 border-slate-200 focus:border-blue-600 focus:ring-blue-600"
                  } px-4 pt-6 pb-2 text-base ${
                    touched.email && !validation.email
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  } focus:outline-none focus:ring-2 transition-colors duration-300`}
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="email"
                  className={`absolute left-4 top-5 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm duration-200 ${
                    touched.email && !validation.email
                      ? "text-red-500"
                      : formData.email
                      ? "text-blue-600"
                      : isDark
                      ? "text-slate-400"
                      : "text-slate-500"
                  } peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 transition-colors duration-300`}
                >
                  Email Address
                </label>
              </div>
              {touched.email && !validation.email && (
                <p className="mt-1 text-xs text-red-500">
                  Please enter a valid email address
                </p>
              )}
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Phone Field */}
            <motion.div className="relative" variants={itemVariants}>
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`peer block w-full rounded-lg border ${
                    isDark
                      ? "bg-slate-800/50 backdrop-blur-sm text-white border-slate-700 focus:border-blue-600 focus:ring-blue-600"
                      : "bg-white/80 backdrop-blur-sm text-slate-900 border-slate-200 focus:border-blue-600 focus:ring-blue-600"
                  } px-4 pt-6 pb-2 text-base ${
                    touched.phone && !validation.phone
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  } focus:outline-none focus:ring-2 transition-colors duration-300`}
                  placeholder=" "
                />
                <label
                  htmlFor="phone"
                  className={`absolute left-4 top-5 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm duration-200 ${
                    touched.phone && !validation.phone
                      ? "text-red-500"
                      : formData.phone
                      ? "text-blue-600"
                      : isDark
                      ? "text-slate-400"
                      : "text-slate-500"
                  } peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 transition-colors duration-300`}
                >
                  Phone Number (Optional)
                </label>
              </div>
              {touched.phone && !validation.phone && (
                <p className="mt-1 text-xs text-red-500">
                  Please enter a valid 10-digit phone number
                </p>
              )}
            </motion.div>

            {/* Subject Field */}
            <motion.div className="relative" variants={itemVariants}>
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
                      ? "bg-slate-800/50 backdrop-blur-sm text-white border-slate-700 focus:border-blue-600 focus:ring-blue-600"
                      : "bg-white/80 backdrop-blur-sm text-slate-900 border-slate-200 focus:border-blue-600 focus:ring-blue-600"
                  } px-4 pt-6 pb-2 text-base ${
                    touched.subject && !validation.subject
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  } focus:outline-none focus:ring-2 transition-colors duration-300`}
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="subject"
                  className={`absolute left-4 top-5 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm duration-200 ${
                    touched.subject && !validation.subject
                      ? "text-red-500"
                      : formData.subject
                      ? "text-blue-600"
                      : isDark
                      ? "text-slate-400"
                      : "text-slate-500"
                  } peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 transition-colors duration-300`}
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
          </div>

          {/* Message Field */}
          <motion.div className="relative mt-6" variants={itemVariants}>
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
                    ? "bg-slate-800/50 backdrop-blur-sm text-white border-slate-700 focus:border-blue-600 focus:ring-blue-600"
                    : "bg-white/80 backdrop-blur-sm text-slate-900 border-slate-200 focus:border-blue-600 focus:ring-blue-600"
                } px-4 pt-6 pb-2 text-base ${
                  touched.message && !validation.message
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : ""
                } focus:outline-none focus:ring-2 transition-colors duration-300`}
                placeholder=" "
                required
              />
              <label
                htmlFor="message"
                className={`absolute left-4 top-5 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm duration-200 ${
                  touched.message && !validation.message
                    ? "text-red-500"
                    : formData.message
                    ? "text-blue-600"
                    : isDark
                    ? "text-slate-400"
                    : "text-slate-500"
                } peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 transition-colors duration-300`}
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

          {/* Submit Button */}
          <motion.div
            className="mt-8"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-base font-medium text-white shadow-lg shadow-blue-500/20 border border-blue-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
                loading ? "cursor-not-allowed opacity-70" : ""
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="mr-2 h-5 w-5 animate-spin text-white"
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
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className={`flex flex-col items-center rounded-lg ${
              isDark
                ? "bg-slate-800/60 backdrop-blur-sm border-slate-700/50"
                : "bg-white/70 backdrop-blur-sm border-slate-200/70"
            } p-6 text-center shadow-lg border transition-all duration-300`}
            variants={itemVariants}
          >
            <div
              className={`mb-4 rounded-full ${
                isDark ? "bg-blue-900/40" : "bg-blue-50"
              } p-3 text-blue-600`}
            >
              <Mail className="h-6 w-6" />
            </div>
            <h3
              className={`mb-2 text-lg font-medium ${
                isDark ? "text-white" : "text-slate-800"
              }`}
            >
              Email
            </h3>
            <p
              className={`text-sm break-words ${
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
            } p-6 text-center shadow-lg border transition-all duration-300`}
            variants={itemVariants}
          >
            <div
              className={`mb-4 rounded-full ${
                isDark ? "bg-blue-900/40" : "bg-blue-50"
              } p-3 text-blue-600`}
            >
              <Phone className="h-6 w-6" />
            </div>
            <h3
              className={`mb-2 text-lg font-medium ${
                isDark ? "text-white" : "text-slate-800"
              }`}
            >
              Phone
            </h3>
            <p
              className={`text-sm ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Available on request
            </p>
          </motion.div>

          <motion.div
            className={`flex flex-col items-center rounded-lg ${
              isDark
                ? "bg-slate-800/60 backdrop-blur-sm border-slate-700/50"
                : "bg-white/70 backdrop-blur-sm border-slate-200/70"
            } p-6 text-center shadow-lg border transition-all duration-300`}
            variants={itemVariants}
          >
            <div
              className={`mb-4 rounded-full ${
                isDark ? "bg-blue-900/40" : "bg-blue-50"
              } p-3 text-blue-600`}
            >
              <MapPin className="h-6 w-6" />
            </div>
            <h3
              className={`mb-2 text-lg font-medium ${
                isDark ? "text-white" : "text-slate-800"
              }`}
            >
              Location
            </h3>
            <p
              className={`text-sm ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Hyderabad, Telangana
            </p>
          </motion.div>

          <motion.div
            className={`flex flex-col items-center rounded-lg ${
              isDark
                ? "bg-slate-800/60 backdrop-blur-sm border-slate-700/50"
                : "bg-white/70 backdrop-blur-sm border-slate-200/70"
            } p-6 text-center shadow-lg border transition-all duration-300`}
            variants={itemVariants}
          >
            <div
              className={`mb-4 rounded-full ${
                isDark ? "bg-blue-900/40" : "bg-blue-50"
              } p-3 text-blue-600`}
            >
              <Clock className="h-6 w-6" />
            </div>
            <h3
              className={`mb-2 text-lg font-medium ${
                isDark ? "text-white" : "text-slate-800"
              }`}
            >
              Availability
            </h3>
            <p
              className={`text-sm ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Mon - Sat: 9AM - 7PM
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;