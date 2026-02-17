import { ICreateAppointmentDTO } from "../domain/Appointment";
import {
  IAppointment,
  IPopulatedAppointment,
} from "../models/appointment.model";

export interface AppointmentRepository {
  findAll(): Promise<IPopulatedAppointment[]>;
  create(appointment: ICreateAppointmentDTO): Promise<IPopulatedAppointment>;
}
