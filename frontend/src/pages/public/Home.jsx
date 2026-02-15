import React, { useEffect } from "react";
import { LuInfinity } from "react-icons/lu";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import { useNavigate } from "react-router-dom";
import office from "/office.jpg";

export default function Home({ introDone = true }) {
    const navigate = useNavigate();

    const [headingRef, headingAnim] = useScrollAnimation(0.1, introDone);
    const [subheadingRef, subheadingAnim] = useScrollAnimation(0.1, introDone);
    const [buttonsRef, buttonsAnim] = useScrollAnimation(0.1, introDone);
    const [float1Ref, float1Anim] = useScrollAnimation(0.1, introDone);
    const [float2Ref, float2Anim] = useScrollAnimation(0.1, introDone);

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
        <section
            id="home"
            className="relative text-white px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden transition-all duration-1000 bg-cover bg-center md:bg-fixed flex items-center"
            style={{
                backgroundImage: `url(${office})`,
                minHeight: "calc(var(--vh, 1vh) * 100)",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Content */}
            <div className="max-w-6xl w-full mx-auto relative z-10 text-left">

                {/* Heading */}
                <h1
                    ref={headingRef}
                    className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 drop-shadow-lg ${headingAnim}`}
                >
                    Building Excellence, <br/>Delivering Trust
                </h1>

                {/* Subheading */}
                <p
                    ref={subheadingRef}
                    className={`mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 leading-relaxed max-w-3xl ${subheadingAnim}`}
                >
                    <strong>CLIBERDUCHE CORPORATION</strong> delivers reliable backfilling,
                    land development, and construction solutions across CALABARZON and
                    beyond—driven by quality, sustainability, and long-term value.
                </p>

                {/* Buttons */}
                <div
                    ref={buttonsRef}
                    className={`mt-8 flex flex-col sm:flex-row gap-4 ${buttonsAnim}`}
                >
                    <button
                        onClick={() => navigate("/contact")}
                        className="w-full sm:w-auto bg-green-400 hover:bg-green-500 text-[#0b2545] px-6 sm:px-8 py-3 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300"
                    >
                        Request a Quote
                    </button>

                    <button
                        onClick={() => navigate("/projects")}
                        className="w-full sm:w-auto border-2 border-white text-white hover:text-green-400 hover:border-green-400 px-6 sm:px-8 py-3 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white"
                    >
                        View Projects
                    </button>
                </div>
            </div>

            {/* Floating Icons */}
            <div
                ref={float1Ref}
                className={`absolute top-1/4 right-6 md:right-12 hidden lg:block animate-float ${float1Anim}`}
            >
                <LuInfinity className="w-12 h-12 lg:w-16 lg:h-16 text-green-400 opacity-20" />
            </div>

            <div
                ref={float2Ref}
                className={`absolute bottom-1/4 left-6 md:left-12 hidden lg:block animate-float animation-delay-1000 ${float2Anim}`}
            >
                <LuInfinity className="w-10 h-10 lg:w-14 lg:h-14 text-white opacity-10" />
            </div>
        </section>
    );
}
