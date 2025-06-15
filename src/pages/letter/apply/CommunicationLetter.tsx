import { ChangeEvent, useState } from "react";

import {
  ICommunicationLetterRequestDTO,
  TypeOfCommunicationLetter,
} from "../../../types/letter/CommunicationLetter";
import { TypeOfBaseLetter } from "../../../types/letter/BaseLetter";
import SignatureCard from "../../../components/signature/SignatureCard";
import CancelApplyButton from "../../../components/button/CancelApplyButton";
import LetterHeader from "../../../components/letter/apply-update-header/LetterHeader";
import { apply } from "../../../service/LetterService";
import { useAuth } from "../../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/Store";
import { open } from "../../../store/slice/MessageSlice";
import { applying, stopApplying } from "../../../store/slice/LetterSlice";
import { getErrorMessage } from "../../../helper/AxiosHelper";
import CommunicationForm from "../../../components/letter/apply-update-form/CommunicationForm";

const CommunicationLetter = () => {
  const { apiClient } = useAuth();
  const [communicationLetter, setCommunicationLetter] =
    useState<ICommunicationLetterRequestDTO>({
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
    <CommunicationForm
      letter={communicationLetter}
      setLetter={setCommunicationLetter}
      onSubmit={submit}
    />
  );
};

export default CommunicationLetter;
