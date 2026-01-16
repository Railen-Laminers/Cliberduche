import React from "react";
import Navbar from "./Navbar";
import MissionVision from "./MissionVision";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import PerspectiveCard from "./PerspectiveCard";
import './Homepage.css'

export default function HomePage() {
    const services = [
        { title: "Residential Construction" },
        { title: "Commercial Buildings" },
        { title: "Renovation And Remodeling" },
    ];

    return (
        <div className="font-sans bg-[#f4faf7] text-[#0b2545] min-h-screen">
            {/* NAVBAR */}
            <Navbar />

            {/* HERO (kept inside homepage as requested) */}
            <section className="relative bg-gradient-to-r from-[#0b2545] to-[#1f7a8c] text-white px-10 py-32 rounded-b-[120px] overflow-visible">
                <div className="max-w-6xl mx-auto relative z-10">
                    <h2 className="text-4xl font-bold max-w-xl leading-tight">
                        Reliable Building <br /> And Construction Solutions
                    </h2>
                    <p className="mt-4 text-green-200 max-w-md">
                        Building Strong Foundations For Residential And Commercial Projects.
                    </p>
                    <button className="mt-6 bg-green-400 text-[#0b2545] px-6 py-2 rounded-full font-semibold">
                        Request A Quote
                    </button>
                </div>
            </section>

            {/* MISSION & VISION */}
            <MissionVision />

            {/* ABOUT */}
            <About />

            {/* SERVICES */}
            <section id="services" className="px-10 py-20 bg-white rounded-t-[120px]">
                <h3 className="text-2xl font-bold mb-10">Our Building Services</h3>
                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((item, i) => (
                        <PerspectiveCard
                            key={i}
                            className="w-full"
                            enableTilt={true}
                            maxRotate={10}
                            defaultRotateX={4}
                            defaultRotateY={-4}
                            defaultTranslateZ={6}
                        >
                            <div className="bg-green-100 p-6 rounded-2xl text-center shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                <div className="h-12 w-12 mx-auto mb-4 bg-green-400 rounded-lg" />
                                <h4 className="font-semibold mb-2">{item.title}</h4>
                                <p className="text-xs text-gray-600">High-Quality Construction Solutions Designed To Last.</p>
                            </div>
                        </PerspectiveCard>
                    ))}
                </div>
            </section>

            {/* CONTACT */}
            <Contact />

            {/* FOOTER */}
            <Footer />
        </div>
    );
}
