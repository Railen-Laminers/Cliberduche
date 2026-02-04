import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Intro from "./Intro";
import Home from "./Home";
import About from "./About";
import Services from "./Services";
import Contact from "./Contact";
import Projects from "./Projects";
import Footer from "./Footer";
import './Homepage.css';

export default function Homepage() {
    const [introPlaying, setIntroPlaying] = useState(true);
    const introDone = !introPlaying;

    return (
        <div className="font-sans bg-[#f4faf7] text-[#0b2545] min-h-screen">
            {/* pass introDone flag to navbar so its logo can fade in after intro */}
            <Navbar introDone={introDone} />

            {/* intro overlay (renders while introPlaying === true) */}
            {introPlaying && (
                <Intro
                    logoSrc="/logo/cliberduche_logo.png"
                    title="Cliberduche"
                    onFinish={() => setIntroPlaying(false)}
                />
            )}

            <main className="pt-16 md:pt-20">
                <Routes>
                    {/* Index / Home */}
                    <Route index element={<Home introDone={introDone} />} />
                    <Route path="/" element={<Home introDone={introDone} />} />

                    {/* Dedicated pages */}
                    <Route path="/about" element={<About introDone={introDone} />} />
                    <Route path="/services" element={<Services introDone={introDone} />} />
                    <Route path="/projects" element={<Projects introDone={introDone} />} />
                    <Route path="/contact" element={<Contact introDone={introDone} />} />
                </Routes>
            </main>

            {/* Pass introDone to Footer so animations can wait */}
            <Footer introDone={introDone} />
        </div>
    );
}
