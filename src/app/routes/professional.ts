import { Router } from "express";
import { getAll, createProfessional } from "../controllers/professional";

const router: Router = Router();

router.get("/", getAll);
router.post("/", createProfessional);

export default router;
