import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Edit, Trash2, Plus, X, Code, Layout, Server } from "lucide-react";
import axios from "axios";
import { useTheme } from "../context/ThemeContext.jsx";

 const BACKEND_BASE_URL = 'https://my-portfolio-backend-69gv.onrender.com';


const SkillCard = ({
  skill,
  handleEdit,
  handleDelete,
  currentTheme,
  isAdmin,
}) => {
  const getLevelPercentage = (level) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return 33;
      case "intermediate":
        return 66;
      case "expert":
        return 100;
      default:
        return 0;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case "frontend":
        return <Code size={18} />;
      case "backend":
        return <Server size={18} />;
      case "database":
        return <Layout size={18} />;
      default:
        return <Code size={18} />;
    }
  };

  const percentage = getLevelPercentage(skill.level);
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      className={`relative group overflow-hidden rounded-xl p-4 sm:p-5 md:p-6 transition-all duration-300 h-full ${
        currentTheme === "dark"
          ? "bg-slate-800/70 border border-teal-900/50 hover:bg-slate-800/90"
          : "bg-white border border-teal-100 hover:bg-slate-50"
      } backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-teal-500/10 transform hover:-translate-y-1`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative gradient accent */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-400 transform origin-left group-hover:scale-x-100 scale-x-0 transition-transform duration-300"></div>

      {/* Skill content */}
      <div className="flex flex-col items-center">
        {/* Icon or placeholder */}
        <div className="mb-3 md:mb-4 relative">
          {skill.iconUrl ? (
  <img
    src={
          skill.iconUrl.startsWith('http')
            ? skill.iconUrl
            : `${BACKEND_BASE_URL}${skill.iconUrl}`
        }
        alt={`${skill.name} icon`}
        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-teal-500/30"
        onError={(e) => (e.target.src = "https://via.placeholder.com/64")}
      />
    ) : (
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center ${
                currentTheme === "dark" ? "bg-teal-900/50" : "bg-teal-50"
              } border-2 border-teal-500/30`}
            >
              {getCategoryIcon(skill.category)}
            </div>
          )}
          <div className="absolute inset-0 bg-teal-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Skill name and category */}
        <h3
          className={`text-base sm:text-lg md:text-xl font-bold text-center ${
            currentTheme === "dark" ? "text-white" : "text-slate-800"
          } group-hover:text-teal-500 transition-colors duration-300 line-clamp-2`}
        >
          {skill.name}
        </h3>
        <span
          className={`text-xs px-2 py-1 rounded-full mt-1 md:mt-2 ${
            currentTheme === "dark"
              ? "bg-teal-900/40 text-teal-300"
              : "bg-teal-100 text-teal-700"
          }`}
        >
          {skill.category}
        </span>

        {/* Progress ring */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mt-3 md:mt-4">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className={`${
                currentTheme === "dark"
                  ? "stroke-slate-700"
                  : "stroke-slate-200"
              }`}
              cx="50"
              cy="50"
              r="40"
              fill="none"
              strokeWidth="8"
            />
            <circle
              className="stroke-teal-500"
              cx="50"
              cy="50"
              r="40"
              fill="none"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className={`text-xs sm:text-sm font-semibold ${
                currentTheme === "dark" ? "text-teal-400" : "text-teal-600"
              }`}
            >
              {skill.level}
            </span>
          </div>
        </div>
      </div>

      {/* Admin actions */}
      {isAdmin && (
        <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 flex gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => handleEdit(skill)}
            className={`p-1.5 sm:p-2 rounded-full ${
              currentTheme === "dark"
                ? "bg-slate-700/80 hover:bg-amber-900/70 text-amber-400"
                : "bg-white/90 hover:bg-amber-100 text-amber-600"
            } shadow-lg transition-colors duration-200`}
            aria-label="Edit skill"
          >
            <Edit size={14} className="sm:hidden" />
            <Edit size={16} className="hidden sm:block" />
          </button>
          <button
            onClick={() => handleDelete(skill.id)}
            className={`p-1.5 sm:p-2 rounded-full ${
              currentTheme === "dark"
                ? "bg-slate-700/80 hover:bg-red-900/70 text-red-400"
                : "bg-white/90 hover:bg-red-100 text-red-600"
            } shadow-lg transition-colors duration-200`}
            aria-label="Delete skill"
          >
            <Trash2 size={14} className="sm:hidden" />
            <Trash2 size={16} className="hidden sm:block" />
          </button>
        </div>
      )}
    </motion.div>
  );
};

const Particles = ({ isInView }) => {
  const particles = Array.from({ length: 15 });

  if (!isInView) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((_, index) => {
        const size = Math.floor(Math.random() * 4) + 2;
        const duration = Math.floor(Math.random() * 8) + 15;
        const delay = Math.random() * 3;
        const opacity = Math.random() * 0.4 + 0.2;
        const colors = ["bg-teal-400/30", "bg-cyan-400/30", "bg-blue-400/20"];
        const colorClass = colors[Math.floor(Math.random() * colors.length)];

        return (
          <div
            key={index}
            className={`absolute rounded-full ${colorClass} animate-float`}
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              opacity: opacity,
              transform: "translateY(0)",
            }}
          />
        );
      })}
    </div>
  );
};

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    level: "Beginner",
    category: "Frontend",
    iconUrl: "",
  });
  const [filterCategory, setFilterCategory] = useState("All");
  const [isInView, setIsInView] = useState(false);
  const { currentTheme } = useTheme();
  const gradientRef = useRef(null);

  // Gradient animation
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

    return () => clearInterval(interval);
  }, []);

  // Check admin status and fetch skills
  useEffect(() => {
    setIsInView(true);

    const checkAdmin = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (token) {
          const response = await axios.get("/api/auth/verify", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setIsAdmin(response.data.email === import.meta.env.ADMIN_EMAIL);
        }
      } catch (err) {
        console.error("Auth check error:", err.message);
      }
    };

    const fetchSkills = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/skills");
        setSkills(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load skills");
        setLoading(false);
      }
    };

    checkAdmin();
    fetchSkills();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openAddModal = () => {
    setEditingSkill(null);
    setFormData({
      name: "",
      level: "Beginner",
      category: "Frontend",
      iconUrl: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      level: skill.level,
      category: skill.category,
      iconUrl: skill.iconUrl || "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) throw new Error("Authentication token not found");

      const skillData = {
        name: formData.name,
        level: formData.level,
        category: formData.category,
        iconUrl: formData.iconUrl || null,
      };

      let response;
      if (editingSkill) {
        response = await axios.put(
          `/api/skills/${editingSkill.id}`,
          skillData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        response = await axios.post("/api/skills", skillData, {
          headers: { Authorization: `Bearer ${token}` },
          baseURL: import.meta.env.VITE_BACKEND_URL,
        });
      }

      toast.success(
        editingSkill
          ? "Skill updated successfully!"
          : "Skill added successfully!"
      );
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save skill");
    }
  };

  const handleDelete = async (skillId) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        const token = localStorage.getItem("jwtToken");
        await axios.delete(`/api/skills/${skillId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Skill deleted successfully!");
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to delete skill");
      }
    }
  };

  // Filter skills by category
  const filteredSkills =
    filterCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === filterCategory);

  const categories = ["All", "Frontend", "Backend", "Database"];

  if (loading) {
    return (
      <div
        className={`min-h-screen flex justify-center items-center ${
          currentTheme === "dark" ? "bg-slate-900" : "bg-white"
        } transition-colors duration-300`}
      >
        <div className="relative">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-teal-100 border-solid rounded-full"></div>
          <div className="absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 border-4 border-t-teal-500 border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`min-h-screen flex justify-center items-center p-4 sm:p-6 ${
          currentTheme === "dark" ? "bg-slate-900" : "bg-white"
        } transition-colors duration-300`}
      >
        <div
          className={`rounded-lg p-4 sm:p-6 max-w-lg w-full ${
            currentTheme === "dark"
              ? "bg-slate-800 border-l-4 border-teal-500"
              : "bg-white border-l-4 border-teal-500 shadow-lg"
          }`}
        >
          <h2
            className={`text-lg sm:text-xl font-semibold mb-2 ${
              currentTheme === "dark" ? "text-teal-400" : "text-teal-600"
            }`}
          >
            Error Loading Skills
          </h2>
          <p
            className={
              currentTheme === "dark" ? "text-slate-300" : "text-slate-700"
            }
          >
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className={`mt-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md ${
              currentTheme === "dark"
                ? "bg-teal-500/20 text-teal-400 hover:bg-teal-500/30"
                : "bg-teal-50 text-teal-700 hover:bg-teal-100"
            } transition-colors duration-300`}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative min-h-screen pt-16 sm:pt-18 md:pt-20 pb-12 sm:pb-14 md:pb-16 transition-colors duration-300 overflow-hidden ${
        currentTheme === "dark" ? "bg-slate-900" : "bg-white"
      }`}
    >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme={currentTheme}
        className="z-50"
      />

      {/* Background effects */}
      <div
        ref={gradientRef}
        data-rotation="0"
        className={`absolute inset-0 w-full h-full ${
          currentTheme === "dark" ? "opacity-40" : "opacity-20"
        }`}
      />
      <div
        className={`absolute inset-0 w-full h-full ${
          currentTheme === "dark"
            ? "bg-[radial-gradient(ellipse_at_30%_20%,rgba(20,184,166,0.2),transparent_60%),radial-gradient(ellipse_at_80%_80%,rgba(6,182,212,0.25),transparent_60%)]"
            : "bg-[radial-gradient(ellipse_at_30%_20%,rgba(20,184,166,0.1),transparent_60%),radial-gradient(ellipse_at_80%_80%,rgba(6,182,212,0.15),transparent_60%)]"
        }`}
      />
      <div
        className={`absolute -top-20 -right-20 w-64 h-64 bg-teal-500 rounded-full filter blur-3xl ${
          currentTheme === "dark" ? "opacity-10" : "opacity-5"
        } animate-pulse`}
      ></div>
      <div
        className={`absolute -bottom-16 -left-16 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl ${
          currentTheme === "dark" ? "opacity-10" : "opacity-5"
        } animate-pulse-slow`}
      ></div>

      {/* Particles */}
      <Particles isInView={isInView} />

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold ${
              currentTheme === "dark" ? "text-white" : "text-slate-800"
            } inline-block relative`}
          >
            My{" "}
            <span className="text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 bg-clip-text">
              Skills
            </span>
            <span className="absolute -bottom-1 left-0 h-1 w-full bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 opacity-70"></span>
          </h2>
          <p
            className={`text-base sm:text-lg mt-3 sm:mt-4 mx-auto max-w-2xl ${
              currentTheme === "dark" ? "text-slate-300" : "text-slate-600"
            }`}
          >
            A curated collection of my technical expertise, showcasing
            proficiency across various domains.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex justify-center flex-wrap gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                filterCategory === category
                  ? currentTheme === "dark"
                    ? "bg-teal-600 text-white shadow-lg shadow-teal-500/20"
                    : "bg-teal-500 text-white shadow-lg shadow-teal-500/20"
                  : currentTheme === "dark"
                  ? "bg-slate-700 text-slate-300 hover:bg-teal-700"
                  : "bg-slate-100 text-slate-700 hover:bg-teal-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Admin add button */}
        {isAdmin && (
          <div className="flex justify-center mb-6 sm:mb-8">
            <button
              onClick={openAddModal}
              className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium text-white bg-gradient-to-r from-teal-600 to-teal-500 rounded-lg shadow-lg shadow-teal-500/20 border border-teal-500/20 transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-teal-500/30`}
            >
              <Plus size={16} className="sm:hidden" />
              <Plus size={18} className="hidden sm:block" />
              Add New Skill
            </button>
          </div>
        )}

        {/* Skills grid */}
        {filteredSkills.length === 0 ? (
          <div
            className={`text-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 rounded-xl ${
              currentTheme === "dark"
                ? "bg-slate-800/50 border border-slate-700"
                : "bg-slate-50 border border-slate-100"
            } backdrop-blur-sm`}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center bg-gradient-to-br from-teal-500 to-cyan-400 shadow-lg shadow-teal-500/20">
              <Plus size={20} className="sm:hidden text-white" />
              <Plus size={24} className="hidden sm:block text-white" />
            </div>
            <h3
              className={`text-lg sm:text-xl font-semibold mb-2 ${
                currentTheme === "dark" ? "text-white" : "text-slate-700"
              }`}
            >
              No Skills Found
            </h3>
            <p
              className={`max-w-md mx-auto text-sm sm:text-base ${
                currentTheme === "dark" ? "text-slate-400" : "text-slate-500"
              }`}
            >
              No skills match the selected category. Try another category or add
              a new skill.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {filteredSkills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                handleEdit={openEditModal}
                handleDelete={handleDelete}
                currentTheme={currentTheme}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className={`w-full max-w-lg rounded-xl p-4 sm:p-6 ${
                currentTheme === "dark"
                  ? "bg-slate-800 border border-slate-700"
                  : "bg-white border border-slate-100"
              } shadow-2xl shadow-teal-900/20 transition-all duration-300 max-h-[90vh] overflow-y-auto`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2
                  className={`text-xl sm:text-2xl font-bold ${
                    currentTheme === "dark" ? "text-white" : "text-slate-800"
                  }`}
                >
                  <span className="text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 bg-clip-text">
                    {editingSkill ? "Edit Skill" : "Add New Skill"}
                  </span>
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className={`p-1.5 sm:p-2 rounded-full ${
                    currentTheme === "dark"
                      ? "bg-slate-700 hover:bg-slate-600 text-slate-300"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  } transition-colors duration-200`}
                >
                  <X size={16} className="sm:hidden" />
                  <X size={18} className="hidden sm:block" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <label
                    className={`block text-xs sm:text-sm font-medium mb-1 ${
                      currentTheme === "dark"
                        ? "text-slate-300"
                        : "text-slate-700"
                    }`}
                    htmlFor="name"
                  >
                    Skill Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base ${
                      currentTheme === "dark"
                        ? "bg-slate-700 text-white border-slate-600 focus:border-teal-500 focus:ring-teal-500/50"
                        : "bg-white text-slate-900 border-slate-300 focus:border-teal-500 focus:ring-teal-500/30"
                    } border shadow-sm focus:ring-4 outline-none transition-all duration-200`}
                    required
                    placeholder="Enter skill name"
                  />
                </div>

                <div>
                  <label
                    className={`block text-xs sm:text-sm font-medium mb-1 ${
                      currentTheme === "dark"
                        ? "text-slate-300"
                        : "text-slate-700"
                    }`}
                    htmlFor="level"
                  >
                    Level
                  </label>
                  <select
                    id="level"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className={`w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base ${
                      currentTheme === "dark"
                        ? "bg-slate-700 text-white border-slate-600 focus:border-teal-500 focus:ring-teal-500/50"
                        : "bg-white text-slate-900 border-slate-300 focus:border-teal-500 focus:ring-teal-500/30"
                    } border shadow-sm focus:ring-4 outline-none transition-all duration-200`}
                    required
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>

                <div>
                  <label
                    className={`block text-xs sm:text-sm font-medium mb-1 ${
                      currentTheme === "dark"
                        ? "text-slate-300"
                        : "text-slate-700"
                    }`}
                    htmlFor="category"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-base ${
                      currentTheme === "dark"
                        ? "bg-slate-700 text-white border-slate-600 focus:border-teal-500 focus:ring-teal-500/50"
                        : "bg-white text-slate-900 border-slate-300 focus:border-teal-500 focus:ring-teal-500/30"
                    } border shadow-sm focus:ring-4 outline-none transition-all duration-200`}
                    required
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Database">Database</option>
                  </select>
                </div>

                <div>
                  <label
                    className={`block text-xs sm:text-sm font-medium mb-1 ${
                      currentTheme === "dark"
                        ? "text-slate-300"
                        : "text-slate-700"
                    }`}
                    htmlFor="iconUrl"
                  >
                    Icon URL (Optional)
                  </label>
                  <input
                    type="text"
                    id="iconUrl"
                    name="iconUrl"
                    value={formData.iconUrl}
                    onChange={handleChange}
                    className={`w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-base ${
                      currentTheme === "dark"
                        ? "bg-slate-700 text-white border-slate-600 focus:border-teal-500 focus:ring-teal-500/50"
                        : "bg-white text-slate-900 border-slate-300 focus:border-teal-500 focus:ring-teal-500/30"
                    } border shadow-sm focus:ring-4 outline-none transition-all duration-200`}
                    placeholder="Enter icon URL (optional)"
                  />
                </div>

                <div className="flex justify-end pt-2 sm:pt-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg mr-2 sm:mr-3 text-xs sm:text-sm font-medium ${
                      currentTheme === "dark"
                        ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                        : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                    } transition-colors duration-200`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 shadow-md shadow-teal-500/20 transition-all duration-200 hover:shadow-lg hover:shadow-teal-500/30"
                  >
                    {editingSkill ? "Update Skill" : "Add Skill"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Skills;