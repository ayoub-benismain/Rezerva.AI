import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Services from "./sections/Services";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/ContactUs";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function AppContent() {
  const location = useLocation();

  // Paths where Header should NOT show
  const noHeaderPaths = ["/login", "/register"];

  const showHeader = !noHeaderPaths.includes(location.pathname);

  return (
    <>
      {showHeader && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {showHeader && (
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
