import React from "react";
import PerspectiveCard from "./PerspectiveCard";

export default function MissionVision() {
    return (
        <section id="mission-vision" className="px-10 py-20 bg-[#f4faf7]">
            <h3 className="text-2xl font-bold text-center mb-12">Our Mission & Vision</h3>

            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                {/* MISSION */}
                <PerspectiveCard
                    className="w-full"
                    enableTilt={true}
                    maxRotate={8}
                    defaultRotateY={-6}
                    defaultTranslateZ={8}
                >
                    <div className="bg-white p-8 rounded-2xl shadow">
                        <h4 className="text-xl font-semibold mb-4 text-[#0b2545]">Our Mission</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
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
                    <div className="bg-green-100 p-8 rounded-2xl shadow">
                        <h4 className="text-xl font-semibold mb-4 text-[#0b2545]">Our Vision</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Our vision is to become a trusted leader in the construction industry by shaping modern, durable, and innovative spaces that positively impact communities and future generations.
                        </p>
                    </div>
                </PerspectiveCard>
            </div>
        </section>
    );
}
