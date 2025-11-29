import express from "express";
import { verifyToken, isProfessor } from "../Middleware/authMiddleware.js";
import { getProfessorDashboard } from "../controller/professor-controller.js";

const router = express.Router();

router.get("/dashboard", verifyToken, isProfessor, getProfessorDashboard);

export default router;
