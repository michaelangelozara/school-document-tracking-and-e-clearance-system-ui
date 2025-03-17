export interface User {
  id: string;
  firstname: string;
  middle_name: string;
  lastname: string;
  username: string;
  authorities: string[];
}

export interface Student extends User {
  year_level: string;
}
enum TypeOfPersonnel {
  ACADEMIC,
  NON_ACADEMIC,
}

export interface Personnel extends User {
  type_of_personnel: TypeOfPersonnel;
}

export interface Moderator extends Personnel {
  club_name: string;
}
