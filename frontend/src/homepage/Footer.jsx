import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInfinity } from "react-icons/fa";
import useScrollAnimation from "./useScrollAnimation";

export default function Footer() {
    const [ref, animationClass] = useScrollAnimation();

    return (
        <footer ref={ref} className={`bg-[#0b2545] text-white px-6 md:px-10 py-12 md:py-16 transition-all duration-1000 ${animationClass}`}>
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div className="md:col-span-2">
                        <h4 className="font-bold text-xl mb-4">Cliberduche <FaInfinity className="text-green-300 ml-1 inline" /></h4>
                        <p className="text-gray-300 leading-relaxed mb-4 max-w-md">
                            Professional Building And Construction Services You Can Trust. Building dreams, one project at a time with excellence and integrity.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors" aria-label="Facebook">
                                <FaFacebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors" aria-label="Twitter">
                                <FaTwitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors" aria-label="LinkedIn">
                                <FaLinkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h5 className="font-semibold mb-4 text-lg">Services</h5>
                        <ul className="space-y-2 text-gray-300">
                            <li><a href="#" className="hover:text-green-300 transition-colors">Residential Construction</a></li>
                            <li><a href="#" className="hover:text-green-300 transition-colors">Commercial Buildings</a></li>
                            <li><a href="#" className="hover:text-green-300 transition-colors">Renovation & Remodeling</a></li>
                            <li><a href="#" className="hover:text-green-300 transition-colors">Project Management</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-semibold mb-4 text-lg">Company</h5>
                        <ul className="space-y-2 text-gray-300">
                            <li><a href="#about" className="hover:text-green-300 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-green-300 transition-colors">Our Team</a></li>
                            <li><a href="#" className="hover:text-green-300 transition-colors">Careers</a></li>
                            <li><a href="#contact" className="hover:text-green-300 transition-colors">Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            © 2026 Cliberduche Construction. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="text-gray-400 hover:text-green-300 text-sm transition-colors">Privacy Policy</a>
                            <a href="#" className="text-gray-400 hover:text-green-300 text-sm transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
