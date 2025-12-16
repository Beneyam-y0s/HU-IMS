import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateUser = ({ onUserUpdated }) => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    role: 'staffMember',
    department: 'General',
    universityId: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const roles = ['admin', 'storeManager', 'departmentHead', 'universityAuth', 'staffMember'];
  const departments = ['General', 'IT', 'HR', 'Finance', 'Marketing'];

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/:id');
      setUsers(res.data);
    } catch (err) {
      console.error('Fetch users error:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSelectUser = (e) => {
    const userId = e.target.value;
    setSelectedUserId(userId);
    const user = users.find(u => u._id === userId);
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        address: user.address || '',
        role: user.role || 'staffMember',
        department: user.department || 'General',
        universityId: user.universityId || ''
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUserId) return;

    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await axios.put(`http://localhost:5000/api/users/${selectedUserId}`, formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      setMessage('User updated successfully!');
      fetchUsers(); // refresh list
      if (onUserUpdated) onUserUpdated(res.data.user);
    } catch (err) {
      console.error('Update user error:', err);
      setError(err.response?.data?.msg || 'Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Update User</h2>

      {message && <div className="bg-green-100 text-green-800 p-2 mb-4 rounded">{message}</div>}
      {error && <div className="bg-red-100 text-red-800 p-2 mb-4 rounded">{error}</div>}

      <div className="mb-4">
        <label className="block mb-1 font-medium">Select User</label>
        <select
          value={selectedUserId}
          onChange={handleSelectUser}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">-- Select --</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
      </div>

      {selectedUserId && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border px-3 py-2 rounded"/>
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border px-3 py-2 rounded"/>
          </div>

          <div>
            <label className="block mb-1 font-medium">Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full border px-3 py-2 rounded"/>
          </div>

          <div>
            <label className="block mb-1 font-medium">University ID</label>
            <input type="text" name="universityId" value={formData.universityId} onChange={handleChange} className="w-full border px-3 py-2 rounded"/>
          </div>

          <div>
            <label className="block mb-1 font-medium">Role</label>
            <select name="role" value={formData.role} onChange={handleChange} className="w-full border px-3 py-2 rounded">
              {roles.map(role => <option key={role} value={role}>{role}</option>)}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Department</label>
            <select name="department" value={formData.department} onChange={handleChange} className="w-full border px-3 py-2 rounded">
              {departments.map(dep => <option key={dep} value={dep}>{dep}</option>)}
            </select>
          </div>

          <button type="submit" disabled={loading} className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">
            {loading ? 'Updating...' : 'Update User'}
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateUser;
