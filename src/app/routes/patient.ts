import { Router } from "express";
import {
  getAllPatients,
  createPatient,
  updatePatient,
} from "@controllers/patient";

const router: Router = Router();

router.get("/", getAllPatients);
router.post("/", createPatient);
router.put("/", updatePatient);

export default router;
