// Services.js
import React from "react";
import PerspectiveCard from "./PerspectiveCard";

export default function Services() {
    const services = [
        { title: "Residential Construction" },
        { title: "Commercial Buildings" },
        { title: "Renovation And Remodeling" },
    ];

    return (
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
                            <p className="text-xs text-gray-600">
                                High-Quality Construction Solutions Designed To Last.
                            </p>
                        </div>
                    </PerspectiveCard>
                ))}
            </div>
        </section>
    );
}
