import { Types } from "mongoose";
import { IAddRequestDTO, ICreateAssignmentDTO } from "@domain/Assignment";
import AssignmentModel, {
  IPopulatedAssignment,
  IRequest,
  omitTimestamps,
} from "@models/assignment.model";
import { IProfessional } from "@models/professional.model";
import { AssignmentRepository } from "./assignment.repository";

class DbAssignmentRepository implements AssignmentRepository {
  async findAll(): Promise<IPopulatedAssignment[]> {
    const appos = await AssignmentModel.find({}, omitTimestamps).populate<{
      professional: IProfessional;
    }>("professional");
    return appos;
  }

  async findById(id: string): Promise<IPopulatedAssignment | null> {
    const assignment = await AssignmentModel.findById(id)
      .populate<{
        professional: IProfessional;
      }>("professional")
      .populate({
        path: "requests.patient",
        model: "Patient",
      });
    if (!assignment) return null;
    return assignment;
  }

  async create(
    assignmentDTO: ICreateAssignmentDTO,
  ): Promise<IPopulatedAssignment> {
    const assignment = new AssignmentModel({
      date: new Date(assignmentDTO.date),
      professional: assignmentDTO.professional,
      duration: assignmentDTO.duration,
      startHour: assignmentDTO.startHour,
      endHour: assignmentDTO.endHour,
    });
    await assignment.save();
    const record = await assignment.populate<{ professional: IProfessional }>(
      "professional",
    );
    return {
      professional: {
        name: record.professional.name,
        position: record.professional.position,
      },
      date: record.date,
      duration: record.duration,
      startHour: record.startHour,
      endHour: record.endHour,
      requests: record.requests,
    };
  }

  async addRequest(request: IAddRequestDTO): Promise<IRequest | null> {
    const assignment = await AssignmentModel.findById(request.id);
    if (!assignment) {
      return null;
    }
    const newRequest: IRequest = {
      patient: new Types.ObjectId(request.patientId),
      timeOffset: request.timeOffset,
      status: 0,
    };

    assignment.requests.push(newRequest);
    await assignment.save();
    return newRequest;
  }
}

export default DbAssignmentRepository;
