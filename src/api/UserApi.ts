import axiosConfig from "../api/AxiosConfig";
import { IPageableRequest } from "../types/IPageable";
import { User } from "../types/user/User";

export type FindUsersProps = {
  page: number;
  size: number;
};
export const findAllUsersApi = async (
  pagination: FindUsersProps
): Promise<IPageableRequest<User[]>> => {
  const response = await axiosConfig.get(
    `/users?page=${pagination.page}&size=${pagination.size}`
  );
  return response.data as IPageableRequest<User[]>;
};

export const findMeApi = async (): Promise<User> => {
  const response = await axiosConfig.get("/users/me");
  return response.data as User;
};
