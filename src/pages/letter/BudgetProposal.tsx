import { useState } from "react";
import { IBudgetProposalRequestDTO } from "../../types/letter/BudgetProposal";
import { TypeOfBaseLetter } from "../../types/letter/BaseLetter";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import { open } from "../../store/slice/MessageSlice";
import { apply } from "../../service/LetterService";
import { applying, stopApplying } from "../../store/slice/LetterSlice";
import { useAuth } from "../../context/AuthContext";
import { getErrorMessage } from "../../helper/AxiosHelper";
import BudgetProposalForm from "../../components/letter/apply-update-form/BudgetProposalForm";

const BudgetProposal = () => {
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

  const reset = () => {
    setBudgetProposal({
      base_letter_request_body_type: TypeOfBaseLetter.BUDGET_PROPOSAL_LETTER,
      type: TypeOfBaseLetter.BUDGET_PROPOSAL_LETTER,
      name_of_activity: "",
      venue: "",
      source_of_fund: "",
      amount_allotted: 0,
      expected_expenses: [],
    });
  };

  const { apiClient } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const { hasESignature } = useSelector((state: RootState) => state.eSignature);

  const submit = async () => {
    if (!hasESignature) {
      dispatch(open("Please attach you E-Signature."));
      return;
    }

    try {
      dispatch(applying());
      const response = await apply(budgetProposal, apiClient);
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

  return (
    <BudgetProposalForm
      budgetProposal={budgetProposal}
      setBudgetProposal={setBudgetProposal}
      onSubmit={submit}
    />
  );
};

export default BudgetProposal;
