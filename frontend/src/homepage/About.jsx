import React from "react";
import PerspectiveCard from "./PerspectiveCard";

export default function About() {
  return (
    <section id="about" className="grid md:grid-cols-2 gap-10 px-10 py-20 items-center">
      <div>
        <h3 className="text-2xl font-bold mb-4">About Our Company</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Cliberduche Provides Professional Building And Construction Services With A Strong Focus On Quality, Safety, And Long-Term Durability. We Deliver Projects On Time And According To The Highest Industry Standards.
        </p>
        <button className="mt-4 bg-[#0b2545] text-white px-5 py-2 rounded-full text-sm">Learn More</button>
      </div>

      <PerspectiveCard
        className="w-full h-64"
        enableTilt={true}
        maxRotate={8}
        defaultRotateY={-4}
        defaultTranslateZ={10}
      >
        <div className="bg-green-100 rounded-2xl h-64 flex items-center justify-center">
          <span className="text-green-600 font-semibold">Project Image Placeholder</span>
        </div>
      </PerspectiveCard>
    </section>
  );
}
