import { IAddRequestDTO, ICreateAppointmentDTO } from "@domain/Appointment";
import { IPopulatedAppointment, IRequest } from "@models/appointment.model";

export interface AppointmentRepository {
  findAll(): Promise<IPopulatedAppointment[]>;
  findById(id: string): Promise<IPopulatedAppointment | null>;
  create(appointment: ICreateAppointmentDTO): Promise<IPopulatedAppointment>;
  addRequest(request: IAddRequestDTO): Promise<IRequest | null>;
}
