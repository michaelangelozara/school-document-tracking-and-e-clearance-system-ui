import { ChangeEvent, useState } from "react";

import {
  ICommunicationLetterRequest,
  TypeOfCommunicationLetter,
} from "../../types/letter/CommunicationLetter";
import { TypeOfBaseLetter } from "../../types/letter/BaseLetter";
import SignatureCard from "../../components/signature/SignatureCard";
import CancelApplyButton from "../../components/button/CancelApplyButton";
import LetterHeader from "../../components/letter/LetterHeader";
import { apply } from "../../service/LetterService";
import { useAuth } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import { open } from "../../store/slice/MessageSlice";
import { applying, stopApplying } from "../../store/slice/LetterSlice";
import { getErrorMessage } from "../../helper/AxiosHelper";

const CommunicationLetter = () => {
  const { apiClient } = useAuth();
  const [communicationLetter, setCommunicationLetter] =
    useState<ICommunicationLetterRequest>({
      base_letter_request_body_type: TypeOfBaseLetter.COMMUNICATION_LETTER,
      type: TypeOfBaseLetter.COMMUNICATION_LETTER,
      date: "",
      content: "",
      type_of_communication_letter: TypeOfCommunicationLetter.IN_CAMPUS,
    });

  const { hasESignature } = useSelector((state: RootState) => state.eSignature);
  const dispatch = useDispatch<AppDispatch>();

  const reset = () => {
    setCommunicationLetter({
      base_letter_request_body_type: TypeOfBaseLetter.COMMUNICATION_LETTER,
      type: TypeOfBaseLetter.COMMUNICATION_LETTER,
      date: "",
      content: "",
      type_of_communication_letter: TypeOfCommunicationLetter.IN_CAMPUS,
    });
  };

  const submit = async () => {
    if (!hasESignature) {
      dispatch(open("Please attach you E-Signature."));
      return;
    }
    try {
      dispatch(applying());
      const response = await apply(communicationLetter, apiClient);
      dispatch(open(response));
      reset();
    } catch (error: any) {
      if (error.status === 400) {
        const errorMessage = getErrorMessage(error);
        dispatch(open(errorMessage));
      }
    } finally {
      dispatch(stopApplying());
    }
  };

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
              value={communicationLetter.date || ""}
              className="cursor-pointer"
              type="date"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCommunicationLetter((prev) => ({
                  ...prev,
                  date: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <select
              className="border rounded-lg border-gray-300 outline-darkContrast cursor-pointer md:h-[var(--input-height-md)]"
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setCommunicationLetter((prev) => ({
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
            value={communicationLetter.content || ""}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setCommunicationLetter((prev) => ({
                ...prev,
                content: e.target.value,
              }))
            }
            className="border rounded-lg border-gray-300 outline-darkContrast w-full h-[12rem] p-2 lg:h-[18rem]"
          />
        </div>
        <div>
          <SignatureCard />
        </div>
        <CancelApplyButton apply={submit} />
      </div>
    </div>
  );
};

export default CommunicationLetter;
