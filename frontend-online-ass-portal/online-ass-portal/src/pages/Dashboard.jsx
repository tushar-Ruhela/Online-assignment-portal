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
        <div className="flex items-center justify-center min-h-screen bg-emerald-50">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-emerald-600 border-solid mb-4"></div>
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
      <div className="min-h-screen bg-emerald-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-800 mb-2">
              Admin Dashboard
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Overview of your system statistics
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

            {/* Total Departments */}
            <div className="bg-white rounded-xl shadow-md border-2 border-emerald-100 p-5 sm:p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Total Departments
                  </p>
                  <p className="text-3xl sm:text-4xl font-bold text-emerald-700 mt-2">
                    {totalDepartments}
                  </p>
                </div>
                <div className="bg-emerald-100 rounded-full p-3 sm:p-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
              <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm text-gray-500">
                <span>Active departments</span>
              </div>
            </div>

            {/* Total Users */}
            <div className="bg-white rounded-xl shadow-md border-2 border-emerald-100 p-5 sm:p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Total Users
                  </p>
                  <p className="text-3xl sm:text-4xl font-bold text-emerald-700 mt-2">
                    {totalUsers}
                  </p>
                </div>
                <div className="bg-emerald-100 rounded-full p-3 sm:p-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
              <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm text-gray-500">
                <span>Registered users</span>
              </div>
            </div>

            {/* Total Students */}
            <div className="bg-white rounded-xl shadow-md border-2 border-emerald-100 p-5 sm:p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Total Students
                  </p>
                  <p className="text-3xl sm:text-4xl font-bold text-emerald-700 mt-2">
                    {totalStudents}
                  </p>
                </div>
                <div className="bg-emerald-100 rounded-full p-3 sm:p-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Total Professors */}
            <div className="bg-white rounded-xl shadow-md border-2 border-emerald-100 p-5 sm:p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Total Professors
                  </p>
                  <p className="text-3xl sm:text-4xl font-bold text-emerald-700 mt-2">
                    {totalProfessors}
                  </p>
                </div>
                <div className="bg-emerald-100 rounded-full p-3 sm:p-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Total HODs */}
            <div className="bg-white rounded-xl shadow-md border-2 border-emerald-100 p-5 sm:p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Total HODs
                  </p>
                  <p className="text-3xl sm:text-4xl font-bold text-emerald-700 mt-2">
                    {totalHODs}
                  </p>
                </div>
                <div className="bg-emerald-100 rounded-full p-3 sm:p-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Actions */}
          <div className="mt-6 sm:mt-8 bg-white rounded-xl shadow-md border-2 border-emerald-100 p-5 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-emerald-800 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <Link to="/departments-list"
                className="px-4 py-3 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors duration-200 font-semibold text-center text-sm sm:text-base">
                Department List
              </Link>

              <Link to="/create-user"
                className="px-4 py-3 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors duration-200 font-semibold text-center text-sm sm:text-base">
                Add User
              </Link>

              <Link to="/view-users"
                className="px-4 py-3 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors duration-200 font-semibold text-center text-sm sm:text-base">
                View All Users
              </Link>

              <Link to="/user-list"
                className="px-4 py-3 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors duration-200 font-semibold text-center text-sm sm:text-base">
                User List
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
