import { useRef, useState } from "react";
import { IPermitToEnterApplyRequestDTO } from "../../../types/letter/PermitToEnter";
import { TypeOfBaseLetter } from "../../../types/letter/BaseLetter";
import { IUserNameAndIdOnly } from "../../../types/user/User";
import { applying, stopApplying } from "../../../store/slice/LetterSlice";
import { getErrorMessage } from "../../../helper/AxiosHelper";
import { apply } from "../../../service/LetterService";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/Store";
import { open } from "../../../store/slice/MessageSlice";
import { useAuth } from "../../../context/AuthContext";
import PermitToEnterForm from "../../../components/letter/apply-update-form/PermitToEnterForm";

const PermitToEnter = () => {
  const [permitToEnter, setPermitToEnter] =
    useState<IPermitToEnterApplyRequestDTO>({
      base_letter_request_body_type: TypeOfBaseLetter.PERMIT_TO_ENTER_LETTER,
      type: TypeOfBaseLetter.PERMIT_TO_ENTER_LETTER,
      activity: "",
      date: "",
      time: "",
      participant_ids: [],
    });

  const studentMap = useRef<Map<string, IUserNameAndIdOnly>>(new Map()); // this holds all the selected participants

  const reset = () => {
    setPermitToEnter({
      base_letter_request_body_type: TypeOfBaseLetter.PERMIT_TO_ENTER_LETTER,
      type: TypeOfBaseLetter.PERMIT_TO_ENTER_LETTER,
      activity: "",
      date: "",
      time: "",
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
      const response = await apply(permitToEnter, apiClient);
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
    <PermitToEnterForm
      permitToEnter={permitToEnter}
      setPermitToEnter={setPermitToEnter}
      studentMap={studentMap}
      onSubmit={submit}
    />
  );
};

export default PermitToEnter;
