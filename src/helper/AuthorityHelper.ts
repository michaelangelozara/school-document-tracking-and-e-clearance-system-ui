type AuthorityCombinationPropsType = {
  authorityCombination: string[];
  userAuthorities: string[];
};
export const isAutorityCombinationValid = ({
  authorityCombination,
  userAuthorities,
}: AuthorityCombinationPropsType): boolean => {
  return userAuthorities.some((userAuthority) =>
    authorityCombination.includes(userAuthority)
  );
};
