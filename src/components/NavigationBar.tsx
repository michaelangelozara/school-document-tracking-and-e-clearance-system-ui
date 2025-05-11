import NDTC_LOGO from "../assets/icon/png/NDTC-300x279.png";
import HOME_ICON from "../assets/icon/svg/navigation/home-icon-svg.svg";
import PROFILE_ICON from "../assets/icon/svg/profile-account-settings-icon-svg.svg";
import KEY_ICON from "../assets/icon/svg/navigation/key-icon-svg-com.svg";
import LOG_OUT_ICON from "../assets/icon/svg/navigation/logout-icon-svg-com.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type ButtonPropsType = {
  label: string;
  icon: string;
  onClick: () => void;
};

const Button = ({ label, icon, onClick }: ButtonPropsType) => {
  return (
    <button
      className={`w-full hover:cursor-pointer bg-primary text-contrast border-secondary hover:bg-[#8DD6B3] hover:text-white flex space-x-2 items-center justify-center rounded-sm p-1`}
      onClick={onClick}
    >
      <img className="size-4 sm:size-6" src={icon} alt={label + " Icon"} />{" "}
      <h1 className="">{label}</h1>
    </button>
  );
};

const NavigationBar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="w-full bg-primary md:grid grid-cols-2">
      <div className="hidden md:flex items-center gap-1">
        <img
          className="size-16 lg:size-[74px]"
          src={NDTC_LOGO}
          alt="NDTC Logo"
        />
        <span className="text-sm text-darkContrast font-bold lg:text-md">
          Notre Dame of Tacurong College
        </span>
      </div>
      {/* Container for user profile & settings dropdown */}
      <div className="w-full flex justify-between p-2 gap-1">
        <Button
          label="Home"
          icon={HOME_ICON}
          onClick={() => navigate("/home")}
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
        <Button label="Logout" icon={LOG_OUT_ICON} onClick={logout} />
      </div>
    </div>
  );
};

export default NavigationBar;
