import { ICreatePatientDTO, IUpdatePatientDTO } from "../domain/Patient";
import { IPatient } from "../models/patient.model";

export interface PatientRepository {
  findAll(): Promise<IPatient[]>;
  findByName(name: string): Promise<IPatient | null>;
  create(patient: ICreatePatientDTO): Promise<IPatient>;
  update(patient: IUpdatePatientDTO): Promise<IPatient | null>;
}
