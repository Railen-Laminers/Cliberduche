import React, { useEffect, useState, useRef, forwardRef, useCallback } from "react";
import { LuInfinity } from "react-icons/lu";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import { useNavigate, Link } from "react-router-dom";
import office from "/office.jpg";
import { LetterReveal } from "../../components/RevealAnimations";

// ----- Icons and components for services sections -----
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
import PerspectiveCard from "../../components/PerspectiveCard";

// ------------------------------------------------------------
// Smooth mouse‑avoidance icon with rotation – always floating
// ------------------------------------------------------------
const FloatingInfinityIcon = forwardRef(
    ({ className, animClass, floatClass, iconClass }, ref) => {
        const [isHovered, setIsHovered] = useState(false);
        const iconRef = useRef(null);

        const targetRef = useRef({ x: 0, y: 0, rotate: 0 });
        const currentRef = useRef({ x: 0, y: 0, rotate: 0 });
        const rafRef = useRef(null);

        const SMOOTHING = 0.12;

        const animate = useCallback(() => {
            const { x: tx, y: ty, rotate: tr } = targetRef.current;
            let { x, y, rotate } = currentRef.current;

            const newX = x + (tx - x) * SMOOTHING;
            const newY = y + (ty - y) * SMOOTHING;

            let rotDiff = tr - rotate;
            if (rotDiff > 180) rotDiff -= 360;
            if (rotDiff < -180) rotDiff += 360;
            const newRot = rotate + rotDiff * SMOOTHING;

            currentRef.current = { x: newX, y: newY, rotate: newRot };

            if (iconRef.current) {
                iconRef.current.style.transform = `translate(${newX}px, ${newY}px) rotate(${newRot}deg)`;
            }

            if (
                Math.abs(newX - tx) > 0.1 ||
                Math.abs(newY - ty) > 0.1 ||
                Math.abs(newRot - tr) > 0.1
            ) {
                rafRef.current = requestAnimationFrame(animate);
            } else {
                currentRef.current = { x: tx, y: ty, rotate: tr };
                if (iconRef.current) {
                    iconRef.current.style.transform = `translate(${tx}px, ${ty}px) rotate(${tr}deg)`;
                }
                rafRef.current = null;
            }
        }, []);

        const startAnimation = useCallback(() => {
            if (!rafRef.current) {
                rafRef.current = requestAnimationFrame(animate);
            }
        }, [animate]);

        useEffect(() => {
            return () => {
                if (rafRef.current) {
                    cancelAnimationFrame(rafRef.current);
                    rafRef.current = null;
                }
            };
        }, []);

        useEffect(() => {
            if (!isHovered) {
                targetRef.current = { x: 0, y: 0, rotate: 0 };
                startAnimation();
            }
        }, [isHovered, startAnimation]);

        const handleMouseMove = (e) => {
            if (!iconRef.current) return;

            const rect = iconRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const dx = centerX - mouseX;
            const dy = centerY - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 1) {
                targetRef.current = { x: 0, y: 0, rotate: 0 };
            } else {
                const dirX = dx / distance;
                const dirY = dy / distance;

                const maxPush = 20;
                const pushDistance = Math.min(
                    maxPush,
                    maxPush * (1 / (distance * 0.1 + 0.5))
                );
                const newX = dirX * pushDistance;
                const newY = dirY * pushDistance;

                const angle = Math.atan2(dirY, dirX) * (180 / Math.PI);
                targetRef.current = { x: newX, y: newY, rotate: angle };
            }

            startAnimation();
        };

        return (
            <div ref={ref} className={`${className} ${floatClass} ${animClass}`}>
                <div
                    ref={iconRef}
                    className="inline-block will-change-transform"
                    style={{ transform: "translate(0px, 0px) rotate(0deg)" }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onMouseMove={handleMouseMove}
                >
                    <LuInfinity className={iconClass} />
                </div>
            </div>
        );
    }
);

FloatingInfinityIcon.displayName = "FloatingInfinityIcon";

