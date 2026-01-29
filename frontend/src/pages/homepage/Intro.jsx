// Intro.jsx
import React, { useEffect, useRef, useState } from "react";

export default function Intro({ logoSrc, title, onFinish }) {
    const overlayRef = useRef(null);
    const logoRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    const [typedTitle, setTypedTitle] = useState("");

    useEffect(() => {
        const overlay = overlayRef.current;
        const logo = logoRef.current;
        const titleEl = titleRef.current;
        const subtitleEl = subtitleRef.current;

        if (!overlay || !logo || !titleEl || !subtitleEl) return;

        // INITIAL STATE
        logo.style.opacity = "0";
        titleEl.style.opacity = "1";
        subtitleEl.style.opacity = "0";
        subtitleEl.style.transform = "translateY(-8px)";

        const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

        const playIntro = async () => {
            // Fade logo in
            await sleep(100);
            logo.style.transition = "opacity 800ms ease-in-out";
            logo.style.opacity = "1";
            await sleep(800);

            // Typing effect
            for (let i = 0; i <= title.length; i++) {
                setTypedTitle(title.slice(0, i));
                await sleep(80);
            }

            // Show subtitle
            subtitleEl.style.transition = "opacity 500ms ease, transform 500ms ease";
            subtitleEl.style.opacity = "1";
            subtitleEl.style.transform = "translateY(0)";
            await sleep(700);

            // Logo loop
            logo.style.animation = "logoLoop 1.8s ease-in-out infinite alternate";
            await sleep(800);

            // Move logo to navbar smoothly
            const target = document.getElementById("nav-logo");
            if (!target) {
                overlay.style.opacity = "0";
                await sleep(400);
                onFinish?.();
                return;
            }

            const logoRect = logo.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();

            // Stop loop
            logo.style.animation = "none";

            // Calculate translation
            const dx = targetRect.left + targetRect.width / 2 - (logoRect.left + logoRect.width / 2);
            const dy = targetRect.top + targetRect.height / 2 - (logoRect.top + logoRect.height / 2);
            const scale = targetRect.width / logoRect.width;

            // Capture current position relative to viewport
            const computed = getComputedStyle(logo);
            const matrix = new DOMMatrixReadOnly(computed.transform);
            const currentX = matrix.m41 || 0;
            const currentY = matrix.m42 || 0;

            // Make logo fixed at same position
            logo.style.position = "fixed";
            logo.style.left = `${logoRect.left}px`;
            logo.style.top = `${logoRect.top}px`;
            logo.style.width = `${logoRect.width}px`;
            logo.style.height = `${logoRect.height}px`;
            logo.style.margin = "0";
            logo.style.zIndex = "9999";

            // Reset transform to current computed offset so it doesn't jump
            logo.style.transform = `translate(0px, 0px) scale(1)`;
            logo.style.transition = "transform 700ms cubic-bezier(.2,.9,.2,1)";

            // Animate to navbar
            requestAnimationFrame(() => {
                logo.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
            });

            // Wait for animation
            await sleep(700);

            // Fade text
            titleEl.style.transition = "opacity 400ms ease";
            subtitleEl.style.transition = "opacity 400ms ease";
            titleEl.style.opacity = "0";
            subtitleEl.style.opacity = "0";

            // Fade overlay
            overlay.style.transition = "background-color 400ms ease, backdrop-filter 400ms ease";
            overlay.style.backgroundColor = "transparent";
            overlay.style.backdropFilter = "blur(0px)";

            // Finish intro
            await sleep(400);
            onFinish?.();
        };

        playIntro();
    }, [onFinish, title]);

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-md"
        >
            <style>
                {`
                    @keyframes logoLoop {
                        0% { transform: translateY(0) scale(1); }
                        50% { transform: translateY(-8px) scale(1.02); }
                        100% { transform: translateY(0) scale(1); }
                    }
                `}
            </style>
            <div className="flex flex-col items-center gap-2 overflow-hidden">
                <img
                    ref={logoRef}
                    src={logoSrc}
                    alt="logo"
                    className="w-36 md:w-48 h-auto"
                    style={{ willChange: "transform, opacity" }}
                />
                <h1
                    ref={titleRef}
                    className="text-2xl md:text-4xl font-bold text-[#0b2545] flex"
                    style={{ willChange: "opacity" }}
                >
                    {typedTitle.split("").map((char, i) => (
                        <span key={i} style={{ opacity: 1, transition: "opacity 0.3s" }}>
                            {char}
                        </span>
                    ))}
                </h1>
                <h2
                    ref={subtitleRef}
                    className="text-sm md:text-base font-semibold text-[#0b2545] opacity-0 transform -translate-y-2"
                >
                    CORPORATION
                </h2>
            </div>
        </div>
    );
}
