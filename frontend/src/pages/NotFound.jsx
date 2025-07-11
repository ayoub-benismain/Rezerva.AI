// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // Optional
import loginImage from "../assets/loginImage.jpg";

export default function NotFound() {
  return (
    <div className="relative flex min-h-full shrink-0 justify-center md:px-12 lg:px-0 h-screen">
      <div className="relative z-10 flex flex-1 flex-col bg-white px-4 py-10 shadow-2xl sm:justify-center md:flex-none md:px-28">
        <main className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
          <div className="flex">
            <Link aria-label="Home" to="/">
              <img src={logo} alt="Logo" className="w-30" />
            </Link>
          </div>

          <p className="mt-20 text-sm font-medium text-gray-700">404</p>
          <h1 className="mt-3 text-lg font-semibold text-gray-900">Page not found</h1>
          <p className="mt-3 text-sm text-gray-700">
            Sorry, we couldn’t find the page you’re looking for.
          </p>

          <Link
            to="/"
            className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900 mt-10"
          >
            Go back home
          </Link>
        </main>
      </div>

      <div className="hidden sm:contents lg:relative lg:block lg:flex-1">
        <img
          alt=""
          loading="lazy"
          width="1664"
          height="1866"
          decoding="async"
          data-nimg="1"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ color: "transparent" }}
          src={loginImage} // Update path to match your file
        />
      </div>
    </div>
  );
}
