import React, { useState, useEffect, useRef } from "react";
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaImages,
  FaMapMarkerAlt,
  FaHardHat,
  FaInfinity,
} from "react-icons/fa";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import PerspectiveCard from "../../components/PerspectiveCard";
import BackgroundDecor from "../../components/BackgroundDecor";
import { projects } from "./projectsData";
import heroImage from "/projects/northport_ongoing/northport_img_5.jpg";
import { BlockReveal, LetterReveal } from "../../components/RevealAnimations";

// ========== Animated Drag Indicator for Mobile (No Progress Bar) ==========
const DragIndicator = ({ isDragging, dragOffset, totalSlides, currentSlide }) => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 md:hidden flex flex-col items-center gap-2">
      {/* Animated swipe cue - bounces when idle */}
      <div className={`flex items-center gap-1.5 transition-transform duration-200 ${isDragging ? 'scale-95' : 'animate-bounce-subtle'}`}>
        {/* Left chevron - fades when dragging right */}
        <FaChevronLeft
          className={`text-[#0b2545]/60 transition-all duration-200 ${isDragging && dragOffset > 20 ? 'opacity-30 scale-90' : 'opacity-100'
            }`}
          size={14}
        />

        {/* Animated dots showing slide position */}
        <div className="flex items-center gap-1.5 px-2">
          {Array.from({ length: Math.min(totalSlides, 5) }).map((_, idx) => {
            // Calculate approximate slide index based on drag offset
            const approximateIndex = currentSlide + (dragOffset / window.innerWidth);
            const isActive = idx === currentSlide ||
              (isDragging && idx === Math.round(approximateIndex));
            const distance = Math.abs(idx - currentSlide);

            return (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${isActive
                    ? 'bg-[#1f7a8c] scale-110 shadow-sm'
                    : `bg-[#0b2545]/30 ${distance === 1 ? 'scale-90' : 'scale-75'}`
                  }`}
                style={{
                  transform: `scale(${isActive ? 1.1 : 1 - distance * 0.1})`,
                  opacity: isActive ? 1 : Math.max(0.3, 1 - distance * 0.3)
                }}
              />
            );
          })}
        </div>

        {/* Right chevron - fades when dragging left */}
        <FaChevronRight
          className={`text-[#0b2545]/60 transition-all duration-200 ${isDragging && dragOffset < -20 ? 'opacity-30 scale-90' : 'opacity-100'
            }`}
          size={14}
        />
      </div>

      {/* Contextual hint text */}
      <span className="text-[10px] text-[#0b2545]/50 font-medium tracking-wide">
        {isDragging ? 'Release to navigate' : 'Swipe to explore'}
      </span>
    </div>
  );
};

// ========== Full‑screen slide component ==========
const ProjectSlide = ({ project, index, onClick }) => {
  const isOngoing = project.category === "ongoing";
  return (
    <div className="w-full min-h-[70vh] md:h-full flex-shrink-0 flex items-start md:items-center justify-center bg-white">
      <div className="max-w-7xl mx-auto w-full h-auto md:h-full px-6 md:px-10 py-6">
        <div className="grid md:grid-cols-2 gap-8 items-start md:items-center w-full h-auto md:h-full">
          <div className="h-auto md:h-full">
            <PerspectiveCard enableTilt maxRotate={6} className="rounded-2xl overflow-hidden shadow-lg">
              <div onClick={onClick} className="cursor-pointer relative w-full h-64 md:h-full group">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b2545] via-transparent to-transparent opacity-70" />
                <div className={`absolute top-4 right-4 ${isOngoing ? 'bg-green-400' : 'bg-blue-500'} text-white px-3 py-1 rounded-full text-sm font-bold shadow-md`}>
                  {isOngoing ? 'ONGOING' : 'COMPLETED'}
                </div>
              </div>
            </PerspectiveCard>
          </div>

          <div className="h-auto flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-[#1f7a8c] font-bold text-lg">0{index + 1}</div>
              <div className="h-px flex-1 bg-gradient-to-r from-[#1f7a8c] to-transparent" />
            </div>

            <h3
              onClick={onClick}
              className="text-2xl md:text-3xl font-bold mb-4 cursor-pointer hover:text-[#1f7a8c] transition-colors"
            >
              {project.title}
            </h3>

            <p className="text-gray-600 mb-6 leading-relaxed text-base md:text-lg">
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

            {project.partnerLogos && project.partnerLogos.length > 0 && (
              <div className="pt-4 mt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700">Partners:</span>
                  <div className="flex -space-x-2 flex-wrap">
                    {project.partnerLogos.map((logo, idx) => (
                      <div
                        key={idx}
                        className="w-10 h-10 rounded-full bg-gray-100 border-2 border-white overflow-hidden flex-shrink-0"
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
      </div>
    </div>
  );
};

// ========== Detailed project item ==========
const ProjectListItem = ({ project, index, onClick }) => (
  <div className="group py-8 first:pt-0 last:pb-0">
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <PerspectiveCard enableTilt maxRotate={6} className="rounded-2xl overflow-hidden shadow-lg">
        <div onClick={onClick} className="cursor-pointer relative h-64 md:h-80">
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b2545] via-transparent to-transparent opacity-70" />
          <div className={`absolute top-4 right-4 ${project.category === 'ongoing' ? 'bg-green-400' : 'bg-blue-500'} text-white px-3 py-1 rounded-full text-sm font-bold shadow-md`}>
            {project.category === 'ongoing' ? 'ONGOING' : 'COMPLETED'}
          </div>
        </div>
      </PerspectiveCard>

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

        <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>

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

        {project.partnerLogos && project.partnerLogos.length > 0 && (
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Partners:</span>
              <div className="flex -space-x-2 flex-wrap">
                {project.partnerLogos.map((logo, idx) => (
                  <div
                    key={idx}
                    className="w-10 h-10 rounded-full bg-gray-100 border-2 border-white overflow-hidden flex-shrink-0"
                  >
                    <img src={logo} alt="Partner" className="w-full h-full object-contain p-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

// ========== Carousel view – responsive height and smooth drag ==========
const CarouselView = ({
  ongoingProjects,
  currentSlide,
  goToSlide,
  openProject,
  carouselRef,
  dragOffset,
  isDragging
}) => {
  const totalSlides = ongoingProjects.length;
  const isFirst = currentSlide === 0;
  const isLast = currentSlide === totalSlides - 1;

  return (
    <div
      ref={carouselRef}
      className="relative w-full min-h-[70vh] md:h-screen overflow-hidden bg-white"
      style={{ touchAction: 'pan-y' }}
    >
      {/* Background decor for carousel */}
      <BackgroundDecor pattern="dots" color="green" opacity={0.1} blurCircles={true} />

      <div
        className={`flex h-auto md:h-full ${!isDragging ? 'transition-transform duration-700' : ''}`}
        style={{
          transform: `translateX(calc(-${currentSlide * 100}vw + ${dragOffset}px))`,
          transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
        }}
      >
        {ongoingProjects.map((project, idx) => (
          <ProjectSlide
            key={project.id}
            project={project}
            index={idx}
            onClick={() => openProject(project)}
          />
        ))}
      </div>

      {/* Desktop navigation bar – hidden on mobile */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 items-center gap-6 hidden md:flex">
        <div className="w-12 h-px bg-green-400" />
        <button
          onClick={() => goToSlide(currentSlide - 1)}
          disabled={isFirst}
          className="w-12 h-12 flex items-center justify-center bg-white/80 backdrop-blur-sm text-[#0b2545] rounded-full shadow-md transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-xl active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
          aria-label="Previous project"
        >
          <FaChevronLeft className="text-2xl" />
        </button>
        <FaInfinity className="text-2xl text-black-600" />
        <button
          onClick={() => goToSlide(currentSlide + 1)}
          disabled={isLast}
          className="w-12 h-12 flex items-center justify-center bg-white/80 backdrop-blur-sm text-[#0b2545] rounded-full shadow-md transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-xl active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
          aria-label="Next project"
        >
          <FaChevronRight className="text-2xl" />
        </button>
        <div className="w-12 h-px bg-blue-400" />
      </div>

      {/* Mobile animated drag indicator */}
      <DragIndicator
        isDragging={isDragging}
        dragOffset={dragOffset}
        totalSlides={ongoingProjects.length}
        currentSlide={currentSlide}
      />
    </div>
  );
};

// ========== Completed projects list ==========
const CompletedList = ({ completedProjects, openProject }) => {
  if (completedProjects.length === 0) return null;

  return (
    <div className="relative bg-white px-6 md:px-10 py-16 md:py-20 overflow-hidden">
      {/* Background decor for completed list */}
      <BackgroundDecor pattern="grid" color="blue" opacity={0.1} blurCircles={true} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-8 justify-end">
          <h3 className="text-2xl md:text-3xl font-bold text-[#0b2545]">Completed Projects</h3>
          <FaInfinity className="text-blue-600 text-2xl" />
          <div className="h-px w-16 bg-blue-300" />
        </div>
        <div className="divide-y divide-gray-200">
          {completedProjects.map((project, index) => (
            <ProjectListItem
              key={project.id}
              project={project}
              index={index}
              onClick={() => openProject(project)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ========== Combined carousel + completed ==========
const CarouselWithCompleted = ({
  ongoingProjects,
  completedProjects,
  currentSlide,
  goToSlide,
  openProject,
  carouselRef,
  dragOffset,
  isDragging
}) => {
  return (
    <>
      <CarouselView
        ongoingProjects={ongoingProjects}
        currentSlide={currentSlide}
        goToSlide={goToSlide}
        openProject={openProject}
        carouselRef={carouselRef}
        dragOffset={dragOffset}
        isDragging={isDragging}
      />
      <CompletedList completedProjects={completedProjects} openProject={openProject} />
    </>
  );
};

// ========== Expanded view ==========
const ExpandedView = ({ allProjects, openProject }) => {
  return (
    <div className="relative bg-white px-6 md:px-10 py-16 md:py-20 overflow-hidden">
      {/* Background decor for expanded view */}
      <BackgroundDecor pattern="lines" color="green" opacity={0.1} blurCircles={true} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="divide-y divide-gray-200">
          {allProjects.map((project, index) => (
            <ProjectListItem
              key={project.id}
              project={project}
              index={index}
              onClick={() => openProject(project)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Projects({ introDone = true }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [viewMode, setViewMode] = useState('carousel');
  const [displayedView, setDisplayedView] = useState('carousel');
  const [fadeState, setFadeState] = useState('visible');
  const isTransitioning = useRef(false);
  const modalRef = useRef(null);
  const thumbnailRef = useRef(null);
  const carouselRef = useRef(null);
  const projectsSectionRef = useRef(null);

  // Drag state for carousel
  const [dragState, setDragState] = useState({ isDragging: false, offset: 0 });
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);
  const dragStartTime = useRef(0);
  const dragLastX = useRef(0);
  const dragLastTime = useRef(0);
  const dragDirection = useRef(null); // 'horizontal' or 'vertical'
  const dragThreshold = 10; // px

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

  const [heroRef, heroAnim] = useScrollAnimation(0.1, introDone);

  const ongoingProjects = projects.filter((p) => p.category === "ongoing");
  const completedProjects = projects.filter((p) => p.category !== "ongoing");
  const allProjects = [...ongoingProjects, ...completedProjects];

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

  const goToSlide = (index) => {
    if (index >= 0 && index < ongoingProjects.length) {
      setCurrentSlide(index);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (isOpen) return;
      if (viewMode !== 'carousel') return;
      if (e.key === "ArrowLeft") goToSlide(currentSlide - 1);
      if (e.key === "ArrowRight") goToSlide(currentSlide + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, viewMode, currentSlide, ongoingProjects.length]);

  // Drag to navigate carousel (with direction detection)
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || isOpen || viewMode !== 'carousel') return;

    const onDragStart = (e) => {
      if (e.type === 'mousedown' && e.button !== 0) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      dragStartX.current = clientX;
      dragStartY.current = clientY;
      dragLastX.current = clientX;
      dragStartTime.current = Date.now();
      dragLastTime.current = Date.now();
      dragDirection.current = null;
      setDragState({ isDragging: true, offset: 0 });
    };

    const onDragMove = (e) => {
      if (!dragState.isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      if (dragDirection.current === null) {
        const deltaX = clientX - dragStartX.current;
        const deltaY = clientY - dragStartY.current;
        if (Math.abs(deltaX) > dragThreshold || Math.abs(deltaY) > dragThreshold) {
          dragDirection.current = Math.abs(deltaX) > Math.abs(deltaY) ? 'horizontal' : 'vertical';
        } else {
          return;
        }
      }

      if (dragDirection.current === 'vertical') {
        setDragState({ isDragging: false, offset: 0 });
        dragDirection.current = null;
        return;
      }

      e.preventDefault();
      const delta = clientX - dragStartX.current;
      const maxSlides = ongoingProjects.length;
      const slideWidth = window.innerWidth;

      let offset = delta;
      if (currentSlide === 0 && delta > 0) offset = delta / 3;
      if (currentSlide === maxSlides - 1 && delta < 0) offset = delta / 3;

      setDragState(prev => ({ ...prev, offset }));

      const now = Date.now();
      const timeDelta = now - dragLastTime.current;
      if (timeDelta > 10) {
        dragLastX.current = clientX;
        dragLastTime.current = now;
      }
    };

    const onDragEnd = () => {
      if (!dragState.isDragging) return;

      if (dragDirection.current === 'vertical') {
        setDragState({ isDragging: false, offset: 0 });
        dragDirection.current = null;
        return;
      }

      const delta = dragState.offset;
      const slideWidth = window.innerWidth;
      const threshold = slideWidth * 0.2;
      const timeDiff = Math.max(1, dragLastTime.current - dragStartTime.current);
      const velocity = (dragLastX.current - dragStartX.current) / timeDiff * 8;

      let newIndex = currentSlide;
      if (Math.abs(delta) > threshold || Math.abs(velocity) > 0.5) {
        const direction = delta > 0 || velocity > 0 ? -1 : 1;
        newIndex = Math.min(Math.max(currentSlide + direction, 0), ongoingProjects.length - 1);
      }

      setCurrentSlide(newIndex);
      setDragState({ isDragging: false, offset: 0 });
      dragDirection.current = null;
    };

    const onMouseLeave = () => {
      if (dragState.isDragging) onDragEnd();
    };

    carousel.addEventListener('touchstart', onDragStart, { passive: true });
    carousel.addEventListener('mousedown', onDragStart);

    const onGlobalMove = (e) => {
      if (!dragState.isDragging) return;
      onDragMove(e);
    };
    const onGlobalUp = () => {
      if (dragState.isDragging) onDragEnd();
    };

    window.addEventListener('touchmove', onGlobalMove, { passive: false });
    window.addEventListener('touchend', onGlobalUp);
    window.addEventListener('mousemove', onGlobalMove);
    window.addEventListener('mouseup', onGlobalUp);
    window.addEventListener('mouseleave', onMouseLeave);

    return () => {
      carousel.removeEventListener('touchstart', onDragStart);
      carousel.removeEventListener('mousedown', onDragStart);
      window.removeEventListener('touchmove', onGlobalMove);
      window.removeEventListener('touchend', onGlobalUp);
      window.removeEventListener('mousemove', onGlobalMove);
      window.removeEventListener('mouseup', onGlobalUp);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isOpen, viewMode, dragState.isDragging, currentSlide, ongoingProjects.length]);

  const switchView = (newView) => {
    if (newView === viewMode || isTransitioning.current) return;
    isTransitioning.current = true;

    setFadeState('hidden');

    setTimeout(() => {
      setViewMode(newView);
      setDisplayedView(newView);
      setFadeState('visible');
      setTimeout(() => {
        isTransitioning.current = false;
      }, 300);
    }, 300);
  };

  useEffect(() => {
    if (projectsSectionRef.current) {
      projectsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [viewMode]);

  return (
    <div className="bg-white text-[#0b2545] overflow-x-hidden">
      {/* Hero section */}
      <div className="relative min-h-screen overflow-hidden lg:hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <BlockReveal active={heroRevealed} rows={8} cols={12} />
        </div>
        {/* Background decor for mobile hero */}
        
        <div className="absolute inset-0 flex flex-col justify-center items-start p-6 md:p-12 bg-black/30">
          <div className="text-sm tracking-[0.3em] uppercase text-white/80 mb-3">Projects</div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            <LetterReveal
              active={textRevealed}
              lines={["Building Progress,", "Delivering", "Excellence"]}
              letterDelay={0.05}
            />
          </h1>
        </div>
      </div>

      <div className="hidden lg:flex flex-col md:flex-row min-h-screen md:h-screen">
        <div className="relative w-full md:w-1/2 h-96 md:h-full order-2 md:order-1 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${heroImage})`, backgroundPosition: "center" }}
          />
          <BlockReveal active={heroRevealed} rows={8} cols={12} />
        </div>
        <div className="relative w-full md:w-1/2 flex flex-col order-1 md:order-2 overflow-hidden">
          {/* Background decor for desktop hero text side */}
         
          <div className="hidden md:block flex-1" />
          <div ref={heroRef} className={`relative z-10 pt-20 md:pt-0 pb-16 md:pb-20 px-6 md:px-12 ${heroAnim}`}>
            <div className="text-sm tracking-[0.3em] uppercase text-gray-600 mb-3">Projects</div>
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

      {/* Projects header with view toggle and subheading */}
      <div ref={projectsSectionRef} className="relative bg-white pt-16 pb-8 px-6 md:px-10 overflow-hidden">
        <BackgroundDecor pattern="grid" color="blue" opacity={0.08} blurCircles={false} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex items-center gap-4">
              {viewMode === 'carousel' ? (
                <>
                  <div className="h-px w-16 bg-green-300"></div>
                  <FaInfinity className="text-green-600 text-2xl" />
                  <h2 className="text-3xl md:text-4xl font-bold text-[#0b2545] leading-tight">
                    Current developments
                  </h2>
                </>
              ) : (
                <>
                  <div className="h-px w-16 bg-blue-300"></div>
                  <FaInfinity className="text-blue-600 text-2xl" />
                  <h2 className="text-3xl md:text-4xl font-bold text-[#0b2545] leading-tight">
                    Complete portfolio
                  </h2>
                </>
              )}
            </div>
            <div className="mt-4 md:mt-0">
              {viewMode === 'carousel' ? (
                <button
                  onClick={() => switchView('expanded')}
                  className="px-4 md:px-8 py-2 md:py-3 bg-[#0b2545] text-white rounded-full hover:bg-[#1f3a5f] transition-colors text-xs md:text-sm font-medium"
                >
                  See all projects →
                </button>
              ) : (
                <button
                  onClick={() => switchView('carousel')}
                  className="px-4 md:px-8 py-2 md:py-3 bg-[#0b2545] text-white rounded-full hover:bg-[#1f3a5f] transition-colors text-xs md:text-sm font-medium"
                >
                  ← Back to featured
                </button>
              )}
            </div>
          </div>

          {/* Brief subheading */}
          <div className="mt-4 max-w-3xl">
            <p className="text-gray-600 text-lg">
              Explore our portfolio of ongoing and completed projects that showcase our commitment to quality, innovation, and sustainable development across the region.
            </p>
          </div>
        </div>
      </div>

      {/* Fade wrapper */}
      <div
        style={{
          opacity: fadeState === 'visible' ? 1 : 0,
          transition: 'opacity 300ms ease-in-out',
        }}
      >
        {displayedView === 'carousel' ? (
          <CarouselWithCompleted
            ongoingProjects={ongoingProjects}
            completedProjects={completedProjects}
            currentSlide={currentSlide}
            goToSlide={goToSlide}
            openProject={openProject}
            carouselRef={carouselRef}
            dragOffset={dragState.offset}
            isDragging={dragState.isDragging}
          />
        ) : (
          <ExpandedView allProjects={allProjects} openProject={openProject} />
        )}
      </div>

      {/* Modal */}
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
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-50 bg-white/90 hover:bg-gray-100 text-[#0b2545] p-2.5 rounded-full shadow-md transition-colors"
                aria-label="Close modal"
              >
                <FaTimes className="text-xl" />
              </button>

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
                <button
                  onClick={() => navigateImage(-1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 backdrop-blur-sm text-[#0b2545] rounded-full shadow-md transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-xl active:scale-95"
                  aria-label="Previous image"
                >
                  <FaChevronLeft className="text-2xl" />
                </button>
                <button
                  onClick={() => navigateImage(1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 backdrop-blur-sm text-[#0b2545] rounded-full shadow-md transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-xl active:scale-95"
                  aria-label="Next image"
                >
                  <FaChevronRight className="text-2xl" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 text-[#0b2545] px-4 py-1.5 rounded-full text-sm font-medium shadow-md">
                  {activeIndex + 1} / {activeProject.images.length}
                </div>
              </div>

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
                          <img src={logo} alt="Partner logo" className="h-8 w-auto object-contain" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-100">
                  <div className="text-xs font-medium text-gray-500 mb-2">Project Gallery</div>
                  <div ref={thumbnailRef} className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                    {activeProject.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${index === activeIndex ? "border-[#1f7a8c]" : "border-transparent hover:border-gray-300"
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
        
        /* Custom subtle bounce animation for idle state */
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
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