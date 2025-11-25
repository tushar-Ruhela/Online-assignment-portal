import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const resetPassword = async () => {
    try {
      await axiosInstance.post("/auth/reset-password", {
        email,
        otp,
        newPassword,
      });

      alert("Password reset successful");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>

      <input
        type="email"
        className="w-full p-3 border rounded mb-3"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="text"
        className="w-full p-3 border rounded mb-3"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <input
        type="password"
        className="w-full p-3 border rounded mb-3"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <button
        onClick={resetPassword}
        className="w-full bg-purple-600 text-white py-3 rounded"
      >
        Reset Password
      </button>
    </div>
  );
}

export default ResetPassword;
