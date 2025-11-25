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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 border border-purple-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-purple-900 mb-2">Create New User</h2>
          <p className="text-purple-600 text-sm">Fill in the details to add a new user</p>
        </div>

        {message && (
          <div className="mb-6 p-4 rounded-lg bg-purple-50 border border-purple-200">
            <p className="text-center text-purple-700 font-medium">{message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-purple-900 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-purple-300"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-900 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-purple-300"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-900 mb-2">
              Password (Optional)
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-purple-300"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-900 mb-2">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-purple-300"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-900 mb-2">
              Role
            </label>
            <select
              name="role"
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white text-purple-900 cursor-pointer"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="Student">Student</option>
              <option value="Professor">Professor</option>
              <option value="HOD">HOD</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-900 mb-2">
              Department
            </label>
            <select
              name="department"
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white text-purple-900 cursor-pointer"
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
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
