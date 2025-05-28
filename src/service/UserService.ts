import { AxiosInstance } from "axios";
import { BaseResponse } from "../types/response/Response";
import { IUserNameAndIdOnly } from "../types/user/User";
import { PaginationResponse } from "../types/Pagination";
import apiClient from "../api/apiClient";

export const getMySignature = async (
  apiClient: AxiosInstance
): Promise<string> => {
  try {
    const response = await apiClient.get("/users/me/signature");
    const data = response.data as BaseResponse<string>;
    return data.data;
  } catch (error) {
    throw error;
  }
};

type findStudentsPropsType = {
  query: string;
  currentPage: number;
  apiClient: AxiosInstance;
};
export const findClubMember = async ({
  apiClient,
  query,
  currentPage,
}: findStudentsPropsType): Promise<PaginationResponse<IUserNameAndIdOnly>> => {
  const response = await apiClient.get(
    `/students/search?q=${query}&page=${currentPage - 1}&size=5`
  );
  const { data } = response.data as BaseResponse<
    PaginationResponse<IUserNameAndIdOnly>
  >;
  return data;
};
