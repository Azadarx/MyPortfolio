import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Code2, Database, Cpu, Github, ExternalLink, MapPin, Mail, Briefcase,Code
} from 'lucide-react';
import axios from 'axios';
import api, { BACKEND_BASE_URL } from "../services/api";
import profileImg from "../assets/profile.jpg";
import { useTheme } from '../context/ThemeContext.jsx';

const BACKEND_URL = BACKEND_BASE_URL;

const Particles = ({ isInView }) => {
  const particles = Array.from({ length: 8 });
  if (!isInView) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((_, index) => {
        const size = Math.floor(Math.random() * 4) + 2;
        const duration = Math.floor(Math.random() * 8) + 15;
        const delay = Math.random() * 3;
        const opacity = Math.random() * 0.4 + 0.2;
        const colors = ['bg-teal-400/30', 'bg-cyan-400/30', 'bg-blue-400/20'];
        const colorClass = colors[Math.floor(Math.random() * colors.length)];
        return (
          <div
            key={index}
            className={`absolute rounded-full ${colorClass} animate-float`}
            style={{
              width: size,
              height: size,
              left: `clamp(0%, ${Math.random() * 100}%, 100%)`,
              top: `clamp(0%, ${Math.random() * 100}%, 100%)`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              opacity: opacity,
              transform: 'translateY(0)',
            }}
          />
        );
      })}
    </div>
  );
};

