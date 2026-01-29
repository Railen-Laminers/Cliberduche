import React, { useState } from "react";
import Navbar from "./Navbar";
import Intro from "./Intro";
import Hero from "./Hero";
import MissionVision from "./MissionVision";
import About from "./About";
import Services from "./Services";
import Contact from "./Contact";
import Footer from "./Footer";
import './Homepage.css';

export default function HomePage() {
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
                {/* pass introDone to any section using scroll animations */}
                <Hero introDone={introDone} />
                <About introDone={introDone} />
                <MissionVision introDone={introDone} />
                <Services introDone={introDone} />
                <Contact introDone={introDone} />
            </main>

            {/* Pass introDone to Footer so scroll animations wait */}
            <Footer introDone={introDone} />
        </div>
    );
}
