"use client";

import React from "react";
import TestimonialCard from "@/components/course/testimonial-card";
import { PlatformReview } from "@/lib/course/schema";

interface TestimonialsSectionProps {
  testimonials: PlatformReview[];
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
          Lo que dicen nuestros estudiantes
        </h2>
        <p className="mx-auto max-w-2xl text-[#6D6C6C]">
          Experiencias reales de inversores que han transformado su futuro financiero con LOKL Academy
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((review) => (
          <TestimonialCard 
            key={review.id} 
            testimonial={{
              id: review.id,
              userName: review.userName,
              userAvatar: review.userAvatar,
              userTitle: review.userTitle,
              content: review.comment,
              rating: review.rating,
              featured: review.featured,
              createdAt: review.createdAt
            }} 
          />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
