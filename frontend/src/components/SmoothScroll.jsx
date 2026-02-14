import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * SmoothScroll
 * - Desktop: custom smooth scrolling (wheel + keyboard)
 * - Touch devices: uses native smooth scrolling
 * - Listens for custom event "smooth-scroll-set-target" to programmatically set target
 *
 * Props:
 *  - ease (number) smoothing factor
 *  - className (string)
 */
export default function SmoothScroll({ children, ease = 0.08, className = "" }) {
    const { pathname } = useLocation();
    const isTouchDevice = useRef(false);

    // Refs for mutable values used by RAF loop & handlers
    const targetRef = useRef(0);
    const currentRef = useRef(0);
    const rafRef = useRef(null);
    const userScrollTimeoutRef = useRef(null);
    const isUserScrollingRef = useRef(false);
    const resizeObserverRef = useRef(null);

    // Pointer/scrollbar detection refs
    const pointerDownRef = useRef(false);
    const pointerMovedSinceDownRef = useRef(false);
    const pointerStartXRef = useRef(0);
    const pointerStartYRef = useRef(0);

    // helpers
    const getMaxScroll = () =>
        Math.max(
            0,
            Math.max(
                document.documentElement.scrollHeight,
                document.body.scrollHeight
            ) - window.innerHeight
        );

    const clampTarget = () => {
        const max = getMaxScroll();
        targetRef.current = Math.max(0, Math.min(targetRef.current, max));
    };

    const isElementTyping = (el) => {
        if (!el) return false;
        const tag = el.tagName;
        if (!tag) return false;
        const typingTags = ["INPUT", "TEXTAREA", "SELECT"];
        if (typingTags.includes(tag)) return true;
        if (el.isContentEditable) return true;
        // some UI frameworks use role=textbox
        const role = el.getAttribute && el.getAttribute("role");
        if (role === "textbox") return true;
        return false;
    };

    useEffect(() => {
        // detect once
        isTouchDevice.current =
            "ontouchstart" in window ||
            navigator.maxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0;

        if (isTouchDevice.current) {
            // Enable native smooth behavior for touch devices
            const prev = document.documentElement.style.scrollBehavior;
            document.documentElement.style.scrollBehavior = "smooth";
            return () => {
                document.documentElement.style.scrollBehavior = prev || "";
            };
        }

        // Desktop: custom smooth scroll
        let easeLocal = ease;

        // initialize target/current from current window scroll
        const syncInitial = () => {
            const pos = window.scrollY || window.pageYOffset || 0;
            targetRef.current = pos;
            currentRef.current = pos;
            clampTarget();
        };

        // Make sure we sync after DOM updates
        requestAnimationFrame(syncInitial);

        // RAF animate loop
        const animate = () => {
            const target = targetRef.current;
            let current = currentRef.current;
            const diff = target - current;

            if (Math.abs(diff) > 0.1) {
                current += diff * easeLocal;
                currentRef.current = current;
                // write to native scroll
                window.scrollTo(0, current);
            } else {
                // minimal difference: set to exact
                if (currentRef.current !== target) {
                    currentRef.current = target;
                    window.scrollTo(0, target);
                }
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        // ========== IMPROVED onScroll HANDLER ==========
        const onScroll = () => {
            const actual = window.scrollY || window.pageYOffset || 0;

            // Helper to snap internal state to the actual scroll position
            const snapToActual = () => {
                targetRef.current = actual;
                currentRef.current = actual;
                clampTarget();
                markUserScroll();
            };

            // Helper to mark that the user is actively scrolling
            const markUserScroll = () => {
                isUserScrollingRef.current = true;
                clearTimeout(userScrollTimeoutRef.current);
                userScrollTimeoutRef.current = setTimeout(() => {
                    isUserScrollingRef.current = false;
                }, 120);
            };

            // ----- Pointer‑driven scroll (thumb drag, track click, button click) -----
            if (pointerDownRef.current) {
                // Snap for both drag and click – eliminates bounce‑back
                snapToActual();
                return;
            }

            // ----- Other scrolls (e.g. programmatic, browser's own after pointer up) -----
            if (Math.abs(actual - currentRef.current) > 2) {
                // Native scroll diverged from our smooth position – animate toward it
                targetRef.current = actual;
                clampTarget();
                markUserScroll();
            }
        };
        // ================================================

        // Wheel handler
        const onWheel = (e) => {
            // only handle primary button / normal wheel
            // preventDefault so native scroll doesn't jump
            e.preventDefault();

            let delta = e.deltaY;
            if (e.deltaMode === 1) delta *= 16; // line
            else if (e.deltaMode === 2) delta *= window.innerHeight; // page

            targetRef.current += delta;
            clampTarget();

            isUserScrollingRef.current = true;
            clearTimeout(userScrollTimeoutRef.current);
            userScrollTimeoutRef.current = setTimeout(() => {
                isUserScrollingRef.current = false;
            }, 120);
        };

        // Keyboard handler
        const onKeyDown = (e) => {
            // ignore if modifier keys (except we allow Shift for Space)
            if (e.ctrlKey || e.altKey || e.metaKey) return;

            // ignore when focusing inputs / typing
            if (isElementTyping(document.activeElement)) return;

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
                case "Spacebar": // older browsers
                    delta = e.shiftKey ? -pageHeight : pageHeight;
                    break;
                default:
                    handled = false;
            }

            if (!handled) return;

            e.preventDefault();

            if (delta !== 0) {
                targetRef.current += delta;
            }
            clampTarget();

            // mark user scrolling briefly
            isUserScrollingRef.current = true;
            clearTimeout(userScrollTimeoutRef.current);
            userScrollTimeoutRef.current = setTimeout(() => {
                isUserScrollingRef.current = false;
            }, 120);
        };

        // Custom event listener to set target programmatically
        const onSetTarget = (ev) => {
            // ev.detail might be a number or an object like { value: 123 }
            const raw = ev?.detail;
            let v = NaN;
            if (typeof raw === "number") v = raw;
            else if (raw && typeof raw === "object" && typeof raw.value === "number") v = raw.value;
            else v = Number(raw);
            if (Number.isFinite(v)) {
                targetRef.current = v;
                clampTarget();
            }
        };

        // Resize handling & content changes — keep target valid
        const onResize = () => {
            clampTarget();
        };

        // Pointer handlers to detect drag vs click.
        const onPointerDown = (ev) => {
            pointerDownRef.current = true;
            pointerMovedSinceDownRef.current = false;
            pointerStartXRef.current = ev.clientX ?? 0;
            pointerStartYRef.current = ev.clientY ?? 0;
        };
        const onPointerMove = (ev) => {
            if (!pointerDownRef.current) return;
            const dx = Math.abs((ev.clientX ?? 0) - pointerStartXRef.current);
            const dy = Math.abs((ev.clientY ?? 0) - pointerStartYRef.current);
            // small threshold (4px) to differentiate click vs drag
            if (dx > 4 || dy > 4) {
                pointerMovedSinceDownRef.current = true;
            }
        };
        const onPointerUp = () => {
            // reset pointer flags after a tick to allow onScroll to run first (if it hasn't)
            pointerDownRef.current = false;
            pointerMovedSinceDownRef.current = false;
        };

        // ResizeObserver to catch layout/content changes (images, async content)
        // Observe the documentElement or body to detect height changes.
        try {
            resizeObserverRef.current = new ResizeObserver(() => {
                clampTarget();
            });
            resizeObserverRef.current.observe(document.documentElement);
            resizeObserverRef.current.observe(document.body);
        } catch (err) {
            // ResizeObserver not supported: fallback to window resize
            window.addEventListener("resize", onResize, { passive: true });
        }

        // Visibility change: when tab becomes visible, resync
        const onVisibility = () => {
            if (!document.hidden) {
                requestAnimationFrame(syncInitial);
            }
        };

        // Attach listeners
        window.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("keydown", onKeyDown, { passive: false });
        window.addEventListener("smooth-scroll-set-target", onSetTarget);
        document.addEventListener("visibilitychange", onVisibility);

        // Pointer events on document to detect scrollbar interactions
        // Use pointer events when available, fall back to mouse events
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

        // Ensure target/current are set after route changes (allow DOM to render)
        requestAnimationFrame(syncInitial);

        // cleanup
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

            if (resizeObserverRef.current && resizeObserverRef.current.disconnect) {
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