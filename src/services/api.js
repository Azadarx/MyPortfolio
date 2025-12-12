import axios from "axios";

// ==================== ENVIRONMENT CONFIGURATION ====================
// Uncomment the environment you want to use

// PRODUCTION - Use this for deployed version
const BASE_URL = "https://my-portfolio-backend-69gv.onrender.com/api";

// DEVELOPMENT - Use this for local development
// const BASE_URL = "http://localhost:5000/api";

// ===================================================================

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      if (error.response.status === 401) {
        localStorage.removeItem("jwtToken");
        window.location.href = "/admin-login";
      }
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Request made but no response
      return Promise.reject({ message: "No response from server" });
    } else {
      // Error in request setup
      return Promise.reject({ message: "Error setting up request" });
    }
  }
);

export default api;