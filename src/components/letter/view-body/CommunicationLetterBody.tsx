import React from "react";
import {
  ICommunicationLetterResponseDTO,
  TypeOfCommunicationLetter,
} from "../../../types/letter/CommunicationLetter";

const TypeOfCommunicationLetterEnumConverter = (
  type: TypeOfCommunicationLetter | undefined
): string => {
  return type === TypeOfCommunicationLetter.IN_CAMPUS
    ? "In-Campus"
    : "Off-Campus";
};

const CommunicationLetterBody = (letter: ICommunicationLetterResponseDTO) => {
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
        <h1 className="min-w-[170px] text-darkContrast">Date of Letter</h1>
        <h1>{letter.date}</h1>
      </div>
      <div className="pt-2 pb-2 flex">
        <h1 className="min-w-[170px] text-darkContrast">Type</h1>
        <h1>
          {TypeOfCommunicationLetterEnumConverter(
            letter.type_of_communication_letter
          )}
        </h1>
      </div>
      <div className="pt-2 pb-2 flex">
        <h1 className="min-w-[170px] text-darkContrast">Status</h1>
        <h1>{letter.status}</h1>
      </div>
      <div className="pt-2 pb-2 flex flex-col">
        <h1 className="min-w-[170px] mb-2 text-darkContrast">Content</h1>
        <textarea
          disabled
          defaultValue={letter.content}
          className="border border-gray-200 rounded-md p-2 h-[120px]"
        />
      </div>
    </div>
  );
};

export default CommunicationLetterBody;
