import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/authContext.jsx";
import Navbar from "../../components/Navbar.jsx";

const RequestDepartmentView = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [loadingStatusId, setLoadingStatusId] = useState(null);

  const normalizeDepartment = (dept) => {
    const map = {
      "Information Technology": "Information Technology",
      "Information Science": "Information Science",
      "Information System": "Information System",
      "Computer Science": "Computer Science",
      "Software Engineering": "Software",
    };
    return map[dept] || dept;
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/requests");
      const userDept = normalizeDepartment(user.department);

      const deptRequests = res.data.filter(
        (r) => r.department === userDept
      );

      setRequests(deptRequests);
    } catch {
      setError("Failed to load requests");
    }
  };

  useEffect(() => {
    if (!user?.department) return;
    fetchRequests();
  }, [user]);

  const handleStatusChange = async (id, newStatus) => {
    setLoadingStatusId(id);
    try {
      await axios.patch(`http://localhost:5000/api/requests/${id}/status`, {
        status: newStatus,
      });
      fetchRequests();
    } catch (err) {
      setError("Failed to update status");
    } finally {
      setLoadingStatusId(null);
    }
  };

  return (
    <div className="max-w-6xl px-4">
      <Navbar />

      <h2 className="text-2xl font-bold mb-4 bg-green-200 p-4 rounded-xl text-green-700">
        Requests — {user?.department} Department
      </h2>

      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}

      <div className="overflow-x-auto rounded-xl">
        <table className="w-full">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="px-4 py-2">Requestor</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Specific Item</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{req.name}</td>
                <td className="px-4 py-2">{req.email}</td>
                <td className="px-4 py-2">{req.category}</td>
                <td className="px-4 py-2">{req.specificItem}</td>
                <td className="px-4 py-2">{req.description}</td>
                <td className="px-4 py-2 font-semibold">{req.status}</td>
                <td className="px-4 py-2 flex gap-2">
                  {["pending", "approved", "not approved"].map((s) => (
                    <button
                      key={s}
                      disabled={loadingStatusId === req._id || req.status === s}
                      onClick={() => handleStatusChange(req._id, s)}
                      className={`px-3 py-1 rounded text-white ${
                        s === "approved"
                          ? "bg-green-500 hover:bg-green-600"
                          : s === "pending"
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : "bg-red-500 hover:bg-red-600"
                      } disabled:opacity-50`}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </td>
              </tr>
            ))}

            {requests.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No requests for your department
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestDepartmentView;
