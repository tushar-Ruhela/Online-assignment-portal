import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const sendOTP = async () => {
    try {
      await axiosInstance.post("/auth/forgot-password", { email });
      setOtpSent(true);
      alert("OTP sent to your email");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>

      <input
        type="email"
        className="w-full p-3 border rounded mb-3"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={sendOTP}
        className="w-full bg-purple-600 text-white py-3 rounded"
      >
        Send OTP
      </button>

      {otpSent && (
        <p className="mt-3 text-center text-sm text-green-600">
          OTP sent! Now check Reset Password page.
        </p>
      )}
    </div>
  );
}

export default ForgotPassword;
