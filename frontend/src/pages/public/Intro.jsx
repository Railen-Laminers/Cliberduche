// Intro.jsx
import React, { useEffect, useRef, useState } from "react";
import { MdFastForward } from "react-icons/md";

export default function Intro({ logoSrc, title = "Cliberduche Corporation", onFinish }) {
    const overlayRef = useRef(null);
    const logoRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const circleRef = useRef(null);
    const skipRef = useRef(false);
    const hasPlayed = useRef(false);

    const [typedTitle, setTypedTitle] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const [skipActive, setSkipActive] = useState(false);

    useEffect(() => {
        if (hasPlayed.current) return;
        hasPlayed.current = true;

        const overlay = overlayRef.current;
        const logo = logoRef.current;
        const titleEl = titleRef.current;
        const subtitleEl = subtitleRef.current;
        const circle = circleRef.current;

        if (!overlay || !logo || !titleEl || !subtitleEl || !circle) return;

        skipRef.current = false;

        // Initial state
        logo.style.opacity = "0";
        titleEl.style.opacity = "1";
        subtitleEl.style.opacity = "0";
        subtitleEl.style.transform = "translateY(-8px)";
        circle.style.opacity = "1";

        const sleep = (ms) =>
            new Promise((res) => setTimeout(res, skipRef.current ? Math.max(50, ms / 2) : ms));

        const playIntro = async () => {
            // Fade logo and circle in
            await sleep(100);
            logo.style.transition = "opacity 800ms ease-in-out";
            logo.style.opacity = "1";
            circle.style.transition = "opacity 800ms ease-in-out";
            circle.style.opacity = "1";
            await sleep(800);

            // Typing effect
            setIsTyping(true);
            for (let i = 0; i <= title.length; i++) {
                setTypedTitle(title.slice(0, i));
                await sleep(70);
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

            // Exit text AND circle simultaneously
            titleEl.style.transition = "opacity 500ms ease, transform 500ms ease";
            subtitleEl.style.transition = "opacity 500ms ease, transform 500ms ease";
            circle.style.transition = "opacity 500ms ease";

            // Stop the pulse animation immediately
            circle.style.animation = "none";

            // Start fades and transforms together
            titleEl.style.opacity = "0";
            titleEl.style.transform = "translateY(-20px)";
            subtitleEl.style.opacity = "0";
            subtitleEl.style.transform = "translateY(-20px)";
            circle.style.opacity = "0";

            await sleep(500); // wait for fade-out to finish

            // Move logo to navbar
            const target = document.getElementById("nav-logo");
            if (!target) {
                overlay.style.transition = "opacity 600ms ease";
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

            // Freeze logo layout and prepare for transform
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

            // Trigger the transform on the next frame
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    logo.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
                });
            });

            // Wait for move to finish
            await sleep(moveDuration);

            // --- IMPORTANT: Make the nav logo snap visible (no transition) BEFORE removing the overlay
            // This prevents the navbar logo's fade-in from showing while the moving logo is still visible.
            const prevTargetTransition = target.style.transition;
            try {
                // Temporarily disable nav-logo transitions and force it to fully visible.
                target.style.transition = "none";
                target.style.opacity = "1";
                // Force layout so the browser applies the styles immediately.
                // eslint-disable-next-line no-unused-expressions
                target.offsetWidth;
            } catch (err) {
                // ignore (defensive)
            }

            // Fade out background of overlay (visual handoff)
            overlay.style.transition = "background-color 400ms ease, backdrop-filter 400ms ease, opacity 400ms ease";
            overlay.style.backgroundColor = "rgba(0,0,0,0)";
            overlay.style.backdropFilter = "blur(0px)";
            overlay.style.opacity = "0";
            await sleep(400);

            // Signal parent to remove the Intro overlay
            onFinish?.();

            // Restore the nav-logo's transition shortly after so future transitions work normally
            setTimeout(() => {
                try {
                    target.style.transition = prevTargetTransition || "";
                } catch (err) {
                    // ignore
                }
            }, 100);
        };

        playIntro();
    }, [onFinish, title]);

    const handleSkip = () => {
        skipRef.current = true;
        setSkipActive(true);
    };

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden
           bg-black/30 backdrop-blur-md"
        >
            {/* Animated grid lines */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-slideRight" />
                <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-slideLeft delay-1000" />
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-slideRight delay-2000" />
                <div className="absolute bottom-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-slideLeft delay-3000" />
            </div>

            {/* Skip button */}
            <button
                onClick={handleSkip}
                className={`fixed top-4 right-4 z-50 text-3xl opacity-80 hover:opacity-100 skip-btn text-white ${skipActive ? "skip-active" : ""
                    }`}
                aria-label="Skip Intro"
            >
                <MdFastForward />
            </button>

            {/* Logo + Circle + Title + Subtitle */}
            <div className="relative z-10 flex flex-col items-center gap-2 overflow-hidden">
                {/* Circle behind logo */}
                <div
                    ref={circleRef}
                    className="absolute rounded-full border-2 border-blue-400/50 w-40 h-40 md:w-48 md:h-48 animate-pingSlow"
                    style={{ zIndex: -1 }}
                ></div>

                <img
                    ref={logoRef}
                    src={logoSrc}
                    alt="logo"
                    className="w-36 md:w-48 h-auto relative"
                    style={{ willChange: "transform, opacity" }}
                />

                <h1
                    ref={titleRef}
                    className="text-2xl md:text-4xl font-bold flex items-center"
                    style={{
                        color: "#fff",
                        textShadow: "0 1px 2px rgba(0,0,0,0.35), 0 0 12px rgba(255,255,255,0.25)",
                    }}
                >
                    {typedTitle.split("").map((char, i) => (
                        <span key={i} className="char" style={{ animationDelay: `${i * 30}ms` }}>
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
                        textShadow: "0 1px 2px rgba(0,0,0,0.35), 0 0 12px rgba(255,255,255,0.25)",
                    }}
                >
                    Corporation
                </h2>
            </div>

            {/* Inline CSS Animations */}
            <style>{`
        @keyframes logoLoop {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.02); }
          100% { transform: translateY(0) scale(1); }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @keyframes pingSlow {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.5); opacity: 0; }
        }

        .animate-pingSlow {
          animation: pingSlow 2s ease-out infinite;
        }

        .char {
          opacity: 0;
          animation: fadeChar 280ms ease forwards;
        }

        @keyframes fadeChar {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .cursor { font-weight: 400; }
        .blink { animation: blink 1s steps(2, start) infinite; }

        .skip-btn {
          transition: transform 150ms ease,
                      text-shadow 150ms ease,
                      opacity 150ms ease,
                      color 150ms ease;
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

        @keyframes slideRight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes slideLeft {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }

        .animate-slideRight { animation: slideRight 3s linear infinite; }
        .animate-slideLeft { animation: slideLeft 3s linear infinite; }
        .delay-1000 { animation-delay: 1000ms; }
        .delay-2000 { animation-delay: 2000ms; }
        .delay-3000 { animation-delay: 3000ms; }
      `}</style>
        </div>
    );
}
