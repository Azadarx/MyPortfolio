// src/services/api.js - COMPLETE FIX WITH EXPORTS
import axios from "axios";

// ✅ Backend URL configuration - ALWAYS use /api suffix
const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://my-portfolio-backend-69gv.onrender.com/api';

// ✅ Export base URL for image/file URLs (without /api)
export const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL 
  ? import.meta.env.VITE_BACKEND_URL.replace('/api', '')
  : 'http://localhost:5000';

console.log('🔧 API Configuration:', {
  baseURL: BASE_URL,
  backendBaseURL: BACKEND_BASE_URL,
  env: import.meta.env.MODE,
  rawEnvVar: import.meta.env.VITE_BACKEND_URL
});

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 60000,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log(`📤 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(`❌ API Error [${error.response.status}]:`, error.response.data);
      
      // Handle authentication errors
      if (error.response.status === 401) {
        localStorage.removeItem("jwtToken");
        if (window.location.pathname !== '/admin-login') {
          console.log('🔒 Unauthorized - redirecting to login');
          window.location.href = "/admin-login";
        }
      }
      
      return Promise.reject(error.response.data);
    } else if (error.request) {
      console.error('❌ No response from server:', error.message);
      
      return Promise.reject({ 
        message: "Cannot connect to server. Please check your internet connection or try again later.",
        error: "NETWORK_ERROR"
      });
    } else {
      console.error('❌ Request setup error:', error.message);
      return Promise.reject({ 
        message: error.message || "An unexpected error occurred",
        error: "REQUEST_ERROR"
      });
    }
  }
);

export default api;