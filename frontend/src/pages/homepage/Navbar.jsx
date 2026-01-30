// Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import useScrollAnimation from "./useScrollAnimation";

export default function Navbar({ introDone = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Scroll animation hooks
  const [homeRef, homeClass] = useScrollAnimation(0.1, introDone);
  const [aboutRef, aboutClass] = useScrollAnimation(0.1, introDone);
  const [servicesRef, servicesClass] = useScrollAnimation(0.1, introDone);
  const [contactRef, contactClass] = useScrollAnimation(0.1, introDone);
  const [loginRef, loginClass] = useScrollAnimation(0.1, introDone);

  // Scroll listener for active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ["home", "about", "services", "contact"];
      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(id);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section
  const smoothScrollTo = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    const headerOffset = 80;
    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY - headerOffset;
    const start = window.scrollY;
    const distance = targetPosition - start;
    const duration = 600;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start + distance * progress);
      if (progress < 1) requestAnimationFrame(animateScroll);
    };
    requestAnimationFrame(animateScroll);
  };

  // Smooth scroll to top
  const scrollToTop = () => {
    const start = window.scrollY;
    const duration = 500;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start * (1 - progress));
      if (progress < 1) requestAnimationFrame(animateScroll);
    };

    requestAnimationFrame(animateScroll);
  };

  const textColor = isScrolled ? "text-white" : "text-slate-300";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? "bg-[#0b2545] shadow-lg border-b border-white/10"
          : "bg-[#0b2545]"
        }`}
    >
      <div className="h-16 md:h-20 flex items-center justify-between px-6 md:px-10">
        {/* Logo */}
        <button
          onClick={() => {
            scrollToTop();
            setIsOpen(false);
          }}
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <img
            id="nav-logo"
            src="/logo/cliberduche_logo.png"
            alt="Cliberduche Logo"
            className={`h-10 md:h-12 w-auto transition-opacity duration-400 ${introDone ? "opacity-100" : "opacity-0"
              }`}
          />
        </button>

        {/* Desktop Nav */}
        <nav
          className={`hidden md:flex items-center space-x-8 text-sm font-medium ${textColor}`}
        >
          <button
            ref={homeRef}
            onClick={() => smoothScrollTo("home")}
            className={`${homeClass} relative transition-colors hover:text-green-300 ${activeSection === "home" ? "text-green-300" : ""
              }`}
          >
            Home
            <span
              className={`absolute -bottom-1 left-0 h-0.5 bg-green-300 transition-all duration-300 ${activeSection === "home" ? "w-full" : "w-0"
                }`}
            />
          </button>

          <button
            ref={aboutRef}
            onClick={() => smoothScrollTo("about")}
            className={`${aboutClass} relative transition-colors hover:text-green-300 ${activeSection === "about" ? "text-green-300" : ""
              }`}
          >
            About
            <span
              className={`absolute -bottom-1 left-0 h-0.5 bg-green-300 transition-all duration-300 ${activeSection === "about" ? "w-full" : "w-0"
                }`}
            />
          </button>

          <button
            ref={servicesRef}
            onClick={() => smoothScrollTo("services")}
            className={`${servicesClass} relative transition-colors hover:text-green-300 ${activeSection === "services" ? "text-green-300" : ""
              }`}
          >
            Services
            <span
              className={`absolute -bottom-1 left-0 h-0.5 bg-green-300 transition-all duration-300 ${activeSection === "services" ? "w-full" : "w-0"
                }`}
            />
          </button>

          <button
            ref={contactRef}
            onClick={() => smoothScrollTo("contact")}
            className={`${contactClass} relative transition-colors hover:text-green-300 ${activeSection === "contact" ? "text-green-300" : ""
              }`}
          >
            Contact
            <span
              className={`absolute -bottom-1 left-0 h-0.5 bg-green-300 transition-all duration-300 ${activeSection === "contact" ? "w-full" : "w-0"
                }`}
            />
          </button>

          <Link
            ref={loginRef}
            to="/login"
            className={`${loginClass} bg-green-500 px-4 py-2 rounded-full text-white hover:bg-green-600`}
          >
            Login
          </Link>
        </nav>

        {/* Mobile toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-2xl z-50"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Side Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#0b2545] z-40 transform transition-transform duration-300 shadow-lg flex flex-col justify-between ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Top Group: Nav Links */}
        <nav className="flex flex-col mt-6 space-y-4 text-white px-4">
          <button
            className="text-left text-lg font-medium py-2 hover:text-green-300"
            onClick={() => {
              smoothScrollTo("home");
              setIsOpen(false);
            }}
          >
            Home
          </button>
          <button
            className="text-left text-lg font-medium py-2 hover:text-green-300"
            onClick={() => {
              smoothScrollTo("about");
              setIsOpen(false);
            }}
          >
            About
          </button>
          <button
            className="text-left text-lg font-medium py-2 hover:text-green-300"
            onClick={() => {
              smoothScrollTo("services");
              setIsOpen(false);
            }}
          >
            Services
          </button>
          <button
            className="text-left text-lg font-medium py-2 hover:text-green-300"
            onClick={() => {
              smoothScrollTo("contact");
              setIsOpen(false);
            }}
          >
            Contact
          </button>
        </nav>

        {/* Bottom: Login Button */}
        <div className="px-4 mb-6 text-white">
          <button
            className="w-full text-left text-lg font-medium py-2 hover:text-green-300 border-t border-green-300"
            onClick={() => {
              setIsOpen(false);
              window.location.href = "/login";
            }}
          >
            Login
          </button>
        </div>
      </div>

      {/* Overlay behind drawer */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-30"
        ></div>
      )}
    </header>
  );
}
