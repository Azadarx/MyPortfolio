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
    const baseClasses =
      "py-6 sm:py-8 md:py-10 lg:py-12 px-3 sm:px-4 md:px-6 relative border-t";

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
        <div className="flex flex-col items-center mb-4 sm:mb-6 md:mb-8">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-1.5 sm:mb-2 text-center">
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
          <div className="h-1 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-blue-500 to-green-400 rounded-full mb-3 sm:mb-4"></div>
          <p
            className={`text-center max-w-md text-xs sm:text-sm md:text-base px-2 sm:px-4 ${
              currentTheme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Dedicated Medical Representative bridging healthcare solutions with
            medical professionals.
          </p>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {/* Quick Links Section */}
          <div className="text-center sm:text-left">
            <h3
              className={`text-base sm:text-lg font-bold mb-2 sm:mb-3 md:mb-4 ${
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
              className={`text-base sm:text-lg font-bold mb-2 sm:mb-3 md:mb-4 ${
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
                } flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base break-all px-2 sm:px-0`}
              >
                <Mail
                  size={16}
                  className="text-blue-500 flex-shrink-0 sm:w-4 sm:h-4 sm:w-4 sm:h-4"
                />
                <span>syedazadarhussayn@gmail.com</span>
              </p>
              <p
                className={`${
                  currentTheme === "dark" ? "text-gray-400" : "text-gray-600"
                } flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base`}
              >
                <Phone
                  size={16}
                  className="text-blue-500 flex-shrink-0 sm:w-4 sm:h-4 sm:w-4 sm:h-4"
                />
                <span>Available on request</span>
              </p>
              <p
                className={`${
                  currentTheme === "dark" ? "text-gray-400" : "text-gray-600"
                } flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base`}
              >
                <Briefcase
                  size={16}
                  className="text-blue-500 flex-shrink-0 sm:w-4 sm:h-4 sm:w-4 sm:h-4"
                />
                <span>Medical Representative</span>
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center lg:text-right">
            <h3
              className={`text-base sm:text-lg font-bold mb-2 sm:mb-3 md:mb-4 ${
                currentTheme === "dark" ? "text-white" : "text-slate-800"
              } relative inline-block`}
            >
              Connect
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-green-400"></span>
            </h3>
            <div className="flex justify-center lg:justify-end space-x-2 sm:space-x-3 md:space-x-4">
              <motion.a
                href="https://www.linkedin.com/in/syed-azadar-hussain-94325a291/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={`${
                  currentTheme === "dark"
                    ? "bg-slate-800 hover:bg-blue-500/20"
                    : "bg-slate-200 hover:bg-blue-500/10"
                } p-2 sm:p-2.5 md:p-3 rounded-full transition-colors duration-300`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin
                  size={16}
                  className={
                    "sm:w-[18px] sm:h-[18px]" + currentTheme === "dark"
                      ? "text-white"
                      : "text-slate-700"
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
                } p-2 sm:p-2.5 md:p-3 rounded-full transition-colors duration-300`}
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
                } p-2 sm:p-2.5 md:p-3 rounded-full transition-colors duration-300`}
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
                } p-2 sm:p-2.5 md:p-3 rounded-full transition-colors duration-300`}
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
          className={`mt-6 sm:mt-8 md:mt-10 pt-3 sm:pt-4 md:pt-6 border-t ${
            currentTheme === "dark" ? "border-gray-800" : "border-gray-300"
          } text-center`}
        >
          <p
            className={`text-[10px] sm:text-xs md:text-sm ${
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
          className={`fixed bottom-3 right-3 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 bg-blue-500 text-white p-2 sm:p-2.5 md:p-3 rounded-full ${
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
          <ArrowUp size={18} className="sm:hidden" />
          <ArrowUp size={20} className="hidden sm:block md:hidden" />
          <ArrowUp size={24} className="hidden md:block" />
        </motion.button>
      )}
    </motion.footer>
  );
};

export default MRFooter;
