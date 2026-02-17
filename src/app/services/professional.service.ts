import { ICreateProfessionalDTO } from "../domain/Professional";
import { IProfessional } from "../models/professional.model";
import { ProfessionalRepository } from "../repositories/professional.repository";

class ProfessionalService {
  private professionalRepository: ProfessionalRepository;

  constructor(repository: ProfessionalRepository) {
    this.professionalRepository = repository;
  }

  async getAllProfessionals(): Promise<IProfessional[]> {
    return this.professionalRepository.findAll();
  }

  async createProfessional(
    professionalDTO: ICreateProfessionalDTO,
  ): Promise<IProfessional> {
    const existing = await this.professionalRepository.findByName(
      professionalDTO.name,
    );
    if (existing) {
      throw new Error("Professional already exists!");
    }
    const newProfessional =
      await this.professionalRepository.create(professionalDTO);
    return newProfessional;
  }
}

export default ProfessionalService;
