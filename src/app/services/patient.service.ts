import { ICreatePatientDTO, IUpdatePatientDTO } from "@domain/Patient";
import { IPatient } from "@models/patient.model";
import { PatientRepository } from "@repositories/patient.repository";

class PatientService {
  private patientRepository: PatientRepository;

  constructor(repository: PatientRepository) {
    this.patientRepository = repository;
  }

  async getAllPatients(): Promise<IPatient[]> {
    return this.patientRepository.findAll();
  }

  async createPatient(patientDTO: ICreatePatientDTO): Promise<IPatient> {
    const existing = await this.patientRepository.findByName(patientDTO.name);
    if (existing) {
      throw new Error("Patient already exists!");
    }

    const newPatient = await this.patientRepository.create(patientDTO);
    return newPatient;
  }

  async updatePatient(patientDTO: IUpdatePatientDTO): Promise<IPatient> {
    const updated = await this.patientRepository.update(patientDTO);
    if (!updated) {
      throw new Error(`Patient with name '${patientDTO.name}' does not exist!`);
    }
    return updated;
  }
}

export default PatientService;
