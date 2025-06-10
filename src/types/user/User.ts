export enum TypeOfBaseUser {
  STUDENT = "STUDENT",
  ACADEMIC_PERSONNEL = "ACADEMIC_PERSONNEL",
  NON_ACADEMIC_PERSONNEL = "NON_ACADEMIC_PERSONNEL",
}
export interface IUserSummaryResponse {
  id: string;
  firstname: string;
  middle_name: string;
  lastname: string;
  username: string;
  type: TypeOfBaseUser;
  authorities: string[];
}

enum Gender {
  MALE = "MALE",
  FEMALE = "FAMALE",
  OTHER = "OTHER",
}

export interface IUserDetailedResponse {
  id: string;
  firstname: string;
  middle_name: string;
  lastname: string;
  type: TypeOfBaseUser;
  gender: Gender;
  username: string;
  contact_number: string;
  email: string;
  created_at: string;
  last_modified_at: string;
  authorities: string[];
}

enum YearLevel {
  FIRST_YEAR = "FIRST_YEAR",
  SECOND_YEAR = "SECOND_YEAR",
  THIRD_YEAR = "THIRD_YEAR",
  FOURTH_YEAR = "FOURTH_YEAR",
  FIRST_YEAR_VOCATIONAL = "FIRST_YEAR_VOCATIONAL",
  LAST_YEAR_VOCATIONAL = "LAST_YEAR_VOCATIONAL",
}
export interface IStudentResponse extends IUserDetailedResponse {
  year_level: YearLevel;
  department_name: string;
  department_short_name: string;
  course_name: string;
  course_short_name: string;
  department_club_name: string;
  department_club_short_name: string;
  social_club_name: string;
  social_club_short_name: string;
}

enum TypeOfPersonnel {
  ACADEMIC,
  NON_ACADEMIC,
}
export interface IPersonnelResponse extends IUserDetailedResponse {
  type_of_personnel: TypeOfPersonnel;
  club_name: string;
  club_short_name: string;
}

export interface IAcademicPersonnelResponse extends IPersonnelResponse {
  course_name: string;
  course_short_name: string;
  department_name: string;
  department_short_name: string;
  club_name: string;
  club_short_name: string;
}

export interface INonAcademicPersonnelResponse extends IPersonnelResponse {
  club_name: string;
  club_short_name: string;
}

// request
export interface IUserRequest {
  base_user_request_body_type: TypeOfBaseUser;
  firstname: string;
  middle_name: string;
  lastname: string;
  type: TypeOfBaseUser;
  username: string;
  contact_number: string;
  email: string;
}

export interface IStudentRequest {
  year_level: YearLevel;
}

export interface IPersonnelRequest {
  personnel_request_body_type: TypeOfPersonnel;
  type_of_personnel: TypeOfPersonnel;
}

export interface IAcademicPersonnelRequest extends IPersonnelRequest {
  authority_ids: string[];
}

export interface IAcademicPersonnelRequest extends IPersonnelRequest {
  authority_ids: string[];
}

export interface IUserNameAndIdOnly {
  id: string;
  name: string;
  profile: string;
}
