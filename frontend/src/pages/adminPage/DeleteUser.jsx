// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const DeleteUser = ({ onUserDeleted }) => {
//   const [users, setUsers] = useState([]);
//   const [selectedUserId, setSelectedUserId] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);
//   const [error, setError] = useState(null);

//   // Fetch users
//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/users/:id');
//       setUsers(res.data);
//     } catch (err) {
//       console.error('Fetch users error:', err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleDelete = async () => {
//     if (!selectedUserId) return;
//     if (!window.confirm('Are you sure you want to delete this user?')) return;

//     setLoading(true);
//     setMessage(null);
//     setError(null);

//     try {
//       await axios.delete(`http://localhost:5000/api/users/${selectedUserId}`);
//       setMessage('User deleted successfully!');
//       setUsers(users.filter(u => u._id !== selectedUserId));
//       setSelectedUserId('');
//       if (onUserDeleted) onUserDeleted(selectedUserId);
//     } catch (err) {
//       console.error('Delete user error:', err);
//       setError(err.response?.data?.msg || 'Failed to delete user');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Delete User</h2>

//       {message && <div className="bg-green-100 text-green-800 p-2 mb-4 rounded">{message}</div>}
//       {error && <div className="bg-red-100 text-red-800 p-2 mb-4 rounded">{error}</div>}

//       <div className="mb-4">
//         <label className="block mb-1 font-medium">Select User</label>
//         <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)} className="w-full border px-3 py-2 rounded">
//           <option value="">-- Select --</option>
//           {users.map(user => <option key={user._id} value={user._id}>{user.name} ({user.email})</option>)}
//         </select>
//       </div>

//       <button onClick={handleDelete} disabled={loading || !selectedUserId} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
//         {loading ? 'Deleting...' : 'Delete User'}
//       </button>
//     </div>
//   );
// };

// export default DeleteUser;
