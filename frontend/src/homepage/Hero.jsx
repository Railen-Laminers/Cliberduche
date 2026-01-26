import React from "react";

export default function Hero() {
    return (
        <section className="relative bg-gradient-to-br from-[#0b2545] via-[#1f7a8c] to-[#0b2545] text-white px-6 md:px-10 pt-0 pb-32 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-48 h-48 bg-green-300 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left pt-24 md:pt-28">

                <h1 className="text-4xl md:text-6xl font-bold max-w-2xl leading-tight mb-6 animate-fade-in-up">
                    Reliable Building <br className="hidden md:block" /> And Construction Solutions
                </h1>
                <p className="mt-4 text-lg md:text-xl text-green-100 max-w-lg leading-relaxed animate-fade-in-up animation-delay-200">
                    Building Strong Foundations For Residential And Commercial Projects With Uncompromising Quality And Innovation.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in-up animation-delay-400">
                    <button className="bg-green-400 hover:bg-green-500 text-[#0b2545] px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-300">
                        Request A Quote
                    </button>
                    <button className="border-2 border-white text-white hover:text-green-400 hover:border-green-400 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white">
                        View Our Work
                    </button>

                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-1/4 right-10 hidden lg:block animate-float">
                <div className="w-16 h-16 bg-green-400 rounded-full opacity-20"></div>
            </div>
            <div className="absolute bottom-1/4 left-10 hidden lg:block animate-float animation-delay-1000">
                <div className="w-12 h-12 bg-white rounded-full opacity-10"></div>
            </div>
        </section>
    );
}
