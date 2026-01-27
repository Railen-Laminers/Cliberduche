import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import MissionVision from "./MissionVision";
import About from "./About";
import Services from "./Services";
import Contact from "./Contact";
import Footer from "./Footer";
import './Homepage.css';

export default function HomePage() {
    return (
        <div className="font-sans bg-[#f4faf7] text-[#0b2545] min-h-screen">
            <Navbar />
            <main className="pt-16 md:pt-20">
                <Hero />
                <About />
                <MissionVision />
                <Services />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}
