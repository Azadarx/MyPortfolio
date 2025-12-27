import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import MRProfileImg from "../../assets/MRprofile.jpg";
import {
  User,
  GraduationCap,
  Heart,
  Shield,
  Briefcase,
  Target,
  Users,
  TrendingUp,
  Award,
  BookOpen,
  Lightbulb,
  CheckCircle,
} from "lucide-react";

const About = () => {
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

    const section = document.getElementById("about");
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

  const professionalStrengths = [
    {
      icon: Users,
      title: "Doctor Relationship Management",
      description:
        "Building and maintaining professional relationships with healthcare providers",
    },
    {
      icon: Target,
      title: "Territory Planning & Execution",
      description:
        "Systematic field operations and strategic territory coverage",
    },
    {
      icon: Shield,
      title: "Ethical Promotion Practices",
      description:
        "Strict adherence to compliance standards and industry guidelines",
    },
    {
      icon: TrendingUp,
      title: "Market Feedback & Reporting",
      description: "Regular analysis and communication of market insights",
    },
    {
      icon: Award,
      title: "Consistent Field Discipline",
      description:
        "Reliable execution and commitment to field responsibilities",
    },
  ];

  const doctorApproach = [
    "Scientific and ethical product detailing",
    "Understanding prescription behavior and patient needs",
    "Consistent follow-ups without aggressive promotion",
    "Building trust through reliability and product knowledge",
  ];

  const chemistApproach = [
    "Product availability and stock coordination",
    "Prescription–dispensing alignment",
    "Market feedback collection",
    "Maintaining professional, long-term working relationships",
  ];

  return (
    <section
      id="about"
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

      <div className="relative mt-6 sm:mt-8 md:mt-10 z-10 w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ${
              isDark ? "text-white" : "text-slate-900"
            } mb-4 transition-colors duration-300`}
          >
            About Me
          </h1>

          <div className="h-1 w-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 mx-auto mb-6"></div>
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-12"
          >
            <div className="relative group">
              {/* Animated gradient background glow */}
              <div
                className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${
                  isDark
                    ? "from-blue-600 via-indigo-600 to-blue-700"
                    : "from-blue-500 via-indigo-500 to-blue-600"
                } opacity-75 blur-xl group-hover:opacity-100 transition-opacity duration-500`}
              ></div>

              {/* Main container */}
              <div
                className={`relative rounded-3xl ${
                  isDark
                    ? "bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/50"
                    : "bg-gradient-to-br from-white to-slate-50/50 border border-slate-200"
                } p-3 shadow-2xl backdrop-blur-sm`}
              >
                {/* Inner frame with double ring effect */}
                <div className="relative">
                  <div
                    className={`absolute -inset-2 rounded-2xl ${
                      isDark
                        ? "bg-gradient-to-br from-blue-500/20 to-indigo-600/20"
                        : "bg-gradient-to-br from-blue-400/20 to-indigo-500/20"
                    } blur-md`}
                  ></div>

                  <div
                    className={`relative rounded-2xl overflow-hidden ${
                      isDark
                        ? "ring-2 ring-blue-500/50 ring-offset-4 ring-offset-slate-800"
                        : "ring-2 ring-blue-400/50 ring-offset-4 ring-offset-white"
                    } shadow-xl`}
                  >
                    {/* Image container */}
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 group-hover:scale-105 transition-transform duration-500">
                      <img
                        src={MRProfileImg}
                        alt="Syed Azadar Hussain"
                        className="w-full h-full object-cover"
                      />

                      {/* Gradient overlay */}
                      <div
                        className={`absolute inset-0 ${
                          isDark
                            ? "bg-gradient-to-t from-blue-900/30 via-transparent to-transparent"
                            : "bg-gradient-to-t from-blue-100/30 via-transparent to-transparent"
                        } group-hover:opacity-0 transition-opacity duration-500`}
                      ></div>

                      {/* Professional badge overlay (optional) */}
                      <div
                        className={`absolute bottom-0 left-0 right-0 ${
                          isDark ? "bg-slate-900/90" : "bg-white/90"
                        } backdrop-blur-sm py-2 px-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300`}
                      >
                        <p
                          className={`text-xs font-semibold text-center ${
                            isDark ? "text-blue-400" : "text-blue-600"
                          }`}
                        >
                          Medical Representative
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative corner accents */}
                <div
                  className={`absolute top-1 left-1 w-6 h-6 border-t-2 border-l-2 rounded-tl-2xl ${
                    isDark ? "border-blue-500/50" : "border-blue-400/50"
                  }`}
                ></div>
                <div
                  className={`absolute bottom-1 right-1 w-6 h-6 border-b-2 border-r-2 rounded-br-2xl ${
                    isDark ? "border-blue-500/50" : "border-blue-400/50"
                  }`}
                ></div>
              </div>
            </div>
          </motion.div>
          <p
            className={`text-sm sm:text-base md:text-lg ${
              isDark ? "text-slate-300" : "text-slate-600"
            } max-w-2xl mx-auto transition-colors duration-300`}
          >
            Medical Representative / Field Sales Officer (Dermatology Division)
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8"
        >
          {/* Professional Summary */}
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
                <div className="relative w-6 h-6 rounded-full overflow-hidden ring-2 ring-blue-600/30">
                  <img
                    src={MRProfileImg}
                    alt="Syed Azadar Hussain"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h2
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Professional Summary
              </h2>
            </div>
            <p
              className={`text-base leading-relaxed ${
                isDark ? "text-slate-300" : "text-slate-700"
              }`}
            >
              I am a dedicated Medical Representative working in the Dermatology
              division, currently associated with ASV Pharmaceuticals Pvt. Ltd.
              I focus on ethical pharmaceutical promotion, scientific product
              communication, and consistent field execution within my assigned
              territory of Mehdipatnam to Hi-Tech City, Hyderabad. My approach
              emphasizes long-term doctor relationships, market understanding,
              and disciplined territory management rather than short-term gains.
            </p>
          </motion.div>

          {/* Educational Background */}
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
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <h2
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Educational Background
              </h2>
            </div>
            <div className="space-y-4">
              <div
                className={`p-6 rounded-lg ${
                  isDark ? "bg-slate-900/40" : "bg-blue-50"
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <BookOpen
                    className={`w-5 h-5 ${
                      isDark ? "text-blue-400" : "text-blue-600"
                    }`}
                  />
                  <h3
                    className={`text-lg font-semibold ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Bachelor of Commerce (B.Com – General)
                  </h3>
                </div>
                <p
                  className={`text-sm ${
                    isDark ? "text-slate-400" : "text-slate-600"
                  } mb-4`}
                >
                  Avinash College of Commerce, LB Nagar, Hyderabad
                </p>
                <p
                  className={`text-sm leading-relaxed ${
                    isDark ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  My academic training has strengthened my understanding of
                  business fundamentals such as communication, planning,
                  reporting, and analytical thinking—skills directly applicable
                  to pharmaceutical sales and territory management.
                </p>
              </div>
              <p
                className={`text-sm leading-relaxed ${
                  isDark ? "text-slate-300" : "text-slate-700"
                }`}
              >
                This background supports my ability to manage field operations
                systematically, understand market dynamics, interpret sales
                data, and communicate effectively with healthcare professionals.
                Alongside my formal education, I continuously enhance my
                pharmaceutical and therapy knowledge through company training
                programs, field learning, and self-driven study to ensure
                compliant and scientifically accurate product promotion.
              </p>
            </div>
          </motion.div>

          {/* Why Pharmaceutical Sales */}
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
                <Lightbulb className="w-6 h-6 text-blue-600" />
              </div>
              <h2
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Why I Chose Pharmaceutical Sales
              </h2>
            </div>
            <p
              className={`text-base leading-relaxed ${
                isDark ? "text-slate-300" : "text-slate-700"
              }`}
            >
              I chose pharmaceutical sales because it allows me to work at the
              intersection of healthcare, science, and field execution. The role
              demands accountability, consistency, and ethical
              responsibility—qualities I value professionally. Being part of
              pharma sales gives me the opportunity to support healthcare
              professionals by providing accurate product information that
              ultimately contributes to better patient outcomes.
            </p>
          </motion.div>

          {/* Approach Section */}
          <motion.div variants={itemVariants}>
            <h2
              className={`text-2xl font-bold mb-6 ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Professional Approach
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Approach with Doctors */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.5 }}
                className={`rounded-xl ${
                  isDark
                    ? "bg-slate-800/60 backdrop-blur-sm border-slate-700/50"
                    : "bg-white/80 backdrop-blur-sm border-slate-200/70"
                } border p-4 sm:p-6 shadow-lg transition-all duration-300`}
              >
                <div
                  className={`p-3 rounded-lg mb-4 inline-block ${
                    isDark ? "bg-blue-900/40" : "bg-blue-50"
                  }`}
                >
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3
                  className={`text-lg font-semibold mb-4 ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  Approach with Doctors
                </h3>
                <div className="space-y-3">
                  {doctorApproach.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + index * 0.05, duration: 0.4 }}
                      className="flex items-start space-x-3"
                    >
                      <CheckCircle
                        className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                          isDark ? "text-blue-400" : "text-blue-600"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          isDark ? "text-slate-300" : "text-slate-700"
                        }`}
                      >
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Approach with Chemists */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.5 }}
                className={`rounded-xl ${
                  isDark
                    ? "bg-slate-800/60 backdrop-blur-sm border-slate-700/50"
                    : "bg-white/80 backdrop-blur-sm border-slate-200/70"
                } border p-4 sm:p-6 shadow-lg transition-all duration-300`}
              >
                <div
                  className={`p-3 rounded-lg mb-4 inline-block ${
                    isDark ? "bg-blue-900/40" : "bg-blue-50"
                  }`}
                >
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <h3
                  className={`text-lg font-semibold mb-4 ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  Approach with Chemists
                </h3>
                <div className="space-y-3">
                  {chemistApproach.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + index * 0.05, duration: 0.4 }}
                      className="flex items-start space-x-3"
                    >
                      <CheckCircle
                        className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                          isDark ? "text-blue-400" : "text-blue-600"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          isDark ? "text-slate-300" : "text-slate-700"
                        }`}
                      >
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Ethics & Compliance */}
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
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h2
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Ethics & Compliance Mindset
              </h2>
            </div>
            <p
              className={`text-base leading-relaxed ${
                isDark ? "text-slate-300" : "text-slate-700"
              }`}
            >
              Ethics and compliance are central to my working style. I strictly
              follow company promotional guidelines, industry compliance
              standards, and ethical marketing practices. I believe responsible
              pharmaceutical promotion protects both the company's reputation
              and patient trust.
            </p>
          </motion.div>

          {/* Professional Strengths */}
          <motion.div variants={itemVariants}>
            <h2
              className={`text-2xl font-bold mb-6 text-center ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Professional Strengths
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {professionalStrengths.map((strength, index) => {
                const Icon = strength.icon;
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
                    } border p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
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
                      {strength.title}
                    </h3>
                    <p
                      className={`text-sm ${
                        isDark ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      {strength.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Commitment Statement */}
          <motion.div
            variants={itemVariants}
            className={`rounded-xl ${
              isDark
                ? "bg-gradient-to-br from-blue-900/20 to-slate-800/40 border-blue-900/30"
                : "bg-gradient-to-br from-blue-50 to-slate-50 border-blue-100"
            } border p-8 shadow-xl text-center`}
          >
            <Heart
              className={`w-8 h-8 mx-auto mb-4 ${
                isDark ? "text-blue-400" : "text-blue-600"
              }`}
            />
            <p
              className={`text-lg leading-relaxed ${
                isDark ? "text-slate-200" : "text-slate-700"
              }`}
            >
              My commitment is to uphold the highest standards of pharmaceutical
              promotion, maintain professional integrity in all interactions,
              and contribute meaningfully to healthcare delivery through ethical
              field practices and consistent territory development.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
