import express from "express";
import { verifyToken, isStudent } from "../Middleware/authMiddleware.js";
import {
  getStudentDashboard,
  uploadAssignment,
  getMyAssignments,
  getAssignmentDetails,
  downloadAssignmentFile,
  resubmitAssignment,
  submitAssignmentForReview
} from "../controller/student-controller.js";
import { uploadAssignmentFile } from "../Middleware/upload.js";

const router = express.Router();

router.get("/dashboard", verifyToken, isStudent, getStudentDashboard);

router.get("/assignments", verifyToken, isStudent, getMyAssignments);

router.get("/assignments/:id", verifyToken, isStudent, getAssignmentDetails);

router.get(
  "/assignments/:id/download",
  verifyToken,
  isStudent,
  downloadAssignmentFile
);

router.post(
  "/assignments/:id/resubmit",
  verifyToken,
  isStudent,
  uploadAssignmentFile.single("file"), // allow new file
  resubmitAssignment
);

router.post(
  "/assignments/upload",
  verifyToken,
  isStudent,
  uploadAssignmentFile.array("files", 5),
  uploadAssignment
);

router.post(
  "/assignments/:id/submit",
  verifyToken,
  isStudent,
  submitAssignmentForReview
);

export default router;
