import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Navbar";
import Intro from "./Intro";
import Home from "./Home";
import About from "./About";
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

    // Teleport user to top on every route change
    useEffect(() => {
        // Instantly jump to top
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });

        // Notify SmoothScroll to reset its internal refs
        const event = new CustomEvent("smooth-scroll-set-target", { detail: 0 });
        window.dispatchEvent(event);
    }, [pathname]);

    const isHome = pathname === "/";
    const noTopPadding = isHome || pathname === "/projects" || pathname === "/about";

    return (
        <div className="bg-[#f4faf7] text-[#0b2545] min-h-screen bg-white">
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