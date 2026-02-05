import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import useScrollAnimation from "../../hooks/useScrollAnimation";

export default function Navbar({ introDone = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isTop, setIsTop] = useState(true); // Track scroll at top
  const [overlayActive, setOverlayActive] = useState(false); // Page overlay on link hover
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll animation hooks
  const [homeRef] = useScrollAnimation(0.1, introDone);
  const [aboutRef] = useScrollAnimation(0.1, introDone);
  const [servicesRef] = useScrollAnimation(0.1, introDone);
  const [projectsRef] = useScrollAnimation(0.1, introDone);
  const [contactRef] = useScrollAnimation(0.1, introDone);
  const [loginRef] = useScrollAnimation(0.1, introDone);

  // Set active section based on pathname
  useEffect(() => {
    const path = location.pathname;
    if (path === "/" || path === "") setActiveSection("home");
    else if (path.startsWith("/about")) setActiveSection("about");
    else if (path.startsWith("/services")) setActiveSection("services");
    else if (path.startsWith("/projects")) setActiveSection("projects");
    else if (path.startsWith("/contact")) setActiveSection("contact");
    else setActiveSection("");
  }, [location.pathname]);

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

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="flex items-center justify-between px-6 md:px-12 h-20 md:h-20 bg-transparent">
        {/* Logo */}
        <button
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
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-200 bg-slate-900/70 backdrop-blur-md backdrop-saturate-150 px-6 py-3 rounded-2xl shadow-md relative z-20">
          {navItems.map((item) => (
            <Link
              key={item.path}
              ref={item.ref}
              to={item.path}
              className={`relative group transition-colors ${activeSection === item.label.toLowerCase() ? "text-green-300" : ""
                }`}
              onMouseEnter={() => setOverlayActive(true)}
              onMouseLeave={() => setOverlayActive(false)}
            >
              {/* Spotlight effect */}
              <span className="relative z-10 px-2 py-1">
                {item.label}
                <span className="absolute inset-0 bg-white/20 rounded-md opacity-0 group-hover:opacity-40 transition-opacity duration-300"></span>
              </span>

              {/* Underline animation */}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-green-300 transition-all duration-300 ${activeSection === item.label.toLowerCase() ? "w-full" : "w-0"
                  }`}
              />
            </Link>
          ))}

          {/* Login button */}
          <Link
            ref={loginRef}
            to="/login"
            className="relative group bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
            onMouseEnter={() => setOverlayActive(true)}
            onMouseLeave={() => setOverlayActive(false)}
          >
            <span className="relative z-10 px-1 py-0.5">
              Login
              <span className="absolute inset-0 bg-white/20 rounded-md opacity-0 group-hover:opacity-40 transition-opacity duration-300"></span>
            </span>
            <span className="absolute -bottom-1 left-0 h-0.5 bg-green-300 w-0 hover:w-full transition-all duration-300" />
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
              className={`text-left text-lg font-medium py-2 hover:text-green-300 transition-colors ${activeSection === item.label.toLowerCase() ? "text-green-300" : ""
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
