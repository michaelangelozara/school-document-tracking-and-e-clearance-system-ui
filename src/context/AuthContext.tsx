import { createContext, ReactNode, useContext, useState } from "react";
import { IUserSummaryResponse } from "../types/user/User";
import { AuthResponse } from "../types/auth/Login";
import { getAuthResponse, setAuthResponse } from "../util/LocalStorageUtil";
import { logoutApi } from "../service/UserService";

interface AuthContextType {
  user: IUserSummaryResponse | null;
  token: string | null;
  authSetter: (data: AuthResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const storedInfo = getAuthResponse();

  const [user, setUser] = useState<IUserSummaryResponse | null>(
    storedInfo?.user || null
  );
  const [token, setToken] = useState<string | null>(storedInfo?.token || null);

  const authSetter = (data: AuthResponse) => {
    setUser(data.user);
    setToken(data.token);
    setAuthResponse(data);
  };

  const logout = async () => {
    try {
      await logoutApi();
      setToken(null);
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
    } finally {
    }
  };

  const contextValue: AuthContextType = {
    user: user,
    token: token,
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
