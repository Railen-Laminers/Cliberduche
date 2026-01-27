import React, { useEffect, useState } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInfinity, FaArrowUp } from "react-icons/fa";
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

    return (
        <>
            {/* Footer */}
            <footer className="bg-[#0b2545] text-white px-6 md:px-10 py-12 md:py-16">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">

                        {/* Branding + Socials */}
                        <div className="md:col-span-2">
                            <h4
                                ref={headingRef}
                                className={`font-bold text-xl mb-4 ${headingAnim}`}
                            >
                                Cliberduche <FaInfinity className="text-green-300 ml-1 inline" />
                            </h4>
                            <p className="text-gray-300 leading-relaxed mb-4 max-w-md">
                                Professional Building And Construction Services You Can Trust. Building dreams, one project at a time with excellence and integrity.
                            </p>
                            <div
                                ref={socialRef}
                                className={`flex space-x-4 ${socialAnim}`}
                            >
                                <a className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                                    <FaFacebook />
                                </a>
                                <a className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                                    <FaTwitter />
                                </a>
                                <a className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                                    <FaLinkedin />
                                </a>
                            </div>
                        </div>

                        {/* Services */}
                        <div
                            ref={servicesRef}
                            className={`${servicesAnim}`}
                        >
                            <h5 className="font-semibold mb-4 text-lg">Services</h5>
                            <ul className="space-y-2 text-gray-300">
                                <li className="hover:text-green-300">Residential Construction</li>
                                <li className="hover:text-green-300">Commercial Buildings</li>
                                <li className="hover:text-green-300">Renovation & Remodeling</li>
                                <li className="hover:text-green-300">Project Management</li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div
                            ref={companyRef}
                            className={`${companyAnim}`}
                        >
                            <h5 className="font-semibold mb-4 text-lg">Company</h5>
                            <ul className="space-y-2 text-gray-300">
                                <li><a href="#about" className="hover:text-green-300">About Us</a></li>
                                <li className="hover:text-green-300">Our Team</li>
                                <li className="hover:text-green-300">Careers</li>
                                <li><a href="#contact" className="hover:text-green-300">Contact</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Footer Bottom */}
                    <div className="border-t border-gray-700 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p className="text-gray-400 text-sm">
                                © 2026 Cliberduche Construction. All rights reserved.
                            </p>
                            <div className="flex space-x-6 mt-4 md:mt-0">
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
