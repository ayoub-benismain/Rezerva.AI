import React from "react";
import logo from "../assets/logo.png";
import registerImage from "../assets/loginImage.jpg";

export default function RegisterPage() {
  return (
    <div className="relative flex min-h-screen justify-center md:px-12 lg:px-0">
      {/* Left: Registration Form */}
      <div className="relative z-10 flex flex-1 flex-col bg-white px-4 py-10 shadow-2xl sm:justify-center md:flex-none md:px-28">
        <main className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
          {/* Logo */}
          <div className="flex">
            <a aria-label="Home" href="/">
              <img src={logo} alt="Reserva Logo" className="w-20 h-20" />
            </a>
          </div>

          {/* Heading */}
          <h2 className="text-lg font-semibold text-gray-900">Get started for free</h2>
          <p className="mt-2 text-sm text-gray-700">
            Already registered?{' '}
            <a href="/login" className="font-medium text-blue-600 hover:underline">
              Sign in
            </a>{' '}to your account.
          </p>

          {/* Form */}
          <form className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
            {/* First Name */}
            <div>
              <label htmlFor="first_name" className="mb-3 block text-sm font-medium text-gray-700">
                First name
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                autoComplete="given-name"
                required
                className="block w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="last_name" className="mb-3 block text-sm font-medium text-gray-700">
                Last name
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                autoComplete="family-name"
                required
                className="block w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>

            {/* Email */}
            <div className="col-span-full">
              <label htmlFor="email" className="mb-3 block text-sm font-medium text-gray-700">
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

            {/* Password */}
            <div className="col-span-full">
              <label htmlFor="password" className="mb-3 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="block w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>

            {/* Phone Number */}
            <div className="col-span-full">
              <label className="mb-3 block text-sm font-medium text-gray-700">Phone number</label>
              <div className="flex gap-2">
                <select
                  name="country_code"
                  className="w-28 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                >
                  <option value="+216">🇹🇳 +216</option>
                </select>
                <input
                  name="phone_number"
                  type="tel"
                  placeholder="12 345 678"
                  required
                  className="flex-1 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="col-span-full">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center rounded-full bg-blue-600 py-2 px-4 text-sm font-semibold text-white hover:bg-blue-500 active:bg-blue-800 focus-visible:outline focus-visible:outline-blue-600 focus-visible:outline-offset-2"
              >
                Sign up <span aria-hidden="true">→</span>
              </button>
            </div>
          </form>
        </main>
      </div>

      {/* Right: Background Image */}
      <div className="hidden sm:block lg:relative lg:flex-1">
        <img
          src={registerImage}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
