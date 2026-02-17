import React, { useState, useEffect, useRef } from "react";
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaImages,
  FaMapMarkerAlt,
  FaInfinity,
  FaHardHat,
} from "react-icons/fa";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import PerspectiveCard from "../../components/PerspectiveCard";
import { projects } from "./projectsData";
import heroImage from "/projects/northport_ongoing/northport_img_5.jpg";
import { BlockReveal, LetterReveal } from "../../hooks/RevealAnimations";

// Scroll‑animated wrapper
const ScrollAnimatedItem = ({ children, threshold = 0.15, introDone = true, className = "" }) => {
  const [ref, animClass] = useScrollAnimation(threshold, introDone);
  return (
    <div ref={ref} className={`transition-all duration-1000 ${animClass} ${className}`}>
      {children}
    </div>
  );
};

// Project card for completed projects (compact)
const CompletedProjectCard = ({ project, onClick }) => (
  <PerspectiveCard enableTilt maxRotate={6} className="w-full h-full cursor-pointer group">
    <div
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.images[0]}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#0b2545] px-2.5 py-1 rounded-full text-xs font-medium shadow-sm">
          {project.year}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h4 className="text-xl font-bold text-[#0b2545] mb-2 line-clamp-2 group-hover:text-green-700 transition-colors">
          {project.title}
        </h4>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <FaImages className="text-blue-600" /> {project.images.length} photos
          </span>
          {project.area && (
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-gray-500" /> {project.area}
            </span>
          )}
        </div>
        {project.partnerLogos && project.partnerLogos.length > 0 && (
          <div className="flex items-center gap-2 pt-2 border-t border-gray-100 mt-auto">
            <span className="text-xs font-medium text-gray-700">Partners:</span>
            <div className="flex -space-x-2">
              {project.partnerLogos.slice(0, 3).map((logo, idx) => (
                <div
                  key={idx}
                  className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white overflow-hidden"
                >
                  <img src={logo} alt="partner" className="w-full h-full object-contain p-0.5" />
                </div>
              ))}
              {project.partnerLogos.length > 3 && (
                <span className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-medium text-gray-600">
                  +{project.partnerLogos.length - 3}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  </PerspectiveCard>
);

// Detailed layout for ongoing projects (restored original style)
const OngoingProjectDetail = ({ project, index, onClick }) => (
  <ScrollAnimatedItem threshold={0.2} introDone={true} className="group">
    <div className="grid md:grid-cols-2 gap-8 items-center">
      {/* Image with PerspectiveCard */}
      <PerspectiveCard enableTilt maxRotate={6} className="rounded-2xl overflow-hidden shadow-lg">
        <div onClick={onClick} className="cursor-pointer relative h-64 md:h-80">
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b2545] via-transparent to-transparent opacity-70" />
          <div className="absolute top-4 right-4 bg-green-400 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
            ONGOING
          </div>
        </div>
      </PerspectiveCard>

      {/* Content */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="text-[#1f7a8c] font-bold text-lg">0{index + 1}</div>
          <div className="h-px flex-1 bg-gradient-to-r from-[#1f7a8c] to-transparent" />
        </div>

        <h3
          onClick={onClick}
          className="text-2xl font-bold mb-4 cursor-pointer group-hover:text-[#1f7a8c] transition-colors"
        >
          {project.title}
        </h3>

        <p className="text-gray-600 mb-6 leading-relaxed">
          {project.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 text-[#1f7a8c]">
            <FaCalendarAlt className="text-lg" />
            <span className="font-medium">{project.year}</span>
          </div>
          <div className="flex items-center gap-2 text-green-700">
            <FaImages className="text-lg" />
            <span>{project.images.length} photos</span>
          </div>
          {project.area && (
            <div className="flex items-center gap-2 text-gray-500 col-span-2">
              <FaMapMarkerAlt className="text-lg" />
              <span>{project.area}</span>
            </div>
          )}
        </div>

        {/* Partners */}
        {project.partnerLogos && project.partnerLogos.length > 0 && (
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Partners:</span>
              <div className="flex -space-x-2">
                {project.partnerLogos.map((logo, idx) => (
                  <div
                    key={idx}
                    className="w-10 h-10 rounded-full bg-gray-100 border-2 border-white overflow-hidden"
                  >
                    <img
                      src={logo}
                      alt="Partner"
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </ScrollAnimatedItem>
);

export default function Projects({ introDone = true }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const modalRef = useRef(null);
  const thumbnailRef = useRef(null);

  // State for hero animations
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [textRevealed, setTextRevealed] = useState(false);

  // Trigger animations when intro is done
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

  // Scroll animation refs
  const [heroRef, heroAnim] = useScrollAnimation(0.1, introDone);
  const [ongoingRef, ongoingAnim] = useScrollAnimation(0.1, introDone);
  const [completedRef, completedAnim] = useScrollAnimation(0.1, introDone);

  // Filter projects
  const ongoingProjects = projects.filter((p) => p.category === "ongoing");
  const completedProjects = projects.filter((p) => p.category !== "ongoing");

  // Modal handlers (same as before)
  const openProject = (project, startIndex = 0) => {
    setActiveProject(project);
    setActiveIndex(startIndex);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      if (thumbnailRef.current) {
        const thumbnails = thumbnailRef.current.querySelectorAll("button");
        if (thumbnails[startIndex]) {
          thumbnails[startIndex].scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
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

  const navigateImage = (dir) => {
    if (!activeProject) return;
    const total = activeProject.images.length;
    const next = (activeIndex + dir + total) % total;
    setActiveIndex(next);
    setTimeout(() => {
      if (thumbnailRef.current) {
        const thumbnails = thumbnailRef.current.querySelectorAll("button");
        if (thumbnails[next]) {
          thumbnails[next].scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      }
    }, 50);
  };

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") navigateImage(-1);
      if (e.key === "ArrowRight") navigateImage(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, activeIndex, activeProject]);

  // Swipe support
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    const el = modalRef.current;
    let startX = 0, dx = 0;
    const onStart = (e) => (startX = e.touches ? e.touches[0].clientX : e.clientX);
    const onMove = (e) => { if (!startX) return; dx = (e.touches ? e.touches[0].clientX : e.clientX) - startX; };
    const onEnd = () => { if (dx > 40) navigateImage(-1); if (dx < -40) navigateImage(1); startX = 0; dx = 0; };
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
    <div className="bg-white text-[#0b2545] overflow-x-hidden">
      {/* ========== MOBILE/TABLET HERO (below lg) ========== */}
      <div className="relative min-h-screen overflow-hidden lg:hidden">
        {/* Background image with parallax */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        >
          <BlockReveal active={heroRevealed} rows={8} cols={12} />
        </div>

        {/* Text overlay with semi‑transparent background */}
        <div className="absolute inset-0 flex flex-col justify-center items-start p-6 md:p-12 bg-black/30">
          <div className="text-sm tracking-[0.3em] uppercase text-white/80 mb-3">
            Projects
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            <LetterReveal
              active={textRevealed}
              lines={["Building Progress,", "Delivering", "Excellence"]}
              letterDelay={0.05}
            />
          </h1>
        </div>
      </div>

      {/* ========== DESKTOP HERO (lg and up) – split screen with fixed background ========== */}
      <div className="hidden lg:flex flex-col md:flex-row min-h-screen md:h-screen">
        {/* Image side with block reveal and fixed background */}
        <div className="relative w-full md:w-1/2 h-96 md:h-full order-2 md:order-1 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundPosition: "center",
            }}
          />
          <BlockReveal active={heroRevealed} rows={8} cols={12} />
        </div>

        {/* Text side */}
        <div className="w-full md:w-1/2 flex flex-col order-1 md:order-2">
          <div className="hidden md:block flex-1" />
          <div
            ref={heroRef}
            className={`pt-20 md:pt-0 pb-16 md:pb-20 px-6 md:px-12 ${heroAnim}`}
          >
            <div className="text-sm tracking-[0.3em] uppercase text-gray-600 mb-3">
              Projects
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0b2545] leading-tight">
              <LetterReveal
                active={textRevealed}
                lines={["Building Progress, ", "Delivering", "Excellence"]}
                letterDelay={0.05}
              />
            </h1>
          </div>
          <div className="hidden md:block flex-1" />
        </div>
      </div>

      {/* ========== ONGOING PROJECTS – PRIMARY PATTERN (left aligned, detailed layout) ========== */}
      <section
        ref={ongoingRef}
        className={`px-6 md:px-10 py-16 md:py-20 bg-white transition-all duration-1000 ${ongoingAnim}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-16 bg-green-300"></div>
            <FaInfinity className="text-green-600 text-2xl" />
            <h3 className="text-3xl md:text-4xl font-bold text-[#0b2545]">Ongoing Projects</h3>
          </div>
          <p className="text-gray-600 max-w-3xl mb-12 text-lg">
            Current developments showcasing our commitment to timely execution and quality
            craftsmanship.
          </p>

          <div className="space-y-12">
            {ongoingProjects.map((project, index) => (
              <OngoingProjectDetail
                key={project.id}
                project={project}
                index={index}
                onClick={() => openProject(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========== COMPLETED PROJECTS – SECONDARY PATTERN (right aligned, card layout) ========== */}
      <section
        ref={completedRef}
        className={`px-6 md:px-10 py-16 md:py-20 bg-[#f4faf7] transition-all duration-1000 ${completedAnim}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4 justify-end">
            <h3 className="text-3xl md:text-4xl font-bold text-[#0b2545]">Completed Projects</h3>
            <FaInfinity className="text-blue-600 text-2xl" />
            <div className="h-px w-16 bg-blue-300"></div>
          </div>
          <p className="text-gray-600 max-w-3xl ml-auto text-right mb-12 text-lg">
            Explore our legacy of successful developments – from land preparation to final
            construction.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedProjects.map((project, index) => (
              <ScrollAnimatedItem
                key={project.id}
                threshold={0.15}
                introDone={introDone}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <CompletedProjectCard
                  project={project}
                  onClick={() => openProject(project)}
                />
              </ScrollAnimatedItem>
            ))}
          </div>
        </div>
      </section>

      {/* ========== MODAL (full gallery) ========== */}
      {isOpen && activeProject && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="modal-container w-full max-w-6xl">
            <div
              ref={modalRef}
              onClick={(e) => e.stopPropagation()}
              className="modal-content bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-50 bg-white/90 hover:bg-gray-100 text-[#0b2545] p-2.5 rounded-full shadow-md transition-colors"
                aria-label="Close modal"
              >
                <FaTimes className="text-xl" />
              </button>

              {/* Image section */}
              <div className="modal-image-section relative md:w-2/3 h-80 md:h-auto bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200">
                {activeProject.images.map((img, idx) => (
                  <img
                    key={img}
                    src={img}
                    alt={`${activeProject.title} view ${idx + 1}`}
                    className={`absolute inset-0 w-full h-full object-contain bg-white p-4 transition-opacity duration-500 ${idx === activeIndex ? "opacity-100" : "opacity-0"
                      }`}
                    loading={idx === 0 ? "eager" : "lazy"}
                  />
                ))}

                {/* Navigation arrows */}
                <button
                  onClick={() => navigateImage(-1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-gray-100 text-[#0b2545] p-3 rounded-full shadow-md transition-colors"
                  aria-label="Previous image"
                >
                  <FaChevronLeft className="text-xl" />
                </button>
                <button
                  onClick={() => navigateImage(1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-gray-100 text-[#0b2545] p-3 rounded-full shadow-md transition-colors"
                  aria-label="Next image"
                >
                  <FaChevronRight className="text-xl" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 text-[#0b2545] px-4 py-1.5 rounded-full text-sm font-medium shadow-md">
                  {activeIndex + 1} / {activeProject.images.length}
                </div>
              </div>

              {/* Details section */}
              <div className="modal-details-section p-6 md:p-8 w-full md:w-1/3 overflow-y-auto">
                <h3 className="text-2xl font-bold text-[#0b2545] mb-2">{activeProject.title}</h3>
                <p className="text-gray-700 mb-6">{activeProject.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {activeProject.year && (
                    <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                      <div className="mt-1 p-1.5 bg-[#1f7a8c]/10 rounded-lg">
                        <FaCalendarAlt className="text-[#1f7a8c]" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Completion Year</div>
                        <div className="text-sm font-semibold text-[#0b2545]">
                          {activeProject.year}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                    <div className="mt-1 p-1.5 bg-green-100 rounded-lg">
                      <FaImages className="text-green-700" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Total Images</div>
                      <div className="text-sm font-semibold text-[#0b2545]">
                        {activeProject.images.length}
                      </div>
                    </div>
                  </div>
                  {activeProject.area && (
                    <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg col-span-2">
                      <div className="mt-1 p-1.5 bg-gray-200 rounded-lg">
                        <FaMapMarkerAlt className="text-gray-600" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Location</div>
                        <div className="text-sm font-semibold text-[#0b2545]">
                          {activeProject.area}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Partners */}
                {(activeProject.partnerLogos || []).length > 0 && (
                  <div className="mb-6">
                    <div className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                      <FaHardHat className="text-green-600" /> Project Partners
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {activeProject.partnerLogos.map((logo, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 border border-gray-200 rounded-xl p-2.5"
                        >
                          <img
                            src={logo}
                            alt="Partner logo"
                            className="h-8 w-auto object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Thumbnails */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="text-xs font-medium text-gray-500 mb-2">Project Gallery</div>
                  <div
                    ref={thumbnailRef}
                    className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar"
                  >
                    {activeProject.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${index === activeIndex
                          ? "border-[#1f7a8c]"
                          : "border-transparent hover:border-gray-300"
                          }`}
                        style={{ width: "72px", height: "54px" }}
                        aria-label={`View image ${index + 1}`}
                      >
                        <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @media (max-width: 768px) {
          .modal-content {
            max-height: 95vh;
          }
          .modal-image-section {
            height: 250px;
            border-bottom: 1px solid #e5e7eb;
          }
          .modal-details-section {
            max-height: 60vh;
            overflow-y: auto;
          }
        }
      `}</style>
    </div>
  );
}