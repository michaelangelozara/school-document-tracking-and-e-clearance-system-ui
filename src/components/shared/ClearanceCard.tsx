import React from "react";
import { useNavigate } from "react-router-dom";

const ClearanceCard = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white flex-1 flex flex-col shadow-lg border border-gray-200 rounded-xl">
      <h1 className="text-center text-lg bg-primary text-darkContrast rounded-tl-xl rounded-tr-xl">
        Clearance Status
      </h1>
      <div className="bg-white flex-1 flex flex-col justify-center items-center pl-2 pr-2">
        <span className="text-md">Clearance is not available</span>
      </div>
      {/* <div className="flex justify-center p-2">
        <button
          onClick={() => navigate("/home/my-clearance")}
          className="ml-2 w-fit text-xs sm:text-sm text-blue-600 hover:underline hover:cursor-pointer"
        >
          View More
        </button>
      </div> */}
    </div>
  );
};

export default ClearanceCard;
