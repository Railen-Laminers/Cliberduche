import React, { useEffect, useState, useRef, forwardRef, useCallback } from "react";
import { LuInfinity } from "react-icons/lu";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import { useNavigate, Link } from "react-router-dom";
import office from "/office.jpg";
import { LetterReveal } from "../../components/RevealAnimations";
import ScrollReveal from "../../components/ScrollReveal";
import BackgroundDecor from "../../components/BackgroundDecor";

// Icons
import {
    FaTruckLoading,
    FaMountain,
    FaClipboardList,
    FaTools,
    FaProjectDiagram,
    FaInfinity,
    FaPhoneAlt,
} from "react-icons/fa";

// ---------- CountUp Component ----------
const CountUp = ({ end, duration = 2000, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startTime;
        let rafId;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));

            if (progress < 1) {
                rafId = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        rafId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(rafId);
    }, [isVisible, end, duration]);

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    );
};

// Floating infinity icon (interactive) – unchanged
const FloatingInfinityIcon = forwardRef(
    ({ className, floatClass, animClass, iconClass }, ref) => {
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
            const dx = centerX - e.clientX;
            const dy = centerY - e.clientY;
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

// Services data (unchanged)
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

// Core service tile – unchanged
function CoreServiceTile({ service }) {
    return (
        <div className="group relative aspect-[4/3] overflow-hidden rounded-lg">
            <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white transform translate-y-0 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg">
                        {React.cloneElement(service.icon, { className: "w-6 h-6" })}
                    </div>
                    <h4 className="text-2xl font-bold">{service.title}</h4>
                </div>
                <div className="overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-500 ease-in-out">
                    <p className="text-sm text-gray-200 leading-relaxed">
                        {service.description}
                    </p>
                    <div className="mt-3 flex items-center text-green-300 text-sm font-medium">
                        <span>Learn more</span>
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Specialized service split layout – unchanged
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

// Main Home component
export default function Home({ introDone = true }) {
    const navigate = useNavigate();

    // Scroll animation refs
    const [buttonsRef, buttonsAnim] = useScrollAnimation(0.1, introDone);
    const [float1Ref, float1Anim] = useScrollAnimation(0.1, introDone);
    const [float2Ref, float2Anim] = useScrollAnimation(0.1, introDone);
    const [introRef, introAnim] = useScrollAnimation(0.1, introDone);
    const [mvHeadingRef, mvHeadingAnim] = useScrollAnimation(0.1, introDone);
    const [coreRef, coreAnim] = useScrollAnimation(0.1, introDone);
    const [specializedRef, specializedAnim] = useScrollAnimation(0.1, introDone);
    const [whyRef, whyAnim] = useScrollAnimation(0.1, introDone);
    const [ctaContentRef, ctaContentAnim] = useScrollAnimation(0.1, introDone);

    // Individual heading refs
    const [whatWeDoHeadingRef, whatWeDoHeadingAnim] = useScrollAnimation(0.1, introDone);
    const [coreHeadingRef, coreHeadingAnim] = useScrollAnimation(0.1, introDone);
    const [specializedHeadingRef, specializedHeadingAnim] = useScrollAnimation(0.1, introDone);
    const [whyHeadingRef, whyHeadingAnim] = useScrollAnimation(0.1, introDone);
    const [ctaHeadingRef, ctaHeadingAnim] = useScrollAnimation(0.1, introDone);

    const [headingRevealed, setHeadingRevealed] = useState(false);

    useEffect(() => {
        if (introDone) {
            const headingTimer = setTimeout(() => setHeadingRevealed(true), 200);
            return () => clearTimeout(headingTimer);
        }
    }, [introDone]);

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
            {/* ========== HERO SECTION ========== */}
            <section
                id="home"
                className="relative text-white px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden transition-all duration-1000 bg-cover bg-center md:bg-fixed flex items-center"
                style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }}
            >
                <img
                    src={office}
                    alt="Office background"
                    className="absolute inset-0 w-full h-full object-cover animate-pan will-change-transform"
                />
                <div className="absolute inset-0 bg-black/30" />
               
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
                            className="w-full sm:w-auto bg-green-400 hover:bg-green-500 text-[#0b2545] px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3 rounded-sm font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300"
                        >
                            Request a Quote
                        </button>
                        <button
                            onClick={() => navigate("/projects")}
                            className="w-full sm:w-auto border-2 border-white text-white hover:text-green-400 hover:border-green-400 px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3 rounded-sm font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white"
                        >
                            View Projects
                        </button>
                    </div>
                </div>
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

            {/* ========== WHAT WE DO ========== */}
            <section
                ref={introRef}
                className={`relative px-6 md:px-16 lg:px-24 py-20 md:py-24 bg-gradient-to-b from-white to-[#f4faf7] transition-all duration-1000 ${introAnim} overflow-hidden`}
            >
                <BackgroundDecor pattern="grid" color="blue" opacity={0.1} blurCircles={false} />
                <div className="max-w-4xl mx-auto text-center relative z-10">
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
                    <h2
                        ref={whatWeDoHeadingRef}
                        className={`text-3xl md:text-4xl font-bold text-[#0b2545] mb-6 transition-all duration-1000 transform ${whatWeDoHeadingAnim}`}
                    >
                        What We Do
                    </h2>
                    <ScrollReveal
                        enableBlur={false}
                        baseOpacity={0.2}
                        baseRotation={5}
                        staggerStep={0.1}
                    >
                        At <span className="text-green-700 font-bold">Cliberduche</span>, we turn vision into reality through a comprehensive range of construction and land development services. Backed by years of experience and an unwavering commitment to excellence, we deliver trust on every project — from material sourcing and site development to expert consultation. Our integrated approach ensures that your project is built on a solid foundation, literally and figuratively.
                    </ScrollReveal>
                </div>
            </section>

            {/* ========== CORE SERVICES ========== */}
            <section
                ref={coreRef}
                className={`relative px-6 md:px-16 lg:px-24 py-24 bg-white transition-all duration-1000 ${coreAnim} overflow-hidden`}
            >
                <BackgroundDecor pattern="dots" color="green" opacity={0.15} blurCircles={true} />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-px w-16 bg-green-300"></div>
                            <FaInfinity className="text-green-600 text-2xl" />
                            <h3
                                ref={coreHeadingRef}
                                className={`text-4xl font-bold text-[#0b2545] transition-all duration-1000 transform ${coreHeadingAnim}`}
                            >
                                Our Core Services
                            </h3>
                        </div>
                        <p className="text-gray-600 text-lg max-w-3xl">
                            The foundation of our work — essential services we execute with precision, reliability, and proven expertise.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {coreServices.map((service, index) => (
                            <CoreServiceTile key={index} service={service} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== SPECIALIZED SERVICES ========== */}
            {specializedServices.length > 0 && (
                <section
                    ref={specializedRef}
                    className={`relative px-6 md:px-16 lg:px-24 py-16 md:py-20 bg-[#f4faf7] transition-all duration-1000 ${specializedAnim} overflow-hidden`}
                >
                    <BackgroundDecor pattern="lines" color="blue" opacity={0.1} blurCircles={true} />
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="mb-12 flex flex-col items-end">
                            <div className="flex items-center gap-4 mb-4">
                                <h3
                                    ref={specializedHeadingRef}
                                    className={`text-3xl md:text-4xl font-bold text-[#0b2545] transition-all duration-1000 transform ${specializedHeadingAnim}`}
                                >
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

            {/* ========== WHY CHOOSE US ========== */}
            <section
                ref={whyRef}
                className={`relative px-6 md:px-16 lg:px-24 py-24 bg-white transition-all duration-1000 ${whyAnim} overflow-hidden`}
            >
                <BackgroundDecor pattern="grid" color="green" opacity={0.1} blurCircles={true} />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="mb-20">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-px w-16 bg-green-300"></div>
                            <FaInfinity className="text-green-600 text-2xl" />
                            <h3
                                ref={whyHeadingRef}
                                className={`text-4xl font-bold text-[#0b2545] transition-all duration-1000 transform ${whyHeadingAnim}`}
                            >
                                Why Choose CLIBERDUCHE
                            </h3>
                        </div>
                        <p className="text-gray-600 text-lg max-w-3xl">
                            We combine expertise, substantial resources, and sustainable practices to deliver long-term value.
                        </p>
                    </div>

                    <div className="space-y-28">
                        {/* Experience */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h4 className="text-7xl font-bold text-green-600 mb-4">
                                    <CountUp end={new Date().getFullYear() - 2018} suffix="+" />
                                </h4>
                                <h5 className="text-2xl font-bold text-[#0b2545] mb-4">
                                    Years of Proven Experience
                                </h5>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Since 2018, we have successfully supported land development
                                    and construction projects across CALABARZON with reliable execution.
                                </p>
                            </div>
                            <div className="h-96 rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    className="w-full h-full object-cover"
                                    alt="Construction site overview"
                                />
                            </div>
                        </div>

                        {/* Material Resources */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1 h-96 rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    className="w-full h-full object-cover"
                                    alt="Excavator moving earth"
                                />
                            </div>
                            <div className="order-1 md:order-2">
                                <h4 className="text-7xl font-bold text-blue-600 mb-4">
                                    <CountUp end={14} suffix="M" />
                                </h4>
                                <h5 className="text-2xl font-bold text-[#0b2545] mb-4">
                                    Cubic Meters of Material
                                </h5>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Company-owned land ensures abundant supply and cost efficiency
                                    for projects of any scale.
                                </p>
                            </div>
                        </div>

                        {/* Eco Compliance */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h4 className="text-7xl font-bold text-green-600 mb-4">
                                    <CountUp end={100} suffix="%" />
                                </h4>
                                <h5 className="text-2xl font-bold text-[#0b2545] mb-4">
                                    Eco-Compliant Operations
                                </h5>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    We strictly adhere to environmental regulations and
                                    sustainable development practices.
                                </p>
                            </div>
                            <div className="h-96 rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    className="w-full h-full object-cover"
                                    alt="Green landscape with trees"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== CALL TO ACTION ========== */}
            <section className="relative px-6 md:px-16 lg:px-24 py-16 md:py-20 text-white overflow-hidden">
                {/* Background image with overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"
                        alt="Modern building"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>
                {/* Background decor – subtle pattern over image */}
                <BackgroundDecor pattern="dots" color="gray" opacity={0.05} blurCircles={false} />
                <div
                    ref={ctaContentRef}
                    className={`relative z-10 max-w-4xl mx-auto text-center transition-all duration-1000 ${ctaContentAnim}`}
                >
                    <h3
                        ref={ctaHeadingRef}
                        className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-1000 transform ${ctaHeadingAnim}`}
                    >
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