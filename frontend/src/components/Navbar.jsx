import React from 'react';
import {
  FaCalendarCheck,
  FaRing,
  FaArrowDown
} from "react-icons/fa";

import { useAuth } from "../../context/authContext.jsx";

function Navbar() {
  const { user } = useAuth();

  // 1. Logic for human-readable role
  // We define this outside the JSX to keep the return statement clean.
  let roleDisplayName = "User"; // Default fallback
  if (user?.role === "storeManager") {
    roleDisplayName = "Store Manager";
  } else if (user?.role === "admin") {
    roleDisplayName = "Administrator";
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-12 mt-6">
        <div>
          {/* 2. Fixed the display syntax */}
          <h1 className="text-xl font-bold">{roleDisplayName}</h1>
          <p className="text-sm text-gray-600">
            <span className="text-green-600 font-semibold">Monday</span> · 02 March 2025
          </p>
        </div>

        <div className="flex items-center gap-6">
          <FaCalendarCheck className="text-xl text-gray-600 cursor-pointer" />
          <FaRing className="text-xl text-gray-600 cursor-pointer" />

          <div className="flex items-center gap-2 cursor-pointer">
            <span className="bg-green-600 text-white px-3 py-1 rounded-lg font-bold">
              {/* Optional: Get initials dynamically */}
              {user?.name?.substring(0, 2).toUpperCase() || "??"}
            </span>
            <span className="font-medium">{user?.name}</span>
            <FaArrowDown className="text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;