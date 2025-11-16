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

  if (loading) return <p className="p-6">Loading department data...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Edit Department</h2>

      {message && (
        <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="name"
          placeholder="Department Name"
          value={form.name}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border rounded p-2"
          required
        >
          <option value="">Select Type</option>
          <option value="Science">Science</option>
          <option value="Arts">Arts</option>
          <option value="Commerce">Commerce</option>
        </select>

        <input
          type="text"
          name="address"
          placeholder="Department Address"
          value={form.address}
          onChange={handleChange}
          className="border rounded p-2"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Department
        </button>
      </form>
    </div>
  );
}
