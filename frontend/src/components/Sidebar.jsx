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

 

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <FaHome />,
      roles: ["admin", "storeManager"],
      isParent: true,
    },
    {
      name: "Users",
      path: "/admin/dashboard/users",
      icon: <FaUser />,
      roles: ["admin", "storeManager", "departmentHead", "universityAuth", "staffMember"],
      isParent: false,
    },
    {
      name: "Categories",
      path: "/admin/dashboard/categories",
      icon: <FaTable />,
      roles: ["admin", "storeManager"],
      isParent: false,
    },
    {
      name: "Products",
      path: "/admin/dashboard/products",
      icon: <FaBox />,
      roles: ["admin", "storeManager", "departmentHead", "universityAuth"],
      isParent: false,
    },
    {
      name: "Orders",
      path: "/admin/dashboard/orders",
      icon: <FaShoppingCart />,
      roles: ["admin", "storeManager"],
      isParent: false,
    },
    {
      name: "Profile",
      path: "/admin/dashboard/profile",
      icon: <FaCog />,
      roles: ["admin", "storeManager", "departmentHead", "universityAuth", "staffMember"],
      isParent: false,
    },
    {
      name: "Logout",
      path: "/admin/dashboard/logout",
      icon: <FaSignOutAlt />,
      roles: ["admin", "storeManager", "departmentHead", "universityAuth", "staffMember"],
      isParent: false,
    },
  ];

  const filteredMenu = menuItems.filter(item =>
    item.roles.includes(user.role)
  );

 

  return (
    <aside className="fixed h-screen w-16 md:w-64 bg-gradient-to-b from-green-600 via-green-500 to-green-600/90 text-white shadow-xl flex flex-col">

      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-green-500/40">
        <span className="md:hidden font-bold text-lg">HU</span>
        <span className="hidden md:block font-bold text-lg tracking-wide text-gray-100">
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
                to={item.path}
                className={({ isActive }) =>
                  `
                  flex items-center gap-4 px-4 py-2.5 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? "bg-green-700 shadow-inner font-semibold"
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
        </ul>
      </nav>

      {/* Footer */}
      <div className="hidden md:block text-center text-xs text-green-200 py-4 border-t border-green-500/40">
        © HU Inventory System
      </div>
    </aside>
  );
};

export default Sidebar;
