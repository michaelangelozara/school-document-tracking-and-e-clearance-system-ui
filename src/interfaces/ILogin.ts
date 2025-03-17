import { User } from "./IUser";

export interface Login {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
