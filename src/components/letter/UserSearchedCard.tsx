import { ChangeEvent, useState } from "react";
import { IUserNameAndIdOnly } from "../../types/user/User";

type SearchedUserCardPropsType = {
  user: IUserNameAndIdOnly;
  onChange: (user: IUserNameAndIdOnly, value: boolean) => void;
  isSelected: boolean;
};

const UserSearchedCard = ({
  user,
  onChange,
  isSelected,
}: SearchedUserCardPropsType) => {
  return (
    <div key={user.id}>
      <div className="flex items-center gap-3 p-2">
        <img
          className="size-9 rounded-full md:size-12"
          src={user.profile}
          alt="User Image"
        />
        <h1 className="md:text-sm">{user.name}</h1>
        <input
          className="md:size-4"
          type="checkbox"
          checked={isSelected}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChange(user, e.target.checked);
          }}
        />
      </div>
    </div>
  );
};

export default UserSearchedCard;
