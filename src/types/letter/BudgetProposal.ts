import { BaseLetter } from "./BaseLetter";

export interface IBudgetProposalRequest extends BaseLetter {
  name_of_activity: string;
  venue: string;
  source_of_fund: string;
  amount_allotted: number;
  expected_expenses: IExpectedExpensesRequest[];
}

export interface IExpectedExpensesRequest {
  name: string;
  amount: number;
}
