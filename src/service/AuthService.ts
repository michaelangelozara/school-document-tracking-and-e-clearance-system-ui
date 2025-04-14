import apiClient from "../api/apiClient";
import { LoginType } from "../types/auth/Login";

export const authenticate = async (loginBody: LoginType) => {
  try {
    await apiClient.post("/auth/authenticate", loginBody);
  } catch (err) {
    throw err;
  }
};

export const logoutApi = async () => {
  try {
    await apiClient.post("/auth/logout");
  } catch (err) {
    throw new Error("Something went wrong during logout");
  }
};
