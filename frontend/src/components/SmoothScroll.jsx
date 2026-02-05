import { useEffect } from "react";

/**
 * Hybrid SmoothScroll
 * - Keeps the same wheel-driven smoothing behavior you had.
 * - Still allows manual interactions (scrollbar drag, touch, keyboard).
 *
 * Props:
 *  - ease (number): smoothing factor, lower = smoother/slower (default 0.08)
 */
export default function SmoothScroll({ children, ease = 0.08 }) {
    useEffect(() => {
        let target = window.scrollY || 0; // desired scroll position
        let current = window.scrollY || 0; // current (animated) scroll position
        let rafId = null;
        let lastScrollTime = 0; // track when manual scroll last happened

        // clamp helper
        const clampTarget = () => {
            const maxScroll = Math.max(
                document.documentElement.scrollHeight,
                document.body.scrollHeight
            ) - window.innerHeight;
            target = Math.max(0, Math.min(target, Math.max(0, maxScroll)));
        };

        // Wheel: keep original behaviour (accumulate delta, prevent default)
        const onWheel = (e) => {
            // accumulate wheel delta
            target += e.deltaY;
            clampTarget();
            e.preventDefault(); // keep the same wheel-driven feel
            lastScrollTime = Date.now();
        };

        // Native scroll: happens for touch, scrollbar drag, keyboard, etc.
        // Detect manual scroll by comparing window.scrollY to our animated current position
        const onScroll = () => {
            const actualScroll = window.scrollY || 0;
            // Only sync if user manually scrolled (not from our animation)
            if (Math.abs(actualScroll - current) > 1) {
                target = actualScroll;
                current = actualScroll;
                clampTarget();
                lastScrollTime = Date.now();
            }
        };

        // Animation loop
        const animate = () => {
            // interpolate smoothly toward target
            if (Math.abs(target - current) > 0.1) {
                current += (target - current) * ease;
            } else {
                current = target;
            }

            window.scrollTo(0, current);
            rafId = requestAnimationFrame(animate);
        };

        // Start
        window.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("scroll", onScroll, { passive: true });

        // Initialize values in case page wasn't at 0
        target = current = window.scrollY || 0;
        rafId = requestAnimationFrame(animate);

        // Keep clamp up-to-date on resize/content change
        const onResize = () => {
            clampTarget();
        };
        window.addEventListener("resize", onResize);

        // Cleanup
        return () => {
            window.removeEventListener("wheel", onWheel, { passive: false });
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [ease]);

    return <>{children}</>;
}
