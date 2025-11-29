import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "Student",
    department: "",
  });

  const [departments, setDepartments] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axiosInstance
      .get("/admin/users/departments")
      .then((res) => setDepartments(res.data))
      .catch(() => setMessage("Failed to load departments"));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axiosInstance.post("/admin/users/create", formData);
      setMessage(res.data.message);
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "Student",
        department: "",
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "Error creating user");
    }
  };

 return (
  <div className="min-h-screen bg-emerald-50 flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border-2 border-emerald-100 p-6 sm:p-8">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-emerald-800 mb-2">
          Create New User
        </h2>
        <p className="text-emerald-600 text-sm">
          Fill in the details to add a new user
        </p>
      </div>

      {message && (
        <div className="mb-6 p-4 rounded-lg bg-emerald-50 border-2 border-emerald-200">
          <p className="text-center text-emerald-700 font-medium text-sm sm:text-base">
            {message}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 placeholder-gray-400 text-sm"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter email address"
            className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 placeholder-gray-400 text-sm"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Password (Optional)
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 placeholder-gray-400 text-sm"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            placeholder="Enter phone number"
            className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 placeholder-gray-400 text-sm"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Role
          </label>
          <select
            name="role"
            className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white text-gray-900 cursor-pointer text-sm"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="Student">Student</option>
            <option value="Professor">Professor</option>
            <option value="HOD">HOD</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Department
          </label>
          <select
            name="department"
            className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white text-gray-900 cursor-pointer text-sm"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 shadow-md hover:shadow-lg text-sm sm:text-base"
        >
          Create User
        </button>
      </form>
    </div>
  </div>
);

};

export default CreateUser;
