import React, { useEffect, useState } from "react";
import axios from "axios";

function StudentDashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/student/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUserData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
      {userData ? (
        <p>{userData.message}</p>
      ) : (
        <p>Loading your dashboard...</p>
      )}
    </div>
  );
}

export default StudentDashboard;
