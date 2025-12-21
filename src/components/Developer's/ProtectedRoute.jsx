import { Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

/**
 * Protected Route Component
 * 
 * Checks for a valid JWT token in localStorage before allowing access to protected routes.
 * Redirects to /admin-login if authentication fails.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The component to render if authenticated
 * @param {boolean} props.requireAdmin - Whether this route requires admin privileges (optional)
 * @returns {React.ReactNode} The protected component or redirect
 */
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem('jwtToken');
        
        // If no token exists, user is not authenticated
        if (!token) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        // Check if token is expired
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = tokenData.exp * 1000; // Convert to milliseconds
        
        if (Date.now() >= expirationTime) {
          // Token is expired, remove it
          localStorage.removeItem('jwtToken');
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        // If requireAdmin is true, check if user has admin role
        if (requireAdmin) {
          const userRole = tokenData.role;
          if (userRole !== 'admin') {
            setIsAuthenticated(false);
            setIsLoading(false);
            return;
          }
        }

        // User is authenticated
        setIsAuthenticated(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Authentication error:', error);
        // If any error occurs during validation, consider user not authenticated
        localStorage.removeItem('jwtToken');
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [requireAdmin]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-700">Verifying authentication...</span>
      </div>
    );
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/admin-login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;