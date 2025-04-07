import { IUserSummaryResponse } from "../user/User";

export interface LoginType {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: IUserSummaryResponse;
}
