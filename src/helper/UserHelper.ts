type GetFullNamePropsType = {
  firstName: string | undefined;
  middleName: string | undefined;
  lastName: string | undefined;
};
export const extractFullName = ({
  firstName,
  middleName,
  lastName,
}: GetFullNamePropsType): string => {
  return middleName !== undefined
    ? firstName + " " + middleName.charAt(0).toUpperCase() + ". " + lastName
    : firstName + " " + lastName;
};
