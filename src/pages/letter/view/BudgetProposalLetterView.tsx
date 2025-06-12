import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../../store/Store";
import { useAuth } from "../../../context/AuthContext";
import { findById } from "../../../service/LetterService";
import { IBudgetProposalResponseDTO } from "../../../types/letter/BudgetProposal";
import { getErrorMessage } from "../../../helper/AxiosHelper";
import { open } from "../../../store/slice/MessageSlice";
import Loading from "../../../components/shared/Loading";
import { useWebSocket } from "../../../context/WebsocketContext";
import { IBaseLetterSummaryProjection } from "../../../types/letter/BaseLetter";
import { IMessage } from "@stomp/stompjs";
import BaseLetterWrapper from "./BaseLetterViewWrapper";

const BudgetProposalLetterView = () => {
  const [letter, setLetter] = useState<IBudgetProposalResponseDTO>({
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
    source_of_fund: "",
    amount_allotted: "",
    expected_expenses: [],
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
        )) as IBudgetProposalResponseDTO;
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

  return <BaseLetterWrapper<IBudgetProposalResponseDTO> letter={letter} />;
};

export default BudgetProposalLetterView;