const LiveCodingDemo = ({ currentTheme, githubStats }) => {
  const [code, setCode] = useState('');
  const [currentLine, setCurrentLine] = useState(0);

  const codeLines = githubStats
    ? [
        'const developer = {',
        `  name: "Syed Azadar Hussain",`,
        `  location: "${githubStats.location || 'Hyderabad, Telangana'}",`,
        `  github: "${githubStats.username || 'azadarx'}",`,
        `  totalRepos: ${githubStats.totalRepos || 0},`,
        `  totalStars: ${githubStats.totalStars || 0},`,
        `  followers: ${githubStats.followers || 0},`,
        '  passion: "Creating Amazing Web Solutions",',
        '  status: "Available for Opportunities"',
        '};',
        '',
        'developer.buildAwesomeProjects();'
      ]
    : [
        'const developer = {',
        '  name: "Syed Azadar Hussain",',
        '  location: "Hyderabad, Telangana",',
        '  education: "B.COM at Avinash College",',
        '  skills: ["React", "Java", "Spring Boot"],',
        '  passion: "Creating Amazing Web Solutions",',
        '  experience: "Web Developer",',
        '  status: "Available for Opportunities"',
        '};',
        '',
        'developer.buildAwesomeProjects();'
      ];

  useEffect(() => {
    let timeout;
    const interval = setInterval(() => {
      if (currentLine < codeLines.length) {
        setCode((prev) => prev + codeLines[currentLine] + '\n');
        setCurrentLine((prev) => prev + 1);
      } else {
        timeout = setTimeout(() => {
          setCode('');
          setCurrentLine(0);
        }, 3000);
      }
    }, 600);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [currentLine, codeLines]);

  return (
    <div className={`relative group w-full max-w-full ${currentTheme === 'dark'
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700/50'
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-50 border-slate-200/50'}
        rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 font-mono text-xs sm:text-sm border-2 shadow-2xl overflow-hidden
        hover:shadow-3xl transition-all duration-500 hover:scale-[1.01] sm:hover:scale-[1.02] transform-gpu`}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 rounded-xl sm:rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse"></div>
      <div className="relative">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex gap-1.5 sm:gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className={`${currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-500'} text-xs sm:text-sm font-medium truncate`}>about-me.js</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-slate-500">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-teal-400 rounded-full animate-pulse"></div>
            <span className="hidden xs:inline">Live Preview</span>
          </div>
        </div>
        <div className="relative bg-gradient-to-br from-slate-950 to-slate-900 rounded-lg p-3 sm:p-4 md:p-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-transparent to-cyan-500/5"></div>
          <pre
  className="relative text-teal-400 text-xs sm:text-sm md:text-base
             leading-relaxed whitespace-pre-wrap break-all font-mono
             overflow-x-hidden"
  style={{ minHeight: '200px', maxHeight: '260px' }}
>
            {code}
            <span className="animate-pulse text-teal-300 font-bold">|</span>
          </pre>
        </div>
      </div>
    </div>
  );
};

const EnhancedTechStack = ({ currentTheme, skills }) => {
  const baseCategories = ['All', 'Frontend', 'Backend', 'Database'];
  const extraCategories = Array.from(
    new Set(
      skills
        .map((s) => s.category && s.category.trim())
        .filter(
          (cat) =>
            cat &&
            !baseCategories.some(
              (base) => base.toLowerCase() === cat.toLowerCase()
            )
        )
    )
  );
  const categories = [...baseCategories, ...extraCategories];

  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredSkills =
    selectedCategory === 'All'
      ? skills
      : skills.filter(
          (skill) =>
            skill.category &&
            skill.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
        );

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'frontend':
        return <Code2 size={16} className="sm:w-[18px] sm:h-[18px]" />;
      case 'backend':
        return <Cpu size={16} className="sm:w-[18px] sm:h-[18px]" />;
      case 'database':
        return <Database size={16} className="sm:w-[18px] sm:h-[18px]" />;
      default:
        return <Code2 size={16} className="sm:w-[18px] sm:h-[18px]" />;
    }
  };

  const getLevelPercent = (level) => {
    if (typeof level === 'number') return level;
    if (!level) return 0;
    const l = level.toLowerCase();
    if (l === 'beginner') return 33;
    if (l === 'intermediate') return 66;
    if (l === 'advanced' || l === 'expert') return 100;
    const num = parseInt(level, 10);
    return isNaN(num) ? 0 : num;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4">
      <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm md:text-base font-semibold transition-all duration-400 transform hover:scale-105 ${
              selectedCategory.trim().toLowerCase() === category.trim().toLowerCase()
                ? 'bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-500 text-white shadow-2xl shadow-teal-500/30 scale-105'
                : currentTheme === 'dark'
                ? 'bg-gradient-to-r from-slate-800 to-slate-700 text-slate-300 hover:from-slate-700 hover:to-slate-600 border-2 border-slate-600/50 hover:border-teal-500/50 shadow-lg'
                : 'bg-gradient-to-r from-white to-gray-50 text-slate-700 hover:from-gray-50 hover:to-white border-2 border-slate-200 hover:border-teal-500/50 shadow-lg hover:shadow-xl'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full">
        {filteredSkills.map((skill, index) => (
          <motion.div
            key={skill.id}
            className={`relative group overflow-hidden rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 transition-all duration-300 h-full ${
              currentTheme === 'dark'
                ? 'bg-slate-800/70 border border-teal-900/50 hover:bg-slate-800/90'
                : 'bg-white border border-teal-100 hover:bg-slate-50'
            } backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-teal-500/10 transform hover:-translate-y-1`}
            initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-400 transform origin-left group-hover:scale-x-100 scale-x-0 transition-transform duration-300"></div>
            <div className="flex flex-col items-center">
              <div className="mb-2 sm:mb-3 relative">
                {skill.iconUrl ? (
                  <img
                    src={
                      skill.iconUrl.startsWith('http')
                        ? skill.iconUrl
                        : `${BACKEND_URL}${skill.iconUrl}`
                    }
                    alt={`${skill.name} icon`}
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-teal-500/30"
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/64')}
                  />
                ) : (
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center ${
                      currentTheme === 'dark' ? 'bg-teal-900/50' : 'bg-teal-50'
                    } border-2 border-teal-500/30`}
                  >
                    {getCategoryIcon(skill.category)}
                  </div>
                )}
                <div className="absolute inset-0 bg-teal-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3
                className={`text-sm sm:text-base md:text-lg font-bold text-center ${
                  currentTheme === 'dark' ? 'text-white' : 'text-slate-800'
                } group-hover:text-teal-500 transition-colors duration-300 line-clamp-2 px-1`}
              >
                {skill.name}
              </h3>
              <span
                className={`text-xs px-2 py-0.5 sm:py-1 rounded-full mt-1 ${
                  currentTheme === 'dark'
                    ? 'bg-teal-900/40 text-teal-300'
                    : 'bg-teal-100 text-teal-700'
                }`}
              >
                {skill.category}
              </span>
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mt-2 sm:mt-3 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className={`${
                      currentTheme === 'dark' ? 'stroke-slate-700' : 'stroke-slate-200'
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
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={
                      2 * Math.PI * 40 -
                      (getLevelPercent(skill.level) / 100) * (2 * Math.PI * 40)
                    }
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <span
                  className={`absolute inset-0 flex items-center justify-center text-xs sm:text-sm font-semibold ${
                    currentTheme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                  }`}
                  style={{ pointerEvents: 'none' }}
                >
                  {typeof skill.level === 'string'
                    ? skill.level.charAt(0).toUpperCase() + skill.level.slice(1)
                    : skill.level}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const FeaturedProjects = ({ currentTheme, projects }) => {
  const [hoveredProject, setHoveredProject] = useState(null);

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {projects.map((project, index) => {
          let techList = [];
          if (Array.isArray(project.technologies)) {
            techList = project.technologies;
          } else if (typeof project.technologies === 'string') {
            techList = project.technologies.split(',').map((t) => t.trim());
          }

          const getImageUrl = () => {
  const imageField = project.imageUrl || project.imageurl;
  
  if (!imageField) return null;
  
  // If it's already a full URL, use it as-is
  if (imageField.startsWith('http')) {
    return imageField;
  }
  
  // Remove leading slash if present to avoid double slashes
  const cleanPath = imageField.startsWith('/') ? imageField.substring(1) : imageField;
  
  // Construct full URL using BACKEND_BASE_URL from api.js
  return `${BACKEND_URL.replace('/api', '')}/${cleanPath}`;
};

const imageSrc = getImageUrl();

          return (
            <div
              key={project.id}
              className={`relative group overflow-hidden rounded-lg transition-all duration-300 transform hover:shadow-md h-full ${currentTheme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onTouchStart={() => setHoveredProject(project.id)}
              onTouchEnd={() => setTimeout(() => setHoveredProject(null), 3000)}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div
                className="relative w-full overflow-hidden cursor-pointer"
                style={{ height: '140px' }}
                onClick={() => {
                  const url = project.liveLink || project.repoLink;
                  if (url) window.open(url, '_blank', 'noopener,noreferrer');
                }}
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
                <div
                  className={`absolute bottom-2 right-2 flex space-x-2 transition-all duration-300 ${hoveredProject === project.id ? 'opacity-100' : 'opacity-0'}`}
                >
                 {project.repoLink && (
  <a
    href={project.repoLink}
    target="_blank"
    rel="noopener noreferrer"
    className={`p-1.5 rounded-full ${
      currentTheme === 'dark'
        ? 'bg-slate-800/90 text-teal-400'
        : 'bg-white/90 text-teal-600'
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
      currentTheme === 'dark'
        ? 'bg-slate-800/90 text-teal-400'
        : 'bg-white/90 text-teal-600'
    } backdrop-blur-sm`}
    onClick={(e) => e.stopPropagation()}
  >
    <ExternalLink size={14} />
  </a>
)}

                </div>
              </div>
              <div
                className="p-3 cursor-pointer"
                onClick={() => {
                  const url = project.liveLink || project.repoLink;
                  if (url) window.open(url, '_blank', 'noopener,noreferrer');
                }}
              >
                <h3
                  className={`text-base sm:text-lg font-bold mb-1 ${currentTheme === 'dark' ? 'text-white' : 'text-slate-800'} line-clamp-1`}
                >
                  {project.title}
                </h3>
                <div className="overflow-hidden mb-2" style={{ height: '60px' }}>
                  <div
                    className={`h-full ${
  hoveredProject === project.id ? 'overflow-y-auto' : 'overflow-hidden'
} pr-1 ${currentTheme === 'dark' ? 'text-slate-300' : 'text-slate-600'} text-sm hide-scrollbar`}

                  >
                    <p className={hoveredProject === project.id ? '' : 'line-clamp-3'}>
                      {project.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {techList.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${currentTheme === 'dark' ? 'bg-teal-900/40 text-teal-300' : 'bg-teal-50 text-teal-700'}`}
                    >
                      {tech}
                    </span>
                  ))}
                  {techList.length > 3 && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${currentTheme === 'dark' ? 'bg-slate-700/60 text-slate-300' : 'bg-slate-100 text-slate-600'}`}
                    >
                      +{techList.length - 3}
                    </span>
                  )}
                </div>
              </div>
              <div
                className={`absolute bottom-1 right-1 md:hidden transition-opacity duration-300 ${hoveredProject === project.id ? 'opacity-70' : 'opacity-0'}`}
              >
                <div
                  className={`px-1.5 py-0.5 rounded text-xs bg-black/20 backdrop-blur-sm ${currentTheme === 'dark' ? 'text-teal-300' : 'text-teal-700'}`}
                >
                  Scroll
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ContactInfo = ({ currentTheme, githubStats }) => {
  const contactDetails = [
    {
      icon: MapPin,
      label: 'Location',
      value: githubStats?.location || 'Near MGBS, Kali Khaber, Hyderabad, Telangana - 500024',
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/10',
      borderColor: 'border-teal-500/30'
    },
    {
      icon: Mail,
      label: 'Email',
      value: githubStats?.email || 'syedazadarhussayn@gmail.com',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      isClickable: true
    },
    {
      icon: Briefcase,
      label: 'Status',
      value: 'Available for Freelance Work & Job Opportunities',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: githubStats?.username || 'azadarx',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      isClickable: true,
      href: `https://github.com/${githubStats?.username || 'azadarx'}`
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full mb-8 sm:mb-10 md:mb-12">
        {contactDetails.map((detail, index) => (
          <div key={detail.label} 
            className={`group relative ${currentTheme === 'dark' 
              ? 'bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/60 border-slate-700/40 hover:border-teal-500/60' 
              : 'bg-gradient-to-br from-white/90 via-white/70 to-gray-50/90 border-slate-200/40 hover:border-teal-500/60'} 
              p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border-2 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 w-full 
              ${detail.isClickable ? 'hover:scale-105 cursor-pointer transform-gpu hover:-translate-y-1' : 'hover:scale-102'}`}
            style={{ animationDelay: `${index * 100}ms` }}>
            <div className="flex items-start gap-3 sm:gap-4 md:gap-6">
              <div className={`${detail.bgColor} ${detail.borderColor} p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0`}>
                <detail.icon className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 ${detail.color}`} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className={`font-bold ${currentTheme === 'dark' ? 'text-white group-hover:text-teal-300' : 'text-slate-800 group-hover:text-teal-600'} 
                  text-base sm:text-lg md:text-xl mb-2 sm:mb-3 transition-colors duration-300`}>
                  {detail.label}
                </h3>
                <p className={`${currentTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'} text-sm sm:text-base md:text-lg leading-relaxed break-words`}>
                  {detail.isClickable ? (
                    <a href={detail.href || `mailto:${detail.value}`} 
                       className={`${detail.color} hover:text-teal-300 transition-colors duration-300 font-medium underline decoration-2 underline-offset-4`}>
                      {detail.value}
                    </a>
                  ) : (
                    detail.value
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={`${currentTheme === 'dark' 
        ? 'bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/60 border-slate-700/40' 
        : 'bg-gradient-to-br from-white/90 via-white/70 to-gray-50/90 border-slate-200/40'} 
        p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border-2 backdrop-blur-sm shadow-xl w-full`}>
        <h3 className={`text-xl sm:text-2xl font-bold ${currentTheme === 'dark' ? 'text-white' : 'text-slate-800'} text-center mb-6 sm:mb-8`}>
          GitHub Statistics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-400 mb-2">{githubStats?.totalRepos || 25}</div>
            <div className={`text-sm sm:text-base ${currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'} font-medium`}>Repositories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-400 mb-2">{githubStats?.totalStars || 150}</div>
            <div className={`text-sm sm:text-base ${currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'} font-medium`}>Total Stars</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-400 mb-2">{githubStats?.followers || 45}</div>
            <div className={`text-sm sm:text-base ${currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'} font-medium`}>Followers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const fetchWithRetry = async (requestFn, retries = 3, delay = 1500) => {
  try {
    return await requestFn();
  } catch (error) {
    if (retries <= 0) {
      throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, delay));
    return fetchWithRetry(requestFn, retries - 1, delay * 1.5);
  }
};


const Portfolio = () => {
  const { currentTheme } = useTheme();
  const [isVisible, setIsVisible] = useState({});
  const [githubStats, setGithubStats] = useState(null);
  const [realTimeStats, setRealTimeStats] = useState(null);
  const [journey, setJourney] = useState([]);
  const [skills, setSkills] = useState([]);
const [projects, setProjects] = useState([]);
const [loadingSkills, setLoadingSkills] = useState(true);
const [errorSkills, setErrorSkills] = useState(null);
const observerRef = useRef();
const gradientRef = useRef(null);
useEffect(() => {
const fetchSkills = async () => {
try {
setLoadingSkills(true);
const response = await api.get('/skills');
setSkills(response.data);
setLoadingSkills(false);
setErrorSkills(null);
} catch (err) {
setErrorSkills(err.response?.data?.message || 'Failed to load skills');
setLoadingSkills(false);
}
};
fetchSkills();
}, []);
useEffect(() => {
const fetchJourney = async () => {
try {
const response = await api.get('/journey');
setJourney(response.data);
} catch (error) {
setJourney([]);
}
};
fetchJourney();
}, []);
useEffect(() => {
const fetchProjects = async () => {
try {
const response = await api.get('/projects');
setProjects(response.data);
} catch (error) {
setProjects([]);
}
};
fetchProjects();
}, []);
useEffect(() => {
  let isMounted = true;

  const fetchGithubStats = async () => {
    try {
      const response = await fetchWithRetry(
        () => api.get('/stats/github'),
        3,       // retries
        2000     // initial delay (ms)
      );

      if (isMounted) {
        setGithubStats(response.data);
      }
    } catch (error) {
      if (isMounted) {
        setGithubStats(null);
        console.error('GitHub stats failed after retries:', error);
      }
    }
  };

  fetchGithubStats();

  return () => {
    isMounted = false;
  };
}, []);
useEffect(() => {
const fetchRealTimeStats = async () => {
try {
const response = await api.get('/analytics/realtime');
setRealTimeStats(response.data);
} catch (error) {
setRealTimeStats(null);
}
};
fetchRealTimeStats();
}, []);
useEffect(() => {
  observerRef.current = new IntersectionObserver(
    (entries) => {
      const updates = {};
      let hasChanges = false;
      
      entries.forEach((entry) => {
        if (entry.target.id) {
          const newValue = entry.isIntersecting;
          // Only update if value actually changed
          if (!isVisible[entry.target.id] !== !newValue) {
            updates[entry.target.id] = newValue;
            hasChanges = true;
          }
        }
      });
      
      if (hasChanges) {
        setIsVisible((prev) => ({ ...prev, ...updates }));
      }
    },
    { threshold: 0.1, rootMargin: '50px' }
  );
return () => {
  if (observerRef.current) {
    observerRef.current.disconnect();
  }
};
}, []);
useEffect(() => {
const sections = document.querySelectorAll('section[id]'); // Only observe section elements
sections.forEach((section) => {
if (observerRef.current) {
observerRef.current.observe(section);
}
});
}, []);


if (loadingSkills) {
return (
<div className={`min-h-screen flex justify-center items-center ${
  currentTheme === 'dark' ? 'bg-slate-900' : 'bg-white'
} transition-colors duration-300`}>
<div className="relative">
<div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-teal-100 border-solid rounded-full"></div>
<div className="absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 border-4 border-t-teal-500 border-solid rounded-full animate-spin"></div>
</div>
</div>
);
}
if (errorSkills) {
return (
<div className={`min-h-screen flex justify-center items-center ${
  currentTheme === 'dark' ? 'bg-slate-900' : 'bg-white'
} transition-colors duration-300`}>
<div className={`rounded-lg p-4 sm:p-6 max-w-lg w-full ${
  currentTheme === 'dark'
    ? 'bg-slate-800 border-l-4 border-teal-500'
    : 'bg-white border-l-4 border-teal-500 shadow-lg'
}`}>

<h2 className={`text-lg sm:text-xl font-semibold mb-2 ${
  currentTheme === 'dark' ? 'text-teal-400' : 'text-teal-600'
}`}>

Error Loading Skills
</h2>
<p className={`${currentTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
{errorSkills}
</p>
<button
onClick={() => window.location.reload()}
className={`mt-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md ${
  currentTheme === 'dark'
    ? 'bg-teal-500/20 text-teal-400 hover:bg-teal-500/30'
    : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
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
  className={`relative transition-all duration-500 overflow-x-hidden w-full ${
    currentTheme === 'dark' ? 'bg-slate-900' : 'bg-white'
  }`}
  >

  <ToastContainer position="top-right" autoClose={3000} theme={currentTheme} className="z-50" />
  
  {/* Background container - constrained to content */}
  <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ maxHeight: '100%' }}>
    <div
      ref={gradientRef}
      data-rotation="0"
      className={`absolute inset-0 w-full h-full ${
        currentTheme === 'dark' ? 'opacity-40' : 'opacity-20'
      }`}
    />
    <div
      className={`absolute inset-0 w-full h-full ${
        currentTheme === 'dark'
          ? 'bg-[radial-gradient(ellipse_at_30%_20%,rgba(20,184,166,0.2),transparent_60%),radial-gradient(ellipse_at_80%_80%,rgba(6,182,212,0.25),transparent_60%)]'
          : 'bg-[radial-gradient(ellipse_at_30%_20%,rgba(20,184,166,0.1),transparent_60%),radial-gradient(ellipse_at_80%_80%,rgba(6,182,212,0.15),transparent_60%)]'
      }`}
    />
    <div
      className={`absolute -top-20 -right-20 w-64 h-64 bg-teal-500 rounded-full filter blur-3xl ${
        currentTheme === 'dark' ? 'opacity-10' : 'opacity-5'
      } animate-pulse`}
    ></div>
    <div
      className={`absolute -bottom-16 -left-16 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl ${
        currentTheme === 'dark' ? 'opacity-10' : 'opacity-5'
      } animate-pulse-slow`}
    ></div>
  </div>

<Particles isInView={isVisible['hero'] || isVisible['skills'] || isVisible['projects']} />
  <section id="hero" className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-12 sm:pb-16 md:pb-20 px-3 sm:px-4 md:px-6 lg:px-8">
    <div className="max-w-7xl mt-10 mx-auto">
      <div className="text-center mb-8 sm:mb-12 md:mb-16">
        <div className="relative inline-block mb-4 sm:mb-6 md:mb-8">
          {/* Outer glow rings */}
          <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-teal-500/20 via-cyan-500/20 to-purple-500/20 blur-2xl animate-pulse"></div>
          
          {/* Rotating border rings */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-purple-400 opacity-75 blur-md animate-spin" style={{animationDuration: '3s'}}></div>
          
          {/* Main profile container */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mx-auto">
            {/* Hexagonal border effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-400 via-cyan-400 to-purple-500 p-1 shadow-2xl shadow-cyan-500/50">
              {/* Inner container with sophisticated border */}
              <div className="relative w-full h-full rounded-full bg-slate-900 dark:bg-slate-900 p-1.5">
                {/* Gradient ring inside */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-teal-500/30 via-transparent to-purple-500/30"></div>
                
                {/* Image container */}
                <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-white/10">
                  <img
                    src={profileImg}
                    alt="Developer profile"
                    className="w-full h-full object-cover rounded-full transform transition-transform duration-500 hover:scale-110"
                  />
                  
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-500/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
            
            {/* Status indicator dot - Available/Online */}
            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 md:bottom-4 md:right-4">
              <div className="relative">
                <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-3 border-slate-900 shadow-lg"></div>
                <div className="absolute inset-0 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-green-400 rounded-full animate-ping opacity-75"></div>
              </div>
            </div>
            
            {/* Floating particles */}
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-cyan-400 rounded-full blur-sm animate-bounce" style={{animationDelay: '0s', animationDuration: '2s'}}></div>
            <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-teal-400 rounded-full blur-sm animate-bounce" style={{animationDelay: '0.5s', animationDuration: '2.5s'}}></div>
            <div className="absolute top-1/4 -left-4 w-2 h-2 bg-purple-400 rounded-full blur-sm animate-bounce" style={{animationDelay: '1s', animationDuration: '3s'}}></div>
          </div>
        </div>

        <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold ${currentTheme === 'dark' ? 'text-white' : 'text-slate-800'} mb-3 sm:mb-4 md:mb-6 px-2`}>
          Hi, I'm <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Syed Azadar Hussain</span>
        </h1>
        <p className={`text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl ${currentTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'} mb-4 sm:mb-6 md:mb-8 max-w-4xl mx-auto leading-relaxed px-4`}>
          Full Stack Developer passionate about creating amazing web experiences with modern technologies
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center mb-8 sm:mb-12 md:mb-16 px-4">
          <a
            href="#contact"
            className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-base sm:text-lg font-semibold rounded-xl sm:rounded-2xl hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform-gpu w-full sm:w-auto text-center max-w-xs"
          >
            Let's Connect 🚀
          </a>
          <a
            href="#projects"
            className={`px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform-gpu w-full sm:w-auto text-center max-w-xs ${currentTheme === 'dark' 
              ? 'bg-gradient-to-r from-slate-800 to-slate-700 text-slate-300 hover:from-slate-700 hover:to-slate-600 border-2 border-slate-600' 
              : 'bg-gradient-to-r from-white to-gray-50 text-slate-700 hover:from-gray-50 hover:to-white border-2 border-slate-200'}`}
          >
            View My Work 💼
          </a>
        </div>
      </div>
      <LiveCodingDemo currentTheme={currentTheme} githubStats={githubStats} />
    </div>
  </section>

  <section id="skills" className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8 sm:mb-12 md:mb-16 px-2">
        <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${currentTheme === 'dark' ? 'text-white' : 'text-slate-800'} mb-3 sm:mb-4 md:mb-6`}>
          Tech <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Stack</span>
        </h2>
        <p className={`text-base sm:text-lg md:text-xl ${currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'} max-w-3xl mx-auto`}>
          Technologies I work with to bring ideas to life
        </p>
      </div>
      <EnhancedTechStack currentTheme={currentTheme} skills={skills} />
    </div>
  </section>

  <section id="projects" className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8 sm:mb-12 md:mb-16 px-2">
        <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${currentTheme === 'dark' ? 'text-white' : 'text-slate-800'} mb-3 sm:mb-4 md:mb-6`}>
          Featured <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
        </h2>
        <p className={`text-base sm:text-lg md:text-xl ${currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'} max-w-3xl mx-auto`}>
          A showcase of my recent work and creative solutions
        </p>
      </div>
      <FeaturedProjects currentTheme={currentTheme} projects={projects} />
    </div>
  </section>

  <section id="contact" className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8 sm:mb-12 md:mb-16 px-2">
        <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${currentTheme === 'dark' ? 'text-white' : 'text-slate-800'} mb-3 sm:mb-4 md:mb-6`}>
          Let's <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Connect</span>
        </h2>
        <p className={`text-base sm:text-lg md:text-xl ${currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'} max-w-3xl mx-auto`}>
          Ready to work together? Get in touch and let's create something amazing!
        </p>
      </div>
      <ContactInfo currentTheme={currentTheme} githubStats={githubStats} />
    </div>
  </section>
</div>
);
}
export default Portfolio;