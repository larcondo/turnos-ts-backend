export interface ICreatePatientDTO {
  name: string;
  birthDate: string;
  pin?: string;
}

export interface IUpdatePatientDTO {
  name: string;
  birthDate?: string;
  pin?: string;
}
