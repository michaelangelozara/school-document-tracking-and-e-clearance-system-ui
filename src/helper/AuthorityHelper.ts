type IsAutorityCombinationValidProps = {
  authorityCombination: string[];
  userAuthorities: string[];
};
export const isAutorityCombinationValid = ({
  authorityCombination,
  userAuthorities,
}: IsAutorityCombinationValidProps): boolean => {
  return userAuthorities.some((userAuthority) =>
    authorityCombination.includes(userAuthority)
  );
};

type CheckAuthorityProps = {
  allowedAuthorities: string[];
  userAuthorities: string[];
};
export const checkAuthorities = ({
  allowedAuthorities,
  userAuthorities,
}: CheckAuthorityProps): boolean => {
  return userAuthorities.some((userAuthority) =>
    allowedAuthorities.includes(userAuthority)
  );
};
