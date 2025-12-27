import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Building2,
  Award,
  TrendingUp,
  Users,
  Phone,
  Mail,
  ExternalLink,
  Calendar,
  Stethoscope,
  Target,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import MRProfileImg from "../../assets/MRprofile.jpg";

const MedicalRepHome = () => {
  const { currentTheme } = useTheme();
  const [experience, setExperience] = useState({
    years: 0,
    months: 0,
    days: 0,
  });

  // Calculate real-time experience from June 1, 2025
  useEffect(() => {
    const calculateExperience = () => {
      const startDate = new Date("2025-06-01");
      const currentDate = new Date();

      let years = currentDate.getFullYear() - startDate.getFullYear();
      let months = currentDate.getMonth() - startDate.getMonth();
      let days = currentDate.getDate() - startDate.getDate();

      if (days < 0) {
        months--;
        const lastMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          0
        );
        days += lastMonth.getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      setExperience({ years, months, days });
    };

    calculateExperience();
    const interval = setInterval(calculateExperience, 86400000); // Update daily

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        currentTheme === "dark" ? "bg-slate-900" : "bg-gray-50"
      }`}
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 right-0 w-96 h-96 rounded-full filter blur-3xl ${
            currentTheme === "dark" ? "bg-blue-900/10" : "bg-blue-100/30"
          }`}
        ></div>
        <div
          className={`absolute bottom-20 left-0 w-96 h-96 rounded-full filter blur-3xl ${
            currentTheme === "dark" ? "bg-blue-800/10" : "bg-sky-100/30"
          }`}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 sm:mb-16 md:mb-20 mt-12 sm:mt-16"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-8">
              <div className="relative group">
                {/* Animated gradient background glow */}
                <div
                  className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${
                    currentTheme === "dark"
                      ? "from-blue-600 via-indigo-600 to-blue-700"
                      : "from-blue-500 via-indigo-500 to-blue-600"
                  } opacity-75 blur-xl group-hover:opacity-100 transition-opacity duration-500`}
                ></div>

                {/* Main container */}
                <div
                  className={`relative rounded-3xl ${
                    currentTheme === "dark"
                      ? "bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/50"
                      : "bg-gradient-to-br from-white to-slate-50/50 border border-slate-200"
                  } p-3 shadow-2xl backdrop-blur-sm`}
                >
                  {/* Inner frame with double ring effect */}
                  <div className="relative">
                    <div
                      className={`absolute -inset-2 rounded-2xl ${
                        currentTheme === "dark"
                          ? "bg-gradient-to-br from-blue-500/20 to-indigo-600/20"
                          : "bg-gradient-to-br from-blue-400/20 to-indigo-500/20"
                      } blur-md`}
                    ></div>

                    <div
                      className={`relative rounded-2xl overflow-hidden ${
                        currentTheme === "dark"
                          ? "ring-2 ring-blue-500/50 ring-offset-4 ring-offset-slate-800"
                          : "ring-2 ring-blue-400/50 ring-offset-4 ring-offset-white"
                      } shadow-xl`}
                    >
                      {/* Image container */}
                      <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 group-hover:scale-105 transition-transform duration-500">
                        <img
                          src={MRProfileImg}
                          alt="Syed Azadar Hussain"
                          className="w-full h-full object-cover"
                        />

                        {/* Gradient overlay */}
                        <div
                          className={`absolute inset-0 ${
                            currentTheme === "dark"
                              ? "bg-gradient-to-t from-blue-900/30 via-transparent to-transparent"
                              : "bg-gradient-to-t from-blue-100/30 via-transparent to-transparent"
                          } group-hover:opacity-0 transition-opacity duration-500`}
                        ></div>

                        {/* Professional badge overlay */}
                        <div
                          className={`absolute bottom-0 left-0 right-0 ${
                            currentTheme === "dark"
                              ? "bg-slate-900/90"
                              : "bg-white/90"
                          } backdrop-blur-sm py-1.5 px-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300`}
                        >
                          <p
                            className={`text-[10px] font-semibold text-center ${
                              currentTheme === "dark"
                                ? "text-blue-400"
                                : "text-blue-600"
                            }`}
                          >
                            FSO - Dermatology
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative corner accents */}
                  <div
                    className={`absolute top-1 left-1 w-5 h-5 border-t-2 border-l-2 rounded-tl-2xl ${
                      currentTheme === "dark"
                        ? "border-blue-500/50"
                        : "border-blue-400/50"
                    }`}
                  ></div>
                  <div
                    className={`absolute bottom-1 right-1 w-5 h-5 border-b-2 border-r-2 rounded-br-2xl ${
                      currentTheme === "dark"
                        ? "border-blue-500/50"
                        : "border-blue-400/50"
                    }`}
                  ></div>
                </div>
              </div>
            </div>

            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 ${
                currentTheme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              Syed Azadar Hussain
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 text-blue-600">
              Medical Representative
            </p>

            <p
              className={`text-lg sm:text-xl mb-2 ${
                currentTheme === "dark" ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Field Sales Officer (FSO)
            </p>

            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-600"></div>
              <span
                className={`text-sm font-medium ${
                  currentTheme === "dark" ? "text-blue-400" : "text-blue-600"
                }`}
              >
                Dermatology Division
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-600"></div>
            </div>

            {/* Professional Tagline */}
            <motion.p
              variants={itemVariants}
              className={`text-base sm:text-lg md:text-xl font-medium mb-8 max-w-3xl mx-auto ${
                currentTheme === "dark" ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Delivering Evidence-Based Solutions | Building Healthcare
              Partnerships | Driving Territory Growth
            </motion.p>

            {/* Experience Counter */}
            <motion.div
              variants={itemVariants}
              className={`inline-flex items-center gap-3 sm:gap-4 md:gap-6 px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl ${
                currentTheme === "dark"
                  ? "bg-slate-800/70 border border-blue-900/30"
                  : "bg-white border border-blue-100"
              } shadow-lg mb-10`}
            >
              <Calendar className="w-5 h-5 text-blue-600" />
              <div className="flex gap-6 text-center">
                <div>
                  <div
                    className={`text-2xl sm:text-3xl font-bold ${
                      currentTheme === "dark" ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {experience.years}
                  </div>
                  <div
                    className={`text-xs font-medium ${
                      currentTheme === "dark"
                        ? "text-slate-400"
                        : "text-slate-600"
                    }`}
                  >
                    Years
                  </div>
                </div>
                <div
                  className={`w-px ${
                    currentTheme === "dark" ? "bg-slate-700" : "bg-slate-200"
                  }`}
                ></div>
                <div>
                  <div
                    className={`text-2xl sm:text-3xl font-bold ${
                      currentTheme === "dark" ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {experience.months}
                  </div>
                  <div
                    className={`text-xs font-medium ${
                      currentTheme === "dark"
                        ? "text-slate-400"
                        : "text-slate-600"
                    }`}
                  >
                    Months
                  </div>
                </div>
                <div
                  className={`w-px ${
                    currentTheme === "dark" ? "bg-slate-700" : "bg-slate-200"
                  }`}
                ></div>
                <div>
                  <div
                    className={`text-2xl sm:text-3xl font-bold ${
                      currentTheme === "dark" ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {experience.days}
                  </div>
                  <div
                    className={`text-xs font-medium ${
                      currentTheme === "dark"
                        ? "text-slate-400"
                        : "text-slate-600"
                    }`}
                  >
                    Days
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center"
            >
              <a
                href="/medical-rep/experience"
                className={`group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-lg font-semibold transition-all duration-300 ${
                  currentTheme === "dark"
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                } shadow-lg hover:shadow-xl hover:scale-105`}
              >
                View My Experience
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/medical-rep/coverage"
                className={`group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-lg font-semibold transition-all duration-300 ${
                  currentTheme === "dark"
                    ? "bg-slate-800 hover:bg-slate-700 text-white border-2 border-slate-700"
                    : "bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200"
                } shadow-lg hover:shadow-xl hover:scale-105`}
              >
                Doctor Coverage & Achievements
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/medical-rep/contact"
                className={`group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-lg font-semibold transition-all duration-300 ${
                  currentTheme === "dark"
                    ? "bg-slate-800 hover:bg-slate-700 text-white border-2 border-slate-700"
                    : "bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200"
                } shadow-lg hover:shadow-xl hover:scale-105`}
              >
                Contact Me
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Core Strengths */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className={`text-3xl sm:text-4xl font-bold text-center mb-12 ${
              currentTheme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            Core Competencies
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                icon: Users,
                title: "Doctor Relationship Management",
                description:
                  "Building trust and long-term partnerships with healthcare professionals",
              },
              {
                icon: TrendingUp,
                title: "Sales Growth",
                description:
                  "Consistent achievement of sales targets and revenue expansion",
              },
              {
                icon: Target,
                title: "Territory Expansion",
                description:
                  "Strategic territory development and market penetration",
              },
            ].map((strength, index) => (
              <motion.div
                key={strength.title}
                variants={itemVariants}
                className={`p-6 rounded-xl transition-all duration-300 ${
                  currentTheme === "dark"
                    ? "bg-slate-800/50 border border-slate-700 hover:border-blue-900/50"
                    : "bg-white border border-slate-200 hover:border-blue-200"
                } shadow-lg hover:shadow-xl hover:scale-105`}
              >
                <div
                  className={`inline-flex p-4 rounded-lg mb-4 ${
                    currentTheme === "dark" ? "bg-blue-900/20" : "bg-blue-50"
                  }`}
                >
                  <strength.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3
                  className={`text-xl font-bold mb-2 ${
                    currentTheme === "dark" ? "text-white" : "text-slate-900"
                  }`}
                >
                  {strength.title}
                </h3>
                <p
                  className={
                    currentTheme === "dark"
                      ? "text-slate-400"
                      : "text-slate-600"
                  }
                >
                  {strength.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Territory Coverage */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.div
            variants={itemVariants}
            className={`p-8 rounded-xl ${
              currentTheme === "dark"
                ? "bg-slate-800/50 border border-slate-700"
                : "bg-white border border-slate-200"
            } shadow-lg`}
          >
            <div className="flex items-start gap-4 mb-4">
              <div
                className={`p-3 rounded-lg ${
                  currentTheme === "dark" ? "bg-blue-900/20" : "bg-blue-50"
                }`}
              >
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3
                  className={`text-2xl font-bold mb-2 ${
                    currentTheme === "dark" ? "text-white" : "text-slate-900"
                  }`}
                >
                  Territory Coverage
                </h3>
                <p
                  className={`text-lg ${
                    currentTheme === "dark"
                      ? "text-slate-300"
                      : "text-slate-700"
                  }`}
                >
                  Mehdipatnam to Hi-Tech City, Hyderabad
                </p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Company Information */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className={`text-3xl sm:text-4xl font-bold text-center mb-12 ${
              currentTheme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            Current Organization
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className={`max-w-4xl mx-auto p-8 rounded-xl ${
              currentTheme === "dark"
                ? "bg-slate-800/50 border border-slate-700"
                : "bg-white border border-slate-200"
            } shadow-xl`}
          >
            <div className="flex items-start gap-6 mb-6">
              <div
                className={`p-4 rounded-lg ${
                  currentTheme === "dark" ? "bg-blue-900/20" : "bg-blue-50"
                }`}
              >
                <Building2 className="w-10 h-10 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3
                  className={`text-2xl sm:text-3xl font-bold mb-2 ${
                    currentTheme === "dark" ? "text-white" : "text-slate-900"
                  }`}
                >
                  ASV Pharmaceuticals Pvt. Ltd.
                </h3>
                <p
                  className={`text-sm font-medium mb-4 ${
                    currentTheme === "dark" ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  Bangalore-Based Pharmaceutical Company
                </p>
              </div>
            </div>

            <div
              className={`p-6 rounded-lg ${
                currentTheme === "dark" ? "bg-slate-900/50" : "bg-slate-50"
              }`}
            >
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p
                    className={`font-medium mb-2 ${
                      currentTheme === "dark" ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Corporate Address
                  </p>
                  <p
                    className={`leading-relaxed ${
                      currentTheme === "dark"
                        ? "text-slate-300"
                        : "text-slate-700"
                    }`}
                  >
                    68, 3rd Main Rd, 6th Cross Rd,
                    <br />
                    Jnana Jyothi Nagar, Nagdevanahalli,
                    <br />
                    Bengaluru, Karnataka 560056
                  </p>
                </div>
              </div>

              <a
                href="https://maps.app.goo.gl/o3wBJVbjb9KTPCih6"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  currentTheme === "dark"
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                } hover:scale-105`}
              >
                <ExternalLink className="w-4 h-4" />
                View on Google Maps
              </a>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default MedicalRepHome;
