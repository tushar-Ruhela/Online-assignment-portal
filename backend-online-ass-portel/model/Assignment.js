import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  action: String, // submitted / approved / rejected
  remark: String,
  date: { type: Date, default: Date.now }
});

const assignmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  fileUrl: String,

  status: {
    type: String,
    enum: ["draft", "submitted", "approved", "rejected"],
    default: "draft",
  },

  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" // ✅ Professor
  },

  submittedAt: Date,

  history: [historySchema],

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Assignment", assignmentSchema);
