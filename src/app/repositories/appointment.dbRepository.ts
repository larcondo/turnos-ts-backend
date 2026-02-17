import { ICreateAppointmentDTO } from "../domain/Appointment";
import AppointmentModel, {
  IPopulatedAppointment,
  omitTimestamps,
} from "../models/appointment.model";
import { IProfessional } from "../models/professional.model";
import { AppointmentRepository } from "./appointment.repository";

class DbAppointmentRepository implements AppointmentRepository {
  async findAll(): Promise<IPopulatedAppointment[]> {
    const appos = await AppointmentModel.find({}, omitTimestamps).populate<{
      professional: IProfessional;
    }>("professional");
    return appos;
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
    };
  }
}

export default DbAppointmentRepository;
