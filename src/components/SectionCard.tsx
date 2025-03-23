import React, { use } from "react";
import { checkAuthorities } from "../helper/AuthorityHelper";

type SectionCardProps = {
  icon: string;
  title: string;
  columns: string[];
  data: string[][];
  allowedAuthorities: string[];
  userAuthorities: string[];
  onClick: () => void;
};

const SectionCard = ({
  icon,
  title,
  columns,
  data,
  onClick,
  allowedAuthorities,
  userAuthorities,
}: SectionCardProps) => {
  if (
    !checkAuthorities({ allowedAuthorities, userAuthorities }) &&
    allowedAuthorities.length !== 0
  ) {
    return;
  }

  return (
    <div className="min-w-[30%] bg-white shadow-lg border border-gray-200 rounded-xl p-4">
      <div className="text-md bg-primary rounded text-darkContrast text-center p-2 flex justify-center gap-2">
        {icon !== "" ? (
          <img src={icon} alt={title + " Icon"} className="size-6" />
        ) : (
          ""
        )}
        <span>{title}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b text-[0.5rem]">
              {columns.map((col, index) => (
                <th key={index} className="p-2">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b text-[0.5rem]">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="p-2">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={onClick} className="mt-2 text-blue-600 hover:underline">
        View More
      </button>
    </div>
  );
};

export default SectionCard;
