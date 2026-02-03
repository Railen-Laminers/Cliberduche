// Projects.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  FaArrowLeft,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaImages,
  FaMapMarkerAlt,
  FaHardHat,
  FaCheck
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import useScrollAnimation from "./useScrollAnimation";
import PerspectiveCard from "./PerspectiveCard";
import { projects } from "./projectsData";
import heroImage from "/projects/northport_ongoing/northport_img_5.jpg";

// Scroll-animated wrapper
const ScrollAnimatedItem = ({ children, threshold = 0.15, introDone = true, className = "" }) => {
  const [ref, animClass] = useScrollAnimation(threshold, introDone);
  return (
    <div ref={ref} className={`transition-all duration-1000 ${animClass} ${className}`}>
      {children}
    </div>
  );
};

export default function Projects({ introDone = true }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const modalRef = useRef(null);
  const thumbnailRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);

  // Scroll tracking for subtle effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter projects
  const ongoingProjects = projects.filter(p => p.category === "ongoing");
  const completedProjects = projects.filter(p => p.category !== "ongoing");

  // Modal handlers (unchanged functionality)
  const openProject = (project, startIndex = 0) => {
    setActiveProject(project);
    setActiveIndex(startIndex);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      if (thumbnailRef.current) {
        const thumbnails = thumbnailRef.current.querySelectorAll('button');
        if (thumbnails[startIndex]) {
          thumbnails[startIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
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
        const thumbnails = thumbnailRef.current.querySelectorAll('button');
        if (thumbnails[next]) {
          thumbnails[next].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }
    }, 50);
  };

  // Keyboard/swipe handlers (unchanged)
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
    <div className="bg-white text-[#0b2545] overflow-x-hidden" ref={containerRef}>
      {/* Fixed Return Home Button - Always at top left */}
      <Link
        to="/"
        className="fixed top-6 left-6 z-40 inline-flex items-center bg-white/90 backdrop-blur-sm text-[#0b2545] hover:text-[#1f7a8c] hover:bg-white transition-all duration-300 group px-4 py-3 rounded-full shadow-lg"
      >
        <FaArrowLeft className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm tracking-wider font-medium">RETURN HOME</span>
      </Link>

      {/* Hero Section - Full viewport height */}
      <section
        className="relative text-white px-6 md:px-10 overflow-hidden bg-cover bg-bottom bg-fixed min-h-screen flex items-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b2545]/85 via-[#1f7a8c]/70 to-[#0b2545]/85"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left w-full pt-20">
          {/* Removed the button from here since it's now fixed at top */}

          <ScrollAnimatedItem threshold={0.1} introDone={introDone}>
            <h1 className="text-5xl md:text-7xl font-bold max-w-3xl leading-tight mb-6">
              Our Projects
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-green-100 max-w-2xl leading-relaxed">
              Discover our ongoing and completed developments across CALABARZON—where quality materials,
              sustainable practices, and engineering excellence converge.
            </p>
          </ScrollAnimatedItem>
        </div>
      </section>

      {/* Ongoing Projects Section - Matches About.jsx styling */}
      <section className="py-16 md:py-20 px-6 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimatedItem threshold={0.1} introDone={introDone}>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-[#1f7a8c]">
                  <FaHardHat className="text-xl" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0b2545]">Ongoing Projects</h2>
              </div>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Current developments showcasing our commitment to timely execution and quality craftsmanship
              </p>
            </div>
          </ScrollAnimatedItem>

          <div className="space-y-12">
            {ongoingProjects.map((project, index) => (
              <ScrollAnimatedItem
                key={project.id}
                threshold={0.2}
                introDone={introDone}
                className="group"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Image */}
                  <PerspectiveCard enableTilt maxRotate={6} className="rounded-2xl overflow-hidden shadow-lg">
                    <div
                      onClick={() => openProject(project)}
                      className="cursor-pointer relative h-64 md:h-80"
                    >
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
                      onClick={() => openProject(project)}
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
            ))}
          </div>
        </div>
      </section>

      {/* Completed Projects Section - Matches Services.jsx styling */}
      <section className="py-16 md:py-20 px-6 md:px-10 bg-gray-50 rounded-t-[120px]">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimatedItem threshold={0.1} introDone={introDone}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0b2545] mb-4">
                Completed Projects
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Explore our legacy of successful developments—from land preparation to final construction
              </p>
            </div>
          </ScrollAnimatedItem>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {completedProjects.map((project, index) => (
              <ScrollAnimatedItem
                key={project.id}
                threshold={0.15}
                introDone={introDone}
                className="transform transition-all duration-500 hover:-translate-y-2"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <PerspectiveCard
                  enableTilt
                  maxRotate={8}
                  defaultRotateY={-3}
                  className="h-full"
                >
                  <div
                    onClick={() => openProject(project)}
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 cursor-pointer h-full flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#0b2545] px-2.5 py-1 rounded-full text-xs font-medium shadow-sm">
                        {project.year}
                      </div>
                      <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 px-2.5 py-1 rounded-full text-xs shadow-sm">
                        {project.images.length} photos
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-bold mb-3 text-[#0b2545] group-hover:text-[#1f7a8c] transition-colors line-clamp-2">
                        {project.title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-green-50 text-green-800 rounded-full text-xs font-medium">
                          {project.category?.toUpperCase()}
                        </span>
                        {project.area && (
                          <span className="px-3 py-1 bg-gray-50 text-gray-700 rounded-full text-xs">
                            {project.area}
                          </span>
                        )}
                      </div>

                      {/* Partners */}
                      {project.partnerLogos && project.partnerLogos.length > 0 && (
                        <div className="pt-3 border-t border-gray-100 mt-auto">
                          <div className="flex items-center gap-2">
                            <FaCheck className="text-green-600 text-sm" />
                            <span className="text-xs text-gray-500">Completed with trusted partners</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </PerspectiveCard>
              </ScrollAnimatedItem>
            ))}
          </div>
        </div>
      </section>

      {/* Light-Themed Modal */}
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
                    className={`absolute inset-0 w-full h-full object-contain bg-white p-4 transition-opacity duration-500 ${idx === activeIndex ? 'opacity-100' : 'opacity-0'}`}
                    loading={idx === 0 ? "eager" : "lazy"}
                  />
                ))}

                {/* Navigation */}
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
                        <div className="text-sm font-semibold text-[#0b2545]">{activeProject.year}</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                    <div className="mt-1 p-1.5 bg-green-100 rounded-lg">
                      <FaImages className="text-green-700" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Total Images</div>
                      <div className="text-sm font-semibold text-[#0b2545]">{activeProject.images.length}</div>
                    </div>
                  </div>
                  {activeProject.area && (
                    <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg col-span-2">
                      <div className="mt-1 p-1.5 bg-gray-200 rounded-lg">
                        <FaMapMarkerAlt className="text-gray-600" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Location</div>
                        <div className="text-sm font-semibold text-[#0b2545]">{activeProject.area}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Partners */}
                {(activeProject.partnerLogos || []).length > 0 && (
                  <div className="mb-6">
                    <div className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                      <FaCheck className="text-green-600" /> Project Partners
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
                  <div ref={thumbnailRef} className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                    {activeProject.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${index === activeIndex ? 'border-[#1f7a8c]' : 'border-transparent hover:border-gray-300'}`}
                        style={{ width: "72px", height: "54px" }}
                        aria-label={`View image ${index + 1}`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
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
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
        .animate-float { 
          animation: float 8s ease-in-out infinite; 
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Modal responsive */
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