import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";

const strengthColors = {
  0: "bg-red-500",
  1: "bg-yellow-400",
  2: "bg-green-500",
};

function passwordStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[\W_]/.test(password)) strength++;
  if (strength >= 4) return 2;
  if (strength >= 2) return 1;
  return 0;
}

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "Ayoub Smaeen",
    email: "ayoub@reserva.ai",
    phone: "+216 12 345 678",
    location: "Tunis, Tunisia",
  });

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordStrengthLevel, setPasswordStrengthLevel] = useState(0);
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const strength = passwordStrength(newPassword);
    setPasswordStrengthLevel(strength);

    const validLength = newPassword.length >= 8;
    const hasUpper = /[A-Z]/.test(newPassword);
    const hasLower = /[a-z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    const hasSymbol = /[\W_]/.test(newPassword);
    const passwordsMatch = newPassword === confirmPassword;

    if (
      validLength &&
      hasUpper &&
      hasLower &&
      hasNumber &&
      hasSymbol &&
      passwordsMatch &&
      oldPassword.length > 0
    ) {
      setPasswordValid(true);
      setPasswordError("");
    } else {
      setPasswordValid(false);
      if (!passwordsMatch) {
        setPasswordError("New password and confirm password do not match.");
      } else if (newPassword.length > 0) {
        setPasswordError(
          "Password must be at least 8 chars, include uppercase, lowercase, number & symbol."
        );
      } else {
        setPasswordError("");
      }
    }
  }, [oldPassword, newPassword, confirmPassword]);

  const handleSave = () => {
    console.log("Saving profile:", formData);
    setEditMode(false);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!passwordValid) return;
    alert("Password changed successfully!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-inter text-sm">
      {/* Breadcrumb */}
      <nav className="text-gray-500">
        <a href="/dashboard" className="hover:underline text-blue-600">
          Home
        </a>{" "}
        &gt; <span className="text-gray-700 font-semibold">Profile</span>
      </nav>

      {/* Banner */}
      <div className="relative bg-blue-600 rounded-xl h-28">
        <div className="absolute -bottom-10 left-8 flex items-center gap-5">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden transition-transform duration-500">
            <img
              src="https://i.pravatar.cc/100"
              alt="User"
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
          <div className="text-white select-none">
            <h2 className="text-2xl font-extrabold">{formData.name}</h2>
            <p className="text-sm font-semibold">Business Owner - Reserva.AI</p>
          </div>
        </div>
      </div>

      {/* Main content: Account info + Subscription */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Info */}
        <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-500">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-700">
              Account Information
            </h3>
            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="text-blue-600 font-semibold hover:underline text-sm"
              >
                Edit
              </button>
            )}
          </div>

          {editMode ? (
            <form
              className="space-y-4 text-gray-700"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label className="block font-semibold mb-1 text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  autoFocus
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-gray-600">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-gray-600">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div className="flex space-x-4 mt-4">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <ul className="text-gray-600 space-y-1 text-base">
              <li>
                <strong>Email:</strong> {formData.email}
              </li>
              <li>
                <strong>Phone:</strong> {formData.phone}
              </li>
              <li>
                <strong>Join Date:</strong> July 1, 2024
              </li>
              <li>
                <strong>Location:</strong> {formData.location}
              </li>
            </ul>
          )}
        </div>

        {/* Subscription */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Star size={18} className="text-yellow-400" />
              Subscription
            </h3>
            <ul className="text-gray-600 space-y-1 text-base">
              <li>
                <strong>Plan:</strong> Premium Plan
              </li>
              <li>
                <strong>Renewal:</strong> Aug 1, 2025
              </li>
              <li>
                <strong>Status:</strong>{" "}
                <span className="text-green-600 font-semibold">Active</span>
              </li>
            </ul>

            <div className="mt-4">
              <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: "70%" }}
                ></div>
              </div>
              <p className="mt-1 text-xs text-gray-600">
                70% of your subscription period used
              </p>
            </div>
          </div>

          <button
            className="mt-6 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={() => alert("Upgrade Plan clicked")}
          >
            Upgrade Plan
          </button>
        </div>
      </div>

      {/* Change Password centered & smaller */}
      <div className="mt-10 max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-5 text-center">
          Change Password
        </h3>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4 text-gray-700">
          <div>
            <label className="block font-semibold mb-1 text-gray-600 text-sm">
              Old Password
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter old password"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-gray-600 text-sm">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
              required
            />
            <div className="w-full h-2 bg-gray-300 rounded-full mt-1 overflow-hidden">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  strengthColors[passwordStrengthLevel]
                }`}
                style={{
                  width:
                    passwordStrengthLevel === 2
                      ? "100%"
                      : passwordStrengthLevel === 1
                      ? "60%"
                      : "20%",
                }}
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-gray-600 text-sm">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
              required
            />
          </div>

          {passwordError && (
            <p className="text-red-600 text-xs mt-1 font-semibold">{passwordError}</p>
          )}

          <button
            type="submit"
            disabled={!passwordValid}
            className={`w-full py-2 rounded-lg font-semibold text-white transition text-sm ${
              passwordValid
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}
