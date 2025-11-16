import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("http://localhost:5000/admin/users");
      setUsers(res.data.users);
      console.log(res.data.users);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    try {
      const res = await axiosInstance.delete(`http://localhost:5000/admin/users/${id}`);
      setMessage(res.data.message);
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Error deleting user");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-purple-900 mb-2">
            User Management
          </h2>
          <p className="text-purple-600">Manage and monitor all users in the system</p>
        </div>

        {/* Message Alert */}
        {message && (
          <div className="mb-6 p-4 bg-purple-100 border-l-4 border-purple-500 rounded-r-lg shadow-md">
            <p className="text-purple-800 font-medium">{message}</p>
          </div>
        )}

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-purple-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-purple-200">
              <thead className="bg-gradient-to-r from-purple-600 to-purple-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-white uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-purple-100">
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr
                      key={user._id}
                      className={`
                        transition-all duration-200 hover:bg-purple-50
                        ${index % 2 === 0 ? "bg-white" : "bg-purple-25"}
                      `}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700">
                          {user.department || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center">
                      <div className="text-gray-500 text-sm">
                        No users found
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-purple-600">
            Total Users: <span className="font-bold">{users.length}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserList;
