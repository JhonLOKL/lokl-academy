"use client";

import React, { useEffect, useState } from "react";
import { Footer } from "@/components/design-system";
import { 
  HeroSection,
  BenefitsSection,
  ContentSection,
  TestimonialsSection,
  FaqSection,
  CtaSection,
  BlogSection
} from "@/components/lokl-academy/sections";

export default function LandingPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Cargar los blogs más recientes al montar el componente
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs?limit=4');
        const data = await response.json();
        setBlogs(data.blogs);
      } catch (error) {
        console.error('Error al cargar los blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <main>
        <section id="hero" className="min-h-screen w-full">
          <HeroSection />
        </section>

        <section id="benefits" className="w-full py-16 bg-[#F7F7FB]">
          <BenefitsSection />
        </section>

        <section id="blogs" className="w-full py-16">
          <BlogSection blogs={blogs} />
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