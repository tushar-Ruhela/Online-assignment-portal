import express from "express";
import { getDashboardData } from "../controller/dashboardController.js";
import { authenticate, authorizeAdmin } from "../Middleware/authMiddleware.js";

const router = express.Router();


router.get("/dashboard", authenticate, authorizeAdmin, getDashboardData);

export default router;
