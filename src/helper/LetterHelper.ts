import { TypeOfBaseLetter } from "../types/letter/BaseLetter";

export const typeOfLetterEnumToStringURLConverter = (
  type: string | undefined
): string => {
  if (type === TypeOfBaseLetter.COMMUNICATION_LETTER) {
    return "communication";
  } else if (type === TypeOfBaseLetter.BUDGET_PROPOSAL_LETTER) {
    return "budget-proposal";
  } else if (type === TypeOfBaseLetter.IMPLEMENTATION_LETTER_IN_CAMPUS) {
    return "implementation-letter-in-campus";
  } else if (type === TypeOfBaseLetter.IMPLEMENTATION_LETTER_OFF_CAMPUS) {
    return "implementation-letter-off-campus";
  } else if (type === TypeOfBaseLetter.PERMIT_TO_ENTER_LETTER) {
    return "permit-to-enter";
  } else if (type === TypeOfBaseLetter.SCHOOL_FACILITY_LETTER) {
    return "school-facility";
  }

  return "Unknown";
};

export const typeOfLetterEnumToStringConverter = (
  type: string | undefined
): string => {
  if (type === TypeOfBaseLetter.COMMUNICATION_LETTER) {
    return "Communication Letter";
  } else if (type === TypeOfBaseLetter.BUDGET_PROPOSAL_LETTER) {
    return "Budget Proposal Letter";
  } else if (type === TypeOfBaseLetter.IMPLEMENTATION_LETTER_IN_CAMPUS) {
    return "Implementation Letter In-Campus";
  } else if (type === TypeOfBaseLetter.IMPLEMENTATION_LETTER_OFF_CAMPUS) {
    return "Implementation Letter Off-Campus";
  } else if (type === TypeOfBaseLetter.PERMIT_TO_ENTER_LETTER) {
    return "Permit To Enter";
  } else if (type === TypeOfBaseLetter.SCHOOL_FACILITY_LETTER) {
    return "School Facility";
  }

  return "Unknown";
};
