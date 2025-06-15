import {
  IBaseLetterApplyRequestDTO,
  IBaseLetterResponseDTO,
} from "./BaseLetter";

export interface IBudgetProposalApplyRequestDTO
  extends IBaseLetterApplyRequestDTO {
  name_of_activity: string;
  venue: string;
  source_of_fund: string;
  amount_allotted: number;
  expected_expenses: IExpectedExpensesRequestDTO[];
}

export interface IExpectedExpensesRequestDTO {
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
