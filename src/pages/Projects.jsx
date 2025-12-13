import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PlusCircle, Github, ExternalLink, Code, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";

const BACKEND_BASE_URL = 'https://my-portfolio-backend-69gv.onrender.com';

// Animated particles component matching Home.jsx style
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

const ProjectCard = ({ project, handleProjectClick, currentTheme }) => {
  const [hovered, setHovered] = useState(false);

 const imageSrc = project.imageUrl
    ? project.imageUrl.startsWith('http')
      ? project.imageUrl
      : `${BACKEND_BASE_URL}${project.imageUrl}`
    : null;

  return (
    <div
      className={`relative group overflow-hidden rounded-lg transition-all duration-300 transform hover:shadow-md h-full ${
        currentTheme === "dark"
          ? "bg-slate-800 border-slate-700"
          : "bg-white border-slate-200"
      } border`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setTimeout(() => setHovered(false), 3000)}
    >
      {/* Image container with smaller height */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "140px" }}
        onClick={() => handleProjectClick(project)}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-teal-500 to-cyan-600 flex items-center justify-center">
            <Code size={24} className="text-white/90" />
          </div>
        )}

        {/* Project links */}
        <div
          className={`absolute bottom-2 right-2 flex space-x-2 transition-all duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {project.repoLink && (
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-1.5 rounded-full ${
                currentTheme === "dark"
                  ? "bg-slate-800/90 text-teal-400"
                  : "bg-white/90 text-teal-600"
              } backdrop-blur-sm`}
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={14} />
            </a>
          )}
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-1.5 rounded-full ${
                currentTheme === "dark"
                  ? "bg-slate-800/90 text-teal-400"
                  : "bg-white/90 text-teal-600"
              } backdrop-blur-sm`}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Content section */}
      <div className="p-3" onClick={() => handleProjectClick(project)}>
        <h3
          className={`text-lg font-bold mb-1 ${
            currentTheme === "dark" ? "text-white" : "text-slate-800"
          } line-clamp-1`}
        >
          {project.title}
        </h3>

        {/* Description - shows scrollbar only on hover */}
        <div className={`overflow-hidden mb-2`} style={{ height: "60px" }}>
          <div
            className={`h-full ${
              hovered ? "overflow-y-auto" : "overflow-hidden"
            } pr-1 ${
              currentTheme === "dark" ? "text-slate-300" : "text-slate-600"
            } text-sm`}
            style={{
              scrollbarWidth: "thin",
              scrollbarColor:
                currentTheme === "dark" ? "#0d9488 #1e293b" : "#14b8a6 #f1f5f9",
            }}
          >
            <p className={hovered ? "" : "line-clamp-3"}>
              {project.description}
            </p>
          </div>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1 mt-1">
          {project.technologies.slice(0, 3).map((tech, idx) => (
            <span
              key={idx}
              className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                currentTheme === "dark"
                  ? "bg-teal-900/40 text-teal-300"
                  : "bg-teal-50 text-teal-700"
              }`}
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                currentTheme === "dark"
                  ? "bg-slate-700/60 text-slate-300"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Scroll indicator - shows only on mobile when hovered */}
      <div
        className={`absolute bottom-1 right-1 md:hidden transition-opacity duration-300 ${
          hovered ? "opacity-70" : "opacity-0"
        }`}
      >
        <div
          className={`px-1.5 py-0.5 rounded text-xs bg-black/20 backdrop-blur-sm ${
            currentTheme === "dark" ? "text-teal-300" : "text-teal-700"
          }`}
        >
          Scroll
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    repoLink: "",
    liveLink: "",
    projectImage: null,
  });
  const [isInView, setIsInView] = useState(false);
  const { currentTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    setIsInView(true);

    const checkAdmin = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (token) {
          const response = await axios.get("/api/auth/verify", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setIsAdmin(response.data.email === "syedazadarhussayn@gmail.com");
        }
      } catch (err) {
        console.error("Auth check error:", err.message);
      }
    };
    checkAdmin();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/projects", {
        validateStatus: (status) => status >= 200 && status < 300,
      });
      if (!response.data) {
        throw new Error("No data returned from server");
      }
      setProjects(response.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch projects:", err.message);
      console.log("Response:", err.response ? err.response : "No response");
      setError(
        err.response?.data?.message ||
          "Failed to load projects. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, projectImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("Authentication token not found");
      }
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("technologies", formData.technologies);
      formDataToSend.append("repoLink", formData.repoLink);
      formDataToSend.append("liveLink", formData.liveLink);
      if (formData.projectImage) {
        formDataToSend.append("projectImage", formData.projectImage);
      }
      const response = await axios.post("/api/projects", formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (!response.data) {
        throw new Error("No data returned from server");
      }
      setIsModalOpen(false);
      setFormData({
        title: "",
        description: "",
        technologies: "",
        repoLink: "",
        liveLink: "",
        projectImage: null,
      });
      toast.success("Project added successfully!");
      // Refresh projects list
      fetchProjects();
    } catch (err) {
      console.error("Failed to add project:", err.message);
      console.log("Response:", err.response ? err.response : "No response");
      toast.error(err.response?.data?.message || "Failed to add project");
    }
  };

  const handleProjectClick = (project) => {
    const url = project.liveLink || project.repoLink;
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  // Styled loading component
  if (loading) {
    return (
      <div
        className={`min-h-screen flex justify-center items-center ${
          currentTheme === "dark" ? "bg-slate-900" : "bg-white"
        } transition-colors duration-300`}
      >
        <div className="relative">
          <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-teal-100 border-solid rounded-full"></div>
          <div className="absolute top-0 left-0 w-12 h-12 md:w-16 md:h-16 border-4 border-t-teal-500 border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  // Error component with teal styling
  if (error) {
    return (
      <div
        className={`min-h-screen flex justify-center items-center p-4 md:p-6 ${
          currentTheme === "dark" ? "bg-slate-900" : "bg-white"
        } transition-colors duration-300`}
      >
        <div
          className={`rounded-lg p-4 md:p-6 max-w-lg w-full ${
            currentTheme === "dark"
              ? "bg-slate-800 border-l-4 border-teal-500"
              : "bg-white border-l-4 border-teal-500 shadow-lg"
          }`}
        >
          <h2
            className={`text-lg md:text-xl font-semibold mb-2 ${
              currentTheme === "dark" ? "text-teal-400" : "text-teal-600"
            }`}
          >
            Error Loading Projects
          </h2>
          <p
            className={`text-sm md:text-base ${
              currentTheme === "dark" ? "text-slate-300" : "text-slate-700"
            }`}
          >
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className={`mt-4 px-4 py-2 rounded-md text-sm md:text-base ${
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
      className={`relative min-h-screen pt-16 md:pt-20 pb-12 md:pb-16 transition-colors duration-300 overflow-hidden ${
        currentTheme === "dark" ? "bg-slate-900" : "bg-white"
      }`}
    >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme={currentTheme === "dark" ? "dark" : "light"}
      />

      {/* Optimized background with fewer layers - similar to Home.jsx */}
      <div
        className={`absolute inset-0 w-full h-full ${
          currentTheme === "dark" ? "opacity-40" : "opacity-20"
        } bg-[linear-gradient(135deg,rgba(56,189,248,0.2)_0%,rgba(6,182,212,0.15)_25%,rgba(20,184,166,0.2)_50%,rgba(45,212,191,0.15)_75%,rgba(56,189,248,0.2)_100%)]`}
      ></div>

      <div
        className={`absolute inset-0 w-full h-full ${
          currentTheme === "dark"
            ? "bg-[radial-gradient(ellipse_at_30%_20%,rgba(20,184,166,0.2),transparent_60%),radial-gradient(ellipse_at_80%_80%,rgba(6,182,212,0.25),transparent_60%)]"
            : "bg-[radial-gradient(ellipse_at_30%_20%,rgba(20,184,166,0.1),transparent_60%),radial-gradient(ellipse_at_80%_80%,rgba(6,182,212,0.15),transparent_60%)]"
        }`}
      ></div>

      {/* Simplified accent elements */}
      <div
        className={`absolute -top-20 -right-20 w-48 md:w-64 h-48 md:h-64 bg-teal-500 rounded-full filter blur-3xl ${
          currentTheme === "dark" ? "opacity-10" : "opacity-5"
        } animate-pulse`}
      ></div>
      <div
        className={`absolute -bottom-16 -left-16 w-56 md:w-72 h-56 md:h-72 bg-cyan-500 rounded-full filter blur-3xl ${
          currentTheme === "dark" ? "opacity-10" : "opacity-5"
        } animate-pulse-slow`}
      ></div>

      {/* Animated particles */}
      <Particles isInView={isInView} />

      {/* Content container */}
      <div className="container mx-auto px-4 py-6 md:py-8 relative z-10">
        <div className="text-center mb-8 md:mb-16 max-w-3xl mx-auto px-2">
          <div className="flex justify-center mb-3 md:mb-4">
            <h2
              className={`relative text-3xl md:text-5xl font-bold ${
                currentTheme === "dark" ? "text-white" : "text-slate-800"
              } inline-block`}
            >
              My{" "}
              <span className="text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 bg-clip-text">
                Projects
              </span>
              <span className="absolute -bottom-1 left-0 h-1 w-full bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 opacity-70 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </h2>
          </div>
          <p
            className={`text-base md:text-lg mx-auto max-w-2xl px-2 ${
              currentTheme === "dark" ? "text-slate-300" : "text-slate-600"
            }`}
          >
            Discover my collection of innovative projects that highlight my
            technical expertise and creative problem-solving.
          </p>

          {/* Admin button with animated hover effect */}
          {isAdmin && (
            <button
              onClick={() => setIsModalOpen(true)}
              className={`mt-6 md:mt-8 relative group overflow-hidden px-6 md:px-8 py-2 md:py-3 rounded-full text-sm md:text-base font-semibold flex items-center justify-center mx-auto transition-all duration-300 ${
                currentTheme === "dark"
                  ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-teal-500/25"
                  : "bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-teal-500/20"
              }`}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <PlusCircle size={16} className="mr-2 relative z-10" />
              <span className="relative z-10">Add New Project</span>
            </button>
          )}
        </div>

        {/* Empty state with styled message */}
        {projects.length === 0 ? (
          <div
            className={`max-w-3xl mx-auto text-center py-12 md:py-20 px-4 rounded-2xl ${
              currentTheme === "dark"
                ? "bg-slate-800/50 border border-slate-700"
                : "bg-slate-50 border border-slate-100"
            }`}
          >
            <div className="p-4 md:p-6 flex flex-col items-center">
              <div
                className={`p-3 md:p-4 rounded-full ${
                  currentTheme === "dark" ? "bg-slate-700" : "bg-slate-100"
                } mb-4`}
              >
                <Code
                  size={28}
                  className={
                    currentTheme === "dark" ? "text-teal-400" : "text-teal-500"
                  }
                />
              </div>
              <h3
                className={`text-xl md:text-2xl font-semibold mb-2 ${
                  currentTheme === "dark" ? "text-white" : "text-slate-800"
                }`}
              >
                No Projects Found
              </h3>
              <p
                className={`max-w-md text-sm md:text-base ${
                  currentTheme === "dark" ? "text-slate-300" : "text-slate-600"
                }`}
              >
                No projects have been added to the portfolio yet. Check back
                soon for updates.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                handleProjectClick={handleProjectClick}
                currentTheme={currentTheme}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Project Modal with teal styling - fully responsive */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in transition-opacity duration-300"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={`rounded-2xl p-4 md:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto transform transition-all scale-100 animate-scale-up ${
              currentTheme === "dark"
                ? "bg-slate-800 border border-slate-700"
                : "bg-white border border-slate-100 shadow-xl"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2
                className={`text-xl md:text-2xl font-bold ${
                  currentTheme === "dark" ? "text-white" : "text-slate-800"
                }`}
              >
                Add New Project
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className={`p-2 rounded-full ${
                  currentTheme === "dark"
                    ? "text-slate-400 hover:bg-slate-700 hover:text-teal-400"
                    : "text-slate-500 hover:bg-slate-100 hover:text-teal-600"
                } transition-colors duration-300`}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    currentTheme === "dark"
                      ? "text-slate-300"
                      : "text-slate-700"
                  }`}
                  htmlFor="title"
                >
                  Project Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg text-sm md:text-base border ${
                    currentTheme === "dark"
                      ? "bg-slate-700/70 border-slate-600 text-white focus:border-teal-500"
                      : "bg-slate-50 border-slate-200 text-slate-900 focus:border-teal-500"
                  } focus:ring-1 focus:ring-teal-500 outline-none transition-colors duration-300`}
                  placeholder="Enter project title"
                  required
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    currentTheme === "dark"
                      ? "text-slate-300"
                      : "text-slate-700"
                  }`}
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg text-sm md:text-base border ${
                    currentTheme === "dark"
                      ? "bg-slate-700/70 border-slate-600 text-white focus:border-teal-500"
                      : "bg-slate-50 border-slate-200 text-slate-900 focus:border-teal-500"
                  } focus:ring-1 focus:ring-teal-500 outline-none transition-colors duration-300`}
                  placeholder="Describe your project"
                  required
                ></textarea>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    currentTheme === "dark"
                      ? "text-slate-300"
                      : "text-slate-700"
                  }`}
                  htmlFor="technologies"
                >
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  id="technologies"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleChange}
                  className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg text-sm md:text-base border ${
                    currentTheme === "dark"
                      ? "bg-slate-700/70 border-slate-600 text-white focus:border-teal-500"
                      : "bg-slate-50 border-slate-200 text-slate-900 focus:border-teal-500"
                  } focus:ring-1 focus:ring-teal-500 outline-none transition-colors duration-300`}
                  placeholder="React, Node.js, MySQL"
                  required
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    currentTheme === "dark"
                      ? "text-slate-300"
                      : "text-slate-700"
                  }`}
                  htmlFor="projectImage"
                >
                  Project Image
                </label>
                <input
                  type="file"
                  id="projectImage"
                  name="projectImage"
                  onChange={handleFileChange}
                  className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg text-sm md:text-base border ${
                    currentTheme === "dark"
                      ? "bg-slate-700/70 border-slate-600 text-white focus:border-teal-500"
                      : "bg-slate-50 border-slate-200 text-slate-900 focus:border-teal-500"
                  } focus:ring-1 focus:ring-teal-500 outline-none transition-colors duration-300 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm ${
                    currentTheme === "dark"
                      ? "file:bg-teal-600 file:text-white hover:file:bg-teal-500"
                      : "file:bg-teal-500 file:text-white hover:file:bg-teal-400"
                  } file:cursor-pointer file:transition-colors`}
                  accept="image/*"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      currentTheme === "dark"
                        ? "text-slate-300"
                        : "text-slate-700"
                    }`}
                    htmlFor="repoLink"
                  >
                    Repository Link
                  </label>
                  <input
                    type="url"
                    id="repoLink"
                    name="repoLink"
                    value={formData.repoLink}
                    onChange={handleChange}
                    className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg text-sm md:text-base border ${
                      currentTheme === "dark"
                        ? "bg-slate-700/70 border-slate-600 text-white focus:border-teal-500"
                        : "bg-slate-50 border-slate-200 text-slate-900 focus:border-teal-500"
                    } focus:ring-1 focus:ring-teal-500 outline-none transition-colors duration-300`}
                    placeholder="https://github.com/..."
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      currentTheme === "dark"
                        ? "text-slate-300"
                        : "text-slate-700"
                    }`}
                    htmlFor="liveLink"
                  >
                    Live Demo Link
                  </label>
                  <input
                    type="url"
                    id="liveLink"
                    name="liveLink"
                    value={formData.liveLink}
                    onChange={handleChange}
                    className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg text-sm md:text-base border ${
                      currentTheme === "dark"
                        ? "bg-slate-700/70 border-slate-600 text-white focus:border-teal-500"
                        : "bg-slate-50 border-slate-200 text-slate-900 focus:border-teal-500"
                    } focus:ring-1 focus:ring-teal-500 outline-none transition-colors duration-300`}
                    placeholder="https://yourproject.com"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2 md:pt-3">
                <button
                  type="button"
                  className={`px-4 md:px-5 py-2 md:py-2.5 mr-2 md:mr-3 rounded-lg text-sm md:text-base font-medium ${
                    currentTheme === "dark"
                      ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                  } transition-colors duration-300`}
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 md:px-5 py-2 md:py-2.5 rounded-lg text-sm md:text-base font-medium text-white ${
                    currentTheme === "dark"
                      ? "bg-teal-600 hover:bg-teal-500"
                      : "bg-teal-500 hover:bg-teal-600"
                  } transition-colors duration-300`}
                >
                  Add Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;