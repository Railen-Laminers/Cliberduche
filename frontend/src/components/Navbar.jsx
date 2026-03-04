import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaTimes, FaBars, FaArrowUp } from "react-icons/fa";
import gsap from "gsap";
import logo from "/logo/cliberduche_logo.png";

export default function Navbar({ introDone = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const desktopNavRef = useRef(null);
  const burgerRef = useRef(null);
  const animationRan = useRef(false);

  // Scroll and resize detection
  useEffect(() => {
    const handleScrollAndResize = () => {
      const currentScrollPos = window.scrollY;
      setIsScrolled(currentScrollPos > 50);
      setIsTop(currentScrollPos < 10);

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const bottomThreshold = 50;
      const atBottom = scrollY + windowHeight >= documentHeight - bottomThreshold;
      setIsAtBottom(atBottom);
    };

    window.addEventListener("scroll", handleScrollAndResize);
    window.addEventListener("resize", handleScrollAndResize);
    handleScrollAndResize();

    return () => {
      window.removeEventListener("scroll", handleScrollAndResize);
      window.removeEventListener("resize", handleScrollAndResize);
    };
  }, []);

  // Detect mobile/tablet
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load state after intro
  useEffect(() => {
    if (introDone) {
      setTimeout(() => setIsLoaded(true), 300);
    }
  }, [introDone]);

  // GSAP sequential animation
  useEffect(() => {
    if (isLoaded && !animationRan.current) {
      const navLinks = desktopNavRef.current?.children;

      gsap.set(desktopNavRef.current, { opacity: 0, y: -20 });
      gsap.set(navLinks, { opacity: 0, y: 20 });

      gsap.to(desktopNavRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(navLinks, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
          });

          if (burgerRef.current) {
            gsap.to(burgerRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            });
          }
        },
      });

      animationRan.current = true;
    }

    return () => {
      gsap.killTweensOf(desktopNavRef.current?.children);
      gsap.killTweensOf(desktopNavRef.current);
      if (burgerRef.current) gsap.killTweensOf(burgerRef.current);
    };
  }, [isLoaded]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Close mobile menu on resize to lg
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Optional logo transition reset
  useEffect(() => {
    if (isLoaded) {
      const logoEl = document.getElementById("nav-logo");
      if (logoEl) {
        logoEl.style.transition = "none";
        logoEl.getBoundingClientRect();
        setTimeout(() => {
          logoEl.style.transition = "";
        }, 100);
      }
    }
  }, [isLoaded]);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path) => location.pathname === path;
  const desktopLinkClass = (path) =>
    isActive(path) ? "text-green-400" : "text-white hover:text-green-400";

  const hideLogo = (isMobile && isOpen) || !isTop;

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-opacity duration-500 transition-transform duration-300 ease-in-out ${isLoaded ? "opacity-100" : "opacity-0"
          }`}
        style={{ transform: isAtBottom ? "translateY(-100%)" : "translateY(0)" }}
      >
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-4 lg:px-8 h-20 transition-all duration-300 bg-transparent text-white mt-4">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className={`flex items-center gap-3 group transition-opacity duration-300 ${hideLogo ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            aria-label="Go to homepage"
            disabled={hideLogo}
          >
            <img
              id="nav-logo"
              src={logo}
              alt="Cliberduche Logo"
              className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </button>

          {/* Desktop Navigation */}
          <nav
            ref={desktopNavRef}
            className="hidden lg:flex items-center gap-2 bg-[#081c33]/80 backdrop-blur-sm border border-white/10 px-6 py-2 rounded-sm shadow-2xl"
          >
            {navItems.map((item) => {
              const isContact = item.label === "Contact";

              return (
                <React.Fragment key={item.path}>
                  {isContact ? (
                    <Link
                      to={item.path}
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2 group ml-2"
                      style={{ opacity: 0, transform: "translateY(20px)" }}
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
                      style={{ opacity: 0, transform: "translateY(20px)" }}
                    >
                      <span className="relative z-10 text-sm tracking-[0.3em] uppercase">
                        {item.label}
                      </span>
                      <FaArrowUp
                        className={`w-3 h-3 rotate-45 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${isActive(item.path)
                            ? "text-green-400"
                            : "text-white group-hover:text-green-400"
                          }`}
                      />
                    </Link>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Mobile Menu Button with inline hidden style */}
          <button
            ref={burgerRef}
            onClick={() => setIsOpen(true)}
            className="lg:hidden relative z-50 w-12 h-12 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            style={{ opacity: 0, transform: "translateY(20px)" }} // 👈 hidden until GSAP animates
            aria-label="Open menu"
            aria-expanded={isOpen}
          >
            <FaBars className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay (unchanged) */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-500 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsOpen(false)}
      >
        <div className="absolute inset-0 bg-transparent" />

        <div
          className={`absolute right-0 top-0 h-full w-full sm:w-[400px] bg-[#081c33]/80 backdrop-blur-sm border-l border-white/10 shadow-2xl transition-transform duration-500 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          onClick={(e) => e.stopPropagation()}
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
          <nav className="flex-1 flex flex-col justify-start px-6 py-8 space-y-2">
            {navItems.map((item, index) => {
              const isContact = item.label === "Contact";
              const activeClass = isActive(item.path) ? "text-green-400" : "text-white";

              return (
                <div
                  key={item.path}
                  className={`transition-all duration-500 ease-out ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                  style={{
                    transitionDelay: isOpen ? `${index * 100 + 200}ms` : "0ms",
                  }}
                >
                  {isContact ? (
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg inline-flex items-center gap-2 group"
                    >
                      <span className="text-sm tracking-[0.3em] uppercase">{item.label}</span>
                      <FaArrowUp className="w-4 h-4 rotate-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center justify-between w-full px-6 py-3 rounded-sm transition-all duration-300 hover:bg-white/5 ${activeClass}`}
                    >
                      <span className="text-sm tracking-[0.3em] uppercase">{item.label}</span>
                      <FaArrowUp
                        className={`w-4 h-4 rotate-45 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${isActive(item.path)
                            ? "text-green-400"
                            : "text-white group-hover:text-green-400"
                          }`}
                      />
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Footer */}
          <div
            className={`px-6 py-6 border-t border-white/10 transition-all duration-500 delay-700 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            <p className="text-slate-400 text-sm">© 2026 Cliberduche. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}