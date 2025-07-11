import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideMenu from "./SideMenu";
import Search from "./Search";
import { Bell, ChevronDown, Globe, UserCircle } from "lucide-react";
import { Outlet } from "react-router-dom";

export default function DashboardLayout({ children }) {
  const [langOpen, setLangOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate(); // ✅ Add navigate hook

  const languages = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "fr", label: "French", flag: "🇫🇷" },
    { code: "ar", label: "Arabic", flag: "🇹🇳" },
  ];

  return (
    <div className="bg-[#f7f8fb] flex min-h-screen">
      <SideMenu />

      {/* Right Side */}
      <div className="flex-1 p-5">
        {/* Header */}
        <div className="p-4 flex justify-between items-center">
          <Search />

          {/* Right Actions */}
          <div className="flex items-center gap-6 relative">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-blue-600"
              >
                <Globe size={20} />
                <ChevronDown size={16} />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-50">
                  <ul className="text-sm text-gray-700 py-1">
                    {languages.map(({ code, label, flag }) => (
                      <li
                        key={code}
                        className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                        onClick={() => setLangOpen(false)}
                      >
                        <span>{flag}</span> {label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 rounded cursor-pointer hover:bg-gray-100"
              >
                <Bell size={22} className="text-gray-700" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md z-50">
                  <div className="p-4 text-gray-600 text-sm">No new notifications</div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
              >
                <UserCircle size={28} className="text-gray-600" />
                <ChevronDown size={16} className="text-gray-600" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
                  <ul className="text-sm text-gray-700 py-1">
                    <li
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        navigate("/dashboard/profile"); // ✅ Navigate to profile page
                        setProfileOpen(false);
                      }}
                    >
                      Profile
                    </li>
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                      Settings
                    </li>
                    <li
                      className="px-4 cursor-pointer py-2 hover:bg-gray-100"
                      onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                      }}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="mt-6">
          {children || <Outlet />}
        </div>
      </div>
    </div>
  );
}
