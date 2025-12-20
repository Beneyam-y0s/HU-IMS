import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/authContext.jsx";

const Request = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    category: "",
    item: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const categories = ["Tech", "Furniture", "Other"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      // Map context data + form data to the backend payload
      const payload = {
        name: user?.name,
        email: user?.email,
        universityID: user?.universityID, // Match capital "ID" from backend
        department: user?.department,
        category: formData.category.toLowerCase(),
        specificItem: formData.item,
        description: formData.description,
      };

      await axios.post("http://localhost:5000/api/requests", payload);

      setMessage("Request created successfully!");
      setFormData({ category: "", item: "", description: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Create Request</h2>

      {message && <div className="bg-green-100 text-green-800 p-2 mb-4 rounded">{message}</div>}
      {error && <div className="bg-red-100 text-red-800 p-2 mb-4 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* Read-Only User Info from Context */}
        <div>
          <label className="block mb-1 font-medium">Requestor Name</label>
          <input type="text" value={user?.name || ""} disabled className="w-full border px-3 py-2 rounded bg-gray-100" />
        </div>

        <div>
          <label className="block mb-1 font-medium">University ID</label>
          <input type="text" value={user?.universityID || "N/A"} disabled className="w-full border px-3 py-2 rounded bg-gray-100" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Department</label>
          <input type="text" value={user?.department || ""} disabled className="w-full border px-3 py-2 rounded bg-gray-100" />
        </div>

        {/* Input Fields */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select name="category" value={formData.category} onChange={handleChange} required className="w-full border px-3 py-2 rounded">
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="col-span-2">
          <label className="block mb-1 font-medium">Specific Item</label>
          <input
            type="text"
            name="item"
            value={formData.item}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. Dell Laptop"
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 col-span-2 disabled:bg-gray-400"
        >
          {loading ? "Submitting..." : "Create Request"}
        </button>
      </form>
    </div>
  );
};

export default Request;