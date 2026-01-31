// src/pages/projects/Projects.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaTimes, FaChevronLeft, FaChevronRight, FaCalendarAlt, FaUsers, FaImages } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import useScrollAnimation from "./useScrollAnimation";
import PerspectiveCard from "./PerspectiveCard";

// Scroll-animated wrapper for individual elements (accepts custom className)
const ScrollAnimatedItem = ({ children, threshold = 0.15, introDone = true, className = "" }) => {
  const [ref, animClass] = useScrollAnimation(threshold, introDone);
  return (
    <div ref={ref} className={`transition-all duration-1000 ${animClass} ${className}`}>
      {children}
    </div>
  );
};

// Title: MDI PROJECT 2019
// Partners: MDI and Zuleigg Pharma
// MDI 2019 Project Images
import mdi_2019_1 from "/projects/mdi_2019/2019_img_1.png";
import mdi_2019_2 from "/projects/mdi_2019/2019_img_2.png";
import mdi_2019_3 from "/projects/mdi_2019/2019_img_3.png";
import mdi_2019_4 from "/projects/mdi_2019/2019_img_4.png";
import mdi_2019_5 from "/projects/mdi_2019/2019_img_5.png";

// Title: MDI - MERCATOR HOLDINGS PROJECT 2024
// Partners: MDI and Zuleigg Pharma
// Description: (CLEARING, GRUBBING, TEMPORARY FENCE REMOVAL OF UNSUITABLE SOIL AND LEVELING)
// MDI 2024 Project Images
import mdi_2024_1 from "/projects/mdi_2024/2024_img_1.png";
import mdi_2024_2 from "/projects/mdi_2024/2024_img_2.png";
import mdi_2024_3 from "/projects/mdi_2024/2024_img_3.png";
import mdi_2024_4 from "/projects/mdi_2024/2024_img_4.png";

// Title: SILANG, CAVITE PROJECT 2021
// Area: Area = 18.3 hectares
// Description: (LEVELING AND COMPACTION, DRAINAGE, ROAD NETWORK, RIPRAP, BRIDGE, RECTIFICATION)
// Silang, Cavite Project 2021 Images
import silang_img_1 from "/projects/silangCavite_2021/2021_img_1.png";
import silang_img_2 from "/projects/silangCavite_2021/2021_img_2.png";
import silang_img_3 from "/projects/silangCavite_2021/2021_img_3.png";
import silang_img_4 from "/projects/silangCavite_2021/2021_img_4.png";

// Title: CBD BUILDING PROJECT 2019
// Description: (3-STOREY BUILDING)
// CBD Building Project 2019 Images
import cbd_img_1 from "/projects/cbdBuilding_2019/cbd_2019_img_1.png";
import cbd_img_2 from "/projects/cbdBuilding_2019/cbd_2019_img_2.png";
import cbd_img_3 from "/projects/cbdBuilding_2019/cbd_2019_img_3.png";
import cbd_img_4 from "/projects/cbdBuilding_2019/cbd_2019_img_4.png";
import cbd_img_5 from "/projects/cbdBuilding_2019/cbd_2019_img_5.png";
import cbd_img_6 from "/projects/cbdBuilding_2019/cbd_2019_img_6.png";

// Title: MDI - MERCATOR HOLDINGS PROJECT 2025
// Partners: MDI and Zuleigg Pharma
// Desciption: (EMBANKMENT, GABION WALL, PERIMETER FENCE AND GATE, RETAINING WALL, PAVEMENT, ELECTRICAL POST LIGHTS, AND LANDSCAPE)
// MDI Project 2025 Images
import mdi_2025_1 from "/projects/mdi_2025/2025_img_1.png";
import mdi_2025_2 from "/projects/mdi_2025/2025_img_2.png";
import mdi_2025_3 from "/projects/mdi_2025/2025_img_3.png";
import mdi_2025_4 from "/projects/mdi_2025/2025_img_4.png";
import mdi_2025_5 from "/projects/mdi_2025/2025_img_5.png";
import mdi_2025_6 from "/projects/mdi_2025/2025_img_6.png";
import mdi_2025_7 from "/projects/mdi_2025/2025_img_7.png";
import mdi_2025_8 from "/projects/mdi_2025/2025_img_8.png";
import mdi_2025_9 from "/projects/mdi_2025/2025_img_9.png";
import mdi_2025_10 from "/projects/mdi_2025/2025_img_10.png";
import mdi_2025_11 from "/projects/mdi_2025/2025_img_11.png";
import mdi_2025_12 from "/projects/mdi_2025/2025_img_12.png";

