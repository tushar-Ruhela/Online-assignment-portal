import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import ConfirmModel from "../components/ConfirmModel";
import { useNavigate } from "react-router-dom";

export default function DepartmentsList() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDept, setSelectedDept] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admin/departments");
      console.log("hello", res.data);
      setDepartments(res.data.departments || []);
      console.log(res.data.departments);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axiosInstance.delete(`/admin/departments/${id}`);
      setDepartments((prev) => prev.filter((d) => d._id !== id));
    } catch (error) {
      console.error(error.response?.data?.message || "Error deleting department");
    }
  };

  const confirmDelete = (dept) => {
    setSelectedDept(dept);
    setModalOpen(true);
    setMessage(
      `Are you sure you want to delete the department "${dept.name}"? This action cannot be undone.`
    );
  };

  const onConfirmDelete = async () => {
    if (!selectedDept) return;
    setModalOpen(false);
    await handleDelete(selectedDept._id);
  };

 if (loading) {
  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block">
          <svg
            className="w-16 h-16 text-emerald-200 animate-spin fill-emerald-600"
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
        </div>
        <p className="mt-4 text-emerald-700 font-semibold text-lg">Loading departments...</p>
      </div>
    </div>
  );
}

  return (
  <div className="min-h-screen bg-emerald-50 p-4 sm:p-6 lg:p-8">
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-emerald-800 mb-2">
            Departments
          </h1>
          <p className="text-sm sm:text-base text-emerald-600">
            Manage all departments in the system
          </p>
        </div>
        <button
          onClick={() => navigate("/create-department")}
          className="w-full sm:w-auto px-6 py-3 bg-emerald-700 text-white font-semibold rounded-lg hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          + Add Department
        </button>
      </div>

      {/* Table Container */}
      {departments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg border-2 border-emerald-100 p-8 sm:p-12 text-center">
          <svg
            className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-emerald-300 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <p className="text-gray-500 text-base sm:text-lg mb-4">
            No departments found.
          </p>
          <button
            onClick={() => navigate("/create-department")}
            className="px-6 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors font-semibold"
          >
            Create Your First Department
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg border-2 border-emerald-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-emerald-200">
              <thead className="bg-emerald-700">
                <tr>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Department Name
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Program Type
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs font-bold text-white uppercase tracking-wider">
                    Total Users
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs font-bold text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-emerald-100">
                {departments.map((dept, index) => (
                  <tr
                    key={dept._id}
                    className={`
                      transition-all duration-200 hover:bg-emerald-50
                      ${index % 2 === 0 ? "bg-white" : "bg-emerald-25"}
                    `}
                  >
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
                          <span className="text-emerald-700 font-bold text-sm">
                            {dept.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-3 sm:ml-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {dept.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                        {dept.type}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-sm font-medium text-gray-900">
                        {dept.userCount || 0}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex flex-col sm:flex-row justify-center gap-2">
                        <button
                          onClick={() => navigate(`/admin/departments/edit/${dept._id}`)}
                          className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => confirmDelete(dept)}
                          className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-red-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 shadow-sm"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Summary Footer */}
      <div className="mt-6 text-center">
        <p className="text-sm sm:text-base text-emerald-600">
          Total Departments: <span className="font-bold text-emerald-800">{departments.length}</span>
        </p>
      </div>
    </div>

    {/* Confirmation Modal */}
    <ConfirmModel
      isOpen={modalOpen}
      onClose={() => setModalOpen(false)}
      onConfirm={onConfirmDelete}
      message={message}
    />
  </div>
);

}
