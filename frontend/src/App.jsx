import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useMatch,
  Navigate,
  Outlet,
} from "react-router-dom";

import DashboardLayout from "./components/dashboard/DashboardLayout";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Services from "./sections/Services";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/ContactUs";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/dashboard/Profile";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

// ProtectedRoute component
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AppContent() {
  const location = useLocation();

  // Show header ONLY on home page
  const showHeader = location.pathname === "/";

  // Show landing sections/footer ONLY on home page
  const showLandingSections = location.pathname === "/";

  return (
    <div className="font-[Inter]">
      {showHeader && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />

        {/* Nested dashboard routes sharing DashboardLayout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          {/* Add other dashboard subroutes here */}
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>

      {showLandingSections && (
        <>
          <Services />
          <Testimonials />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
