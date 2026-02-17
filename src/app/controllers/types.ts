export interface CreateProfessionalBody {
  name: string;
  position: string;
}

export interface CreateAppointmentBody {
  professional: string;
  date: string;
  startHour: number;
  endHour: number;
  duration: number;
}