// ------------------------------------------------------------
// Service data and helper components
// ------------------------------------------------------------
const services = [
    {
        title: "Backfill & Land Sourcing",
        description:
            "Supply of high-quality backfilling materials including sub-base, aggregates, boulders, and other land resources based on client specifications.",
        icon: <FaTruckLoading className="w-8 h-8" />,
        type: "core",
        image:
            "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Land Development",
        description:
            "Comprehensive land development services such as clearing, cutting and peeling, leveling works, and preparation for construction-ready sites.",
        icon: <FaMountain className="w-8 h-8" />,
        type: "core",
        image:
            "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Site Management",
        description:
            "Professional on-site supervision ensuring efficient coordination, safety compliance, and smooth execution of construction activities.",
        icon: <FaClipboardList className="w-8 h-8" />,
        type: "core",
        image:
            "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Equipment Leasing",
        description:
            "Reliable leasing of construction equipment to support various project requirements, improving efficiency and operational flexibility.",
        icon: <FaTools className="w-8 h-8" />,
        type: "core",
        image:
            "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Project Management Consultation",
        description:
            "Expert consultation services providing planning, coordination, and execution support for construction and land development projects.",
        icon: <FaProjectDiagram className="w-8 h-8" />,
        type: "specialized",
        image:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
];

const coreServices = services.filter((s) => s.type === "core");
const specializedServices = services.filter((s) => s.type === "specialized");

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

// ------------------------------------------------------------
// Main Home component – fully responsive with services sections
// ------------------------------------------------------------
export default function Home({ introDone = true }) {
    const navigate = useNavigate();

    const [buttonsRef, buttonsAnim] = useScrollAnimation(0.1, introDone);
    const [float1Ref, float1Anim] = useScrollAnimation(0.1, introDone);
    const [float2Ref, float2Anim] = useScrollAnimation(0.1, introDone);

    // Animation refs for new intro and services sections
    const [introRef, introAnim] = useScrollAnimation(0.1, introDone);
    const [mvHeadingRef, mvHeadingAnim] = useScrollAnimation(0.1, introDone); // Added missing ref
    const [coreRef, coreAnim] = useScrollAnimation(0.1, introDone);
    const [specializedRef, specializedAnim] = useScrollAnimation(0.1, introDone);
    const [whyRef, whyAnim] = useScrollAnimation(0.1, introDone);
    const [ctaContentRef, ctaContentAnim] = useScrollAnimation(0.1, introDone);

    // Hero letter reveal states
    const [heroRevealed, setHeroRevealed] = useState(false);
    const [headingRevealed, setHeadingRevealed] = useState(false);

    useEffect(() => {
        if (introDone) {
            setHeroRevealed(true);
            const headingTimer = setTimeout(() => setHeadingRevealed(true), 200);
            return () => clearTimeout(headingTimer);
        }
    }, [introDone]);

    // Set CSS variable for viewport height (fixes mobile issues)
    useEffect(() => {
        const setVh = () => {
            document.documentElement.style.setProperty(
                "--vh",
                `${window.innerHeight * 0.01}px`
            );
        };
        setVh();
        window.addEventListener("resize", setVh);
        return () => window.removeEventListener("resize", setVh);
    }, []);

    return (
        <>
            {/* Hero Section */}
            <section
                id="home"
                className="relative text-white px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden transition-all duration-1000 bg-cover bg-center md:bg-fixed flex items-center"
                style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }}
            >
                {/* Background Image */}
                <img
                    src={office}
                    alt="Office background"
                    className="absolute inset-0 w-full h-full object-cover animate-pan will-change-transform"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Content */}
                <div className="max-w-6xl w-full mx-auto relative z-10 text-left">
                    <h1
                        className="font-bold leading-tight mb-4 sm:mb-6 drop-shadow-lg"
                        style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
                    >
                        <LetterReveal
                            active={headingRevealed}
                            lines={["Building Excellence,", "Delivering Trust"]}
                            letterDelay={0.05}
                        />
                    </h1>

                    <div
                        ref={buttonsRef}
                        className={`mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 ${buttonsAnim}`}
                    >
                        <button
                            onClick={() => navigate("/contact")}
                            className="w-full sm:w-auto bg-green-400 hover:bg-green-500 text-[#0b2545] 
                     px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3 
                     rounded-sm font-semibold text-sm sm:text-base md:text-lg 
                     transition-all duration-300 transform hover:scale-105 
                     hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300"
                        >
                            Request a Quote
                        </button>

                        <button
                            onClick={() => navigate("/projects")}
                            className="w-full sm:w-auto border-2 border-white text-white 
                     hover:text-green-400 hover:border-green-400 
                     px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3 
                     rounded-sm font-semibold text-sm sm:text-base md:text-lg 
                     transition-all duration-300 transform hover:scale-105 
                     focus:outline-none focus:ring-4 focus:ring-white"
                        >
                            View Projects
                        </button>
                    </div>
                </div>

                {/* Floating Icons */}
                <FloatingInfinityIcon
                    ref={float1Ref}
                    className="absolute top-1/4 right-6 md:right-12 hidden lg:block"
                    floatClass="animate-float"
                    animClass={float1Anim}
                    iconClass="w-12 h-12 lg:w-16 lg:h-16 text-green-400 opacity-20"
                />

                <FloatingInfinityIcon
                    ref={float2Ref}
                    className="absolute bottom-1/4 left-6 md:left-12 hidden lg:block animation-delay-1000"
                    floatClass="animate-float"
                    animClass={float2Anim}
                    iconClass="w-10 h-10 lg:w-14 lg:h-14 text-white opacity-10"
                />
            </section>

            {/* Bridging Section: What We Do */}
            <section
                ref={introRef}
                className={`px-6 md:px-16 lg:px-24 py-20 md:py-24 bg-gradient-to-b from-white to-[#f4faf7] transition-all duration-1000 ${introAnim}`}
            >
                <div className="max-w-4xl mx-auto text-center">
                    {/* Decorative icon cluster*/}
                    <div
                        ref={mvHeadingRef}
                        className={`text-center transition-all duration-1000 ${mvHeadingAnim}`}
                    >
                        <div className="flex justify-center items-center gap-2 mb-4">
                            <div className="h-px w-16 bg-green-300"></div>
                            <FaInfinity className="text-black-600 text-2xl" />
                            <div className="h-px w-16 bg-blue-300"></div>
                        </div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0b2545] mb-6">
                        What We Do
                    </h2>
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                        At <span className="font-semibold text-green-700">CLIBERDUCHE</span>, we turn vision into reality through a comprehensive range of construction and land development services. Backed by years of experience and an unwavering commitment to excellence, we deliver trust on every project — from material sourcing and site development to expert consultation. Our integrated approach ensures that your project is built on a solid foundation, literally and figuratively.
                    </p>
                </div>
            </section>

            {/* Core Services (formerly Primary Functions) */}
            <section
                ref={coreRef}
                className={`px-6 md:px-16 lg:px-24 py-16 md:py-20 bg-white transition-all duration-1000 ${coreAnim}`}
            >
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-px w-16 bg-green-300"></div>
                            <FaInfinity className="text-green-600 text-2xl" />
                            <h3 className="text-3xl md:text-4xl font-bold text-[#0b2545]">
                                Our Core Services
                            </h3>
                        </div>
                        <p className="text-gray-600 max-w-3xl text-lg text-left">
                            The foundation of our work — essential services we execute with precision, reliability, and proven expertise.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {coreServices.map((service, idx) => (
                            <ServiceTile key={idx} service={service} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Specialized Services (formerly Secondary Functions) */}
            {specializedServices.length > 0 && (
                <section
                    ref={specializedRef}
                    className={`px-6 md:px-16 lg:px-24 py-16 md:py-20 bg-[#f4faf7] transition-all duration-1000 ${specializedAnim}`}
                >
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-12 flex flex-col items-end">
                            <div className="flex items-center gap-4 mb-4">
                                <h3 className="text-3xl md:text-4xl font-bold text-[#0b2545]">
                                    Specialized Services
                                </h3>
                                <FaInfinity className="text-blue-600 text-2xl" />
                                <div className="h-px w-16 bg-blue-300"></div>
                            </div>
                            <p className="text-gray-600 max-w-3xl text-lg text-right">
                                Targeted expertise that adds value and ensures your project runs smoothly from start to finish.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            {specializedServices.map((service, idx) => (
                                <SplitService key={idx} service={service} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Why Choose Us */}
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
                            We combine local expertise, substantial resources, and a commitment to sustainable practices.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard
                            icon={<FaRegClock />}
                            number={`${new Date().getFullYear() - 2018}`}
                            label="Years of Experience"
                            description="Serving the CALABARZON region since 2018"
                        />
                        <StatCard
                            icon={<FaUsers />}
                            number="?"
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

            {/* Call to Action */}
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
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-sm text-lg font-semibold transition-colors duration-300"
                    >
                        <FaPhoneAlt className="w-5 h-5" />
                        Contact Us Today
                    </Link>
                </div>
            </section>
        </>
    );
}