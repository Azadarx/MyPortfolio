import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Code2, Server, Database, Wrench, Palette, BarChart3,
  Cpu, Globe, PenTool, Github, Figma, Framer, Chrome, 
  Terminal, GitBranch, Package, HardDrive, FileCog
} from 'lucide-react';

// Tech stack data organized by category
const techStackData = {
  Frontend: [
    { name: 'React', icon: <Code2 />, level: 'Expert' },
    { name: 'Vue.js', icon: <Code2 />, level: 'Intermediate' },
    { name: 'Angular', icon: <Code2 />, level: 'Advanced' },
    { name: 'TailwindCSS', icon: <Palette />, level: 'Expert' },
    { name: 'JavaScript', icon: <Code2 />, level: 'Expert' },
    { name: 'TypeScript', icon: <Code2 />, level: 'Advanced' },
  ],
  Backend: [
    { name: 'Node.js', icon: <Server />, level: 'Expert' },
    { name: 'Express', icon: <Server />, level: 'Advanced' },
    { name: 'Python', icon: <Server />, level: 'Intermediate' },
    { name: 'Django', icon: <Server />, level: 'Intermediate' },
    { name: 'GraphQL', icon: <Server />, level: 'Advanced' },
  ],
  Database: [
    { name: 'MongoDB', icon: <Database />, level: 'Expert' },
    { name: 'PostgreSQL', icon: <Database />, level: 'Advanced' },
    { name: 'MySQL', icon: <Database />, level: 'Advanced' },
    { name: 'Redis', icon: <Database />, level: 'Intermediate' },
  ],
  DevOps: [
    { name: 'Docker', icon: <HardDrive />, level: 'Advanced' },
    { name: 'Kubernetes', icon: <Cpu />, level: 'Intermediate' },
    { name: 'AWS', icon: <Globe />, level: 'Advanced' },
    { name: 'CI/CD', icon: <GitBranch />, level: 'Advanced' },
  ],
  Tools: [
    { name: 'Git', icon: <GitBranch />, level: 'Expert' },
    { name: 'GitHub', icon: <Github />, level: 'Expert' },
    { name: 'VS Code', icon: <Wrench />, level: 'Expert' },
    { name: 'Figma', icon: <Figma />, level: 'Advanced' },
    { name: 'Webpack', icon: <Package />, level: 'Advanced' },
    { name: 'Jest', icon: <FileCog />, level: 'Advanced' },
  ],
  Analytics: [
    { name: 'Google Analytics', icon: <BarChart3 />, level: 'Advanced' },
    { name: 'Tableau', icon: <BarChart3 />, level: 'Intermediate' },
    { name: 'Mixpanel', icon: <BarChart3 />, level: 'Intermediate' },
  ],
};

// Function to get level color based on experience
const getLevelColor = (level) => {
  switch (level) {
    case 'Expert':
      return 'bg-green-500';
    case 'Advanced':
      return 'bg-blue-500';
    case 'Intermediate':
      return 'bg-yellow-500';
    case 'Beginner':
      return 'bg-gray-400';
    default:
      return 'bg-gray-400';
  }
};

// Function to check if element is in viewport for animation
const useIsInViewport = (ref) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isIntersecting;
};

// Tech stack grid item component
const TechStackItem = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow duration-300"
    >
      <div className="text-gray-700 dark:text-gray-200 mb-2">
        {item.icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{item.name}</h3>
      <div className="flex items-center mt-auto">
        <span className={`inline-block px-2 py-1 text-xs font-semibold text-white rounded-full ${getLevelColor(item.level)}`}>
          {item.level}
        </span>
      </div>
    </motion.div>
  );
};

// Category section component
const CategorySection = ({ title, items }) => {
  const ref = React.useRef(null);
  const isInViewport = useIsInViewport(ref);

  return (
    <div ref={ref} className="mb-12">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={isInViewport ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 border-b-2 border-gray-200 dark:border-gray-700 pb-2"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInViewport ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
      >
        {items.map((item, index) => (
          <TechStackItem key={`${title}-${item.name}`} item={item} index={index} />
        ))}
      </motion.div>
    </div>
  );
};

// Main component
const TechStackGrid = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
      >
        Technical Skills
      </motion.h1>
      
      {Object.entries(techStackData).map(([category, items]) => (
        <CategorySection key={category} title={category} items={items} />
      ))}
    </div>
  );
};

export default TechStackGrid;