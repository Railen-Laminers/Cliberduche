import React, { useState } from "react";
import PerspectiveCard from "../../components/PerspectiveCard";
import {
  FaBolt,
  FaEye,
  FaShieldAlt,
  FaCheckCircle,
  FaBalanceScale,
  FaInfinity,
} from "react-icons/fa";
import useScrollAnimation from "../../hooks/useScrollAnimation";

export default function About({ introDone = true }) {
  // Scroll animations for each section
  const [heroRef, heroAnim] = useScrollAnimation(0.1, introDone);
  const [companyRef, companyAnim] = useScrollAnimation(0.1, introDone);
  const [projectsRef, projectsAnim] = useScrollAnimation(0.1, introDone);
  const [mvHeadingRef, mvHeadingAnim] = useScrollAnimation(0.1, introDone);
  const [missionRef, missionAnim] = useScrollAnimation(0.1, introDone);
  const [visionRef, visionAnim] = useScrollAnimation(0.1, introDone);
  const [valuesRef, valuesAnim] = useScrollAnimation(0.1, introDone);
  const [leadershipRef, leadershipAnim] = useScrollAnimation(0.1, introDone);

  // State for team card hover effect (desktop only)
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <>
      {/* ========== HERO – MOBILE: TEXT ABOVE IMAGE (PARALLAX) | DESKTOP: SPLIT SCREEN ========== */}
      <div className="flex flex-col md:flex-row min-h-screen md:h-screen">
        {/* Image – on mobile: below text (order-2), on desktop: left side (order-1) */}
        <div
          className="w-full md:w-1/2 h-96 md:h-full bg-cover bg-center bg-fixed order-2 md:order-1"
          style={{
            backgroundImage: `url('https://plus.unsplash.com/premium_photo-1661340695541-ee1ca7efedd0?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnVpbGRpbmd8ZW58MHx8MHx8fDA%3D')`,
            backgroundPosition: 'left center',
          }}
        />

        {/* Text content – on mobile: above image (order-1), on desktop: right side (order-2) */}
        <div className="w-full md:w-1/2 flex flex-col order-1 md:order-2">
          {/* Top spacer – only on desktop */}
          <div className="hidden md:block flex-1" />

          <div
            ref={heroRef}
            className={`pt-20 md:pt-0 pb-16 md:pb-20 px-6 md:px-12 ${heroAnim}`}
          >
            <div className="text-sm tracking-[0.3em] uppercase text-gray-600 mb-3">
              About
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0b2545] leading-tight">
              CLIBERDUCHE<br />CORPORATION
            </h1>
          </div>

          {/* Bottom spacer – only on desktop */}
          <div className="hidden md:block flex-1" />
        </div>
      </div>

      {/* ========== COMPANY STORY (left-aligned – primary pattern) ========== */}
      <section
        id="company"
        ref={companyRef}
        className={`px-6 md:px-10 py-16 md:py-20 bg-white transition-all duration-1000 ${companyAnim}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Text Column */}
            <div>
              {/* Primary pattern: line + icon + heading (green) */}
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-16 bg-green-300"></div>
                <FaInfinity className="text-green-600 text-2xl" />
                <h3 className="text-3xl md:text-4xl font-bold text-[#0b2545]">
                  The Company
                </h3>
              </div>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Established in 2018, CLIBERDUCHE CORPORATION was born out of the dream of a person to provide the best for his family without leaving the country anymore. This person found this opportunity in the wide field of the construction business. Immediately, he invited his friends to join him and officially registered CLIBERDUCHE CORPORATION with the Securities and Exchange Commission on November 28, 2018.
                </p>
                <p>
                  <strong>CLIBERDUCHE</strong> stands for the surnames of the founder and co-founders:
                </p>
                <ul className="list-disc list-inside pl-4 space-y-1 text-gray-700">
                  <li>CLImaco</li>
                  <li>BERonilla</li>
                  <li>PiaDUCHE</li>
                </ul>
                <p>
                  As time passed, the other two incorporators (Beronilla and Piaduche) ventured into other areas of interest. They all agreed to officially part ways. The founder’s spouse and brother became the new directors, carrying forward the original mission with renewed focus.
                </p>
                <p>
                  Today, CLIBERDUCHE CORPORATION provides high-quality backfill materials—sub-base, aggregates, and boulders—to clients across the CALABARZON area and beyond. Our company-owned land development sites in Laguna and Cavite contain over <strong>14 million cubic meters</strong> of materials, enabling us to support projects of any scale while adhering to DENR regulations and sustainable practices.
                </p>
                <p>
                  As client needs expanded, we grew into a one-stop shop offering General Engineering, Civil Works, and Construction & Development for both horizontal and vertical projects. We remain committed to eco-friendly operations and building lasting relationships with communities, clients, and partners.
                </p>
              </div>
            </div>
            {/* Image Column   */}
            <div className="relative h-96 md:h-full min-h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
                alt="Construction site with heavy machinery"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== PROJECTS & EXPERTISE – NOW RIGHT-ALIGNED (SECONDARY PATTERN) ========== */}
      <section
        id="projects"
        ref={projectsRef}
        className={`px-6 md:px-10 py-16 md:py-20 bg-white transition-all duration-1000 ${projectsAnim}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Column */}
            <div className="relative h-96 md:h-full min-h-[400px] rounded-2xl overflow-hidden shadow-xl order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1580723843692-137caf37ad17?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3lkbmV5JTIwaGFyYm91ciUyMGJyaWRnZXxlbnwwfHwwfHx8MA%3D%3D"
                alt="Bridge construction project"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            {/* Text Column */}
            <div className="order-1 md:order-2">
              {/* Secondary pattern: heading + icon + line (blue) */}
              <div className="flex items-center gap-4 mb-4 justify-end md:justify-start">
                <h3 className="text-3xl md:text-4xl font-bold text-[#0b2545]">
                  Projects & Expertise
                </h3>
                <FaInfinity className="text-blue-600 text-2xl" />
                <div className="h-px w-16 bg-blue-300"></div>
              </div>
              <div className="space-y-6 text-gray-600 leading-relaxed text-left">
                <p>
                  CLIBERDUCHE CORPORATION handles a diverse range of projects—from small-scale to large commercial and industrial developments. We specialize in supplying backfilling materials, aggregates, and other land resources tailored to client specifications.
                </p>
                <p>
                  Our land development capabilities include clearing, cutting and peeling, levelling, and RCP/PVC pipe laying. We have also built bridges, concrete roads, gutters, ripraps, easements, and slope protection systems addressing erosion prevention and soil liquefaction.
                </p>
                <p>
                  Every project is executed with strict adherence to safety protocols and environmental standards, ensuring long-term value for our clients and the community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== MISSION, VISION & CORE VALUES ========== */}
      <section
        id="mission-vision"
        className="px-6 md:px-10 py-16 md:py-20 bg-[#f4faf7] relative overflow-hidden"
      >
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-green-200 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-blue-200 blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* HEADING with icon cluster   */}
          <div
            ref={mvHeadingRef}
            className={`text-center transition-all duration-1000 ${mvHeadingAnim}`}
          >
            <div className="flex justify-center items-center gap-2 mb-4">
              <div className="h-px w-12 bg-green-300"></div>
              <FaInfinity className="text-black-600 text-2xl" />
              <div className="h-px w-16 bg-blue-300"></div>
            </div>
            <p className="text-gray-600 mb-12 max-w-3xl mx-auto text-lg">
              Guided by purpose, driven by excellence, and grounded in values that
              define how the company serves clients, communities, and partners.
            </p>
          </div>

          {/* MISSION & VISION CARDS   */}
          <div className="grid md:grid-cols-2 gap-6 mb-16 items-stretch">
            {/* MISSION CARD */}
            <div
              ref={missionRef}
              className={`transition-all duration-1000 ${missionAnim}`}
            >
              <PerspectiveCard
                className="w-full h-full"
                enableTilt
                maxRotate={8}
                defaultRotateY={-4}
                defaultTranslateZ={8}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-xl h-full min-h-[520px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0b2545] to-green-800" />
                  <div className="relative p-8 md:p-10 text-white flex flex-col h-full">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-6">
                      <FaBolt className="w-6 h-6 text-green-300" />
                    </div>
                    <h4 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                      Mission
                    </h4>
                    <div className="text-white/90 leading-relaxed space-y-4">
                      <p className="text-lg font-light italic">
                        “We are a responsible land development company...”
                      </p>
                      <p className="text-white/80">
                        We provide high-quality backfill materials for land
                        development projects and other infrastructures, including
                        but not limited to sub-base materials like aggregates,
                        mixed soil, and boulders. We support sustainable land
                        development by adhering to the existing environmental
                        regulations of the Philippines. We provide jobs for fellow
                        Filipinos, which significantly contributes to boosting our
                        country's economy. We are also keen to deliver excellent
                        value to our partner communities, investors, employees,
                        and other stakeholders.
                      </p>
                    </div>
                  </div>
                </div>
              </PerspectiveCard>
            </div>

            {/* VISION CARD */}
            <div
              ref={visionRef}
              className={`transition-all duration-1000 delay-200 ${visionAnim}`}
            >
              <PerspectiveCard
                className="w-full h-full"
                enableTilt
                maxRotate={8}
                defaultRotateY={4}
                defaultTranslateZ={8}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-xl h-full min-h-[520px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-800 to-[#0b2545]" />
                  <div className="relative p-8 md:p-10 text-white flex flex-col h-full">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-6">
                      <FaEye className="w-6 h-6 text-green-300" />
                    </div>
                    <h4 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                      Vision
                    </h4>
                    <div className="text-white/90 leading-relaxed space-y-4">
                      <p className="text-lg font-light italic">
                        “Our vision is to be a highly respected, world-class
                        natural resource land development company...”
                      </p>
                      <p className="text-white/80">
                        Committed to adhering to international standards in land
                        development operations and environmental conservation,
                        sustainable projects that cover converting land development
                        sites into other useful and economic projects in the future,
                        thus converting land development projects to future commercial
                        and housing projects.
                      </p>
                    </div>
                  </div>
                </div>
              </PerspectiveCard>
            </div>
          </div>

          {/* CORE VALUES – NOW WITH PRIMARY PATTERN (line + icon + heading) */}
          <div ref={valuesRef} className={`transition-all duration-1000 ${valuesAnim}`}>
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px w-16 bg-green-300"></div>
              <FaInfinity className="text-green-600 text-2xl" />
              <h4 className="text-2xl md:text-3xl font-bold text-[#0b2545]">
                Core Values
              </h4>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <ValueCardEnhanced
                icon={<FaCheckCircle />}
                title="Quality"
                description="We ensure projects are of high quality and align with local standards to remain competitive in national and local markets."
              />
              <ValueCardEnhanced
                icon={<FaShieldAlt />}
                title="Safety"
                description="Safety is our priority on every worksite—before, during, and after project execution—to protect our people, projects, and communities."
              />
              <ValueCardEnhanced
                icon={<FaBalanceScale />}
                title="Integrity"
                description="We operate with honesty and accountability, ensuring compliance with industry laws, maintaining a reliable workforce, and delivering projects on time as promised."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== LEADERSHIP (right-aligned – secondary pattern) ========== */}
      <section
        id="leadership"
        ref={leadershipRef}
        className={`px-6 md:px-10 py-16 md:py-20 bg-white transition-all duration-1000 ${leadershipAnim}`}
      >
        <div className="max-w-4xl mx-auto text-right">
          {/* Secondary pattern: heading + icon + line (blue) */}
          <div className="flex items-center gap-4 mb-4 justify-end">
            <h3 className="text-3xl md:text-4xl font-bold text-[#0b2545]">
              Leadership & Team
            </h3>
            <FaInfinity className="text-blue-600 text-2xl" />
            <div className="h-px w-16 bg-blue-300"></div>
          </div>
        </div>

        {/* ----- MOBILE LAYOUT (stacked grid) ----- */}
        <div className="mt-12 max-w-6xl mx-auto block md:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0"> {/* ← gap-0 removes all gaps */}
            {teamMembers.map((member, index) => (
              <TeamCard
                key={index}
                name={member.name}
                title={member.title}
                brief={member.brief}
                imageUrl={member.imageUrl}
              />
            ))}
          </div>
        </div>

        {/* ----- DESKTOP LAYOUT (horizontal hover effect) ----- */}
        <div className="mt-12 max-w-6xl mx-auto hidden md:block">
          <div className="flex flex-nowrap gap-0">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="transition-all duration-300 ease-in-out"
                style={{
                  width: hoveredIndex === null
                    ? `${100 / teamMembers.length}%`
                    : hoveredIndex === index
                      ? '40%'
                      : `${60 / (teamMembers.length - 1)}%`,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <TeamCard
                  name={member.name}
                  title={member.title}
                  brief={member.brief}
                  imageUrl={member.imageUrl}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// Team member data
const teamMembers = [
  {
    name: "John Climaco",
    title: "Founder & CEO",
    brief: "Founder with 20+ years in construction. Leads with vision and integrity.",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Maria Climaco",
    title: "Director",
    brief: "Oversees operations and community relations. Ensures sustainable practices.",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Pedro Climaco",
    title: "Director",
    brief: "Manages project execution and site safety. Experienced engineer.",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Ana Santos",
    title: "Project Manager",
    brief: "Coordinates large-scale developments. Certified in environmental compliance.",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  }
];

// Enhanced Core value card (background image removed)
function ValueCardEnhanced({ icon, title, description }) {
  return (
    <PerspectiveCard
      className="w-full group"
      enableTilt
      maxRotate={6}
      defaultRotateY={0}
      defaultTranslateZ={6}
    >
      <div
        className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
        style={{ height: '320px' }}
      >
        {/* Background image removed — no background image div here */}

        <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-green-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-white rounded-2xl" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center p-8 h-full">
          <div className="w-16 h-16 mb-5 bg-green-100 rounded-xl flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
            {React.cloneElement(icon, { className: "w-7 h-7" })}
          </div>
          <h5 className="font-semibold text-xl mb-3 text-[#0b2545] group-hover:text-green-700 transition-colors">
            {title}
          </h5>
          <p className="text-gray-600 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </PerspectiveCard>
  );
}

// Team Card
function TeamCard({ name, title, brief, imageUrl }) {
  return (
    <div className="relative group overflow-hidden h-72 w-full 
                    transition-transform duration-300 ease-in-out 
                    hover:scale-95">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/70 flex flex-col 
                      items-center justify-center p-4 text-center 
                      opacity-0 group-hover:opacity-100 
                      transition-opacity duration-300">
        <h4 className="text-white font-semibold text-lg mb-1">
          {name}
        </h4>
        <p className="text-gray-200 text-sm mb-2">
          {title}
        </p>
        <p className="text-gray-300 text-xs">
          {brief}
        </p>
      </div>
    </div>
  );
}