"use client";

import React from "react";
import NewHeroSection from "./sections/new-hero-section";
import StatsSection from "./sections/stats-section";
import BenefitsSection from "./sections/benefits-section";
import HowItWorksSection from "./sections/how-it-works-section";
import SimulatorSection from "./sections/simulator-section";
import FeaturedProjectsSection from "./sections/featured-projects-section";
import TestimonialsSection from "./sections/testimonials-section";
import CommunitySectionWrapper from "./sections/community-section";
import FAQSection from "./sections/faq-section";
import FinalCTASection from "./sections/final-cta-section";

import "../../../components/landing/new-home/animations.css";

export default function NewHomePage() {
  return (
    <main className="min-h-screen w-full">
      <section className="min-h-screen w-full">
        <NewHeroSection />
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
