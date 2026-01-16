// Hero.js
import React from "react";

export default function Hero() {
    return (
        <section className="relative bg-gradient-to-r from-[#0b2545] to-[#1f7a8c] text-white px-10 py-32 rounded-b-[120px] overflow-visible">
            <div className="max-w-6xl mx-auto relative z-10">
                <h2 className="text-4xl font-bold max-w-xl leading-tight">
                    Reliable Building <br /> And Construction Solutions
                </h2>
                <p className="mt-4 text-green-200 max-w-md">
                    Building Strong Foundations For Residential And Commercial Projects.
                </p>
                <button className="mt-6 bg-green-400 text-[#0b2545] px-6 py-2 rounded-full font-semibold">
                    Request A Quote
                </button>
            </div>
        </section>
    );
}
