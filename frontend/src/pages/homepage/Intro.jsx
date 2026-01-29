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
        logo.style.transform = "translateX(-120vw)";
        logo.style.opacity = "1";

        titleEl.style.opacity = "1"; // letters controlled individually
        subtitleEl.style.opacity = "0";

        // PHASE 1 — logo slides in from left
        setTimeout(() => {
            logo.style.transition = "transform 800ms cubic-bezier(.2,.9,.2,1)";
            logo.style.transform = "translateX(0)";
        }, 100);

        // PHASE 2 — typing effect for title
        setTimeout(() => {
            let index = 0;
            const interval = setInterval(() => {
                setTypedTitle(title.slice(0, index + 1));
                index++;
                if (index === title.length) clearInterval(interval);
            }, 80); // typing speed
        }, 500);

        // PHASE 3 — show subtitle after typing
        const subtitleDelay = 500 + title.length * 80 + 200;
        setTimeout(() => {
            subtitleEl.style.transition = "opacity 500ms ease, transform 500ms ease";
            subtitleEl.style.opacity = "1";
            subtitleEl.style.transform = "translateY(0)";
        }, subtitleDelay);

        // PHASE 4 — add loop animation to logo
        const loopDelay = subtitleDelay;
        setTimeout(() => {
            logo.style.animation = "logoLoop 1.8s ease-in-out infinite alternate";
        }, loopDelay);

        // PHASE 5 — move logo to navbar
        const exitDelay = loopDelay + 800; // loop for ~0.8s
        setTimeout(() => {
            const target = document.getElementById("nav-logo");
            if (!target) {
                overlay.style.opacity = "0"; // fallback
                setTimeout(() => onFinish?.(), 400);
                return;
            }

            const targetRect = target.getBoundingClientRect();
            const logoRect = logo.getBoundingClientRect();

            const dx =
                targetRect.left +
                targetRect.width / 2 -
                (logoRect.left + logoRect.width / 2);
            const dy =
                targetRect.top +
                targetRect.height / 2 -
                (logoRect.top + logoRect.height / 2);
            const scale = targetRect.width / logoRect.width;

            // stop looping
            logo.style.animation = "none";

            // Animate only the logo
            logo.style.transition = "transform 700ms cubic-bezier(.2,.9,.2,1)";
            requestAnimationFrame(() => {
                logo.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
            });

            // Fade out the overlay background only
            overlay.style.transition = "background-color 700ms ease, backdrop-filter 700ms ease";
            overlay.style.backgroundColor = "transparent";
            overlay.style.backdropFilter = "blur(0px)";

            // Fade out title and subtitle
            titleEl.style.transition = "opacity 400ms ease";
            subtitleEl.style.transition = "opacity 400ms ease";
            titleEl.style.opacity = "0";
            subtitleEl.style.opacity = "0";

            // Finish after animation completes
            setTimeout(() => onFinish?.(), 800);
        }, exitDelay);
    }, [onFinish, title]);

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-md"
        >
            <style>
                {`
          @keyframes logoLoop {
            0% { transform: translateX(0) translateY(0) scale(1); }
            50% { transform: translateX(0) translateY(-8px) scale(1.02); }
            100% { transform: translateX(0) translateY(0) scale(1); }
          }
        `}
            </style>
            <div className="flex flex-col items-center gap-2 overflow-hidden">
                <img
                    ref={logoRef}
                    src={logoSrc}
                    alt="logo"
                    className="w-36 md:w-48 h-auto"
                    style={{ willChange: "transform" }}
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
