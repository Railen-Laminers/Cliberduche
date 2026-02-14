import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Enhanced scrollable parent detection.
 * Now also checks if the element already has scroll offset (proven scrollable).
 */
function getScrollableParent(el, direction = "vertical") {
    const isY = direction === "vertical";
    const scrollProp = isY ? "scrollTop" : "scrollLeft";
    const scrollSizeProp = isY ? "scrollHeight" : "scrollWidth";
    const clientSizeProp = isY ? "clientHeight" : "clientWidth";
    const overflowProp = isY ? "overflowY" : "overflowX";

    while (el && el !== document.body) {
        // If it has already been scrolled, it's definitely scrollable
        if (el[scrollProp] > 0) return el;

        const style = window.getComputedStyle(el);
        const overflow = style[overflowProp];
        const canScroll = (overflow === "auto" || overflow === "scroll") &&
            el[scrollSizeProp] > el[clientSizeProp];
        if (canScroll) return el;

        el = el.parentElement;
    }
    return null;
}

/**
 * Checks if the given element is a text input / contenteditable.
 */
function isTypingElement(el) {
    if (!el) return false;
    const tag = el.tagName;
    const typingTags = ["INPUT", "TEXTAREA", "SELECT"];
    if (typingTags.includes(tag)) return true;
    if (el.isContentEditable) return true;
    return el.getAttribute?.("role") === "textbox";
}

