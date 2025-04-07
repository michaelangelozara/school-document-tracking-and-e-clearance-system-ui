import { IUserSummaryResponse } from "../types/user/User";

export const getFullName = (user: IUserSummaryResponse): string => {
  return user.middle_name
    ? user.firstname +
        " " +
        user.middle_name.charAt(0).toLocaleUpperCase() +
        ". " +
        user.lastname
    : user.firstname + " " + user.lastname;
};

export const extractAuthorties = (user: IUserSummaryResponse): string => {
  if (user.authorities.length === 1) {
    return user.authorities[0];
  }

  let strAuthorities = "";
  for (let i = 0; i < user.authorities.length; i++) {
    strAuthorities.concat(user.authorities[i], " | ");
  }

  return strAuthorities;
};
