import { useRef, useState } from "react";
import { IImplementationLetterInCampusRequestDTO } from "../../types/letter/ImplementationLetterInCampus";
import { TypeOfBaseLetter } from "../../types/letter/BaseLetter";
import { IUserNameAndIdOnly } from "../../types/user/User";
import { useAuth } from "../../context/AuthContext";
import { AppDispatch, RootState } from "../../store/Store";
import { useDispatch, useSelector } from "react-redux";
import { open } from "../../store/slice/MessageSlice";
import { applying, stopApplying } from "../../store/slice/LetterSlice";
import { getErrorMessage } from "../../helper/AxiosHelper";
import { apply } from "../../service/LetterService";
import ImplementationInCampusForm from "../../components/letter/apply-update-form/ImplementationInCampusForm";

const ImplementationLetterInCampus = () => {
  const [implementationLetter, setImplementationLetter] =
    useState<IImplementationLetterInCampusRequestDTO>({
      base_letter_request_body_type:
        TypeOfBaseLetter.IMPLEMENTATION_LETTER_IN_CAMPUS,
      type: TypeOfBaseLetter.IMPLEMENTATION_LETTER_IN_CAMPUS,
      name_of_activity: "",
      venue: "",
      date: "",
      time: "",
      expected_output: "",
      objective: "",
      projected_expenses: "",
      source_of_fund: "",
      rationale: "",
      participant_ids: [],
    });

  const studentMap = useRef<Map<string, IUserNameAndIdOnly>>(new Map()); // this holds all the selected participants

  const reset = () => {
    setImplementationLetter({
      base_letter_request_body_type:
        TypeOfBaseLetter.IMPLEMENTATION_LETTER_IN_CAMPUS,
      type: TypeOfBaseLetter.IMPLEMENTATION_LETTER_IN_CAMPUS,
      name_of_activity: "",
      venue: "",
      date: "",
      time: "",
      expected_output: "",
      objective: "",
      projected_expenses: "",
      source_of_fund: "",
      rationale: "",
      participant_ids: [],
    });
    studentMap.current = new Map();
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
    <ImplementationInCampusForm
      implementationLetter={implementationLetter}
      setImplementationLetter={setImplementationLetter}
      studentMap={studentMap}
      onsubmit={submit}
    />
  );
};

export default ImplementationLetterInCampus;
