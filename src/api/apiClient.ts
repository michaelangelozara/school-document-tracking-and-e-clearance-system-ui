import axios, { AxiosInstance } from "axios";

// --- Configuration ---
export const BASE_URL = "http://localhost:8080"; // Use environment variables
export const API_BASE_URL = `${BASE_URL}/api/v1`; // Use environment variables
export const REFRESH_TOKEN_URL = "/auth/request/access-token"; // Your refresh token endpoint

// --- Create Axios Instance ---
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  // Consider adding withCredentials if you use HttpOnly cookies for refresh tokens
  // withCredentials: true,
});
export default apiClient;