// Title: MDI - MERCATOR HOLDINGS PROJECT
// Partners: MDI and Zuleigg Pharma
// Description: (EMBANKMENT, DIVERSION ROAD, RETAINING WALL, DRAINAGE, PAVEMENT, AND ELECTRICAL POST LIGHTS) 
// MDI Ongoing Project Images
import mdi_ongoing_1 from "/projects/mdi_ongoing/ongoing_img_1.png";
import mdi_ongoing_2 from "/projects/mdi_ongoing/ongoing_img_2.png";
import mdi_ongoing_3 from "/projects/mdi_ongoing/ongoing_img_3.png";
import mdi_ongoing_4 from "/projects/mdi_ongoing/ongoing_img_4.png";
import mdi_ongoing_5 from "/projects/mdi_ongoing/ongoing_img_5.png";

// Title: PIER 2 NORTH HARBOUR
// Partners: Northport
// Description: (RECONSTRUCTION OF BRIDGE, PAVEMENT, LAGOON, EMBANKMENT, DRAINAGE, WATER & ELECTRICAL WORKS)
// Northport Ongoing Project Images
import northport_ongoing_1 from "/projects/northport_ongoing/northport_img_1.png";
import northport_ongoing_2 from "/projects/northport_ongoing/northport_img_2.png";
import northport_ongoing_3 from "/projects/northport_ongoing/northport_img_3.png";
import northport_ongoing_4 from "/projects/northport_ongoing/northport_img_4.png";
import northport_ongoing_5 from "/projects/northport_ongoing/northport_img_5.png";

// Title: WDV PHASE 4 TANZA, CAVITE
// Partners: Peakland
// Description: (RETAINING WALL & PERIMETER FENCE)
// Tanza, Cavite Ongoing Project Images
import tanza_img_1 from "/projects/tanzaCavite_ongoing/tanza_img_1.png";
import tanza_img_2 from "/projects/tanzaCavite_ongoing/tanza_img_2.png";
import tanza_img_3 from "/projects/tanzaCavite_ongoing/tanza_img_3.png";
import tanza_img_4 from "/projects/tanzaCavite_ongoing/tanza_img_4.png";
import tanza_img_5 from "/projects/tanzaCavite_ongoing/tanza_img_5.png";
import tanza_img_6 from "/projects/tanzaCavite_ongoing/tanza_img_6.png";

// Partners Logo Images
import mdi_logo from "/projects/partnersLogo/mdi_logo.png";
import northport_logo from "/projects/partnersLogo/northport_logo.png";
import peakland_logo from "/projects/partnersLogo/peakland_logo.png";
import zuelligPharma_logo from "/projects/partnersLogo/zuelligPharma_logo.png";


