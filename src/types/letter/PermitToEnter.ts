import { BaseLetter } from "./BaseLetter";

export interface IPermitToEnter extends BaseLetter {
  activity: string;
  date: string; // this must be formatted like this (i.g. yyyy-mm-dd)
  time: string; // this must be formatted like this (i.g. hh:mm/23:59)
  participant_ids: string[];
}
