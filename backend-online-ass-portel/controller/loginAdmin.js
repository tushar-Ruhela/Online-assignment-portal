import User from "../model/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/sendEmails.js";

const ADMIN_EMAIL = "admin@portal.com";
const ADMIN_PASSWORD = "admin123";


export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    console.log(email,password,role);
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD && role === "Admin") {
      const token = jwt.sign({ id: "admin001", role: "Admin" }, process.env.secret, {
        expiresIn: "1d",
      });

      return res.status(200).json({
        message: "Admin login successful",
        token,
        role: "Admin",
        name: "Super Admin",
      });
    }

    
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role !== role)
      return res.status(400).json({ message: "Role mismatch" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });
    console.log("AUTH ROUTE FILE LOADED");


    const token = jwt.sign({ id: user._id, role: user.role }, process.env.secret, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    user.resetOTP = otp;
    user.resetOTPExpiration = Date.now() + 5 * 60 * 1000; // 5 min
    await user.save();

    
    await sendEmail(
      email,
      "Password Reset OTP",
      `
      <h2>Your OTP Code</h2>
      <p>Your OTP for password reset is:</p>
      <h1>${otp}</h1>
      <p>This OTP is valid for <b>5 minutes</b>.</p>
      `
    );

    res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.resetOTP != otp)
      return res.status(400).json({ message: "Invalid OTP" });

    if (user.resetOTPExpiration < Date.now())
      return res.status(400).json({ message: "OTP expired" });

    
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOTP = null;
    user.resetOTPExpiration = null;
    await user.save();

   
    await sendEmail(
      email,
      "Password Reset Successfully",
      `
      <h2>Password Updated</h2>
      <p>Your password has been reset successfully.</p>
      `
    );

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
