import { IUserSummaryResponse } from "../user/User";

export interface Login {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: IUserSummaryResponse;
}
