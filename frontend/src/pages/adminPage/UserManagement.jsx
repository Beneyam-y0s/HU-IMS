import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ViewUser from './ViewUser.jsx';
import AddUser from './AddUser.jsx';
import UpdateUser from './UpdateUser.jsx';
import DeleteUser from './DeleteUser.jsx';
import {useAuth} from "../../../context/authContext.jsx";
import { FaCalendarCheck, FaRing, FaArrowDown } from 'react-icons/fa';

const UserManagement = () => {
  const {user} = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('view');

  const fetchUsers = async () => {
    const token = localStorage.getItem('pos-token'); 
    try {
      const config = {
        headers: { 'Content-Type': 'application/json', 'x-auth-token': token }
      };
      const res = await axios.get('/api/users', config); 
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Fetch error:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.msg : 'Failed to fetch users.');
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []); 

  if (loading) return <div className="text-center p-8">Loading users...</div>;
  if (error) return <div className="text-red-600 p-8">Error: {error}</div>;

  return (
    <div>
      <div className="px-7 flex justify-between items-center mb-12 mt-6">
          <div>
            <h1 className="text-xl font-bold">Dashboard</h1>
            <p className="text-sm text-gray-600">
              <span className="text-green-600 font-semibold">Monday</span> · 02 March 2025
            </p>
          </div>

          <div className="flex items-center gap-6">
            <FaCalendarCheck className="text-xl text-gray-600 cursor-pointer" />
            <FaRing className="text-xl text-gray-600 cursor-pointer" />

            <div className="flex items-center gap-2 cursor-pointer">
              <span className="bg-green-600 text-white px-3 py-1 rounded-lg font-bold">
                BY
              </span>
              <span className="font-medium">Beneyam Yohannes</span>
              <FaArrowDown className="text-gray-600" />
            </div>
          </div>
        </div>

      <div className='bg-green-200 text-gray-700 flex justify-between p-3 m-6 rounded-lg'>
        <div className='flex align-center just'>
            <h1 className='font-bold text-xl'>User Administration</h1>
        </div>
        <div className='flex gap-4 font-semibold'>
          {['view', 'add', 'update', 'delete'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded ${activeTab === tab ? 'bg-white text-green-600 font-bold' : 'hover:bg-green-700/80'}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="m-6">
        {activeTab === 'view' && <ViewUser users={users} />}
        {activeTab === 'add' && <AddUser />}
        {activeTab === 'update' && <UpdateUser />}
        {activeTab === 'delete' && <DeleteUser />}
      </div>
    </div>
  );
};

export default UserManagement;
