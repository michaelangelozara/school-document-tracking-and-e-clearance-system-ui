import React from "react";
import { homeRedirection } from "../pages/Home";
import { useNavigate } from "react-router-dom";

const DepartmentModal = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      {/* Modal Content */}
      <div className="w-[85%] h-[85%] max-w-[90%] md:max-w-2xl bg-background flex flex-col rounded-lg shadow-xl relative">
        {/* Header Layer */}
        <div className="flex justify-between rounded-tl-lg rounded-tr-lg bg-primary text-darkContrast p-4">
          <span className="text-[22px] font-semibold">Department Section</span>
          <button
            onClick={() => navigate("/home")}
            className="text-xl font-bold hover:text-red-500"
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

export default DepartmentModal;
