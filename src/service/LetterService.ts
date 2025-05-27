import { AxiosInstance } from "axios";
import {
  IBaseLetterRequestDTO,
  IBaseLetterResponseDTO,
} from "../types/letter/BaseLetter";
import { BaseResponse } from "../types/response/Response";

export const apply = async <T extends IBaseLetterRequestDTO>(
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

export const findById = async <T extends IBaseLetterResponseDTO>(
  id: string | undefined,
  apiClient: AxiosInstance,
  controller: AbortController
): Promise<T> => {
  try {
    const response = await apiClient.get(`/letters/${id}`, {
      signal: controller.signal,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
