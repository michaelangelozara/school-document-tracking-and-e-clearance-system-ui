import React, { useEffect, useState } from "react";
import { applying, stopApplying } from "../../../store/slice/LetterSlice";
import { findById, update } from "../../../service/LetterService";
import { getErrorMessage } from "../../../helper/AxiosHelper";
import {
  ISchoolFacilityRequestDTO,
  ISchoolFacilityResponseDTO,
} from "../../../types/letter/SchoolFacility";
import Loading from "../../../components/shared/Loading";
import SchoolFacilityForm from "../../../components/letter/apply-update-form/SchoolFacilityForm";
import { TypeOfBaseLetter } from "../../../types/letter/BaseLetter";
import { useAuth } from "../../../context/AuthContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/Store";
import { useParams } from "react-router-dom";
import { open } from "../../../store/slice/MessageSlice";
import { parseDateTimeForInput } from "../../../util/DateAndTimeUtils";

const mapToSchoolFacility = (
  schoolFacility: ISchoolFacilityResponseDTO
): ISchoolFacilityRequestDTO => {
  const facilityOrEquipments = schoolFacility.facility_or_equipments.map(
    (foe) => ({
      name: foe.name,
      quantity: foe.quantity,
    })
  );

  const date = parseDateTimeForInput(schoolFacility.date_and_time, "date");
  const time = parseDateTimeForInput(schoolFacility.date_and_time, "time");

  return {
    base_letter_request_body_type: schoolFacility.type,
    type: schoolFacility.type,
    venue: schoolFacility.venue,
    date: date,
    time: time,
    facility_or_equipments: facilityOrEquipments,
  } as ISchoolFacilityRequestDTO;
};

const SchoolFacilityUpdate = () => {
  const [schoolFacility, setSchoolFacility] =
    useState<ISchoolFacilityRequestDTO>({
      base_letter_request_body_type: TypeOfBaseLetter.SCHOOL_FACILITY_LETTER,
      type: TypeOfBaseLetter.SCHOOL_FACILITY_LETTER,
      venue: "",
      date: "",
      time: "",
      facility_or_equipments: [],
    });

  const [tempSchoolFacility, setTempSchoolFacility] =
    useState<ISchoolFacilityRequestDTO>({
      base_letter_request_body_type: TypeOfBaseLetter.SCHOOL_FACILITY_LETTER,
      type: TypeOfBaseLetter.SCHOOL_FACILITY_LETTER,
      venue: "",
      date: "",
      time: "",
      facility_or_equipments: [],
    });

  const reset = () => {
    setTempSchoolFacility(schoolFacility); // default
  };
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { apiClient } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const submit = async () => {
    if (id === undefined) {
      return;
    }

    try {
      dispatch(applying());
      const response = await update(tempSchoolFacility, id, apiClient);
      dispatch(open(response));
    } catch (error: any) {
      if (error.status === 400) {
        const errorMessage = getErrorMessage(error);
        dispatch(open(errorMessage));
      }
    } finally {
      dispatch(stopApplying());
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await findById(id, apiClient, controller);
        const responseImplementationLetter =
          response as ISchoolFacilityResponseDTO;
        setSchoolFacility(mapToSchoolFacility(responseImplementationLetter));
        setTempSchoolFacility(
          mapToSchoolFacility(responseImplementationLetter)
        );
      } catch (error: any) {
        if (
          error.status === 400 ||
          error.status === 404 ||
          error.status === 403
        ) {
          const errorMessage = getErrorMessage(error);
          dispatch(open(errorMessage));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SchoolFacilityForm
      schoolFacility={tempSchoolFacility}
      setSchoolFacility={setTempSchoolFacility}
      onSubmit={submit}
      mode="update"
    />
  );
};

export default SchoolFacilityUpdate;
