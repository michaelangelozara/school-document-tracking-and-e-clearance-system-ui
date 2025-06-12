import React, { useEffect, useState } from "react";
import { IPermitToEnterResponseDTO } from "../../../types/letter/PermitToEnter";
import Loading from "../../../components/shared/Loading";
import { useAuth } from "../../../context/AuthContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/Store";
import { useNavigate, useParams } from "react-router-dom";
import { getErrorMessage } from "../../../helper/AxiosHelper";
import { findById } from "../../../service/LetterService";
import { open } from "../../../store/slice/MessageSlice";
import { typeOfLetterEnumToStringConverter } from "../../../helper/LetterHelper";
import SignatoryCardContainer from "../../../components/signatory/SignatoryCardContainer";
import ReturnDownloadButton from "../../../components/button/ReturnDownloadButton";
import LetterRejectionCard from "../../../components/letter/LetterRejectionCard";
import { IBaseLetterSummaryProjection } from "../../../types/letter/BaseLetter";
import { useWebSocket } from "../../../context/WebsocketContext";
import { IMessage } from "@stomp/stompjs";
import BaseLetterWrapper from "./BaseLetterViewWrapper";

const PermitToEnterLetterView = () => {
  const [letter, setLetter] = useState<IPermitToEnterResponseDTO>({
    id: "",
    status: undefined,
    type: undefined,
    current_signatories: [],
    semester_and_school_year: "",
    created_at: "",
    last_modified_at: "",
    club_name: "",
    activity: "",
    date_and_time: "",
    participants: [],
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navivage = useNavigate();

  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const { apiClient } = useAuth();

  useEffect(() => {
    const controller = new AbortController();
    const fetchDate = async () => {
      try {
        const response = (await findById(
          id,
          apiClient,
          controller
        )) as IPermitToEnterResponseDTO;
        setLetter(response);
      } catch (error: any) {
        if (error.status === 404) {
          const errorMessage = getErrorMessage(error);
          dispatch(open(errorMessage));
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchDate();

    return () => controller.abort();
  }, [id]);

  const updateLetter = (updatedLetter: IBaseLetterSummaryProjection) => {
    setLetter((prev) => ({
      ...prev,
      status: updatedLetter.status,
      last_modified_at: updatedLetter.last_modified_at,
    }));
  };

  const { subscribe } = useWebSocket();
  useEffect(() => {
    subscribe("/user/queue/letter/update", (msg: IMessage) => {
      updateLetter(JSON.parse(msg.body) as IBaseLetterSummaryProjection);
    });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return <BaseLetterWrapper<IPermitToEnterResponseDTO> letter={letter} />;
};

export default PermitToEnterLetterView;
