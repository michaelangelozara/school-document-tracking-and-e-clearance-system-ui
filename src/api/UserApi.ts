import axiosConfig from "../api/AxiosConfig";
import { User } from "../types/user/User";

export type FindUsersProps = {
  page: number;
  size: number;
};
export const findUsersApi = async (
  pagination: FindUsersProps
): Promise<User[]> => {
  const response = await axiosConfig.get(
    `/users?page=${pagination.page}&size=${pagination.size}`
  );
  return response.data as User[];
};

export const findMeApi = async (): Promise<User> => {
  const response = await axiosConfig.get("/users/me");
  return response.data as User;
};