export default function SmoothScroll({ children, ease = 0.08, className = "" }) {
    const { pathname } = useLocation();

    // Detect fine pointer (mouse/trackpad) vs coarse (touch)
    const isFinePointer = useRef(
        window.matchMedia?.("(pointer:fine)").matches ?? !("ontouchstart" in window)
    );

    // Refs for animation
    const targetRef = useRef(0);
    const currentRef = useRef(0);
    const rafRef = useRef(null);
    const userScrollTimeoutRef = useRef(null);
    const isUserScrollingRef = useRef(false);
    const resizeObserverRef = useRef(null);

    // Scrollbar drag detection
    const pointerDownRef = useRef(false);
    const pointerStartYRef = useRef(0);

    // --- NEW: Safety mechanisms ---
    const lastScrollUpdateRef = useRef(performance.now()); // for watchdog
    const errorCountRef = useRef(0);                        // count consecutive errors
    const maxErrors = 5;                                     // threshold to fallback
    const fallbackModeRef = useRef(false);                   // if true, use native scroll

    // Helper to get max scroll
    const getMaxScroll = () =>
        Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const clampTarget = () => {
        const max = getMaxScroll();
        targetRef.current = Math.max(0, Math.min(targetRef.current, max));
    };

    // --- NEW: Fallback to native scrolling if too many errors occur
    const enableFallbackMode = () => {
        if (fallbackModeRef.current) return;
        fallbackModeRef.current = true;
        document.documentElement.style.scrollBehavior = "smooth";
        // Clean up custom listeners (will be done in cleanup, but also stop animation)
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
        console.warn("SmoothScroll: Fallback to native scrolling due to errors.");
    };

    useEffect(() => {
        // If we are already in fallback mode, just enable native smooth scroll and exit
        if (fallbackModeRef.current) {
            document.documentElement.style.scrollBehavior = "smooth";
            return () => {
                document.documentElement.style.scrollBehavior = "";
            };
        }

        // If coarse pointer, use native smooth scroll
        if (!isFinePointer.current) {
            const originalBehavior = document.documentElement.style.scrollBehavior;
            document.documentElement.style.scrollBehavior = "smooth";
            return () => {
                document.documentElement.style.scrollBehavior = originalBehavior || "";
            };
        }

        // ----- Fine pointer: custom smooth scroll -----
        const easeLocal = ease;

        const syncInitial = () => {
            const pos = window.scrollY;
            targetRef.current = pos;
            currentRef.current = pos;
            lastScrollUpdateRef.current = performance.now(); // reset watchdog
        };

        // RAF loop with watchdog and error handling
        const animate = () => {
            try {
                // If fallback triggered, stop animation
                if (fallbackModeRef.current) return;

                const target = targetRef.current;
                let current = currentRef.current;
                const diff = target - current;

                if (Math.abs(diff) > 0.1) {
                    current += diff * easeLocal;
                    currentRef.current = current;
                    window.scrollTo(0, current);
                    lastScrollUpdateRef.current = performance.now();
                } else if (currentRef.current !== target) {
                    currentRef.current = target;
                    window.scrollTo(0, target);
                    lastScrollUpdateRef.current = performance.now();
                }

                // Watchdog: if no update for 500ms, force resync with actual scroll
                if (performance.now() - lastScrollUpdateRef.current > 500) {
                    const actual = window.scrollY;
                    targetRef.current = actual;
                    currentRef.current = actual;
                    lastScrollUpdateRef.current = performance.now();
                }

                // Reset error count on successful frame
                errorCountRef.current = 0;
            } catch (err) {
                console.warn("SmoothScroll animation error:", err);
                errorCountRef.current++;
                if (errorCountRef.current >= maxErrors) {
                    enableFallbackMode();
                    return; // stop this loop
                }
            }

            // Continue loop only if not in fallback mode
            if (!fallbackModeRef.current) {
                rafRef.current = requestAnimationFrame(animate);
            }
        };

        rafRef.current = requestAnimationFrame(animate);

        // ----- Scroll handler with error protection -----
        const onScroll = () => {
            if (fallbackModeRef.current) return;

            try {
                const actual = window.scrollY;

                const snapToActual = () => {
                    targetRef.current = actual;
                    currentRef.current = actual;
                    clampTarget();
                    markUserScroll();
                };

                const markUserScroll = () => {
                    isUserScrollingRef.current = true;
                    clearTimeout(userScrollTimeoutRef.current);
                    userScrollTimeoutRef.current = setTimeout(() => {
                        isUserScrollingRef.current = false;
                    }, 120);
                };

                if (pointerDownRef.current) {
                    snapToActual();
                    return;
                }

                if (Math.abs(actual - currentRef.current) > 2) {
                    targetRef.current = actual;
                    clampTarget();
                    markUserScroll();
                }
            } catch (err) {
                console.warn("SmoothScroll onScroll error:", err);
                errorCountRef.current++;
                if (errorCountRef.current >= maxErrors) enableFallbackMode();
            }
        };

        // ----- Wheel handler with throttling and error handling -----
        let wheelTimeout;
        const onWheel = (e) => {
            if (fallbackModeRef.current) return;

            try {
                // Find the nearest scrollable parent under the cursor
                const targetEl = e.target;
                const scrollableParent = getScrollableParent(targetEl, "vertical");

                if (scrollableParent) {
                    // Let the nested element handle the wheel natively
                    return;
                }

                // No scrollable parent – scroll the page
                e.preventDefault();

                let delta = e.deltaY;
                if (e.deltaMode === 1) delta *= 16;          // line
                else if (e.deltaMode === 2) delta *= window.innerHeight; // page

                // Throttle: accumulate deltas over a short period to avoid micro‑updates
                if (wheelTimeout) clearTimeout(wheelTimeout);
                wheelTimeout = setTimeout(() => {
                    targetRef.current += delta;
                    clampTarget();
                    wheelTimeout = null;
                }, 0); // schedule for next tick to allow coalescing

                isUserScrollingRef.current = true;
                clearTimeout(userScrollTimeoutRef.current);
                userScrollTimeoutRef.current = setTimeout(() => {
                    isUserScrollingRef.current = false;
                }, 120);
            } catch (err) {
                console.warn("SmoothScroll onWheel error:", err);
                errorCountRef.current++;
                if (errorCountRef.current >= maxErrors) enableFallbackMode();
            }
        };

        // ----- Keyboard handler with error handling -----
        const onKeyDown = (e) => {
            if (fallbackModeRef.current) return;

            try {
                if (e.ctrlKey || e.altKey || e.metaKey) return;
                if (isTypingElement(document.activeElement)) return;

                // If focus is inside a scrollable container, do not interfere
                const scrollableParent = getScrollableParent(document.activeElement, "vertical");
                if (scrollableParent) return;

                const pageHeight = window.innerHeight;
                const lineHeight = 40;
                let delta = 0;
                let handled = true;

                switch (e.key) {
                    case "ArrowUp":
                        delta = -lineHeight;
                        break;
                    case "ArrowDown":
                        delta = lineHeight;
                        break;
                    case "PageUp":
                        delta = -pageHeight;
                        break;
                    case "PageDown":
                        delta = pageHeight;
                        break;
                    case "Home":
                        targetRef.current = 0;
                        break;
                    case "End":
                        targetRef.current = getMaxScroll();
                        break;
                    case " ":
                    case "Spacebar":
                        delta = e.shiftKey ? -pageHeight : pageHeight;
                        break;
                    default:
                        handled = false;
                }

                if (!handled) return;
                e.preventDefault();

                if (delta !== 0) targetRef.current += delta;
                clampTarget();

                isUserScrollingRef.current = true;
                clearTimeout(userScrollTimeoutRef.current);
                userScrollTimeoutRef.current = setTimeout(() => {
                    isUserScrollingRef.current = false;
                }, 120);
            } catch (err) {
                console.warn("SmoothScroll onKeyDown error:", err);
                errorCountRef.current++;
                if (errorCountRef.current >= maxErrors) enableFallbackMode();
            }
        };

        // ----- Custom event for programmatic scrolling -----
        const onSetTarget = (ev) => {
            if (fallbackModeRef.current) return;
            try {
                const raw = ev?.detail;
                let v = typeof raw === "number" ? raw : raw?.value;
                if (typeof v === "number" && !isNaN(v)) {
                    targetRef.current = v;
                    clampTarget();
                }
            } catch (err) {
                console.warn("SmoothScroll onSetTarget error:", err);
                errorCountRef.current++;
                if (errorCountRef.current >= maxErrors) enableFallbackMode();
            }
        };

        // ----- Resize / content changes -----
        const onResize = () => {
            if (fallbackModeRef.current) return;
            try {
                clampTarget();
            } catch (err) {
                console.warn("SmoothScroll onResize error:", err);
                errorCountRef.current++;
                if (errorCountRef.current >= maxErrors) enableFallbackMode();
            }
        };

        // ----- Pointer events for scrollbar detection -----
        const onPointerDown = (ev) => {
            pointerDownRef.current = true;
            pointerStartYRef.current = ev.clientY;
        };
        const onPointerMove = (ev) => {
            if (!pointerDownRef.current) return;
            // If moved more than a few px, treat as drag (no extra flag needed)
        };
        const onPointerUp = () => {
            pointerDownRef.current = false;
        };

        // ----- Visibility change -----
        const onVisibility = () => {
            if (fallbackModeRef.current) return;
            if (!document.hidden) requestAnimationFrame(syncInitial);
        };

        // ----- Hybrid device detection: if a touch event occurs, switch to native -----
        const onTouchStart = () => {
            // If we thought it was fine pointer but user touched screen, switch to native
            if (isFinePointer.current) {
                isFinePointer.current = false;
                enableFallbackMode(); // will set native scroll and clean up
            }
        };

        // Set up ResizeObserver
        try {
            resizeObserverRef.current = new ResizeObserver(onResize);
            resizeObserverRef.current.observe(document.documentElement);
            resizeObserverRef.current.observe(document.body);
        } catch {
            window.addEventListener("resize", onResize, { passive: true });
        }

        // Attach all listeners
        window.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("keydown", onKeyDown, { passive: false });
        window.addEventListener("smooth-scroll-set-target", onSetTarget);
        document.addEventListener("visibilitychange", onVisibility);
        document.addEventListener("touchstart", onTouchStart, { passive: true, once: true }); // detect touch once

        const supportsPointer = !!window.PointerEvent;
        if (supportsPointer) {
            document.addEventListener("pointerdown", onPointerDown, { passive: true });
            document.addEventListener("pointermove", onPointerMove, { passive: true });
            document.addEventListener("pointerup", onPointerUp, { passive: true });
        } else {
            document.addEventListener("mousedown", onPointerDown, { passive: true });
            document.addEventListener("mousemove", onPointerMove, { passive: true });
            document.addEventListener("mouseup", onPointerUp, { passive: true });
        }

        // Use scrollend event for more accurate user scroll detection (modern browsers)
        if ('onscrollend' in window) {
            document.addEventListener('scrollend', () => {
                isUserScrollingRef.current = false;
            }, { passive: true });
        }

        // Initial sync after mount / route change
        requestAnimationFrame(syncInitial);

        // Cleanup
        return () => {
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("smooth-scroll-set-target", onSetTarget);
            document.removeEventListener("visibilitychange", onVisibility);
            document.removeEventListener("touchstart", onTouchStart);

            if (supportsPointer) {
                document.removeEventListener("pointerdown", onPointerDown);
                document.removeEventListener("pointermove", onPointerMove);
                document.removeEventListener("pointerup", onPointerUp);
            } else {
                document.removeEventListener("mousedown", onPointerDown);
                document.removeEventListener("mousemove", onPointerMove);
                document.removeEventListener("mouseup", onPointerUp);
            }

            if ('onscrollend' in window) {
                document.removeEventListener('scrollend', () => { });
            }

            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
            } else {
                window.removeEventListener("resize", onResize);
            }

            clearTimeout(userScrollTimeoutRef.current);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [ease, pathname]); // note: fallbackModeRef and errorCountRef are stable refs, not dependencies

    return <div className={className}>{children}</div>;
}