import { Router } from "express";
import {
  allAppointments,
  appointmentById,
  createAppointment,
  addPatientRequest,
} from "@controllers/appointment";

const router: Router = Router();

router.get("/", allAppointments);
router.get("/:id", appointmentById);
router.post("/", createAppointment);
router.post("/:id", addPatientRequest);

export default router;
