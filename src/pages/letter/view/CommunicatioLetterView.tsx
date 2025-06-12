import { ChangeEvent, useEffect, useState } from "react";
import {
  ICommunicationLetterResponseDTO,
  TypeOfCommunicationLetter,
} from "../../../types/letter/CommunicationLetter";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import ReturnDownloadButton from "../../../components/button/ReturnDownloadButton";
import Loading from "../../../components/shared/Loading";
import { findById, rejectLetterById } from "../../../service/LetterService";
import { typeOfLetterEnumToStringConverter } from "../../../helper/LetterHelper";
import SignatoryCardContainer from "../../../components/signatory/SignatoryCardContainer";
import { getErrorMessage } from "../../../helper/AxiosHelper";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/Store";
import { open } from "../../../store/slice/MessageSlice";
import { useWebSocket } from "../../../context/WebsocketContext";
import { IMessage } from "@stomp/stompjs";
import { IBaseLetterSummaryProjection } from "../../../types/letter/BaseLetter";
import LetterRejectButton from "../../../components/button/LetterRejectButton";
import LetterRejectionModal from "../../../components/letter/LetterRejectionModal";
import BaseLetterWrapper from "./BaseLetterViewWrapper";

const TypeOfCommunicationLetterEnumConverter = (
  type: TypeOfCommunicationLetter | undefined
): string => {
  return type === TypeOfCommunicationLetter.IN_CAMPUS
    ? "In-Campus"
    : "Off-Campus";
};

const CommunicatioLetterView = () => {
  const [letter, setLetter] = useState<ICommunicationLetterResponseDTO>({
    id: "",
    status: undefined,
    type: undefined,
    current_signatories: [],
    semester_and_school_year: "",
    created_at: "",
    last_modified_at: "",
    club_name: "",
    date: "",
    content: "",
    type_of_communication_letter: undefined,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navivage = useNavigate();

  const [isRejecting, setIsRejecting] = useState<boolean>();
  const [reasonOfRejection, setReasonOfRejection] = useState<string | null>(
    null
  );

  const reasonOfRejectionHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReasonOfRejection(e.target.value);
  };

  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const { apiClient, user } = useAuth();
  useEffect(() => {
    const controller = new AbortController();
    const fetchDate = async () => {
      try {
        const response = (await findById(
          id,
          apiClient,
          controller
        )) as ICommunicationLetterResponseDTO;
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

  const rejectionConfirmed = async () => {
    try {
      const response = await rejectLetterById(
        apiClient,
        letter.id,
        reasonOfRejection
      );
      dispatch(open(response));
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
      setIsRejecting(false);
      setReasonOfRejection(null);
    }
  };

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

  return <BaseLetterWrapper<ICommunicationLetterResponseDTO> letter={letter} />;
};

export default CommunicatioLetterView;
