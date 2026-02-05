// useScrollAnimation.js
import { useEffect, useRef, useState } from 'react';

export default function useScrollAnimation(threshold = 0.1, enabled = true) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    const observerRef = useRef(null);

    useEffect(() => {
        // If animation system is disabled, reset visibility and skip observing.
        if (!enabled) {
            setIsVisible(false);
            if (observerRef.current) {
                observerRef.current.disconnect();
                observerRef.current = null;
            }
            return;
        }

        const node = ref.current;
        if (!node) return;

        // Disconnect any previous observer
        if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
        }

        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                // Set visibility based on intersection
                setIsVisible(entry.isIntersecting);
                // allows multiple triggers
            },
            { threshold }
        );

        observerRef.current.observe(node);

        // Cleanup on unmount
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
                observerRef.current = null;
            }
        };
    }, [threshold, enabled]);

    const className = `
        transition-all duration-700 ease-out
        ${isVisible
            ? 'opacity-100 translate-y-0 scale-100 blur-0'
            : 'opacity-0 translate-y-10 scale-95 blur-sm'
        }
    `;

    return [ref, className, isVisible];
}
