import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/experiences");
        
        if (!response.ok) {
          throw new Error(`Failed to fetch experiences: ${response.status}`);
        }
        
        const data = await response.json();
        setExperiences(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen dark:bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
          <p className="mt-4 text-gray-700 dark:text-gray-300">Loading experience timeline...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen dark:bg-gray-900">
        <div className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-200 p-4 rounded shadow-md">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Professional Experience
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            My journey in the industry so far
          </p>
        </div>

        <motion.div 
          className="relative"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Vertical line */}
          <div className="absolute left-0 sm:left-1/2 transform -translate-x-px sm:-translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>

          {experiences.map((experience, index) => (
            <motion.div 
              key={index}
              className={`relative mb-16 ${index % 2 === 0 ? 'sm:ml-auto sm:mr-auto sm:pl-8 sm:pr-0' : 'sm:ml-auto sm:mr-auto sm:pl-0 sm:pr-8'} sm:w-1/2`}
              variants={itemVariants}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 sm:left-0 sm:right-auto transform -translate-x-1/2 -translate-y-4 sm:translate-y-0 sm:top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-white dark:border-gray-900 shadow"></div>

              {/* Content card */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ml-6 sm:ml-0 relative">
                {/* Triangle pointer */}
                <div className={`absolute top-0 ${index % 2 === 0 ? 'left-0 -ml-2' : 'right-0 -mr-2'} hidden sm:block w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent ${index % 2 === 0 ? 'border-l-0 border-r-8 border-r-white dark:border-r-gray-800' : 'border-r-0 border-l-8 border-l-white dark:border-l-gray-800'}`}></div>

                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mb-4">
                  {experience.startDate} - {experience.endDate || "Present"}
                </span>
                
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{experience.title}</h3>
                <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mt-1">{experience.company}</h4>
                <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {experience.location}
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">{experience.description}</p>
                
                {experience.skills && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {experience.skills.map((skill, i) => (
                      <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;