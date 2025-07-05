import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";
import loginImage from "../assets/loginImage.jpg";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, pwd }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error, please try again "+err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen justify-center md:px-12 lg:px-0">
      <div className="relative z-10 flex flex-1 flex-col bg-white px-4 py-10 shadow-2xl sm:justify-center md:flex-none md:px-28">
        <main className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
          <div className="flex justify-start">
            <a aria-label="Home" href="/">
              <img src={logo} alt="Logo" className="w-20 h-20" />
            </a>
          </div>

          <h2 className="text-lg font-semibold text-gray-900 mt-4">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            Don’t have an account?{" "}
            <a href="/register" className="font-medium text-blue-600 hover:underline">
              Sign up
            </a>{" "}
            for a free trial.
          </p>

          {error && (
            <div className="mt-4 rounded bg-red-100 p-3 text-red-700">{error}</div>
          )}
          {success && (
            <div className="mt-4 rounded bg-green-100 p-3 text-green-700">{success}</div>
          )}

          <form className="mt-10 grid grid-cols-1 gap-y-8" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="mb-3 block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-3 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                className="block w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full inline-flex items-center justify-center rounded-full bg-blue-600 py-2 px-4 text-sm font-semibold text-white hover:bg-blue-500 active:bg-blue-800 focus-visible:outline focus-visible:outline-blue-600 focus-visible:outline-offset-2 ${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Signing in..." : "Sign in"}{" "}
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </form>
        </main>
      </div>

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
