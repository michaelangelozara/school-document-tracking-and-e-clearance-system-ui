import React from "react";
import { IImplementationLetterInCampusResponseDTO } from "../../../types/letter/ImplementationLetterInCampus";

const ImplementationLetterInCampusBody = (
  letter: IImplementationLetterInCampusResponseDTO
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
        <h1 className="min-w-[170px] text-darkContrast">Status</h1>
        <h1>{letter.status}</h1>
      </div>

      <h1 className="text-darkContrast">Participants</h1>
      <div className="flex flex-col h-[200px] overflow-auto p-2 border border-gray-200 rounded-md">
        {letter.participants.map((element, index) => (
          <div key={index} className="flex gap-2">
            <h1 className="text-darkContrast">{index + 1}.</h1>
            <h1>{element.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImplementationLetterInCampusBody;
