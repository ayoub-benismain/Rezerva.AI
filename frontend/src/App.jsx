import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Services from "./sections/Services";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/ContactUs";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";

// ProtectedRoute component inside the same file for convenience
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AppContent() {
  const location = useLocation();

  // Paths where Header should NOT show
  const noHeaderPaths = ["/login", "/register", "/dashboard", "/admin"];

  // Show header on all pages except listed paths
  const showHeader = !noHeaderPaths.includes(location.pathname);

  // Show landing sections/footer ONLY on home page
  const showLandingSections = location.pathname === "/";

  return (
    <>
      {showHeader && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

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
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
