import { BaseLetter } from "./BaseLetter";

enum TypeOfCommunicationLetter {
  IN_CAMPUS = "IN_CAMPUS",
  OFF_CAMPUS = "OFF_CAMPUS",
}

export interface ICommunicationLetterRequest extends BaseLetter {
  date: string; // this must be formatted like this (i.g. yyyy-mm-dd)
  content: string;
  type_of_communication_letter: TypeOfCommunicationLetter;
}
