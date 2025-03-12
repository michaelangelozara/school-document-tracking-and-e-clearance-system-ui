import React from "react";

type ButtonType = {
  label: string;
  icon: string;
  onClick: () => void;
};

const Button = ({ label, icon, onClick }: ButtonType) => {
  return (
    <button
      className={`w-full h-[10%] bg-primary text-contrast border-secondary hover:bg-[#8DD6B3] flex space-x-2 items-center rounded-sm p-1`}
      onClick={onClick}
    >
      <img className="size-6" src={icon} alt={label + " Icon"} />{" "}
      <span>{label}</span>
    </button>
  );
};

export default Button;
