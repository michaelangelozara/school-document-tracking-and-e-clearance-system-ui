import React, { ChangeEvent, useState } from "react";
import {
  ICommunicationLetterRequestDTO,
  TypeOfCommunicationLetter,
} from "../../../types/letter/CommunicationLetter";
import LetterHeader from "../apply-update-header/LetterHeader";
import ApplyUpdateButton from "../../button/ApplyUpdateButton";
import SignatureCard from "../../signature/SignatureCard";
import { ModeType } from "../../../types/letter/BaseLetter";

type CommunicationFormPropsType = {
  letter: ICommunicationLetterRequestDTO;
  setLetter: React.Dispatch<
    React.SetStateAction<ICommunicationLetterRequestDTO>
  >;
  onSubmit: () => void;
  mode: ModeType;
};
const CommunicationForm = ({
  letter,
  setLetter,
  onSubmit,
  mode,
}: CommunicationFormPropsType) => {
  return (
    <div className="bg-background p-3">
      <div className="flex flex-col rounded-md gap-4 p-2 bg-white text-darkContrast overflow-auto lg:text-md">
        <LetterHeader title="Communication Letter Application" />

        <div className="flex gap-2">
          <div className="border rounded-lg border-gray-300 outline-darkContrast md:h-[var(--input-height-md)] lg:flex lg:gap-4">
            <h1>
              Date <span className="text-red-600">*</span>
            </h1>
            <input
              value={letter.date || ""}
              className="cursor-pointer"
              type="date"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setLetter((prev) => ({
                  ...prev,
                  date: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <select
              className="border rounded-lg border-gray-300 outline-darkContrast cursor-pointer md:h-[var(--input-height-md)]"
              value={letter.type_of_communication_letter}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setLetter((prev) => ({
                  ...prev,
                  type_of_communication_letter: e.target
                    .value as TypeOfCommunicationLetter,
                }))
              }
            >
              <option value={TypeOfCommunicationLetter.IN_CAMPUS}>
                In Campus
              </option>
              <option value={TypeOfCommunicationLetter.OFF_CAMPUS}>
                Off Campus
              </option>
            </select>
          </div>
        </div>
        <div>
          <h1>
            Content/Body <span className="text-red-600">*</span>
          </h1>
          <textarea
            value={letter.content || ""}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setLetter((prev) => ({
                ...prev,
                content: e.target.value,
              }))
            }
            className="border rounded-lg border-gray-300 outline-darkContrast w-full h-[12rem] p-2 lg:h-[18rem]"
          />
        </div>
        {mode === "apply" && (
          <div className="flex flex-col gap-4">
            <SignatureCard />
          </div>
        )}
        <ApplyUpdateButton apply={onSubmit} mode={mode} />
      </div>
    </div>
  );
};

export default CommunicationForm;
