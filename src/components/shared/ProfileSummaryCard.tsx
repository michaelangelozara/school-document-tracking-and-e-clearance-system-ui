import React from "react";

import AUTHORITY_ICON from "../../assets/icon/svg/profile_summary/role-icon-svgrepo-com.svg";
import EMAIL_ICON from "../../assets/icon/svg/profile_summary/email-icon-svgrepo-com.svg";
import USERNAME_ICON from "../../assets/icon/svg/profile_summary/username-icon-svgrepo-com.svg";
import CONTACT_NUMBER_ICON from "../../assets/icon/svg/profile_summary/contact-icon-svgrepo-com.svg";
import TYPE_OF_PERSONNEL_ICON from "../../assets/icon/svg/profile_summary/type-of-personel-svgrepo-com.svg";
import { IUserSummaryResponse, TypeOfBaseUser } from "../../types/user/User";
import { extractAuthorties, getFullName } from "../../util/UserUtil";

interface Props {
  userData: IUserSummaryResponse | null;
}

const extractUserType = (type: TypeOfBaseUser | undefined): string => {
  if (type === TypeOfBaseUser.STUDENT) {
    return "Student";
  } else if (type === TypeOfBaseUser.ACADEMIC_PERSONNEL) {
    return "Academic Personnel";
  } else if (type === TypeOfBaseUser.NON_ACADEMIC_PERSONNEL) {
    return "Non Academic Personnel";
  } else {
    return "Unknown";
  }
};

const ProfileSummaryCard = ({ userData }: Props) => {
  return (
    <div className="h-[260px] border border-gray-200 rounded-xl bg-white flex-1/5 shadow-lg flex flex-col lg:col-span-2">
      <h1 className="text-center text-lg text-darkContrast bg-primary rounded-tl-xl rounded-tr-xl">
        My Profile Summary
      </h1>
      <div className="bg-white flex-1 flex flex-col pt-2 pl-2 pr-2 gap-[5%] overflow-auto">
        <div className="flex gap-4">
          <img src={USERNAME_ICON} alt="Year Level Icon" className="size-6" />
          <h1>
            Name:{" "}
            <span className="text-darkContrast">
              {userData ? getFullName(userData) : ""}
            </span>
          </h1>
        </div>
        <div className="flex gap-4">
          <img
            src={TYPE_OF_PERSONNEL_ICON}
            alt="Type of Personnel Icon"
            className="size-6"
          />
          <h1>
            Type :{" "}
            <span className="text-darkContrast">
              {extractUserType(userData?.type)}
            </span>
          </h1>
        </div>
        <div className="flex gap-4">
          <img src={AUTHORITY_ICON} alt="Authority Icon" className="size-6" />
          <h1>
            Role:{" "}
            <span className="text-darkContrast">
              {userData ? extractAuthorties(userData) : ""}
            </span>
          </h1>
        </div>
        <div className="flex gap-4">
          <img src={USERNAME_ICON} alt="Year Level Icon" className="size-6" />
          <h1>
            User ID:{" "}
            <span className="text-darkContrast">{userData?.username}</span>
          </h1>
        </div>
        <div className="flex gap-4">
          <img src={EMAIL_ICON} alt="Course Icon" className="size-6" />
          <h1>
            Email:{" "}
            <span className="text-darkContrast">{userData?.username}</span>
          </h1>
        </div>
        <div className="flex gap-4">
          <img src={CONTACT_NUMBER_ICON} alt="Course Icon" className="size-6" />
          <h1>
            Contact Number:{" "}
            <span className="text-darkContrast">{userData?.username}</span>
          </h1>
        </div>
      </div>
      <div className="flex justify-center p-2">
        <button className="w-fit text-xs sm:text-sm text-blue-600 hover:underline hover:cursor-pointer">
          View More
        </button>
      </div>
    </div>
  );
};

export default ProfileSummaryCard;
