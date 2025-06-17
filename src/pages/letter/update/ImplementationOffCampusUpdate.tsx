import React, { useEffect, useRef, useState } from "react";
import ImplementationOffCampusForm from "../../../components/letter/apply-update-form/ImplementationOffCampusForm";
import { applying, stopApplying } from "../../../store/slice/LetterSlice";
import { findById, update } from "../../../service/LetterService";
import { getErrorMessage } from "../../../helper/AxiosHelper";
import {
  ICommittee,
  IImplementationLetterOffCampusRequestDTO,
} from "../../../types/letter/ImplementationLetterOffCampus";
import { TypeOfBaseLetter } from "../../../types/letter/BaseLetter";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/Store";
import { useAuth } from "../../../context/AuthContext";
import { open } from "../../../store/slice/MessageSlice";
import { IImplementationLetterOffCampusResponseDTO } from "../../../types/letter/ImplementationLetterOffCampus";
import { parseDateTimeForInput } from "../../../util/DateAndTimeUtils";
import Loading from "../../../components/shared/Loading";

const mapToImplementationLetter = (
  implementationLetter: IImplementationLetterOffCampusResponseDTO,
  committeeMap: React.RefObject<Map<string, ICommittee>>
): IImplementationLetterOffCampusRequestDTO => {
  //    date_of_implementation: string; // this must be formatted like this (i.g. yyyy-mm-dd)
  //   time_of_implementation: string; // this must be formatted like this (i.g. 23:59)
  //   program_or_flow: string;
  //   committees: ICommittee[];

  const date = parseDateTimeForInput(
    implementationLetter.date_and_time,
    "date"
  );
  const time = parseDateTimeForInput(
    implementationLetter.date_and_time,
    "time"
  );
  const committees = implementationLetter.committees.map((committee) => {
    const mappedCommittee = {
      student_id: committee.id,
      activity: committee.activity,
      objective: committee.objective,
      expected_output: committee.expected_output,
    };

    committeeMap.current.set(committee.id, mappedCommittee);
    return mappedCommittee;
  });

  return {
    base_letter_request_body_type: implementationLetter.type,
    type: implementationLetter.type,
    name_of_activity: implementationLetter.name_of_activity,
    description: implementationLetter.description,
    reason: implementationLetter.reason,
    date_of_implementation: date,
    time_of_implementation: time,
    program_or_flow: implementationLetter.program_or_flow,
    committees: committees,
  } as IImplementationLetterOffCampusRequestDTO;
};

const ImplementationOffCampusUpdate = () => {
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

  const [tempImplementationLetter, setTempImplementationLetter] =
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const committeeMap = useRef<Map<string, ICommittee>>(new Map());

  const reset = () => {
    setTempImplementationLetter(implementationLetter); // default
  };

  const dispatch = useDispatch<AppDispatch>();
  const { apiClient } = useAuth();
  const { id } = useParams();
  const submit = async () => {
    if (id === undefined) {
      return;
    }
    try {
      dispatch(applying());
      const response = await update(tempImplementationLetter, id, apiClient);
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

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await findById(id, apiClient, controller);
        const responseImplementationLetter =
          response as IImplementationLetterOffCampusResponseDTO;
        setImplementationLetter(
          mapToImplementationLetter(responseImplementationLetter, committeeMap)
        );
        setTempImplementationLetter(
          mapToImplementationLetter(responseImplementationLetter, committeeMap)
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
    <ImplementationOffCampusForm
      implementationLetter={tempImplementationLetter}
      setImplementationLetter={setTempImplementationLetter}
      onSubmit={submit}
      committeeMap={committeeMap}
      mode="update"
    />
  );
};

export default ImplementationOffCampusUpdate;
