import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Context imports
import { ThemeProvider } from "./context/ThemeContext";

// Component imports
import AnimatedCursor from "./components/Developer's/AnimatedCursor";
import DeveloperNavbar from "./components/Developer's/Navbar";
import DeveloperFooter from "./components/Developer's/Footer";
import MRNavbar from "./components/MR/Navbar";
import MRFooter from "./components/MR/Footer";
import ScrollToTop from "./components/Developer's/ScrollToTop";
import ProtectedRoute from "./components/Developer's/ProtectedRoute";

// Shared Pages
import ProfileSelector from "./pages/ProfileSelector";

// Developer Portfolio Pages
import DevHome from "./pages/Developer's/Home";
import DevAbout from "./pages/Developer's/About";
import DevProjects from "./pages/Developer's/Projects";
import DevSkills from "./pages/Developer's/Skills";
import DevExperience from "./pages/Developer's/Experience";
import DevEducation from "./pages/Developer's/Education";
import DevContact from "./pages/Developer's/Contact";
import DevAdminDashboard from "./pages/Developer's/AdminDashboard";

// MR Portfolio Pages
import MRHome from "./pages/MR/Home";
import MRAbout from "./pages/MR/About"; 
import MRExperience from "./pages/MR/Experience";
import MRCoverage from "./pages/MR/Coverage";
import MRContact from "./pages/MR/Contact";

// Admin
import AdminLogin from "./components/Developer's/AdminLogin";
import Products from "./pages/MR/Products";

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
        <h1 className="text-8xl font-bold text-gray-900 dark:text-white mb-4">
          404
        </h1>
        <p className="text-2xl text-gray-600 dark:text-gray-400 mb-8">
          Page Not Found
        </p>
        <p className="text-gray-500 dark:text-gray-500 mb-8">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <p>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
          >
            Go Back Home
          </a>
        </p>
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
        {/* Landing/Profile Selector */}
        <Route
          path="/"
          element={
            <PageLayout>
              <ProfileSelector />
            </PageLayout>
          }
        />

        {/* Developer Portfolio Routes */}
        <Route
          path="/developer"
          element={
            <PageLayout>
              <DevHome />
            </PageLayout>
          }
        />
        <Route
          path="/developer/about"
          element={
            <PageLayout>
              <DevAbout />
            </PageLayout>
          }
        />
        <Route
          path="/developer/projects"
          element={
            <PageLayout>
              <DevProjects />
            </PageLayout>
          }
        />
        <Route
          path="/developer/skills"
          element={
            <PageLayout>
              <DevSkills />
            </PageLayout>
          }
        />
        <Route
          path="/developer/experience"
          element={
            <PageLayout>
              <DevExperience />
            </PageLayout>
          }
        />
        <Route
          path="/developer/education"
          element={
            <PageLayout>
              <DevEducation />
            </PageLayout>
          }
        />
        <Route
          path="/developer/contact"
          element={
            <PageLayout>
              <DevContact />
            </PageLayout>
          }
        />

        {/* MR Portfolio Routes */}
        <Route
          path="/medical-rep"
          element={
            <PageLayout>
              <MRHome />
            </PageLayout>
          }
        />
        <Route
          path="/medical-rep/experience"
          element={
            <PageLayout>
              <MRExperience />
            </PageLayout>
          }
        />
        <Route
          path="/medical-rep/about"
          element={
            <PageLayout>
              <MRAbout />
            </PageLayout>
          }
        />
        <Route
          path="/medical-rep/products"
          element={
            <PageLayout>
              <Products />
            </PageLayout>
          }
        />
        <Route
          path="/medical-rep/coverage"
          element={
            <PageLayout>
              <MRCoverage />
            </PageLayout>
          }
        />
        <Route
          path="/medical-rep/contact"
          element={
            <PageLayout>
              <MRContact />
            </PageLayout>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin-login"
          element={
            <PageLayout>
              <AdminLogin />
            </PageLayout>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requireAdmin={true}>
              <PageLayout>
                <DevAdminDashboard />
              </PageLayout>
            </ProtectedRoute>
          }
        />

        {/* Legacy redirects for backward compatibility */}
        <Route path="/home" element={<Navigate to="/developer" replace />} />
        <Route
          path="/about"
          element={<Navigate to="/developer/about" replace />}
        />
        <Route
          path="/projects"
          element={<Navigate to="/developer/projects" replace />}
        />
        <Route
          path="/skills"
          element={<Navigate to="/developer/skills" replace />}
        />
        <Route
          path="/experience"
          element={<Navigate to="/developer/experience" replace />}
        />
        <Route
          path="/education"
          element={<Navigate to="/developer/education" replace />}
        />
        <Route
          path="/contact"
          element={<Navigate to="/developer/contact" replace />}
        />

        {/* 404 - Must be last */}
        <Route
          path="*"
          element={
            <PageLayout>
              <NotFound />
            </PageLayout>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

// Main app content
const AppContent = () => {
  const location = useLocation();
  const isProfileSelector = location.pathname === "/";
  const isDeveloperRoute = location.pathname.startsWith("/developer");
  const isMRRoute = location.pathname.startsWith("/medical-rep");

  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <AnimatedCursor
          innerSize={8}
          outerSize={40}
          outerScale={1.5}
          trailingSpeed={0.15}
          hideOnSmallScreens={true}
        />

        {/* Conditional Navbar Rendering */}
        {!isProfileSelector && (
          <>
            {isDeveloperRoute && <DeveloperNavbar />}
            {isMRRoute && <MRNavbar />}
          </>
        )}

        <main className="flex-grow w-full">
          <AnimatedRoutes />
        </main>

        {/* Conditional Footer Rendering */}
        {!isProfileSelector && (
          <>
            {isDeveloperRoute && <DeveloperFooter />}
            {isMRRoute && <MRFooter />}
          </>
        )}
      </div>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
