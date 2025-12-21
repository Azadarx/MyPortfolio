import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const AnimatedCursor = ({ 
  innerSize = 8,
  outerSize = 40, 
  outerScaleProp = 1.5,
  hideOnSmallScreens = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const { currentTheme } = useTheme();
  
  // Use motion values for better performance
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animations with optimized settings
  const springConfig = { damping: 30, stiffness: 400, restDelta: 0.001 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  
  // Slower following outer cursor
  const outerSpringConfig = { damping: 25, stiffness: 200, restDelta: 0.001 };
  const outerX = useSpring(mouseX, outerSpringConfig);
  const outerY = useSpring(mouseY, outerSpringConfig);
  
  // Theme-based colors with enhanced gradients
  const getThemeColors = () => {
    if (currentTheme === 'dark') {
      return {
        innerColor: '#00d4ff',
        innerGlow: 'rgba(0, 212, 255, 0.8)',
        outerColor: 'rgba(0, 212, 255, 0.3)',
        hoverInnerColor: '#ff006e',
        hoverInnerGlow: 'rgba(255, 0, 110, 0.9)',
        hoverOuterColor: 'rgba(255, 0, 110, 0.4)',
        trailColor: 'rgba(0, 212, 255, 0.15)',
        hoverTrailColor: 'rgba(255, 0, 110, 0.2)',
      };
    } else {
      return {
        innerColor: '#6366f1',
        innerGlow: 'rgba(99, 102, 241, 0.7)',
        outerColor: 'rgba(99, 102, 241, 0.25)',
        hoverInnerColor: '#ec4899',
        hoverInnerGlow: 'rgba(236, 72, 153, 0.8)',
        hoverOuterColor: 'rgba(236, 72, 153, 0.3)',
        trailColor: 'rgba(99, 102, 241, 0.1)',
        hoverTrailColor: 'rgba(236, 72, 153, 0.15)',
      };
    }
  };

  const colors = getThemeColors();
  
  // Optimized mouse move handler using RAF
  const rafId = useRef();
  const handleMouseMove = useCallback((e) => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    
    rafId.current = requestAnimationFrame(() => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      if (!isVisible) {
        setIsVisible(true);
      }
    });
  }, [mouseX, mouseY, isVisible]);

  // Optimized hover detection
  const handleMouseOver = useCallback((e) => {
    const target = e.target;
    const isInteractive = target.closest(
      'button, a, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"]), .cursor-pointer, [data-cursor="pointer"]'
    );
    setIsHovering(!!isInteractive);
  }, []);

  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);

  // Setup event listeners
  useEffect(() => {
    const shouldShow = !hideOnSmallScreens || window.innerWidth > 768;
    
    if (shouldShow) {
      document.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('mouseover', handleMouseOver, { passive: true });
      document.addEventListener('mousedown', handleMouseDown, { passive: true });
      document.addEventListener('mouseup', handleMouseUp, { passive: true });
      
      // Hide default cursor
      document.body.style.cursor = 'none';
      setIsVisible(true);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleMouseMove, handleMouseOver, handleMouseDown, handleMouseUp, hideOnSmallScreens]);
  
  // Handle responsive visibility
  useEffect(() => {
    if (hideOnSmallScreens) {
      const handleResize = () => {
        const shouldShow = window.innerWidth > 768;
        setIsVisible(shouldShow);
        document.body.style.cursor = shouldShow ? 'none' : 'auto';
      };
      
      window.addEventListener('resize', handleResize, { passive: true });
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hideOnSmallScreens]);
  
  if (!isVisible) return null;
  
  const innerScale = isClicking ? 0.5 : isHovering ? 0.7 : 1;
  const outerScale = isClicking ? 1.4 : isHovering ? 1.8 : 1;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]" style={{ mixBlendMode: 'difference' }}>
      {/* Trail effect */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: outerX,
          top: outerY,
          width: outerSize * 1.8,
          height: outerSize * 1.8,
          background: `radial-gradient(circle, ${
            isHovering ? colors.hoverTrailColor : colors.trailColor
          } 0%, transparent 70%)`,
          transform: 'translate(-50%, -50%)',
          filter: 'blur(15px)',
        }}
        animate={{
          scale: isHovering ? 1.3 : 0.8,
          opacity: isHovering ? 0.9 : 0.5,
        }}
        transition={{
          scale: { type: 'spring', damping: 20, stiffness: 300 },
          opacity: { duration: 0.2 }
        }}
      />
      
      {/* Outer cursor ring */}
      <motion.div
        className="absolute rounded-full border-2"
        style={{
          left: outerX,
          top: outerY,
          width: outerSize,
          height: outerSize,
          borderColor: isHovering ? colors.hoverOuterColor : colors.outerColor,
          transform: 'translate(-50%, -50%)',
          background: isHovering 
            ? `radial-gradient(circle, ${colors.hoverOuterColor.replace('0.4', '0.1')} 0%, transparent 60%)`
            : 'transparent'
        }}
        animate={{
          scale: outerScale,
          rotate: isHovering ? 180 : 0,
          borderWidth: isClicking ? 1 : 2,
        }}
        transition={{
          scale: { type: 'spring', damping: 25, stiffness: 400 },
          rotate: { type: 'spring', damping: 20, stiffness: 200 },
          borderWidth: { type: 'spring', damping: 30, stiffness: 500 }
        }}
      />
      
      {/* Inner cursor dot */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: smoothX,
          top: smoothY,
          width: innerSize,
          height: innerSize,
          backgroundColor: isHovering ? colors.hoverInnerColor : colors.innerColor,
          transform: 'translate(-50%, -50%)',
          boxShadow: `0 0 ${innerSize * 2}px ${
            isHovering ? colors.hoverInnerGlow : colors.innerGlow
          }`,
        }}
        animate={{
          scale: innerScale,
        }}
        transition={{
          scale: { type: 'spring', damping: 25, stiffness: 500 }
        }}
      />
      
      {/* Pulse effect on click */}
      {isClicking && (
        <motion.div
          className="absolute rounded-full border-2"
          style={{
            left: smoothX,
            top: smoothY,
            width: innerSize,
            height: innerSize,
            borderColor: isHovering ? colors.hoverInnerColor : colors.innerColor,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      )}
    </div>
  );
};

export default AnimatedCursor;