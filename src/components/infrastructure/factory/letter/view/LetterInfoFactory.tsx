import React from "react";
import {
  IBaseLetterResponseDTO,
  TypeOfBaseLetter,
} from "../../../../../types/letter/BaseLetter";
import { IBudgetProposalResponseDTO } from "../../../../../types/letter/BudgetProposal";
import { ICommunicationLetterResponseDTO } from "../../../../../types/letter/CommunicationLetter";
import { IImplementationLetterInCampusResponseDTO } from "../../../../../types/letter/ImplementationLetterInCampus";
import { IImplementationLetterOffCampusResponseDTO } from "../../../../../types/letter/ImplementationLetterOffCampus";
import { IPermitToEnterResponseDTO } from "../../../../../types/letter/PermitToEnter";
import { ISchoolFacilityResponseDTO } from "../../../../../types/letter/SchoolFacility";
import BudgetProposalBody from "../../../../letter/view-body/BudgetProposalLetterBody";
import CommunicationBody from "../../../../letter/view-body/CommunicationLetterBody";
import ImplementationLetterInCampusBody from "../../../../letter/view-body/ImplementationLetterInCampusBody";
import ImplementationLetterOffCampusBody from "../../../../letter/view-body/ImplementationLetterOffCampusBody";
import PermitToEnterBody from "../../../../letter/view-body/PermitToEnterLetterBody";
import SchoolFacilityBody from "../../../../letter/view-body/SchoolFacilityLetterBody";

type LetterInfoComponentPropsType =
  | IBudgetProposalResponseDTO
  | ICommunicationLetterResponseDTO
  | IImplementationLetterInCampusResponseDTO
  | IImplementationLetterOffCampusResponseDTO
  | IPermitToEnterResponseDTO
  | ISchoolFacilityResponseDTO
  | null;

// type of factory map
type ComponentMap = {
  [TypeOfBaseLetter.BUDGET_PROPOSAL_LETTER]: React.ComponentType<IBudgetProposalResponseDTO>;
  [TypeOfBaseLetter.COMMUNICATION_LETTER]: React.ComponentType<ICommunicationLetterResponseDTO>;
  [TypeOfBaseLetter.IMPLEMENTATION_LETTER_IN_CAMPUS]: React.ComponentType<IImplementationLetterInCampusResponseDTO>;
  [TypeOfBaseLetter.IMPLEMENTATION_LETTER_OFF_CAMPUS]: React.ComponentType<IImplementationLetterOffCampusResponseDTO>;
  [TypeOfBaseLetter.PERMIT_TO_ENTER_LETTER]: React.ComponentType<IPermitToEnterResponseDTO>;
  [TypeOfBaseLetter.SCHOOL_FACILITY_LETTER]: React.ComponentType<ISchoolFacilityResponseDTO>;
};

// Create the component factory map
const componentMap: ComponentMap = {
  [TypeOfBaseLetter.BUDGET_PROPOSAL_LETTER]: BudgetProposalBody,
  [TypeOfBaseLetter.COMMUNICATION_LETTER]: CommunicationBody,
  [TypeOfBaseLetter.IMPLEMENTATION_LETTER_IN_CAMPUS]:
    ImplementationLetterInCampusBody,
  [TypeOfBaseLetter.IMPLEMENTATION_LETTER_OFF_CAMPUS]:
    ImplementationLetterOffCampusBody,
  [TypeOfBaseLetter.PERMIT_TO_ENTER_LETTER]: PermitToEnterBody,
  [TypeOfBaseLetter.SCHOOL_FACILITY_LETTER]: SchoolFacilityBody,
};

type LetterInfoPropsType<T extends IBaseLetterResponseDTO> = {
  type: TypeOfBaseLetter | undefined;
  data: T;
};
const LetterInfoFactory = <T extends IBaseLetterResponseDTO>(
  props: LetterInfoPropsType<T>
) => {
  const { type, data } = props;
  if (type === undefined) {
    return <div>No Letter info component found for letter type: {type}</div>;
  }

  // Get the appropriate component from the map
  const Component = componentMap[type];

  if (!Component) {
    return <div>No Letter info component found for letter type: {type}</div>;
  }

  // Cast the data to the appropriate type - TypeScript will ensure this is safe
  return <Component {...(data as any)} />;
};

export default LetterInfoFactory;
