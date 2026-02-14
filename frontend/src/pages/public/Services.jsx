import React from "react";
import {
    FaTruckLoading,
    FaMountain,
    FaClipboardList,
    FaTools,
    FaProjectDiagram,
    FaInfinity,
    FaPhoneAlt,
    FaRegClock,
    FaUsers,
    FaLeaf,
} from "react-icons/fa";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import PerspectiveCard from "../../components/PerspectiveCard"; // Import PerspectiveCard

export default function Services({ introDone = true }) {
    const [heroRef, heroAnim] = useScrollAnimation(0.1, introDone);
    const [primaryRef, primaryAnim] = useScrollAnimation(0.1, introDone);
    const [secondaryRef, secondaryAnim] = useScrollAnimation(0.1, introDone);
    const [whyRef, whyAnim] = useScrollAnimation(0.1, introDone);
    const [ctaContentRef, ctaContentAnim] = useScrollAnimation(0.1, introDone);

    const services = [
        {
            title: "Backfill & Land Sourcing",
            description:
                "Supply of high-quality backfilling materials including sub-base, aggregates, boulders, and other land resources based on client specifications.",
            icon: <FaTruckLoading className="w-8 h-8" />,
            type: "primary",
            image:
                "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        },
        {
            title: "Land Development",
            description:
                "Comprehensive land development services such as clearing, cutting and peeling, leveling works, and preparation for construction-ready sites.",
            icon: <FaMountain className="w-8 h-8" />,
            type: "primary",
            image:
                "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        },
        {
            title: "Site Management",
            description:
                "Professional on-site supervision ensuring efficient coordination, safety compliance, and smooth execution of construction activities.",
            icon: <FaClipboardList className="w-8 h-8" />,
            type: "primary",
            image:
                "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        },
        {
            title: "Equipment Leasing",
            description:
                "Reliable leasing of construction equipment to support various project requirements, improving efficiency and operational flexibility.",
            icon: <FaTools className="w-8 h-8" />,
            type: "primary",
            image:
                "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        },
        {
            title: "Project Management Consultation",
            description:
                "Expert consultation services providing planning, coordination, and execution support for construction and land development projects.",
            icon: <FaProjectDiagram className="w-8 h-8" />,
            type: "secondary",
            image:
                "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        },
    ];

    const primaryServices = services.filter((s) => s.type === "primary");
    const secondaryServices = services.filter((s) => s.type === "secondary");

    return (
        <>
            {/* ========== HERO – MOBILE: TEXT ABOVE IMAGE (PARALLAX) | DESKTOP: SPLIT SCREEN ========== */}
            <div className="flex flex-col md:flex-row min-h-screen md:h-screen">
                <div
                    className="w-full md:w-1/2 h-96 md:h-full bg-cover bg-center bg-fixed order-2 md:order-1"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80')`,
                        backgroundPosition: 'left center',
                    }}
                />
                <div className="w-full md:w-1/2 flex flex-col order-1 md:order-2">
                    <div className="hidden md:block flex-1" />
                    <div
                        ref={heroRef}
                        className={`pt-20 md:pt-0 pb-16 md:pb-20 px-6 md:px-12 ${heroAnim}`}
                    >
                        <div className="text-sm tracking-[0.3em] uppercase text-gray-600 mb-3">
                            Services
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0b2545] leading-tight">
                            Comprehensive Construction
                            <br className="hidden md:block" />
                            & Land Development
                        </h1>
                    </div>
                    <div className="hidden md:block flex-1" />
                </div>
            </div>

            {/* ========== PRIMARY SERVICES – LEFT ALIGNED ========== */}
            <section
                ref={primaryRef}
                className={`px-6 md:px-16 lg:px-24 py-16 md:py-20 bg-white transition-all duration-1000 ${primaryAnim}`}
            >
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-px w-16 bg-green-300"></div>
                            <FaInfinity className="text-green-600 text-2xl" />
                            <h3 className="text-3xl md:text-4xl font-bold text-[#0b2545]">
                                Primary Functions
                            </h3>
                        </div>
                        <p className="text-gray-600 max-w-3xl text-lg text-left">
                            Core services that form the backbone of our operations – delivered
                            with precision and proven expertise.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {primaryServices.map((service, idx) => (
                            <ServiceTile key={idx} service={service} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== SECONDARY SERVICES – RIGHT ALIGNED ========== */}
            {secondaryServices.length > 0 && (
                <section
                    ref={secondaryRef}
                    className={`px-6 md:px-16 lg:px-24 py-16 md:py-20 bg-[#f4faf7] transition-all duration-1000 ${secondaryAnim}`}
                >
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-12 flex flex-col items-end">
                            <div className="flex items-center gap-4 mb-4">
                                <h3 className="text-3xl md:text-4xl font-bold text-[#0b2545]">
                                    Secondary Functions
                                </h3>
                                <FaInfinity className="text-blue-600 text-2xl" />
                                <div className="h-px w-16 bg-blue-300"></div>
                            </div>
                            <p className="text-gray-600 max-w-3xl text-lg text-right">
                                Specialised support services that add value and ensure your
                                project runs smoothly from start to finish.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            {secondaryServices.map((service, idx) => (
                                <SplitService key={idx} service={service} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ========== WHY CHOOSE US – LEFT ALIGNED ========== */}
            <section
                ref={whyRef}
                className={`px-6 md:px-16 lg:px-24 py-16 md:py-20 bg-white transition-all duration-1000 ${whyAnim}`}
            >
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-px w-16 bg-green-300"></div>
                            <FaInfinity className="text-green-600 text-2xl" />
                            <h3 className="text-3xl md:text-4xl font-bold text-[#0b2545]">
                                Why Choose CLIBERDUCHE
                            </h3>
                        </div>
                        <p className="text-gray-600 max-w-3xl text-lg text-left">
                            We combine local expertise, substantial resources, and a commitment
                            to sustainable practices to deliver exceptional results.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard
                            icon={<FaRegClock />}
                            number="? "
                            label="Years of Experience"
                            description="Serving the CALABARZON region since 2018"
                        />
                        <StatCard
                            icon={<FaUsers />}
                            number="? "
                            label="Skilled Team Members"
                            description="Dedicated professionals ensuring quality and safety"
                        />
                        <StatCard
                            icon={<FaTruckLoading />}
                            number="14M"
                            label="Cubic Meters of Material"
                            description="Company‑owned land with abundant resources"
                        />
                        <StatCard
                            icon={<FaLeaf />}
                            number="100%"
                            label="Eco‑Compliant"
                            description="Adhering to DENR regulations & sustainable practices"
                        />
                    </div>
                </div>
            </section>

            {/* ========== CALL TO ACTION – CENTERED ========== */}
            <section className="px-6 md:px-16 lg:px-24 py-16 md:py-20 bg-[#0b2545] text-white">
                <div
                    ref={ctaContentRef}
                    className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${ctaContentAnim}`}
                >
                    <h3 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Start Your Project?
                    </h3>
                    <p className="text-xl text-gray-200 mb-8">
                        Let’s discuss how our services can bring your vision to life.
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-300"
                    >
                        <FaPhoneAlt className="w-5 h-5" />
                        Contact Us Today
                    </a>
                </div>
            </section>
        </>
    );
}

// Image tile for primary services  
function ServiceTile({ service }) {
    return (
        <div className="relative group h-80 overflow-hidden rounded-2xl">
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${service.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-600/90 rounded-lg flex items-center justify-center backdrop-blur-sm">
                        {service.icon}
                    </div>
                    <h4 className="text-xl font-bold">{service.title}</h4>
                </div>
                <p className="text-sm text-gray-200 leading-relaxed">
                    {service.description}
                </p>
            </div>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-400 rounded-2xl transition-colors duration-300 pointer-events-none" />
        </div>
    );
}

// Split layout for secondary service  
function SplitService({ service }) {
    return (
        <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 h-64 md:h-auto">
                <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                    {service.icon}
                </div>
                <h4 className="text-2xl font-bold text-[#0b2545] mb-3">
                    {service.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
        </div>
    );
}

// Updated Stat Card
function StatCard({ icon, number, label, description }) {
    return (
        <PerspectiveCard
            className="w-full group"
            enableTilt
            maxRotate={6}
            defaultRotateY={0}
            defaultTranslateZ={6}
        >
            <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 h-[280px]">
                <div className="relative z-10 flex flex-col items-center text-center p-6 h-full">
                    <div className="w-14 h-14 mb-4 bg-green-100 rounded-xl flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                        {React.cloneElement(icon, { className: "w-6 h-6" })}
                    </div>
                    <div className="text-3xl font-bold text-[#0b2545] mb-1 group-hover:text-green-700 transition-colors">
                        {number}
                    </div>
                    <div className="font-semibold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                        {label}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
        </PerspectiveCard>
    );
}
