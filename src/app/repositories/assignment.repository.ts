import { IAddRequestDTO, ICreateAssignmentDTO } from "@domain/Assignment";
import { IPopulatedAssignment, IRequest } from "@models/assignment.model";

export interface AssignmentRepository {
  findAll(): Promise<IPopulatedAssignment[]>;
  findById(id: string): Promise<IPopulatedAssignment | null>;
  create(assignmentDTO: ICreateAssignmentDTO): Promise<IPopulatedAssignment>;
  addRequest(request: IAddRequestDTO): Promise<IRequest | null>;
}
