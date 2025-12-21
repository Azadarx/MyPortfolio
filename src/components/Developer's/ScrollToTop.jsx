import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Delay scroll to allow page transition to start
    const timeoutId = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;