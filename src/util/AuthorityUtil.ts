export const validateAuthorities = (
  allowedAuthorities: string[],
  userAuthorities: string[]
) => {
  let isAllowed: boolean = false;
  for (let i = 0; i < userAuthorities.length; i++) {
    if (allowedAuthorities.includes(userAuthorities[i])) {
      isAllowed = true;
      break;
    }
  }

  return isAllowed;
};
