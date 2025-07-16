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

// Notification component
function Notification({ message, type }) {
  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow text-white font-semibold z-50
        ${
          type === "success"
            ? "bg-green-600"
            : type === "error"
            ? "bg-red-600"
            : "bg-gray-600"
        } 
        transition-transform duration-300 ease-in-out
      `}
      style={{ animation: "slideDown 0.5s forwards" }}
    >
      {message}
    </div>
  );
}

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordStrengthLevel, setPasswordStrengthLevel] = useState(0);
  const [passwordError, setPasswordError] = useState("");

  // Notification states
  const [notification, setNotification] = useState({ message: "", type: "" }); // type: 'success' or 'error'
  const [showNotification, setShowNotification] = useState(false);

  // Fetch real user data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/user/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) throw new Error("Unauthorized");

        const data = await response.json();
        setFormData({
          name: data.name,
          email: data.email,
          phone: data.phone,
          location: data.location,
        });
      } catch (error) {
        showNotificationMessage("Failed to fetch profile data", "error");
        console.error("Fetch error:", error);
      }
    };

    fetchProfile();
  }, []);

  // Show notification helper
  const showNotificationMessage = (message, type) => {
    setNotification({ message, type });
    setShowNotification(true);
  };

  // Auto-hide notification after 4 seconds
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

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

  const handleSave = async () => {
    try {
      const [first_name, ...rest] = formData.name.split(" ");
      const last_name = rest.join(" ");

      const response = await fetch("http://localhost:5001/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          first_name,
          last_name,
          email: formData.email,
          phone: formData.phone,
        }),
      });

      if (response.ok) {
        // Show success notification after 1 second delay
        setTimeout(() => {
          showNotificationMessage("Profile updated successfully!", "success");
        }, 1000);
        setEditMode(false);
      } else {
        const data = await response.json();
        setTimeout(() => {
          showNotificationMessage("Error: " + data.message, "error");
        }, 1000);
      }
    } catch (err) {
      setTimeout(() => {
        showNotificationMessage("Failed to update profile. Server error.", "error");
      }, 1000);
    }
  };

  const handleChangePassword = async (e) => {
  e.preventDefault();

  if (!passwordValid) {
    showNotificationMessage("Password does not meet strength requirements.", "error");
    return;
  }

  try {
    const response = await fetch("http://localhost:5001/api/user/change-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      showNotificationMessage(data.message || "Password changed successfully!", "success");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      showNotificationMessage(data.message || "Failed to change password", "error");
    }
  } catch (error) {
    console.error("Error:", error);
    showNotificationMessage("Server error. Try again later.", "error");
  }
};


  const handleCancel = () => {
    setEditMode(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-inter text-sm">
      {/* Notification popup */}
      {showNotification && (
        <Notification message={notification.message} type={notification.type} />
      )}

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
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden">
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

      {/* Main content */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Info */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-700">Account Information</h3>
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
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4 text-gray-700">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300"
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
                <div className="h-2 bg-blue-600 rounded-full" style={{ width: "70%" }}></div>
              </div>
              <p className="mt-1 text-xs text-gray-600">70% of your subscription period used</p>
            </div>
          </div>

          <button
            className="mt-6 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700"
            onClick={() => alert("Upgrade Plan clicked")}
          >
            Upgrade Plan
          </button>
        </div>
      </div>

      {/* Change Password */}
      <div className="mt-10 max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-5 text-center">Change Password</h3>
        <form onSubmit={handleChangePassword} className="space-y-4 text-gray-700">
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
          <div className="w-full h-2 bg-gray-300 rounded-full mt-1 overflow-hidden">
            <div
              className={`h-2 rounded-full ${strengthColors[passwordStrengthLevel]}`}
              style={{
                width:
                  passwordStrengthLevel === 2
                    ? "100%"
                    : passwordStrengthLevel === 1
                    ? "60%"
                    : "20%",
              }}
            ></div>
          </div>
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
          {passwordError && (
            <p className="text-red-600 text-xs font-semibold">{passwordError}</p>
          )}
          <button
            type="submit"
            disabled={!passwordValid}
            className={`w-full py-2 rounded-lg font-semibold text-white ${
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
