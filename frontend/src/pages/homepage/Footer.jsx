// Footer.jsx
import React, { useEffect, useState } from "react";
import {
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaArrowUp,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
} from "react-icons/fa";
import useScrollAnimation from "./useScrollAnimation";

export default function Footer() {
    const [visible, setVisible] = useState(false);

    // Scroll listener for "Back to Top" button
    useEffect(() => {
        const toggleVisibility = () => {
            setVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

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

    // Scroll animations for child elements
    const [headingRef, headingAnim] = useScrollAnimation(0.2);
    const [socialRef, socialAnim] = useScrollAnimation(0.2);
    const [servicesRef, servicesAnim] = useScrollAnimation(0.2);
    const [companyRef, companyAnim] = useScrollAnimation(0.2);

    // Services (kept in sync with Services.js)
    const services = [
        "Backfill & Land Sourcing",
        "Land Development",
        "Site Management",
        "Equipment Leasing",
        "Project Management Consultation",
    ];


    return (
        <>
            {/* Footer */}
            <footer className="bg-[#0b2545] text-white px-6 md:px-10 py-12 md:py-16">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8 items-start">
                        {/* Branding + Logo inline with name */}
                        <div className="md:col-span-2 flex flex-col">
                            <div className="flex items-center space-x-3 mb-3">
                                <img
                                    src="/logo/cliberduche_logo.png"
                                    alt="Cliberduche Logo"
                                    className="w-12 md:w-16 h-auto object-contain"
                                />
                                <h4
                                    ref={headingRef}
                                    className={`font-bold text-xl ${headingAnim}`}
                                >
                                    CLIBERDUCHE CORPORATION
                                </h4>
                            </div>

                            <div ref={socialRef} className={`flex space-x-3 ${socialAnim}`}>
                                <a
                                    href="#"
                                    aria-label="Facebook"
                                    className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                                >
                                    <FaFacebook />
                                </a>
                                <a
                                    href="#"
                                    aria-label="Twitter"
                                    className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                                >
                                    <FaTwitter />
                                </a>
                                <a
                                    href="#"
                                    aria-label="LinkedIn"
                                    className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                                >
                                    <FaLinkedin />
                                </a>
                            </div>

                            {/* Quick contact in footer */}
                            <div className="mt-6 space-y-2 text-gray-200">
                                <div className="flex items-center space-x-3">
                                    <FaPhone className="text-green-300" />
                                    <span className="text-sm">(+63) 9XX-XXX-XXXX</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <FaEnvelope className="text-green-300" />
                                    <span className="text-sm">info@cliberduche.com</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <FaMapMarkerAlt className="text-green-300" />
                                    <span className="text-sm">Laguna & Cavite, CALABARZON, Philippines</span>
                                </div>
                            </div>
                        </div>

                        {/* Services (dynamic, matches Services.js) */}
                        <div ref={servicesRef} className={`${servicesAnim}`}>
                            <h5 className="font-semibold mb-4 text-lg">Services</h5>
                            <ul className="space-y-2 text-gray-300">
                                {services.map((s, idx) => (
                                    <li key={idx} className="hover:text-green-300 text-sm">
                                        <a href="#services" className="inline-block">
                                            {s}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company Links */}
                        <div ref={companyRef} className={`${companyAnim}`}>
                            <h5 className="font-semibold mb-4 text-lg">Company</h5>
                            <ul className="space-y-2 text-gray-300">
                                <li>
                                    <a href="#about" className="hover:text-green-300 text-sm">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#mission-vision" className="hover:text-green-300 text-sm">
                                        Mission & Vision
                                    </a>
                                </li>
                                <li>
                                    <a href="#projects" className="hover:text-green-300 text-sm">
                                        Projects
                                    </a>
                                </li>
                                <li>
                                    <a href="#contact" className="hover:text-green-300 text-sm">
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Footer Bottom */}
                    <div className="border-t border-gray-700 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p className="text-gray-400 text-sm">
                                © {new Date().getFullYear()} CLIBERDUCHE CORPORATION. All rights reserved.
                            </p>

                            <div className="flex items-center space-x-6 mt-4 md:mt-0">
                                <span className="text-gray-400 hover:text-green-300 text-sm cursor-pointer">
                                    Privacy Policy
                                </span>
                                <span className="text-gray-400 hover:text-green-300 text-sm cursor-pointer">
                                    Terms of Service
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Back To Top Button */}
            <button
                onClick={scrollToTop}
                aria-label="Back to top"
                className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-green-500 text-white shadow-lg transition-all duration-300
                ${visible ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
            >
                <FaArrowUp />
            </button>
        </>
    );
}
