// src/pages/homepage/Homepage.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Navbar";
import Intro from "./Intro";
import Home from "./Home";
import About from "./About";
import Services from "./Services";
import Contact from "./Contact";
import Projects from "./Projects";
import Footer from "./Footer";
import BackToTopButton from "../../components/BackToTopButton";
import SmoothScroll from "../../components/SmoothScroll";
import "./Homepage.css";

export default function Homepage() {
    const [introPlaying, setIntroPlaying] = useState(true);
    const introDone = !introPlaying;
    const { pathname } = useLocation();

    // Scroll to top on route change (inline effect)
    useEffect(() => {
        const isTouchDevice =
            "ontouchstart" in window ||
            navigator.maxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0;

        requestAnimationFrame(() => {
            if (isTouchDevice) {
                window.scrollTo({ top: 0, behavior: "auto" });
            } else {
                window.dispatchEvent(
                    new CustomEvent("smooth-scroll-set-target", { detail: 0 })
                );
            }
        });
    }, [pathname]);

    const isHome = pathname === "/";
    const noTopPadding =
        isHome ||
        pathname === "/projects" ||
        pathname === "/about" ||
        pathname === "/services";

    return (
        <div className="font-sans bg-[#f4faf7] text-[#0b2545] min-h-screen bg-white">
            <Navbar introDone={introDone} />

            <SmoothScroll ease={0.08} className="smooth-scroll">
                {introPlaying && (
                    <Intro
                        logoSrc="/logo/cliberduche_logo.png"
                        title="Cliberduche"
                        onFinish={() => setIntroPlaying(false)}
                    />
                )}

                <main className={noTopPadding ? "" : "pt-16 md:pt-20"}>
                    <Routes>
                        <Route index element={<Home introDone={introDone} />} />
                        <Route path="/" element={<Home introDone={introDone} />} />
                        <Route path="/about" element={<About introDone={introDone} />} />
                        <Route path="/services" element={<Services introDone={introDone} />} />
                        <Route path="/projects" element={<Projects introDone={introDone} />} />
                        <Route path="/contact" element={<Contact introDone={introDone} />} />
                    </Routes>
                </main>

                <Footer introDone={introDone} />

                {introDone && <BackToTopButton />}
            </SmoothScroll>
        </div>
    );
}