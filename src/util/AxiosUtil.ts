import { AxiosError } from "axios";

export const getAxiosError = (err: unknown) => {
  return err as AxiosError;
};
