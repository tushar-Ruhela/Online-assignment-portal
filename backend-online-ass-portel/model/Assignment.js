import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  fileUrl: String,
  status: {
    type: String,
    enum: ["draft", "submitted", "approved", "rejected"],
    default: "draft"
  },
  history: [
  {
    action: String,           
    remark: String,
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    signature: String,        // optional signature image/file
  }
]
,
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  isLocked: {
  type: Boolean,
  default: false,
},
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Assignment", assignmentSchema);
