import { IBaseLetterRequestDTO, IBaseLetterResponseDTO } from "./BaseLetter";

export interface IBudgetProposalRequest extends IBaseLetterRequestDTO {
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

export interface IBudgetProposalResponseDTO extends IBaseLetterResponseDTO {
  name_of_activity: string;
  venue: string;
  source_of_fund: string;
  amount_allotted: string;
  expected_expenses: IExpectedExpensesResponseDTO[];
}

export interface IExpectedExpensesResponseDTO {
  id: string;
  name: string;
  amount: string;
}
