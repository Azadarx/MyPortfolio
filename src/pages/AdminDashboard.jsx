import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Code,
  Layout,
  Server,
  ExternalLink,
  Github,
  Edit,
  Trash2,
  Plus,
  X,
  Image,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";
import socket, { connectSocket, disconnectSocket } from "../services/socket.js";
import api from "../services/api.js";

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);
  const [projectFormData, setProjectFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    repoLink: "",
    liveLink: "",
    projectImage: null,
  });
  const [skillFormData, setSkillFormData] = useState({
    name: "",
    level: "Beginner",
    category: "Frontend",
    iconUrl: "",
  });
  const navigate = useNavigate();
  const { currentTheme } = useTheme();
  const gradientRef = useRef(null);

  // Animated background gradient effect
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

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      toast.error("Please login to access the admin dashboard");
      navigate("/admin-login");
      return;
    }

    // Connect to Socket.IO when component mounts
    connectSocket();

    // Initialize data
    fetchProjects();
    fetchSkills();

    // Socket event listeners
    socket.on("projectAdded", (data) => {
      setProjects((prev) => [...prev, data]);
      toast.success("New project added!");
    });

    socket.on("projectUpdated", (data) => {
      setProjects((prev) => prev.map((p) => (p.id === data.id ? data : p)));
      toast.success("Project updated!");
    });

    socket.on("projectDeleted", (data) => {
      setProjects((prev) => prev.filter((p) => p.id !== data.id));
      toast.success("Project deleted!");
    });

    socket.on("skillAdded", (data) => {
      setSkills((prev) => [...prev, data]);
      toast.success("New skill added!");
    });

    socket.on("skillUpdated", (data) => {
      setSkills((prev) => prev.map((s) => (s.id === data.id ? data : s)));
      toast.success("Skill updated!");
    });

    socket.on("skillDeleted", (data) => {
      setSkills((prev) => prev.filter((s) => s.id !== data.id));
      toast.success("Skill deleted!");
    });

    // Cleanup function
    return () => {
      disconnectSocket();
      socket.off("projectAdded");
      socket.off("projectUpdated");
      socket.off("projectDeleted");
      socket.off("skillAdded");
      socket.off("skillUpdated");
      socket.off("skillDeleted");
    };
  }, [navigate]);

  const fetchProjects = async () => {
    try {
      const { data } = await api.get("/projects");
      setProjects(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load projects");
    }
  };

  const fetchSkills = async () => {
    try {
      const { data } = await api.get("/skills");
      setSkills(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load skills");
    } finally {
      setLoading(false);
    }
  };

  const openAddProjectModal = () => {
    setEditingProject(null);
    setProjectFormData({
      title: "",
      description: "",
      technologies: "",
      repoLink: "",
      liveLink: "",
      projectImage: null,
    });
    setIsProjectModalOpen(true);
  };

  const openEditProjectModal = (project) => {
    setEditingProject(project);
    setProjectFormData({
      title: project.title,
      description: project.description,
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(", ")
        : project.technologies,
      repoLink: project.repoLink || "",
      liveLink: project.liveLink || "",
      projectImage: null,
    });
    setIsProjectModalOpen(true);
  };

  const openAddSkillModal = () => {
    setEditingSkill(null);
    setSkillFormData({
      name: "",
      level: "Beginner",
      category: "Frontend",
      iconUrl: "",
    });
    setIsSkillModalOpen(true);
  };

  const openEditSkillModal = (skill) => {
    setEditingSkill(skill);
    setSkillFormData({
      name: skill.name,
      level: skill.level,
      category: skill.category,
      iconUrl: skill.iconUrl || "",
    });
    setIsSkillModalOpen(true);
  };

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProjectFormData({ ...projectFormData, [name]: value });
  };

  const handleSkillChange = (e) => {
    const { name, value } = e.target;
    setSkillFormData({ ...skillFormData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProjectFormData({ ...projectFormData, projectImage: e.target.files[0] });
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", projectFormData.title);
      formDataToSend.append("description", projectFormData.description);
      formDataToSend.append("technologies", projectFormData.technologies);
      formDataToSend.append("repoLink", projectFormData.repoLink);
      formDataToSend.append("liveLink", projectFormData.liveLink);
      if (projectFormData.projectImage) {
        formDataToSend.append("projectImage", projectFormData.projectImage);
      }

      if (editingProject) {
        await api.put(`/projects/${editingProject.id}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/projects", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      toast.success(
        editingProject
          ? "Project updated successfully!"
          : "Project added successfully!"
      );
      setIsProjectModalOpen(false);
      fetchProjects();
    } catch (err) {
      toast.error(err.message || "Failed to save project");
    }
  };

  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSkill) {
        await api.put(`/skills/${editingSkill.id}`, skillFormData);
      } else {
        await api.post("/skills", skillFormData);
      }

      toast.success(
        editingSkill
          ? "Skill updated successfully!"
          : "Skill added successfully!"
      );
      setIsSkillModalOpen(false);
      fetchSkills();
    } catch (err) {
      toast.error(err.message || "Failed to save skill");
    }
  };

  const handleProjectDelete = async (projectId) => {
    try {
      await api.delete(`/projects/${projectId}`);
      toast.success("Project deleted successfully!");
      fetchProjects();
    } catch (err) {
      toast.error(err.message || "Failed to delete project");
    }
  };

  const handleSkillDelete = async (skillId) => {
    try {
      await api.delete(`/skills/${skillId}`);
      toast.success("Skill deleted successfully!");
      fetchSkills();
    } catch (err) {
      toast.error(err.message || "Failed to delete skill");
    }
  };

  // Random tech icons for project/skill cards
  const getTechIcon = (index) => {
    const icons = [Code, Layout, Server];
    return icons[index % icons.length];
  };

  if (loading) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          currentTheme === "dark" ? "bg-slate-900" : "bg-white"
        } transition-colors duration-300`}
      >
        <div className="relative">
          <div className="w-16 h-16 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 bg-teal-500 rounded-full opacity-75 animate-ping"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          currentTheme === "dark" ? "bg-slate-900" : "bg-white"
        } transition-colors duration-300`}
      >
        <div
          className={`${
            currentTheme === "dark" ? "bg-red-900/30" : "bg-red-100"
          } border ${
            currentTheme === "dark" ? "border-red-700" : "border-red-400"
          } ${
            currentTheme === "dark" ? "text-red-300" : "text-red-700"
          } px-6 py-4 rounded-lg shadow-lg max-w-md`}
        >
          <p className="text-lg font-semibold mb-4">Something went wrong</p>
          <p className="mb-4">{error}</p>
          <button
            className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-teal-500/20"
            onClick={() => {
              fetchProjects();
              fetchSkills();
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden ${
        currentTheme === "dark" ? "bg-slate-900" : "bg-white"
      } transition-colors duration-300 pt-16 sm:pt-20 md:pt-24 pb-16`}
    >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme={currentTheme}
      />

      {/* Animated background elements */}
      <div
        ref={gradientRef}
        data-rotation="0"
        className="absolute inset-0 w-full h-full opacity-40 dark:opacity-40"
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

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        <div className="flex flex-col items-center md:flex-row md:justify-between md:items-center mb-8 sm:mb-10 md:mb-12">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h1
              className={`text-3xl sm:text-4xl font-bold tracking-tight ${
                currentTheme === "dark" ? "text-white" : "text-slate-800"
              } mb-2`}
            >
              Admin{" "}
              <span className="text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 bg-clip-text">
                Dashboard
              </span>
            </h1>
            <p
              className={`${
                currentTheme === "dark" ? "text-slate-300" : "text-slate-600"
              } max-w-xl text-sm sm:text-base`}
            >
              Manage your portfolio projects and skills from one central
              location.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={openAddProjectModal}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 font-medium text-white bg-gradient-to-r from-teal-600 to-teal-500 rounded-lg shadow-lg shadow-teal-500/20 border border-teal-500/20 transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-teal-500/30 text-sm sm:text-base"
            >
              <Plus size={16} className="flex-shrink-0" />
              <span>New Project</span>
            </button>
            <button
              onClick={openAddSkillModal}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 font-medium text-white bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-lg shadow-lg shadow-cyan-500/20 border border-cyan-500/20 transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 text-sm sm:text-base"
            >
              <Plus size={16} className="flex-shrink-0" />
              <span>New Skill</span>
            </button>
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-12 sm:mb-16">
          <h2
            className={`text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 ${
              currentTheme === "dark" ? "text-white" : "text-slate-800"
            }`}
          >
            Projects
          </h2>
          {projects.length === 0 ? (
            <div
              className={`text-center py-12 sm:py-20 px-4 sm:px-6 rounded-xl ${
                currentTheme === "dark" ? "bg-slate-800/50" : "bg-slate-100"
              } border border-dashed ${
                currentTheme === "dark"
                  ? "border-slate-700"
                  : "border-slate-300"
              } backdrop-blur-sm`}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center bg-gradient-to-br from-teal-500 to-cyan-400 shadow-lg shadow-teal-500/20">
                <Plus size={24} className="text-white" />
              </div>
              <h3
                className={`text-lg sm:text-xl font-semibold mb-2 ${
                  currentTheme === "dark" ? "text-white" : "text-slate-700"
                }`}
              >
                No projects found
              </h3>
              <p
                className={`${
                  currentTheme === "dark" ? "text-slate-400" : "text-slate-500"
                } mb-4 sm:mb-6 max-w-md mx-auto text-sm sm:text-base`}
              >
                Your portfolio is looking empty. Let's add your first project to
                showcase your amazing work!
              </p>
              <button
                onClick={openAddProjectModal}
                className="px-4 sm:px-5 py-2 font-medium text-white bg-gradient-to-r from-teal-600 to-teal-500 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                Add Your First Project
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {projects.map((project, index) => {
                const TechIcon = getTechIcon(index);
                return (
                  <div
                    key={project.id}
                    className={`group relative overflow-hidden rounded-xl transition-all duration-300 ${
                      currentTheme === "dark"
                        ? "bg-slate-800/70 hover:bg-slate-800/90 border border-slate-700/50"
                        : "bg-white hover:bg-slate-50 border border-slate-200"
                    } backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-teal-500/10 transform hover:-translate-y-1`}
                  >
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-400 transform origin-left group-hover:scale-x-100 scale-x-0 transition-transform duration-300"></div>
                    <div className="p-4 sm:p-5 lg:p-6">
                      <div className="mb-3 sm:mb-4 flex items-center justify-between">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center">
                          <TechIcon size={20} className="text-teal-500" />
                        </div>
                        <div className="flex flex-wrap gap-1 justify-end">
                          {project.technologies.slice(0, 2).map((tech, i) => (
                            <span
                              key={i}
                              className={`text-xs px-2 py-1 rounded-full ${
                                currentTheme === "dark"
                                  ? "bg-teal-900/40 text-teal-300"
                                  : "bg-teal-100 text-teal-700"
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 2 && (
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                currentTheme === "dark"
                                  ? "bg-slate-700/60 text-slate-300"
                                  : "bg-slate-200 text-slate-600"
                              }`}
                            >
                              +{project.technologies.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                      <h2
                        className={`text-lg sm:text-xl font-bold mb-2 ${
                          currentTheme === "dark"
                            ? "text-white"
                            : "text-slate-800"
                        } group-hover:text-teal-500 transition-colors duration-300 line-clamp-1`}
                      >
                        {project.title}
                      </h2>
                      <p
                        className={`${
                          currentTheme === "dark"
                            ? "text-slate-300"
                            : "text-slate-600"
                        } mb-4 sm:mb-6 h-14 sm:h-16 overflow-hidden text-sm sm:text-base line-clamp-2 sm:line-clamp-3`}
                      >
                        {project.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-3">
                          {project.repoLink && (
                            <a
                              href={project.repoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center gap-1 text-xs sm:text-sm ${
                                currentTheme === "dark"
                                  ? "text-teal-400 hover:text-teal-300"
                                  : "text-teal-600 hover:text-teal-700"
                              } transition-colors duration-200`}
                            >
                              <Github size={14} />
                              <span>Repo</span>
                            </a>
                          )}
                          {project.liveLink && (
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center gap-1 text-xs sm:text-sm ${
                                currentTheme === "dark"
                                  ? "text-teal-400 hover:text-teal-300"
                                  : "text-teal-600 hover:text-teal-700"
                              } transition-colors duration-200`}
                            >
                              <ExternalLink size={14} />
                              <span>Live Demo</span>
                            </a>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditProjectModal(project)}
                            className={`p-1.5 sm:p-2 rounded-full ${
                              currentTheme === "dark"
                                ? "bg-slate-700/80 hover:bg-amber-900/70 text-amber-400"
                                : "bg-white/90 hover:bg-amber-100 text-amber-600"
                            } shadow-lg transition-colors duration-200`}
                            aria-label="Edit project"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleProjectDelete(project.id)}
                            className={`p-1.5 sm:p-2 rounded-full ${
                              currentTheme === "dark"
                                ? "bg-slate-700/80 hover:bg-red-900/70 text-red-400"
                                : "bg-white/90 hover:bg-red-100 text-red-600"
                            } shadow-lg transition-colors duration-200`}
                            aria-label="Delete project"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`absolute bottom-0 left-0 right-0 p-3 sm:p-4 flex justify-between items-center ${
                        currentTheme === "dark"
                          ? "bg-gradient-to-t from-slate-900 to-transparent"
                          : "bg-gradient-to-t from-white to-transparent"
                      } opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-6 group-hover:translate-y-0`}
                    >
                      <button
                        onClick={() => openEditProjectModal(project)}
                        className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg flex items-center gap-1 text-xs sm:text-sm ${
                          currentTheme === "dark"
                            ? "bg-amber-900/30 text-amber-400 hover:bg-amber-900/50"
                            : "bg-amber-100 text-amber-600 hover:bg-amber-200"
                        } transition-colors duration-200`}
                      >
                        <Edit size={12} className="flex-shrink-0" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleProjectDelete(project.id)}
                        className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg flex items-center gap-1 text-xs sm:text-sm ${
                          currentTheme === "dark"
                            ? "bg-red-900/30 text-red-400 hover:bg-red-900/50"
                            : "bg-red-100 text-red-600 hover:bg-red-200"
                        } transition-colors duration-200`}
                      >
                        <Trash2 size={12} className="flex-shrink-0" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Skills Section */}
        <div>
          <h2
            className={`text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 ${
              currentTheme === "dark" ? "text-white" : "text-slate-800"
            }`}
          >
            Skills
          </h2>
          {skills.length === 0 ? (
            <div
              className={`text-center py-12 sm:py-20 px-4 sm:px-6 rounded-xl ${
                currentTheme === "dark" ? "bg-slate-800/50" : "bg-slate-100"
              } border border-dashed ${
                currentTheme === "dark"
                  ? "border-slate-700"
                  : "border-slate-300"
              } backdrop-blur-sm`}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center bg-gradient-to-br from-teal-500 to-cyan-400 shadow-lg shadow-teal-500/20">
                <Plus size={24} className="text-white" />
              </div>
              <h3
                className={`text-lg sm:text-xl font-semibold mb-2 ${
                  currentTheme === "dark" ? "text-white" : "text-slate-700"
                }`}
              >
                No skills found
              </h3>
              <p
                className={`${
                  currentTheme === "dark" ? "text-slate-400" : "text-slate-500"
                } mb-4 sm:mb-6 max-w-md mx-auto text-sm sm:text-base`}
              >
                Your skills list is empty. Add some skills to showcase your
                expertise!
              </p>
              <button
                onClick={openAddSkillModal}
                className="px-4 sm:px-5 py-2 font-medium text-white bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                Add Your First Skill
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {skills.map((skill, index) => {
                const TechIcon = getTechIcon(index);
                return (
                  <div
                    key={skill.id}
                    className={`group relative overflow-hidden rounded-xl transition-all duration-300 ${
                      currentTheme === "dark"
                        ? "bg-slate-800/70 hover:bg-slate-800/90 border border-slate-700/50"
                        : "bg-white hover:bg-slate-50 border border-slate-200"
                    } backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-cyan-500/10 transform hover:-translate-y-1`}
                  >
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-400 transform origin-left group-hover:scale-x-100 scale-x-0 transition-transform duration-300"></div>
                    <div className="p-4 sm:p-5 lg:p-6">
                      <div className="mb-3 sm:mb-4 flex items-center justify-between">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center">
                          <TechIcon size={20} className="text-teal-500" />
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            currentTheme === "dark"
                              ? "bg-teal-900/40 text-teal-300"
                              : "bg-teal-100 text-teal-700"
                          }`}
                        >
                          {skill.category}
                        </span>
                      </div>
                      <h2
                        className={`text-lg sm:text-xl font-bold mb-2 ${
                          currentTheme === "dark"
                            ? "text-white"
                            : "text-slate-800"
                        } group-hover:text-teal-500 transition-colors duration-300 line-clamp-1`}
                      >
                        {skill.name}
                      </h2>
                      <p
                        className={`${
                          currentTheme === "dark"
                            ? "text-slate-300"
                            : "text-slate-600"
                        } mb-2 sm:mb-6 text-sm sm:text-base`}
                      >
                        Level: {skill.level}
                      </p>
                      <div className="flex justify-end">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditSkillModal(skill)}
                            className={`p-1.5 sm:p-2 rounded-full ${
                              currentTheme === "dark"
                                ? "bg-slate-700/80 hover:bg-amber-900/70 text-amber-400"
                                : "bg-white/90 hover:bg-amber-100 text-amber-600"
                            } shadow-lg transition-colors duration-200`}
                            aria-label="Edit skill"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleSkillDelete(skill.id)}
                            className={`p-1.5 sm:p-2 rounded-full ${
                              currentTheme === "dark"
                                ? "bg-slate-700/80 hover:bg-red-900/70 text-red-400"
                                : "bg-white/90 hover:bg-red-100 text-red-600"
                            } shadow-lg transition-colors duration-200`}
                            aria-label="Delete skill"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`absolute bottom-0 left-0 right-0 p-3 sm:p-4 flex justify-between items-center ${
                        currentTheme === "dark"
                          ? "bg-gradient-to-t from-slate-900 to-transparent"
                          : "bg-gradient-to-t from-white to-transparent"
                      } opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-6 group-hover:translate-y-0`}
                    >
                      <button
                        onClick={() => openEditSkillModal(skill)}
                        className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg flex items-center gap-1 text-xs sm:text-sm ${
                          currentTheme === "dark"
                            ? "bg-amber-900/30 text-amber-400 hover:bg-amber-900/50"
                            : "bg-amber-100 text-amber-600 hover:bg-amber-200"
                        } transition-colors duration-200`}
                      >
                        <Edit size={12} className="flex-shrink-0" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleSkillDelete(skill.id)}
                        className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg flex items-center gap-1 text-xs sm:text-sm ${
                          currentTheme === "dark"
                            ? "bg-red-900/30 text-red-400 hover:bg-red-900/50"
                            : "bg-red-100 text-red-600 hover:bg-red-200"
                        } transition-colors duration-200`}
                      >
                        <Trash2 size={12} className="flex-shrink-0" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Project Modal */}
{isProjectModalOpen && (
  <div
    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    onClick={() => setIsProjectModalOpen(false)}
  >
    <div
      className={`w-full max-w-4xl max-h-[85vh] overflow-hidden
        rounded-xl ${
        currentTheme === "dark" ? "bg-slate-800" : "bg-white"
      } shadow-2xl shadow-teal-900/20 border ${
        currentTheme === "dark"
          ? "border-slate-700"
          : "border-slate-200"
      } transition-all duration-300 animate-fade-scale-in`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className={`flex justify-between items-center p-6 border-b ${
        currentTheme === "dark" ? "border-slate-700" : "border-slate-200"
      }`}>
        <h2
          className={`text-2xl font-bold ${
            currentTheme === "dark" ? "text-white" : "text-slate-800"
          }`}
        >
          <span className="text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 bg-clip-text">
            {editingProject ? "Edit Project" : "Add New Project"}
          </span>
        </h2>
        <button
          onClick={() => setIsProjectModalOpen(false)}
          className={`p-2 rounded-full ${
            currentTheme === "dark"
              ? "bg-slate-700 hover:bg-slate-600 text-slate-300"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          } transition-colors duration-200 hover:scale-105 active:scale-95`}
        >
          <X size={20} />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="overflow-y-auto max-h-[calc(85vh-80px)] p-6">
        {/* Form */}
        <form
          onSubmit={handleProjectSubmit}
          className="space-y-6"
        >
          {/* Project Title */}
          <div className="space-y-2">
            <label
              className={`block text-base font-medium ${
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
              value={projectFormData.title}
              onChange={handleProjectChange}
              className={`w-full px-4 py-3 rounded-lg text-base ${
                currentTheme === "dark"
                  ? "bg-slate-700 text-white border-slate-600 focus:border-teal-500 focus:ring-teal-500/50"
                  : "bg-white text-slate-900 border-slate-300 focus:border-teal-500 focus:ring-teal-500/30"
              } border shadow-sm focus:ring-4 outline-none transition-all duration-200`}
              required
              placeholder="Enter project title"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label
              className={`block text-base font-medium ${
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
              value={projectFormData.description}
              onChange={handleProjectChange}
              rows="4"
              className={`w-full px-4 py-3 rounded-lg text-base ${
                currentTheme === "dark"
                  ? "bg-slate-700 text-white border-slate-600 focus:border-teal-500 focus:ring-teal-500/50"
                  : "bg-white text-slate-900 border-slate-300 focus:border-teal-500 focus:ring-teal-500/30"
              } border shadow-sm focus:ring-4 outline-none transition-all duration-200 resize-none`}
              required
              placeholder="Describe your project"
            ></textarea>
          </div>

          {/* Technologies */}
          <div className="space-y-2">
            <label
              className={`block text-base font-medium ${
                currentTheme === "dark"
                  ? "text-slate-300"
                  : "text-slate-700"
              }`}
              htmlFor="technologies"
            >
              Technologies
            </label>
            <input
              type="text"
              id="technologies"
              name="technologies"
              value={projectFormData.technologies}
              onChange={handleProjectChange}
              className={`w-full px-4 py-3 rounded-lg text-base ${
                currentTheme === "dark"
                  ? "bg-slate-700 text-white border-slate-600 focus:border-teal-500 focus:ring-teal-500/50"
                  : "bg-white text-slate-900 border-slate-300 focus:border-teal-500 focus:ring-teal-500/30"
              } border shadow-sm focus:ring-4 outline-none transition-all duration-200`}
              placeholder="React, Node.js, MongoDB (comma separated)"
              required
            />
          </div>

          {/* Project Image Upload */}
          <div className="space-y-2">
            <label
              className={`block text-base font-medium ${
                currentTheme === "dark"
                  ? "text-slate-300"
                  : "text-slate-700"
              }`}
              htmlFor="projectImage"
            >
              Project Image
            </label>
            <div
              className={`flex items-center justify-center w-full ${
                currentTheme === "dark"
                  ? "bg-slate-700 border-slate-600"
                  : "bg-slate-50 border-slate-300"
              } border-2 border-dashed rounded-lg p-8 
                hover:border-teal-500 transition-colors duration-200 cursor-pointer`}
            >
              <label
                htmlFor="projectImage"
                className="w-full cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center space-y-3">
                  <Image
                    size={32}
                    className={`${
                      currentTheme === "dark"
                        ? "text-slate-400"
                        : "text-slate-500"
                    }`}
                  />
                  <div className="text-center space-y-1">
                    <p
                      className={`text-base font-medium ${
                        currentTheme === "dark"
                          ? "text-slate-300"
                          : "text-slate-700"
                      }`}
                    >
                      Click to upload project image
                    </p>
                    <p
                      className={`text-sm ${
                        currentTheme === "dark"
                          ? "text-slate-500"
                          : "text-slate-500"
                      } px-2`}
                    >
                      SVG, PNG, JPG, GIF (Recommended: 1280×720px)
                    </p>
                  </div>
                </div>
                <input
                  type="file"
                  id="projectImage"
                  name="projectImage"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>

            {projectFormData.projectImage && (
              <p
                className={`mt-2 text-sm ${
                  currentTheme === "dark"
                    ? "text-teal-400"
                    : "text-teal-600"
                } truncate`}
              >
                Selected: {projectFormData.projectImage.name}
              </p>
            )}
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Repository Link */}
            <div className="space-y-2">
              <label
                className={`block text-base font-medium ${
                  currentTheme === "dark"
                    ? "text-slate-300"
                    : "text-slate-700"
                }`}
                htmlFor="repoLink"
              >
                Repository Link
              </label>
              <div className="relative">
                <div
                  className={`absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none ${
                    currentTheme === "dark"
                      ? "text-slate-400"
                      : "text-slate-500"
                  }`}
                >
                  <Github size={18} />
                </div>
                <input
                  type="url"
                  id="repoLink"
                  name="repoLink"
                  value={projectFormData.repoLink}
                  onChange={handleProjectChange}
                  className={`w-full pl-12 pr-4 py-3 text-base rounded-lg ${
                    currentTheme === "dark"
                      ? "bg-slate-700 text-white border-slate-600 focus:border-teal-500 focus:ring-teal-500/50"
                      : "bg-white text-slate-900 border-slate-300 focus:border-teal-500 focus:ring-teal-500/30"
                  } border shadow-sm focus:ring-4 outline-none transition-all duration-200`}
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>

            {/* Live Demo Link */}
            <div className="space-y-2">
              <label
                className={`block text-base font-medium ${
                  currentTheme === "dark"
                    ? "text-slate-300"
                    : "text-slate-700"
                }`}
                htmlFor="liveLink"
              >
                Live Demo Link
              </label>
              <div className="relative">
                <div
                  className={`absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none ${
                    currentTheme === "dark"
                      ? "text-slate-400"
                      : "text-slate-500"
                  }`}
                >
                  <ExternalLink size={18} />
                </div>
                <input
                  type="url"
                  id="liveLink"
                  name="liveLink"
                  value={projectFormData.liveLink}
                  onChange={handleProjectChange}
                  className={`w-full pl-12 pr-4 py-3 text-base rounded-lg ${
                    currentTheme === "dark"
                      ? "bg-slate-700 text-white border-slate-600 focus:border-teal-500 focus:ring-teal-500/50"
                      : "bg-white text-slate-900 border-slate-300 focus:border-teal-500 focus:ring-teal-500/30"
                  } border shadow-sm focus:ring-4 outline-none transition-all duration-200`}
                  placeholder="https://yourdemo.com"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setIsProjectModalOpen(false)}
              className={`px-6 py-3 text-base font-medium rounded-lg ${
                currentTheme === "dark"
                  ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              } transition-all duration-200 hover:scale-105 active:scale-95`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 text-base font-medium text-white 
                bg-gradient-to-r from-teal-600 to-teal-500 rounded-lg 
                shadow-lg shadow-teal-500/20 border border-teal-500/20 
                transition-all duration-300 hover:scale-105 active:scale-95 
                hover:shadow-xl hover:shadow-teal-500/30"
            >
              {editingProject ? "Update Project" : "Add Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}

        {/* Skill Modal */}
        {isSkillModalOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setIsSkillModalOpen(false)}
          >
            <div
              className={`w-full max-w-lg rounded-xl p-6 ${
                currentTheme === "dark" ? "bg-slate-800" : "bg-white"
              } shadow-2xl shadow-teal-900/20 border ${
                currentTheme === "dark"
                  ? "border-slate-700"
                  : "border-slate-200"
              } transition-all duration-300 animate-fade-scale-in`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2
                  className={`text-2xl font-bold ${
                    currentTheme === "dark" ? "text-white" : "text-slate-800"
                  }`}
                >
                  <span className="text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 bg-clip-text">
                    {editingSkill ? "Edit Skill" : "Add New Skill"}
                  </span>
                </h2>
                <button
                  onClick={() => setIsSkillModalOpen(false)}
                  className={`p-2 rounded-full ${
                    currentTheme === "dark"
                      ? "bg-slate-700 hover:bg-slate-600 text-slate-300"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  } transition-colors duration-200`}
                >
                  <X size={18} />
                </button>
              </div>
              <form onSubmit={handleSkillSubmit} className="space-y-5">
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
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
                    value={skillFormData.name}
                    onChange={handleSkillChange}
                    className={`w-full px-4 py-2 rounded-lg ${
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
                    className={`block text-sm font-medium mb-1 ${
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
                    value={skillFormData.level}
                    onChange={handleSkillChange}
                    className={`w-full px-4 py-2 rounded-lg ${
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
                    className={`block text-sm font-medium mb-1 ${
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
                    value={skillFormData.category}
                    onChange={handleSkillChange}
                    className={`w-full px-4 py-2 rounded-lg ${
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
                    className={`block text-sm font-medium mb-1 ${
                      currentTheme === "dark"
                        ? "text-slate-300"
                        : "text-slate-700"
                    }`}
                    htmlFor="iconUrl"
                  >
                    Icon URL (Optional)
                  </label>
                  <input
                    type="url"
                    id="iconUrl"
                    name="iconUrl"
                    value={skillFormData.iconUrl}
                    onChange={handleSkillChange}
                    className={`w-full px-4 py-2 rounded-lg ${
                      currentTheme === "dark"
                        ? "bg-slate-700 text-white border-slate-600 focus:border-teal-500 focus:ring-teal-500/50"
                        : "bg-white text-slate-900 border-slate-300 focus:border-teal-500 focus:ring-teal-500/30"
                    } border shadow-sm focus:ring-4 outline-none transition-all duration-200`}
                    placeholder="https://example.com/icon.png"
                  />
                </div>
                <div className="flex justify-end space-x-3 mt-8">
                  <button
                    type="button"
                    onClick={() => setIsSkillModalOpen(false)}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      currentTheme === "dark"
                        ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    } transition-colors duration-200`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 font-medium text-white bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-lg shadow-lg shadow-cyan-500/20 border border-cyan-500/20 transition-all duration-300 hover:scale-105"
                  >
                    {editingSkill ? "Update Skill" : "Add Skill"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
