import {
  IBaseLetterApplyRequestDTO,
  IBaseLetterResponseDTO,
} from "./BaseLetter";

export interface ISchoolFacilityApplyRequestDTO
  extends IBaseLetterApplyRequestDTO {
  venue: string;
  date: string;
  time: string;
  facility_or_equipments: IFacilityOrEquipment[];
}

export interface IFacilityOrEquipment {
  name: string;
  quantity: number;
}

export interface ISchoolFacilityResponseDTO extends IBaseLetterResponseDTO {
  venue: string;
  date_and_time: string;
  facility_or_equipments: IFacilityOrEquipmentResponseDTO[];
}

export interface IFacilityOrEquipmentResponseDTO {
  id: string;
  name: string;
  quantity: number;
}
