import React from "react";

export default function Navbar() {
    return (
        <header className="flex justify-between items-center px-10 py-6 absolute w-full z-10">
            <h1 className="text-white font-bold text-xl tracking-wide">
                Cliberduche <span className="text-green-300 ml-1">∞</span>
            </h1>
            <nav className="space-x-6 text-white text-sm font-medium">
                <a href="#about" className="hover:text-green-300 transition-colors">About</a>
                <a href="#services" className="hover:text-green-300 transition-colors">Projects</a>
                <a href="#contact" className="hover:text-green-300 transition-colors">Contact</a>
            </nav>
        </header>
    );
}
