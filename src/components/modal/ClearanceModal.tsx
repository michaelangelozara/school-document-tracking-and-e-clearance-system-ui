import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CLEARANCE_ICON from "../../assets/icon/svg/section_card/clearance-icon-svgrepo-com.svg";

import PaginationButton from "../PaginationButton";

type TablePropsType = {
  onClick: () => void;
};

const Table = ({ onClick }: TablePropsType) => {
  return (
    <table className="w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-200 border-b border-gray-300 text-nowrap">
          <th className="p-2 border-r border-gray-300 ">No.</th>
          <th className="p-2 border-r border-gray-300 ">Semester & S.Y</th>
          <th className="p-2 border-r border-gray-300 ">Type</th>
          <th className="p-2 border-r border-gray-300 ">Status</th>
          <th className="p-2 border-r border-gray-300 ">Current Office</th>
          <th className="p-2 border-r border-gray-300 ">Requested</th>
          <th className="p-2 ">Last Modified</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-gray-300 text-nowrap">
          <td className="p-2 border-r border-gray-300 text-center">1</td>
          <td className="p-2 border-r border-gray-300 text-center">
            1st 2024-2025
          </td>
          <td className="p-2 border-r border-gray-300 text-center">
            Personnel
          </td>
          <td className="p-2 border-r border-gray-300 text-center">Pending</td>
          <td className="p-2 border-r border-gray-300 text-center">DSA</td>
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 10:00 am
          </td>
          <td className="p-2 text-center">10-Sep-2025 11:23 am</td>
          <th>
            <button
              onClick={onClick}
              className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
            >
              View
            </button>
          </th>
        </tr>
      </tbody>
    </table>
  );
};

const ClearanceModal = () => {
  const navigate = useNavigate();
  const [isViewClicked, setIsViewClicked] = useState<boolean>(false);

  const navigationHandler = () => {
    navigate("/home");
  };

  const handleNext = () => {};

  const handlePrev = () => {};

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      {/* Modal Content */}
      <div className="w-[95%] h-[95%] max-h-[95%] bg-background flex flex-col rounded-lg shadow-xl relative">
        {/* Header Layer */}
        <div className="flex justify-between rounded-tl-lg rounded-tr-lg bg-primary text-darkContrast p-1">
          <div className="flex justify-center items-center gap-2">
            <img
              src={CLEARANCE_ICON}
              alt="Department Icon"
              className="size-6 sm:size-7"
            />
            <span className="text-md text-darkContrast">Clearance Section</span>
          </div>
          <button
            onClick={navigationHandler}
            className="text-lg font-bold hover:text-red-500 hover:cursor-pointer"
          >
            ✖
          </button>
        </div>
        {/* Modal Body */}
        <div className="bg-background w-full flex-1 p-4 flex flex-col overflow-auto">
          <div className="bg-white rounded-tl-lg rounded-tr-lg p-2 flex space-x-2">
            <input type="text" placeholder="Search" />
            <select>
              <option>Status</option>
              <option value="">Option 1</option>
              <option value="">Option 2</option>
              <option value="">Option 3</option>
            </select>
          </div>
          <div className="bg-white flex-1 overflow-auto">
            {isViewClicked ? (
              <>
                <h1>Clearance is not available</h1>
              </>
            ) : (
              <Table onClick={() => setIsViewClicked((v) => !v)} />
            )}
          </div>

          {/* Pagination Button */}
          <PaginationButton
            nextPage={handleNext}
            prevPage={handlePrev}
            totalPages={1}
          />
        </div>
      </div>
    </div>
  );
};

export default ClearanceModal;