export default function Projects({ introDone = true }) {
  const navigate = useNavigate();
  // REMOVED headerRef and headerAnim - header background is now static
  // REMOVED gridRef and gridAnim - animations applied directly to cards

  // Modal state
  const [isOpen, setIsOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const modalRef = useRef(null);
  const thumbnailRef = useRef(null);

  // Track window height for responsive adjustments
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Projects data (unchanged except added year: 2026 for ongoing ones)
  const projects = [
    {
      id: "mdi2019",
      title: "MDI PROJECT 2019",
      partners: ["MDI", "Zuellig Pharma"],
      partnerLogos: [mdi_logo, zuelligPharma_logo],
      description: "Site works and land development.",
      images: [mdi_2019_1, mdi_2019_2, mdi_2019_3, mdi_2019_4, mdi_2019_5],
      year: 2019,
    },
    {
      id: "mdi2024",
      title: "MDI - MERCATOR HOLDINGS PROJECT 2024",
      partners: ["MDI", "Zuellig Pharma"],
      description: "Clearing, grubbing, temporary fence removal and leveling.",
      images: [mdi_2024_1, mdi_2024_2, mdi_2024_3, mdi_2024_4],
      year: 2024,
      partnerLogos: [mdi_logo, zuelligPharma_logo],
    },
    {
      id: "silang2021",
      title: "SILANG, CAVITE PROJECT 2021",
      partners: [],
      area: "18.3 hectares",
      description: "Leveling, compaction, drainage, road network, riprap and bridge works.",
      images: [silang_img_1, silang_img_2, silang_img_3, silang_img_4],
      year: 2021,
    },
    {
      id: "cbd2019",
      title: "CBD BUILDING PROJECT 2019",
      description: "3-storey commercial building.",
      images: [cbd_img_1, cbd_img_2, cbd_img_3, cbd_img_4, cbd_img_5, cbd_img_6],
      year: 2019,
    },
    {
      id: "mdi2025",
      title: "MDI - MERCATOR HOLDINGS PROJECT 2025",
      partners: ["MDI", "Zuellig Pharma"],
      description:
        "Embankment, gabion walls, perimeter fence & gate, retaining wall, pavement, electrical lights and landscaping.",
      images: [
        mdi_2025_1,
        mdi_2025_2,
        mdi_2025_3,
        mdi_2025_4,
        mdi_2025_5,
        mdi_2025_6,
        mdi_2025_7,
        mdi_2025_8,
        mdi_2025_9,
        mdi_2025_10,
        mdi_2025_11,
        mdi_2025_12,
      ],
      year: 2025,
      partnerLogos: [mdi_logo, zuelligPharma_logo],
    },
    {
      id: "ongoing",
      title: "MDI Ongoing Works",
      description: "Embankment, diversion road, retaining walls, drainage and pavement.",
      images: [mdi_ongoing_1, mdi_ongoing_2, mdi_ongoing_3, mdi_ongoing_4, mdi_ongoing_5],
      partnerLogos: [mdi_logo, zuelligPharma_logo],
      year: 2026,
    },
    {
      id: "northport",
      title: "PIER 2 NORTH HARBOUR (ONGOING)",
      partners: ["Northport"],
      description:
        "Reconstruction of bridge, pavement, lagoon, embankment, drainage, water & electrical works.",
      images: [
        northport_ongoing_1,
        northport_ongoing_2,
        northport_ongoing_3,
        northport_ongoing_4,
        northport_ongoing_5,
      ],
      partnerLogos: [northport_logo],
      year: 2026,
    },
    {
      id: "tanza",
      title: "WDV PHASE 4 TANZA, CAVITE (ONGOING)",
      partners: ["Peakland"],
      description: "Retaining wall & perimeter fence.",
      images: [tanza_img_1, tanza_img_2, tanza_img_3, tanza_img_4, tanza_img_5, tanza_img_6],
      partnerLogos: [peakland_logo],
      year: 2026,
    },
  ];

  // classify ongoing vs completed
  const ongoingProjects = projects.filter(
    (p) => /ongoing/i.test(p.id) || /ongoing/i.test(p.title) || !p.year
  );
  const completedProjects = projects.filter((p) => !ongoingProjects.includes(p));

  // pick a featured project (prefer an ongoing one)
  const featuredProject = ongoingProjects[0] ?? projects.find((p) => p.id === "mdi2025");

  // open modal for a project (index 0 by default)
  const openProject = (project, startIndex = 0) => {
    setActiveProject(project);
    setActiveIndex(startIndex);
    setIsOpen(true);
    document.body.style.overflow = "hidden";

    // Scroll to thumbnail after a brief delay
    setTimeout(() => {
      if (thumbnailRef.current) {
        const thumbnails = thumbnailRef.current.querySelectorAll('button');
        if (thumbnails[startIndex]) {
          thumbnails[startIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
          });
        }
      }
    }, 100);
  };

  const closeModal = () => {
    setIsOpen(false);
    setActiveProject(null);
    setActiveIndex(0);
    document.body.style.overflow = "";
  };

  // keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") navigateImage(-1);
      if (e.key === "ArrowRight") navigateImage(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, activeIndex, activeProject]);

  const navigateImage = (dir) => {
    if (!activeProject) return;
    const total = activeProject.images.length;
    const next = (activeIndex + dir + total) % total;
    setActiveIndex(next);

    // Scroll thumbnail into view
    setTimeout(() => {
      if (thumbnailRef.current) {
        const thumbnails = thumbnailRef.current.querySelectorAll('button');
        if (thumbnails[next]) {
          thumbnails[next].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
          });
        }
      }
    }, 50);
  };

  // simple swipe support for modal
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    const el = modalRef.current;
    let startX = 0;
    let dx = 0;
    const onStart = (e) => (startX = e.touches ? e.touches[0].clientX : e.clientX);
    const onMove = (e) => {
      if (!startX) return;
      dx = (e.touches ? e.touches[0].clientX : e.clientX) - startX;
    };
    const onEnd = () => {
      if (dx > 40) navigateImage(-1);
      if (dx < -40) navigateImage(1);
      startX = 0;
      dx = 0;
    };
    el.addEventListener("touchstart", onStart);
    el.addEventListener("touchmove", onMove);
    el.addEventListener("touchend", onEnd);
    el.addEventListener("mousedown", onStart);
    el.addEventListener("mouseup", onEnd);
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("mousedown", onStart);
      el.removeEventListener("mouseup", onEnd);
    };
  }, [isOpen, activeProject, activeIndex]);

  return (
    <div className="min-h-screen">
      {/* small scoped styles */}
      <style>{`
        @keyframes fadeUp { 0%{opacity:0; transform:translateY(10px)} 100%{opacity:1; transform:translateY(0)} }
        .thumb-active { border-color: rgba(34,197,94,0.95) !important; transform: scale(1.03); }
        .thin-scroll::-webkit-scrollbar { height: 7px; }
        .thin-scroll::-webkit-scrollbar-thumb { background: rgba(15,23,42,0.12); border-radius: 999px; }
        
        /* Hero background enhancements */
        .hero-bg {
          position: relative;
          background-size: cover;
          background-position: center;
          will-change: transform;
          transition: transform 0.3s ease;
        }
        .hero-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom right,
            rgba(11, 37, 69, 0.88),
            rgba(31, 122, 140, 0.85),
            rgba(11, 37, 69, 0.92)
          );
        }
        .hero-content {
          position: relative;
          z-index: 10;
        }
        
        /* Perspective card fixes for grid */
        .perspective-wrapper {
          display: block;
          height: 100%;
          transform-style: preserve-3d;
        }
        .perspective-wrapper > div {
          height: 100%;
        }
        
        /* Modal responsive adjustments */
        .modal-container {
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        /* Mobile: Full height modal with flex column */
        @media (max-width: 640px) {
          .modal-content {
            display: flex;
            flex-direction: column;
            height: calc(100vh - 40px);
            max-height: 95vh;
            width: calc(100vw - 20px);
            max-width: 95vw;
          }
          
          .modal-image-section {
            height: 50vh;
            min-height: 300px;
            flex-shrink: 0;
          }
          
          .modal-details-section {
            height: calc(50vh - 60px);
            min-height: 200px;
            overflow-y: auto;
          }
          
          .modal-close-btn {
            top: -35px;
            right: 0;
          }
        }
        
        /* Tablet: Taller modal with adaptive layout */
        @media (min-width: 641px) and (max-width: 1024px) {
          .modal-content {
            display: grid;
            grid-template-rows: auto 1fr;
            height: calc(100vh - 60px);
            max-height: 90vh;
            width: calc(100vw - 40px);
            max-width: 90vw;
          }
          
          .modal-image-section {
            height: 55vh;
            min-height: 350px;
          }
          
          .modal-details-section {
            height: calc(45vh - 60px);
            min-height: 250px;
            overflow-y: auto;
          }
        }
        
        /* Desktop: Side-by-side layout */
        @media (min-width: 1025px) {
          .modal-content {
            display: grid;
            grid-template-columns: 1fr 400px;
            height: calc(100vh - 80px);
            max-height: 85vh;
            width: calc(100vw - 80px);
            max-width: 1400px;
          }
          
          .modal-image-section {
            height: 100%;
          }
          
          .modal-details-section {
            height: 100%;
            overflow-y: auto;
          }
        }
        
        /* Extra small screens (very short height) */
        @media (max-height: 600px) {
          .modal-content {
            max-height: 98vh;
          }
          
          .modal-image-section {
            min-height: 250px;
            height: 60vh;
          }
          
          .modal-details-section {
            min-height: 150px;
            height: 40vh;
          }
        }
        
        /* Landscape orientation */
        @media (orientation: landscape) and (max-height: 500px) {
          .modal-content {
            grid-template-columns: 1fr 350px;
            max-height: 98vh;
          }
          
          .modal-image-section {
            height: 98vh;
            min-height: auto;
          }
          
          .modal-details-section {
            height: 98vh;
            min-height: auto;
          }
        }
      `}</style>

      {/* Header / Hero - STATIC BACKGROUND, ANIMATED CHILDREN */}
      <header
        className="hero-bg min-h-[320px] sm:min-h-[400px] md:min-h-[500px] px-6 md:px-10 pt-20 pb-12"
        style={{
          backgroundImage: `url(${featuredProject?.images?.[0] ?? mdi_2025_1})`,
        }}
      >
        <div className="hero-content max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Back button - animated child */}
          <ScrollAnimatedItem className="mb-6" threshold={0.05} introDone={introDone}>
            <Link
              to="/"
              className="inline-flex items-center text-green-300 hover:text-green-100 transition-colors"
            >
              <FaArrowLeft className="w-5 h-5 mr-2" />
            </Link>
          </ScrollAnimatedItem>

          {/* Title and description - animated child */}
          <ScrollAnimatedItem threshold={0.05} introDone={introDone}>
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl tracking-tight text-white">
                Our Projects
              </h1>
              <p className="mt-4 text-green-100 text-lg md:text-xl max-w-2xl leading-relaxed">
                Explore recent and ongoing works by <strong>CLIBERDUCHE CORPORATION</strong> — land development, infrastructure, and building projects.
              </p>
            </div>
          </ScrollAnimatedItem>

          {/* Featured card - animated child (removed extra wrapper div) */}
          <ScrollAnimatedItem className="w-full md:w-96" threshold={0.05} introDone={introDone}>
            <PerspectiveCard enableTilt maxRotate={8} defaultRotateY={-8} defaultTranslateZ={15}>
              <div
                onClick={() => openProject(featuredProject)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter") openProject(featuredProject); }}
                className="p-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl cursor-pointer select-none border border-white/20 hover:border-white/40 transition-all duration-300"
              >
                <div className="relative h-44 mb-3">
                  <img
                    src={featuredProject?.images?.[0] ?? mdi_2025_1}
                    alt="Featured project"
                    className="w-full h-full object-cover rounded-lg shadow-sm transition-transform duration-700 transform hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
                </div>
                <div className="mt-2 flex flex-col h-full">
                  <h4 className="text-[#0b2545] font-bold text-lg line-clamp-1">{featuredProject?.title ?? "Project"}</h4>
                  <p className="text-sm text-gray-700 mt-1 line-clamp-2 flex-grow">
                    {featuredProject?.description ?? "Featured project description."}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-gray-600">
                    <div className="flex items-center gap-1.5 text-xs">
                      <FaCalendarAlt className="text-[#1f7a8c]" /> {featuredProject?.year ?? "—"}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <FaImages className="text-[#1f7a8c]" /> {featuredProject?.images?.length ?? 0} images
                    </div>
                  </div>
                </div>
              </div>
            </PerspectiveCard>
          </ScrollAnimatedItem>
        </div>
      </header>

      {/* Projects sections - ALL CARDS WITH INDIVIDUAL SCROLL ANIMATIONS */}
      <main className="bg-[#f4faf7] text-[#0b2545] px-6 md:px-10 py-12 md:py-16">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Ongoing Projects (moved first) */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Ongoing Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {ongoingProjects.map((p) => (
                <ScrollAnimatedItem key={p.id} threshold={0.15} introDone={introDone}>
                  <PerspectiveCard
                    enableTilt
                    maxRotate={6}
                    defaultRotateY={-4}
                    defaultTranslateZ={10}
                    className="perspective-wrapper"
                  >
                    <article
                      className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden border border-gray-100/70 transform transition-all duration-300 cursor-pointer hover:shadow-lg"
                      onClick={() => openProject(p, 0)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === "Enter") openProject(p, 0); }}
                      aria-label={`Open ${p.title} gallery`}
                    >
                      <div className="relative group" aria-hidden>
                        <div className="relative h-56 bg-gray-100 overflow-hidden">
                          <img
                            src={p.images[0]}
                            alt={`${p.title} thumbnail`}
                            className="w-full h-full object-cover transition-transform duration-700 transform group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute left-4 bottom-4 flex items-center gap-3 z-10">
                            <div className="bg-black/70 text-white px-3 py-2 rounded-full flex items-center gap-2 text-xs backdrop-blur-sm">
                              <FaImages /> <span>{p.images.length}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="text-lg font-semibold">{p.title}</h3>
                        <p className="text-sm text-gray-700 mt-2">{p.description}</p>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {(p.partnerLogos || []).slice(0, 3).map((logo, i) => (
                              <img key={i} src={logo} alt="partner" className="w-8 h-8 object-contain rounded bg-white p-1 shadow-sm" />
                            ))}
                          </div>

                          <div className="flex items-center gap-3 text-gray-500">
                            <div className="flex items-center gap-2"><FaUsers /> <span className="text-xs">{(p.partners || []).length}</span></div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </PerspectiveCard>
                </ScrollAnimatedItem>
              ))}
            </div>
          </section>

          {/* Completed Projects */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Completed Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {completedProjects.map((p) => (
                <ScrollAnimatedItem key={p.id} threshold={0.15} introDone={introDone}>
                  <PerspectiveCard
                    enableTilt
                    maxRotate={6}
                    defaultRotateY={-4}
                    defaultTranslateZ={10}
                    className="perspective-wrapper"
                  >
                    <article
                      className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden border border-gray-100/70 transform transition-all duration-300 cursor-pointer hover:shadow-lg"
                      onClick={() => openProject(p, 0)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === "Enter") openProject(p, 0); }}
                      aria-label={`Open ${p.title} gallery`}
                    >
                      <div className="relative group" aria-hidden>
                        <div className="relative h-56 bg-gray-100 overflow-hidden">
                          <img
                            src={p.images[0]}
                            alt={`${p.title} thumbnail`}
                            className="w-full h-full object-cover transition-transform duration-700 transform group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute left-4 bottom-4 flex items-center gap-3 z-10">
                            <div className="bg-black/70 text-white px-3 py-2 rounded-full flex items-center gap-2 text-xs backdrop-blur-sm">
                              <FaCalendarAlt /> <span>{p.year ?? "—"}</span>
                            </div>
                            <div className="bg-black/70 text-white px-3 py-2 rounded-full flex items-center gap-2 text-xs backdrop-blur-sm">
                              <FaImages /> <span>{p.images.length}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="text-lg font-semibold">{p.title}</h3>
                        <p className="text-sm text-gray-700 mt-2">{p.description}</p>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {(p.partnerLogos || []).slice(0, 3).map((logo, i) => (
                              <img key={i} src={logo} alt="partner" className="w-8 h-8 object-contain rounded bg-white p-1 shadow-sm" />
                            ))}
                          </div>

                          <div className="flex items-center gap-3 text-gray-500">
                            <div className="flex items-center gap-2"><FaUsers /> <span className="text-xs">{(p.partners || []).length}</span></div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </PerspectiveCard>
                </ScrollAnimatedItem>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Responsive Modal Lightbox with proper height */}
      {isOpen && activeProject && (
        <div
          className="fixed inset-0 z-50 bg-black/90 p-2 sm:p-4 md:p-6"
          aria-modal="true"
          role="dialog"
          onClick={closeModal}
        >
          <div className="modal-container">
            <div
              ref={modalRef}
              onClick={(e) => e.stopPropagation()}
              className="modal-content bg-white rounded-xl overflow-hidden shadow-2xl relative"
              aria-live="polite"
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="modal-close-btn absolute z-50 bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full focus:outline-none transition-colors"
                aria-label="Close gallery"
              >
                <FaTimes className="text-lg sm:text-xl" />
              </button>

              {/* Main image section - FIXED CONTAINER */}
              <div className="modal-image-section bg-[#0b2545] relative">
                {/* Fixed aspect ratio container */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  {/* Preload images to prevent layout shift */}
                  {activeProject.images.map((img, idx) => (
                    <img
                      key={img}
                      src={img}
                      alt=""
                      className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${idx === activeIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                      loading={idx === 0 ? "eager" : "lazy"}
                      onLoad={(e) => {
                        if (idx === activeIndex) {
                          const imgElement = e.target;
                          imgElement.style.width = '100%';
                          imgElement.style.height = '100%';
                          imgElement.style.objectFit = 'contain';
                        }
                      }}
                    />
                  ))}
                </div>

                {/* Navigation buttons */}
                <button
                  onClick={() => navigateImage(-1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 sm:p-3 rounded-full focus:outline-none transition-colors z-10"
                  aria-label="Previous image"
                >
                  <FaChevronLeft className="text-lg sm:text-xl" />
                </button>

                <button
                  onClick={() => navigateImage(1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 sm:p-3 rounded-full focus:outline-none transition-colors z-10"
                  aria-label="Next image"
                >
                  <FaChevronRight className="text-lg sm:text-xl" />
                </button>

                {/* Image counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium z-10">
                  {activeIndex + 1} / {activeProject.images.length}
                </div>

                {/* Loading indicator */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-8 h-8 border-3 border-white/30 border-t-white rounded-full animate-spin ${activeProject.images[activeIndex] ? 'opacity-0' : 'opacity-100'
                    }`}></div>
                </div>
              </div>

              {/* Details section - NOW FIXED HEIGHT WITHOUT SHIFTING */}
              <div className="modal-details-section bg-white p-4 sm:p-6 flex flex-col">
                {/* Project header - Fixed height content */}
                <div className="mb-4 flex-shrink-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0b2545] mb-2 line-clamp-2">
                    {activeProject.title}
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed line-clamp-3">
                    {activeProject.description}
                  </p>
                </div>

                {/* Project info - Fixed height grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 flex-shrink-0">
                  {activeProject.year && (
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-500 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs text-gray-500 truncate">Year</div>
                        <div className="text-sm font-medium truncate">{activeProject.year}</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <FaImages className="text-gray-500 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs text-gray-500 truncate">Images</div>
                      <div className="text-sm font-medium truncate">{activeProject.images.length}</div>
                    </div>
                  </div>
                  {activeProject.area && (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 flex items-center justify-center text-gray-500 flex-shrink-0">⦿</div>
                      <div className="min-w-0">
                        <div className="text-xs text-gray-500 truncate">Area</div>
                        <div className="text-sm font-medium truncate">{activeProject.area}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Partner logos - Fixed height container */}
                {(activeProject.partnerLogos || []).length > 0 && (
                  <div className="mb-6 flex-shrink-0">
                    <div className="flex flex-wrap gap-3 max-h-24 overflow-y-auto">
                      {activeProject.partnerLogos.map((logo, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 rounded-lg p-2 sm:p-3 flex items-center justify-center border border-gray-200 flex-shrink-0"
                          style={{ minHeight: '60px', minWidth: '120px' }}
                        >
                          <img
                            src={logo}
                            alt={`Partner ${index + 1}`}
                            className="max-h-12 w-auto object-contain"
                            onLoad={(e) => {
                              const img = e.target;
                              img.style.width = 'auto';
                              img.style.height = '48px';
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Thumbnails - Fixed height section */}
                <div className="mt-auto pt-4 border-t border-gray-200 flex-shrink-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-medium text-gray-700">
                      All Images
                    </div>
                    <div className="text-xs text-gray-500">
                      Click to view
                    </div>
                  </div>
                  <div
                    ref={thumbnailRef}
                    className="flex gap-2 overflow-x-auto pb-2 thin-scroll"
                    style={{ minHeight: '64px' }}
                  >
                    {activeProject.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`flex-shrink-0 rounded-lg overflow-hidden border-2 focus:outline-none transition-all duration-200 ${index === activeIndex
                          ? "thumb-active border-green-500 shadow-md"
                          : "border-transparent hover:border-gray-300"
                          }`}
                        aria-label={`View image ${index + 1}`}
                        style={{
                          width: "80px",
                          height: "60px",
                          flexShrink: 0
                        }}
                        onMouseEnter={(e) => {
                          const imgPreload = new Image();
                          imgPreload.src = activeProject.images[index];
                        }}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onLoad={(e) => {
                            const imgElement = e.target;
                            imgElement.style.width = '100%';
                            imgElement.style.height = '100%';
                            imgElement.style.objectFit = 'cover';
                          }}
                        />
                        {index === activeIndex && (
                          <div className="absolute inset-0 bg-green-500/20 pointer-events-none"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action button for mobile */}
                <div className="mt-4 sm:hidden flex-shrink-0">
                  <button
                    onClick={closeModal}
                    className="w-full bg-[#0b2545] hover:bg-[#1a365d] text-white font-medium py-3 rounded-lg transition-colors"
                  >
                    Close Gallery
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}