import { useEffect, useRef, useMemo, useCallback } from "react";

const ScrollReveal = ({
    children,
    enableBlur = true,
    baseOpacity = 0.1,
    baseRotation = 3,
    blurStrength = 4,
    stagger = true,
    staggerStep = 0.05,
    containerClassName = "",
    textClassName = "",
}) => {
    const containerRef = useRef(null);
    const wordsRef = useRef([]);
    const rafRef = useRef(null);
    const observerRef = useRef(null);

    const splitText = useMemo(() => {
        if (typeof children !== "string") return children;
        return children.split(/(\s+)/).map((word, index) => {
            if (word.match(/^\s+$/)) return word;
            return (
                <span
                    key={index}
                    className="inline-block"
                    style={{ willChange: "opacity, filter" }}
                    ref={(el) => (wordsRef.current[index] = el)}
                >
                    {word}
                </span>
            );
        });
    }, [children]);

    const updateStyles = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // --- Rotation: scrubs from baseRotation → 0 as element enters viewport ---
        // Mirrors GSAP: start="top bottom", end="bottom bottom"
        // rotProgress = 0 when top hits bottom of screen, 1 when bottom hits bottom
        const rotStart = viewportHeight; // container top at viewport bottom
        const rotEnd = viewportHeight - rect.height; // container bottom at viewport bottom (approx)
        let rotProgress = (rotStart - rect.top) / (rotStart - rotEnd || 1);
        rotProgress = Math.min(1, Math.max(0, rotProgress));

        container.style.transformOrigin = "0% 50%";
        container.style.transform = `rotate(${baseRotation * (1 - rotProgress)}deg)`;

        // --- Words: scrub opacity + blur ---
        // Mirrors GSAP: start="top bottom-=20%", end="bottom bottom"
        const wordStart = viewportHeight * 0.8; // top of element hits 80% of viewport
        const wordEnd = viewportHeight - rect.height;

        const words = wordsRef.current.filter(Boolean);
        const totalWords = words.length;

        words.forEach((word, i) => {
            // Base progress for this scroll window
            let progress = (wordStart - rect.top) / (wordStart - wordEnd || 1);
            progress = Math.min(1, Math.max(0, progress));

            // Stagger: each word is offset by staggerStep
            if (stagger && totalWords > 1) {
                const totalOffset = (totalWords - 1) * staggerStep;
                const wordProgress = (progress - i * staggerStep) / (1 - totalOffset || 1);
                progress = Math.min(1, Math.max(0, wordProgress));
            }

            word.style.opacity = baseOpacity + (1 - baseOpacity) * progress;

            if (enableBlur) {
                word.style.filter = `blur(${blurStrength * (1 - progress)}px)`;
            } else {
                word.style.filter = "none";
            }
        });

        rafRef.current = requestAnimationFrame(updateStyles);
    }, [baseOpacity, baseRotation, blurStrength, enableBlur, stagger, staggerStep]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        wordsRef.current = [];

        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (!rafRef.current) {
                            rafRef.current = requestAnimationFrame(updateStyles);
                        }
                    } else {
                        if (rafRef.current) {
                            cancelAnimationFrame(rafRef.current);
                            rafRef.current = null;
                        }
                    }
                });
            },
            { threshold: 0 }
        );

        observerRef.current.observe(container);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, [updateStyles]);

    return (
        <div ref={containerRef} className={containerClassName} style={{ overflow: "visible" }}>
            <p className={`text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-semibold ${textClassName}`}>
                {splitText}
            </p>
        </div>
    );
};

export default ScrollReveal;