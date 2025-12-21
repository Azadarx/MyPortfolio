import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import {
  MapPin,
  Users,
  Building2,
  Stethoscope,
  Target,
  TrendingUp,
  Award,
  ClipboardCheck,
  MessageSquare,
} from "lucide-react";

const Coverage = () => {
  const { currentTheme } = useTheme();
  const isDark = currentTheme === "dark";
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("coverage");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const doctorCoverage = [
    {
      category: "A Category Doctors",
      description: "High-volume prescription generators with monthly visit frequency",
      icon: Target,
    },
    {
      category: "B Category Doctors",
      description: "Medium-volume prescribers with bi-weekly visit schedules",
      icon: Users,
    },
    {
      category: "C Category Doctors",
      description: "Emerging prescribers with weekly to monthly visit rotation",
      icon: TrendingUp,
    },
  ];

  const dermatologySegments = [
    "General skin care products",
    "Hair care and scalp treatments",
    "Fungal dermatology solutions",
    "Cosmetic dermatology products",
    "Anti-acne and anti-aging formulations",
  ];

  const chemistResponsibilities = [
    {
      title: "Relationship Management",
      description: "Building strong partnerships with key retail and hospital pharmacies",
      icon: Users,
    },
    {
      title: "Stock Coordination",
      description: "Ensuring product availability and timely stock replenishment",
      icon: ClipboardCheck,
    },
    {
      title: "Prescription Tracking",
      description: "Monitoring prescription-to-dispensing flow for market insights",
      icon: MessageSquare,
    },
  ];

  const fieldContributions = [
    {
      icon: Users,
      title: "Doctor Engagement",
      description: "Consistent ethical detailing and relationship building with dermatologists",
    },
    {
      icon: Target,
      title: "Territory Development",
      description: "Strategic territory expansion and market stabilization efforts",
    },
    {
      icon: TrendingUp,
      title: "Market Intelligence",
      description: "Regular feedback reporting on market trends and competitive activities",
    },
    {
      icon: Award,
      title: "Brand Visibility",
      description: "Support in promotional initiatives and brand awareness campaigns",
    },
  ];

  return (
    <section
      id="coverage"
      className={`relative py-16 px-4 ${
        isDark ? "bg-slate-900" : "bg-slate-50"
      } overflow-hidden min-h-screen transition-colors duration-300`}
    >
      {/* Background elements */}
      <div
        className={`absolute inset-0 w-full h-full ${
          isDark
            ? "bg-[radial-gradient(ellipse_at_30%_20%,rgba(37,99,235,0.15),transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(79,70,229,0.1),transparent_50%)]"
            : "bg-[radial-gradient(ellipse_at_30%_20%,rgba(37,99,235,0.08),transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(79,70,229,0.06),transparent_50%)]"
        }`}
      />

      <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl opacity-5 animate-pulse"></div>
      <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-indigo-600 rounded-full filter blur-3xl opacity-5 animate-pulse"></div>

      <div className="relative mt-10 z-10 w-full max-w-6xl mx-auto">
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
            Doctor Coverage & Field Responsibilities
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 mx-auto mb-6"></div>
          <p
            className={`text-lg ${
              isDark ? "text-slate-300" : "text-slate-600"
            } max-w-2xl mx-auto transition-colors duration-300`}
          >
            Focused dermatology field operations within assigned Hyderabad territory
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8"
        >
          {/* Doctor Coverage Approach */}
          <motion.div variants={itemVariants}>
            <h2
              className={`text-2xl font-bold mb-6 ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Doctor Coverage Approach
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {doctorCoverage.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className={`rounded-xl ${
                      isDark
                        ? "bg-slate-800/60 backdrop-blur-sm border-slate-700/50"
                        : "bg-white/80 backdrop-blur-sm border-slate-200/70"
                    } border p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                  >
                    <div
                      className={`p-3 rounded-lg mb-4 inline-block ${
                        isDark ? "bg-blue-900/40" : "bg-blue-50"
                      }`}
                    >
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3
                      className={`text-lg font-semibold mb-2 ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {item.category}
                    </h3>
                    <p
                      className={`text-sm ${
                        isDark ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className={`mt-6 p-6 rounded-xl ${
                isDark
                  ? "bg-slate-800/40 border-slate-700/30"
                  : "bg-blue-50/50 border-blue-100"
              } border`}
            >
              <p
                className={`text-sm leading-relaxed ${
                  isDark ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Coverage strategy focuses on ethical detailing aligned with company standards,
                regular field visits based on prescription potential, and building long-term
                professional relationships with dermatologists across all categories.
              </p>
            </motion.div>
          </motion.div>

          {/* Therapy Segment */}
          <motion.div
            variants={itemVariants}
            className={`rounded-xl ${
              isDark
                ? "bg-slate-800/60 backdrop-blur-sm border-slate-700/50"
                : "bg-white/80 backdrop-blur-sm border-slate-200/70"
            } border p-8 shadow-xl transition-all duration-300`}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div
                className={`p-3 rounded-lg ${
                  isDark ? "bg-blue-900/40" : "bg-blue-50"
                }`}
              >
                <Stethoscope className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2
                  className={`text-2xl font-bold ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  Dermatology Division
                </h2>
                <p
                  className={`text-sm ${
                    isDark ? "text-blue-400" : "text-blue-600"
                  } font-medium`}
                >
                  Primary & Exclusive Focus
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dermatologySegments.map((segment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
                  className={`px-4 py-3 rounded-lg ${
                    isDark ? "bg-slate-900/40" : "bg-slate-50"
                  } flex items-center space-x-2`}
                >
                  <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                  <span
                    className={`text-sm font-medium ${
                      isDark ? "text-slate-200" : "text-slate-700"
                    }`}
                  >
                    {segment}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Territory Coverage */}
          <motion.div
            variants={itemVariants}
            className={`rounded-xl ${
              isDark
                ? "bg-slate-800/60 backdrop-blur-sm border-slate-700/50"
                : "bg-white/80 backdrop-blur-sm border-slate-200/70"
            } border p-8 shadow-xl transition-all duration-300`}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div
                className={`p-3 rounded-lg ${
                  isDark ? "bg-blue-900/40" : "bg-blue-50"
                }`}
              >
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <h2
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Territory Covered
              </h2>
            </div>
            <div
              className={`p-6 rounded-lg ${
                isDark ? "bg-slate-900/40" : "bg-blue-50"
              }`}
            >
              <div className="flex items-center justify-center space-x-4 mb-4">
                <span
                  className={`text-2xl font-bold ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  Mehdipatnam
                </span>
                <div className="flex items-center space-x-2">
                  <div className="h-0.5 w-8 bg-blue-600"></div>
                  <div className="w-3 h-3 border-2 border-blue-600 rounded-full bg-blue-600"></div>
                  <div className="h-0.5 w-8 bg-blue-600"></div>
                </div>
                <span
                  className={`text-2xl font-bold ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  Hi-Tech City
                </span>
              </div>
              <p
                className={`text-center text-sm ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Hyderabad, Telangana
              </p>
            </div>
          </motion.div>

          {/* Chemist & Market Coordination */}
          <motion.div variants={itemVariants}>
            <h2
              className={`text-2xl font-bold mb-6 ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Chemist & Market Coordination
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {chemistResponsibilities.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    className={`rounded-xl ${
                      isDark
                        ? "bg-slate-800/60 backdrop-blur-sm border-slate-700/50"
                        : "bg-white/80 backdrop-blur-sm border-slate-200/70"
                    } border p-6 shadow-lg transition-all duration-300`}
                  >
                    <div
                      className={`p-3 rounded-lg mb-4 inline-block ${
                        isDark ? "bg-blue-900/40" : "bg-blue-50"
                      }`}
                    >
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3
                      className={`text-lg font-semibold mb-2 ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-sm ${
                        isDark ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
              className={`mt-6 p-6 rounded-xl ${
                isDark
                  ? "bg-slate-800/40 border-slate-700/30"
                  : "bg-blue-50/50 border-blue-100"
              } border`}
            >
              <div className="flex items-start space-x-3">
                <Building2
                  className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                    isDark ? "text-blue-400" : "text-blue-600"
                  }`}
                />
                <p
                  className={`text-sm leading-relaxed ${
                    isDark ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  Coordination extends across retail pharmacies, hospital pharmacies, and
                  chain outlets within the assigned territory, ensuring seamless
                  prescription-to-dispensing workflow and maintaining strong professional
                  relationships with key stakeholders.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Field Contributions */}
          <motion.div variants={itemVariants}>
            <h2
              className={`text-2xl font-bold mb-6 text-center ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Field Contributions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fieldContributions.map((contribution, index) => {
                const Icon = contribution.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                    className={`rounded-xl ${
                      isDark
                        ? "bg-slate-800/60 backdrop-blur-sm border-slate-700/50"
                        : "bg-white/80 backdrop-blur-sm border-slate-200/70"
                    } border p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg ${
                        isDark ? "bg-blue-900/40" : "bg-blue-50"
                      } flex items-center justify-center mb-4`}
                    >
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3
                      className={`text-lg font-semibold mb-2 ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {contribution.title}
                    </h3>
                    <p
                      className={`text-sm ${
                        isDark ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      {contribution.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Professional Approach Statement */}
          <motion.div
            variants={itemVariants}
            className={`rounded-xl ${
              isDark
                ? "bg-gradient-to-br from-blue-900/20 to-slate-800/40 border-blue-900/30"
                : "bg-gradient-to-br from-blue-50 to-slate-50 border-blue-100"
            } border p-8 shadow-xl text-center`}
          >
            <p
              className={`text-lg leading-relaxed ${
                isDark ? "text-slate-200" : "text-slate-700"
              }`}
            >
              Field operations are guided by ethical promotion practices, consistent doctor
              engagement, and a commitment to territory development while maintaining
              professional standards aligned with company values and healthcare industry
              regulations.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Coverage;