"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import NewHeroSection from "./new-hero-section";
import StatsSection from "./stats-section";
import WhatIsLokl from "@/components/home/WhatIsLokl";
import Simulator from "@/components/simulator/simulator";
import { useEffect } from "react";
import { getProjectCardsAction } from "@/actions/project-actions";

const BenefitsSection = dynamic(() => import("./benefits-section"), { 
  loading: () => <div className="w-full h-64 bg-gray-100 flex items-center justify-center"><div className="w-12 h-12 border-4 border-gray-300 border-t-[#5352F6] rounded-full animate-spin"></div></div>
});
const HowItWorksSection = dynamic(() => import("./how-it-works-section"), {
  loading: () => <div className="w-full h-64 bg-gray-100 flex items-center justify-center"><div className="w-12 h-12 border-4 border-gray-300 border-t-[#5352F6] rounded-full animate-spin"></div></div>
});

const FeaturedProjectsSection = dynamic(() => import("./featured-projects-section"), {
  loading: () => <div className="w-full h-64 bg-gray-100 flex items-center justify-center"><div className="w-12 h-12 border-4 border-gray-300 border-t-[#5352F6] rounded-full animate-spin"></div></div>
});
const TestimonialsSection = dynamic(() => import("./testimonials-section"), {
  loading: () => <div className="w-full h-64 bg-gray-100 flex items-center justify-center"><div className="w-12 h-12 border-4 border-gray-300 border-t-[#5352F6] rounded-full animate-spin"></div></div>
});
const CommunitySectionWrapper = dynamic(() => import("./community-section"), {
  loading: () => <div className="w-full h-64 bg-gray-100 flex items-center justify-center"><div className="w-12 h-12 border-4 border-gray-300 border-t-[#5352F6] rounded-full animate-spin"></div></div>
});
const FAQSection = dynamic(() => import("./faq-section"), {
  loading: () => <div className="w-full h-64 bg-gray-100 flex items-center justify-center"><div className="w-12 h-12 border-4 border-gray-300 border-t-[#5352F6] rounded-full animate-spin"></div></div>
});
const FinalCTASection = dynamic(() => import("./final-cta-section"), {
  loading: () => <div className="w-full h-64 bg-gray-100 flex items-center justify-center"><div className="w-12 h-12 border-4 border-gray-300 border-t-[#5352F6] rounded-full animate-spin"></div></div>
});

export default function HomePageClient() {
  const [showWhatIsLokl, setShowWhatIsLokl] = useState(false);

  // Prefetch de Project Cards al montar la página (primer consumidor)
  useEffect(() => {
    void getProjectCardsAction();
  }, []);

  const handleWhatIsClick = () => {
    setShowWhatIsLokl(true);
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

      <article id="simulador-mobile" className="w-full block md:hidden">
        <Simulator hideRightColumn={true}/>
      </article>

      <section className="w-full">
        <WhatIsLokl isVisible={showWhatIsLokl} />
      </section>

      <section className="w-full">
        <StatsSection />
      </section>

      <section className="w-full">
        <FeaturedProjectsSection />
      </section>

      <section className="w-full">
        <BenefitsSection />
      </section>

      <article className="w-full">
        <HowItWorksSection />
      </article>

      <article id="simulador-desktop" className="w-full hidden md:block">
        <Simulator/>
      </article>

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


