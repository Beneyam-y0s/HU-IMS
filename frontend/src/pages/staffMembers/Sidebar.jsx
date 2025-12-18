import React from "react";
import {
  FaHome,
  FaPlus,
  FaShare,
  FaShower,
  FaLayerGroup,
  FaServicestack,
  FaCalendarCheck,
  FaRing,
  FaArrowDown,
  FaEdit,
  FaRemoveFormat,
  FaCog,
  FaUser,
  FaSignOutAlt,
  FaBell,
  FaPhone
} from "react-icons/fa";
import BittomImg from "../../assets/An Inventory Management System that is more….jpeg";
import Dashboard from "../Dahsboard";
import { NavLink } from "react-router-dom";

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
          isParent: false,
        },
        {
          name: "Profile",
          path: "/customer/dashboard/profile",
          icon: <FaUser />,
          isParent: false,
        },
        {
          name: "Contact Us",
          path: "/customer/dashboard/contact",
          icon: <FaPhone />,
          isParent: false,
        },
        {
          name: "Logout",
          path: "/customer/dashboard/logout",
          icon: <FaSignOutAlt />,
          isParent: false,
        },
      ];


  return (
    <div className="flex bg-neutral-50 min-h-screen">

      {/* ===== SIDEBAR ===== */}
      <aside className=" w-[260px] bg-green-200 fixed left-0 top-0 h-screen flex flex-col justify-between items-center p-6 m-0">

        {/* Logo */}
        <div className="text-center font-bold text-xl">
          HU IMS
        </div>

        {/* Create Button */}
        <div className="flex justify-center">
          <div className="flex items-center gap-3 p-3 mt-5 bg-green-100 rounded-lg cursor-pointer hover:shadow-lg transition">
            <div>
              <span className="text-green-600 text-sm">Create</span>
              <h2 className="font-semibold">New Request</h2>
            </div>
            <span className="bg-green-600 text-white p-2 rounded-full">
              <FaPlus />
            </span>
          </div>
        </div>

       <div className="flex items-center justify-center mb-2">
        <nav className="flex flex-col gap-2 mt-2  text-gray-700">
          {menuItems.map((item) => (
            <li className="list-none" key={item.name}>
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
                <span className="hidden md:block">{item.name}</span>
            </NavLink>
            </li>
        ))}
        </nav>
       </div>
        

        {/* Subscribe Card */}
        <div className="flex flex-col items-center bg-green-100 rounded-lg py-2 w-fit px-2">
          <img src={BittomImg} alt="upgrade" className="w-20 mx-auto mb-2" />
          <p className="text-sm w-40 text-center mb-2">
            Stay with us and get new updates
          </p>
          <button className="bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700 transition">
            Subscribe
          </button>
        </div>
        <div className="hidden md:block text-center text-xs text-green-200 py-4 border-t border-green-500/40">
          © HU Inventory System
        </div>
      </aside>

        
    
      
    </div>
  );
}

export default StaffMember;
