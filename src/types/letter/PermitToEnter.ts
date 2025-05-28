import { IBaseLetterRequestDTO, IBaseLetterResponseDTO } from "./BaseLetter";

export interface IPermitToEnter extends IBaseLetterRequestDTO {
  activity: string;
  date: string; // this must be formatted like this (i.g. yyyy-mm-dd)
  time: string; // this must be formatted like this (i.g. hh:mm/23:59)
  participant_ids: string[];
}

export interface IPermitToEnterResponseDTO extends IBaseLetterResponseDTO {
  activity: string;
  date_and_time: string;
  participants: IPermitToEnterParticipantResponseDTO[];
}

export interface IPermitToEnterParticipantResponseDTO {
  id: string;
  name: string;
}
