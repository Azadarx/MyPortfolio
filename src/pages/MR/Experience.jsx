import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { Briefcase, Calendar, MapPin, TrendingUp, Users, Award } from "lucide-react";

const Experience = () => {
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

    const section = document.getElementById("experience");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // Calculate years of experience (example start date)
  const startDate = new Date("2022-01-15");
  const currentDate = new Date();
  const yearsOfExperience = (
    (currentDate - startDate) /
    (1000 * 60 * 60 * 24 * 365)
  ).toFixed(1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const responsibilities = [
    "Conduct daily doctor detailing sessions with dermatologists and general physicians",
    "Coordinate with chemists for prescription tracking and product availability",
    "Generate new prescriptions through effective product presentations",
    "Submit monthly market feedback reports and competitive analysis",
    "Achieve monthly sales targets through strategic territory management",
    "Organize CME programs and doctor engagement activities",
  ];

  const achievements = [
    {
      icon: TrendingUp,
      title: "Sales Growth",
      description: "Achieved 25% growth in prescription generation year-over-year",
    },
    {
      icon: Users,
      title: "Doctor Network",
      description: "Built strong relationships with 150+ healthcare professionals",
    },
    {
      icon: Award,
      title: "Recognition",
      description: "Received 'Best Performer' award for consistent target achievement",
    },
  ];

  return (
    <section
      id="experience"
      className={`relative py-16 px-4 ${
        isDark ? "bg-slate-900" : "bg-slate-50"
      } overflow-hidden min-h-screen transition-colors duration-300`}
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
            Professional Experience
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 mx-auto mb-6"></div>
          <p
            className={`text-lg ${
              isDark ? "text-slate-300" : "text-slate-600"
            } max-w-2xl mx-auto transition-colors duration-300`}
          >
            {yearsOfExperience}+ years of excellence in pharmaceutical sales and
            healthcare relationship management
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8"
        >
          {/* Company Card */}
          <motion.div
            variants={itemVariants}
            className={`rounded-xl ${
              isDark
                ? "bg-slate-800/60 backdrop-blur-sm border-slate-700/50"
                : "bg-white/80 backdrop-blur-sm border-slate-200/70"
            } border p-8 shadow-xl transition-all duration-300`}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div className="flex items-start space-x-4 mb-4 md:mb-0">
                <div
                  className={`p-3 rounded-lg ${
                    isDark ? "bg-blue-900/40" : "bg-blue-50"
                  }`}
                >
                  <Briefcase className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2
                    className={`text-2xl font-bold ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    ASV Pharmaceuticals Pvt. Ltd.
                  </h2>
                  <p className="text-blue-600 font-semibold text-lg mt-1">
                    Medical Representative / Field Sales Officer
                  </p>
                </div>
              </div>
              <div
                className={`flex flex-col space-y-2 ${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span>January 2022 - Present</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span>Hyderabad Metro & Surrounding Districts</span>
                </div>
              </div>
            </div>

            {/* Territory Information */}
            <div
              className={`mb-6 p-4 rounded-lg ${
                isDark ? "bg-slate-900/40" : "bg-slate-50"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-2 ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Territory Coverage
              </h3>
              <p
                className={`${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}
              >
                Responsible for managing pharmaceutical sales across Hyderabad
                Metro region, including key medical hubs, corporate hospitals,
                and retail pharmacy networks.
              </p>
            </div>

            {/* Responsibilities */}
            <div className="mb-6">
              <h3
                className={`text-xl font-bold mb-4 ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Key Responsibilities
              </h3>
              <ul className="space-y-3">
                {responsibilities.map((responsibility, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className={`flex items-start space-x-3 ${
                      isDark ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{responsibility}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Achievements Section */}
          <motion.div variants={itemVariants}>
            <h3
              className={`text-2xl font-bold mb-6 text-center ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Key Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
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
                    <h4
                      className={`text-lg font-semibold mb-2 ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {achievement.title}
                    </h4>
                    <p
                      className={`text-sm ${
                        isDark ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      {achievement.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Skills Highlight */}
          <motion.div
            variants={itemVariants}
            className={`rounded-xl ${
              isDark
                ? "bg-slate-800/60 backdrop-blur-sm border-slate-700/50"
                : "bg-white/80 backdrop-blur-sm border-slate-200/70"
            } border p-8 shadow-xl transition-all duration-300`}
          >
            <h3
              className={`text-xl font-bold mb-6 ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Professional Skills & Expertise
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Doctor Detailing",
                "Territory Management",
                "Prescription Tracking",
                "Market Analysis",
                "Relationship Building",
                "Product Knowledge",
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.05, duration: 0.4 }}
                  className={`px-4 py-3 rounded-lg ${
                    isDark ? "bg-slate-900/40" : "bg-slate-50"
                  } text-center`}
                >
                  <span
                    className={`font-medium ${
                      isDark ? "text-slate-200" : "text-slate-700"
                    }`}
                  >
                    {skill}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;