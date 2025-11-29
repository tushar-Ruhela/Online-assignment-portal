import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function ForgotResetPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1=email, 2=otp+password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // STEP 1 – Send OTP
  const sendOTP = async () => {
    try {
      setLoading(true);
      await axiosInstance.post("/auth/forgot-password", { email });
      alert("OTP sent to your email");
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2 – Reset Password
  const resetPassword = async () => {
    try {
      setLoading(true);
      await axiosInstance.post("/auth/reset-password", {
        email,
        otp,
        newPassword,
      });

      alert("Password reset successful!");

      // ✅ Redirect to login after success
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-purple-100 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-200 p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-extrabold text-purple-700">
          {step === 1 ? "Forgot Password" : "Reset Password"}
        </h2>
        <p className="mt-2 text-sm text-purple-500">
          {step === 1
            ? "Enter your email and we’ll send you an OTP to reset your password."
            : "Enter the OTP sent to your email and choose a new password."}
        </p>
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full p-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent placeholder:text-purple-300"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            onClick={sendOTP}
            disabled={loading || !email}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white py-3 rounded-lg font-semibold shadow-md transition"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full text-xs text-purple-500 mt-2 hover:underline"
          >
            Back to Login
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-1">
              OTP
            </label>
            <input
              type="text"
              className="w-full p-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent placeholder:text-purple-300"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              className="w-full p-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent placeholder:text-purple-300"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <button
            onClick={resetPassword}
            disabled={loading || !otp || !newPassword}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white py-3 rounded-lg font-semibold shadow-md transition"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          <button
            onClick={() => setStep(1)}
            className="w-full mt-2 text-sm text-purple-600 hover:underline"
          >
            Change Email
          </button>
        </div>
      )}
    </div>
  </div>
);
}
