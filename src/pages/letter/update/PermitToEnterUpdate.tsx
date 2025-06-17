import React, { useEffect, useRef, useState } from "react";
import Loading from "../../../components/shared/Loading";
import { IUserNameAndIdOnly } from "../../../types/user/User";
import { TypeOfBaseLetter } from "../../../types/letter/BaseLetter";
import { AppDispatch } from "../../../store/Store";
import { useDispatch } from "react-redux";
import { useAuth } from "../../../context/AuthContext";
import { useParams } from "react-router-dom";
import { applying, stopApplying } from "../../../store/slice/LetterSlice";
import { findById, update } from "../../../service/LetterService";
import { open } from "../../../store/slice/MessageSlice";
import { getErrorMessage } from "../../../helper/AxiosHelper";
import {
  IPermitToEnterRequestDTO,
  IPermitToEnterResponseDTO,
} from "../../../types/letter/PermitToEnter";
import PermitToEnterForm from "../../../components/letter/apply-update-form/PermitToEnterForm";
import { parseDateTimeForInput } from "../../../util/DateAndTimeUtils";

const mapToPermitToEnter = (
  permitToEnter: IPermitToEnterResponseDTO,
  studentMap: React.RefObject<Map<string, IUserNameAndIdOnly>>
): IPermitToEnterRequestDTO => {
  const participants = permitToEnter.participants.map((participant) => {
    studentMap.current.set(participant.id, {
      id: participant.id,
      name: participant.name,
      profile: participant.profile,
    });
    return participant.id;
  });

  const date = parseDateTimeForInput(permitToEnter.date_and_time, "date");
  const time = parseDateTimeForInput(permitToEnter.date_and_time, "time");
  return {
    base_letter_request_body_type: permitToEnter.type,
    type: permitToEnter.type,
    activity: permitToEnter.activity,
    date: date,
    time: time,
    participant_ids: participants,
  } as IPermitToEnterRequestDTO;
};

const PermitToEnterUpdate = () => {
  const [permitToEnter, setPermitToEnter] = useState<IPermitToEnterRequestDTO>({
    base_letter_request_body_type: TypeOfBaseLetter.PERMIT_TO_ENTER_LETTER,
    type: TypeOfBaseLetter.PERMIT_TO_ENTER_LETTER,
    activity: "",
    date: "",
    time: "",
    participant_ids: [],
  });
  const [tempPermitToEnter, setTempPermitToEnter] =
    useState<IPermitToEnterRequestDTO>({
      base_letter_request_body_type: TypeOfBaseLetter.PERMIT_TO_ENTER_LETTER,
      type: TypeOfBaseLetter.PERMIT_TO_ENTER_LETTER,
      activity: "",
      date: "",
      time: "",
      participant_ids: [],
    });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const studentMap = useRef<Map<string, IUserNameAndIdOnly>>(new Map()); // this holds all the selected participants

  const reset = () => {
    setTempPermitToEnter(permitToEnter);
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
      const response = await update(tempPermitToEnter, id, apiClient);
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
          response as IPermitToEnterResponseDTO;
        setPermitToEnter(
          mapToPermitToEnter(responseImplementationLetter, studentMap)
        );
        setTempPermitToEnter(
          mapToPermitToEnter(responseImplementationLetter, studentMap)
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
    <PermitToEnterForm
      permitToEnter={tempPermitToEnter}
      setPermitToEnter={setTempPermitToEnter}
      studentMap={studentMap}
      onSubmit={submit}
      mode="update"
    />
  );
};

export default PermitToEnterUpdate;
