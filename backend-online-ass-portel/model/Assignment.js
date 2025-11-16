import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: String,
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["Pending", "Submitted"], default: "Pending" },
});

export default mongoose.model("Assignment", assignmentSchema);
