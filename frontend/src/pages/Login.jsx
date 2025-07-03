import React from "react";

import logo from "../assets/logo.png"
import loginImage from "../assets/loginImage.jpg"


export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen justify-center md:px-12 lg:px-0">
      {/* Left Section: Login Form */}
      <div className="relative z-10 flex flex-1 flex-col bg-white px-4 py-10 shadow-2xl sm:justify-center md:flex-none md:px-28">
        <main className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
          {/* Logo */}
          <div className="flex justify-start">
            <a aria-label="Home" href="/">
              <img src={logo} alt="" className="w-20 h-20" />
              <svg aria-hidden="true" viewBox="0 0 109 40" className="h-10 w-auto">
                {/* SVG paths trimmed for clarity */}
              </svg>
            </a>
          </div>

          {/* Heading */}
          <h2 className="text-lg font-semibold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign up
            </a>{" "}
            for a free trial.
          </p>

          {/* Form */}
          <form className="mt-10 grid grid-cols-1 gap-y-8">
            <div>
              <label
                htmlFor="email"
                className="mb-3 block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-3 block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center rounded-full bg-blue-600 py-2 px-4 text-sm font-semibold text-white hover:bg-blue-500 active:bg-blue-800 focus-visible:outline focus-visible:outline-blue-600 focus-visible:outline-offset-2"
              >
                Sign in <span aria-hidden="true">→</span>
              </button>
            </div>
          </form>
        </main>
      </div>

      {/* Right Section: Background Image */}
      <div className="hidden sm:block lg:relative lg:flex-1">
        <img
          src={loginImage}
          alt="Auth background"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
