import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, AlertTriangle } from 'lucide-react';

const Education = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/education');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        
        const data = await response.json();
        setEducation(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching education data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-48 py-12">
        <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Loading education history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-48 py-12">
        <AlertTriangle className="h-8 w-8 text-red-500 mb-4" />
        <p className="text-red-600 dark:text-red-400 font-medium">Failed to load education data</p>
        <p className="text-gray-600 dark:text-gray-400 mt-2">{error}</p>
      </div>
    );
  }

  return (
    <section className="py-10 px-4 md:px-8 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Education</h2>
        
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {education.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No education history available.</p>
          ) : (
            education.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.degree}</h3>
                    <p className="text-lg text-gray-800 dark:text-gray-200 mt-1">{item.institution}</p>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{item.location}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 md:text-right whitespace-nowrap">
                    {item.startDate} - {item.endDate || 'Present'}
                  </p>
                </div>
                
                {item.description && (
                  <div className="mt-4 text-gray-700 dark:text-gray-300">
                    <p>{item.description}</p>
                  </div>
                )}
                
                {item.achievements && item.achievements.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Achievements</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                      {item.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;