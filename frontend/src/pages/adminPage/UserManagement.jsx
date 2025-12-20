import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar.jsx";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newRow, setNewRow] = useState(false);
  const [editRowId, setEditRowId] = useState(null);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    universityId: "",
    role: "staffMember",
    department: "General",
  });

  const roles = ["admin", "storeManager", "departmentHead", "universityAuth", "staffMember"];
  const departments = [
    "General",
    "Information Technology",
    "Information Science",
    "Information System",
    "Computer Science",
    "Software",
    "Shared",
  ];

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ================= HANDLERS =================
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddUser = async () => {
    await axios.post("http://localhost:5000/api/users", formData);
    setNewRow(false);
    setFormData({
      name: "",
      email: "",
      password: "",
      universityId: "",
      role: "staffMember",
      department: "General",
    });
    fetchUsers();
  };

  const handleUpdateUser = async (id) => {
    await axios.put(`http://localhost:5000/api/users/${id}`, formData);
    setEditRowId(null);
    fetchUsers();
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    fetchUsers();
  };

  // ================= SEARCH =================
  const filteredUsers = users.filter((u) =>
    [u.name, u.universityId, u.role, u.department]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ================= SORT =================
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aVal = a[sortConfig.key]?.toString().toLowerCase();
    const bVal = b[sortConfig.key]?.toString().toLowerCase();
    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const requestSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  // ================= UI =================
  return (
    <div className="max-w-7xl px-4">
      <Navbar />

      <h2 className="text-2xl font-bold mb-4 bg-green-200 p-4 rounded-xl text-green-700">
        User Management
      </h2>

      {/* Search + New */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by name, ID, role, department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-1/2"
        />
        <button
          onClick={() => setNewRow(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          New User
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl">
        <table className="w-full">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => requestSort("name")}>Name</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => requestSort("email")}>Email</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => requestSort("universityId")}>ID</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => requestSort("role")}>Role</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => requestSort("department")}>Department</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {/* ADD ROW */}
            {newRow && (
              <tr className="bg-green-50">
                <td className="px-4 py-2">—</td>
                <td className="px-4 py-2">
                  <input name="name" onChange={handleChange} className="w-full border px-2 py-1 rounded" />
                </td>
                <td className="px-4 py-2">
                  <input name="email" onChange={handleChange} className="w-full border px-2 py-1 rounded" />
                </td>
                <td className="px-4 py-2">
                  <input name="universityId" onChange={handleChange} className="w-full border px-2 py-1 rounded" />
                </td>
                <td className="px-4 py-2">
                  <select name="role" onChange={handleChange} className="w-full border px-2 py-1 rounded">
                    {roles.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </td>
                <td className="px-4 py-2">
                  <select name="department" onChange={handleChange} className="w-full border px-2 py-1 rounded">
                    {departments.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button onClick={handleAddUser} className="bg-green-500 text-white px-3 py-1 rounded">Save</button>
                  <button onClick={() => setNewRow(false)} className="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
                </td>
              </tr>
            )}

            {/* USERS */}
            {sortedUsers.map((u, index) => (
              <tr key={u._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 font-semibold">{index + 1}</td>

                {editRowId === u._id ? (
                  <>
                    <td className="px-4 py-2"><input value={formData.name} name="name" onChange={handleChange} className="w-full border px-2 py-1 rounded" /></td>
                    <td className="px-4 py-2"><input value={formData.email} name="email" onChange={handleChange} className="w-full border px-2 py-1 rounded" /></td>
                    <td className="px-4 py-2"><input value={formData.universityId} name="universityId" onChange={handleChange} className="w-full border px-2 py-1 rounded" /></td>
                    <td className="px-4 py-2">
                      <select value={formData.role} name="role" onChange={handleChange} className="w-full border px-2 py-1 rounded">
                        {roles.map((r) => <option key={r}>{r}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      <select value={formData.department} name="department" onChange={handleChange} className="w-full border px-2 py-1 rounded">
                        {departments.map((d) => <option key={d}>{d}</option>)}
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
                    <td className="px-4 py-2">{u.universityId}</td>
                    <td className="px-4 py-2">{u.role}</td>
                    <td className="px-4 py-2">{u.department}</td>
                    <td className="px-4 flex py-2 space-x-2">
                      <button
                        onClick={() => {
                          setEditRowId(u._id);
                          setFormData(u);
                        }}
                        className="bg-yellow-500 text-white px-5 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
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

      <p className="mt-4 text-sm text-gray-600">
        Showing <b>{sortedUsers.length}</b> of <b>{users.length}</b> users
      </p>
    </div>
  );
};

export default UserManagement;
