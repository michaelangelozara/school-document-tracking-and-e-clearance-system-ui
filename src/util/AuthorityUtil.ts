export const academicPersonnelAuthorities: string[] = [
  "OTHER",
  "DEAN",
  "PROGRAM_HEAD",
  "SCIENCE_LAB",
  "COMPUTER_SCIENCE_LAB",
  "ELECTRONICS_LAB",
  "CRIMINOLOGY_LAB",
  "HRM_LAB",
  "NURSING_LAB",
];

export const nonAcademicPersonnelAuthorities: string[] = [
  "OTHER",
  "LIBRARIAN",
  "MULTIMEDIA",
  "SCHOOL_NURSE",
  "SCHOOL_NURSE",
  "GUIDANCE",
  "CASHIER",
  "REGISTRAR",
  "ACCOUNTING_CLERK",
  "CUSTODIAN",
  "VPAF",
  "VPA",
  "AUXILIARY",
  "PPLO",
  "CHAPEL",
  "ADMIN",
  "SUPER_ADMIN",
];

export const allPersonnelAuthories: string[] = [
  ...academicPersonnelAuthorities,
  ...nonAcademicPersonnelAuthorities,
];

export const studentAuthority: string = "STUDENT";

export const allUserlAuthories: string[] = [
  ...academicPersonnelAuthorities,
  ...nonAcademicPersonnelAuthorities,
  ...studentAuthority,
];
