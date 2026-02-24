import React, { useEffect, useState, useRef } from "react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import { useNavigate } from "react-router-dom";

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
                // Animate CLIBERDUCHE typing
                for (let i = 0; i <= mainWord.length; i++) {
                    setTypedMain(mainWord.slice(0, i));
                    await sleep(70);
                }

                // Animate CORPORATION combined: first 3 letters type, rest fade in
                for (let i = 1; i <= 3; i++) {
                    setTypedCorp(corpWord.slice(0, i));
                    await sleep(70);
                }
                setTypedCorp(corpWord);
                setIsTyping(false);
            } else if (exitTrigger) {
                // Exit animation: delete CLIBERDUCHE
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
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
    ];

    return (
        <footer ref={footerRef} className="relative bg-[#081c33] text-white overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 via-transparent to-transparent pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-20">
                {/* SOCIAL + NAV */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
                    <div ref={socialRef} className="flex space-x-4 justify-start w-full md:w-auto">
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

                    <div className="flex flex-wrap justify-end gap-6 md:gap-12 w-full md:w-auto mt-4 md:mt-0">
                        {companyLinks.map((link, i) => (
                            <button
                                key={i}
                                onClick={() => navigate(link.href)}
                                ref={companyRefs}
                                className={`text-sm text-gray-400 hover:text-green-300 transition ${companyAnim}`}
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* LOGO + COMPANY NAME - bottom left, full width, huge text */}
                <div className="w-full flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 mb-10">
                    {/* <img
                        ref={logoRef}
                        src="/logo/cliberduche_logo.png"
                        alt="Cliberduche Logo"
                        className={`w-40 sm:w-48 md:w-64 lg:w-80 xl:w-96 h-auto object-contain ${logoAnim}`}
                    /> */}

                    {/* Container for fluid typography */}
                    <div
                        className="flex flex-col leading-tight w-full"
                        style={{ containerType: 'inline-size' }}
                    >
                        {/* CLIBERDUCHE - fluid size, stays on one line */}
                        <h1 className="text-[clamp(1.5rem,11cqw,9.375rem)] font-bold whitespace-nowrap">
                            {typedMain.split("").map((char, i) => (
                                <span key={i} className="char" style={{ animationDelay: `${i * 30}ms` }}>
                                    {char}
                                </span>
                            ))}
                            {/* Visible cursor that fades out when typing finishes */}
                            <span
                                className={`ml-1 cursor transition-opacity duration-500 ${isTyping ? "opacity-100" : "opacity-0"}`}
                            >
                                |
                            </span>
                        </h1>

                        {/* CORPORATION - fluid size */}
                        <h2
                            className={`text-[clamp(1rem,5cqw,4rem)] font-semibold mt-0.5 transition-opacity duration-500 ${typedCorp ? "opacity-100" : "opacity-0"
                                }`}
                        >
                            {typedCorp}
                        </h2>
                    </div>
                </div>

                {/* BOTTOM LEGAL */}
                <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} . All rights reserved.
                    </p>
                    <div className="flex gap-8 text-sm text-gray-500">
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
      `}</style>
        </footer>
    );
}