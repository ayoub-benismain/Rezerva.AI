import React, { useState } from "react";
import {
  Home,
  User,
  Calendar,
  MessageCircle,
  BarChart2,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/lg.png";

export default function SideMenu() {
  const [sideMenuItem] = useState([
    { name: "Dashboard", icon: <Home size={20} />, path: "/dashboard", badge: 9 },
    { name: "Patient / Clients", icon: <User size={20} />, path: "/dashboard/patients" },
    { name: "Appointments", icon: <Calendar size={20} />, path: "/dashboard/appointments" },
    { name: "Conversations", icon: <MessageCircle size={20} />, path: "/dashboard/conversations" },
    { name: "Statistics", icon: <BarChart2 size={20} />, path: "/dashboard/statistics" },
    { name: "Settings", icon: <Settings size={20} />, path: "/dashboard/settings" },
  ]);

  return (
    <div className="flex flex-col w-64 bg-white h-screen shadow-md sticky top-0">
      {/* Logo */}
      <div className="flex items-center justify-center py-6 border-b border-gray-200">
        <img src={logo} alt="Reserva.AI" className="w-24 h-auto" />
      </div>

      {/* Menu */}
      <nav className="flex flex-col px-4 py-6 gap-1">
        {sideMenuItem.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center justify-between px-4 py-3 rounded-md transition-all duration-200 ${
                isActive
                  ? "bg-blue-700 text-white font-normal tracking-wide "
                  : "text-gray-700 hover:bg-gray-100 font-medium"
              }`
            }
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span>{item.name}</span>
            </div>
            {item.badge && (
              <span className="text-xs font-bold bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
