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
import profileImg from "../assets/profile.jpg";
import { useTheme } from "../context/ThemeContext";
import api from "../services/api.js";

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

        // ✅ FIXED: Use api service instead of axios directly
        const [skillsResponse, projectsResponse] = await Promise.all([
          api.get("/skills").catch((err) => {
            console.error("Skills API error:", err);
            return { data: [] };
          }),
          api.get("/projects").catch((err) => {
            console.error("Projects API error:", err);
            return { data: [] };
          }),
        ]);

        // Transform skills data to match the expected format
        const transformedSkills = skillsResponse.data.map((skill) => ({
          name: skill.category || skill.name,
          icon: getSkillIcon(skill.category || skill.name),
          items: skill.technologies || [skill.name],
        }));

        setSkills(transformedSkills);
        setProjects(projectsResponse.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load data. Using fallback content.");

        // Fallback data
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
        ]);

        setProjects([
          {
            id: 1,
            title: "ASTAPHONICSFUNS",
            subtitle: "Phonics Learning Platform",
            description:
              "Developed a comprehensive web application with user authentication, payment gateway integration, and a Learning Management System.",
            technologies: ["React.js", "Java", "MySQL", "Razorpay"],
            repoLink: "https://github.com/username/astaphonicsfuns",
            liveLink: "https://astaphonicsfuns.com",
          },
          {
            id: 2,
            title: "EzyMart",
            subtitle: "E-commerce Platform",
            description:
              "Collaborated on a full-stack shopping application with dynamic UI, secure payment processing, and admin functionality.",
            technologies: ["React.js", "Spring Boot", "JDBC", "MySQL"],
            repoLink: "https://github.com/username/ezymart",
            liveLink: "https://ezymart.com",
          },
        ]);
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
    };

    const matchingKey = Object.keys(iconMap).find((key) =>
      category.toLowerCase().includes(key.toLowerCase())
    );

    return matchingKey ? iconMap[matchingKey] : <Code size={20} />;
  };

  // Handler functions
  const handleLoadMoreProjects = () => setVisibleProjects((prev) => prev + 4);
  const handleLoadMoreSkills = () => setVisibleSkills((prev) => prev + 4);
  const handleResetSkills = () => setVisibleSkills(4);
  const handleResetProjects = () => setVisibleProjects(4);

  // Extract technologies for filtering
  const allTechnologies = [
    "All",
    ...new Set(
      projects.flatMap((project) => project.technologies || []).filter(Boolean)
    ),
  ];

  // Filter projects
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

  // Timeline data
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
  ];

  // Background Particles Component
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
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div
      ref={sectionRef}
      className={`min-h-screen transition-colors duration-500 overflow-hidden relative ${
        isDark ? "bg-slate-900 text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      {/* Background elements */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_30%_20%,rgba(20,184,166,0.2),transparent_60%),radial-gradient(ellipse_at_80%_80%,rgba(6,182,212,0.25),transparent_60%)]" />
      <div className="absolute -top-10 sm:-top-20 -right-10 sm:-right-20 w-32 h-32 sm:w-64 sm:h-64 bg-teal-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute -bottom-8 sm:-bottom-16 -left-8 sm:-left-16 w-36 h-36 sm:w-72 sm:h-72 bg-cyan-500 rounded-full filter blur-3xl opacity-10 animate-pulse-slow"></div>

      <Particles />

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12 lg:py-16 max-w-6xl relative z-10">
        <div className="space-y-12 sm:space-y-16">
          {/* Header Section */}
          <div
            className={`flex flex-col items-center gap-6 sm:gap-8 animate-fade-in opacity-0 ${
              isInView ? "opacity-100" : ""
            }`}
            style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
          >
            <div className="w-32 h-32 sm:w-40 mt-14 sm:h-40 md:w-48 md:h-48 overflow-hidden rounded-full border-4 border-opacity-20 shadow-xl relative transition-all duration-500 border-teal-500/40 shadow-teal-500/20 flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-cyan-500/20"></div>
              <img
                src={profileImg}
                alt="Developer profile"
                className="w-full h-full object-cover relative z-10"
              />
            </div>

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
                across frontend and backend technologies.
              </p>
            </div>
          </div>

          {/* Skills Section with loading state */}
          <div
            className={`transition-opacity duration-700 delay-200 opacity-0 ${
              isInView ? "opacity-100" : ""
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold relative inline-block text-teal-300">
                Technical Skills
              </h2>

              {skills.length > 4 && (
                <button
                  onClick={visibleSkills > 4 ? handleResetSkills : handleLoadMoreSkills}
                  className={`px-3 py-1.5 rounded text-xs sm:text-sm font-medium flex items-center justify-center transition-all duration-300 ${
                    isDark
                      ? "bg-slate-700 hover:bg-slate-600 text-teal-300"
                      : "bg-teal-100 hover:bg-teal-200 text-teal-700"
                  }`}
                >
                  {visibleSkills > 4 ? "Show Less" : "Show More"}
                </button>
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
                      <div className="w-8 h-8 bg-gray-300 rounded-md mr-3"></div>
                      <div className="h-4 bg-gray-300 rounded w-20"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-300 rounded w-full"></div>
                      <div className="h-3 bg-gray-300 rounded w-3/4"></div>
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
                        <div className="p-2 rounded-md mr-3 bg-teal-900/50 text-teal-300">
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
                            <span className="mr-2 text-teal-300">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Projects Section */}
          <div
            className={`transition-opacity duration-700 delay-300 opacity-0 ${
              isInView ? "opacity-100" : ""
            }`}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 relative inline-block text-teal-300">
              Projects
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredProjects.slice(0, visibleProjects).map((project, index) => (
                <div
                  key={project.id || index}
                  className={`relative group overflow-hidden rounded-lg transition-all duration-700 transform hover:-translate-y-2 ${
                    isDark
                      ? "bg-slate-800/70 hover:bg-slate-800"
                      : "bg-white/90 hover:bg-white"
                  }`}
                  style={{ height: "16rem" }}
                >
                  <div className="p-4 sm:p-5 h-full flex flex-col">
                    <h3 className="text-base sm:text-lg font-semibold mb-1">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-teal-300 mb-2">
                      {project.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm flex-grow line-clamp-3 mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.technologies?.map((tech, idx) => (
                        <span
                          key={idx}
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            isDark ? "bg-teal-900/30 text-teal-300" : "bg-teal-50 text-teal-700"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      {project.repoLink && (
                        <a
                          href={project.repoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs text-teal-300"
                        >
                          <Github size={14} className="mr-1" />
                          Repo
                        </a>
                      )}
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs text-teal-300"
                        >
                          <ExternalLink size={14} className="mr-1" />
                          Live
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Section */}
          <div
            className={`transition-opacity duration-700 delay-400 opacity-0 ${
              isInView ? "opacity-100" : ""
            }`}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 relative inline-block text-teal-300">
              Experience & Education
            </h2>

            <div className="relative border-l-2 ml-2 sm:ml-4 border-teal-400">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className="mb-8 sm:mb-10 ml-4 sm:ml-6"
                >
                  <div className="absolute w-3 h-3 sm:w-4 sm:h-4 rounded-full mt-1.5 -left-1.5 sm:-left-2.5 bg-teal-400"></div>
                  <div className="flex flex-col sm:flex-row sm:items-center mb-1 gap-1 sm:gap-2">
                    <time className="text-xs sm:text-sm text-gray-400">
                      {item.year}
                    </time>
                    <h3 className="text-base sm:text-lg font-semibold">
                      {item.title}
                    </h3>
                    {item.duration && (
                      <span className="text-xs px-2 py-1 rounded bg-teal-900/30 text-teal-300">
                        {item.duration}
                      </span>
                    )}
                  </div>
                  <h4 className="mb-1 text-xs sm:text-sm font-medium text-teal-300">
                    {item.company}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div
            className={`transition-opacity duration-700 delay-500 opacity-0 ${
              isInView ? "opacity-100" : ""
            }`}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 relative inline-block text-teal-300">
              Contact Me
            </h2>

            <div
              onClick={() => (window.location.href = "/contact")}
              className={`p-4 sm:p-6 lg:p-8 rounded-lg cursor-pointer shadow-lg transition-all duration-500 ${
                isDark ? "bg-slate-800/50" : "bg-white/80 shadow-md"
              } backdrop-blur-sm`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <p className="text-sm sm:text-base">
                    I'm currently available for freelance work and job
                    opportunities. Feel free to reach out!
                  </p>
                  <div className="space-y-2">
                    <p className="flex items-center text-sm">
                      <span className="mr-2 text-teal-300">•</span>
                      <span className="font-medium">Location:</span>
                      <span className="ml-2">
                        Near MGBS, Kali Khaber, Hyderabad
                      </span>
                    </p>
                    <p className="flex items-center text-sm">
                      <span className="mr-2 text-teal-300">•</span>
                      <span className="font-medium">Email:</span>
                      <a
                        href="mailto:syedazadarhussayn@gmail.com"
                        className="ml-2 hover:underline text-teal-300"
                      >
                        syedazadarhussayn@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center md:justify-end">
                  <Link
                    to="/contact"
                    className={`p-3 rounded-full transition-all duration-300 hover:shadow-lg ${
                      isDark
                        ? "bg-slate-700 hover:bg-slate-600 text-teal-300"
                        : "bg-white hover:bg-teal-50 text-teal-600"
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