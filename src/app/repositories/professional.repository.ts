import { ICreateProfessionalDTO } from "@domain/Professional";
import { IProfessional } from "@models/professional.model";

export interface ProfessionalRepository {
  findAll(): Promise<IProfessional[]>;
  create(professional: ICreateProfessionalDTO): Promise<IProfessional>;
  findById(id: string): Promise<IProfessional | null>;
  findByName(name: string): Promise<IProfessional | null>;
  // update(professional: DTO): Promise<void>;
  // delete(id: string): Promise<void>
}
