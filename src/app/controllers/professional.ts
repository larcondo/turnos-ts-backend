import { RequestHandler } from "express";
import DbProfessionalRepository from "../repositories/professional.dbRepository";
import ProfessionalService from "../services/professional.service";
import { CreateProfessionalBody } from "./types";

const proRepository = new DbProfessionalRepository();
const proService = new ProfessionalService(proRepository);

export const getAll: RequestHandler = async (_req, res) => {
  try {
    const professionals = await proService.getAllProfessionals();
    res.status(200).json(professionals);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export const createProfessional: RequestHandler<
  unknown,
  unknown,
  CreateProfessionalBody,
  unknown
> = async (req, res) => {
  try {
    const { name, position } = req.body;
    const professional = await proService.createProfessional({
      name,
      position,
    });
    res.status(201).json(professional);
  } catch (error) {
    let errMsg = "Internal Server Error";
    if (error instanceof Error) {
      errMsg = error.message;
    }
    console.log(errMsg);
    res.status(500).json({ error: errMsg });
  }
};
