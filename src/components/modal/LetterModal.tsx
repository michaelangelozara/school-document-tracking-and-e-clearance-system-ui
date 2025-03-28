import React from "react";

import LETTER_ICON from "../../assets/icon/svg/section_card/letter-icon-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";

const LetterModal = () => {
  const navigate = useNavigate();

  const navigationHandler = () => {
    navigate("/home");
  };
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      {/* Modal Content */}
      <div className="w-[95%] h-[85%] bg-background flex flex-col rounded-lg shadow-xl relative">
        {/* Header Layer */}
        <div className="flex justify-between rounded-tl-lg rounded-tr-lg bg-primary text-darkContrast p-2">
          <div className="flex items-center gap-2">
            <img src={LETTER_ICON} alt="Department Icon" className="size-8" />
            <span className="text-xl text-darkContrast">Letter Section</span>
          </div>
          <button
            onClick={navigationHandler}
            className="text-xl font-bold hover:text-red-500 hover:cursor-pointer"
          >
            ✖
          </button>
        </div>
        {/* Modal Body */}
        <div className="bg-background w-full flex-1 p-4">
          {/* Content Goes Here */}
        </div>
      </div>
    </div>
  );
};

export default LetterModal;
