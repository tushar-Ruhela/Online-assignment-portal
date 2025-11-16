import Department from "../model/Department.js";
import User from "../model/User.js";

export const getDashboardData = async (req, res) => {
  try {
    const totalDepartments = await Department.countDocuments();
   const totalStudents = await User.countDocuments({ role: "Student" });
const totalProfessors = await User.countDocuments({ role: "Professor" });
const totalHODs = await User.countDocuments({ role: "HOD" });

    res.status(200).json({
      message: "Dashboard data fetched successfully",
      data: {
        totalDepartments,
        totalUsers: totalStudents + totalProfessors + totalHODs,
        totalStudents,
        totalProfessors,
        totalHODs,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
