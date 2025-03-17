import axiosConfig from "../api/AxiosConfig";
import { Login, LoginResponse } from "../interfaces/ILogin";

export const loginApi = async (credential: Login): Promise<LoginResponse> => {
  const response = await axiosConfig.post("/auth/login", credential);
  return response.data as LoginResponse;
};

export const logoutApi = async () => {
  // remove the user and token from context
  return await axiosConfig.post("/auth/logout");
};
