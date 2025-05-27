import { IBaseLetterRequestDTO } from "./BaseLetter";

export interface ISchoolFacility extends IBaseLetterRequestDTO {
  venue: string;
  date: string;
  time: string;
  facility_or_equipments: IFacilityOrEquipment[];
}

export interface IFacilityOrEquipment {
  name: string;
  quantity: number;
}
