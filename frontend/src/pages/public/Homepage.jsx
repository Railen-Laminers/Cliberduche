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

import SmoothScroll from "../../components/SmoothScroll";
import "./Homepage.css";

// ScrollToTop works for both window scroll and SmoothScroll container
function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Reset native window scroll
        window.scrollTo(0, 0);

        // Reset SmoothScroll container if it exists
        const scrollContainer = document.querySelector(".smooth-scroll");
        if (scrollContainer) {
            scrollContainer.scrollTop = 0;
        }
    }, [pathname]);

    return null;
}

export default function Homepage() {
    const [introPlaying, setIntroPlaying] = useState(true);
    const introDone = !introPlaying;
    const { pathname } = useLocation();

    const isHome = pathname === "/";
    const noTopPadding = isHome || pathname === "/projects";

    return (
        // Force SmoothScroll to remount on route change to reset scroll
        <SmoothScroll ease={0.08} key={pathname} className="smooth-scroll">
            <ScrollToTop /> {/* scroll resets on every route change */}

            <div className="font-sans bg-[#f4faf7] text-[#0b2545] min-h-screen bg-white">
                <Navbar introDone={introDone} />

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
            </div>
        </SmoothScroll>
    );
}
