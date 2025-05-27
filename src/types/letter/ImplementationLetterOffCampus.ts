import { IBaseLetterRequestDTO } from "./BaseLetter";

export interface IImplementationLetterOffCampus extends IBaseLetterRequestDTO {
  name_of_activity: string;
  description: string;
  reason: string;
  date_of_implementation: string; // this must be formatted like this (i.g. yyyy-mm-dd)
  time_of_implementation: string; // this must be formatted like this (i.g. 23:59)
  program_or_flow: string;
  committees: ICommittee[];
}

export interface ICommittee {
  student_id: string;
  activity: string;
  objective: string;
  expected_output: string;
}
