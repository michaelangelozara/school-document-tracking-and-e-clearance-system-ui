import React from "react";
import { useNavigate } from "react-router-dom";
import CLEARANCE_ICON from "../../assets/icon/svg/section_card/clearance-icon-svgrepo-com.svg";

const ClearanceModal = () => {
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
            <img
              src={CLEARANCE_ICON}
              alt="Department Icon"
              className="size-8"
            />
            <span className="text-xl text-darkContrast">Clearance Section</span>
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

export default ClearanceModal;
