import { IBaseLetterRequestDTO, IBaseLetterResponseDTO } from "./BaseLetter";
export interface IImplementationLetterInCampusRequestDTO
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

export interface IImplementationLetterInCampusResponseDTO
  extends IBaseLetterResponseDTO {
  name_of_activity: string;
  venue: string;
  date_and_time: string;
  expected_output: string;
  objective: string;
  projected_expenses: string;
  source_of_fund: string;
  rationale: string;
  participants: IImplementationLetterInCampusParticipant[];
}

export interface IImplementationLetterInCampusParticipant {
  id: string;
  name: string;
}
