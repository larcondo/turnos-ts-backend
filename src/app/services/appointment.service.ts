import { IAddRequestDTO, ICreateAppointmentDTO } from "@domain/Appointment";
import { IPopulatedAppointment, IRequest } from "@models/appointment.model";
import { AppointmentRepository } from "@repositories/appointment.repository";

class AppointmentService {
  private appointmentRepository: AppointmentRepository;

  constructor(repository: AppointmentRepository) {
    this.appointmentRepository = repository;
  }

  async getAllAppointments(): Promise<IPopulatedAppointment[]> {
    return await this.appointmentRepository.findAll();
  }

  async getAppointmentById(id: string): Promise<IPopulatedAppointment | null> {
    return await this.appointmentRepository.findById(id);
  }

  async createAppointment(
    appointmentDTO: ICreateAppointmentDTO,
  ): Promise<IPopulatedAppointment> {
    const newAppo = this.appointmentRepository.create(appointmentDTO);
    return newAppo;
  }

  async addPatientRequest(request: IAddRequestDTO): Promise<IRequest | null> {
    const appo = await this.appointmentRepository.findById(request.id);
    if (!appo) {
      throw new Error("Appointment does not exist!");
    }

    if (request.timeOffset < appo.startHour) {
      throw new Error("Time offset out of range [low].");
    }

    if (request.timeOffset >= appo.endHour) {
      throw new Error("Time offset out of range [high]");
    }

    const newRequest = await this.appointmentRepository.addRequest(request);
    return newRequest;
  }
}

export default AppointmentService;
