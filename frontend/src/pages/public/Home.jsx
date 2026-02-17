import React, { useEffect, useState, useRef, forwardRef, useCallback } from "react";
import { LuInfinity } from "react-icons/lu";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import { useNavigate } from "react-router-dom";
import office from "/office.jpg";
import { LetterReveal } from "../../hooks/RevealAnimations";

// ------------------------------------------------------------
// Smooth mouse‑avoidance icon with rotation – always floating
// ------------------------------------------------------------
const FloatingInfinityIcon = forwardRef(
    ({ className, animClass, floatClass, iconClass }, ref) => {
        const [isHovered, setIsHovered] = useState(false);
        const iconRef = useRef(null);

        const targetRef = useRef({ x: 0, y: 0, rotate: 0 });
        const currentRef = useRef({ x: 0, y: 0, rotate: 0 });
        const rafRef = useRef(null);

        const SMOOTHING = 0.12;

        const animate = useCallback(() => {
            const { x: tx, y: ty, rotate: tr } = targetRef.current;
            let { x, y, rotate } = currentRef.current;

            const newX = x + (tx - x) * SMOOTHING;
            const newY = y + (ty - y) * SMOOTHING;

            let rotDiff = tr - rotate;
            if (rotDiff > 180) rotDiff -= 360;
            if (rotDiff < -180) rotDiff += 360;
            const newRot = rotate + rotDiff * SMOOTHING;

            currentRef.current = { x: newX, y: newY, rotate: newRot };

            if (iconRef.current) {
                iconRef.current.style.transform = `translate(${newX}px, ${newY}px) rotate(${newRot}deg)`;
            }

            if (
                Math.abs(newX - tx) > 0.1 ||
                Math.abs(newY - ty) > 0.1 ||
                Math.abs(newRot - tr) > 0.1
            ) {
                rafRef.current = requestAnimationFrame(animate);
            } else {
                currentRef.current = { x: tx, y: ty, rotate: tr };
                if (iconRef.current) {
                    iconRef.current.style.transform = `translate(${tx}px, ${ty}px) rotate(${tr}deg)`;
                }
                rafRef.current = null;
            }
        }, []);

        const startAnimation = useCallback(() => {
            if (!rafRef.current) {
                rafRef.current = requestAnimationFrame(animate);
            }
        }, [animate]);

        useEffect(() => {
            return () => {
                if (rafRef.current) {
                    cancelAnimationFrame(rafRef.current);
                    rafRef.current = null;
                }
            };
        }, []);

        useEffect(() => {
            if (!isHovered) {
                targetRef.current = { x: 0, y: 0, rotate: 0 };
                startAnimation();
            }
        }, [isHovered, startAnimation]);

        const handleMouseMove = (e) => {
            if (!iconRef.current) return;

            const rect = iconRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const dx = centerX - mouseX;
            const dy = centerY - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 1) {
                targetRef.current = { x: 0, y: 0, rotate: 0 };
            } else {
                const dirX = dx / distance;
                const dirY = dy / distance;

                const maxPush = 20;
                const pushDistance = Math.min(
                    maxPush,
                    maxPush * (1 / (distance * 0.1 + 0.5))
                );
                const newX = dirX * pushDistance;
                const newY = dirY * pushDistance;

                const angle = Math.atan2(dirY, dirX) * (180 / Math.PI);
                targetRef.current = { x: newX, y: newY, rotate: angle };
            }

            startAnimation();
        };

        return (
            <div ref={ref} className={`${className} ${floatClass} ${animClass}`}>
                <div
                    ref={iconRef}
                    className="inline-block will-change-transform"
                    style={{ transform: "translate(0px, 0px) rotate(0deg)" }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onMouseMove={handleMouseMove}
                >
                    <LuInfinity className={iconClass} />
                </div>
            </div>
        );
    }
);

FloatingInfinityIcon.displayName = "FloatingInfinityIcon";

// ------------------------------------------------------------
// Main Home component – fully responsive
// ------------------------------------------------------------
export default function Home({ introDone = true }) {
    const navigate = useNavigate();

    const [buttonsRef, buttonsAnim] = useScrollAnimation(0.1, introDone);
    const [float1Ref, float1Anim] = useScrollAnimation(0.1, introDone);
    const [float2Ref, float2Anim] = useScrollAnimation(0.1, introDone);

    const [heroRevealed, setHeroRevealed] = useState(false);
    const [headingRevealed, setHeadingRevealed] = useState(false);

    useEffect(() => {
        if (introDone) {
            setHeroRevealed(true);
            const headingTimer = setTimeout(() => setHeadingRevealed(true), 200);
            return () => clearTimeout(headingTimer);
        }
    }, [introDone]);

    // Set CSS variable for viewport height (fixes mobile issues)
    useEffect(() => {
        const setVh = () => {
            document.documentElement.style.setProperty(
                "--vh",
                `${window.innerHeight * 0.01}px`
            );
        };
        setVh();
        window.addEventListener("resize", setVh);
        return () => window.removeEventListener("resize", setVh);
    }, []);

    return (
        <section
            id="home"
            className="relative text-white px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden transition-all duration-1000 bg-cover bg-center md:bg-fixed flex items-center"
            style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }}
        >
            {/* Background Image */}
            <img
                src={office}
                alt="Office background"
                className="absolute inset-0 w-full h-full object-cover animate-pan will-change-transform"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Content */}
            <div className="max-w-6xl w-full mx-auto relative z-10 text-left">
                {/* Heading – responsive + fluid scaling */}
                <h1
                    className="font-bold leading-tight mb-4 sm:mb-6 drop-shadow-lg"
                    style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
                >
                    <LetterReveal
                        active={headingRevealed}
                        lines={["Building Excellence,", "Delivering Trust"]}
                        letterDelay={0.05}
                    />
                </h1>

                {/* Buttons – responsive text and padding */}
                <div
                    ref={buttonsRef}
                    className={`mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 ${buttonsAnim}`}
                >
                    <button
                        onClick={() => navigate("/contact")}
                        className="w-full sm:w-auto bg-green-400 hover:bg-green-500 text-[#0b2545] 
                       px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3 
                       rounded-sm font-semibold text-sm sm:text-base md:text-lg 
                       transition-all duration-300 transform hover:scale-105 
                       hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300"
                    >
                        Request a Quote
                    </button>

                    <button
                        onClick={() => navigate("/projects")}
                        className="w-full sm:w-auto border-2 border-white text-white 
                       hover:text-green-400 hover:border-green-400 
                       px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3 
                       rounded-sm font-semibold text-sm sm:text-base md:text-lg 
                       transition-all duration-300 transform hover:scale-105 
                       focus:outline-none focus:ring-4 focus:ring-white"
                    >
                        View Projects
                    </button>
                </div>
            </div>

            {/* Floating Icons – hidden on mobile/tablet, visible on large screens */}
            <FloatingInfinityIcon
                ref={float1Ref}
                className="absolute top-1/4 right-6 md:right-12 hidden lg:block"
                floatClass="animate-float"
                animClass={float1Anim}
                iconClass="w-12 h-12 lg:w-16 lg:h-16 text-green-400 opacity-20"
            />

            <FloatingInfinityIcon
                ref={float2Ref}
                className="absolute bottom-1/4 left-6 md:left-12 hidden lg:block animation-delay-1000"
                floatClass="animate-float"
                animClass={float2Anim}
                iconClass="w-10 h-10 lg:w-14 lg:h-14 text-white opacity-10"
            />
        </section>
    );
}
