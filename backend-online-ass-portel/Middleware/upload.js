import multer from "multer";
import path from "path";
import fs from "fs";

const assignmentDir = "uploads/assignments";

// Create directory if it doesn't exist
if (!fs.existsSync(assignmentDir)) {
  fs.mkdirSync(assignmentDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, assignmentDir); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

// File filter — PDF only
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

export const uploadAssignmentFile = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: fileFilter
});
