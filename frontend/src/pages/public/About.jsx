// About.jsx
import React, { useRef, useEffect, useState } from "react";
import PerspectiveCard from "../../components/PerspectiveCard";
import { FaCheck, FaBolt, FaEye, FaShieldAlt, FaCheckCircle, FaBalanceScale } from "react-icons/fa";

import img1 from "/about/img_1.png";
import img2 from "/about/img_2.png";
import img3 from "/about/img_3.png";

import useScrollAnimation from "../../hooks/useScrollAnimation";

export default function About({ introDone = true }) {
  const [textRef, textAnimation] = useScrollAnimation(0.1, introDone);
  const [cardRef, cardAnimation] = useScrollAnimation(0.1, introDone);

  // Mission & Vision scroll hooks
  const [mvHeadingRef, mvHeadingAnim] = useScrollAnimation(0.1, introDone);
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
    <>
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
            shop offering General Engineering, Civil Works, and Construction &amp;
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

      {/* MISSION & VISION */}
      <section
        id="mission-vision"
        className="px-6 md:px-10 py-16 md:py-20 bg-[#f4faf7]"
      >
        <div className="max-w-6xl mx-auto">
          {/* HEADING */}
          <div
            ref={mvHeadingRef}
            className={`text-center transition-all duration-1000 ${mvHeadingAnim}`}
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[#0b2545]">
              Mission, Vision & Core Values
            </h3>
            <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
              Guided by purpose, driven by excellence, and grounded in values that
              define how the company serves clients, communities, and partners.
            </p>
          </div>

          {/* MISSION & VISION CARDS */}
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
                    Mission
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    CLIBERDUCHE CORPORATION is a responsible land development and construction company
                    committed to delivering high-quality backfilling materials and
                    engineering solutions for infrastructure and development
                    projects. The company supports sustainable land development by strictly
                    adhering to Philippine environmental regulations, while
                    creating employment opportunities that contribute to the
                    country's economic growth. The company strives to deliver lasting value
                    to communities, clients, investors, employees, and
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
                    Vision
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    CLIBERDUCHE CORPORATION aims to be a highly respected, world-class land development and
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
              Core Values
            </h4>

            <div className="grid md:grid-cols-3 gap-8">
              <ValueCard
                icon={<FaCheckCircle />}
                title="Quality"
                description="We ensure every project meets high standards of workmanship and complies with local regulations, enabling us to remain competitive in both national and local markets."
              />

              <ValueCard
                icon={<FaShieldAlt />}
                title="Safety"
                description="Safety is our priority on every worksite. We implement strict safety practices before, during, and after project execution to protect our people, our projects, and our communities."
              />

              <ValueCard
                icon={<FaBalanceScale />}
                title="Integrity"
                description="We operate with honesty and accountability, ensuring compliance with industry laws, maintaining a reliable workforce, and delivering projects on time and as promised."
              />
            </div>
          </div>
        </div>
      </section>
    </>
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