import { Router } from "express";
import {
  allAssignments,
  assignmentById,
  createAssignment,
  addPatientRequest,
} from "@controllers/assignment";

const router: Router = Router();

router.get("/", allAssignments);
router.get("/:id", assignmentById);
router.post("/", createAssignment);
router.post("/:id", addPatientRequest);

export default router;
