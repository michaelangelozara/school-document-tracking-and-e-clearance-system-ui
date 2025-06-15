import { useState } from "react";
import { ISchoolFacilityApplyRequestDTO } from "../../../types/letter/SchoolFacility";
import { TypeOfBaseLetter } from "../../../types/letter/BaseLetter";
import { useAuth } from "../../../context/AuthContext";
import { AppDispatch, RootState } from "../../../store/Store";
import { useDispatch, useSelector } from "react-redux";
import { open } from "../../../store/slice/MessageSlice";
import { applying, stopApplying } from "../../../store/slice/LetterSlice";
import { getErrorMessage } from "../../../helper/AxiosHelper";
import { apply } from "../../../service/LetterService";
import SchoolFacilityForm from "../../../components/letter/apply-update-form/SchoolFacilityForm";

const SchoolFacility = () => {
  const [schoolFacility, setSchoolFacility] =
    useState<ISchoolFacilityApplyRequestDTO>({
      base_letter_request_body_type: TypeOfBaseLetter.SCHOOL_FACILITY_LETTER,
      type: TypeOfBaseLetter.SCHOOL_FACILITY_LETTER,
      venue: "",
      date: "",
      time: "",
      facility_or_equipments: [],
    });

  const reset = () => {
    setSchoolFacility({
      base_letter_request_body_type: TypeOfBaseLetter.SCHOOL_FACILITY_LETTER,
      type: TypeOfBaseLetter.SCHOOL_FACILITY_LETTER,
      venue: "",
      date: "",
      time: "",
      facility_or_equipments: [],
    });
  };
  const { apiClient } = useAuth();

  const { hasESignature } = useSelector((state: RootState) => state.eSignature);
  const dispatch = useDispatch<AppDispatch>();

  const submit = async () => {
    if (!hasESignature) {
      dispatch(open("Please attach you E-Signature."));
      return;
    }

    try {
      dispatch(applying());
      const response = await apply(schoolFacility, apiClient);
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
    <SchoolFacilityForm
      schoolFacility={schoolFacility}
      setSchoolFacility={setSchoolFacility}
      onSubmit={submit}
    />
  );
};

export default SchoolFacility;
