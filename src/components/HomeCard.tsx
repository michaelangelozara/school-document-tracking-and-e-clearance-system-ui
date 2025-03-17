import React from "react";

type HomeCardType = {
  title: string;
  columns: string[];
  data: string[][];
  onClick: () => void;
};

const HomeCard = ({ title, columns, data, onClick }: HomeCardType) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4">
      <h2 className="text-lg bg-primary font-semibold mb-2">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              {columns.map((col, index) => (
                <th key={index} className="p-2">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b">
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
      <button className="mt-2 text-blue-600 hover:underline">View More</button>
    </div>
  );
};

export default HomeCard;
