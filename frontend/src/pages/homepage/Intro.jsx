import React, { useEffect, useRef, useState } from "react";
import { MdFastForward } from "react-icons/md";

export default function Intro({ logoSrc, title, onFinish }) {
    const overlayRef = useRef(null);
    const logoRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const skipRef = useRef(false); // controls speed
    const hasPlayed = useRef(false); // prevent double execution in Strict Mode

    const [typedTitle, setTypedTitle] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const [skipActive, setSkipActive] = useState(false);

    useEffect(() => {
        if (hasPlayed.current) return; // prevent double execution
        hasPlayed.current = true;

        const overlay = overlayRef.current;
        const logo = logoRef.current;
        const titleEl = titleRef.current;
        const subtitleEl = subtitleRef.current;

        if (!overlay || !logo || !titleEl || !subtitleEl) return;

        // Reset skip and initial styles
        skipRef.current = false;
        logo.style.opacity = "0";
        titleEl.style.opacity = "1";
        subtitleEl.style.opacity = "0";
        subtitleEl.style.transform = "translateY(-8px)";

        // Consistent sleep function
        const sleep = (ms) =>
            new Promise((res) => setTimeout(res, skipRef.current ? ms / 2 : ms));

        const playIntro = async () => {
            // Fade logo in
            await sleep(100);
            logo.style.transition = "opacity 800ms ease-in-out";
            logo.style.opacity = "1";
            await sleep(800);

            // Typing effect
            setIsTyping(true);
            for (let i = 0; i <= title.length; i++) {
                setTypedTitle(title.slice(0, i));
                await sleep(80);
            }
            setIsTyping(false);

            // Show subtitle
            subtitleEl.style.transition = "opacity 500ms ease, transform 500ms ease";
            subtitleEl.style.opacity = "1";
            subtitleEl.style.transform = "translateY(0)";
            await sleep(700);

            // Logo idle loop
            logo.style.animation = "logoLoop 1.8s ease-in-out infinite alternate";
            await sleep(800);

            // === Exit texts first ===
            titleEl.style.transition = "opacity 500ms ease, transform 500ms ease";
            subtitleEl.style.transition = "opacity 500ms ease, transform 500ms ease";
            titleEl.style.opacity = "0";
            titleEl.style.transform = "translateY(-20px)";
            subtitleEl.style.opacity = "0";
            subtitleEl.style.transform = "translateY(-20px)";

            await sleep(500); // wait for text to fully exit

            // Move logo to navbar
            const target = document.getElementById("nav-logo");
            if (!target) {
                overlay.style.opacity = "0";
                await sleep(400);
                onFinish?.();
                return;
            }

            const logoRect = logo.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();
            logo.style.animation = "none";

            const dx =
                targetRect.left + targetRect.width / 2 - (logoRect.left + logoRect.width / 2);
            const dy =
                targetRect.top + targetRect.height / 2 - (logoRect.top + logoRect.height / 2);
            const scale = targetRect.width / logoRect.width;

            // Lock logo position
            logo.style.position = "fixed";
            logo.style.left = `${logoRect.left}px`;
            logo.style.top = `${logoRect.top}px`;
            logo.style.width = `${logoRect.width}px`;
            logo.style.height = `${logoRect.height}px`;
            logo.style.margin = "0";
            logo.style.zIndex = "9999";
            logo.style.transform = "translate(0,0) scale(1)";

            const moveDuration = skipRef.current ? 600 : 1200;
            logo.style.transition = `transform ${moveDuration}ms cubic-bezier(.22,1,.36,1)`;

            // Wait a frame for browser to paint initial transform
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    logo.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
                });
            });

            await sleep(moveDuration);

            // Fade out overlay after logo finished moving
            overlay.style.transition = "background-color 400ms ease, backdrop-filter 400ms ease";
            overlay.style.backgroundColor = "rgba(0,0,0,0)";
            overlay.style.backdropFilter = "blur(0px)";

            await sleep(400);
            onFinish?.();
        };

        playIntro();
    }, [onFinish, title]);

    // Handle skip click
    const handleSkip = () => {
        skipRef.current = true;
        setSkipActive(true);
    };

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
        >
            <style>
                {`
          @keyframes logoLoop {
            0% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-8px) scale(1.02); }
            100% { transform: translateY(0) scale(1); }
          }

          .wave-char { opacity: 0; animation: waveFade 400ms ease forwards; }
          @keyframes waveFade { from {opacity:0; transform:translateY(6px);} to {opacity:1; transform:translateY(0);} }

          .cursor { font-weight: 400; }
          .blink { animation: blink 1s steps(2, start) infinite; }
          @keyframes blink { 0% {opacity:1;} 50% {opacity:0;} 100% {opacity:1;} }

          .skip-btn {
            transition: transform 150ms ease, text-shadow 150ms ease, opacity 150ms ease, color 150ms ease;
          }
          .skip-btn:hover {
            transform: scale(1.2);
            text-shadow: 0 0 12px rgba(255,255,255,0.8);
            opacity: 1;
          }
          .skip-active {
            color: #3cff66;
            text-shadow: 0 0 16px rgba(0,255,234,0.9);
          }
        `}
            </style>

            {/* Skip button */}
            <button
                onClick={handleSkip}
                className={`fixed top-4 right-4 z-50 text-3xl opacity-80 hover:opacity-100 skip-btn text-white ${skipActive ? "skip-active" : ""
                    }`}
                aria-label="Skip Intro"
            >
                <MdFastForward />
            </button>

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
                    className="text-2xl md:text-4xl font-bold flex items-center"
                    style={{
                        color: "#fff",
                        textShadow: `0 1px 2px rgba(0,0,0,0.35),0 0 12px rgba(255,255,255,0.25)`,
                    }}
                >
                    {typedTitle.split("").map((char, i) => (
                        <span
                            key={i}
                            className="wave-char"
                            style={{ animationDelay: `${i * 40}ms` }}
                        >
                            {char}
                        </span>
                    ))}
                    <span className={`ml-1 cursor ${isTyping ? "blink" : ""}`}>|</span>
                </h1>

                <h2
                    ref={subtitleRef}
                    className="text-sm md:text-base font-semibold opacity-0 transform -translate-y-2"
                    style={{
                        color: "#fff",
                        textShadow: `0 1px 2px rgba(0,0,0,0.35),0 0 12px rgba(255,255,255,0.25)`,
                    }}
                >
                    CORPORATION
                </h2>
            </div>
        </div>
    );
}
