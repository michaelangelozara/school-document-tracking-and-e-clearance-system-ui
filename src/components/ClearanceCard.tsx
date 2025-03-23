import React from "react";

const ClearanceCard = () => {
  return (
    <div className="bg-white flex-1 flex flex-col shadow-lg border border-gray-200 rounded-xl">
      <h1 className="text-center text-lg bg-primary text-darkContrast rounded-tl-xl rounded-tr-xl">
        My Clearance Summary
      </h1>
      <div className="bg-white flex-1 flex flex-col pl-2 pr-2"></div>
      <div className="flex justify-center p-2">
        <button className="ml-2 w-fit text-blue-600 hover:underline">
          View More
        </button>
      </div>
    </div>
  );
};

export default ClearanceCard;
