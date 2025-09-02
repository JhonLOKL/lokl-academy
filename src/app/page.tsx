import React from "react";
import { Footer } from "@/components/design-system";
import { 
  HeroSection,
  BenefitsSection,
  TestimonialsSection,
  FaqSection,
  CtaSection,
  BlogSection
} from "@/components/lokl-academy/sections";
import { getBlogsLiteAction } from "@/actions/blog-action";

export default async function LandingPage() {
  // Cargar desde la API real (lite) con orden más reciente primero
  const resp = await getBlogsLiteAction({ page: 1, limit: 4, status: "published", sortBy: "createdAt", sortOrder: "DESC" });
  const blogs = resp?.blogs || [];

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