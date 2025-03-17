// import { createContext, useContext, useEffect, useState } from "react";
// // import { AuthService, AuthResponse } from "../services/authService";
// import { useNavigate } from "react-router-dom";

// interface AuthContextType {
//   user: AuthResponse["user"] | null;
//   token: string | null;
//   setAuth: (data: AuthResponse) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<AuthResponse["user"] | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const navigate = useNavigate();

//   // Function to set token & user at the same time
//   const setAuth = (data: AuthResponse) => {
//     setToken(data.token);
//     setUser(data.user);
//   };

//   // Auto-refresh when the user is null
//   useEffect(() => {
//     // if (!user) {
//     //   AuthService.refreshToken()
//     //     .then((data) => {
//     //       if (data) {
//     //         setAuth(data);
//     //       } else {
//     //         navigate("/login"); // Redirect to login if refresh fails
//     //       }
//     //     })
//     //     .catch(() => navigate("/login"));
//     // }
//   }, [user, navigate]);

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, setAuth, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
