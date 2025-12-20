import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar.jsx";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newRow, setNewRow] = useState(false);
  const [editRowId, setEditRowId] = useState(null);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const initialFormState = {
    name: "",
    email: "",
    password: "",
    universityID: "", 
    role: "staffMember",
    department: "General",
  };

  const [formData, setFormData] = useState(initialFormState);

  const roles = ["admin", "storeManager", "departmentHead", "universityAuth", "staffMember"];
  const departments = [
    "General", "Information Technology", "Information Science", 
    "Information System", "Computer Science", "Software", "Shared",
  ];

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddUser = async () => {
    try {
      await axios.post("http://localhost:5000/api/users", formData);
      setNewRow(false);
      setFormData(initialFormState);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Error adding user");
    }
  };

  const handleUpdateUser = async (id) => {
    try {
      const { password, ...updateData } = formData; 
      await axios.put(`http://localhost:5000/api/users/${id}`, updateData);
      setEditRowId(null);
      fetchUsers();
    } catch (err) {
      alert("Error updating user");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert("Error deleting user");
    }
  };

  const filteredUsers = users.filter((u) =>
    [u.name, u.universityID, u.role, u.department]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aVal = a[sortConfig.key]?.toString().toLowerCase() || "";
    const bVal = b[sortConfig.key]?.toString().toLowerCase() || "";
    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const requestSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <Navbar />

      <h2 className="text-2xl font-bold mb-4 bg-green-200 p-4 rounded-xl text-green-700">
        User Management
      </h2>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by name, ID, role, department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-1/2"
        />
        <button
          onClick={() => { setNewRow(true); setFormData(initialFormState); }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          New User
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-sm ">
        <table className="w-full text-left">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => requestSort("name")}>Name</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => requestSort("email")}>Email</th>
              <th className="px-4 py-2">Password</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => requestSort("universityID")}>ID</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {/* CREATE NEW USER ROW (INCLUDES PASSWORD) */}
            {newRow && (
              <tr className="bg-green-50">
                <td className="px-4 py-2">—</td>
                <td className="px-4 py-2"><input name="name" onChange={handleChange} className="w-full border px-2 py-1 rounded" placeholder="Name"/></td>
                <td className="px-4 py-2"><input name="email" onChange={handleChange} className="w-full border px-2 py-1 rounded" placeholder="Email"/></td>
                {/* Password input is ONLY visible here */}
                <td className="px-4 py-2"><input name="password" type="password" onChange={handleChange} className="w-full border border-green-400 px-2 py-1 rounded" placeholder="Set Password"/></td>
                <td className="px-4 py-2"><input name="universityID" onChange={handleChange} className="w-full border px-2 py-1 rounded" placeholder="ID"/></td>
                <td className="px-4 py-2">
                  <select name="role" onChange={handleChange} className="w-full border px-2 py-1 rounded">
                    {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </td>
                <td className="px-4 py-2">
                  <select name="department" onChange={handleChange} className="w-full border px-2 py-1 rounded">
                    {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button onClick={handleAddUser} className="bg-green-500 text-white px-3 py-1 rounded">Save</button>
                  <button onClick={() => setNewRow(false)} className="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
                </td>
              </tr>
            )}

            {/* VIEW/EDIT ROWS (PASSWORD COLUMN IS BLANK) */}
            {sortedUsers.map((u, index) => (
              <tr key={u._id} className="hover:bg-gray-50 border-t">
                <td className="px-4 py-2">{index + 1}</td>

                {editRowId === u._id ? (
                  <>
                    <td className="px-4 py-2"><input value={formData.name} name="name" onChange={handleChange} className="w-full border px-2 py-1 rounded" /></td>
                    <td className="px-4 py-2"><input value={formData.email} name="email" onChange={handleChange} className="w-full border px-2 py-1 rounded" /></td>
                    <td className="px-4 py-2"></td> {/* Password column is empty during edit */}
                    <td className="px-4 py-2"><input value={formData.universityID} name="universityID" onChange={handleChange} className="w-full border px-2 py-1 rounded" /></td>
                    <td className="px-4 py-2">
                      <select value={formData.role} name="role" onChange={handleChange} className="w-full border px-2 py-1 rounded">
                        {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      <select value={formData.department} name="department" onChange={handleChange} className="w-full border px-2 py-1 rounded">
                        {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-2 space-x-2">
                      <button onClick={() => handleUpdateUser(u._id)} className="bg-green-500 text-white px-3 py-1 rounded">Save</button>
                      <button onClick={() => setEditRowId(null)} className="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-2">{u.name}</td>
                    <td className="px-4 py-2">{u.email}</td>
                    <td className="px-4 py-2 text-gray-300 italic text-xs">N/A</td> {/* Password is not included on view */}
                    <td className="px-4 py-2">{u.universityID}</td>
                    <td className="px-4 py-2">{u.role}</td>
                    <td className="px-4 py-2">{u.department}</td>
                    <td className="px-4 flex py-2 space-x-2">
                      <button onClick={() => { setEditRowId(u._id); setFormData(u); }} className="bg-yellow-500 text-white px-4 py-1 rounded">Edit</button>
                      <button onClick={() => handleDeleteUser(u._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
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

export default UserManagement;