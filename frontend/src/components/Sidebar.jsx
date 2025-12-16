import React from "react";
import { useAuth } from "../../context/authContext.jsx";
import {
  FaHome,
  FaTable,
  FaBox,
  FaTruck,
  FaShoppingCart,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaUserPlus
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const {user} = useAuth();
  const menuItems = [
    {   name: "Dashboard", path: "/admin/dashboard", 
        icon: <FaHome />, 
        roles: ["admin", "storeManager"], 
        isParent: true
    },
    {   name: "Users", 
        path: "/admin/dashboard/users", 
        icon: <FaUser />, 
        roles: ["admin", "storeManager", "departmentHead", "universityAuth", "staffMember" ], 
        isParent: false 
    },
    {   name: "Categories", 
        path: "/admin/dashboard/categories", 
        icon: <FaTable />, 
        roles: ["admin", "storeManager"], 
        isParent: false 
    },
    { name: "Products", 
        path: "/admin/dashboard/products", 
        icon: <FaBox />, 
        roles: ["admin", "storeManager", "departmentHead", "universityAuth"], 
        isParent: false 
    },
    // {  name: "Suppliers", 
    //     path: "/admin/dashboard/suppliers", 
    //     icon: <FaTruck />, 
    //     roles: ["admin", "storeManager"], 
    //     isParent: false 
    // },
    {   name: "Orders", 
        path: "/admin/dashboard/orders", 
        icon: <FaShoppingCart />, 
        roles: ["admin", "storeManager"], 
        isParent: false 
    },
    {   name: "Profile", 
        path: "/admin/dashboard/profile", 
        icon: <FaCog />, 
        roles: ["admin", "storeManager", "departmentHead", "universityAuth", "staffMember"], 
        isParent: false 
    },
    {   name: "Logout", 
        path: "/admin/dashboard/logout", 
        icon: <FaSignOutAlt />, 
        roles: ["admin", "storeManager", "departmentHead", "universityAuth", "staffMember"], 
        isParent: false 
    },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(user.role))

  return (
    <div className="flex flex-col h-screen fixed bg-green-600/90 text-white w-16 md:w-64 py-4 px-2">

      <div className="h-16 flex flex-items justify-center">
        <span className=" md:hidden text-xl text-center font-bold">HU IMS</span>
        <span className="text-lg  font-bold hidden md:block text-gray-300">Haramaya University MS</span>
      </div>

      <ul className="px-">
        {filteredMenu.map((item) => (
          <li key={item.name}>
            <NavLink
              end={item.isParent}
              to={item.path}
              className={({ isActive }) =>
                (isActive ? "bg-green-700 " : "") +
                "flex items-center gap-3 px-4 p-2 hover:bg-green-700 rounded-md mb-2 transition-colors duration-200"
                }

            >
              <span className="text-xl">{item.icon}</span>
              <span className="hidden md:block hover:font-medium ">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default Sidebar;
