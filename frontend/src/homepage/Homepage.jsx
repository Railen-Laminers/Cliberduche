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
            <Hero />
            <MissionVision />
            <About />
            <Services />
            <Contact />
            <Footer />
        </div>
    );
}
