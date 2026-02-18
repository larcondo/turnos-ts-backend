import { Schema, model, ProjectionType } from "mongoose";

export interface IPatient {
  name: string;
  birthDate: Date;
  pin: string; // Patient Identification Number
}

export interface PatientDocument extends IPatient {
  createdAt: Date;
  updatedAt: Date;
}

const patientSchema = new Schema<PatientDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    pin: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

patientSchema.set("toJSON", {
  transform: (doc, ret) => {
    const { __v, ...rest } = ret;
    return rest;
  },
});

export const omitTimestamps: ProjectionType<PatientDocument> = {
  createdAt: 0,
  updatedAt: 0,
};

const PatientModel = model<PatientDocument>("Patient", patientSchema);

export default PatientModel;
