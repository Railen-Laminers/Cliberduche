// Navbar.jsx (modified)
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar({ introDone = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ["about", "services", "contact"];
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

  const textColor = isScrolled ? "text-white" : "text-slate-300";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${isScrolled
        ? "bg-[#0b2545] shadow-lg border-b border-white/10"
        : "bg-[#0b2545]"
        }`}
    >
      <div className="h-16 md:h-20 flex items-center justify-between px-6 md:px-10">

        {/* Logo - give it an id so Intro can find it */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <img
            id="nav-logo"
            src="/logo/cliberduche_logo.png"
            alt="Cliberduche Logo"
            className={`h-10 md:h-12 w-auto transition-opacity duration-400 ${introDone ? "opacity-100" : "opacity-0"}`}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className={`hidden md:flex items-center space-x-8 text-sm font-medium ${textColor}`}>
          {["about", "services", "contact"].map((item) => (
            <button
              key={item}
              onClick={() => smoothScrollTo(item)}
              className={`relative transition-colors hover:text-green-300 ${activeSection === item ? "text-green-300" : ""}`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-green-300 transition-all duration-300 ${activeSection === item ? "w-full" : "w-0"}`} />
            </button>
          ))}
          <Link to="/login" className="bg-green-500 px-4 py-2 rounded-full text-white hover:bg-green-600">
            Login
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
}
