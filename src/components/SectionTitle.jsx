import { useEffect } from 'react';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SectionTitle = ({ title, subtitle, align = 'left' }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const subtitleVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2
      }
    }
  };

  const lineVariants = {
    hidden: { 
      scaleX: 0,
      originX: align === 'left' ? 0 : 0.5
    },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.4
      }
    }
  };

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto'
  };

  return (
    <div 
      ref={ref} 
      className={`w-full mb-16 ${alignmentClasses[align]}`}
    >
      <motion.h2 
        variants={titleVariants}
        initial="hidden"
        animate={controls}
        className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100"
      >
        {title}
      </motion.h2>
      
      <motion.div
        variants={lineVariants}
        initial="hidden"
        animate={controls}
        className={`h-1 bg-indigo-600 w-16 mt-3 mb-6 ${align === 'center' ? 'mx-auto' : ''}`}
      />
      
      {subtitle && (
        <motion.p
          variants={subtitleVariants}
          initial="hidden"
          animate={controls}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionTitle;