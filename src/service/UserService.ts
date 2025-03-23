import { findUsersApi, FindUsersProps, findMeApi } from "../api/UserApi";
import { User } from "../types/user/User";

export const findUsers = async (
  pagination: FindUsersProps
): Promise<User[]> => {
  const users = await findUsersApi(pagination);
  return users;
};

export const findMe = async (): Promise<User> => {
  const me = await findMeApi();
  return me;
};
