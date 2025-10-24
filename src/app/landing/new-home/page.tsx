"use client";

import React, { lazy, Suspense, useState } from "react";
import dynamic from "next/dynamic";
import NewHeroSection from "./sections/new-hero-section";
import StatsSection from "./sections/stats-section";
import WhatIsLokl from "@/components/landing/new-home/WhatIsLokl";

// Importación dinámica de componentes menos críticos
const BenefitsSection = dynamic(() => import("./sections/benefits-section"), { 
  loading: () => <div className="w-full h-64 bg-gray-100 flex items-center justify-center"><div className="w-12 h-12 border-4 border-gray-300 border-t-[#5352F6] rounded-full animate-spin"></div></div>
});
const HowItWorksSection = dynamic(() => import("./sections/how-it-works-section"), {
  loading: () => <div className="w-full h-64 bg-gray-100 flex items-center justify-center"><div className="w-12 h-12 border-4 border-gray-300 border-t-[#5352F6] rounded-full animate-spin"></div></div>
});
const SimulatorSection = dynamic(() => import("./sections/simulator-section"), {
  loading: () => <div className="w-full h-64 bg-gray-100 flex items-center justify-center"><div className="w-12 h-12 border-4 border-gray-300 border-t-[#5352F6] rounded-full animate-spin"></div></div>
});
const FeaturedProjectsSection = dynamic(() => import("./sections/featured-projects-section"), {
  loading: () => <div className="w-full h-64 bg-gray-100 flex items-center justify-center"><div className="w-12 h-12 border-4 border-gray-300 border-t-[#5352F6] rounded-full animate-spin"></div></div>
});
const TestimonialsSection = dynamic(() => import("./sections/testimonials-section"), {
  loading: () => <div className="w-full h-64 bg-gray-100 flex items-center justify-center"><div className="w-12 h-12 border-4 border-gray-300 border-t-[#5352F6] rounded-full animate-spin"></div></div>
});
const CommunitySectionWrapper = dynamic(() => import("./sections/community-section"), {
  loading: () => <div className="w-full h-64 bg-gray-100 flex items-center justify-center"><div className="w-12 h-12 border-4 border-gray-300 border-t-[#5352F6] rounded-full animate-spin"></div></div>
});
const FAQSection = dynamic(() => import("./sections/faq-section"), {
  loading: () => <div className="w-full h-64 bg-gray-100 flex items-center justify-center"><div className="w-12 h-12 border-4 border-gray-300 border-t-[#5352F6] rounded-full animate-spin"></div></div>
});
const FinalCTASection = dynamic(() => import("./sections/final-cta-section"), {
  loading: () => <div className="w-full h-64 bg-gray-100 flex items-center justify-center"><div className="w-12 h-12 border-4 border-gray-300 border-t-[#5352F6] rounded-full animate-spin"></div></div>
});

import "../../../components/landing/new-home/animations.css";

export default function NewHomePage() {
  const [showWhatIsLokl, setShowWhatIsLokl] = useState(false);

  const handleWhatIsClick = () => {
    setShowWhatIsLokl(true);
    // Scroll suave a la sección después de un pequeño delay para que se renderice
    setTimeout(() => {
      document
        .getElementById("que-es-lokl")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <main className="min-h-screen w-full">
      <section className="min-h-screen w-full">
        <NewHeroSection onWhatIsClick={handleWhatIsClick} />
      </section>

      {/* Sección WhatIsLokl - Solo se muestra cuando se hace clic en el botón */}
      <section className="w-full">
        <WhatIsLokl isVisible={showWhatIsLokl} />
      </section>

      <section className="w-full">
        <StatsSection />
      </section>

      <section className="w-full">
        <BenefitsSection />
      </section>

      <article className="w-full">
        <HowItWorksSection />
      </article>

      <article className="w-full">
        <SimulatorSection />
      </article>

      <section className="w-full">
        <FeaturedProjectsSection />
      </section>

      <section className="w-full">
        <TestimonialsSection />
      </section>

      <section className="w-full">
        <CommunitySectionWrapper />
      </section>

      <section className="w-full">
        <FAQSection />
      </section>

      <section className="w-full">
        <FinalCTASection />
      </section>
    </main>
  );
}
