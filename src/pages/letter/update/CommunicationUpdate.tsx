import React, { useEffect, useState } from "react";
import CommunicationForm from "../../../components/letter/apply-update-form/CommunicationForm";
import { applying, stopApplying } from "../../../store/slice/LetterSlice";
import { getErrorMessage } from "../../../helper/AxiosHelper";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/Store";
import { TypeOfBaseLetter } from "../../../types/letter/BaseLetter";
import {
  ICommunicationLetterRequestDTO,
  ICommunicationLetterResponseDTO,
  TypeOfCommunicationLetter,
} from "../../../types/letter/CommunicationLetter";
import { useAuth } from "../../../context/AuthContext";
import { open } from "../../../store/slice/MessageSlice";
import { useParams } from "react-router-dom";
import { findById, update } from "../../../service/LetterService";
import { parseDateTimeForInput } from "../../../util/DateAndTimeUtils";
import Loading from "../../../components/shared/Loading";

const mapToCommunication = (
  communicationLetter: ICommunicationLetterResponseDTO
): ICommunicationLetterRequestDTO => {
  const date = parseDateTimeForInput(communicationLetter.date, "date");
  return {
    base_letter_request_body_type: communicationLetter.type,
    type: communicationLetter.type,
    date: date,
    content: communicationLetter.content,
    type_of_communication_letter:
      communicationLetter.type_of_communication_letter,
  } as ICommunicationLetterRequestDTO;
};

const CommunicationUpdate = () => {
  const [communicationLetter, setCommunicationLetter] =
    useState<ICommunicationLetterRequestDTO>({
      base_letter_request_body_type: TypeOfBaseLetter.COMMUNICATION_LETTER,
      type: TypeOfBaseLetter.COMMUNICATION_LETTER,
      date: "",
      content: "",
      type_of_communication_letter: TypeOfCommunicationLetter.IN_CAMPUS,
    });
  const [tempCommunicationLetter, setTempCommunicationLetter] =
    useState<ICommunicationLetterRequestDTO>({
      base_letter_request_body_type: TypeOfBaseLetter.COMMUNICATION_LETTER,
      type: TypeOfBaseLetter.COMMUNICATION_LETTER,
      date: "",
      content: "",
      type_of_communication_letter: TypeOfCommunicationLetter.IN_CAMPUS,
    });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { apiClient } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const reset = () => {
    setTempCommunicationLetter(communicationLetter);
  };
  const { id } = useParams();

  const submit = async () => {
    if (id === undefined) {
      return;
    }

    try {
      dispatch(applying());
      const response = await update(tempCommunicationLetter, id, apiClient);
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

        setCommunicationLetter(
          mapToCommunication(response as ICommunicationLetterResponseDTO)
        );
        setTempCommunicationLetter(
          mapToCommunication(response as ICommunicationLetterResponseDTO)
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
    <CommunicationForm
      letter={tempCommunicationLetter}
      setLetter={setTempCommunicationLetter}
      onSubmit={submit}
      mode="update"
    />
  );
};

export default CommunicationUpdate;
