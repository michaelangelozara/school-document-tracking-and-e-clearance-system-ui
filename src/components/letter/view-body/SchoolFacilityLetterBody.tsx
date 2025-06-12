import React from "react";
import { ISchoolFacilityResponseDTO } from "../../../types/letter/SchoolFacility";

const SchoolFacilityLetterBody = (letter: ISchoolFacilityResponseDTO) => {
  return (
    <div className="p-2 bg-white rounded-sm">
      <h1 className="font-semibold text-darkContrast">Letter Details</h1>
      <div className="pt-2 pb-2 flex">
        <h1 className="min-w-[170px] text-darkContrast">
          Semester/School Year
        </h1>
        <h1>{letter.semester_and_school_year}</h1>
      </div>
      <div className="pt-2 pb-2 flex">
        <h1 className="min-w-[170px] text-darkContrast">Venue</h1>
        <h1>{letter.venue}</h1>
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

      <h1 className="text-darkContrast">Facility/Equipment</h1>
      <div className="flex flex-col h-[200px] overflow-auto p-2 border border-gray-200 rounded-md">
        {letter.facility_or_equipments.map((element, index) => (
          <div key={index} className="flex gap-2">
            <h1 className="text-darkContrast">{index + 1}.</h1>
            <h1>
              {element.name} ({element.quantity})
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchoolFacilityLetterBody;
