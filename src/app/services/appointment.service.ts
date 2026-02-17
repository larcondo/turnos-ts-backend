import { ICreateAppointmentDTO } from "../domain/Appointment";
import {
  IAppointment,
  IPopulatedAppointment,
} from "../models/appointment.model";
import { AppointmentRepository } from "../repositories/appointment.repository";

class AppointmentService {
  private appointmentRepository: AppointmentRepository;

  constructor(repository: AppointmentRepository) {
    this.appointmentRepository = repository;
  }

  async getAllAppointments(): Promise<IPopulatedAppointment[]> {
    return this.appointmentRepository.findAll();
  }

  async createAppointment(
    appointmentDTO: ICreateAppointmentDTO,
  ): Promise<IAppointment> {
    const newAppo = this.appointmentRepository.create(appointmentDTO);
    return newAppo;
  }
}

export default AppointmentService;
