import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CLEARANCE_ICON from "../../assets/icon/svg/section_card/clearance-icon-svgrepo-com.svg";

import PaginationButton from "../shared/PaginationButton";

type TablePropsType = {
  onClick: () => void;
};

const Table = ({ onClick }: TablePropsType) => {
  return (
    <table className="w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-200 border-b border-gray-300 text-nowrap">
          <th className="sticky top-0 p-2 border-r border-gray-300 bg-gray-200">
            No.
          </th>
          <th className="sticky top-0 p-2 border-r border-gray-300 bg-gray-200">
            Semester & S.Y
          </th>
          <th className="sticky top-0 p-2 border-r border-gray-300 bg-gray-200">
            Type
          </th>
          <th className="sticky top-0 p-2 border-r border-gray-300 bg-gray-200">
            Status
          </th>
          <th className="sticky top-0 p-2 border-r border-gray-300 bg-gray-200">
            Current Office
          </th>
          <th className="sticky top-0 p-2 border-r border-gray-300 bg-gray-200">
            Requested Date
          </th>
          <th className="sticky top-0 p-2 border-r border-gray-300 bg-gray-200">
            Last Modified
          </th>
          <th className="sticky top-0 p-2 bg-gray-200">Action</th>
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
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
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
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
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
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
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
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
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
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
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
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
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
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
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
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
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
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
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
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
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
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
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
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
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
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
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
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
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
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
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
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
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
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
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
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
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
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
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
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
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
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
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
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
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
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
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
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
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
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
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
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
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
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
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
        <div className="flex justify-between rounded-tl-lg rounded-tr-lg bg-primary text-darkContrast p-1 text-md">
          <div className="flex justify-center items-center gap-2">
            <img
              src={CLEARANCE_ICON}
              alt="Department Icon"
              className="size-6 sm:size-7"
            />
            <span className="text-darkContrast">Clearance Section</span>
          </div>
          <button
            onClick={navigationHandler}
            className="font-bold hover:text-red-500 hover:cursor-pointer"
          >
            ✖
          </button>
        </div>
        {/* Modal Body */}
        <div className="bg-background w-full flex-1 p-4 flex flex-col overflow-auto">
          <div className="bg-white rounded-tl-lg rounded-tr-lg p-2 flex space-x-2">
            <input
              className="border border-gray-200 rounded-md pl-2 placeholder:text-gray-400 outline-darkContrast"
              type="text"
              placeholder="Search"
            />
            <select className="pl-1.5 text-darkContrast border border-gray-200 outline-darkContrast rounded">
              <option>Status</option>
              <option value="">Pending</option>
              <option value="">Completed</option>
              <option value="">Uncompleted</option>
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
