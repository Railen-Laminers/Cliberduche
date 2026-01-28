import React from "react";
import PerspectiveCard from "./PerspectiveCard";
import { FaCheck } from "react-icons/fa";

import img1 from "/img_1.png";
import img2 from "/img_2.png";
import img3 from "/img_3.png";

import useScrollAnimation from "./useScrollAnimation";

export default function About() {
  const [textRef, textAnimation] = useScrollAnimation();
  const [cardRef, cardAnimation] = useScrollAnimation();

  return (
    <section
      id="about"
      className="grid md:grid-cols-2 gap-12 md:gap-16 px-6 md:px-10 py-16 md:py-20 items-center bg-white"
    >
      {/* TEXT CONTENT */}
      <div
        ref={textRef}
        className={`order-2 md:order-1 transition-all duration-1000 ${textAnimation}`}
      >
        <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#0b2545]">
          About Cliberduche Corporation
        </h3>

        <p className="text-gray-600 leading-relaxed mb-6 text-lg">
          Established in 2018, CLIBERDUCHE CORPORATION was founded from a vision to
          build a stable future while remaining rooted in the Philippines. The
          company was officially registered with the Securities and Exchange
          Commission on November 28, 2018.
        </p>

        <p className="text-gray-600 leading-relaxed mb-6">
          The name <strong>CLIBERDUCHE</strong> was formed from the surnames of the
          founders: Climaco, Beronilla, and Piaduche. As the company evolved, the
          founder’s spouse and brother joined as directors, continuing the
          original mission with renewed focus and commitment.
        </p>

        <p className="text-gray-600 leading-relaxed mb-6">
          We specialize in providing high-quality backfilling materials such as
          sub-base, aggregates, and boulders, serving clients across the
          CALABARZON area and beyond. Our company-owned land development sites in
          Laguna and Cavite contain over <strong>14 million cubic meters</strong>{" "}
          of materials, enabling us to support projects of any scale.
        </p>

        <p className="text-gray-600 leading-relaxed mb-8">
          As client needs expanded, CLIBERDUCHE CORPORATION grew into a one-stop
          shop offering General Engineering, Civil Works, and Construction &
          Development for both horizontal and vertical projects. We remain
          committed to sustainable and eco-friendly practices, strictly adhering
          to DENR regulations and government standards.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <Feature label="Backfilling & Aggregates Supply" />
          <Feature label="Land Development" />
          <Feature label="General Engineering & Civil Works" />
          <Feature label="Trusted & Sustainable Operations" />
        </div>

        <button className="bg-[#0b2545] hover:bg-[#1f7a8c] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#0b2545]">
          Learn More
        </button>
      </div>

      {/* IMAGE SHOWCASE */}
      <div
        ref={cardRef}
        className={`order-1 md:order-2 transition-all duration-1000 delay-200 ${cardAnimation}`}
      >
        <PerspectiveCard
          className="w-full"
          enableTilt
          maxRotate={6}
          defaultRotateY={-3}
          defaultTranslateZ={12}
        >
          <div className="grid grid-cols-2 gap-4">
            {/* Main Image */}
            <div className="col-span-2">
              <img
                src={img1}
                alt="Cliberduche construction overview"
                className="w-full h-56 md:h-64 object-cover rounded-2xl shadow-lg"
              />
            </div>

            {/* Supporting Images */}
            <img
              src={img2}
              alt="Land development operations"
              className="w-full h-40 object-cover rounded-xl shadow-md"
            />
            <img
              src={img3}
              alt="Completed construction project"
              className="w-full h-40 object-cover rounded-xl shadow-md"
            />
          </div>
        </PerspectiveCard>
      </div>
    </section>
  );
}

function Feature({ label }) {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
        <FaCheck className="w-4 h-4 text-green-600" />
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  );
}
