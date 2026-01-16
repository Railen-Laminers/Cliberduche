import React from "react";

export default function Contact() {
    return (
        <section
            id="contact"
            className="grid md:grid-cols-2 gap-8 px-6 py-12 bg-gradient-to-r from-green-100 to-green-200"
        >
            {/* Text Section */}
            <div className="flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Let’s Build Something Great
                </h3>
                <p className="mt-2 text-green-700 text-sm md:text-base">
                    Contact us for a consultation or project estimate
                </p>
            </div>

            {/* Form Section */}
            <form className="bg-white/80 backdrop-blur-md text-gray-900 p-6 rounded-2xl flex flex-col gap-3 shadow-md">
                <h4 className="text-xl font-semibold mb-1">Get In Touch</h4>
                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-3 py-2 rounded-lg bg-white/50 border border-gray-300 placeholder-gray-500 focus:border-green-400 focus:ring-1 focus:ring-green-400 outline-none text-sm"
                />
                <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-3 py-2 rounded-lg bg-white/50 border border-gray-300 placeholder-gray-500 focus:border-green-400 focus:ring-1 focus:ring-green-400 outline-none text-sm"
                />
                <textarea
                    placeholder="Project Details"
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg bg-white/50 border border-gray-300 placeholder-gray-500 focus:border-green-400 focus:ring-1 focus:ring-green-400 outline-none text-sm resize-none"
                ></textarea>
                <button className="bg-green-400 text-white px-5 py-2 rounded-full font-semibold text-sm hover:bg-green-500 transition">
                    Send
                </button>
            </form>
        </section>
    );
}
