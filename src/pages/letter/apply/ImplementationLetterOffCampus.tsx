import { useRef, useState } from "react";
import {
  ICommittee,
  IImplementationLetterOffCampusRequestDTO,
} from "../../../types/letter/ImplementationLetterOffCampus";
import { TypeOfBaseLetter } from "../../../types/letter/BaseLetter";
import { useAuth } from "../../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/Store";
import { applying, stopApplying } from "../../../store/slice/LetterSlice";
import { open } from "../../../store/slice/MessageSlice";
import { apply } from "../../../service/LetterService";
import { getErrorMessage } from "../../../helper/AxiosHelper";
import ImplementationOffCampusForm from "../../../components/letter/apply-update-form/ImplementationOffCampusForm";

const ImplementationLetterOffCampus = () => {
  const [implementationLetter, setImplementationLetter] =
    useState<IImplementationLetterOffCampusRequestDTO>({
      base_letter_request_body_type:
        TypeOfBaseLetter.IMPLEMENTATION_LETTER_OFF_CAMPUS,
      type: TypeOfBaseLetter.IMPLEMENTATION_LETTER_OFF_CAMPUS,
      name_of_activity: "",
      description: "",
      reason: "",
      date_of_implementation: "",
      time_of_implementation: "",
      program_or_flow: "",
      committees: [],
    });

  const committeeMap = useRef<Map<string, ICommittee>>(new Map());

  const reset = () => {
    setImplementationLetter({
      base_letter_request_body_type:
        TypeOfBaseLetter.IMPLEMENTATION_LETTER_OFF_CAMPUS,
      type: TypeOfBaseLetter.IMPLEMENTATION_LETTER_OFF_CAMPUS,
      name_of_activity: "",
      description: "",
      reason: "",
      date_of_implementation: "",
      time_of_implementation: "",
      program_or_flow: "",
      committees: [],
    });
  };

  const { hasESignature } = useSelector((state: RootState) => state.eSignature);
  const dispatch = useDispatch<AppDispatch>();
  const { apiClient } = useAuth();

  const submit = async () => {
    if (!hasESignature) {
      dispatch(open("Please attach you E-Signature."));
      return;
    }
    try {
      dispatch(applying());
      const response = await apply(implementationLetter, apiClient);
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
    <ImplementationOffCampusForm
      implementationLetter={implementationLetter}
      setImplementationLetter={setImplementationLetter}
      committeeMap={committeeMap}
      onSubmit={submit}
    />
  );
};

export default ImplementationLetterOffCampus;
