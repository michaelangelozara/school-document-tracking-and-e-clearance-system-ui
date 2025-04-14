// export type FindUsersProps = {
//   page: number;
//   size: number;
// };
// export const findAllUsersApi = async (
//   pagination: FindUsersProps
// ): Promise<IPaginationRequest<User[]>> => {
//   const response = await axiosConfig.get(
//     `/users?page=${pagination.page}&size=${pagination.size}`
//   );
//   return response.data as IPaginationRequest<User[]>;
// };

// export const findMeApi = async (): Promise<User> => {
//   const response = await axiosConfig.get("/users/me");
//   return response.data as User;
// };
