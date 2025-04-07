export interface BaseResponse<T> {
  data: T;
  date_and_time: string;
  message: string;
}
