// api.js - Fixed version
import axios from "axios";

// Read backend URL from .env with fallback
const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://my-portfolio-backend-69gv.onrender.com/api';

console.log('API Base URL:', BASE_URL);

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 30000, // 30 second timeout
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message);
    
    if (error.response) {
      // Server responded with error status
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
      
      if (error.response.status === 401) {
        localStorage.removeItem("jwtToken");
        if (window.location.pathname !== '/admin-login') {
          window.location.href = "/admin-login";
        }
      }
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Request made but no response received
      console.error('No response received:', error.request);
      return Promise.reject({ 
        message: "Server unavailable. Please check your connection.",
        error: "NETWORK_ERROR"
      });
    } else {
      // Something else happened
      console.error('Request setup error:', error.message);
      return Promise.reject({ 
        message: error.message || "An unexpected error occurred",
        error: "REQUEST_ERROR"
      });
    }
  }
);

export default api;