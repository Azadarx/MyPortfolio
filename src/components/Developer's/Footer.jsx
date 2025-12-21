import { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUp,
  Twitter,
  Code,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const DeveloperFooter = () => {
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
      return `${baseClasses} bg-slate-900 text-gray-200 border-teal-500/20`;
    } else {
      return `${baseClasses} bg-slate-100 text-gray-800 border-teal-500/10`;
    }
  };

  const quickLinks = [
    { name: "Home", path: "/developer" },
    { name: "About", path: "/developer/about" },
    { name: "Projects", path: "/developer/projects" },
    { name: "Skills", path: "/developer/skills" },
    { name: "Contact", path: "/developer/contact" },
  ];

  return (
    <motion.footer className={getFooterClasses()}>
      <div className="max-w-6xl mx-auto">
        {/* Footer Top Section with Logo */}
        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center">
            <span className="text-teal-500">SYED AZADAR HUSSAIN</span> |
            <span
              className={
                currentTheme === "dark" ? "text-white" : "text-slate-800"
              }
            >
              {" "}
              Dev
            </span>
          </h2>
          <div className="h-1 w-20 sm:w-24 bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full mb-3 sm:mb-4"></div>
          <p
            className={`text-center max-w-md text-sm sm:text-base px-2 ${
              currentTheme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Passionate full-stack developer creating elegant, user-centric
            digital experiences.
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
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-teal-500 to-cyan-400"></span>
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className={`${
                      currentTheme === "dark"
                        ? "text-gray-400 hover:text-teal-400"
                        : "text-gray-600 hover:text-teal-600"
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
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-teal-500 to-cyan-400"></span>
            </h3>
            <div className="space-y-3">
              <p
                className={`${
                  currentTheme === "dark" ? "text-gray-400" : "text-gray-600"
                } flex items-center justify-center gap-2 text-sm sm:text-base break-all px-2 sm:px-0`}
              >
                <Mail size={16} className="text-teal-500 flex-shrink-0" />
                <span>syedazadarhussayn@gmail.com</span>
              </p>
              <p
                className={`${
                  currentTheme === "dark" ? "text-gray-400" : "text-gray-600"
                } flex items-center justify-center gap-2`}
              >
                <Code size={16} className="text-teal-500 flex-shrink-0" />
                <span>Full Stack Developer</span>
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
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-teal-500 to-cyan-400"></span>
            </h3>
            <div className="flex justify-center lg:justify-end space-x-3 sm:space-x-4">
              <motion.a
                href="https://github.com/azadarx"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={`${
                  currentTheme === "dark"
                    ? "bg-slate-800 hover:bg-teal-500/20"
                    : "bg-slate-200 hover:bg-teal-500/10"
                } p-2 sm:p-3 rounded-full transition-colors duration-300`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github
                  size={18}
                  className={
                    currentTheme === "dark" ? "text-white" : "text-slate-700"
                  }
                />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/syed-azadar-hussain-94325a291/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={`${
                  currentTheme === "dark"
                    ? "bg-slate-800 hover:bg-teal-500/20"
                    : "bg-slate-200 hover:bg-teal-500/10"
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
                    ? "bg-slate-800 hover:bg-teal-500/20"
                    : "bg-slate-200 hover:bg-teal-500/10"
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
                    ? "bg-slate-800 hover:bg-teal-500/20"
                    : "bg-slate-200 hover:bg-teal-500/10"
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
            Designed & Built with ❤️ using React & Tailwind CSS
          </p>
        </div>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className={`fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-teal-500 text-white p-2 sm:p-3 rounded-full ${
            currentTheme === "dark"
              ? "shadow-lg shadow-teal-500/20"
              : "shadow-md shadow-teal-500/30"
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

export default DeveloperFooter;