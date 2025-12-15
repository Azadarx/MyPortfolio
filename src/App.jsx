import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Context imports
import { ThemeProvider } from "./context/ThemeContext";

// Component imports
import AnimatedCursor from "./components/AnimatedCursor";

// Page imports
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Experience from "./pages/Experience";
import Education from "./pages/Education";
import Contact from "./pages/Contact";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Page layout wrapper
const PageLayout = ({ children }) => {
  return (
    <motion.div
      className="flex-grow w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

// 404 Not Found Page
const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <p className="text-2xl text-gray-600 dark:text-gray-400 mb-8">Page Not Found</p>
        <p className="text-gray-500 dark:text-gray-500 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

// Animated routes component
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<PageLayout><Home /></PageLayout>} />
        <Route path="/about" element={<PageLayout><About /></PageLayout>} />
        <Route path="/projects" element={<PageLayout><Projects /></PageLayout>} />
        <Route path="/skills" element={<PageLayout><Skills /></PageLayout>} />
        <Route path="/experience" element={<PageLayout><Experience /></PageLayout>} />
        <Route path="/education" element={<PageLayout><Education /></PageLayout>} />
        <Route path="/contact" element={<PageLayout><Contact /></PageLayout>} />
        
        {/* Admin Routes */}
        <Route path="/admin-login" element={<PageLayout><AdminLogin /></PageLayout>} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requireAdmin={true}>
              <PageLayout><AdminDashboard /></PageLayout>
            </ProtectedRoute>
          }
        />
        
        {/* 404 - Must be last */}
        <Route path="*" element={<PageLayout><NotFound /></PageLayout>} />
      </Routes>
    </AnimatePresence>
  );
};

// Main app content
const AppContent = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <AnimatedCursor 
          innerSize={8}
          outerSize={40}
          outerScale={1.5}
          trailingSpeed={0.15}
          hideOnSmallScreens={true}
        />
        
        <Navbar />
        <main className="flex-grow w-full">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

function App() {
      return <AppContent />;

}

export default App;