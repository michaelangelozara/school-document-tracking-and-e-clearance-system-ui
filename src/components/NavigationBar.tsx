import NDTC_LOGO from "../assets/icon/png/NDTC-300x279.png";
import HOME_ICON from "../assets/icon/svg/navigation/home-icon-svg.svg";
import PROFILE_ICON from "../assets/icon/svg/profile-account-settings-icon-svg.svg";
import KEY_ICON from "../assets/icon/svg/navigation/key-icon-svg-com.svg";
import LOG_OUT_ICON from "../assets/icon/svg/navigation/logout-icon-svg-com.svg";
import { useNavigate } from "react-router-dom";

type ButtonPropsType = {
  label: string;
  icon: string;
  onClick: () => void;
};

const Button = ({ label, icon, onClick }: ButtonPropsType) => {
  return (
    <button
      className={`w-full h-[10%] hover:cursor-pointer bg-primary text-contrast border-secondary hover:bg-[#8DD6B3] hover:text-white flex space-x-2 items-center justify-center rounded-sm p-1`}
      onClick={onClick}
    >
      <img className="size-6" src={icon} alt={label + " Icon"} />{" "}
      <span>{label}</span>
    </button>
  );
};

const NavigationBar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[13%] min-w-[375px] sm:px-2 md:px-4 lg:px-6 bg-primary flex items-center justify-between">
      <div className="flex items-center flex-1">
        <img className="w-22 h-22" src={NDTC_LOGO} alt="NDTC Logo" />
        <span className="sm:text-[10px] md:text-[15px] lg:text-[22px] text-darkContrast font-bold">
          Notre Dame of Tacurong College
        </span>
      </div>
      {/* Container for user profile & settings dropdown */}
      <div className="flex flex-1 items-center p-4 gap-1">
        <Button
          label="Home"
          icon={HOME_ICON}
          onClick={() => {
            ("");
          }}
        />

        <Button
          label="Profile"
          icon={PROFILE_ICON}
          onClick={() => {
            ("");
          }}
        />

        <Button
          label="Account"
          icon={KEY_ICON}
          onClick={() => {
            ("");
          }}
        />
        <Button label="Logout" icon={LOG_OUT_ICON} onClick={() => ""} />
      </div>
    </div>
  );
};

export default NavigationBar;
