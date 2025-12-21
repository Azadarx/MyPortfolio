import { useState, useEffect } from "react";
import {
  Linkedin,
  Mail,
  ArrowUp,
  Twitter,
  Briefcase,
  ExternalLink,
  Phone,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const MRFooter = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const currentYear = new Date().getFullYear();
  const { currentTheme } = useTheme();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowScrollTop(window.scrollY > 300);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getFooterClasses = () => {
    const baseClasses = "py-8 sm:py-12 px-4 sm:px-6 relative border-t";

    if (currentTheme === "dark") {
      return `${baseClasses} bg-slate-900 text-gray-200 border-slate-700/50`;
    } else {
      return `${baseClasses} bg-slate-50 text-gray-800 border-slate-200/70`;
    }
  };

  const quickLinks = [
    { name: "Home", path: "/medical-rep" },
    { name: "About", path: "/medical-rep/about" },
    { name: "Experience", path: "/medical-rep/experience" },
    { name: "Coverage", path: "/medical-rep/coverage" },
    { name: "Contact", path: "/medical-rep/contact" },
  ];

  return (
    <motion.footer className={getFooterClasses()}>
      <div className="max-w-6xl mx-auto">
        {/* Footer Top Section with Logo */}
        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center">
            <span className="text-blue-500">SYED AZADAR HUSSAIN</span> |
            <span
              className={
                currentTheme === "dark" ? "text-white" : "text-slate-800"
              }
            >
              {" "}
              MR
            </span>
          </h2>
          <div className="h-1 w-20 sm:w-24 bg-gradient-to-r from-blue-500 to-green-400 rounded-full mb-3 sm:mb-4"></div>
          <p
            className={`text-center max-w-md text-sm sm:text-base px-2 ${
              currentTheme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Dedicated Medical Representative bridging healthcare solutions with
            medical professionals.
          </p>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {/* Quick Links Section */}
          <div className="text-center sm:text-left">
            <h3
              className={`text-lg font-bold mb-3 sm:mb-4 ${
                currentTheme === "dark" ? "text-white" : "text-slate-800"
              } relative inline-block`}
            >
              Quick Links
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-green-400"></span>
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className={`${
                      currentTheme === "dark"
                        ? "text-gray-400 hover:text-blue-400"
                        : "text-gray-600 hover:text-blue-600"
                    } transition-colors duration-300 flex items-center justify-center sm:justify-start gap-2 group py-1`}
                  >
                    <ExternalLink
                      size={14}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="text-center">
            <h3
              className={`text-lg font-bold mb-3 sm:mb-4 ${
                currentTheme === "dark" ? "text-white" : "text-slate-800"
              } relative inline-block`}
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-green-400"></span>
            </h3>
            <div className="space-y-3">
              <p
                className={`${
                  currentTheme === "dark" ? "text-gray-400" : "text-gray-600"
                } flex items-center justify-center gap-2 text-sm sm:text-base break-all px-2 sm:px-0`}
              >
                <Mail size={16} className="text-blue-500 flex-shrink-0" />
                <span>syedazadarhussayn@gmail.com</span>
              </p>
              <p
                className={`${
                  currentTheme === "dark" ? "text-gray-400" : "text-gray-600"
                } flex items-center justify-center gap-2`}
              >
                <Phone size={16} className="text-blue-500 flex-shrink-0" />
                <span>Available on request</span>
              </p>
              <p
                className={`${
                  currentTheme === "dark" ? "text-gray-400" : "text-gray-600"
                } flex items-center justify-center gap-2`}
              >
                <Briefcase size={16} className="text-blue-500 flex-shrink-0" />
                <span>Medical Representative</span>
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center lg:text-right">
            <h3
              className={`text-lg font-bold mb-3 sm:mb-4 ${
                currentTheme === "dark" ? "text-white" : "text-slate-800"
              } relative inline-block`}
            >
              Connect
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-green-400"></span>
            </h3>
            <div className="flex justify-center lg:justify-end space-x-3 sm:space-x-4">
              <motion.a
                href="https://www.linkedin.com/in/syed-azadar-hussain-94325a291/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={`${
                  currentTheme === "dark"
                    ? "bg-slate-800 hover:bg-blue-500/20"
                    : "bg-slate-200 hover:bg-blue-500/10"
                } p-2 sm:p-3 rounded-full transition-colors duration-300`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin
                  size={18}
                  className={
                    currentTheme === "dark" ? "text-white" : "text-slate-700"
                  }
                />
              </motion.a>
              <motion.a
                href="https://twitter.com/syedazadarhussain"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className={`${
                  currentTheme === "dark"
                    ? "bg-slate-800 hover:bg-blue-500/20"
                    : "bg-slate-200 hover:bg-blue-500/10"
                } p-2 sm:p-3 rounded-full transition-colors duration-300`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter
                  size={18}
                  className={
                    currentTheme === "dark" ? "text-white" : "text-slate-700"
                  }
                />
              </motion.a>
              <motion.a
                href="mailto:syedazadarhussayn@gmail.com"
                aria-label="Email"
                className={`${
                  currentTheme === "dark"
                    ? "bg-slate-800 hover:bg-blue-500/20"
                    : "bg-slate-200 hover:bg-blue-500/10"
                } p-2 sm:p-3 rounded-full transition-colors duration-300`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail
                  size={18}
                  className={
                    currentTheme === "dark" ? "text-white" : "text-slate-700"
                  }
                />
              </motion.a>
              <motion.a
                href="tel:+91XXXXXXXXXX"
                aria-label="Phone"
                className={`${
                  currentTheme === "dark"
                    ? "bg-slate-800 hover:bg-blue-500/20"
                    : "bg-slate-200 hover:bg-blue-500/10"
                } p-2 sm:p-3 rounded-full transition-colors duration-300`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone
                  size={18}
                  className={
                    currentTheme === "dark" ? "text-white" : "text-slate-700"
                  }
                />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div
          className={`mt-8 sm:mt-10 pt-4 sm:pt-6 border-t ${
            currentTheme === "dark" ? "border-gray-800" : "border-gray-300"
          } text-center`}
        >
          <p
            className={`text-xs sm:text-sm ${
              currentTheme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            &copy; {currentYear} Syed Azadar Hussain. All rights reserved.
          </p>
          <p
            className={`text-xs ${
              currentTheme === "dark" ? "text-gray-500" : "text-gray-500"
            } mt-1`}
          >
            Bridging Healthcare Solutions with Medical Professionals
          </p>
        </div>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className={`fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-blue-500 text-white p-2 sm:p-3 rounded-full ${
            currentTheme === "dark"
              ? "shadow-lg shadow-blue-500/20"
              : "shadow-md shadow-blue-500/30"
          }`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowUp size={20} className="sm:hidden" />
          <ArrowUp size={24} className="hidden sm:block" />
        </motion.button>
      )}
    </motion.footer>
  );
};

export default MRFooter;
