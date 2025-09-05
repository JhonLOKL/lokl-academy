"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Testimonial } from "@/lib/course/schema";

interface TestimonialCardProps {
  testimonial: Testimonial;
  variant?: "default" | "compact";
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  variant = "default",
}) => {
  // Formatear fecha
  const ratingValue = testimonial.rating ?? 0;
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-CO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className={`
      relative overflow-hidden rounded-lg border border-[#E5E5E5] bg-white p-6 shadow-sm transition-all hover:shadow-md
      ${testimonial.featured ? "border-[#5352F6]" : ""}
      ${variant === "compact" ? "p-4" : ""}
    `}>
      {/* Comillas decorativas */}
      <div className="absolute -left-2 -top-4 text-6xl font-black text-[#F5F5F5] opacity-80">
        &quot;
      </div>

      {/* Contenido del testimonial */}
      <div className="relative">
        {/* Estrellas de calificación */}
        {testimonial.rating && (
          <div className="mb-3 flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < ratingValue ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
              />
            ))}
          </div>
        )}

        {/* Texto del testimonial */}
        <p className={`mb-4 italic text-[#0F0F0F] ${variant === "compact" ? "line-clamp-3 text-sm" : ""}`}>
          &quot;{testimonial.content}&quot;
        </p>

        {/* Información del usuario */}
        <div className="flex items-center">
          {testimonial.userAvatar && (
            <div className="relative mr-3 h-10 w-10 overflow-hidden rounded-full">
              <Image
                src={testimonial.userAvatar}
                alt={testimonial.userName}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div>
            <p className="font-medium">{testimonial.userName}</p>
            {testimonial.userTitle && (
              <p className="text-xs text-[#6D6C6C]">{testimonial.userTitle}</p>
            )}
          </div>
        </div>

        {/* Fecha */}
        {variant !== "compact" && (
          <div className="mt-3 text-xs text-[#6D6C6C]">
            {formatDate(testimonial.createdAt)}
          </div>
        )}

        {/* Etiqueta destacada */}
        {testimonial.featured && (
          <div className="absolute -right-2 -top-2 rounded-full bg-[#5352F6] px-3 py-1 text-xs font-medium text-white">
            Destacado
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialCard;
