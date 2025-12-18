import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

 useEffect(() => {
  // Instant scroll - no delay, no smooth behavior that fights momentum
  window.scrollTo(0, 0);
}, [pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;