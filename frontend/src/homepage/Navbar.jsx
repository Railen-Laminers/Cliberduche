import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaInfinity } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColor = isScrolled ? "text-white" : "text-slate-300";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? "bg-[#0b2545] shadow-lg border-b border-white/10" : "bg-[#0b2545]"
      }`}
    >
      {/* content height controlled here so hero can match it */}
      <div className="h-16 md:h-20 flex items-center justify-between px-6 md:px-10">
        {/* Logo */}
        <Link
          to="/"
          className={`font-bold text-xl md:text-2xl tracking-wide transition-colors ${
            isScrolled ? "text-white" : "text-slate-200"
          } hover:text-green-300`}
        >
          Cliberduche
        </Link>

        {/* Desktop Nav */}
        <nav className={`hidden md:flex items-center space-x-8 text-sm font-medium ${textColor}`}>
          {["About", "Projects", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative group transition-colors hover:text-green-300"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-300 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}

          <Link
            to="/login"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            Login
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden focus:outline-none focus:ring-2 focus:ring-green-300 rounded transition-colors ${
            isScrolled ? "text-white" : "text-slate-300"
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav - positioned below the header (doesn't change header height) */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0b2545] border-b border-white/10 z-40">
          <nav className="flex flex-col space-y-4 px-6 py-6 text-white text-sm font-medium">
            {["About", "Projects", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-green-300 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}

            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-semibold text-center transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
