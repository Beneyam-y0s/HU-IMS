import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/authContext.jsx";
import Navbar from "../../components/Navbar.jsx";

const ProductDepartment = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const normalizeDepartment = (dept) => {
    const map = {
      "Information Technology": "IT",
      "Information Science": "Information Science",
      "Information System": "Information System",
      "Computer Science": "Computer Science",
      "Software Engineering": "Software",
    };
    return map[dept] || dept;
  };

  useEffect(() => {
    if (!user?.department) return;

    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");

        const userDept = normalizeDepartment(user.department);

        const departmentProducts = res.data.products.filter(
          (p) => p.department === userDept
        );

        setProducts(departmentProducts);
      } catch (err) {
        setError("Failed to load products");
      }
    };

    fetchProducts();
  }, [user]);

  return (
    <div className="max-w-6xl px-4">
      <Navbar />

      <h2 className="text-2xl font-bold mb-4 bg-green-200 p-4 rounded-xl text-green-700">
        Products — {user?.department}
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-xl">
        <table className="w-full">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Product ID</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Buy Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Department</th>
            </tr>
          </thead>

          <tbody>
            {products.map((prod) => (
              <tr key={prod._id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{prod.name}</td>
                <td className="px-4 py-2">{prod.productId}</td>
                <td className="px-4 py-2">{prod.category}</td>
                <td className="px-4 py-2">
                  {prod.buyDate?.slice(0, 10)}
                </td>
                <td className="px-4 py-2">{prod.status}</td>
                <td className="px-4 py-2">{prod.department}</td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500"
                >
                  No products found for your department
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDepartment;
