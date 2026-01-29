// useScrollAnimation.js
import { useEffect, useRef, useState } from 'react';

export default function useScrollAnimation(threshold = 0.1, enabled = true) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    const observerRef = useRef(null);

    useEffect(() => {
        // If animation system is disabled (e.g. intro still playing), reset visibility and skip observing.
        if (!enabled) {
            // Keep it hidden/reset while intro is playing.
            setIsVisible(false);
            // Make sure to disconnect any existing observer.
            if (observerRef.current) {
                observerRef.current.disconnect();
                observerRef.current = null;
            }
            return;
        }

        const node = ref.current;
        if (!node) return;

        // If an observer exists, disconnect it first.
        if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
        }

        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // optional: unobserve after first reveal
                    if (observerRef.current && node) {
                        observerRef.current.unobserve(node);
                    }
                }
            },
            { threshold }
        );

        observerRef.current.observe(node);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
                observerRef.current = null;
            }
        };
    }, [threshold, enabled]);

    const className = `transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
        }`;

    return [ref, className, isVisible];
}
