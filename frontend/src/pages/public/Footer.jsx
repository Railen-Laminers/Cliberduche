import React, { useEffect, useState, useRef } from "react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import { useNavigate } from "react-router-dom";
import MagneticButton from "../../components/MagneticButton";

export default function Footer({ introDone = true }) {
    const navigate = useNavigate();

    const footerRef = useRef(null);
    const [inView, setInView] = useState(false);
    const [exitTrigger, setExitTrigger] = useState(false);

    // Detect footer entry
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.1 }
        );
        if (footerRef.current) observer.observe(footerRef.current);
        return () => observer.disconnect();
    }, []);

    // Detect halfway scroll for exit animation
    useEffect(() => {
        const handleScroll = () => {
            if (!footerRef.current) return;
            const footerTop = footerRef.current.getBoundingClientRect().top + window.scrollY;
            const footerHeight = footerRef.current.offsetHeight;
            const scrollY = window.scrollY + window.innerHeight;

            if (scrollY < footerTop + footerHeight / 2) {
                setExitTrigger(true);
            } else {
                setExitTrigger(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Typewriter animation for CLIBERDUCHE
    const mainWord = "CLIBERDUCHE";
    const corpWord = "CORPORATION";
    const [typedMain, setTypedMain] = useState("");
    const [typedCorp, setTypedCorp] = useState("");
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        let timeout;
        const sleep = (ms) => new Promise((res) => (timeout = setTimeout(res, ms)));

        const playTypewriter = async () => {
            setIsTyping(true);
            if (inView && !exitTrigger) {
                for (let i = 0; i <= mainWord.length; i++) {
                    setTypedMain(mainWord.slice(0, i));
                    await sleep(70);
                }
                for (let i = 1; i <= 3; i++) {
                    setTypedCorp(corpWord.slice(0, i));
                    await sleep(70);
                }
                setTypedCorp(corpWord);
                setIsTyping(false);
            } else if (exitTrigger) {
                for (let i = mainWord.length; i >= 0; i--) {
                    setTypedMain(mainWord.slice(0, i));
                    await sleep(50);
                }
                setTypedCorp("");
                setIsTyping(false);
            }
        };

        playTypewriter();
        return () => clearTimeout(timeout);
    }, [inView, exitTrigger]);

    // Scroll animations
    const [logoRef, logoAnim] = useScrollAnimation(0.2, introDone);
    const [socialRef, socialAnim] = useScrollAnimation(0.2, introDone);
    const [companyRefs, companyAnim] = useScrollAnimation(0.2, introDone);

    const companyLinks = [
        { label: "Home", href: "/", isCTA: false },
        { label: "About", href: "/about", isCTA: false },
        { label: "Projects", href: "/projects", isCTA: false },
        { label: "Contact", href: "/contact", isCTA: true },
    ];

    return (
        <footer
            ref={footerRef}
            className="relative bg-[#081c33] text-white overflow-hidden min-h-[600px]"
        >
            {/* Angular line decoration - top right corner */}
            <div className="absolute top-0 right-0 w-1/2 h-96 pointer-events-none overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="600" y1="0" x2="0" y2="400" stroke="white" strokeWidth="0.5" opacity="0.2" />
                    <line x1="600" y1="100" x2="100" y2="400" stroke="white" strokeWidth="0.5" opacity="0.1" />
                </svg>
            </div>

            <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-20 h-full flex flex-col justify-between min-h-[600px]">
                {/* TOP SECTION - Company Name with Typewriter */}
                <div className="mb-auto pt-10">
                    <div className="flex flex-col leading-tight">
                        {/* CLIBERDUCHE */}
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold flex flex-wrap">
                            {typedMain.split("").map((char, i) => (
                                <span key={i} className="char" style={{ animationDelay: `${i * 30}ms` }}>
                                    {char}
                                </span>
                            ))}
                            <span className={`ml-1 cursor ${isTyping ? "blink" : ""}`}>|</span>
                        </h1>

                        {/* CORPORATION */}
                        <h2
                            className={`text-xl md:text-2xl lg:text-3xl font-semibold mt-0.5 transition-opacity duration-500 ${typedCorp ? "opacity-100" : "opacity-0"
                                }`}
                        >
                            {typedCorp}
                        </h2>
                    </div>
                </div>

                {/* BOTTOM SECTION - Logo + Nav + Social */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12 pb-4">
                    {/* Left Side - Logo + Social */}
                    <div className="flex flex-col gap-6">
                        <img
                            ref={logoRef}
                            src="/logo/cliberduche_logo.png"
                            alt="Cliberduche Logo"
                            className={`w-24 md:w-32 ${logoAnim}`}
                        />

                        {/* Social Icons */}
                        <div ref={socialRef} className={`flex space-x-3 ${socialAnim}`}>
                            {[FaFacebook, FaTwitter, FaLinkedin].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="group w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-green-400 transition-all duration-300"
                                >
                                    <Icon className="text-lg group-hover:text-green-400 transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Navigation with Magnetic Contact CTA */}
                    <div className="flex flex-wrap items-end gap-6 md:gap-10 w-full md:w-auto">
                        {companyLinks.map((link, i) => {
                            if (link.isCTA) {
                                return (
                                    <MagneticButton
                                        key={i}
                                        padding={80}
                                        magnetStrength={2.5}
                                        activeTransition="transform 0.2s ease-out"
                                        inactiveTransition="transform 0.5s ease-in-out"
                                        wrapperClassName="inline-block"
                                        innerClassName="block"
                                    >
                                        <button
                                            onClick={() => navigate(link.href)}
                                            ref={companyRefs}
                                            className={`text-sm font-medium px-5 py-2.5 border border-green-400 text-green-400 hover:bg-green-400 hover:text-[#081c33] rounded transition-all duration-300 ${companyAnim}`}
                                            style={{ animationDelay: `${i * 50}ms` }}
                                        >
                                            {link.label}
                                        </button>
                                    </MagneticButton>
                                );
                            }
                            return (
                                <button
                                    key={i}
                                    onClick={() => navigate(link.href)}
                                    ref={companyRefs}
                                    className={`text-sm font-medium text-gray-400 hover:text-green-300 transition-all duration-300 ${companyAnim}`}
                                    style={{ animationDelay: `${i * 50}ms` }}
                                >
                                    {link.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Legal */}
                <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} Cliberduche Corporation. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span className="hover:text-green-300 cursor-pointer transition">Privacy Policy</span>
                        <span className="hover:text-green-300 cursor-pointer transition">Terms of Service</span>
                    </div>
                </div>
            </div>

            {/* Inline CSS for typewriter effect */}
            <style>{`
                .char { opacity: 0; animation: fadeChar 280ms ease forwards; }
                @keyframes fadeChar { from { opacity: 0; } to { opacity: 1; } }

                .cursor { font-weight: 400; }
                .blink { animation: blink 1s steps(2, start) infinite; }
                @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
            `}</style>
        </footer>
    );
}