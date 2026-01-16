import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar.jsx";

const StoreManagerRequests = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);

  const fetchApprovedRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/requests");
      // Only show approved requests
      const approvedRequests = res.data.filter((r) => r.status === "approved");
      setRequests(approvedRequests);
    } catch (err) {
      console.error(err);
      setError("Failed to load approved requests");
    }
  };

  useEffect(() => {
    fetchApprovedRequests();
  }, []);

  return (
    <div className="max-w-6xl px-4">
      <Navbar />
      <h2 className="text-2xl font-bold mb-4 bg-green-200 p-4 rounded-xl text-green-700">
        Approved Requests — Store Manager
      </h2>

      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}

      <div className="overflow-x-auto rounded-xl">
        <table className="w-full">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="px-4 py-2">Requestor</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Specific Item</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{req.name}</td>
                <td className="px-4 py-2">{req.email}</td>
                <td className="px-4 py-2">{req.department}</td>
                <td className="px-4 py-2">{req.category}</td>
                <td className="px-4 py-2">{req.specificItem}</td>
                <td className="px-4 py-2">{req.description}</td>
                <td className="px-4 py-2 font-semibold text-green-600">{req.status}</td>
              </tr>
            ))}

            {requests.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No approved requests yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoreManagerRequests;
