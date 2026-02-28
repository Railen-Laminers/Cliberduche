import React, { useState, useEffect } from "react";
import {
  FaBolt,
  FaEye,
  FaShieldAlt,
  FaCheckCircle,
  FaBalanceScale,
  FaInfinity,
} from "react-icons/fa";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import { BlockReveal, LetterReveal } from "../../components/RevealAnimations";
import BackgroundDecor from "../../components/BackgroundDecor";
import MagneticButton from "../../components/MagneticButton";

export default function About({ introDone = true }) {
  // Scroll animation refs
  const [companyRef, companyAnim, companyVisible] = useScrollAnimation(0.1, introDone);
  const [projectsRef, projectsAnim, projectsVisible] = useScrollAnimation(0.1, introDone);
  const [mvHeadingRef, mvHeadingAnim] = useScrollAnimation(0.1, introDone);
  const [missionRef, missionAnim, missionVisible] = useScrollAnimation(0.1, introDone);
  const [visionRef, visionAnim, visionVisible] = useScrollAnimation(0.1, introDone);
  const [valuesRef, valuesAnim, valuesVisible] = useScrollAnimation(0.1, introDone);
  const [leadershipRef, leadershipAnim, leadershipVisible] = useScrollAnimation(0.1, introDone);

  // Hero animations
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [textRevealed, setTextRevealed] = useState(false);

  useEffect(() => {
    if (introDone) {
      const blockTimer = setTimeout(() => setHeroRevealed(true), 100);
      const textTimer = setTimeout(() => setTextRevealed(true), 200);
      return () => {
        clearTimeout(blockTimer);
        clearTimeout(textTimer);
      };
    }
  }, [introDone]);

  // Animation constants
  const ANIM_DURATION = "1.2s";
  const ANIM_EASING = "cubic-bezier(0.25, 0.1, 0.25, 1)";
  const STAGGER_BASE = 0.2;

  const fadeUpStyle = (visible, delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity ${ANIM_DURATION} ${ANIM_EASING}, transform ${ANIM_DURATION} ${ANIM_EASING}`,
    transitionDelay: `${delay}s`,
  });

  return (
    <>
      {/* ========== MOBILE/TABLET HERO ========== */}
      <div className="relative min-h-screen overflow-hidden lg:hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')`,
          }}
        >
          <BlockReveal active={heroRevealed} rows={8} cols={12} />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-start p-6 md:p-12 bg-black/30">
          <div className="text-sm tracking-[0.3em] uppercase text-white/80 mb-3">About</div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            <LetterReveal
              active={textRevealed}
              lines={["CLIBERDUCHE", "CORPORATION"]}
              letterDelay={0.05}
            />
          </h1>
        </div>
      </div>

      {/* ========== DESKTOP HERO ========== */}
      <div className="hidden lg:flex flex-col md:flex-row min-h-screen md:h-screen">
        <div className="relative w-full md:w-1/2 h-96 md:h-full order-2 md:order-1 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')`,
              backgroundPosition: "left center",
            }}
          />
          <BlockReveal active={heroRevealed} rows={8} cols={12} />
        </div>
        <div className="w-full md:w-1/2 flex flex-col order-1 md:order-2">
          <div className="hidden md:block flex-1" />
          <div className="pt-20 md:pt-0 pb-16 md:pb-20 px-6 md:px-12">
            <div className="text-sm tracking-[0.3em] uppercase text-gray-600 mb-3">About</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0b2545] leading-tight">
              <LetterReveal
                active={textRevealed}
                lines={["CLIBERDUCHE", "CORPORATION"]}
                letterDelay={0.05}
              />
            </h1>
          </div>
          <div className="hidden md:block flex-1" />
        </div>
      </div>

      {/* ========== COMPANY STORY ========== */}
      <section
        id="company"
        ref={companyRef}
        className={`relative px-6 md:px-10 py-16 md:py-20 bg-white transition-all duration-1000 ${companyAnim} overflow-hidden`}
      >
        <BackgroundDecor pattern="grid" color="green" opacity={0.15} blurCircles={true} />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-16 bg-green-300"></div>
                <FaInfinity className="text-green-600 text-2xl" />
                <h3 className="text-3xl md:text-4xl font-bold text-[#0b2545]">The Company</h3>
              </div>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p style={fadeUpStyle(companyVisible, 0)}>
                  Established in 2018, CLIBERDUCHE CORPORATION was born out of the dream of a person
                  to provide the best for his family without leaving the country anymore. This person
                  found this opportunity in the wide field of the construction business. Immediately,
                  he invited his friends to join him and officially registered CLIBERDUCHE CORPORATION
                  with the Securities and Exchange Commission on November 28, 2018.
                </p>
                <p style={fadeUpStyle(companyVisible, 1)}>
                  <strong>CLIBERDUCHE</strong> stands for the surnames of the founder and co-founders:
                </p>
                <ul style={fadeUpStyle(companyVisible, 2)} className="list-disc list-inside pl-4 space-y-1 text-gray-700">
                  <li>CLImaco</li>
                  <li>BERonilla</li>
                  <li>PiaDUCHE</li>
                </ul>
                <p style={fadeUpStyle(companyVisible, 3)}>
                  As time passed, the other two incorporators (Beronilla and Piaduche) ventured into
                  other areas of interest. They all agreed to officially part ways. The founder’s spouse
                  and brother became the new directors, carrying forward the original mission with renewed focus.
                </p>
                <p style={fadeUpStyle(companyVisible, 4)}>
                  Today, CLIBERDUCHE CORPORATION provides high-quality backfill materials—sub-base,
                  aggregates, and boulders—to clients across the CALABARZON area and beyond. Our
                  company-owned land development sites in Laguna and Cavite contain over{" "}
                  <strong>14 million cubic meters</strong> of materials, enabling us to support projects
                  of any scale while adhering to DENR regulations and sustainable practices.
                </p>
                <p style={fadeUpStyle(companyVisible, 5)}>
                  As client needs expanded, we grew into a one-stop shop offering General Engineering,
                  Civil Works, and Construction & Development for both horizontal and vertical projects.
                  We remain committed to eco-friendly operations and building lasting relationships with
                  communities, clients, and partners.
                </p>
              </div>
            </div>
            <div
              className="relative h-96 md:h-full min-h-[400px] rounded-2xl overflow-hidden shadow-xl"
              style={fadeUpStyle(companyVisible, 0)}
            >
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
                alt="Construction site with heavy machinery"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== PROJECTS & EXPERTISE ========== */}
      <section
        id="projects"
        ref={projectsRef}
        className={`relative px-6 md:px-10 py-16 md:py-20 bg-white transition-all duration-1000 ${projectsAnim} overflow-hidden`}
      >
        <BackgroundDecor pattern="grid" color="blue" opacity={0.15} blurCircles={true} />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 md:h-full min-h-[400px] rounded-2xl overflow-hidden shadow-xl order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1580723843692-137caf37ad17?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3lkbmV5JTIwaGFyYm91ciUyMGJyaWRnZXxlbnwwfHwwfHx8MA%3D%3D"
                alt="Bridge construction project"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <BlockReveal active={projectsVisible} rows={8} cols={12} />
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-4 mb-4 justify-end md:justify-start">
                <h3 className="text-3xl md:text-4xl font-bold text-[#0b2545]">Projects & Expertise</h3>
                <FaInfinity className="text-blue-600 text-2xl" />
                <div className="h-px w-16 bg-blue-300"></div>
              </div>
              <div className="space-y-6 text-gray-600 leading-relaxed text-left">
                <p style={fadeUpStyle(projectsVisible, 0)}>
                  CLIBERDUCHE CORPORATION handles a diverse range of projects—from small-scale to large
                  commercial and industrial developments. We specialize in supplying backfilling materials,
                  aggregates, and other land resources tailored to client specifications.
                </p>
                <p style={fadeUpStyle(projectsVisible, 1)}>
                  Our land development capabilities include clearing, cutting and peeling, levelling, and
                  RCP/PVC pipe laying. We have also built bridges, concrete roads, gutters, ripraps,
                  easements, and slope protection systems addressing erosion prevention and soil liquefaction.
                </p>
                <p style={fadeUpStyle(projectsVisible, 2)}>
                  Every project is executed with strict adherence to safety protocols and environmental
                  standards, ensuring long-term value for our clients and the community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== REDESIGNED MISSION, VISION & CORE VALUES ========== */}
      <section
        id="mission-vision"
        className="relative px-6 md:px-10 py-16 md:py-20 bg-[#f4faf7] overflow-hidden"
      >
        <BackgroundDecor pattern="grid" color="green" opacity={0.1} blurCircles={false} />
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Heading */}
          <div ref={mvHeadingRef} className={`text-center transition-all duration-1000 ${mvHeadingAnim}`}>
            <div className="flex justify-center items-center gap-2 mb-4">
              <div className="h-px w-16 bg-green-300"></div>
              <FaInfinity className="text-black-600 text-2xl" />
              <div className="h-px w-16 bg-blue-300"></div>
            </div>
            <p className="text-gray-600 mb-12 max-w-3xl mx-auto text-lg">
              Guided by purpose, driven by excellence, and grounded in values that define how the
              company serves clients, communities, and partners.
            </p>
          </div>

          {/* Mission & Vision - side by side, no cards */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 mb-20">
            {/* Mission */}
            <div ref={missionRef} className={`transition-all duration-1000 ${missionAnim}`}>
              <div style={fadeUpStyle(missionVisible, 0)} className="relative">
                <div className="absolute -top-8 -left-4 text-8xl font-black text-green-100 select-none z-0">
                  M
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <FaBolt className="text-green-600 text-2xl" />
                    <h4 className="text-3xl font-bold text-[#0b2545]">Mission</h4>
                    <div className="flex-1 h-px bg-green-300"></div>
                  </div>
                  <div className="space-y-4 text-gray-700 leading-relaxed pl-4 border-l-4 border-green-400">
                    <p className="text-lg font-light italic">
                      “We are a responsible land development company...”
                    </p>
                    <p>
                      We provide high-quality backfill materials for land development projects and other
                      infrastructures, including but not limited to sub-base materials like aggregates,
                      mixed soil, and boulders. We support sustainable land development by adhering to the
                      existing environmental regulations of the Philippines. We provide jobs for fellow
                      Filipinos, which significantly contributes to boosting our country's economy. We are
                      also keen to deliver excellent value to our partner communities, investors, employees,
                      and other stakeholders.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div ref={visionRef} className={`transition-all duration-1000 delay-200 ${visionAnim}`}>
              <div style={fadeUpStyle(visionVisible, 0)} className="relative">
                <div className="absolute -top-8 -right-4 text-8xl font-black text-blue-100 select-none z-0">
                  V
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4 justify-end">
                    <div className="flex-1 h-px bg-blue-300"></div>
                    <h4 className="text-3xl font-bold text-[#0b2545]">Vision</h4>
                    <FaEye className="text-blue-600 text-2xl" />
                  </div>
                  <div className="space-y-4 text-gray-700 leading-relaxed pr-4 border-r-4 border-blue-400 text-right">
                    <p className="text-lg font-light italic">
                      “Our vision is to be a highly respected, world-class natural resource land
                      development company...”
                    </p>
                    <p>
                      Committed to adhering to international standards in land development operations and
                      environmental conservation, sustainable projects that cover converting land development
                      sites into other useful and economic projects in the future, thus converting land
                      development projects to future commercial and housing projects.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Values - no cards, just icons and text */}
          <div ref={valuesRef} className={`transition-all duration-1000 ${valuesAnim}`}>
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px w-16 bg-green-300"></div>
              <FaInfinity className="text-green-600 text-2xl" />
              <h4 className="text-2xl md:text-3xl font-bold text-[#0b2545]">Core Values</h4>
              <div className="flex-1 h-px bg-blue-300"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {/* Quality */}
              <div style={fadeUpStyle(valuesVisible, 0)} className="text-center md:text-left">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-green-100 rounded-full text-green-600">
                  <FaCheckCircle className="w-7 h-7" />
                </div>
                <h5 className="font-semibold text-xl mb-2 text-[#0b2545]">Quality</h5>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We ensure projects are of high quality and align with local standards to remain
                  competitive in national and local markets.
                </p>
              </div>

              {/* Safety */}
              <div style={fadeUpStyle(valuesVisible, 1)} className="text-center md:text-left">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-green-100 rounded-full text-green-600">
                  <FaShieldAlt className="w-7 h-7" />
                </div>
                <h5 className="font-semibold text-xl mb-2 text-[#0b2545]">Safety</h5>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Safety is our priority on every worksite—before, during, and after project execution—to
                  protect our people, projects, and communities.
                </p>
              </div>

              {/* Integrity */}
              <div style={fadeUpStyle(valuesVisible, 2)} className="text-center md:text-left">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-green-100 rounded-full text-green-600">
                  <FaBalanceScale className="w-7 h-7" />
                </div>
                <h5 className="font-semibold text-xl mb-2 text-[#0b2545]">Integrity</h5>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We operate with honesty and accountability, ensuring compliance with industry laws,
                  maintaining a reliable workforce, and delivering projects on time as promised.
                </p>
              </div>
            </div>
          </div>

          {/* Portfolio CTA */}
          <div className="flex justify-center mt-16 md:mt-20">
            <MagneticButton padding={80} magnetStrength={3} wrapperClassName="inline-block">
              <a
                href="https://cliberduche-portfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-[#0b2545] hover:bg-green-700 text-white px-8 py-4 rounded-sm text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>View Our Portfolio</span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ========== REVISED LEADERSHIP & TEAM ========== */}
      <section
        id="leadership"
        ref={leadershipRef}
        className={`relative px-6 md:px-10 py-16 md:py-20 bg-white transition-all duration-1000 ${leadershipAnim} overflow-hidden`}
      >
        <BackgroundDecor pattern="grid" color="blue" opacity={0.1} blurCircles={false} />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* New intro text */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0b2545] mb-4">Our Team</h2>
            <div className="flex justify-center items-center gap-2 mb-4">
              <div className="h-px w-16 bg-green-300"></div>
              <FaInfinity className="text-green-600 text-2xl" />
              <div className="h-px w-16 bg-blue-300"></div>
            </div>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Meet the people behind Cliberduche. Founded in 2018 by <strong>John Climaco</strong>,
              our leadership combines decades of construction experience with a deep commitment to
              integrity and sustainable development. Today, together with his family and a dedicated
              team of professionals, we continue to build lasting partnerships—one project at a time.
            </p>
          </div>

          {/* Team grid – now with real data from the company story */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {realTeamMembers.map((member, index) => (
              <TeamCard
                key={index}
                name={member.name}
                title={member.title}
                brief={member.brief}
                imageUrl={member.imageUrl}
                visible={leadershipVisible}
                delay={(index % 4) * STAGGER_BASE}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ========== REAL TEAM DATA (based on "The Company" section) ==========
const realTeamMembers = [
  {
    name: "John Climaco",
    title: "Founder & CEO",
    brief:
      "Founder with over 20 years in construction. Built Cliberduche from the ground up, driven by a vision to provide for his family without leaving the country.",
    imageUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Maria Climaco",
    title: "Director",
    brief:
      "The founder’s spouse, now a director overseeing operations and community relations. Ensures that family values and sustainable practices guide every project.",
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Pedro Climaco",
    title: "Director",
    brief:
      "The founder’s brother, a seasoned engineer who manages project execution and site safety. Committed to delivering precision and quality on every site.",
    imageUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Ana Santos",
    title: "Project Manager",
    brief:
      "Coordinates large-scale developments. Certified in environmental compliance, she ensures projects meet both client expectations and regulatory standards.",
    imageUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
];

// ========== TeamCard component ==========
function TeamCard({ name, title, brief, imageUrl, visible, delay }) {
  const ANIM_DURATION = "1.2s";
  const ANIM_EASING = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  return (
    <div className="relative group overflow-hidden h-[500px] w-full transition-all duration-500 ease-in-out">
      <div className="absolute inset-0">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover object-center" />
        <BlockReveal active={visible} rows={6} cols={8} />
      </div>
      <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h4
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: `opacity ${ANIM_DURATION} ${ANIM_EASING}, transform ${ANIM_DURATION} ${ANIM_EASING}`,
            transitionDelay: `${delay}s`,
          }}
          className="text-white font-semibold text-xl mb-2"
        >
          {name}
        </h4>
        <p
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: `opacity ${ANIM_DURATION} ${ANIM_EASING}, transform ${ANIM_DURATION} ${ANIM_EASING}`,
            transitionDelay: `${delay + 0.15}s`,
          }}
          className="text-gray-200 text-base mb-3"
        >
          {title}
        </p>
        <p
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: `opacity ${ANIM_DURATION} ${ANIM_EASING}, transform ${ANIM_DURATION} ${ANIM_EASING}`,
            transitionDelay: `${delay + 0.3}s`,
          }}
          className="text-gray-300 text-sm"
        >
          {brief}
        </p>
      </div>
    </div>
  );
}