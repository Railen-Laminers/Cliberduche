// Services.js
import React from "react";
import PerspectiveCard from "./PerspectiveCard";
import { FaHome, FaBuilding, FaTools } from "react-icons/fa";
import useScrollAnimation from "./useScrollAnimation";

export default function Services() {
    const [ref, animationClass] = useScrollAnimation();

    const services = [
        {
            title: "Residential Construction",
            description: "Custom homes and renovations built to your specifications with premium materials and expert craftsmanship.",
            icon: <FaHome className="w-8 h-8" />
        },
        {
            title: "Commercial Buildings",
            description: "Office spaces, retail centers, and industrial facilities designed for functionality and modern aesthetics.",
            icon: <FaBuilding className="w-8 h-8" />
        },
        {
            title: "Renovation And Remodeling",
            description: "Transform existing spaces with our comprehensive renovation services, from kitchens to entire buildings.",
            icon: <FaTools className="w-8 h-8" />
        },
    ];

    return (
        <section ref={ref} id="services" className={`px-6 md:px-10 py-16 md:py-20 bg-gray-50 rounded-t-[120px] transition-all duration-1000 ${animationClass}`}>
            <div className="max-w-6xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-center text-[#0b2545]">Our Building Services</h3>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    Comprehensive construction solutions tailored to meet your unique project requirements with excellence and precision.
                </p>
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
                            <div className="bg-white p-8 rounded-2xl text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                                <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                                    {item.icon}
                                </div>
                                <h4 className="font-bold mb-3 text-lg text-[#0b2545]">{item.title}</h4>
                                <p className="text-gray-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </PerspectiveCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
