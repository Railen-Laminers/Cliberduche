// MissionVision.jsx
import React, { useRef, useEffect, useState } from "react";
import PerspectiveCard from "./PerspectiveCard";
import { FaBolt, FaEye, FaShieldAlt, FaCheckCircle, FaBalanceScale } from "react-icons/fa";
import useScrollAnimation from "./useScrollAnimation";

export default function MissionVision({ introDone = true }) {
    const [headingRef, headingAnim] = useScrollAnimation(0.1, introDone);
    const [missionRef, missionAnim] = useScrollAnimation(0.1, introDone);
    const [visionRef, visionAnim] = useScrollAnimation(0.1, introDone);
    const [valuesRef, valuesAnim] = useScrollAnimation(0.1, introDone);

    const missionCardRef = useRef(null);
    const [visionHeight, setVisionHeight] = useState("auto");

    useEffect(() => {
        if (missionCardRef.current) {
            setVisionHeight(missionCardRef.current.offsetHeight + "px");
        }
    }, []);

    return (
        <section
            id="mission-vision"
            className="px-6 md:px-10 py-16 md:py-20 bg-[#f4faf7]"
        >
            <div className="max-w-6xl mx-auto">
                {/* HEADING */}
                <div
                    ref={headingRef}
                    className={`text-center transition-all duration-1000 ${headingAnim}`}
                >
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[#0b2545]">
                        Our Mission, Vision & Core Values
                    </h3>
                    <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
                        Guided by purpose, driven by excellence, and grounded in values that
                        define how we serve our clients, communities, and partners.
                    </p>
                </div>

                {/* MISSION & VISION */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
                    {/* MISSION */}
                    <div
                        ref={missionRef}
                        className={`transition-all duration-1000 ${missionAnim}`}
                    >
                        <PerspectiveCard
                            className="w-full"
                            enableTilt
                            maxRotate={8}
                            defaultRotateY={-6}
                            defaultTranslateZ={8}
                        >
                            <div
                                ref={missionCardRef}
                                className="bg-white p-8 md:p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                            >
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                                    <FaBolt className="w-6 h-6 text-green-600" />
                                </div>
                                <h4 className="text-xl md:text-2xl font-semibold mb-4 text-[#0b2545]">
                                    Our Mission
                                </h4>
                                <p className="text-gray-600 leading-relaxed">
                                    We are a responsible land development and construction company
                                    committed to delivering high-quality backfilling materials and
                                    engineering solutions for infrastructure and development
                                    projects. We support sustainable land development by strictly
                                    adhering to Philippine environmental regulations, while
                                    creating employment opportunities that contribute to the
                                    country’s economic growth. We strive to deliver lasting value
                                    to our communities, clients, investors, employees, and
                                    stakeholders.
                                </p>
                            </div>
                        </PerspectiveCard>
                    </div>

                    {/* VISION */}
                    <div
                        ref={visionRef}
                        className={`transition-all duration-1000 delay-200 ${visionAnim}`}
                    >
                        <PerspectiveCard
                            className="w-full"
                            enableTilt
                            maxRotate={8}
                            defaultRotateY={6}
                            defaultTranslateZ={8}
                        >
                            <div
                                style={{ height: visionHeight }}
                                className="bg-gradient-to-br from-green-50 to-green-100 p-8 md:p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-green-200"
                            >
                                <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center mb-6">
                                    <FaEye className="w-6 h-6 text-green-700" />
                                </div>
                                <h4 className="text-xl md:text-2xl font-semibold mb-4 text-[#0b2545]">
                                    Our Vision
                                </h4>
                                <p className="text-gray-600 leading-relaxed">
                                    To be a highly respected, world-class land development and
                                    natural resources company, recognized for adhering to
                                    international standards in engineering, environmental
                                    protection, and sustainable development—transforming land
                                    resources into future-ready commercial and housing projects.
                                </p>
                            </div>
                        </PerspectiveCard>
                    </div>
                </div>

                {/* CORE VALUES */}
                <div
                    ref={valuesRef}
                    className={`transition-all duration-1000 ${valuesAnim}`}
                >
                    <h4 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#0b2545]">
                        Our Core Values
                    </h4>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* QUALITY */}
                        <ValueCard
                            icon={<FaCheckCircle />}
                            title="Quality"
                            description="We ensure every project meets high standards of workmanship and complies with local regulations, enabling us to remain competitive in both national and local markets."
                        />

                        {/* SAFETY */}
                        <ValueCard
                            icon={<FaShieldAlt />}
                            title="Safety"
                            description="Safety is our priority on every worksite. We implement strict safety practices before, during, and after project execution to protect our people, our projects, and our communities."
                        />

                        {/* INTEGRITY */}
                        <ValueCard
                            icon={<FaBalanceScale />}
                            title="Integrity"
                            description="We operate with honesty and accountability, ensuring compliance with industry laws, maintaining a reliable workforce, and delivering projects on time and as promised."
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

/* CORE VALUE CARD */
function ValueCard({ icon, title, description }) {
    return (
        <PerspectiveCard
            className="w-full"
            enableTilt
            maxRotate={6}
            defaultRotateY={0}
            defaultTranslateZ={6}
        >
            <div className="bg-white p-8 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                <div className="w-14 h-14 mx-auto mb-5 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                    {React.cloneElement(icon, { className: "w-6 h-6" })}
                </div>
                <h5 className="font-semibold text-lg mb-3 text-[#0b2545]">
                    {title}
                </h5>
                <p className="text-gray-600 text-sm leading-relaxed">
                    {description}
                </p>
            </div>
        </PerspectiveCard>
    );
}
