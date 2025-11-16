import Department from "../model/Department.js";
import User from "../model/User.js"; 


export const createDepartment = async (req, res) => {
  console.log("create ")
  try {
    const { name, type, address } = req.body;

    if (!name || !type) {
      return res.status(400).json({ message: "Name and Type are required" });
    }

    const existing = await Department.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Department already exists" });
    }
    console.log("hello",existing)
    const department = new Department({ name, type, address });
    await department.save();

    res.status(201).json({
      message: "Department created successfully",
      department,
    });
  } catch (error) {
    
    res.status(500).json({ message: error.message });
  }
};


export const getAllDepartments = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", type } = req.query;

    const filter = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (type) {
      filter.type = type;
    }

    const total = await Department.countDocuments(filter);

    const departments = await Department.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    // Optional: add number of users per department
    // const departmentsWithCount = await Promise.all(
    //   departments.map(async (dept) => {
    //     const userCount = await User.countDocuments({ department: dept._id });
    //     return { ...dept.toObject(), userCount };
    //   })
    // );

    res.status(200).json({
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      departments, 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateDepartment = async (req, res) => {
  try {
    const { name, type, address } = req.body;

    const department = await Department.findByIdAndUpdate(
      req.params.id,
      { name, type, address },
      { new: true }
    );

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({
      message: "Department updated successfully",
      department,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    const userCount = await User.countDocuments({ department: department._id });
    if (userCount > 0) {
      return res.status(400).json({
        message: "Cannot delete department with assigned users.",
      });
    }

    await Department.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
