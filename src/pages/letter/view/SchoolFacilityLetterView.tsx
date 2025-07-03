import React, { useEffect, useState } from "react";
import Loading from "../../../components/shared/Loading";
import { getErrorMessage } from "../../../helper/AxiosHelper";
import { ISchoolFacilityResponseDTO } from "../../../types/letter/SchoolFacility";
import { findById } from "../../../service/LetterService";
import { useAuth } from "../../../context/AuthContext";
import { AppDispatch } from "../../../store/Store";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { open } from "../../../store/slice/MessageSlice";
import { typeOfLetterEnumToStringConverter } from "../../../helper/LetterHelper";
import LetterSignatoryCardContainer from "../../../components/letter/signatory/LetterSignatoryCardContainer";
import ReturnDownloadButton from "../../../components/button/ReturnDownloadButton";
import LetterRejectionCard from "../../../components/letter/LetterRejectionCard";
import { useWebSocket } from "../../../context/WebsocketContext";
import { IBaseLetterSummaryProjection } from "../../../types/letter/BaseLetter";
import { IMessage } from "@stomp/stompjs";
import BaseLetterWrapper from "./BaseLetterViewWrapper";

const SchoolFacilityLetterView = () => {
  const [letter, setLetter] = useState<ISchoolFacilityResponseDTO>({
    id: "",
    status: undefined,
    type: undefined,
    current_signatories: [],
    semester_and_school_year: "",
    created_at: "",
    last_modified_at: "",
    club_name: "",
    venue: "",
    date_and_time: "",
    facility_or_equipments: [],
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
        )) as ISchoolFacilityResponseDTO;
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
  return <BaseLetterWrapper<ISchoolFacilityResponseDTO> letter={letter} />;
};

export default SchoolFacilityLetterView;
