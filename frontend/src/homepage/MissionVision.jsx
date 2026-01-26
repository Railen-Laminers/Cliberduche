import React from "react";
import PerspectiveCard from "./PerspectiveCard";
import { FaBolt, FaEye } from "react-icons/fa";
import useScrollAnimation from "./useScrollAnimation";

export default function MissionVision() {
    const [ref, animationClass] = useScrollAnimation();

    return (
        <section ref={ref} id="mission-vision" className={`px-6 md:px-10 py-16 md:py-20 bg-[#f4faf7] transition-all duration-1000 ${animationClass}`}>
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
                                <FaBolt className="w-6 h-6 text-green-600" />
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
                                <FaEye className="w-6 h-6 text-green-700" />
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
