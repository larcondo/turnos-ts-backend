export interface ICreateAppointmentDTO {
  professional: string;
  date: string;
  startHour: number;
  endHour: number;
  duration: number;
}

export interface IAddRequestDTO {
  id: string;
  patientId: string;
  timeOffset: number;
}
