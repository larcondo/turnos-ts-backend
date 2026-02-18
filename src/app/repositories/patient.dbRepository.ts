import PatientModel, {
  IPatient,
  omitTimestamps,
} from "../models/patient.model";
import { ICreatePatientDTO, IUpdatePatientDTO } from "../domain/Patient";
import { PatientRepository } from "./patient.repository";

class DbPatientRepository implements PatientRepository {
  async findAll(): Promise<IPatient[]> {
    const patients = await PatientModel.find({}, omitTimestamps);
    return patients;
  }

  async findByName(name: string): Promise<IPatient | null> {
    const patient = await PatientModel.findOne({ name }, omitTimestamps);
    if (!patient) return null;
    return patient;
  }

  async create(patient: ICreatePatientDTO): Promise<IPatient> {
    const newPatient = new PatientModel({
      name: patient.name,
      birthDate: new Date(patient.birthDate),
      pin: patient.pin,
    });
    await newPatient.save();
    return {
      name: newPatient.name,
      birthDate: newPatient.birthDate,
      pin: newPatient.pin,
    };
  }

  async update(patient: IUpdatePatientDTO): Promise<IPatient | null> {
    const patientDoc = await PatientModel.findOne({ name: patient.name });
    if (!patientDoc) return null;

    if (patient.birthDate) {
      patientDoc.birthDate = new Date(patient.birthDate);
    }

    if (patient.pin) {
      patientDoc.pin = patient.pin;
    }
    await patientDoc.save();
    return patientDoc;
  }
}

export default DbPatientRepository;
