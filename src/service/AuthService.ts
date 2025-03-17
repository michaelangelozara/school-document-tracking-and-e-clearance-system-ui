import { loginApi, logoutApi } from "../api/AuthApi";
import { Login } from "../interfaces/ILogin";

export const login = async (credential: Login) => {
  const accessToken = await loginApi(credential);
  // set the token to the redux
};

export const logout = async () => {
  logoutApi();
  // remove the saved access token to the redux
};
