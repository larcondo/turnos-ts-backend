import { RequestHandler } from "express";
import DbAppointmentRepository from "../repositories/appointment.dbRepository";
import AppointmentService from "../services/appointment.service";
import { CreateAppointmentBody } from "./types";

const appoRepository = new DbAppointmentRepository();
const appoService = new AppointmentService(appoRepository);

export const allAppointments: RequestHandler = async (_, res) => {
  try {
    const appointments = await appoService.getAllAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export const createAppointment: RequestHandler<
  unknown,
  unknown,
  CreateAppointmentBody,
  unknown
> = async (req, res) => {
  try {
    const { professional, startHour, endHour, duration, date } = req.body;

    const appointment = await appoService.createAppointment({
      professional,
      date,
      duration,
      startHour,
      endHour,
    });

    res.status(201).json(appointment);
  } catch (error) {
    let errMsg = "Internal Server Error";
    if (error instanceof Error) {
      errMsg = error.message;
    }
    console.log(errMsg);
    res.status(500).json({ error: errMsg });
  }
};
