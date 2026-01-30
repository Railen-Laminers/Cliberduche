import React from "react";
import { LuInfinity } from "react-icons/lu";
import useScrollAnimation from "./useScrollAnimation";

export default function Hero({ introDone = true }) {
    const [headingRef, headingAnim] = useScrollAnimation(0.1, introDone);
    const [subheadingRef, subheadingAnim] = useScrollAnimation(0.1, introDone);
    const [buttonsRef, buttonsAnim] = useScrollAnimation(0.1, introDone);
    const [float1Ref, float1Anim] = useScrollAnimation(0.1, introDone);
    const [float2Ref, float2Anim] = useScrollAnimation(0.1, introDone);

    return (
        <section 
        id="home"
        className="relative bg-gradient-to-br from-[#0b2545] via-[#1f7a8c] to-[#0b2545] text-white px-6 md:px-10 pt-0 pb-32 overflow-hidden transition-all duration-1000">
            <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left pt-24 md:pt-28">
                <h1
                    ref={headingRef}
                    className={`text-4xl md:text-6xl font-bold max-w-3xl leading-tight mb-6 ${headingAnim}`}
                >
                    Building Excellence, Delivering Trust
                </h1>

                <p
                    ref={subheadingRef}
                    className={`mt-4 text-lg md:text-xl text-green-100 max-w-2xl leading-relaxed ${subheadingAnim}`}
                >
                    <strong>CLIBERDUCHE CORPORATION</strong> delivers reliable backfilling,
                    land development, and construction solutions across CALABARZON and
                    beyond—driven by quality, sustainability, and long-term value.
                </p>

                <div
                    ref={buttonsRef}
                    className={`mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start ${buttonsAnim}`}
                >
                    <button className="bg-green-400 hover:bg-green-500 text-[#0b2545] px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-300">
                        Request a Quote
                    </button>
                    <button className="border-2 border-white text-white hover:text-green-400 hover:border-green-400 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white">
                        View Our Projects
                    </button>
                </div>
            </div>

            {/* Floating Infinity Elements */}
            <div
                ref={float1Ref}
                className={`absolute top-1/4 right-10 hidden lg:block animate-float ${float1Anim}`}
            >
                <LuInfinity className="w-16 h-16 text-green-400 opacity-20" />
            </div>

            <div
                ref={float2Ref}
                className={`absolute bottom-1/4 left-10 hidden lg:block animate-float animation-delay-1000 ${float2Anim}`}
            >
                <LuInfinity className="w-12 h-12 text-white opacity-10" />
            </div>
        </section>
    );
}
