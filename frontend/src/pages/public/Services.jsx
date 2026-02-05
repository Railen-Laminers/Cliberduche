// Services.jsx
import React from "react";
import PerspectiveCard from "../../components/PerspectiveCard";
import {
    FaTruckLoading,
    FaMountain,
    FaClipboardList,
    FaTools,
    FaProjectDiagram,
} from "react-icons/fa";
import useScrollAnimation from "../../hooks/useScrollAnimation";

export default function Services({ introDone = true }) {
    const [ref, animationClass] = useScrollAnimation(0.1, introDone);

    const services = [
        {
            title: "Backfill & Land Sourcing",
            description:
                "Supply of high-quality backfilling materials including sub-base, aggregates, boulders, and other land resources based on client specifications.",
            icon: <FaTruckLoading className="w-8 h-8" />,
        },
        {
            title: "Land Development",
            description:
                "Comprehensive land development services such as clearing, cutting and peeling, leveling works, and preparation for construction-ready sites.",
            icon: <FaMountain className="w-8 h-8" />,
        },
        {
            title: "Site Management",
            description:
                "Professional on-site supervision ensuring efficient coordination, safety compliance, and smooth execution of construction activities.",
            icon: <FaClipboardList className="w-8 h-8" />,
        },
        {
            title: "Equipment Leasing",
            description:
                "Reliable leasing of construction equipment to support various project requirements, improving efficiency and operational flexibility.",
            icon: <FaTools className="w-8 h-8" />,
        },
        {
            title: "Project Management Consultation",
            description:
                "Expert consultation services providing planning, coordination, and execution support for construction and land development projects.",
            icon: <FaProjectDiagram className="w-8 h-8" />,
        },
    ];

    return (
        <section
            ref={ref}
            id="services"
            className={`px-6 md:px-10 py-16 md:py-20 bg-white rounded-t-[120px] transition-all duration-1000 ${animationClass}`}
        >
            <div className="max-w-6xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-center text-[#0b2545]">
                    Professional Services
                </h3>

                <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                    CLIBERDUCHE CORPORATION offers a wide range of construction and land
                    development services, supporting small to large-scale commercial and
                    industrial projects with reliable expertise and proven capability.
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((item, i) => (
                        <PerspectiveCard
                            key={i}
                            className="w-full"
                            enableTilt
                            maxRotate={10}
                            defaultRotateX={4}
                            defaultRotateY={-4}
                            defaultTranslateZ={6}
                        >
                            <div className="bg-white p-8 rounded-2xl text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full">
                                <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                                    {item.icon}
                                </div>

                                <h4 className="font-bold mb-3 text-lg text-[#0b2545]">
                                    {item.title}
                                </h4>

                                <p className="text-gray-600 leading-relaxed text-sm">
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
