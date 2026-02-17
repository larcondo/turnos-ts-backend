import { Schema, model, ProjectionType } from "mongoose";

export const omitTimestamps: ProjectionType<ProfessionalDocument> = {
  createdAt: 0,
  updatedAt: 0,
};

export interface IProfessional {
  name: string;
  position: string;
}

export interface ProfessionalDocument extends IProfessional {
  createdAt: Date;
  updatedAt: Date;
}

const professionalSchema = new Schema<ProfessionalDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

professionalSchema.set("toJSON", {
  transform: (doc, ret) => {
    const { __v, ...rest } = ret;
    return rest;
  },
});

// professionalSchema.set("toObject", {
//   transform: (doc, ret) => {
//     const { __v, ...rest } = ret;
//     return rest;
//   },
// });

const ProfessionalModel = model<ProfessionalDocument>(
  "Professional",
  professionalSchema,
);

export default ProfessionalModel;
