import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PlusCircle, Github, ExternalLink, Code, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";
import api, { BACKEND_BASE_URL } from "../../services/api.js";

// Animated particles component
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
            }}
          />
        );
      })}
    </div>
  );
};

const ProjectCard = ({ project, handleProjectClick, currentTheme }) => {
  const [hovered, setHovered] = useState(false);

const getImageUrl = () => {
  const imageField = project.imageUrl || project.imageurl;
  
  if (!imageField) return null;
  
  // If it's a Cloudinary URL, use it directly
  if (imageField.includes('cloudinary.com')) {
    return imageField;
  }
  
  // Legacy: If it's a full URL, use it as-is
  if (imageField.startsWith('http')) {
    return imageField;
  }
  
  // Legacy: Local uploaded files (fallback)
  const cleanPath = imageField.startsWith('/') ? imageField.substring(1) : imageField;
  return `${BACKEND_BASE_URL}/${cleanPath}`;
};

const imageSrc = getImageUrl();

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
            onError={(e) => {
              console.error('Image load error:', imageSrc);
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = `<div class="w-full h-full bg-gradient-to-r from-teal-500 to-cyan-600 flex items-center justify-center"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg></div>`;
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-teal-500 to-cyan-600 flex items-center justify-center">
            <Code size={24} className="text-white/90" />
          </div>
        )}

        <div
          className={`absolute bottom-2 right-2 flex space-x-2 transition-all duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {(project.repoLink || project.repolink) && (
        <a
          href={project.repoLink || project.repolink}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-1.5 rounded-full ${
            currentTheme === "dark"
              ? "bg-slate-800/90 text-teal-400 hover:bg-slate-700"
              : "bg-white/90 text-teal-600 hover:bg-white"
          } backdrop-blur-sm transition-colors`}
          onClick={(e) => e.stopPropagation()}
          title="View Repository"
        >
          <Github size={14} />
        </a>
      )}
        {(project.liveLink || project.livelink) && (
        <a
          href={project.liveLink || project.livelink}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-1.5 rounded-full ${
            currentTheme === "dark"
              ? "bg-slate-800/90 text-teal-400 hover:bg-slate-700"
              : "bg-white/90 text-teal-600 hover:bg-white"
          } backdrop-blur-sm transition-colors`}
          onClick={(e) => e.stopPropagation()}
          title="View Live Demo"
        >
          <ExternalLink size={14} />
        </a>
      )}
        </div>
      </div>

      <div className="p-3" onClick={() => handleProjectClick(project)}>
        <h3
          className={`text-lg font-bold mb-1 ${
            currentTheme === "dark" ? "text-white" : "text-slate-800"
          } line-clamp-1`}
        >
          {project.title}
        </h3>

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

        <div className="flex flex-wrap gap-1 mt-1">
          {project.technologies?.slice(0, 3).map((tech, idx) => (
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
          {project.technologies?.length > 3 && (
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
    checkAdmin();
    fetchProjects();
  }, []);

  const checkAdmin = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        const { data } = await api.get("/auth/verify");
        setIsAdmin(data.isAdmin || data.email === "syedazadarhussayn@gmail.com");
      }
    } catch (err) {
      console.error("Auth check error:", err);
      setIsAdmin(false);
    }
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get("/projects");
      
      // ✅ Ensure technologies is always an array
      const formattedProjects = data.map(project => ({
        ...project,
        technologies: Array.isArray(project.technologies)
          ? project.technologies
          : typeof project.technologies === 'string'
          ? project.technologies.split(',').map(t => t.trim())
          : []
      }));
      
      setProjects(formattedProjects);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setError(err.message || "Failed to load projects. Please try again later.");
      toast.error(err.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

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
        toast.error("Please login to add projects");
        navigate("/admin-login");
        return;
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

      await api.post("/projects", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Project added successfully!");
      setIsModalOpen(false);
      setFormData({
        title: "",
        description: "",
        technologies: "",
        repoLink: "",
        liveLink: "",
        projectImage: null,
      });
      
      fetchProjects();
    } catch (err) {
      console.error("Failed to add project:", err);
      toast.error(err.message || "Failed to add project");
    }
  };

const handleProjectClick = (project) => {
  // Priority: liveLink first, then repoLink
  const url = project.liveLink || project.livelink || project.repoLink || project.repolink;
  console.log('Attempting to open URL:', {
    liveLink: project.liveLink,
    livelink: project.livelink,
    repoLink: project.repoLink,
    repolink: project.repolink,
    finalUrl: url
  });
  
  if (url) {
    window.open(url, "_blank", "noopener,noreferrer");
  } else {
    console.warn('No URL available for this project');
  }
};

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
            onClick={fetchProjects}
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

      <Particles isInView={isInView} />

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

      {/* Modal remains the same as your original code */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={`rounded-2xl p-4 md:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto ${
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
                    ? "text-slate-400 hover:bg-slate-700"
                    : "text-slate-500 hover:bg-slate-100"
                } transition-colors duration-300`}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    currentTheme === "dark"
                      ? "text-slate-300"
                      : "text-slate-700"
                  }`}
                >
                  Project Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    currentTheme === "dark"
                      ? "bg-slate-700/70 border-slate-600 text-white"
                      : "bg-slate-50 border-slate-200 text-slate-900"
                  } focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none`}
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
                >
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    currentTheme === "dark"
                      ? "bg-slate-700/70 border-slate-600 text-white"
                      : "bg-slate-50 border-slate-200 text-slate-900"
                  } focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none`}
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
                >
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    currentTheme === "dark"
                      ? "bg-slate-700/70 border-slate-600 text-white"
                      : "bg-slate-50 border-slate-200 text-slate-900"
                  } focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none`}
                  placeholder="React, Node.js, MongoDB"
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
                >
                  Project Image
                </label>
                <input
                  type="file"
                  name="projectImage"
                  onChange={handleFileChange}
                  accept="image/*"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    currentTheme === "dark"
                      ? "bg-slate-700/70 border-slate-600 text-white"
                      : "bg-slate-50 border-slate-200 text-slate-900"
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      currentTheme === "dark"
                        ? "text-slate-300"
                        : "text-slate-700"
                    }`}
                  >
                    Repository Link
                  </label>
                  <input
                    type="url"
                    name="repoLink"
                    value={formData.repoLink}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      currentTheme === "dark"
                        ? "bg-slate-700/70 border-slate-600 text-white"
                        : "bg-slate-50 border-slate-200 text-slate-900"
                    } focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none`}
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
                  >
                    Live Demo Link
                  </label>
                  <input
                    type="url"
                    name="liveLink"
                    value={formData.liveLink}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      currentTheme === "dark"
                        ? "bg-slate-700/70 border-slate-600 text-white"
                        : "bg-slate-50 border-slate-200 text-slate-900"
                    } focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none`}
                    placeholder="https://yourproject.com"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={`px-5 py-2.5 rounded-lg font-medium ${
                    currentTheme === "dark"
                      ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg font-medium text-white bg-teal-600 hover:bg-teal-500"
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