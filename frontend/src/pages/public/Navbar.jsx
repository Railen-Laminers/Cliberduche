import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaTimes, FaBars, FaArrowUp } from "react-icons/fa";
import logo from "/logo/cliberduche_logo.png";

export default function Navbar({ introDone = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsScrolled(currentScrollPos > 50);
      setIsTop(currentScrollPos < 10);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (introDone) setTimeout(() => setIsLoaded(true), 300);
  }, [introDone]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") setIsOpen(false); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1024) setIsOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path) => location.pathname === path;

  const desktopLinkClass = (path) => {
    return isActive(path)
      ? "text-green-400"
      : "text-white hover:text-green-400";
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"
          }`}
      >
        {/* Inner container: wider max-width and smaller padding */}
        <div
          className={`max-w-screen-2xl mx-auto flex items-center justify-between px-4 lg:px-8 h-20 transition-all duration-300 bg-transparent text-white mt-4`}
        >
          {/* Logo - fades in/out */}
          <button
            onClick={() => navigate("/")}
            className={`flex items-center gap-3 group transition-opacity duration-300 ${isTop ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            aria-label="Go to homepage"
            disabled={!isTop}
          >
            <img
              src={logo}
              alt="Cliberduche Logo"
              className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </button>

          {/* Desktop Navigation - Floating */}
          <nav className="hidden lg:flex items-center gap-2 bg-[#081c33]/80 backdrop-blur-sm border border-white/10 px-6 py-2 rounded-sm shadow-2xl">
            {navItems.map((item) => {
              const isContact = item.label === "Contact";

              return (
                <React.Fragment key={item.path}>
                  {isContact ? (
                    <Link
                      to={item.path}
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2 group ml-2"
                    >
                      <span>{item.label}</span>
                      <FaArrowUp className="w-3 h-3 rotate-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  ) : (
                    <Link
                      to={item.path}
                      className={`relative px-4 py-2 font-medium transition-all duration-300 group flex items-center gap-1 ${desktopLinkClass(
                        item.path
                      )}`}
                    >
                      <span className="relative z-10 text-sm tracking-[0.3em] uppercase">
                        {item.label}
                      </span>
                      <FaArrowUp
                        className={`w-3 h-3 rotate-45 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${isActive(item.path) ? "text-green-400" : "text-white group-hover:text-green-400"
                          }`}
                      />
                    </Link>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden relative z-50 w-12 h-12 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            aria-label="Open menu"
            aria-expanded={isOpen}
          >
            <FaBars className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay - now with floating glass effect */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-500 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsOpen(false)} // Close when clicking backdrop
      >
        {/* Invisible backdrop for click-outside */}
        <div className="absolute inset-0 bg-transparent" />

        {/* Sliding panel with glass effect */}
        <div
          className={`absolute right-0 top-0 h-full w-full sm:w-[400px] bg-[#081c33]/80 backdrop-blur-sm border-l border-white/10 shadow-2xl transition-transform duration-500 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside panel
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
            <button
              onClick={() => {
                navigate("/");
                setIsOpen(false);
              }}
              className="flex items-center gap-3"
            >
              <img src={logo} alt="Cliberduche Logo" className="h-10 w-auto" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-green-400 transition-colors duration-300"
              aria-label="Close menu"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 flex flex-col justify-center px-6 md:px-12">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`group py-6 md:py-8 border-b border-white/10 transition-all duration-500 ease-out ${isOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                  }`}
                style={{
                  transitionDelay: isOpen ? `${index * 100 + 200}ms` : "0ms",
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-4xl md:text-6xl font-bold tracking-tight transition-colors duration-300 ${isActive(item.path)
                        ? "text-green-400"
                        : "text-white group-hover:text-green-400"
                      }`}
                  >
                    {item.label.toUpperCase()}
                  </span>
                  <span
                    className={`transform transition-all duration-300 ${isOpen
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-4 opacity-0"
                      }`}
                    style={{
                      transitionDelay: isOpen
                        ? `${index * 100 + 400}ms`
                        : "0ms",
                    }}
                  >
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      className="text-slate-400 group-hover:text-green-400 transition-colors duration-300"
                    >
                      <path
                        d="M8 20H32M32 20L24 12M32 20L24 28"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div
            className={`px-6 py-6 border-t border-white/10 transition-all duration-500 delay-700 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            <p className="text-slate-400 text-sm">
              © 2026 Cliberduche. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}