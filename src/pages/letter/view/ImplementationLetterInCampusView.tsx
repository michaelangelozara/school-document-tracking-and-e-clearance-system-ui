import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../../store/Store";
import { useAuth } from "../../../context/AuthContext";
import { findById } from "../../../service/LetterService";
import { getErrorMessage } from "../../../helper/AxiosHelper";
import { open } from "../../../store/slice/MessageSlice";
import Loading from "../../../components/shared/Loading";
import { IImplementationLetterInCampusResponseDTO } from "../../../types/letter/ImplementationLetterInCampus";
import { IBaseLetterSummaryProjection } from "../../../types/letter/BaseLetter";
import { useWebSocket } from "../../../context/WebsocketContext";
import { IMessage } from "@stomp/stompjs";
import BaseLetterWrapper from "./BaseLetterViewWrapper";

const ImplementationLetterInCampusView = () => {
  const [letter, setLetter] =
    useState<IImplementationLetterInCampusResponseDTO>({
      id: "",
      status: undefined,
      type: undefined,
      current_signatories: [],
      semester_and_school_year: "",
      created_at: "",
      last_modified_at: "",
      club_name: "",
      name_of_activity: "",
      venue: "",
      date_and_time: "",
      expected_output: "",
      objective: "",
      projected_expenses: "",
      source_of_fund: "",
      rationale: "",
      participants: [],
    });
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
        )) as IImplementationLetterInCampusResponseDTO;
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

  return (
    <BaseLetterWrapper<IImplementationLetterInCampusResponseDTO>
      letter={letter}
    />
  );
};

export default ImplementationLetterInCampusView;
