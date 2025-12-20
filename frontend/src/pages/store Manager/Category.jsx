import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar.jsx"

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [newRow, setNewRow] = useState(false); // controls empty row
  const [editRowId, setEditRowId] = useState(null); // track editing
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data.categories);
    } catch (err) {
      setError("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new category
  const handleAddCategory = async () => {
    if (!formData.name) return setError("Name is required");
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await axios.post("http://localhost:5000/api/categories", formData);
      setMessage("Category added successfully!");
      setFormData({ name: "", description: "" });
      setNewRow(false);
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  // Update category
  const handleUpdateCategory = async (id) => {
    if (!formData.name) return setError("Name is required");
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      await axios.put(`http://localhost:5000/api/categories/${id}`, formData);
      setMessage("Category updated successfully!");
      setEditRowId(null);
      setFormData({ name: "", description: "" });
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      setMessage("Category deleted successfully!");
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete category");
    }
  };

  return (
    <div className="px-4">
      <Navbar />
      <h2 className="text-2xl font-bold mb-4 bg-green-200 p-2 rounded-xl text-green-700">Manage Categories</h2>

      {message && <div className="bg-green-100 text-green-800 p-2 mb-4 rounded">{message}</div>}
      {error && <div className="bg-red-100 text-red-800 p-2 mb-4 rounded">{error}</div>}

      <div className = "flex items-end justify-end px-5">
        <button
          onClick={() => setNewRow(true)}
          className="bg-green-600 text-white px-4 py-2 rounded mb-4 hover:bg-green-700 shadow-lg"
        >
          New Category
        </button>
      </div>

      <div className="overflow-x-auto  bg-white shadow-2xl rounded-xl overflow-hidden ">
        <table className="w-full ">
          <thead className="bg-gray-700 text-white font-bold shadow-md">
            <tr>
              <th className=" px-4 py-2 text-left">Name</th>
              <th className=" px-4 py-2 text-left">Description</th>
              <th className=" px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {newRow && (
              <tr className="bg-green-100">
                <td className=" px-4 py-2">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Category name"
                    className="w-full  outline-none rounded"
                  />
                </td>
                <td className=" px-4 py-2">
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full outline-none"
                  />
                </td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={handleAddCategory}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setNewRow(false);
                      setFormData({ name: "", description: "" });
                    }}
                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            )}

            {/* Existing categories */}
            {categories.map((cat) => (
              <tr key={cat._id} className="hover:bg-gray-50">
                {editRowId === cat._id ? (
                  <>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border px-2 py-1 rounded"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border px-2 py-1 rounded"
                      />
                    </td>
                    <td className="border px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleUpdateCategory(cat._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditRowId(null);
                          setFormData({ name: "", description: "" });
                        }}
                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className=" px-4 py-2">{cat.name}</td>
                    <td className=" px-4 py-2">{cat.description}</td>
                    <td className=" px-4 py-2 space-x-2">
                      <button
                        onClick={() => {
                          setEditRowId(cat._id);
                          setFormData({ name: cat.name, description: cat.description });
                        }}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
