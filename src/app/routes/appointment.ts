import { Router } from "express";
import { allAppointments, createAppointment } from "../controllers/appointment";

const router: Router = Router();

router.get("/", allAppointments);
router.post("/", createAppointment);

export default router;
