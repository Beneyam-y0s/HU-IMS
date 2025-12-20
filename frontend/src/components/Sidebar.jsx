import React from "react";
import { useAuth } from "../../context/authContext.jsx";
import {
  FaHome,
  FaTable,
  FaBox,
  FaShoppingCart,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { user } = useAuth();
  const roleBasePath = {
    admin: "/admin",
    storeManager: "/storeManager",
    departmentHead: "/departmentHead",
    universityAuth: "/universityAuth",
  };

  const basePath = roleBasePath[user.role];

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
      roles: ["admin", "storeManager", "departmentHead", "universityAuth"],
      isParent: true,
    },
    {
      name: "Users",
      path: "/dashboard/users",
      icon: <FaUser />,
      roles: [
        "admin",
        
      ],
    },
    {
      name: "Categories",
      path: "/dashboard/categories",
      icon: <FaTable />,
      roles: ["admin", "storeManager"],
    },
    {
      name: "Products",
      path: "/dashboard/products",
      icon: <FaBox />,
      roles: ["admin", "storeManager", "departmentHead", "universityAuth"],
    },
    {
      name: "Requests",
      path: "/dashboard/requests",
      icon: <FaShoppingCart />,
      roles: ["admin", "storeManager", "departmentHead", "universityAuth"],
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: <FaCog />,
      roles: [
        "admin",
        "storeManager",
        "departmentHead",
        "universityAuth",
        "staffMember",
      ],
    },
    {
      name: "Logout",
      path: "/dashboard/logout",
      icon: <FaSignOutAlt />,
      roles: [
        "admin",
        "storeManager",
        "departmentHead",
        "universityAuth",
        "staffMember",
      ],
    },
  ];

  // 🔹 Filter menu by role
  const filteredMenu = menuItems.filter((item) =>
    item.roles.includes(user.role)
  );

  return (
    <aside className="fixed h-screen w-16 md:w-64 bg-green-200 text-gray-800 shadow-xl flex flex-col">

      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b mt-3 border-green-500/40">
        <span className="md:hidden font-bold text-lg">HU</span>
        <span className="hidden md:block font-bold text-lg tracking-wide text-neutral-800">
          Haramaya University IMS
        </span>
      </div>

      {/* Menu */}
      <nav className="flex-1 mt-6 px-2">
        <ul className="space-y-1">
          {filteredMenu.map((item) => (
            <li key={item.name}>
              <NavLink
                end={item.isParent}
                to={`${basePath}${item.path}`}
                className={({ isActive }) =>
                  `
                  flex items-center gap-4 px-4 py-2.5 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? "bg-green-700/70 shadow-inner font-semibold text-white"
                      : "hover:bg-green-600/70 text-gray-900"
                  }
                `
                }
              >
                <span className="text-lg">{item.icon}</span>
                <span className="hidden md:block">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="hidden md:block text-center text-xs text-green-700 py-4 border-t border-green-500/40">
        © HU Inventory System
      </div>
    </aside>
  );
};

export default Sidebar;
