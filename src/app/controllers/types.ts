export interface AssignmentByIdParams {
  id: string;
}

export interface CreateProfessionalBody {
  name: string;
  position: string;
}

export interface CreateAssignmentBody {
  professional: string;
  date: string;
  startHour: number;
  endHour: number;
  duration: number;
}

export interface AddPatientRequestBody {
  patientId: string;
  timeOffset: number;
}

export interface AddPatientRequestParams {
  id: string;
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
