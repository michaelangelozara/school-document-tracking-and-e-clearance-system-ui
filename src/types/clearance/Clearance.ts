import { TypeOfBaseUser } from "../user/User";

export enum StatusOfClearance {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

export interface ClearanceSummaryProjection {
  id: string;
  type: TypeOfBaseUser | undefined;
  status: StatusOfClearance | undefined;
  name: string;
  applied_at: string;
  last_modified_at: string;
}

export interface ClearanceFilterBody {
  search_query: string;
  status: string;
  type_of_clearance: string;
}
