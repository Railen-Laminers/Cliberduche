import React from "react";

export default function Footer() {
    return (
        <footer className="bg-[#0b2545] text-white px-10 py-10 text-sm">
            <div className="grid md:grid-cols-3 gap-6">
                <div>
                    <h4 className="font-bold mb-2">Cliberduche <span className="text-green-300">∞</span></h4>
                    <p className="text-gray-300">Professional Building And Construction Services You Can Trust.</p>
                </div>
                <div>
                    <h5 className="font-semibold mb-2">Company</h5>
                    <ul className="space-y-1 text-gray-300">
                        <li>Projects</li>
                        <li>Team</li>
                        <li>Careers</li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-semibold mb-2">Contact</h5>
                    <p className="text-gray-300">info@cliberduche.com</p>
                </div>
            </div>
        </footer>
    );
}
