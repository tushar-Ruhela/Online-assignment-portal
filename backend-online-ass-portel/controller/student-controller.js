import Assignment from "../model/Assignment.js"
import mongoose from "mongoose";  

export const getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user.id;

    
    const statusCounts = await Assignment.aggregate([
      { $match: { student: new mongoose.Types.ObjectId(studentId) } },
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    
    const counts = {
      Draft: 0,
      Submitted: 0,
      Approved: 0,
      Rejected: 0
    };

    statusCounts.forEach(item => {
      const key = item._id.charAt(0).toUpperCase() + item._id.slice(1);
      counts[key] = item.count;
    });

    
    const recentAssignments = await Assignment.find({ student: studentId })
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({ counts, recentAssignments });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Dashboard error" });
  }
};



export const uploadAssignment = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const files = req.files; 

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "Please upload at least one file" });
    }

    let uploadedAssignments = [];

    for (const file of files) {
      const assignment = await Assignment.create({
        title,
        description,
        category,
        fileUrl: file.path,
        student: req.user.id,
        status: "draft",
      });

      uploadedAssignments.push(assignment);
    }

    return res.status(201).json({
      message: `${files.length} assignment(s) uploaded successfully`,
      assignments: uploadedAssignments,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Upload error" });
  }
};

export const getMyAssignments = async (req, res) => {
  try {
    const studentId = req.user.id;

    const assignments = await Assignment.find({ student: studentId })
      .sort({ createdAt: -1 });

    return res.status(200).json({ assignments });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching assignments" });
  }
};

export const getAssignmentDetails = async (req, res) => {
  try {
    const { id } = req.params;

   
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid assignment ID" });
    }

   
    const assignment = await Assignment.findById(id)
      .populate("reviewer", "name email")
      .populate("student", "name email")
       .populate("history.reviewer", "name email");

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    return res.status(200).json({ assignment });

  } catch (error) {
    console.error("🔥 Error in getAssignmentDetails:", error.message);
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const submitAssignmentForReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { reviewerId } = req.body;

    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    if (assignment.status !== "draft") {
      return res.status(400).json({ message: "Assignment already submitted or approved" });
    }

    assignment.status = "submitted";
    assignment.reviewer = reviewerId;
    assignment.isLocked = true;

    await assignment.save();

    return res.status(200).json({
      message: "Assignment submitted for review successfully",
      assignment,
    });
  } catch (error) {
    console.error("Error submitting assignment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const downloadAssignmentFile = async (req, res) => {
  try {
    const { id } = req.params;

    const assignment = await Assignment.findById(id);

    if (!assignment) return res.status(404).json({ message: "File not found" });

    const filePath = assignment.fileUrl;

    res.download(filePath);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Download failed" });
  }
};

export const resubmitAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const studentId = req.user.id;

    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    if (assignment.student.toString() !== studentId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (assignment.status !== "rejected") {
      return res.status(400).json({ message: "Only rejected assignments can be resubmitted" });
    }

    // Keep old file reference in history
    assignment.history.push({
      action: "rejected",
      remark: assignment.rejectionRemark || "No remark",
      reviewer: assignment.reviewer,
      oldFileUrl: assignment.fileUrl,
      date: new Date()
    });

    // If new file uploaded, replace
    if (req.file) {
      assignment.fileUrl = req.file.path;
    }

    // Allow updating description
    if (description) {
      assignment.description = description;
    }

    // Change status back to "submitted"
    assignment.status = "submitted";

    // Add new submission entry to history
    assignment.history.push({
      action: "resubmitted",
      reviewer: assignment.reviewer,
      remark: "Student resubmitted after corrections",
      date: new Date()
    });

    await assignment.save();

    // 📩 Notify reviewer (placeholder)
    console.log("Notification: Assignment resubmitted to reviewer:", assignment.reviewer);

    return res.status(200).json({
      message: "Assignment resubmitted successfully",
      assignment
    });

  } catch (error) {
    console.error("Error in resubmit:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
