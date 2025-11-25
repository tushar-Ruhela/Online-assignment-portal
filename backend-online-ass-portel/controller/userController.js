import mongoose from "mongoose";
import User from "../model/User.js";
import Department from "../model/Department.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/sendEmails.js";


export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // if (user.role === "Student") {
    //   const pendingAssignments = await Assignment.find({
    //     studentId: id,
    //     status: "Pending",
    //   });

    //   if (pendingAssignments.length > 0) {
    //     return res.status(400).json({
    //       success: false,
    //       message: "Cannot delete this student — they have pending assignments.",
    //     });
    //   }
    // }

    await User.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting user",
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("department", "name");
    if (!user) return res.status(404).json({ message: "User not found" });

    const departments = await Department.find().select("name _id");
    res.status(200).json({ user, departments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch user details" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email, phone, department, password } = req.body;
    const userId = req.params.id;

    const existingUser = await User.findById(userId);
    if (!existingUser) return res.status(404).json({ message: "User not found" });

    const emailExists = await User.findOne({ email, _id: { $ne: userId } });
    if (emailExists) return res.status(400).json({ message: "Email already in use" });

    const updatedData = { name, email, phone, department };
    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;
    }

    await User.findByIdAndUpdate(userId, updatedData, { new: true });

    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating user" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { search = "", role = "All", department = "All", page = 1 } = req.query;
    const limit = 20;
    const skip = (page - 1) * limit;

    const matchStage = {};

    
    if (role !== "All") {
      matchStage.role = role;
    }

    
    if (department !== "All") {
      matchStage.department = new mongoose.Types.ObjectId(department);
    }

 
    if (search.trim() !== "") {
      matchStage.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    
    const users = await User.aggregate([
      { $match: matchStage },
      {
        $lookup: {
          from: "departments",
          localField: "department",
          foreignField: "_id",
          as: "department",
        },
      },
      {
        $unwind: { path: "$department", preserveNullAndEmptyArrays: true },
      },
      {
        $project: {
          name: 1,
          email: 1,
          role: 1,
          phone: 1,
          status: { $literal: "Active" },
          department: { $ifNull: ["$department.name", "N/A"] },
        },
      },
      { $skip: skip },
      { $limit: limit },
    ]);

    const totalUsers = await User.countDocuments(matchStage);

    res.status(200).json({
      users,
      pagination: {
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: Number(page),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, department, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const dept = await Department.findById(department);
    if (!dept) return res.status(404).json({ message: "Department not found" });

    const newUser = new User({
      name,
      email,
      password: password || "Default@123",
      department,
      role,
    });


    // email content
    const emailHtml = `
      <h2>Welcome to Online Assignment Portal</h2>
      <p>Hello <strong>${name}</strong>,</p>
      <p>Your account has been created successfully.</p>
      <p><strong>Login Details:</strong></p>
      <ul>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Password:</strong> ${password}</li>
        <li><strong>Role:</strong> ${role}</li>
      </ul>
      <p>You can login here: <a href="http://localhost:5173/">Login Page</a></p>
    `;

   
    await sendEmail(email, "Your Login Credentials - Online Assignment Portal", emailHtml);

    
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User added & email sent successfully",
      user: newUser,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getDepartmentsList = async (req, res) => {
  try {
    const departments = await Department.find({}, "_id name");
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch departments" });
  }
};
