// src/services/api.ts
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // If using cookies
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
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
  response => {
    console.log('API Success:', response.config.url);
    return response;
  },
  error => {
    console.error('API Error:', {
      url: error.config.url,
      status: error.response?.status,
      error: error.response?.data
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login?session_expired=1';
    }
    return Promise.reject(error);
  }
);

export default api;
