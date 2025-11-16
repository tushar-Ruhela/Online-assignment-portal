import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function CreateDepartment() {
  const [form, setForm] = useState({ name: "", type: "", address: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/admin/departments/create", form);
      setMessage(res.data.message);
      setForm({ name: "", type: "", address: "" });
      
      // Navigate after successful creation
      setTimeout(() => {
        navigate("/departments-list");
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error creating department");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-purple-900 mb-2">
              Create Department
            </h2>
            <p className="text-purple-600">Add a new department to the system</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-purple-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Department Name Input */}
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-sm font-semibold text-purple-900 mb-2"
                >
                  Department Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter department name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-900 hover:border-purple-300"
                />
              </div>

              {/* Program Type Select */}
              <div>
                <label 
                  htmlFor="type" 
                  className="block text-sm font-semibold text-purple-900 mb-2"
                >
                  Program Type
                </label>
                <div className="relative">
                  <select
                    id="type"
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 appearance-none cursor-pointer hover:border-purple-300 bg-white"
                  >
                    <option value="" disabled className="text-gray-400">
                      Select Program Type
                    </option>
                    <option value="UG" className="text-gray-900">UG</option>
                    <option value="PG" className="text-gray-900">PG</option>
                    <option value="Research" className="text-gray-900">Research</option>
                  </select>
                  {/* Custom Dropdown Arrow */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-purple-600">
                    <svg 
                      className="h-5 w-5" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Department Address Input */}
              <div>
                <label 
                  htmlFor="address" 
                  className="block text-sm font-semibold text-purple-900 mb-2"
                >
                  Department Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  placeholder="Enter department address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-900 resize-none hover:border-purple-300"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Create Department
                </button>
              </div>

              {/* Cancel/Back Button */}
              <div>
                <button
                  type="button"
                  onClick={() => navigate("/departments-list")}
                  className="w-full bg-white text-purple-700 font-semibold py-3 px-6 rounded-lg border-2 border-purple-300 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
                >
                  View All Departments
                </button>
              </div>
            </form>

            {/* Message Display */}
            {message && (
              <div className="mt-6 p-4 bg-purple-100 border-l-4 border-purple-500 rounded-r-lg shadow-md animate-fade-in">
                <p className="text-purple-800 font-medium">{message}</p>
              </div>
            )}
          </div>

          {/* Helper Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-purple-600">
              All fields are required to create a new department
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
