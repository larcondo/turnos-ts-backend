import { Types } from "mongoose";
import { IAddRequestDTO, ICreateAppointmentDTO } from "@domain/Appointment";
import AppointmentModel, {
  IPopulatedAppointment,
  IRequest,
  omitTimestamps,
} from "@models/appointment.model";
import { IProfessional } from "@models/professional.model";
import { AppointmentRepository } from "./appointment.repository";

class DbAppointmentRepository implements AppointmentRepository {
  async findAll(): Promise<IPopulatedAppointment[]> {
    const appos = await AppointmentModel.find({}, omitTimestamps).populate<{
      professional: IProfessional;
    }>("professional");
    return appos;
  }

  async findById(id: string): Promise<IPopulatedAppointment | null> {
    const appointment = await AppointmentModel.findById(id)
      .populate<{
        professional: IProfessional;
      }>("professional")
      .populate({
        path: "requests.patient",
        model: "Patient",
      });
    if (!appointment) return null;
    return appointment;
  }

  async create(
    appointment: ICreateAppointmentDTO,
  ): Promise<IPopulatedAppointment> {
    const appo = new AppointmentModel({
      date: new Date(appointment.date),
      professional: appointment.professional,
      duration: appointment.duration,
      startHour: appointment.startHour,
      endHour: appointment.endHour,
    });
    await appo.save();
    const record = await appo.populate<{ professional: IProfessional }>(
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
    const appo = await AppointmentModel.findById(request.id);
    if (!appo) {
      return null;
    }
    const newRequest: IRequest = {
      patient: new Types.ObjectId(request.patientId),
      timeOffset: request.timeOffset,
      status: 0,
    };

    appo.requests.push(newRequest);
    await appo.save();
    return newRequest;
  }
}

export default DbAppointmentRepository;
