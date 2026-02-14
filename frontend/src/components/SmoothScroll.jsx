import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Determines if an element or any of its parents can scroll vertically.
 * Returns the first scrollable element found, or null.
 */
function getScrollableParent(el, direction = "vertical") {
    const isY = direction === "vertical";
    while (el && el !== document.body) {
        const style = window.getComputedStyle(el);
        const overflow = isY ? style.overflowY : style.overflowX;
        const canScroll = (overflow === "auto" || overflow === "scroll") &&
            (isY ? el.scrollHeight > el.clientHeight : el.scrollWidth > el.clientWidth);
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

/**
 * SmoothScroll
 * - Desktop with mouse/trackpad: custom smooth scrolling
 * - Touch devices: native smooth scrolling (via CSS)
 * - Respects nested scrollable areas (modals, sidebars, etc.)
 * - Listens for custom event "smooth-scroll-set-target" to programmatically set target
 *
 * Props:
 *  - ease (number) smoothing factor (default 0.08)
 *  - className (string)
 */
export default function SmoothScroll({ children, ease = 0.08, className = "" }) {
    const { pathname } = useLocation();

    // Use a media query to detect fine pointer (mouse/trackpad) vs coarse (touch)
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

    // Helpers
    const getMaxScroll = () =>
        Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const clampTarget = () => {
        const max = getMaxScroll();
        targetRef.current = Math.max(0, Math.min(targetRef.current, max));
    };

    // On coarse pointer devices, just enable native smooth scroll and bail out
    useEffect(() => {
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
        };

        // RAF loop
        const animate = () => {
            const target = targetRef.current;
            let current = currentRef.current;
            const diff = target - current;

            if (Math.abs(diff) > 0.1) {
                current += diff * easeLocal;
                currentRef.current = current;
                window.scrollTo(0, current);
            } else if (currentRef.current !== target) {
                currentRef.current = target;
                window.scrollTo(0, target);
            }

            rafRef.current = requestAnimationFrame(animate);
        };
        rafRef.current = requestAnimationFrame(animate);

        // ----- Scroll handler (syncs with native scroll changes) -----
        const onScroll = () => {
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
        };

        // ----- Wheel handler with nested scrollable detection -----
        const onWheel = (e) => {
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

            targetRef.current += delta;
            clampTarget();

            isUserScrollingRef.current = true;
            clearTimeout(userScrollTimeoutRef.current);
            userScrollTimeoutRef.current = setTimeout(() => {
                isUserScrollingRef.current = false;
            }, 120);
        };

        // ----- Keyboard handler -----
        const onKeyDown = (e) => {
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
        };

        // ----- Custom event for programmatic scrolling -----
        const onSetTarget = (ev) => {
            const raw = ev?.detail;
            let v = typeof raw === "number" ? raw : raw?.value;
            if (typeof v === "number" && !isNaN(v)) {
                targetRef.current = v;
                clampTarget();
            }
        };

        // ----- Resize / content changes -----
        const onResize = () => clampTarget();

        // ----- Pointer events for scrollbar detection -----
        const onPointerDown = (ev) => {
            pointerDownRef.current = true;
            pointerStartYRef.current = ev.clientY;
        };
        const onPointerMove = (ev) => {
            if (!pointerDownRef.current) return;
            // If moved more than a few px, treat as drag
            if (Math.abs(ev.clientY - pointerStartYRef.current) > 4) {
                // no need to set a flag; just keep pointerDown true
            }
        };
        const onPointerUp = () => {
            pointerDownRef.current = false;
        };

        // ----- Visibility change -----
        const onVisibility = () => {
            if (!document.hidden) requestAnimationFrame(syncInitial);
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

        // Initial sync after mount / route change
        requestAnimationFrame(syncInitial);

        // Cleanup
        return () => {
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("smooth-scroll-set-target", onSetTarget);
            document.removeEventListener("visibilitychange", onVisibility);

            if (supportsPointer) {
                document.removeEventListener("pointerdown", onPointerDown);
                document.removeEventListener("pointermove", onPointerMove);
                document.removeEventListener("pointerup", onPointerUp);
            } else {
                document.removeEventListener("mousedown", onPointerDown);
                document.removeEventListener("mousemove", onPointerMove);
                document.removeEventListener("mouseup", onPointerUp);
            }

            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
            } else {
                window.removeEventListener("resize", onResize);
            }

            clearTimeout(userScrollTimeoutRef.current);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [ease, pathname]);

    return <div className={className}>{children}</div>;
}