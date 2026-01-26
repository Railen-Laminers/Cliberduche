import React from "react";
import PerspectiveCard from "./PerspectiveCard";

export default function About() {
  return (
    <section id="about" className="grid md:grid-cols-2 gap-12 md:gap-16 px-6 md:px-10 py-16 md:py-20 items-center bg-white">
      <div className="order-2 md:order-1">
        <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#0b2545]">About Our Company</h3>
        <p className="text-gray-600 leading-relaxed mb-6 text-lg">
          Cliberduche Provides Professional Building And Construction Services With A Strong Focus On Quality, Safety, And Long-Term Durability. We Deliver Projects On Time And According To The Highest Industry Standards.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">Quality Assured</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">On-Time Delivery</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">Safety First</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">Expert Team</span>
          </div>
        </div>
        <button className="bg-[#0b2545] hover:bg-[#1f7a8c] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#0b2545]">
          Learn More
        </button>
      </div>

      <PerspectiveCard
        className="w-full order-1 md:order-2"
        enableTilt={true}
        maxRotate={8}
        defaultRotateY={-4}
        defaultTranslateZ={10}
      >
        <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl h-80 md:h-96 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="text-center">
            <svg className="w-16 h-16 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-green-700 font-semibold text-lg">Project Showcase</span>
          </div>
        </div>
      </PerspectiveCard>
    </section>
  );
}
