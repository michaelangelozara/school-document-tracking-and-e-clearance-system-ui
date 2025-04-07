import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
//   import { getAccessToken, getRefreshToken, setTokens, clearTokens } from './tokenService'; // Helper functions for token storage
import { AuthResponse } from "../types/auth/Login";
import { useAuth } from "../context/AuthContext";
import { getAuthResponse, setAuthResponse } from "../util/LocalStorageUtil";

// --- Configuration ---
export const API_BASE_URL = "http://localhost:8080/api/v1"; // Use environment variables
export const REFRESH_TOKEN_URL = "/auth/request/refresh-token"; // Your refresh token endpoint

// --- State for Refresh Logic ---
let isRefreshing = false;
let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

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

// --- Request Interceptor ---
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const storedInfo = getAuthResponse();
    if (storedInfo?.token) {
      // Ensure headers object exists
      config.headers = config.headers || {};
      config.headers["Authorization"] = `${storedInfo?.token}`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    // Handle request configuration errors
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// --- Response Interceptor ---
apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // You can transform data here if needed
    return response;
  },
  async (error: AxiosError): Promise<AxiosResponse | AxiosError> => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    }; // Add custom _retry flag

    if (!error.response) {
      console.error("Network Error:", error.message);
      // You could potentially check navigator.onLine here for a more specific message,
      // but !error.response is the more direct indicator from Axios's perspective.
      // if (!navigator.onLine) {
      //   // Show specific "No Internet Connection" message to the user
      // } else {
      //   // Show a generic "Network Error" or "Server Unreachable" message
      // }

      // Optionally: Implement retry logic or notify the user globally
      // For now, just reject the promise to propagate the error
      return Promise.reject(
        new Error(
          `Network Error: ${error.message}. Please check your connection.`
        )
      );
      // Note: Returning a custom Error might be better for downstream handling
      // than rejecting with the original AxiosError in this specific case.
    }

    // avoid to refresh token when logging in
    if (originalRequest.url === "/auth/authenticate") {
      return Promise.reject(error);
    }

    // Check if it's a 401 error and not a retry request already
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      // Avoid recursive refresh calls if the refresh endpoint itself returns 401
      if (originalRequest.url === REFRESH_TOKEN_URL) {
        console.error("Refresh token attempt failed with 401. Logging out.");
        // clearTokens();
        // Trigger logout (e.g., redirect, update auth context)
        // window.location.href = '/login'; // Simple redirect example
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // If refresh is already in progress, queue the original request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            // When refresh is done, retry the request with the new token
            if (originalRequest.headers) {
              originalRequest.headers["Authorization"] = `${token}`;
            }
            return apiClient(originalRequest); // Retry the original request
          })
          .catch((err) => {
            return Promise.reject(err); // Propagate the error if refresh failed
          });
      }

      // Start the refresh process
      originalRequest._retry = true; // Mark as retried
      isRefreshing = true;

      try {
        console.log("Attempting to refresh token...");
        // Use a separate Axios instance or fetch for refresh to avoid interceptor loop
        // Or ensure the originalRequest.url check above is robust
        const refreshResponse = await axios.post<AuthResponse>(
          `${API_BASE_URL}${REFRESH_TOKEN_URL}`
        );

        console.log("Token refreshed successfully.");

        // Store new user and token
        setAuthResponse(refreshResponse.data);

        // Update the header of the original failed request
        if (originalRequest.headers) {
          originalRequest.headers[
            "Authorization"
          ] = `${refreshResponse.data.token}`;
        }

        // processQueue(null, accessToken); // Process queued requests successfully

        isRefreshing = false;
        return apiClient(originalRequest); // Retry the original request with the new token
      } catch (refreshError) {
        console.error("Unable to refresh token:", refreshError);
        isRefreshing = false;
        processQueue(refreshError as AxiosError, null); // Reject queued requests
        // clearTokens();
        // Trigger logout (important!)
        // window.location.href = '/login';
        return Promise.reject(refreshError); // Reject the original request with the refresh error
      }
    }

    // For errors other than 401, or if it's a retry/refresh failure
    console.error("Axios error:", error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
