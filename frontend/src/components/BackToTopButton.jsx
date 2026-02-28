import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function BackToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            const scrollPosition = window.scrollY + window.innerHeight;
            const pageHeight = document.documentElement.scrollHeight;

            // Show button when user is within 200px of bottom
            const nearBottom = pageHeight - scrollPosition < 200;

            setVisible(nearBottom);
        };

        window.addEventListener("scroll", toggleVisibility);
        toggleVisibility(); // Initial check

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        const isTouchDevice =
            "ontouchstart" in window ||
            navigator.maxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0;

        if (isTouchDevice) {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        } else {
            window.dispatchEvent(
                new CustomEvent("smooth-scroll-set-target", { detail: 0 })
            );
        }
    };

    return (
        <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className={`fixed bottom-6 right-6 z-40 p-3 rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 transform
            ${visible ? "opacity-100 scale-100" : "opacity-0 scale-0 pointer-events-none"}
            hover:bg-green-600 hover:scale-110 active:scale-95`}
        >
            <FaArrowUp className="text-lg" />
        </button>
    );
}