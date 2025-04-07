import { AuthResponse } from "../types/auth/Login";

export const getAuthResponse = (): AuthResponse | null => {
  return localStorage.getItem("user")
    ? (JSON.parse(localStorage.getItem("user") || "{}") as AuthResponse)
    : null;
};

export const setAuthResponse = (data: AuthResponse) => {
  localStorage.setItem("user", JSON.stringify(data));
};
