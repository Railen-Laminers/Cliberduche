import React from "react";
import { FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Footer() {
    const navigate = useNavigate();

    const menuLinks = [
        { label: "About", href: "/about" },
        { label: "Services", href: "/services" },
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
        <footer className="relative bg-[#081c33] text-white overflow-hidden min-h-screen pt-2 px-2 pb-0 flex flex-col">
            {/* Angular line decoration - top right corner */}
            <div className="absolute top-0 right-0 w-1/2 h-96 pointer-events-none overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="600" y1="0" x2="0" y2="400" stroke="white" strokeWidth="0.5" opacity="0.2" />
                    <line x1="600" y1="100" x2="100" y2="400" stroke="white" strokeWidth="0.5" opacity="0.1" />
                </svg>
            </div>

            {/* Main content */}
            <div className="relative flex-1 flex flex-col">
                {/* Top section (logo + columns) */}
                <div className="w-full max-w-7xl mx-auto pt-16 px-2 md:px-4">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                        {/* Logo */}
                        <div className="lg:w-2/5 flex items-start justify-start">
                            <img
                                src="/logo/cliberduche_logo.png"
                                alt="Cliberduche Logo"
                                className="w-32 md:w-40 lg:w-48"
                            />
                        </div>

                        {/* Right side - three columns always */}
                        <div className="lg:w-3/5 grid grid-cols-3 gap-4 md:gap-8">
                            {/* Menu Column */}
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

                            {/* Social Column */}
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

                            {/* Contact Column (with Legal below) */}
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

                                {/* Legal Section - always under Contact */}
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
                </div>

                {/* Bottom – Large Brand Name */}
                <div className="w-full max-w-7xl mx-auto px-2 md:px-4 mt-auto">
                    <h1 className="w-full text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] font-black tracking-[-0.03em] leading-none">
                        <span className="block hover:text-green-400 transition-colors duration-500 cursor-default">
                            CLIBERDUCHE
                        </span>
                    </h1>
                </div>
            </div>
        </footer>
    );
}