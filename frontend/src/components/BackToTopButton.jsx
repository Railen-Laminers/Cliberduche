import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function BackToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", toggleVisibility);
        toggleVisibility(); // Initial check

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        // Detect if touch device
        const isTouchDevice =
            'ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0;

        if (isTouchDevice) {
            // Mobile: use native smooth scroll
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // Desktop: use custom smooth scroll event
            window.dispatchEvent(
                new CustomEvent("smooth-scroll-set-target", { detail: 0 })
            );
        }
    };

    return (
        <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 transform
        ${visible ? "opacity-100 scale-100" : "opacity-0 scale-0 pointer-events-none"}
        hover:bg-green-600 hover:scale-110 active:scale-95`}
        >
            <FaArrowUp className="text-lg" />
        </button>
    );
}