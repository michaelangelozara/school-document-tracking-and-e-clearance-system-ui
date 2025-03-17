import React, { useState } from "react";

import NDTC_LOGO from "../assets/icon/png/NDTC-300x279.png";
import USER_ICON from "../assets/icon/svg/user-hand-up-svg.svg";
import HOME_ICON from "../assets/icon/svg/home-icon-svg.svg";
import PROFILE_ICON from "../assets/icon/svg/profile-account-settings-icon-svg.svg";
import KEY_ICON from "../assets/icon/svg/key-icon-svg-com.svg";
import LOG_OUT_ICON from "../assets/icon/svg/logout-icon-svg-com.svg";
import { useNavigate } from "react-router-dom";

type ButtonType = {
  label: string;
  icon: string;
  onClick: () => void;
};

const Button = ({ label, icon, onClick }: ButtonType) => {
  return (
    <button
      className={`w-full h-[10%] bg-primary text-contrast border-secondary hover:bg-[#8DD6B3] hover:text-white flex space-x-2 items-center rounded-sm p-1`}
      onClick={onClick}
    >
      <img className="size-6" src={icon} alt={label + " Icon"} />{" "}
      <span>{label}</span>
    </button>
  );
};

type SettingsCardType = {
  onClick: () => void;
};
const SettingsCard = ({ onClick }: SettingsCardType) => {
  const navigate = useNavigate();

  const logoutHandler = () => {};

  return (
    <div className="absolute z-10 top-[120%] right-0 bg-secondary shadow-md rounded-md p-3 w-48">
      <ul className="space-y-1">
        <li>
          <Button
            label="Home"
            icon={HOME_ICON}
            onClick={() => {
              onClick();
              navigate("/home");
            }}
          />
        </li>
        <li>
          <Button
            label="Profile"
            icon={PROFILE_ICON}
            onClick={() => {
              onClick();
              navigate("/user/profile");
            }}
          />
        </li>
        <li>
          <Button
            label="Account"
            icon={KEY_ICON}
            onClick={() => {
              onClick();
              navigate("/user/account");
            }}
          />
        </li>
        <li>
          <Button label="Logout" icon={LOG_OUT_ICON} onClick={logoutHandler} />
        </li>
      </ul>
    </div>
  );
};

const NavigationBar = () => {
  const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false);

  const settingsButtonHandler = () => {
    setIsSettingOpen((prev) => !prev);
  };

  return (
    <div className="w-full h-[13%] min-w-[375px] sm:px-2 md:px-4 lg:px-6 bg-primary flex items-center justify-between">
      <div className="flex items-center">
        <img
          className="sm:size-[45px] md:size-[65px] lg:size-[85px]"
          src={NDTC_LOGO}
          alt="NDTC Logo"
        />
        <span className="sm:text-[10px] md:text-[15px] lg:text-[22px] text-darkContrast font-bold">
          Notre Dame of Tacurong College
        </span>
      </div>
      {/* Container for user profile & settings dropdown */}
      <div className="relative flex items-center sm:space-x-1 md:space-x-2 lg:space-x-3.5">
        <span className="sm:text-[10px] md:text-[13px] lg:text-[17px] text-darkContrast font-bold">
          Michael Angelo B. Zara
        </span>
        {/* User Icon (Dropdown Toggle) */}
        <img
          className="sm:size-6 md:size-8 lg:size-10 hover:cursor-pointer"
          onClick={settingsButtonHandler}
          src={USER_ICON}
          alt="User Icon"
        />
        {/* Dropdown positioned absolutely relative to this container */}
        {isSettingOpen && <SettingsCard onClick={settingsButtonHandler} />}
      </div>
    </div>
  );
};

export default NavigationBar;
