import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get("/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-gradient-br from-purple-50 to-purple-100">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600 border-solid mb-4"></div>
            <p className="text-lg text-gray-700 font-medium">Loading Dashboard...</p>
          </div>
        </div>
      </>
    );
  }

  // Extract all values
  const totalDepartments = stats?.data?.totalDepartments || 0;
  const totalUsers = stats?.data?.totalUsers || 0;
  const totalStudents = stats?.data?.totalStudents || 0;
  const totalProfessors = stats?.data?.totalProfessors || 0;
  const totalHODs = stats?.data?.totalHODs || 0;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-br from-purple-50 to-purple-100 p-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
            <p className="text-gray-600">Overview of your system statistics</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Total Departments */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Total Departments
                  </p>
                  <p className="text-4xl font-bold text-purple-600 mt-2">{totalDepartments}</p>
                </div>
                <div className="bg-purple-100 rounded-full p-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <span className="flex items-center">Active departments</span>
              </div>
            </div>

            {/* Total Users */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Total Users
                  </p>
                  <p className="text-4xl font-bold text-purple-600 mt-2">{totalUsers}</p>
                </div>
                <div className="bg-purple-100 rounded-full p-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <span className="flex items-center">Registered users</span>
              </div>
            </div>

            {/* Total Students */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                Total Students
              </p>
              <p className="text-4xl font-bold text-purple-600 mt-2">{totalStudents}</p>
            </div>

            {/* Total Professors */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                Total Professors
              </p>
              <p className="text-4xl font-bold text-purple-600 mt-2">{totalProfessors}</p>
            </div>

            {/* Total HODs */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                Total HODs
              </p>
              <p className="text-4xl font-bold text-purple-600 mt-2">{totalHODs}</p>
            </div>

          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link to="/create-department"
                className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium text-center">
                Add Department
              </Link>

              <Link to="/create-user"
                className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium text-center">
                Add User
              </Link>

              <Link to="/view-users"
                className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium text-center">
                View Reports
              </Link>

              <Link to="/user-list"
                className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium text-center">
                user-list
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
