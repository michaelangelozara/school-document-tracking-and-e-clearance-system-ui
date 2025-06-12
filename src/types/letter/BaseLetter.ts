import { ISignatoryResponseDTO } from "../signatory/Signatory";

export enum TypeOfBaseLetter {
  COMMUNICATION_LETTER = "COMMUNICATION_LETTER",
  BUDGET_PROPOSAL_LETTER = "BUDGET_PROPOSAL_LETTER",
  IMPLEMENTATION_LETTER_IN_CAMPUS = "IMPLEMENTATION_LETTER_IN_CAMPUS",
  IMPLEMENTATION_LETTER_OFF_CAMPUS = "IMPLEMENTATION_LETTER_OFF_CAMPUS",
  PERMIT_TO_ENTER_LETTER = "PERMIT_TO_ENTER_LETTER",
  SCHOOL_FACILITY_LETTER = "SCHOOL_FACILITY_LETTER",
}

export interface IBaseLetterRequestDTO {
  base_letter_request_body_type: TypeOfBaseLetter;
  type: TypeOfBaseLetter;
}

export enum StatusOfBaseLetter {
  DRAFT = "DRAFT",
  IN_PROGRESS = "IN_PROGRESS",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  EXPIRED = "EXPIRED",
  CANCELLED = "CANCELLED",
}

export interface IBaseLetterSummaryProjection {
  id: string;
  status: StatusOfBaseLetter | undefined;
  type: TypeOfBaseLetter | undefined;
  created_at: string;
  last_modified_at: string;
}

export interface IBaseLetterFilterBody {
  status: string;
  type: string;
}

export interface IBaseLetterResponseDTO {
  id: string;
  status: StatusOfBaseLetter | undefined;
  type: TypeOfBaseLetter | undefined;
  current_signatories: ISignatoryResponseDTO[];
  semester_and_school_year: string;
  created_at: string;
  last_modified_at: string;
  club_name: string;
}

export interface IRejectionResponseDTO {
  rejection_by: string;
  reason_of_rejection: string;
}
