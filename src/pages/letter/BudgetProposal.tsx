import React, { useState } from "react";
import { IBudgetProposalRequest } from "../../types/letter/BudgetProposal";

const BudgetProposal = () => {
  const [budgetProposal, setBudgetProposal] =
    useState<IBudgetProposalRequest | null>(null);

  return <div className="bg-red-700">BudgetProposal</div>;
};

export default BudgetProposal;
