import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import apiClient, { REFRESH_TOKEN_URL } from "../api/apiClient";
import { IUserSummaryResponse } from "../types/user/User";
import { AuthResponse } from "../types/auth/Login";
import { AxiosInstance, AxiosRequestConfig } from "axios";
import { logoutApi } from "../service/AuthService";
import { redirectLogin } from "../util/HrefUtils";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/Store";
import { open } from "../store/slice/MessageSlice";

interface AuthContextType {
  user: IUserSummaryResponse | null;
  token: string | null;
  isTokenChecking: boolean;
  apiClient: AxiosInstance;
  authSetter: (data: AuthResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUserSummaryResponse | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState<boolean>(true);

  const dispatch = useDispatch<AppDispatch>();

  const authSetter = (data: AuthResponse | null) => {
    if (data) {
      setToken(data.token);
      setUser(data.user);
    } else {
      setToken(null);
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
      authSetter(null);
      redirectLogin();
    } catch (error) {}
  };

  useEffect(() => {
    const fetchMe = async () => {
      try {
        setIsChecking(true);
        const response = await apiClient.get("/users/me/summary");
        const { token, user } = response.data.data as AuthResponse;
        setToken(token);
        setUser(user);
      } catch (error) {
        setToken(null);
      } finally {
        setIsChecking(false);
      }
    };

    fetchMe();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = apiClient.interceptors.request.use((config) => {
      config.headers.Authorization =
        !(config as any)._retry && token
          ? `Bearer ${token}`
          : config.headers.Authorization;
      return config;
    });

    return () => {
      apiClient.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config as AxiosRequestConfig & {
          _retry?: boolean;
        }; // Add type assertion for safety

        // Check if this is a network error (no response)
        if (!error.response) {
          dispatch(open("Network Error")); // this shows the message dialog about network issue
          // You could:
          // 1. Show a network offline notification
          // 2. Queue requests for later retry
          // 3. Reject immediately
          return Promise.reject(error);
        }

        // Check if the response exists, status is 401, AND it's NOT a request to the refresh URL already
        if (
          error.response &&
          error.response.status === 401 &&
          originalRequest.url !== REFRESH_TOKEN_URL &&
          originalRequest.url !== "/auth/authenticate" // this makes sure that when credential is in correct the refresh token won't trigger
        ) {
          // Check if this request was already retried
          if (originalRequest._retry) {
            // If already retried, it means refresh failed or the new token didn't work.
            // Avoid further retries and potentially logout.
            console.error("Refresh attempt failed or new token invalid.");

            // logout
            logout();

            return Promise.reject(error);
          }

          originalRequest._retry = true; // Mark it as retried *before* making the refresh call

          try {
            console.log("Attempting to refresh token..."); // Added for debugging
            const response = await apiClient.get(REFRESH_TOKEN_URL);
            console.log("Token refreshed successfully."); // Added for debugging

            // new access token
            const token = response.data.data as string;

            // Update the Authorization header for the original request
            if (originalRequest.headers) {
              // Ensure headers object exists
              originalRequest.headers.Authorization = `Bearer ${token}`;
            } else {
              originalRequest.headers = {
                Authorization: `Bearer ${token}`,
              };
            }

            // Retry the original request with the new token
            return apiClient(originalRequest);
          } catch (refreshError: any) {
            console.error("Failed to refresh token:", refreshError); // Log the refresh error
            // Refresh failed, clear auth state and reject

            if (window.location.pathname !== "/login") {
              logout();
            } else {
              authSetter(null);
            }

            return Promise.reject(refreshError); // Reject with the refresh error
          }
        }

        // For errors other than 401, or 401s from the refresh endpoint itself, just reject
        return Promise.reject(error);
      }
    );

    return () => {
      apiClient.interceptors.response.eject(refreshInterceptor);
    };
  }, []); // Keep the empty dependency array, the interceptor logic itself doesn't change

  const contextValue: AuthContextType = {
    user: user,
    token: token,
    isTokenChecking: isChecking,
    apiClient: apiClient,
    authSetter: authSetter,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// --- Custom Hook for easy consumption ---
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    // This error usually means you forgot to wrap your component tree with AuthProvider
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
