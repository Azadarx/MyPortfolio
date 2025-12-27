import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Calendar,
  Package,
  Users,
  TrendingUp,
  Award,
  ChevronRight,
  Briefcase,
  MapPin,
  Target,
  X,
} from "lucide-react";

const Companies = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isDark] = useState(true); // Connect to your ThemeContext

  const companies = [
    {
      id: 1,
      name: "ASV Pharmaceuticals Pvt Ltd",
      shortName: "ASV Pharma",
      logo: "https://res.cloudinary.com/dbofquzdr/image/upload/f_auto,q_auto:best/v1766824523/asv_logo_placeholder.png",
      startDate: "June 2024",
      endDate: "Present",
      duration: "6 months",
      status: "current",
      division: "Dermatology Division",
      territory: "Hyderabad, Telangana",
      productCount: 17,
      therapyAreas: 5,
      coverage: "50+ Active Coverage",
      targetDoctors: "100+ Doctors",
      description:
        "Leading pharmaceutical company specializing in dermatological solutions with a comprehensive portfolio covering cosmetic, fungal, and general dermatology.",
      fullDescription:
        "ASV Pharmaceuticals is at the forefront of dermatological innovation, providing comprehensive solutions for skin and hair care. With a robust portfolio of 17+ products spanning 5 therapy areas, we deliver ethical pharmaceutical solutions that meet the highest standards of quality and efficacy.",
      achievements: [
        "Successfully launched 5+ products in territory within first 6 months",
        "Built strong relationships with 100+ dermatologists and cosmetologists",
        "Achieved 120% of quarterly targets consistently",
        "Expanded coverage across key hospitals and clinics in Hyderabad",
        "Conducted 15+ CME programs for healthcare professionals",
        "Generated 30% growth in territory sales",
      ],
      keyProducts: [
        "Vetadew Glow Serum - Niacinamide 10% formulation",
        "Follideep Hair Serum - Advanced hair growth solution",
        "Sebotri Shampoo - Anti-dandruff & antifungal",
        "Yugen UV Sunscreen - SPF 50 PA++++",
      ],
      colors: {
        primary: "from-blue-600 to-indigo-600",
        secondary: "from-blue-500/20 to-indigo-500/20",
        accent: "blue",
      },
    },
    {
      id: 2,
      name: "Future Career Opportunity",
      shortName: "Next Chapter",
      logo: null,
      startDate: null,
      endDate: null,
      duration: null,
      status: "future",
      division: "To be determined",
      territory: null,
      productCount: null,
      therapyAreas: null,
      coverage: null,
      targetDoctors: null,
      description:
        "Space reserved for future career opportunities and professional growth. Open to exploring new challenges in pharmaceutical sales and marketing.",
      achievements: [],
      colors: {
        primary: "from-slate-600 to-slate-700",
        secondary: "from-slate-500/10 to-slate-600/10",
        accent: "slate",
      },
    },
  ];

  const currentCompany = companies.find((c) => c.status === "current");

  const handleViewProducts = () => {
    window.location.href = "/medical-rep/products";
  };

  return (
    <section
      className={`relative min-h-screen py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8 ${
        isDark ? "bg-slate-900" : "bg-slate-50"
      } overflow-hidden transition-colors duration-300`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_30%_20%,rgba(37,99,235,0.15),transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(79,70,229,0.1),transparent_50%)]" />

      {/* Floating Orbs - Responsive */}
      <div className="absolute top-10 sm:top-16 md:top-20 right-10 sm:right-16 md:right-20 w-40 sm:w-64 md:w-80 lg:w-96 h-40 sm:h-64 md:h-80 lg:h-96 bg-blue-600 rounded-full filter blur-3xl opacity-5 animate-pulse" />
      <div
        className="absolute bottom-10 sm:bottom-16 md:bottom-20 left-10 sm:left-16 md:left-20 w-40 sm:w-64 md:w-80 lg:w-96 h-40 sm:h-64 md:h-80 lg:h-96 bg-indigo-600 rounded-full filter blur-3xl opacity-5 animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative z-10 w-full max-w-[95%] sm:max-w-[90%] md:max-w-6xl lg:max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 mb-4 sm:mb-5 md:mb-6 mt-4 sm:mt-6 md:mt-10 shadow-2xl shadow-blue-600/30"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Building2 className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
          </motion.div>

          <h1
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold ${
              isDark ? "text-white" : "text-slate-900"
            } mb-3 sm:mb-4 px-2 leading-tight`}
          >
            Professional Journey
          </h1>
          <div className="h-1 sm:h-1.5 w-20 sm:w-24 md:w-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 mx-auto mb-3 sm:mb-4 md:mb-6 rounded-full" />
          <p
            className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl ${
              isDark ? "text-slate-300" : "text-slate-600"
            } max-w-3xl mx-auto leading-relaxed px-4`}
          >
            Medical Representative - Pharmaceutical Sales & Marketing Excellence
          </p>
        </motion.div>

        {/* Current Company Spotlight */}
        {currentCompany && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 sm:mb-10 md:mb-12"
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl">
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${
                  isDark
                    ? "from-slate-800/90 via-slate-800/70 to-slate-900/90"
                    : "from-white via-slate-50 to-blue-50"
                }`}
              />

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-full filter blur-3xl" />
              <div className="absolute bottom-0 left-0 w-36 sm:w-56 md:w-72 h-36 sm:h-56 md:h-72 bg-gradient-to-tr from-indigo-600/15 to-purple-600/15 rounded-full filter blur-3xl" />

              <div className="relative border-2 border-blue-500/30 rounded-2xl sm:rounded-3xl">
                <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <motion.div
                      className="inline-flex items-center px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/40 backdrop-blur-sm"
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(34, 197, 94, 0.2)",
                          "0 0 30px rgba(34, 197, 94, 0.4)",
                          "0 0 20px rgba(34, 197, 94, 0.2)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <motion.div
                        className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500 mr-2 sm:mr-3"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <span className="text-green-400 text-xs sm:text-sm font-bold tracking-wide">
                        CURRENT POSITION
                      </span>
                    </motion.div>
                  </div>

                  {/* Company Info */}
                  <div className="mb-6 sm:mb-8">
                    <h2
                      className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold ${
                        isDark ? "text-white" : "text-slate-900"
                      } mb-2 sm:mb-3 leading-tight`}
                    >
                      {currentCompany.name}
                    </h2>
                    <p
                      className={`text-base sm:text-lg md:text-xl lg:text-2xl ${
                        isDark ? "text-blue-400" : "text-blue-600"
                      } font-semibold mb-3 sm:mb-4`}
                    >
                      {currentCompany.division}
                    </p>

                    <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm md:text-base">
                      <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-slate-700/50 backdrop-blur-sm">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
                        <span
                          className={`${
                            isDark ? "text-slate-300" : "text-slate-600"
                          } whitespace-nowrap`}
                        >
                          <span className="font-semibold">
                            {currentCompany.startDate}
                          </span>{" "}
                          -{" "}
                          <span className="font-semibold">
                            {currentCompany.endDate}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-slate-700/50 backdrop-blur-sm">
                        <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                        <span className="text-slate-300 font-semibold whitespace-nowrap">
                          {currentCompany.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-slate-700/50 backdrop-blur-sm">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0" />
                        <span className="text-slate-300 font-semibold whitespace-nowrap">
                          {currentCompany.territory}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mb-6 sm:mb-8 md:mb-10">
                    {[
                      {
                        icon: Package,
                        label: "Products",
                        value: currentCompany.productCount + "+",
                        color: "blue",
                      },
                      {
                        icon: Target,
                        label: "Therapy Areas",
                        value: currentCompany.therapyAreas,
                        color: "indigo",
                      },
                      {
                        icon: Users,
                        label: "Coverage",
                        value: currentCompany.coverage,
                        color: "purple",
                      },
                      {
                        icon: Briefcase,
                        label: "Doctors",
                        value: currentCompany.targetDoctors,
                        color: "violet",
                      },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className={`p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-slate-700/60 border-slate-600/50 border backdrop-blur-sm shadow-lg hover:shadow-xl transition-all`}
                      >
                        <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mb-2 sm:mb-3 text-blue-400" />
                        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
                          {stat.value}
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-slate-300">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    onClick={handleViewProducts}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group w-full px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 text-white text-sm sm:text-base md:text-lg font-bold rounded-xl sm:rounded-2xl shadow-2xl shadow-blue-600/40 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 md:gap-4"
                  >
                    <Package className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    <span className="whitespace-nowrap">
                      Explore Product Portfolio
                    </span>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* All Companies Grid */}
        <div className="mb-10 sm:mb-12 md:mb-16">
          <h3
            className={`text-xl sm:text-2xl md:text-3xl font-bold ${
              isDark ? "text-white" : "text-slate-900"
            } mb-6 sm:mb-8 text-center`}
          >
            Career Timeline
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            {companies.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={company.status === "current" ? { y: -5 } : {}}
                onClick={() =>
                  company.status === "current" && setSelectedCompany(company)
                }
                className={`group relative rounded-xl sm:rounded-2xl overflow-hidden ${
                  company.status === "future"
                    ? isDark
                      ? "bg-slate-800/30 border-slate-700/30 border-dashed"
                      : "bg-slate-100/40 border-slate-300/50 border-dashed"
                    : isDark
                    ? "bg-slate-800/80 border-slate-700/50 hover:border-blue-500/60 hover:shadow-2xl hover:shadow-blue-500/20"
                    : "bg-white border-slate-200 hover:border-blue-400 hover:shadow-2xl"
                } border-2 backdrop-blur-sm ${
                  company.status === "current"
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                } transition-all duration-500`}
              >
                {/* Hover Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    company.colors.secondary
                  } opacity-0 ${
                    company.status === "current"
                      ? "group-hover:opacity-100"
                      : ""
                  } transition-opacity duration-500`}
                />

                <div className="relative p-5 sm:p-6 md:p-8">
                  {company.status === "future" ? (
                    <div className="text-center py-10 sm:py-12 md:py-16">
                      <motion.div
                        className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-xl sm:rounded-2xl ${
                          isDark ? "bg-slate-700/50" : "bg-slate-200/50"
                        } flex items-center justify-center`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                      >
                        <Building2
                          className={`w-8 h-8 sm:w-10 sm:h-10 ${
                            isDark ? "text-slate-500" : "text-slate-400"
                          }`}
                        />
                      </motion.div>
                      <h3
                        className={`text-lg sm:text-xl md:text-2xl font-bold ${
                          isDark ? "text-slate-400" : "text-slate-500"
                        } mb-2 sm:mb-3 px-2`}
                      >
                        {company.name}
                      </h3>
                      <p
                        className={`text-xs sm:text-sm ${
                          isDark ? "text-slate-500" : "text-slate-400"
                        } max-w-xs mx-auto leading-relaxed px-2`}
                      >
                        {company.description}
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between mb-4 sm:mb-6">
                        <div className="flex-1 min-w-0">
                          <h3
                            className={`text-lg sm:text-xl md:text-2xl font-bold ${
                              isDark ? "text-white" : "text-slate-900"
                            } mb-2 ${
                              company.status === "current"
                                ? "group-hover:text-blue-400"
                                : ""
                            } transition-colors duration-300 break-words`}
                          >
                            {company.name}
                          </h3>
                          <p
                            className={`text-sm sm:text-base ${
                              isDark ? "text-slate-300" : "text-slate-600"
                            } font-medium mb-3 sm:mb-4`}
                          >
                            {company.division}
                          </p>
                          <div
                            className={`inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold ${
                              company.status === "current"
                                ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-2 border-green-500/40"
                                : "bg-blue-500/20 text-blue-400 border-2 border-blue-500/30"
                            }`}
                          >
                            {company.status === "current"
                              ? "Currently Working"
                              : "Past Experience"}
                          </div>
                        </div>
                        {company.status === "current" && (
                          <ChevronRight
                            className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex-shrink-0 ml-2 ${
                              isDark ? "text-slate-400" : "text-slate-500"
                            } group-hover:text-blue-400 group-hover:translate-x-2 transition-all duration-300`}
                          />
                        )}
                      </div>

                      <p
                        className={`text-sm sm:text-base ${
                          isDark ? "text-slate-300" : "text-slate-600"
                        } leading-relaxed mb-4 sm:mb-6`}
                      >
                        {company.description}
                      </p>

                      <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <Calendar
                            className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${
                              isDark ? "text-blue-400" : "text-blue-600"
                            }`}
                          />
                          <span
                            className={`font-semibold ${
                              isDark ? "text-slate-300" : "text-slate-600"
                            }`}
                          >
                            {company.duration}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Key Achievements Section */}
        {currentCompany && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3
              className={`text-xl sm:text-2xl md:text-3xl font-bold ${
                isDark ? "text-white" : "text-slate-900"
              } mb-6 sm:mb-8 text-center`}
            >
              Key Achievements & Impact
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {currentCompany.achievements.map((achievement, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  whileHover={{ scale: 1.02, y: -3 }}
                  className={`flex items-start gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl ${
                    isDark
                      ? "bg-slate-800/80 border-slate-700/50 hover:border-blue-500/50"
                      : "bg-white border-slate-200 hover:border-blue-400"
                  } border-2 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <motion.div
                    className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </motion.div>
                  <p
                    className={`text-xs sm:text-sm md:text-base ${
                      isDark ? "text-slate-300" : "text-slate-600"
                    } leading-relaxed font-medium`}
                  >
                    {achievement}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Detailed Company Modal */}
      <AnimatePresence>
        {selectedCompany && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCompany(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-lg"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl sm:rounded-3xl ${
                isDark
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-slate-200"
              } border-2 shadow-2xl`}
            >
              {/* Header */}
              <div
                className={`sticky top-0 z-10 flex items-center justify-between p-4 sm:p-6 md:p-8 border-b-2 ${
                  isDark
                    ? "border-slate-700 bg-slate-800/95"
                    : "border-slate-200 bg-white/95"
                } backdrop-blur-sm`}
              >
                <div className="flex-1 min-w-0 pr-4">
                  <h2
                    className={`text-xl sm:text-2xl md:text-3xl font-bold ${
                      isDark ? "text-white" : "text-slate-900"
                    } mb-1 sm:mb-2 break-words`}
                  >
                    {selectedCompany.name}
                  </h2>
                  <p
                    className={`text-sm sm:text-base md:text-lg ${
                      isDark ? "text-blue-400" : "text-blue-600"
                    } font-semibold`}
                  >
                    {selectedCompany.division}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCompany(null)}
                  className={`flex-shrink-0 p-2 sm:p-3 rounded-xl ${
                    isDark
                      ? "hover:bg-slate-700 text-slate-400 hover:text-white"
                      : "hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                  } transition-all duration-300`}
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-100px)] sm:max-h-[calc(90vh-120px)] md:max-h-[calc(90vh-140px)] p-4 sm:p-6 md:p-8">
                <div className="space-y-6 sm:space-y-8">
                  {/* Description */}
                  <div>
                    <h3
                      className={`text-lg sm:text-xl font-bold ${
                        isDark ? "text-white" : "text-slate-900"
                      } mb-3 sm:mb-4`}
                    >
                      About the Company
                    </h3>
                    <p
                      className={`text-sm sm:text-base ${
                        isDark ? "text-slate-300" : "text-slate-600"
                      } leading-relaxed`}
                    >
                      {selectedCompany.fullDescription}
                    </p>
                  </div>

                  {/* Key Products */}
                  {selectedCompany.keyProducts && (
                    <div>
                      <h3
                        className={`text-lg sm:text-xl font-bold ${
                          isDark ? "text-white" : "text-slate-900"
                        } mb-3 sm:mb-4`}
                      >
                        Key Products Handled
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {selectedCompany.keyProducts.map((product, i) => (
                          <div
                            key={i}
                            className={`p-3 sm:p-4 rounded-xl ${
                              isDark ? "bg-slate-700/50" : "bg-slate-50"
                            } border ${
                              isDark ? "border-slate-600" : "border-slate-200"
                            }`}
                          >
                            <p
                              className={`text-xs sm:text-sm font-medium ${
                                isDark ? "text-slate-300" : "text-slate-600"
                              }`}
                            >
                              {product}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Achievements */}
                  <div>
                    <h3
                      className={`text-lg sm:text-xl font-bold ${
                        isDark ? "text-white" : "text-slate-900"
                      } mb-3 sm:mb-4`}
                    >
                      Professional Achievements
                    </h3>

                    <div className="space-y-2 sm:space-y-3">
                      {selectedCompany.achievements.map((achievement, i) => (
                        <div
                          key={i}
                          className={`flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl ${
                            isDark
                              ? "bg-slate-700/50 border-slate-600"
                              : "bg-blue-50 border-blue-100"
                          } border`}
                        >
                          <Award
                            className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 ${
                              isDark ? "text-blue-400" : "text-blue-600"
                            }`}
                          />
                          <p
                            className={`text-xs sm:text-sm font-medium ${
                              isDark ? "text-slate-300" : "text-slate-700"
                            }`}
                          >
                            {achievement}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={handleViewProducts}
                    className="w-full px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 text-white text-sm sm:text-base md:text-lg font-bold rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3"
                  >
                    <Package className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="whitespace-nowrap">
                      View Complete Product Portfolio
                    </span>
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Companies;
