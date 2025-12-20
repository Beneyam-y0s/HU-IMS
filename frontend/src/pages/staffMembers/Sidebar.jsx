import React from "react";
import {
  FaHome,
  FaPlus,
  FaShare,
  FaUser,
  FaSignOutAlt,
  FaPhone,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import BittomImg from "../../assets/An Inventory Management System that is more….jpeg";

function StaffMember() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/customer/dashboard/home",
      icon: <FaHome />,
      isParent: true,
    },
    {
      name: "About Us",
      path: "/customer/dashboard/about",
      icon: <FaShare />,
    },
    {
      name: "Profile",
      path: "/customer/dashboard/profile",
      icon: <FaUser />,
    },
    {
      name: "Contact Us",
      path: "/customer/dashboard/contact",
      icon: <FaPhone />,
    },
    {
      name: "Logout",
      path: "/customer/dashboard/logout",
      icon: <FaSignOutAlt />,
    },
    
  ];

  return (
    <div className="flex min-h-screen bg-neutral-50">

      {/* ===== SIDEBAR ===== */}
      <aside className="w-[260px] bg-green-200 fixed left-0 top-0 h-screen flex flex-col justify-between p-6">

        {/* Logo */}
        <div className="text-center font-bold text-xl text-green-800">
          HU IMS
        </div>

       
        <div className="flex flex-col items-center">
          <NavLink
            to="/customer/dashboard/request"
            className={({ isActive }) =>
                      `
                      flex items-center gap-3 px-9 py-3 w-fit  mt-6 bg-green-100 rounded-lg cursor-pointer hover:bg-green-600 hover:text-white transition shadow 
                      ${
                        isActive
                          ? "bg-green-600/70 text-white shadow-inner font-semibold"
                          : "hover:bg-green-600/70"
                      }
                      `
                    } 
          >
            <div>
              <span className="text-sm">Create</span>
              <h2 className="font-semibold">New Request</h2>
            </div>
            <span className="bg-green-600 text-white p-2 rounded-full">
              <FaPlus />
            </span>
          </NavLink>
        </div>

        
        <nav className="mt-6  flex items-center justify-center">
          <ul className="flex flex-col  gap-2 text-gray-800">
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  end={item.isParent}
                  to={item.path}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-4 px-4 py-2.5 rounded-lg transition-all duration-200
                    ${
                      isActive
                        ? "bg-green-700/70 text-white shadow-inner font-semibold"
                        : "hover:bg-green-600/70"
                    }
                    `
                  }
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        
        <div className="bg-green-100 rounded-lg p-3 text-center">
          <img src={BittomImg} alt="upgrade" className="w-20 mx-auto mb-2" />
          <p className="text-sm mb-2">
            Stay with us and get new updates
          </p>
          <button className="bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700 transition">
            Subscribe
          </button>
        </div>

        <div className="text-center text-xs text-green-700 mt-4">
          © HU Inventory System
        </div>
      </aside>

      
    
    </div>
  );
}

export default StaffMember;
