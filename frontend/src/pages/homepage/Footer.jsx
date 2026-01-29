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

export default function Footer({ introDone = true }) {
    const [visible, setVisible] = useState(false);

    // Scroll listener for "Back to Top" button
    useEffect(() => {
        const toggleVisibility = () => setVisible(window.scrollY > 300);
        if (introDone) {
            window.addEventListener("scroll", toggleVisibility);
            return () => window.removeEventListener("scroll", toggleVisibility);
        }
    }, [introDone]);

    // Scroll to top
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

    // Smooth scroll to section
    const scrollToSection = (selector) => {
        const target = document.querySelector(selector);
        if (!target) return;

        const start = window.scrollY;
        const end = target.getBoundingClientRect().top + start;
        const distance = end - start;
        const duration = 500;
        const startTime = performance.now();

        const animateScroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            window.scrollTo(0, start + distance * progress);
            if (progress < 1) requestAnimationFrame(animateScroll);
        };

        requestAnimationFrame(animateScroll);
    };

    // Scroll animations
    const [logoRef, logoAnim] = useScrollAnimation(0.2, introDone);
    const [socialRef, socialAnim] = useScrollAnimation(0.2, introDone);
    const [contactHeadingRef, contactHeadingAnim] = useScrollAnimation(0.2, introDone);
    const [phoneRef, phoneAnim] = useScrollAnimation(0.2, introDone);
    const [emailRef, emailAnim] = useScrollAnimation(0.2, introDone);
    const [addressRef, addressAnim] = useScrollAnimation(0.2, introDone);
    const [servicesHeadingRef, servicesHeadingAnim] = useScrollAnimation(0.2, introDone);
    const [serviceRefs, serviceAnim] = useScrollAnimation(0.2, introDone);
    const [companyHeadingRef, companyHeadingAnim] = useScrollAnimation(0.2, introDone);
    const [companyRefs, companyAnim] = useScrollAnimation(0.2, introDone);

    // Data
    const services = [
        "Backfill & Land Sourcing",
        "Land Development",
        "Site Management",
        "Equipment Leasing",
        "Project Management Consultation",
    ];

    const companyLinks = [
        { label: "About Us", href: "#about" },
        { label: "Services", href: "#services" },
        { label: "Contact", href: "#contact" },
    ];

    return (
        <>
            <footer className="bg-[#0b2545] text-white px-6 md:px-10 py-12 md:py-16">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8 items-start">
                        {/* Social + Contact Info */}
                        <div className="md:col-span-2 flex flex-col">
                            <div ref={socialRef} className={`flex space-x-3 ${socialAnim}`}>
                                <a href="#" aria-label="Facebook" className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                                    <FaFacebook />
                                </a>
                                <a href="#" aria-label="Twitter" className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                                    <FaTwitter />
                                </a>
                                <a href="#" aria-label="LinkedIn" className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                                    <FaLinkedin />
                                </a>
                            </div>

                            {/* Contact Info */}
                            <div className="mt-6 space-y-2 text-gray-200">
                                <h5 ref={contactHeadingRef} className={`font-semibold text-lg ${contactHeadingAnim}`}>Contact</h5>
                                <div ref={phoneRef} className={`flex items-center space-x-3 text-sm ${phoneAnim}`}>
                                    <FaPhone className="text-green-300" />
                                    <span>(+63) 9XX-XXX-XXXX</span>
                                </div>
                                <div ref={emailRef} className={`flex items-center space-x-3 text-sm ${emailAnim}`}>
                                    <FaEnvelope className="text-green-300" />
                                    <span>info@cliberduche.com</span>
                                </div>
                                <div ref={addressRef} className={`flex items-center space-x-3 text-sm ${addressAnim}`}>
                                    <FaMapMarkerAlt className="text-green-300" />
                                    <span>Laguna & Cavite, CALABARZON, Philippines</span>
                                </div>
                            </div>
                        </div>

                        {/* Services */}
                        <div>
                            <h5 ref={servicesHeadingRef} className={`font-semibold mb-4 text-lg ${servicesHeadingAnim}`}>Services</h5>
                            <ul className="space-y-2 text-gray-300">
                                {services.map((s, i) => (
                                    <li key={i} ref={serviceRefs} className={`hover:text-green-300 text-sm ${serviceAnim}`}>
                                        <button
                                            onClick={() => scrollToSection("#services")}
                                            className="inline-block text-left"
                                        >
                                            {s}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h5 ref={companyHeadingRef} className={`font-semibold mb-4 text-lg ${companyHeadingAnim}`}>Company</h5>
                            <ul className="space-y-2 text-gray-300">
                                {companyLinks.map((link, i) => (
                                    <li key={i} ref={companyRefs} className={`hover:text-green-300 text-sm ${companyAnim}`}>
                                        <button
                                            onClick={() => scrollToSection(link.href)}
                                            className="inline-block text-left"
                                        >
                                            {link.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Footer Bottom */}
                    <div className="border-t border-gray-700 pt-8 relative">
                        {/* Large Logo in bottom-right corner */}
                        <img
                            ref={logoRef}
                            src="/logo/cliberduche_logo.png"
                            alt="Cliberduche Logo"
                            className={`w-36 md:w-48 h-auto object-contain absolute bottom-8 right-8 ${logoAnim}`}
                        />

                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p
                                className={`text-gray-400 text-sm transition-all duration-700 ease-out opacity-0 translate-y-10 scale-95`}
                                style={{ transitionDelay: '0.2s' }}
                            >
                                © {new Date().getFullYear()} CLIBERDUCHE CORPORATION. All rights reserved.
                            </p>

                            <div className="flex items-center space-x-6 mt-4 md:mt-0">
                                <span
                                    className={`text-gray-400 hover:text-green-300 text-sm cursor-pointer transition-all duration-700 ease-out opacity-0 translate-y-10 scale-95`}
                                    style={{ transitionDelay: '0.4s' }}
                                >
                                    Privacy Policy
                                </span>
                                <span
                                    className={`text-gray-400 hover:text-green-300 text-sm cursor-pointer transition-all duration-700 ease-out opacity-0 translate-y-10 scale-95`}
                                    style={{ transitionDelay: '0.6s' }}
                                >
                                    Terms of Service
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Back To Top Button */}
            {introDone && (
                <button
                    onClick={scrollToTop}
                    aria-label="Back to top"
                    className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-green-500 text-white shadow-lg transition-all duration-300
                    ${visible ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
                >
                    <FaArrowUp />
                </button>
            )}
        </>
    );
}
