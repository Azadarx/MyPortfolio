import { useState, useEffect, useRef } from "react";
import {
  Code,
  BookOpen,
  Database,
  Server,
  ChevronRight,
  Github,
  ExternalLink,
  Plus,
  Layers,
  Search,
  Filter,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import profileImg from "../assets/profile.jpg";
import { useTheme } from "../context/ThemeContext";

// Backend URL configuration
const BACKEND_URL =
  typeof process !== "undefined" &&
  import.meta.env &&
  import.meta.env.REACT_APP_BACKEND_URL
    ? import.meta.env.REACT_APP_BACKEND_URL
    : "http://localhost:5000";

export default function About() {
  const [isInView, setIsInView] = useState(false);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState(4);
  const [visibleSkills, setVisibleSkills] = useState(4);
  const [activeSkillFilter, setActiveSkillFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const sectionRef = useRef(null);
  const { currentTheme } = useTheme();
  const isDark = currentTheme === "dark";

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Fetch skills and projects data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch both skills and projects concurrently
        const [skillsResponse, projectsResponse] = await Promise.all([
          axios.get("/api/skills").catch((err) => {
            console.error("Skills API error:", err);
            return { data: [] }; // Fallback to empty array
          }),
          axios.get("/api/projects").catch((err) => {
            console.error("Projects API error:", err);
            return { data: [] }; // Fallback to empty array
          }),
        ]);

        // Transform skills data to match the expected format
        const transformedSkills = skillsResponse.data.map((skill) => ({
          name: skill.category || skill.name,
          icon: getSkillIcon(skill.category || skill.name),
          items: skill.technologies || [skill.name], // Handle both formats
        }));

        setSkills(transformedSkills);
        setProjects(projectsResponse.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load data. Using fallback content.");

        // Fallback data in case of error
        setSkills([
          {
            name: "Frontend",
            icon: <Code size={20} />,
            items: [
              "HTML5, CSS3, JavaScript ES6+",
              "React.js, React Native (Basic)",
              "Tailwind CSS, Bootstrap",
            ],
          },
          {
            name: "Backend",
            icon: <Server size={20} />,
            items: [
              "Java, Advanced Java",
              "Spring Boot, JDBC",
              "Node.js, Express.js (Basic)",
            ],
          },
          {
            name: "Database",
            icon: <Database size={20} />,
            items: ["MySQL, PostgreSQL (Basics)"],
          },
          {
            name: "Reading",
            icon: <BookOpen size={20} />,
            items: ["Technical Documentation", "Web Development Trends"],
          },
        ]);

        // Extended fallback data for skills - to demonstrate scalability
        for (let i = 0; i < 6; i++) {
          setSkills((prev) => [
            ...prev,
            {
              name: `Skill Category ${i + 1}`,
              icon: <Code size={20} />,
              items: [
                `Technology ${i * 3 + 1}`,
                `Technology ${i * 3 + 2}`,
                `Technology ${i * 3 + 3}`,
              ],
            },
          ]);
        }

        // Setup fallback projects
        const fallbackProjects = [
          {
            id: 1,
            title: "ASTAPHONICSFUNS",
            subtitle: "Phonics Learning Platform",
            description:
              "Developed a comprehensive web application with user authentication, payment gateway integration, and a Learning Management System for a school principal.",
            technologies: ["React.js", "Java", "MySQL", "Razorpay"],
            repoLink: "https://github.com/username/astaphonicsfuns",
            liveLink: "https://astaphonicsfuns.com",
          },
          {
            id: 2,
            title: "EzyMart",
            subtitle: "E-commerce Platform",
            description:
              "Collaborated on a full-stack shopping application with dynamic UI, secure payment processing, and admin functionality to manage products and resellers.",
            technologies: ["React.js", "Spring Boot", "JDBC", "MySQL"],
            repoLink: "https://github.com/username/ezymart",
            liveLink: "https://ezymart.com",
          },
        ];

        // Add more fallback projects to demonstrate scalability
        for (let i = 0; i < 10; i++) {
          fallbackProjects.push({
            id: i + 3,
            title: `Project ${i + 3}`,
            subtitle: `Sample Project ${i + 3}`,
            description: `This is a sample project description for project ${
              i + 3
            }. It showcases various technologies and features.`,
            technologies: [
              "React.js",
              "Node.js",
              i % 2 === 0 ? "TypeScript" : "JavaScript",
              i % 3 === 0 ? "MongoDB" : "PostgreSQL",
            ],
            repoLink: `https://github.com/username/project-${i + 3}`,
            liveLink: i % 2 === 0 ? `https://project-${i + 3}.com` : null,
          });
        }

        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to get appropriate icon for skill category
  const getSkillIcon = (category) => {
    const iconMap = {
      Frontend: <Code size={20} />,
      Backend: <Server size={20} />,
      Database: <Database size={20} />,
      Reading: <BookOpen size={20} />,
      Development: <Code size={20} />,
      Programming: <Code size={20} />,
      "Web Development": <Code size={20} />,
      "Full Stack": <Server size={20} />,
    };

    // Find matching icon or default to Code
    const matchingKey = Object.keys(iconMap).find((key) =>
      category.toLowerCase().includes(key.toLowerCase())
    );

    return matchingKey ? iconMap[matchingKey] : <Code size={20} />;
  };

  // Load more projects handler
  const handleLoadMoreProjects = () => {
    setVisibleProjects((prev) => prev + 4);
  };

  // Load more skills handler
  const handleLoadMoreSkills = () => {
    setVisibleSkills((prev) => prev + 4);
  };

  // Reset skills handler
  const handleResetSkills = () => {
    setVisibleSkills(4);
  };

  // Reset projects handler
  const handleResetProjects = () => {
    setVisibleProjects(4);
  };

  // Extract all unique technologies from projects for filtering
  const allTechnologies = [
    "All",
    ...new Set(
      projects.flatMap((project) => project.technologies || []).filter(Boolean)
    ),
  ];

  // Filter projects based on selected technology and search query
  const filteredProjects = projects.filter((project) => {
    const matchesFilter =
      activeSkillFilter === "All" ||
      (project.technologies &&
        project.technologies.includes(activeSkillFilter));

    const matchesSearch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.description &&
        project.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  // Background particles component
  const Particles = () => {
    const particles = Array.from({ length: 15 });

    if (!isInView) return null;

    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((_, index) => {
          const size = Math.floor(Math.random() * 4) + 2;
          const duration = Math.floor(Math.random() * 8) + 15;
          const delay = Math.random() * 3;
          const opacity = Math.random() * 0.3 + 0.1;

          const colors = ["bg-teal-400/20", "bg-cyan-400/20", "bg-blue-400/20"];
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

  // Experience timeline data (static since this is personal info)
  const timeline = [
    {
      year: "2023-Present",
      title: "Web Developer",
      company: "My Chota School",
      duration: "6 Months",
      description:
        "Developed phonics learning platform and landing page with payment integration.",
    },
    {
      year: "2023",
      title: "Web Developer (Internship)",
      company: "Infoz IT Solutions",
      duration: "2 Months",
      description:
        "Collaborated on EzyMart e-commerce project using React.js, Java Spring Boot, and MySQL.",
    },
    {
      year: "2022-2025",
      title: "B.COM (GEN)",
      company: "Avinash College of Commerce",
      description: "Passing Percentage - 71%",
    },
    {
      year: "2020-2022",
      title: "MEC",
      company: "Avinash College of Commerce",
      description: "Passing Percentage - 69%",
    },
  ];

  return (
    <div
      ref={sectionRef}
      className={`min-h-screen transition-colors duration-500 overflow-hidden relative ${
        isDark ? "bg-slate-900 text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      {/* Background elements to match the theme */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_30%_20%,rgba(20,184,166,0.2),transparent_60%),radial-gradient(ellipse_at_80%_80%,rgba(6,182,212,0.25),transparent_60%)]" />

      {/* Accent elements - responsive sizing */}
      <div className="absolute -top-10 sm:-top-20 -right-10 sm:-right-20 w-32 h-32 sm:w-64 sm:h-64 bg-teal-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute -bottom-8 sm:-bottom-16 -left-8 sm:-left-16 w-36 h-36 sm:w-72 sm:h-72 bg-cyan-500 rounded-full filter blur-3xl opacity-10 animate-pulse-slow"></div>

      {/* Particles background */}
      <Particles />

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12 lg:py-16 max-w-6xl relative z-10">
        <div className="space-y-12 sm:space-y-16">
          {/* Header Section - Mobile First Design */}
          <div
            className={`flex flex-col items-center gap-6 sm:gap-8 animate-fade-in opacity-0 ${
              isInView ? "opacity-100" : ""
            }`}
            style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
          >
            {/* Profile Image - Responsive sizing */}
            <div className="w-32 h-32 sm:w-40 mt-14 sm:h-40 md:w-48 md:h-48 overflow-hidden rounded-full border-4 border-opacity-20 shadow-xl relative transition-all duration-500 border-teal-500/40 shadow-teal-500/20 flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-cyan-500/20"></div>
              <img
                src={profileImg}
                alt="Developer profile"
                className="w-full h-full object-cover relative z-10"
              />
            </div>

            {/* Text Content - Centered for mobile, left-aligned for larger screens */}
            <div className="text-center max-w-3xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-400 leading-tight">
                SYED AZADAR HUSSAIN
              </h1>
              <h2 className="text-lg sm:text-xl md:text-2xl font-medium mb-3 sm:mb-4 text-gray-300 dark:text-gray-300">
                Web Developer
              </h2>
              <p
                className={`text-sm sm:text-base lg:text-lg leading-relaxed px-2 sm:px-0 ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                I'm a Website Developer with expertise in React.js, Java, Spring
                Boot and modern web technologies. I consider myself a
                responsible and orderly person, looking forward to expanding my
                professional experience.
              </p>
            </div>
          </div>

          {/* About Me Section */}
          <div
            className={`transition-opacity duration-700 delay-100 opacity-0 ${
              isInView ? "opacity-100" : ""
            }`}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 relative inline-block text-teal-300">
              About Me
              <span
                className={`absolute -bottom-1 left-0 h-0.5 sm:h-1 w-full transform scale-x-0 ${
                  isInView ? "scale-x-100" : ""
                } transition-transform duration-700 delay-300 bg-teal-400`}
              ></span>
            </h2>

            <div
              className={`p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg transition-all duration-500 ${
                isDark ? "bg-slate-800/50" : "bg-white/80 shadow-md"
              } backdrop-blur-sm`}
            >
              <p
                className={`mb-4 text-sm sm:text-base leading-relaxed ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                I'm a passionate web developer with a focus on creating
                responsive and dynamic user interfaces. My technical skills span
                across frontend and backend technologies, with a particular
                emphasis on React.js for frontend development and Java with
                Spring Boot for backend solutions.
              </p>
              <p
                className={`text-sm sm:text-base leading-relaxed ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Currently pursuing B.COM at Avinash College of Commerce, I
                balance my academic commitments with practical development work.
                I've already gained valuable experience through my roles at
                Infoz IT Solutions and My Chota School, where I've contributed
                to team projects and developed independent solutions.
              </p>
            </div>
          </div>

          {/* Dynamic Skills Section - IMPROVED */}
          <div
            className={`transition-opacity duration-700 delay-200 opacity-0 ${
              isInView ? "opacity-100" : ""
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold relative inline-block text-teal-300">
                Technical Skills
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 sm:h-1 w-full transform scale-x-0 ${
                    isInView ? "scale-x-100" : ""
                  } transition-transform duration-700 delay-400 bg-teal-400`}
                ></span>
              </h2>

              {skills.length > 4 && (
                <div className="flex gap-2">
                  {visibleSkills > 4 ? (
                    <button
                      onClick={handleResetSkills}
                      className={`px-3 py-1.5 rounded text-xs sm:text-sm font-medium flex items-center justify-center transition-all duration-300 ${
                        isDark
                          ? "bg-slate-700 hover:bg-slate-600 text-teal-300"
                          : "bg-teal-100 hover:bg-teal-200 text-teal-700"
                      }`}
                    >
                      Show Less
                    </button>
                  ) : (
                    <button
                      onClick={handleLoadMoreSkills}
                      className={`px-3 py-1.5 rounded text-xs sm:text-sm font-medium flex items-center justify-center transition-all duration-300 ${
                        isDark
                          ? "bg-slate-700 hover:bg-slate-600 text-teal-300"
                          : "bg-teal-100 hover:bg-teal-200 text-teal-700"
                      }`}
                    >
                      Show More <Plus size={14} className="ml-1" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className={`p-4 sm:p-5 rounded-lg animate-pulse ${
                      isDark ? "bg-slate-800/50" : "bg-white/80 shadow-md"
                    }`}
                  >
                    <div className="flex items-center mb-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-teal-900/50 rounded-md mr-3"></div>
                      <div className="h-3 sm:h-4 bg-gray-300 rounded w-20"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 sm:h-3 bg-gray-300 rounded w-full"></div>
                      <div className="h-2 sm:h-3 bg-gray-300 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {error && (
                  <div
                    className={`mb-4 p-3 rounded-lg text-sm ${
                      isDark
                        ? "bg-yellow-900/20 text-yellow-300"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    <p>{error}</p>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {skills.slice(0, visibleSkills).map((skill, index) => (
                    <div
                      key={index}
                      className={`p-4 sm:p-5 lg:p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 h-full ${
                        isDark
                          ? "bg-slate-800/50 hover:bg-slate-800/70"
                          : "bg-white/80 hover:bg-white/90 shadow-md"
                      } backdrop-blur-sm`}
                    >
                      <div className="flex items-center mb-3">
                        <div className="p-1.5 sm:p-2 rounded-md mr-3 bg-teal-900/50 text-teal-300 flex-shrink-0">
                          {skill.icon}
                        </div>
                        <h3 className="text-base sm:text-lg font-medium">
                          {skill.name}
                        </h3>
                      </div>
                      <ul
                        className={`space-y-1 text-xs sm:text-sm ${
                          isDark ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {skill.items.map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="mr-2 text-teal-300 flex-shrink-0">
                              •
                            </span>
                            <span className="break-words">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {skills.length > 4 && visibleSkills < skills.length && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={handleLoadMoreSkills}
                      className={`px-4 py-2 rounded-md text-sm font-medium inline-flex items-center transition-all duration-300 ${
                        isDark
                          ? "bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/20"
                          : "bg-teal-50 hover:bg-teal-100 text-teal-700"
                      }`}
                    >
                      Show All Skills <Plus size={16} className="ml-1" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Timeline Section */}
          <div
            className={`transition-opacity duration-700 delay-300 opacity-0 ${
              isInView ? "opacity-100" : ""
            }`}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 relative inline-block text-teal-300">
              Experience & Education
              <span
                className={`absolute -bottom-1 left-0 h-0.5 sm:h-1 w-full transform scale-x-0 ${
                  isInView ? "scale-x-100" : ""
                } transition-transform duration-700 delay-500 bg-teal-400`}
              ></span>
            </h2>

            <div className="relative border-l-2 ml-2 sm:ml-4 border-teal-400">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`mb-8 sm:mb-10 ml-4 sm:ml-6 transition-all duration-500 transform translate-x-0 opacity-0 ${
                    isInView ? "translate-x-0 opacity-100" : ""
                  }`}
                  style={{ transitionDelay: `${300 + index * 150}ms` }}
                >
                  <div className="absolute w-3 h-3 sm:w-4 sm:h-4 rounded-full mt-1.5 -left-1.5 sm:-left-2.5 bg-teal-400"></div>
                  <div className="flex flex-col sm:flex-row sm:items-center mb-1 gap-1 sm:gap-2">
                    <time
                      className={`text-xs sm:text-sm font-normal ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {item.year}
                    </time>
                    <h3 className="text-base sm:text-lg font-semibold">
                      {item.title}
                    </h3>
                    {item.duration && (
                      <span className="text-xs px-2 py-1 rounded bg-teal-900/30 text-teal-300 inline-block w-fit">
                        {item.duration}
                      </span>
                    )}
                  </div>
                  <h4 className="mb-1 text-xs sm:text-sm font-medium text-teal-300">
                    {item.company}
                  </h4>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Masonry-like grid layout for projects that adapts to different screen sizes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 auto-rows-auto">
            {filteredProjects
              .slice(0, visibleProjects)
              .map((project, index) => (
                <div
                  key={project.id || index}
                  className={`relative group overflow-hidden rounded-lg transition-all duration-700 transform hover:-translate-y-2 ${
                    isDark
                      ? "bg-slate-800/70 hover:bg-slate-800 shadow-md shadow-black/10 hover:shadow-2xl hover:shadow-teal-500/10"
                      : "bg-white/90 hover:bg-white shadow-md shadow-gray-200/50 hover:shadow-2xl hover:shadow-teal-500/20"
                  }`}
                  style={{
                    height: "16rem", // Fixed initial height
                    transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {/* Project content wrapper with smooth expansion */}
                  <div className="p-4 sm:p-5 h-full w-full flex flex-col relative overflow-hidden">
                    {/* Gradient overlay that appears on hover */}
                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                        isDark
                          ? "bg-gradient-to-b from-transparent via-slate-800/50 to-slate-900/80"
                          : "bg-gradient-to-b from-transparent via-white/50 to-gray-50/80"
                      }`}
                    ></div>

                    {/* Content container with z-index to stay above overlay */}
                    <div className="relative z-10 h-full flex flex-col">
                      {/* Top section: title and subtitle with enhanced animation */}
                      <div className="mb-2 transform transition-all duration-500 group-hover:scale-105">
                        <h3
                          className={`text-base sm:text-lg font-semibold transition-all duration-500 ${
                            isDark
                              ? "text-gray-100 group-hover:text-teal-300"
                              : "text-gray-800 group-hover:text-teal-700"
                          }`}
                        >
                          {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-medium text-teal-300 mb-1 transition-all duration-500 group-hover:text-teal-400">
                          {project.subtitle}
                        </p>
                      </div>

                      {/* Description with smooth reveal animation */}
                      <div
                        className={`flex-grow mb-3 relative transition-all duration-700 ${
                          isDark ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {/* Default state - truncated description */}
                        <div className="absolute inset-0 transition-all duration-700 group-hover:opacity-0 group-hover:transform group-hover:-translate-y-4">
                          <p className="text-xs sm:text-sm leading-relaxed line-clamp-3">
                            {project.description}
                          </p>
                        </div>

                        {/* Hover state - full description with fade-in */}
                        <div className="absolute inset-0 opacity-0 transform translate-y-4 transition-all duration-700 group-hover:opacity-100 group-hover:translate-y-0">
                          <div className="h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-teal-500/30">
                            <p className="text-xs sm:text-sm leading-relaxed">
                              {project.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Technologies tags with staggered animation */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.technologies &&
                          project.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className={`text-xs px-2 py-0.5 rounded-full transition-all duration-500 transform group-hover:scale-110 ${
                                isDark
                                  ? "bg-teal-900/30 text-teal-300 group-hover:bg-teal-900/50 group-hover:text-teal-200"
                                  : "bg-teal-50 text-teal-700 group-hover:bg-teal-100 group-hover:text-teal-800"
                              }`}
                              style={{
                                transitionDelay: `${idx * 50}ms`,
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                      </div>

                      {/* Links section with enhanced hover effects */}
                      <div className="flex space-x-2 mt-auto pt-1">
                        {project.repoLink && (
                          <a
                            href={project.repoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center text-xs sm:text-sm font-medium transition-all duration-300 transform hover:scale-110 hover:underline ${
                              isDark
                                ? "text-teal-300 hover:text-teal-200"
                                : "text-teal-600 hover:text-teal-700"
                            }`}
                          >
                            <Github
                              size={14}
                              className="mr-1 transition-transform duration-300 group-hover:rotate-12"
                            />
                            Repository
                          </a>
                        )}
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center text-xs sm:text-sm font-medium transition-all duration-300 transform hover:scale-110 hover:underline ${
                              isDark
                                ? "text-teal-300 hover:text-teal-200"
                                : "text-teal-600 hover:text-teal-700"
                            }`}
                          >
                            <ExternalLink
                              size={14}
                              className="mr-1 transition-transform duration-300 group-hover:rotate-12"
                            />
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Enhanced decorative corner accent with animation */}
                    <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                      <div
                        className={`absolute transform rotate-45 translate-x-1/3 -translate-y-1/2 w-16 h-3 transition-all duration-700 group-hover:w-20 group-hover:h-4 ${
                          isDark
                            ? "bg-teal-500/20 group-hover:bg-teal-400/40"
                            : "bg-teal-300/20 group-hover:bg-teal-400/40"
                        }`}
                      ></div>
                    </div>

                    {/* Subtle border glow on hover */}
                    <div
                      className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${
                        isDark
                          ? "border border-teal-500/30"
                          : "border border-teal-400/30"
                      }`}
                    ></div>
                  </div>
                </div>
              ))}
          </div>

          {/* Contact Section */}
          <div
            className={`transition-opacity duration-700 delay-500 opacity-0 ${
              isInView ? "opacity-100" : ""
            }`}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 relative inline-block text-teal-300">
              Contact Me
              <span
                className={`absolute -bottom-1 left-0 h-0.5 sm:h-1 w-full transform scale-x-0 ${
                  isInView ? "scale-x-100" : ""
                } transition-transform duration-700 delay-700 bg-teal-400`}
              ></span>
            </h2>

            <div
              onClick={() => (window.location.href = "/contact")}
              className={`p-4 sm:p-6 lg:p-8 rounded-lg cursor-pointer shadow-lg transition-all duration-500 ${
                isDark ? "bg-slate-800/50" : "bg-white/80 shadow-md"
              } backdrop-blur-sm`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className={`${
                    isDark ? "text-gray-300" : "text-gray-700"
                  } space-y-4`}
                >
                  <p className="text-sm sm:text-base leading-relaxed">
                    I'm currently available for freelance work and job
                    opportunities. Feel free to reach out to me for any
                    inquiries or collaborations!
                  </p>
                  <div className="space-y-2">
                    <p className="flex items-center text-sm">
                      <span
                        className={`mr-2 text-teal-300 ${
                          isDark ? "text-teal-300" : "text-teal-500"
                        }`}
                      >
                        •
                      </span>
                      <span className="font-medium">Location:</span>
                      <span className="ml-2">
                        Near MGBS, Kali Khaber, Hyderabad, Telangana - 500024
                      </span>
                    </p>
                    <p className="flex items-center text-sm">
                      <span
                        className={`mr-2 ${
                          isDark ? "text-teal-300" : "text-teal-500"
                        }`}
                      >
                        •
                      </span>
                      <span className="font-medium">Email:</span>
                      <a
                        href="mailto:syedazadarhussayn@gmail.com"
                        className={`ml-2 hover:underline ${
                          isDark ? "text-teal-300" : "text-teal-500"
                        }`}
                      >
                        syedazadarhussayn@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center md:justify-end space-x-4">
                  <Link
                    to="/contact"
                    className={`p-3 rounded-full transition-all duration-300 hover:shadow-lg ${
                      isDark
                        ? "bg-slate-700 hover:bg-slate-600 text-teal-300"
                        : "bg-white hover:bg-teal-50 text-teal-600 shadow-md"
                    }`}
                  >
                    <ExternalLink size={20} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
