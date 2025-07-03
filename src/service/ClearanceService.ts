import { AxiosInstance } from "axios";
import { BaseResponse } from "../types/response/Response";
import {
  ClearanceSummaryProjection,
  ClearanceFilterBody,
} from "../types/clearance/Clearance";
import { PaginationResponse } from "../types/Pagination";

export const request = async (apiClient: AxiosInstance): Promise<string> => {
  try {
    const response = await apiClient.post("/clearances/request");
    const data = response.data as BaseResponse<null>;
    return data?.message;
  } catch (error) {
    throw error;
  }
};

export const findAll = async (
  apiClient: AxiosInstance,
  filterBody: ClearanceFilterBody,
  page: number
): Promise<PaginationResponse<ClearanceSummaryProjection>> => {
  try {
    const response = await apiClient.get(
      `/clearances?page=${page - 1}&size=10&search_query=${
        filterBody.search_query
      }&status=${filterBody.status}&type_of_clearance=${
        filterBody.type_of_clearance
      }`
    );
    const { data } = response.data;
    return data as PaginationResponse<ClearanceSummaryProjection>;
  } catch (error) {
    throw error;
  }
};
