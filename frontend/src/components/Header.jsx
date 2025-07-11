import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/lg.png";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const mainPages = [{ label: "Home", to: "/" }];

  const sections = [
    { label: "Services", href: "services" },
    { label: "Testimonials", href: "testimonials" },
    { label: "Contact Us", href: "contact" },
  ];

  const navLinkClasses =
    "text-gray-600 hover:text-gray-900 hover:bg-gray-100 text-sm font-medium transition-colors px-3 py-2 rounded-lg";

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const isHomePage = location.pathname === "/";

  // Smooth scroll handler for anchors
  const handleSmoothScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false); // close mobile menu after click
    }
  };

  // Scroll to top for Home link when already on home page
  const handleHomeClick = (e, to) => {
    if (location.pathname === to) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="w-26 h-22 sm:w-26 sm:h-22 overflow-hidden">
              <img src={Logo} alt="Reserva.ai Logo" className="p-2 lg:p-0" />
            </div>
            <span className="text-base sm:text-xl font-medium text-gray-900 hidden lg:visible">
              <span className="text-blue-700 ">Reserva</span>.ai
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center space-x-2"
            aria-label="Primary Navigation"
          >
            {/* Home link with scroll to top */}
            {mainPages.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className={navLinkClasses}
                onClick={(e) => handleHomeClick(e, to)}
              >
                {label}
              </Link>
            ))}

            {/* Section anchors only on home page */}
            {isHomePage &&
              sections.map(({ label, href }) => (
                <a
                  key={label}
                  href={`#${href}`}
                  onClick={(e) => handleSmoothScroll(e, href)}
                  className={navLinkClasses}
                >
                  {label}
                </a>
              ))}
          </nav>

          {/* Desktop Right Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/login" className={navLinkClasses}>
              Sign in
            </Link>
            <Link to="/register">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-full font-medium transition-colors cursor-pointer">
                Get started today
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center space-x-2">
            <Link to="/register">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-xs rounded-full font-medium transition-colors">
                Get started today
              </button>
            </Link>
            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav
            className="lg:hidden border-t border-gray-200 py-4 flex flex-col items-center space-y-4"
            aria-label="Mobile Navigation"
          >
            {mainPages.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className={navLinkClasses}
                onClick={(e) => handleHomeClick(e, to)}
              >
                {label}
              </Link>
            ))}

            {isHomePage &&
              sections.map(({ label, href }) => (
                <a
                  key={label}
                  href={`#${href}`}
                  onClick={(e) => handleSmoothScroll(e, href)}
                  className={navLinkClasses}
                >
                  {label}
                </a>
              ))}

            <Link to="/login" className={`${navLinkClasses} block`}>
              Sign in
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
