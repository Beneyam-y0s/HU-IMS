import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar.jsx"
const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newRow, setNewRow] = useState(false);
  const [editRowId, setEditRowId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    productId: "",
    category: "",
    buyDate: "",
    status: "new",
    department: "IT",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const statusOptions = ["new", "used", "damaged"];
  const departments = [
    "IT",
    "Information Science",
    "Information System",
    "Computer Science",
    "Software",
    "Shared",
  ];

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data.products);
    } catch (err) {
      setError("Failed to load products");
    }
  };

  // Fetch categories for dropdown
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data.categories);
    } catch (err) {
      setError("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      await axios.post("http://localhost:5000/api/products", formData);
      setMessage("Product registered successfully!");
      setFormData({
        name: "",
        productId: "",
        category: "",
        buyDate: "",
        status: "new",
        department: "IT",
      });
      setNewRow(false);
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register product");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async (id) => {
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, formData);
      setMessage("Product updated successfully!");
      setEditRowId(null);
      setFormData({
        name: "",
        productId: "",
        category: "",
        buyDate: "",
        status: "new",
        department: "IT",
      });
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setMessage("Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete product");
    }
  };

  return (
    <div className="max-w-6xl   px-4 ">
        <Navbar />
      <h2 className="text-2xl font-bold mb-4 bg-green-200 p-4 rounded-xl text-green-700">Manage Products</h2>

      {message && <div className="bg-green-100 text-green-800 p-2 mb-4 rounded">{message}</div>}
      {error && <div className="bg-red-100 text-red-800 p-2 mb-4 rounded">{error}</div>}

      <div className="flex justify-end">
        <button
            onClick={() => setNewRow(true)}
            className="bg-green-600 text-white px-4 py-2 rounded mb-4 hover:bg-green-700"
        >
            New Product
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl">
        <table className="w-full ">
          <thead className="bg-gray-700 text-white font-bold shadow-md">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Product ID</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Buy Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* New Product Row */}
            {newRow && (
              <tr className="bg-green-50">
                <td className=" px-4 py-2">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Product Name"
                    className="w-full  px-2 py-1 rounded"
                  />
                </td>
                <td className=" px-4 py-2">
                  <input
                    type="text"
                    name="productId"
                    value={formData.productId}
                    onChange={handleChange}
                    placeholder="Product ID"
                    className="w-full  px-2 py-1 rounded"
                  />
                </td>
                <td className=" px-4 py-2 ">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border px-2 py-1 rounded "
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className=" px-4 py-2">
                  <input
                    type="date"
                    name="buyDate"
                    value={formData.buyDate}
                    onChange={handleChange}
                    className="w-full border px-2 py-1 rounded"
                  />
                </td>
                <td className=" px-4 py-2">
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border px-2 py-1 rounded"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </td>
                <td className=" px-4 py-2">
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full border px-2 py-1 rounded"
                  >
                    {departments.map((dep) => (
                      <option key={dep} value={dep}>
                        {dep}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="flex gap-2 px-4 py-2 space-x-2">
                  <button
                    onClick={handleAddProduct}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setNewRow(false);
                      setFormData({
                        name: "",
                        productId: "",
                        category: "",
                        buyDate: "",
                        status: "new",
                        department: "IT",
                      });
                    }}
                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            )}

            {/* Existing Products */}
            {products.map((prod) => (
              <tr key={prod._id} className="hover:bg-gray-50">
                {editRowId === prod._id ? (
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
                        name="productId"
                        value={formData.productId}
                        onChange={handleChange}
                        className="w-full border px-2 py-1 rounded"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border px-2 py-1 rounded"
                      >
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat.name}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="date"
                        name="buyDate"
                        value={formData.buyDate}
                        onChange={handleChange}
                        className="w-full border px-2 py-1 rounded"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full border px-2 py-1 rounded"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border px-4 py-2">
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full border px-2 py-1 rounded"
                      >
                        {departments.map((dep) => (
                          <option key={dep} value={dep}>
                            {dep}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleUpdateProduct(prod._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditRowId(null);
                          setFormData({
                            name: "",
                            productId: "",
                            category: "",
                            buyDate: "",
                            status: "new",
                            department: "IT",
                          });
                        }}
                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="bg-gray-50  px-4 py-2">{prod.name}</td>
                    <td className="bg-gray-50  px-4 py-2">{prod.productId}</td>
                    <td className="bg-gray-50  px-4 py-2">{prod.category}</td>
                    <td className="bg-gray-50  px-4 py-2">{prod.buyDate?.slice(0, 10)}</td>
                    <td className="bg-gray-50  px-4 py-2">{prod.status}</td>
                    <td className="bg-gray-50  px-4 py-2">{prod.department}</td>
                    <td className="bg-gray-50  px-4 py-2 space-x-2">
                      <button
                        onClick={() => {
                          setEditRowId(prod._id);
                          setFormData({
                            name: prod.name,
                            productId: prod.productId,
                            category: prod.category,
                            buyDate: prod.buyDate?.slice(0, 10),
                            status: prod.status,
                            department: prod.department,
                          });
                        }}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(prod._id)}
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

export default Product;
