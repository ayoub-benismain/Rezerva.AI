import React from "react";

// Local reusable UI components
const Card = ({ children }) => (
  <div className="rounded-2xl shadow-md bg-white p-6 w-full max-w-sm">
    {children}
  </div>
);

const CardContent = ({ title, value }) => (
  <div className="text-center">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
  </div>
);

const Button = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="mt-4 inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 active:bg-blue-800 focus:outline-none"
  >
    {children}
  </button>
);

export default function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Welcome to Your Dashboard</h1>

      <div className="flex flex-wrap gap-6 justify-center">
        <Card>
          <CardContent title="Upcoming Reservations" value="5" />
        </Card>

        <Card>
          <CardContent title="Clients Booked" value="27" />
        </Card>

        <Card>
          <CardContent title="Your Rating" value="4.9 ★" />
        </Card>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Profile Settings</h2>
        <p className="text-gray-600 mb-4">Name: John Doe</p>
        <p className="text-gray-600 mb-4">Email: john@example.com</p>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
}
