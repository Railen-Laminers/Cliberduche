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
                setExitTrigger(true); // start exit typing
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
                setTypedCorp(corpWord); // fade in rest instantly
                setIsTyping(false);
            } else if (exitTrigger) {
                // Exit animation: delete CLIBERDUCHE
                for (let i = mainWord.length; i >= 0; i--) {
                    setTypedMain(mainWord.slice(0, i));
                    await sleep(50);
                }
                setTypedCorp(""); // fade out CORPORATION
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
        { label: "Services", href: "/services" },
        { label: "Contact", href: "/contact" },
    ];

    return (
        <footer ref={footerRef} className="relative bg-[#081c33] text-white overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 via-transparent to-transparent pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-20">
                {/* LOGO + COMPANY NAME */}
                <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 mb-10">
                    <img
                        ref={logoRef}
                        src="/logo/cliberduche_logo.png"
                        alt="Cliberduche Logo"
                        className={`w-32 md:w-44 ${logoAnim}`}
                    />

                    <div className="flex flex-col leading-tight">
                        {/* CLIBERDUCHE */}
                        <h1 className="text-3xl md:text-5xl font-bold flex flex-wrap">
                            {typedMain.split("").map((char, i) => (
                                <span key={i} className="char" style={{ animationDelay: `${i * 30}ms` }}>
                                    {char}
                                </span>
                            ))}
                            <span className={`ml-1 cursor ${isTyping ? "blink" : ""}`}>|</span>
                        </h1>

                        {/* CORPORATION */}
                        <h2
                            className={`text-xl md:text-2xl font-semibold mt-0.5 transition-opacity duration-500 ${typedCorp ? "opacity-100" : "opacity-0"
                                }`}
                        >
                            {typedCorp}
                        </h2>
                    </div>
                </div>

                {/* SOCIAL + NAV */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
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
        .blink { animation: blink 1s steps(2, start) infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
        </footer>
    );
}