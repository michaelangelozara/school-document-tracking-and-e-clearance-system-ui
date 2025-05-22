import { AxiosInstance } from "axios";
import { BaseResponse } from "../types/response/Response";

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
