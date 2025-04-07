import apiClient from "../api/AxiosConfig";
import { useAuth } from "../context/AuthContext";
import { LoginType, AuthResponse } from "../types/auth/Login";
import { BaseResponse } from "../types/response/Response";

export const authenticate = async (
  loginBody: LoginType
): Promise<BaseResponse<AuthResponse>> => {
  try {
    const response = await apiClient.post<BaseResponse<AuthResponse>>(
      "/auth/authenticate",
      loginBody
    );

    return response.data as BaseResponse<AuthResponse>;
  } catch (err) {
    throw err;
  }
};

export const logoutApi = async (): Promise<string> => {
  try {
    await apiClient.post("/auth/logout");
    return "Logout Successful.";
  } catch (err) {
    throw new Error("Something went wrong during logout");
  }
};

// export type FindUsersProps = {
//   page: number;
//   size: number;
// };
// export const findAllUsersApi = async (
//   pagination: FindUsersProps
// ): Promise<IPaginationRequest<User[]>> => {
//   const response = await axiosConfig.get(
//     `/users?page=${pagination.page}&size=${pagination.size}`
//   );
//   return response.data as IPaginationRequest<User[]>;
// };

// export const findMeApi = async (): Promise<User> => {
//   const response = await axiosConfig.get("/users/me");
//   return response.data as User;
// };
