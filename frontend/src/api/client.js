import axios from "axios";

const apiBaseUrlRaw = import.meta.env.VITE_API_URL;
const apiBaseUrl = apiBaseUrlRaw?.replace(/\/+$/, "");
const baseURL = apiBaseUrl
  ? apiBaseUrl.endsWith("/api")
    ? apiBaseUrl
    : `${apiBaseUrl}/api`
  : "http://localhost:5000/api";

const api = axios.create({
  baseURL,
});

// Attach JWT token from localStorage on every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;