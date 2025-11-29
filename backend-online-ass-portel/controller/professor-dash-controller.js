// controller/professor-controller.js
import Assignment from "../model/Assignment.js";

export const getProfessorDashboard = async (req, res) => {
  try {
    const professorId = req.user.id;

    const assignments = await Assignment.find({
      reviewer: professorId,
      status: "submitted",
    })
      .populate("student", "name email")
      .sort({ submittedAt: 1 });

    return res.json({
      pendingCount: assignments.length,
      assignments,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Professor dashboard error" });
  }
};
