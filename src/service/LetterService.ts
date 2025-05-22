import { AxiosInstance } from "axios";
import { BaseLetter } from "../types/letter/BaseLetter";
import { BaseResponse } from "../types/response/Response";

export const apply = async <T extends BaseLetter>(
  requestLetter: T,
  apiClient: AxiosInstance
): Promise<string> => {
  try {
    const response = await apiClient.post("/letters/apply", requestLetter);
    const data = response.data as BaseResponse<null>;
    return data?.message;
  } catch (error) {
    throw error;
  }
};
