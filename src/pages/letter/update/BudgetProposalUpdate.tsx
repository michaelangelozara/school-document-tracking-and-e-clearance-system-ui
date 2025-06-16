import { useEffect, useState } from "react";
import {
  IBudgetProposalRequestDTO,
  IBudgetProposalResponseDTO,
} from "../../../types/letter/BudgetProposal";
import { TypeOfBaseLetter } from "../../../types/letter/BaseLetter";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/Store";
import { open } from "../../../store/slice/MessageSlice";
import { apply, findById, update } from "../../../service/LetterService";
import { applying, stopApplying } from "../../../store/slice/LetterSlice";
import { useAuth } from "../../../context/AuthContext";
import { getErrorMessage } from "../../../helper/AxiosHelper";
import BudgetProposalForm from "../../../components/letter/apply-update-form/BudgetProposalForm";
import { useParams } from "react-router-dom";
import { parseCurrency } from "../../../util/CurrencyUtil";
import Loading from "../../../components/shared/Loading";

const mapToBudgetProposal = (
  budgetProposal: IBudgetProposalResponseDTO
): IBudgetProposalRequestDTO => {
  return {
    base_letter_request_body_type: budgetProposal.type,
    type: budgetProposal.type,
    name_of_activity: budgetProposal.name_of_activity,
    venue: budgetProposal.venue,
    source_of_fund: budgetProposal.source_of_fund,
    amount_allotted: parseCurrency(budgetProposal.amount_allotted),
    expected_expenses: budgetProposal.expected_expenses.map((element) => ({
      name: element.name,
      amount: parseCurrency(element.amount),
    })),
  } as IBudgetProposalRequestDTO;
};

const BudgetProposalUpdate = () => {
  const [budgetProposal, setBudgetProposal] =
    useState<IBudgetProposalRequestDTO>({
      base_letter_request_body_type: TypeOfBaseLetter.BUDGET_PROPOSAL_LETTER,
      type: TypeOfBaseLetter.BUDGET_PROPOSAL_LETTER,
      name_of_activity: "",
      venue: "",
      source_of_fund: "",
      amount_allotted: 0,
      expected_expenses: [],
    });
  const [tempBudgetProposal, setTempBudgetProposal] =
    useState<IBudgetProposalRequestDTO>({
      base_letter_request_body_type: TypeOfBaseLetter.BUDGET_PROPOSAL_LETTER,
      type: TypeOfBaseLetter.BUDGET_PROPOSAL_LETTER,
      name_of_activity: "",
      venue: "",
      source_of_fund: "",
      amount_allotted: 0,
      expected_expenses: [],
    });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const reset = () => {
    setTempBudgetProposal(budgetProposal);
  };

  const { apiClient } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const { id } = useParams();

  const submit = async () => {
    if (id === undefined) {
      return;
    }

    try {
      dispatch(applying());
      const response = await update(tempBudgetProposal, id, apiClient);
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
        setBudgetProposal(
          mapToBudgetProposal(response as IBudgetProposalResponseDTO)
        );
        setTempBudgetProposal(
          mapToBudgetProposal(response as IBudgetProposalResponseDTO)
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
    <BudgetProposalForm
      budgetProposal={tempBudgetProposal}
      setBudgetProposal={setTempBudgetProposal}
      onSubmit={submit}
      mode="update"
    />
  );
};

export default BudgetProposalUpdate;
