import { useNavigate } from "react-router-dom";
import React from "react";
const Sidebar = ({ setActiveSection, activeSection }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <div className="w-64 min-w-40 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold">Admin Panel</div>
      <nav className="flex-1">
        <ul>
          <li
            className={` p-4  hover:bg-gray-700 cursor-pointer flex justify-between gap-2 items-center ${
              activeSection === "dashboard" ? "bg-gray-600" : ""
            } `}
            onClick={() => setActiveSection("dashboard")}
          >
            <span>Dashboard</span>
            {activeSection === "dashboard" && (
              <span className="w-4 h-4 rounded-full bg-yellow-500" />
            )}
          </li>
          <li
            className={` p-4  hover:bg-gray-700 cursor-pointer flex justify-between gap-2 items-center ${
              activeSection === "Admin" ? "bg-gray-600" : ""
            } `}
            onClick={() => setActiveSection("Admin")}
          >
            <span>Admin</span>
            {activeSection === "Admin" && (
              <span className="w-4 h-4 rounded-full bg-yellow-500" />
            )}
          </li>
          <li
            className={` p-4  hover:bg-gray-700 cursor-pointer flex justify-between gap-2 items-center ${
              activeSection === "addAdmin" ? "bg-gray-600" : ""
            } `}
            onClick={() => setActiveSection("addAdmin")}
          >
            <span>Add Admin</span>
            {activeSection === "addAdmin" && (
              <span className="w-4 h-4 rounded-full bg-yellow-500" />
            )}
          </li>
        </ul>
      </nav>
      <button
        onClick={handleLogout}
        className="p-4 bg-red-500 hover:bg-red-600 text-white"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
