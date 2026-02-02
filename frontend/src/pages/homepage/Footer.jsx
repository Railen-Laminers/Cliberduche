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

    // Back to top visibility
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

        const animate = (time) => {
            const progress = Math.min((time - startTime) / duration, 1);
            window.scrollTo(0, start * (1 - progress));
            if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    };

    // Scroll to section
    const scrollToSection = (selector) => {
        const target = document.querySelector(selector);
        if (!target) return;

        const start = window.scrollY;
        const end = target.getBoundingClientRect().top + start;
        const distance = end - start;
        const duration = 500;
        const startTime = performance.now();

        const animate = (time) => {
            const progress = Math.min((time - startTime) / duration, 1);
            window.scrollTo(0, start + distance * progress);
            if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
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

    const services = [
        "Backfill & Land Sourcing",
        "Land Development",
        "Site Management",
        "Equipment Leasing",
        "Project Management Consultation",
    ];

    const companyLinks = [
        { label: "Home", href: "#home" },
        { label: "About Us", href: "#about" },
        { label: "Services", href: "#services" },
        { label: "Contact", href: "#contact" },
    ];

    return (
        <>
            <footer className="relative bg-[#081c33] text-white overflow-hidden">
                {/* background accent */}
                <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 via-transparent to-transparent pointer-events-none" />

                <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-20">
                    <div className="grid md:grid-cols-12 gap-12 items-start">
                        {/* BRAND + CONTACT */}
                        <div className="md:col-span-5 space-y-10">
                            <img
                                ref={logoRef}
                                src="/logo/cliberduche_logo.png"
                                alt="Cliberduche Logo"
                                className={`w-44 md:w-56 ${logoAnim}`}
                            />

                            {/* Social */}
                            <div
                                ref={socialRef}
                                className={`flex space-x-4 ${socialAnim}`}
                            >
                                {[FaFacebook, FaTwitter, FaLinkedin].map((Icon, i) => (
                                    <a
                                        key={i}
                                        href="#"
                                        className="group w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-green-400 transition"
                                    >
                                        <Icon className="text-lg group-hover:text-green-400 transition" />
                                    </a>
                                ))}
                            </div>

                            
                        </div>

                        {/* NAVIGATION */}
                        <div className="md:col-span-7 grid sm:grid-cols-2 gap-12">
                            {/* Services */}
                            <div>
                                <h5
                                    ref={servicesHeadingRef}
                                    className={`mb-6 text-lg font-semibold tracking-wide ${servicesHeadingAnim}`}
                                >
                                    Services
                                </h5>
                                <ul className="space-y-4">
                                    {services.map((s, i) => (
                                        <li
                                            key={i}
                                            ref={serviceRefs}
                                            className={`group text-sm text-gray-400 hover:text-green-300 transition ${serviceAnim}`}
                                        >
                                            <button
                                                onClick={() => scrollToSection("#services")}
                                                className="relative pl-6 text-left"
                                            >
                                                <span className="absolute left-0 top-2 w-2 h-2 bg-green-400 rounded-full scale-0 group-hover:scale-100 transition" />
                                                {s}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Company */}
                            <div>
                                <h5
                                    ref={companyHeadingRef}
                                    className={`mb-6 text-lg font-semibold tracking-wide ${companyHeadingAnim}`}
                                >
                                    Company
                                </h5>
                                <ul className="space-y-4">
                                    {companyLinks.map((link, i) => (
                                        <li
                                            key={i}
                                            ref={companyRefs}
                                            className={`group text-sm text-gray-400 hover:text-green-300 transition ${companyAnim}`}
                                        >
                                            <button
                                                onClick={() => scrollToSection(link.href)}
                                                className="relative pl-6 text-left"
                                            >
                                                <span className="absolute left-0 top-2 w-2 h-2 bg-green-400 rounded-full scale-0 group-hover:scale-100 transition" />
                                                {link.label}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM */}
                    <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-sm text-gray-500">
                            © {new Date().getFullYear()} CLIBERDUCHE CORPORATION. All rights reserved.
                        </p>

                        <div className="flex gap-8 text-sm text-gray-500">
                            <span className="hover:text-green-300 cursor-pointer transition">
                                Privacy Policy
                            </span>
                            <span className="hover:text-green-300 cursor-pointer transition">
                                Terms of Service
                            </span>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Back to top */}
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
