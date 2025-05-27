import { IBaseLetterRequestDTO } from "./BaseLetter";
export interface IImplementationLetterInCampusRequest
  extends IBaseLetterRequestDTO {
  name_of_activity: string;
  venue: string;
  date: string;
  time: string;
  expected_output: string;
  objective: string;
  projected_expenses: string;
  source_of_fund: string;
  rationale: string;
  participant_ids: string[];
}
