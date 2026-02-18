import { IAddRequestDTO, ICreateAssignmentDTO } from "@domain/Assignment";
import { IPopulatedAssignment, IRequest } from "@models/assignment.model";
import { AssignmentRepository } from "@repositories/assignment.repository";

class AssignmentService {
  private assignmentRepository: AssignmentRepository;

  constructor(repository: AssignmentRepository) {
    this.assignmentRepository = repository;
  }

  async getAllAssignments(): Promise<IPopulatedAssignment[]> {
    return await this.assignmentRepository.findAll();
  }

  async getAssignmentById(id: string): Promise<IPopulatedAssignment | null> {
    return await this.assignmentRepository.findById(id);
  }

  async createAssignment(
    assignmentDTO: ICreateAssignmentDTO,
  ): Promise<IPopulatedAssignment> {
    const newAssignment = this.assignmentRepository.create(assignmentDTO);
    return newAssignment;
  }

  async addPatientRequest(request: IAddRequestDTO): Promise<IRequest | null> {
    const assignment = await this.assignmentRepository.findById(request.id);
    if (!assignment) {
      throw new Error("Assignment does not exist!");
    }

    if (request.timeOffset < assignment.startHour) {
      throw new Error("Time offset out of range [low].");
    }

    if (request.timeOffset >= assignment.endHour) {
      throw new Error("Time offset out of range [high]");
    }

    const newRequest = await this.assignmentRepository.addRequest(request);
    return newRequest;
  }
}

export default AssignmentService;
