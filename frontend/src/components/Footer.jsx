import React from "react";
import { FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BackToTopButton from "./BackToTopButton"; // adjust the import path as needed

export default function Footer() {
    const navigate = useNavigate();

    const menuLinks = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Projects", href: "/projects" },
        { label: "Contact", href: "/contact" },
    ];

    const socialLinks = [
        { label: "Facebook", href: "#", icon: FaFacebook },
        { label: "Instagram", href: "#", icon: FaInstagram },
        { label: "LinkedIn", href: "#", icon: FaLinkedinIn },
    ];

    const legalLinks = [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms & Conditions", href: "/terms" },
    ];

    return (
        <footer className="relative bg-[#081c33] text-white overflow-hidden pt-12 lg:pt-16 px-4">
            {/* Angular line decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-96 pointer-events-none overflow-hidden">
                <svg
                    className="w-full h-full"
                    viewBox="0 0 600 400"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <line
                        x1="600"
                        y1="0"
                        x2="0"
                        y2="400"
                        stroke="white"
                        strokeWidth="0.5"
                        opacity="0.2"
                    />
                    <line
                        x1="600"
                        y1="100"
                        x2="100"
                        y2="400"
                        stroke="white"
                        strokeWidth="0.5"
                        opacity="0.1"
                    />
                </svg>
            </div>

            {/* Main container - now includes the BackToTop button */}
            <div className="relative w-full max-w-7xl mx-auto flex flex-col">
                {/* Back to Top Button */}
                <BackToTopButton className="absolute top-0 lg:-top-12 right-6 z-40" />

                {/* Top section */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                    {/* Logo */}
                    <div className="lg:w-2/5 flex items-start">
                        <img
                            src="/logo/cliberduche_logo.png"
                            alt="Cliberduche Logo"
                            className="w-32 md:w-40 lg:w-48"
                        />
                    </div>

                    {/* Columns */}
                    <div className="lg:w-3/5 grid grid-cols-3 gap-6 md:gap-10">
                        {/* Menu */}
                        <div>
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                                Menu
                            </h3>
                            <ul className="space-y-3">
                                {menuLinks.map((link, i) => (
                                    <li key={i}>
                                        <button
                                            onClick={() => navigate(link.href)}
                                            className="text-xs sm:text-sm text-white hover:text-green-400 transition-colors duration-300 text-left"
                                        >
                                            {link.label.toUpperCase()}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Social */}
                        <div>
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                                Social
                            </h3>
                            <ul className="space-y-3">
                                {socialLinks.map((link, i) => (
                                    <li key={i}>
                                        <a
                                            href={link.href}
                                            className="text-xs sm:text-sm text-white hover:text-green-400 transition-colors duration-300 flex items-center gap-2 group"
                                        >
                                            <link.icon className="text-base group-hover:scale-110 transition-transform" />
                                            {link.label.toUpperCase()}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                                Contact
                            </h3>

                            <div className="space-y-3">
                                <a
                                    href="mailto:contact@cliberduche.com"
                                    className="text-xs sm:text-sm text-white hover:text-green-400 transition-colors duration-300 block"
                                >
                                    E@EMAIL.COM
                                </a>
                                <a
                                    href="tel:+1234567890"
                                    className="text-xs sm:text-sm text-white hover:text-green-400 transition-colors duration-300 block"
                                >
                                    +1 (234) 567-890
                                </a>
                            </div>

                            {/* Legal */}
                            <div className="mt-6">
                                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                                    Legal
                                </h3>
                                <ul className="space-y-3">
                                    {legalLinks.map((link, i) => (
                                        <li key={i}>
                                            <button
                                                onClick={() => navigate(link.href)}
                                                className="text-xs sm:text-sm text-white hover:text-green-400 transition-colors duration-300 text-left"
                                            >
                                                {link.label.toUpperCase()}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Large Brand Name */}
                <div className="w-full mt-40 overflow-hidden">
                    <h1
                        className="
    font-black tracking-[-0.04em] leading-none
    text-[clamp(2.8rem,14vw,12rem)]  /* mobile + tablet */
    lg:text-[clamp(3rem,16vw,12rem)] /* only desktop */
    whitespace-nowrap
  "
                    >
                        <span className="block hover:text-green-400 transition-colors duration-500 cursor-default">
                            CLIBERDUCHE
                        </span>
                    </h1>
                </div>
            </div>
        </footer>
    );
}