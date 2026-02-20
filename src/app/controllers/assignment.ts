import { RequestHandler } from "express";
import DbAssignmentRepository from "@repositories/assignment.dbRepository";
import AssignmentService from "@services/assignment.service";
import {
  AddPatientRequestBody,
  AddPatientRequestParams,
  AssignmentByIdParams,
  CreateAssignmentBody,
} from "./types";

const assignmentRepository = new DbAssignmentRepository();
const assignmentService = new AssignmentService(assignmentRepository);

export const allAssignments: RequestHandler = async (_, res) => {
  try {
    const assignments = await assignmentService.getAllAssignments();
    res.status(200).json(assignments);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export const assignmentById: RequestHandler<
  AssignmentByIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res) => {
  try {
    const { id } = req.params;
    const assignment = await assignmentService.getAssignmentById(id);
    res.status(200).json(assignment);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export const createAssignment: RequestHandler<
  unknown,
  unknown,
  CreateAssignmentBody,
  unknown
> = async (req, res) => {
  try {
    const { professional, startHour, endHour, duration, date } = req.body;

    const assignment = await assignmentService.createAssignment({
      professional,
      date,
      duration,
      startHour,
      endHour,
    });

    res.status(201).json(assignment);
  } catch (error) {
    let errMsg = "Internal Server Error";
    if (error instanceof Error) {
      errMsg = error.message;
    }
    console.log(errMsg);
    res.status(500).json({ error: errMsg });
  }
};

export const addPatientRequest: RequestHandler<
  AddPatientRequestParams,
  unknown,
  AddPatientRequestBody,
  unknown
> = async (req, res) => {
  try {
    const { id } = req.params;
    const { patientId, timeOffset } = req.body;

    const patientRequest = await assignmentService.addPatientRequest({
      id,
      timeOffset,
      patientId,
    });

    res.status(201).json(patientRequest);
  } catch (error) {
    let errMsg = "Internal Server Error";
    if (error instanceof Error) {
      errMsg = error.message;
    }
    console.log(errMsg);
    res.status(500).json({ error: errMsg });
  }
};
