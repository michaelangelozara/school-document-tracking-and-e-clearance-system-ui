import React, { useState } from "react";

import NDTC_LOGO from "../assets/icon/png/NDTC-300x279.png";
import USER_ICON from "../assets/icon/svg/user-hand-up-svg.svg";
import HOME_ICON from "../assets/icon/svg/home-icon-svg.svg";
import PROFILE_ICON from "../assets/icon/svg/profile-account-settings-icon-svg.svg";
import KEY_ICON from "../assets/icon/svg/key-icon-svg-com.svg";
import LOG_OUT_ICON from "../assets/icon/svg/logout-icon-svg-com.svg";
import BUTTON from "./SettingsButton";
import { useNavigate } from "react-router-dom";

type SettingsCardType = {
  onClick: () => void;
};
const SettingsCard = ({ onClick }: SettingsCardType) => {
  const navigate = useNavigate();

  const logoutHandler = () => {};

  return (
    <div className="absolute top-[120%] right-0 bg-secondary shadow-md rounded-md p-3 w-48">
      <ul className="space-y-1">
        <li>
          <BUTTON
            label="Home"
            icon={HOME_ICON}
            onClick={() => {
              onClick();
              navigate("/home");
            }}
          />
        </li>
        <li>
          <BUTTON
            label="Profile"
            icon={PROFILE_ICON}
            onClick={() => {
              onClick();
              navigate("/user/profile");
            }}
          />
        </li>
        <li>
          <BUTTON
            label="Account"
            icon={KEY_ICON}
            onClick={() => {
              onClick();
              navigate("/user/account");
            }}
          />
        </li>
        <li>
          <BUTTON label="Logout" icon={LOG_OUT_ICON} onClick={logoutHandler} />
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
    <div className="w-full h-[13%] bg-primary flex items-center justify-between px-6">
      <div className="flex items-center">
        <img className="w-[6rem] h-[5rem]" src={NDTC_LOGO} alt="NDTC Logo" />
        <span className="text-darkContrast font-bold text-[22px]">
          Notre Dame of Tacurong College
        </span>
      </div>
      {/* Container for user profile & settings dropdown */}
      <div className="relative flex items-center space-x-3.5">
        <span className="text-darkContrast text-[1rem] font-bold">
          Michael Angelo B. Zara
        </span>
        {/* User Icon (Dropdown Toggle) */}
        <img
          className="size-10 hover:cursor-pointer"
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
