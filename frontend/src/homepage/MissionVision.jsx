import React from "react";
import PerspectiveCard from "./PerspectiveCard";

export default function MissionVision() {
    return (
        <section id="mission-vision" className="px-6 md:px-10 py-16 md:py-20 bg-[#f4faf7]">
            <div className="max-w-6xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#0b2545]">Our Mission & Vision</h3>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    Driving excellence in construction with a commitment to quality, innovation, and community impact.
                </p>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    {/* MISSION */}
                    <PerspectiveCard
                        className="w-full"
                        enableTilt={true}
                        maxRotate={8}
                        defaultRotateY={-6}
                        defaultTranslateZ={8}
                    >
                        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h4 className="text-xl md:text-2xl font-semibold mb-4 text-[#0b2545]">Our Mission</h4>
                            <p className="text-gray-600 leading-relaxed">
                                Our mission is to deliver high-quality, reliable, and sustainable construction solutions that exceed client expectations. We are committed to safety, craftsmanship, and long-term value in every project we build.
                            </p>
                        </div>
                    </PerspectiveCard>

                    {/* VISION */}
                    <PerspectiveCard
                        className="w-full"
                        enableTilt={true}
                        maxRotate={8}
                        defaultRotateY={6}
                        defaultTranslateZ={8}
                    >
                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 md:p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-green-200">
                            <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <h4 className="text-xl md:text-2xl font-semibold mb-4 text-[#0b2545]">Our Vision</h4>
                            <p className="text-gray-600 leading-relaxed">
                                Our vision is to become a trusted leader in the construction industry by shaping modern, durable, and innovative spaces that positively impact communities and future generations.
                            </p>
                        </div>
                    </PerspectiveCard>
                </div>
            </div>
        </section>
    );
}
