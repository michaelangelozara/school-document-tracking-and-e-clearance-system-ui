export enum TypeOfBaseLetter {
  COMMUNICATION_LETTER = "COMMUNICATION_LETTER",
  BUDGET_PROPOSAL_LETTER = "BUDGET_PROPOSAL_LETTER",
  IMPLEMENTATION_LETTER_IN_CAMPUS = "IMPLEMENTATION_LETTER_IN_CAMPUS",
  IMPLEMENTATION_LETTER_OFF_CAMPUS = "IMPLEMENTATION_LETTER_OFF_CAMPUS",
  PERMIT_TO_ENTER_LETTER = "PERMIT_TO_ENTER_LETTER",
  SCHOOL_FACILITY_LETTER = "SCHOOL_FACILITY_LETTER",
}
export interface BaseLetter {
  base_letter_request_body_type: TypeOfBaseLetter;
  type: TypeOfBaseLetter;
}

export enum StatusOfBaseLetter {
  DRAFT = "DRAFT",
  PENDING = "PENDING",
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
