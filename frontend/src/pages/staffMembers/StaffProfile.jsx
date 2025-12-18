import React from "react";
import { useAuth } from "../../../context/authContext.jsx";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
      {/* Header */}
      <div className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold text-green-700">My Profile</h1>
        <p className="text-gray-500">User account information</p>
      </div>

      {/* Profile Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm text-gray-500">Full Name</label>
          <div className="mt-1 p-3 border rounded-md bg-gray-50">
            {user?.name || "N/A"}
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-500">Email</label>
          <div className="mt-1 p-3 border rounded-md bg-gray-50">
            {user?.email || "N/A"}
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-500">Role</label>
          <div className="mt-1 p-3 border rounded-md bg-gray-50 capitalize">
            {user?.role || "N/A"}
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-500">Department</label>
          <div className="mt-1 p-3 border rounded-md bg-gray-50">
            {user?.department || "General"}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex gap-4">
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition">
          Edit Profile
        </button>

        <button className="border border-green-600 text-green-600 hover:bg-green-50 px-6 py-2 rounded-md transition">
          Change Password
        </button>
      </div>
    </div>
  );
};

export default Profile;
