import React from "react";

export default function ButtonSlider({ text, isMonthly }) {
  return (
    <div
      className={`pb-0.5 px-3 rounded-4xl cursor-pointer mx-0.5
        transition duration-300 ease-in-out
        ${isMonthly ? "bg-blue-700 hover:bg-blue-800" : "bg-transparent hover:bg-gray-100"}`}
    >
      <span className={`text-xs ${isMonthly ? "text-white" : "text-gray-400"}`}>
        {text}
      </span>
    </div>
  );
}
