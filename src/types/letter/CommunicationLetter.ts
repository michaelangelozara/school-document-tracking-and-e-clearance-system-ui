import {
  IBaseLetterApplyRequestDTO,
  IBaseLetterResponseDTO,
} from "./BaseLetter";

export enum TypeOfCommunicationLetter {
  IN_CAMPUS = "IN_CAMPUS",
  OFF_CAMPUS = "OFF_CAMPUS",
}

export interface ICommunicationLetterApplyRequestDTO
  extends IBaseLetterApplyRequestDTO {
  date: string; // this must be formatted like this (i.g. yyyy-mm-dd)
  content: string;
  type_of_communication_letter: TypeOfCommunicationLetter;
}

export interface ICommunicationLetterResponseDTO
  extends IBaseLetterResponseDTO {
  date: string;
  content: string;
  type_of_communication_letter: TypeOfCommunicationLetter | undefined;
}
