import express from "express";
import { verifyToken, isStudent } from "../middleware/authMiddleware.js";

const router = express.Router();

// Example route for student dashboard
router.get("/dashboard", verifyToken, isStudent, (req, res) => {
  res.status(200).json({ message: "Welcome to Student Dashboard" });
});

export default router;
