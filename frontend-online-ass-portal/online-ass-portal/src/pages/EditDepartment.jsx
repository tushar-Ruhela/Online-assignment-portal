import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function EditDepartment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    type: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const res = await axiosInstance.get(`/admin/departments/${id}`);
        setForm({
          name: res.data.name,
          type: res.data.type,
          address: res.data.address || "",
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDepartment();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put(`/admin/departments/${id}`, form);
      setMessage(res.data.message);
      setTimeout(() => navigate("/departments-list"), 1500);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600 mb-4"></div>
          <p className="text-purple-700 text-lg font-semibold">Loading department data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 border border-purple-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-purple-900 mb-2">Edit Department</h2>
          <p className="text-purple-600 text-sm">Update department information</p>
        </div>

        {message && (
          <div className="mb-6 p-4 rounded-lg bg-purple-50 border-l-4 border-purple-500 animate-pulse">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-purple-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-purple-700 font-medium">{message}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-purple-900 mb-2">
              Department Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter department name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-purple-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-900 mb-2">
              Department Type
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white text-purple-900 cursor-pointer"
              required
            >
              <option value="">Select Type</option>
              <option value="Science">PG</option>
              <option value="Arts">UG</option>
              <option value="Commerce">Research</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-900 mb-2">
              Department Address
            </label>
            <input
              type="text"
              name="address"
              placeholder="Enter department address"
              value={form.address}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-purple-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
          >
            Update Department
          </button>
        </form>
      </div>
    </div>
  );
}
