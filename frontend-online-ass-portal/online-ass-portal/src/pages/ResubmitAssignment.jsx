import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function ResubmitAssignment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [assignment, setAssignment] = useState(null);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    axiosInstance.get(`/student/assignments/${id}`)
      .then(res => {
        setAssignment(res.data.assignment);
        setDescription(res.data.assignment.description);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("description", description);

    if (file) {
      form.append("file", file);
    }

    try {
      await axiosInstance.post(`/student/assignments/${id}/resubmit`, form);
      alert("Assignment resubmitted!");
      navigate("/student/my-assignments");
    } catch (err) {
      console.error(err);
      alert("Resubmission failed.");
    }
  };

  if (!assignment) return <p>Loading...</p>;

  const lastRejection = assignment.history.find(
    h => h.action === "rejected"
  );

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Resubmit Assignment</h1>

      <p className="mt-4 text-red-500 font-semibold">
        Rejection Remark: {lastRejection?.remark || "No remark"}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">

        <label>Description</label>
        <textarea
          className="w-full border p-2"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <label>Upload New File (optional)</label>
        <input type="file" onChange={e => setFile(e.target.files[0])} />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          Resubmit
        </button>
      </form>
    </div>
  );
}
