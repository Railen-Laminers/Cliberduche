import { useEffect, useRef } from "react";

/**
 * Universal SmoothScroll
 * - Wheel-driven smoothing for desktop
 * - Native smooth scrolling for touch devices (iOS, Android)
 * - Supports scrollbar drag, keyboard, touch gestures
 * - Handles all edge cases and browser quirks
 *
 * Props:
 *  - ease (number): smoothing factor for desktop (default 0.08)
 *  - className (string): optional wrapper class
 */
export default function SmoothScroll({ children, ease = 0.08, className = "" }) {
    const isTouchDevice = useRef(false);

    useEffect(() => {
        // Detect touch capability
        isTouchDevice.current =
            'ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0;

        // If touch device, use native smooth scroll instead
        if (isTouchDevice.current) {
            document.documentElement.style.scrollBehavior = 'smooth';
            return () => {
                document.documentElement.style.scrollBehavior = '';
            };
        }

        // Desktop smooth scroll implementation
        let target = window.scrollY || window.pageYOffset || 0;
        let current = window.scrollY || window.pageYOffset || 0;
        let rafId = null;
        let isUserScrolling = false;
        let userScrollTimeout = null;

        // Helper: get max scroll
        const getMaxScroll = () => {
            return Math.max(
                0,
                Math.max(
                    document.documentElement.scrollHeight,
                    document.body.scrollHeight
                ) - window.innerHeight
            );
        };

        // Helper: clamp target
        const clampTarget = () => {
            const maxScroll = getMaxScroll();
            target = Math.max(0, Math.min(target, maxScroll));
        };

        // Wheel handler (desktop only)
        const onWheel = (e) => {
            e.preventDefault();

            // Handle different wheel delta modes
            let delta = e.deltaY;
            if (e.deltaMode === 1) { // DOM_DELTA_LINE
                delta *= 16; // approximate line height
            } else if (e.deltaMode === 2) { // DOM_DELTA_PAGE
                delta *= window.innerHeight;
            }

            target += delta;
            clampTarget();
            isUserScrolling = true;

            clearTimeout(userScrollTimeout);
            userScrollTimeout = setTimeout(() => {
                isUserScrolling = false;
            }, 100);
        };

        // Native scroll handler (keyboard, scrollbar, programmatic)
        const onScroll = () => {
            const actualScroll = window.scrollY || window.pageYOffset || 0;

            // Sync if user manually scrolled (threshold accounts for sub-pixel differences)
            if (Math.abs(actualScroll - current) > 2) {
                target = actualScroll;
                current = actualScroll;
                clampTarget();
                isUserScrolling = true;

                clearTimeout(userScrollTimeout);
                userScrollTimeout = setTimeout(() => {
                    isUserScrolling = false;
                }, 100);
            }
        };

        // Animation loop
        const animate = () => {
            const diff = target - current;

            if (Math.abs(diff) > 0.1) {
                current += diff * ease;

                // Use different scroll methods for better compatibility
                if (window.scrollTo) {
                    window.scrollTo(0, current);
                } else {
                    document.documentElement.scrollTop = current;
                    document.body.scrollTop = current; // For older browsers
                }
            } else {
                current = target;
            }

            rafId = requestAnimationFrame(animate);
        };

        // Custom event for programmatic scrolling
        const onSetTarget = (e) => {
            const v = Number(e?.detail ?? 0);
            if (Number.isFinite(v)) {
                target = v;
                clampTarget();
            }
        };

        // Resize handler
        const onResize = () => {
            clampTarget();
        };

        // Initialize
        target = current = window.scrollY || window.pageYOffset || 0;

        // Add event listeners
        window.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize, { passive: true });
        window.addEventListener("smooth-scroll-set-target", onSetTarget);

        // Start animation
        rafId = requestAnimationFrame(animate);

        // Cleanup
        return () => {
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
            window.removeEventListener("smooth-scroll-set-target", onSetTarget);
            clearTimeout(userScrollTimeout);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [ease]);

    return <div className={className}>{children}</div>;
}