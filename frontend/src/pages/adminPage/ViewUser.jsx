import React, { useState, useEffect } from 'react';
import axios from 'axios'; // npm install axios

const ViewUser = () => {
const mockUsers = [
  {
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    address: '123 Street',
    role: 'admin',
    department: 'IT',
    universityId: 'U001'
  },
  {
    _id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    address: '456 Avenue',
    role: 'staffMember',
    department: 'HR',
    universityId: 'U002'
  },
  {
    _id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    address: '789 Road',
    role: 'departmentHead',
    department: 'Finance',
    universityId: 'U003'
  }
];





  const [users, setUsers] = useState([mockUsers]);
  const [loading, setLoading] = useState(true); // optional, for loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users'); // your backend endpoint
        setUsers(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // empty dependency array means it runs once on mount

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div>
      <div className="bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-100">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-700 text-white font-bold shadow-md">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
          Name
        </th>
        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
          Email
        </th>
        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
        ID
        </th>
        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
          Role
        </th>
        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
          Department
        </th>
        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-100">
      {users.map((user) => (
        <tr key={user._id} className="hover:bg-green-50 transition duration-150 ease-in-out">
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {user.name}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
            {user.email}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {user.universityID || 'N/A'}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            {/* Role Badge - Added a simple visual indicator for the role */}
            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'Admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
              {user.role}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
            {user.department}
          </td>
          
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
            <button className="text-blue-600 hover:text-blue-800 font-medium transition duration-150 ease-in-out p-1 rounded-md hover:bg-blue-100">
              Edit
            </button>
            <button className="text-red-600 hover:text-red-800 font-medium transition duration-150 ease-in-out p-1 rounded-md hover:bg-red-100">
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  {users.length === 0 && (
    <div className="p-6 text-center text-gray-500 border-t border-gray-100">
      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172A4 4 0 0112 20c2.21 0 4-1.79 4-4H8c0 2.21 1.79 4 4 4zm-7.965-7.965A12 12 0 0112 4a12 12 0 0110.793 4.207M20.914 13.914A10 10 0 0012 2a10 10 0 00-8.914 11.914" />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
      <p className="mt-1 text-sm text-gray-500">Get started by adding a new user.</p>
    </div>
  )}
</div>
    </div>
  );
};

export default ViewUser;
