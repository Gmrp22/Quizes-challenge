import axios from "axios";

const api = axios.create({
  baseURL: "/api", // Adjust if your backend runs elsewhere
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include JWT from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;