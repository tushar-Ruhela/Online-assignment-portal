import React, { useState, useRef, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const roles = [
    { value: "Admin", label: "Admin" },
    { value: "Student", label: "Student" },
    { value: "Professor", label: "Professor" },
    { value: "HOD", label: "HOD" }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsRoleOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axiosInstance.post("/auth/login", {
        email,
        password,
        role,
      });
      console.log(data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      navigate(`/${data.role.toLowerCase()}-dashboard`);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 px-4 py-8">
      <div className="w-full max-w-md">
        
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border-2 border-emerald-100">
          {/* Logo/Icon area */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-700 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-emerald-800 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 text-sm">
              Please login to your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-3 border-2 border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-3 border-2 border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Custom Role Dropdown */}
            <div className="space-y-2" ref={dropdownRef}>
              <label className="text-sm font-semibold text-gray-700 block">
                Login As
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <svg className="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                
                {/* Custom Dropdown Button */}
                <button
                  type="button"
                  onClick={() => setIsRoleOpen(!isRoleOpen)}
                  className={`w-full pl-10 pr-10 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white cursor-pointer text-sm transition-all text-left ${
                    role ? 'text-gray-900 border-emerald-200' : 'text-gray-500 border-emerald-200'
                  } ${isRoleOpen ? 'border-emerald-500' : ''}`}
                >
                  {role || "Select your role"}
                </button>

                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg 
                    className={`h-5 w-5 text-emerald-600 transition-transform duration-200 ${isRoleOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Dropdown Options */}
                {isRoleOpen && (
                  <div className="absolute z-20 w-full mt-2 bg-white border-2 border-emerald-200 rounded-lg shadow-lg overflow-hidden">
                    {roles.map((roleOption) => (
                      <div
                        key={roleOption.value}
                        onClick={() => {
                          setRole(roleOption.value);
                          setIsRoleOpen(false);
                        }}
                        className="px-4 py-3 hover:bg-emerald-50 cursor-pointer text-sm text-gray-700 hover:text-emerald-800 transition-colors border-b border-emerald-50 last:border-b-0"
                      >
                        {roleOption.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-end pt-1">
              <a 
                href="/forgot-password" 
                className="text-sm font-medium text-emerald-700 hover:text-emerald-800 hover:underline transition-colors"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button 
              type="submit"
              disabled={!role}
              className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
            >
              Login
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a 
                href="/signup" 
                className="font-semibold text-emerald-700 hover:text-emerald-800 hover:underline transition-colors"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center text-xs text-gray-500 mt-6">
          © 2025 Your Company. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;
