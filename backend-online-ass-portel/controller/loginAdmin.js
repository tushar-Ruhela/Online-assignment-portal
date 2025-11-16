import User from "../model/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const ADMIN_EMAIL = "admin@portal.com";
const ADMIN_PASSWORD = "admin123"; 

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

  
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = jwt.sign(
  { id: "admin001", role: "Admin" },
  process.env.secret,
  { expiresIn: "1d" }
);

      return res.status(200).json({
        message: "Admin login successful",
        token,
        role: "Admin",
        name: "Super Admin",
      });
    }


    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.secret,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
      name: user.name,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
