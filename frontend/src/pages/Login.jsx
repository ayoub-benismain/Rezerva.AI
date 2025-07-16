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

  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMsg, setResetMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5001/api/user/login", {
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
      setError("Network error, please try again " + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen justify-center md:px-12 lg:px-0">
      {/* Left (Form) Side */}
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

          <form className="mt-10 grid grid-cols-1 gap-y-6" onSubmit={handleSubmit}>
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

            <div className="text-right text-sm text-blue-600 hover:underline cursor-pointer" onClick={() => setShowResetModal(true)}>
              Forgot password?
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

      {/* Right (Image) Side */}
      <div className="hidden sm:block lg:relative lg:flex-1">
        <img
          src={loginImage}
          alt="Auth background"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* Reset Password Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md transition-opacity duration-300">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm mx-4 scale-95 animate-fadeIn">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Reset Password</h2>
            {resetMsg && (
              <div className="mb-4 text-sm text-green-600 bg-green-100 p-2 rounded">
                {resetMsg}
              </div>
            )}
            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full mb-4 rounded-md border border-gray-300 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowResetModal(false);
                  setResetEmail("");
                  setResetMsg("");
                }}
                className="text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  setResetMsg("");
                  try {
                    const res = await fetch("http://localhost:5001/reset-password", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email: resetEmail }),
                    });
                    const data = await res.json();
                    if (res.ok) {
                      setResetMsg("Password reset link sent to your email.");
                    } else {
                      setResetMsg(data.message || "Failed to send reset link.");
                    }
                  } catch (err) {
                    setResetMsg("Network error, try again.");
                  }
                }}
                className="rounded-full bg-blue-600 px-4 py-2 text-white text-sm hover:bg-blue-500"
              >
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
