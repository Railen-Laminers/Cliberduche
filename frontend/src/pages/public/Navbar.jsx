import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar({ introDone = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isTop, setIsTop] = useState(true); // Track scroll at top
  const [overlayActive, setOverlayActive] = useState(false); // Page overlay on link hover
  const [navAnimationDone, setNavAnimationDone] = useState(false); // Track if nav animation has played
  const navigate = useNavigate();
  const location = useLocation();

  // Use refs for nav items
  const navContainerRef = useRef(null);
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const loginRef = useRef(null);

  // Trigger nav animation once after intro
  useEffect(() => {
    if (introDone && !navAnimationDone) {
      setNavAnimationDone(true);
    }
  }, [introDone]);

  // Scroll listener to fade logo
  useEffect(() => {
    const handleScroll = () => setIsTop(window.scrollY < 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home", ref: homeRef },
    { path: "/about", label: "About", ref: aboutRef },
    { path: "/services", label: "Services", ref: servicesRef },
    { path: "/projects", label: "Projects", ref: projectsRef },
    { path: "/contact", label: "Contact", ref: contactRef },
  ];

  // Helper function to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="flex items-center justify-between px-6 md:px-12 h-20 md:h-20 bg-transparent">
        {/* Logo */}
        <button
          id="nav-logo"
          onClick={() => navigate("/")}
          className={`flex items-center gap-2 transition-opacity duration-500 ${introDone && isTop ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
          <img
            src="/logo/cliberduche_logo.png"
            alt="Cliberduche Logo"
            className="h-10 md:h-12 w-auto"
          />
        </button>

        {/* Desktop nav */}
        <nav
          ref={navContainerRef}
          className={`hidden md:flex items-center space-x-8 text-sm font-medium text-slate-200 bg-slate-900/70 backdrop-blur-md backdrop-saturate-150 px-6 py-3 rounded-2xl shadow-md relative z-20 transition-all duration-700 ease-out ${navAnimationDone ? "opacity-100 translate-y-0 scale-100 blur-0" : "opacity-0 translate-y-10 scale-95 blur-sm"
            }`}
        >
          {navItems.map((item, index) => {
            const delay = 0.1 * (index + 1);

            return (
              <Link
                key={item.path}
                ref={item.ref}
                to={item.path}
                className={`relative group transition-all duration-700 ease-out ${navAnimationDone ? "opacity-100 translate-y-0 scale-100 blur-0" : "opacity-0 translate-y-10 scale-95 blur-sm"
                  } ${isActive(item.path) ? "text-green-300" : ""}`}
                style={{ transitionDelay: navAnimationDone ? `${delay}s` : "0s" }}
                onMouseEnter={() => setOverlayActive(true)}
                onMouseLeave={() => setOverlayActive(false)}
              >
                <span className="relative z-10 px-2 py-1">
                  {item.label}
                  <span className="absolute inset-0 bg-white/20 rounded-md opacity-0 group-hover:opacity-40 transition-opacity duration-300"></span>
                </span>

                {/* Smooth underline */}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-green-300 w-full transform origin-left transition-transform duration-500 group-hover:scale-x-100 ${isActive(item.path) ? "scale-x-100" : "scale-x-0"
                    }`}
                />
              </Link>
            );
          })}

          {/* Login button */}
          <Link
            ref={loginRef}
            to="/login"
            className={`relative group bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-all duration-700 ease-out ${navAnimationDone ? "opacity-100 translate-y-0 scale-100 blur-0" : "opacity-0 translate-y-10 scale-95 blur-sm"
              }`}
            style={{ transitionDelay: navAnimationDone ? "0.6s" : "0s" }}
            onMouseEnter={() => setOverlayActive(true)}
            onMouseLeave={() => setOverlayActive(false)}
          >
            <span className="relative z-10 px-1 py-0.5">
              Login
              <span className="absolute inset-0 bg-white/20 rounded-md opacity-0 group-hover:opacity-40 transition-opacity duration-300"></span>
            </span>

          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-50 text-green-500 text-2xl p-2 rounded-full border-2 border-green-500 
                     bg-slate-900/70 backdrop-blur-md hover:bg-green-500/20 
                     transition-all duration-300 ease-in-out"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Overlay for hovering nav links */}
      <div
        className={`fixed inset-0 bg-black/20 pointer-events-none z-10 transition-opacity duration-500 ${overlayActive ? "opacity-100" : "opacity-0"
          }`}
      />

      {/* Mobile drawer (right side) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-slate-900/70 backdrop-blur-md rounded-2xl shadow-md z-40 transform transition-transform duration-300 flex flex-col justify-between ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <nav className="flex flex-col mt-6 space-y-4 text-white px-6">
          {navItems.map((item) => (
            <button
              key={item.path}
              className={`text-left text-lg font-medium py-2 transition-colors ${isActive(item.path) ? "text-green-300" : "hover:text-green-300"
                }`}
              onClick={() => {
                navigate(item.path);
                setIsOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="px-6 mb-6 text-white">
          <button
            className="w-full text-left text-lg font-medium py-2 hover:text-green-300 border-t border-green-300 transition-colors"
            onClick={() => {
              navigate("/login");
              setIsOpen(false);
            }}
          >
            Login
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-30"
        />
      )}
    </header>
  );
}
