import React from "react";
import { IImplementationLetterOffCampusResponseDTO } from "../../../types/letter/ImplementationLetterOffCampus";

const ImplementationLetterOffCampusBody = (
  letter: IImplementationLetterOffCampusResponseDTO
) => {
  return (
    <div className="p-2 bg-white rounded-sm">
      <h1 className="font-semibold text-darkContrast text-sm md:text-md">
        Letter Details
      </h1>
      <div className="pt-2 pb-2 flex">
        <h1 className="min-w-[170px] text-darkContrast">
          Semester/School Year
        </h1>
        <h1>{letter.semester_and_school_year}</h1>
      </div>
      <div className="pt-2 pb-2 flex">
        <h1 className="min-w-[170px] text-darkContrast">Activity</h1>
        <h1>{letter.name_of_activity}</h1>
      </div>
      <div className="pt-2 pb-2 flex">
        <h1 className="min-w-[170px] text-darkContrast">
          Date & Time of Letter
        </h1>
        <h1>{letter.date_and_time}</h1>
      </div>
      <div className="pt-2 pb-2 flex">
        <h1 className="min-w-[170px] text-darkContrast">Reason</h1>
        <h1>{letter.reason}</h1>
      </div>
      <div className="pt-2 pb-2 flex">
        <h1 className="min-w-[170px] text-darkContrast">Status</h1>
        <h1>{letter.status}</h1>
      </div>
      <div className="pt-2 pb-2 flex flex-col">
        <h1 className="min-w-[170px] text-darkContrast">Description</h1>
        <p className="h-[300px] overflow-auto border border-gray-200 rounded-md p-2">
          {letter.description}
        </p>
      </div>

      <h1 className="text-darkContrast">Committees</h1>
      <div className="overflow-auto flex flex-col h-[300px] p-2 border border-gray-200 rounded-md">
        <table>
          <thead>
            <tr className="text-nowrap border-b border-gray-200 text-left">
              <th className="text-darkContrast pr-4 md:pr-0">No</th>
              <th className="text-darkContrast pr-4 md:pr-0">Name</th>
              <th className="text-darkContrast pr-4 md:pr-0">Activity</th>
              <th className="text-darkContrast pr-4 md:pr-0">Objective</th>
              <th className="text-darkContrast">Expected Output</th>
            </tr>
          </thead>
          <tbody>
            {letter.committees.map((element, index) => (
              <tr>
                <td className="text-darkContrast pr-4 md:pr-0">{index + 1}.</td>
                <td className="text-nowrap pr-4 md:pr-0">{element.name}</td>
                <td className="text-nowrap pr-4 md:pr-0">{element.activity}</td>
                <td className="text-nowrap pr-4 md:pr-0">
                  {element.objective}
                </td>
                <td className="text-nowrap">{element.expected_output}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ImplementationLetterOffCampusBody;
