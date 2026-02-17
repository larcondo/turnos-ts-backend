import { Schema, model, Types, ProjectionType } from "mongoose";
import { IProfessional } from "./professional.model";

const HORA = 60 * 60 * 1000;
const MINUTO = 60 * 1000;

export interface IAppointment {
  professional: Types.ObjectId;
  date: Date;
  startHour: number;
  endHour: number;
  duration: number;
}

export interface AppointmentDocument extends IAppointment {
  createdAt: Date;
  updatedAt: Date;
}

// Typo para resultados del "populate"
export interface IPopulatedAppointment extends Omit<
  IAppointment,
  "professional"
> {
  professional: IProfessional;
}

export const omitTimestamps: ProjectionType<AppointmentDocument> = {
  createdAt: 0,
  updatedAt: 0,
};

const appointmentSchema = new Schema<AppointmentDocument>(
  {
    professional: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Professional",
    },
    date: { type: Date, required: true },
    startHour: {
      type: Number,
      min: 0,
      max: 24 * HORA,
      required: true,
    },
    endHour: {
      type: Number,
      min: 0,
      max: 24 * HORA,
      required: true,
    },
    duration: {
      type: Number,
      min: 30 * MINUTO,
      required: true,
    },
  },
  { timestamps: true },
);

appointmentSchema.set("toJSON", {
  transform: (doc, ret) => {
    const { __v, ...rest } = ret;
    return rest;
  },
});

const AppointmentModel = model<AppointmentDocument>(
  "Appointment",
  appointmentSchema,
);

export default AppointmentModel;
