import { RequestHandler } from "express";
import DbPatientRepository from "@repositories/patient.dbRepository";
import PatientService from "@services/patient.service";
import { CreatePatientBody, UpdatePatientBody } from "./types";

const patientRepo = new DbPatientRepository();
const patientService = new PatientService(patientRepo);

export const getAllPatients: RequestHandler = async (_, res) => {
  try {
    const patients = await patientService.getAllPatients();
    res.status(200).json(patients);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export const createPatient: RequestHandler<
  unknown,
  unknown,
  CreatePatientBody,
  unknown
> = async (req, res) => {
  try {
    const { name, birthDate, pin } = req.body;
    const patient = await patientService.createPatient({
      name,
      birthDate,
      pin,
    });

    res.status(201).json(patient);
  } catch (error) {
    let errMsg = "Internal Server Error";
    if (error instanceof Error) {
      errMsg = error.message;
    }
    console.log(errMsg);
    res.status(500).json({ error: errMsg });
  }
};

export const updatePatient: RequestHandler<
  unknown,
  unknown,
  UpdatePatientBody,
  unknown
> = async (req, res) => {
  try {
    const { name, birthDate, pin } = req.body;

    if (!birthDate && !pin) {
      return res
        .status(400)
        .json({ error: "`birthDate` or `pin` is required!" });
    }

    const patient = await patientService.updatePatient({
      name,
      birthDate,
      pin,
    });
    res.status(200).json(patient);
  } catch (error) {
    let errMsg = "Internal Server Error";
    if (error instanceof Error) {
      errMsg = error.message;
    }
    console.log(errMsg);
    res.status(500).json({ error: errMsg });
  }
};
