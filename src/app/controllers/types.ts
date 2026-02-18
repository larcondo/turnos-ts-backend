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

export interface CreatePatientBody {
  name: string;
  birthDate: string;
  pin?: string;
}

export interface UpdatePatientBody {
  name: string;
  birthDate?: string;
  pin?: string;
}
