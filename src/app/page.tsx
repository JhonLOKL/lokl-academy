"use client";

import React from "react";
import { Navbar, Footer } from "@/components/design-system";
import { 
  HeroSection,
  BenefitsSection,
  ContentSection,
  TestimonialsSection,
  FaqSection,
  CtaSection
} from "@/components/lokl-academy/sections";

export default function LandingPage() {
  return (
    <>
      <Navbar
        logo={<span className="text-xl font-bold">LOKL <span className="text-[#5352F6]">Academy</span></span>}
        items={[
          { label: "Cursos", href: "#courses" },
          { label: "Blogs", href: "#blogs" },
          { label: "Podcasts", href: "#podcasts" },
          { label: "Noticias", href: "#news" },
          { label: "FAQ", href: "#faq" },
        ]}
        actions={
          <div className="flex items-center space-x-4">
            <a
              href="#login"
              className="text-sm font-medium text-[#0F0F0F] transition-colors hover:text-[#5352F6]"
            >
              Inicia sesión
            </a>
            <a
              href="#register"
              className="rounded-md bg-[#5352F6] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4A4AE5]"
            >
              Regístrate
            </a>
          </div>
        }
      />
      
      <main>
        <section id="hero" className="min-h-screen w-full">
          <HeroSection />
        </section>

        <section id="benefits" className="w-full py-16 bg-[#F7F7FB]">
          <BenefitsSection />
        </section>

        <section id="content" className="w-full py-16">
          <ContentSection />
        </section>

        <section id="testimonials" className="w-full py-16 bg-[#F7F7FB]">
          <TestimonialsSection />
        </section>

        <article id="faq" className="w-full py-16">
          <FaqSection />
        </article>

        <article id="cta" className="w-full py-16 bg-[#5352F6]">
          <CtaSection />
        </article>
      </main>

      <Footer variant="default" />
    </>
  );
}