import React from "react";
import { Search } from "lucide-react";

export default function DashboardSearch() {
  return (
    <div className="relative w-full max-w-sm">
      <input
        id="search-input"
        type="text"
        placeholder="Search Dashboard"
        className="w-full pl-5 bg-white border-none pr-4 p-3 rounded-md border border-gray-300 focus:outline-none text-sm"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
        <Search size={16} />
      </div>
    </div>
  );
}
