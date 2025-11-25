import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const ViewUsers = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    role: "All",
    department: "All",
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const { search, role, department } = filters;
      const res = await axiosInstance.get("/admin/users", {
        params: { search, role, department, page },
      });
      setUsers(res.data.users);
      setPagination(res.data.pagination);
    } catch (err) {
      setError("Failed to fetch users. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await axiosInstance.get("/admin/users/departments");
      setDepartments(res.data);
    } catch (err) {
      console.error("Failed to fetch departments", err);
    }
  };

  // Fetch departments only once on mount
  useEffect(() => {
    fetchDepartments();
  }, []);

  // Fetch users with debouncing for search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchUsers(1);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filters.search, filters.role, filters.department]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(1);
  };

  const handlePageChange = (page) => {
    setPagination({ ...pagination, currentPage: page });
    fetchUsers(page);
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axiosInstance.delete(`/admin/users/${userId}`);
        fetchUsers(pagination.currentPage);
      } catch (err) {
        console.error("Failed to delete user", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-purple-900 mb-2">All Users</h2>
          <p className="text-purple-600">Manage and view all registered users</p>
        </div>

        {/* Filters */}
        <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-purple-900 mb-2">
                Search
              </label>
              <input
                type="text"
                name="search"
                placeholder="Search by name or email"
                value={filters.search}
                onChange={handleFilterChange}
                className="w-full border border-purple-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-purple-900 mb-2">
                Role
              </label>
              <select
                name="role"
                value={filters.role}
                onChange={handleFilterChange}
                className="w-full border border-purple-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition bg-white"
              >
                <option value="All">All Roles</option>
                <option value="Student">Student</option>
                <option value="Professor">Professor</option>
                <option value="HOD">HOD</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-900 mb-2">
                Department
              </label>
              <select
                name="department"
                value={filters.department}
                onChange={handleFilterChange}
                className="w-full border border-purple-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition bg-white"
              >
                <option value="All">All Departments</option>
                {departments.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200 shadow-md hover:shadow-lg"
            >
              Search
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-12 h-12 text-purple-200 animate-spin fill-purple-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {/* Users Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-purple-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Department</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-100">
                    {users.length > 0 ? (
                      users.map((u) => (
                        <tr key={u._id} className="hover:bg-purple-50 transition duration-150">
                          <td className="px-6 py-4 text-sm text-gray-900">{u.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{u.email}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                              {u.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{u.department}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                                u.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {u.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              className="text-purple-600 hover:text-purple-800 font-medium mr-4 transition"
                              onClick={() => navigate(`/edit-user/${u._id}`)}
                            >
                              Edit
                            </button>
                            <button
                              className="text-red-600 hover:text-red-800 font-medium transition"
                              onClick={() => handleDelete(u._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                          No users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 gap-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    pagination.currentPage === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white text-purple-600 hover:bg-purple-100 border border-purple-300"
                  }`}
                >
                  Previous
                </button>

                {Array.from({ length: pagination.totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      pagination.currentPage === i + 1
                        ? "bg-purple-600 text-white shadow-md"
                        : "bg-white text-purple-600 hover:bg-purple-100 border border-purple-300"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    pagination.currentPage === pagination.totalPages
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white text-purple-600 hover:bg-purple-100 border border-purple-300"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewUsers;
