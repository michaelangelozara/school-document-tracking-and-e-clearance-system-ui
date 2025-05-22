import { AxiosError } from "axios";
import { BaseResponse } from "../types/response/Response";

export const getErrorMessage = (error: any): string => {
  const errorAxios = error as AxiosError;
  const errorResponse = errorAxios.response?.data as BaseResponse<null>;
  return errorResponse?.message;
};
