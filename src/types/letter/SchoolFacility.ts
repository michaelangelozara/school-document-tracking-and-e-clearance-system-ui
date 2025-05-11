import { BaseLetter } from "./BaseLetter";

export interface ISchoolFacility extends BaseLetter {
  venue: string;
  date: string;
  time: string;
  facility_or_equipments: IFacilityOrEquipment[];
}

export interface IFacilityOrEquipment {
  name: string;
  quantity: number;
}
