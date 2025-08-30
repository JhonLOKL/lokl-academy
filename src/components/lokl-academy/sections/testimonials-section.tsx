"use client";

import React from "react";
import Image from "next/image";
import { H2, Paragraph } from "@/components/design-system";
import { motion } from "framer-motion";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "LOKL transformó mi manera de invertir en bienes raíces. Los cursos son prácticos y el contenido es de altísima calidad.",
      name: "Carlos Mendoza",
      role: "Inversor Inmobiliario",
      avatar: "/images/couple-investing.jpg"
    },
    {
      quote: "Gracias a los podcasts y cursos de LOKL, logré adquirir mi primera propiedad de inversión con total confianza.",
      name: "María González",
      role: "Emprendedora",
      avatar: "/images/digital-charts.jpg"
    },
    {
      quote: "El nivel de los expertos y la calidad del contenido es excepcional. Definitivamente la mejor plataforma para aprender sobre inversiones.",
      name: "Alejandro Ruiz",
      role: "Asesor Financiero",
      avatar: "/images/buildings-bw.jpg"
    }
  ];

  const stats = [
    { value: "1,000+", label: "Inversionistas" },
    { value: "50+", label: "Cursos" },
    { value: "200+", label: "Artículos" },
    { value: "95%", label: "Satisfacción" }
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="mb-12 text-center">
        <H2 variant="section" className="mb-4">
          Lo que dicen nuestros <span className="text-[#5352F6]">estudiantes</span>
        </H2>
        <Paragraph variant="lead" color="muted" className="mx-auto max-w-2xl">
          Cientos de inversores han transformado su enfoque gracias a nuestra plataforma.
        </Paragraph>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="rounded-lg bg-white p-6 shadow-sm"
          >
            <div className="mb-4 text-[#5352F6]">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 11h-4a1 1 0 01-1-1v-4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1zm-4 2h4l-1 4a1 1 0 01-1 1h-1a1 1 0 01-1-1v-4zm11-2h-4a1 1 0 01-1-1v-4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1zm-4 2h4l-1 4a1 1 0 01-1 1h-1a1 1 0 01-1-1v-4z" fill="currentColor"/>
              </svg>
            </div>
            <Paragraph className="mb-6 italic">
              &ldquo;{testimonial.quote}&rdquo;
            </Paragraph>
            <div className="flex items-center">
              <div className="relative mr-4 h-12 w-12 overflow-hidden rounded-full">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  fill
                  className="object-cover grayscale"
                />
              </div>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-[#6D6C6C]">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16">
        <div className="rounded-lg bg-[#0F0F0F] p-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-3xl font-extrabold text-white md:text-4xl">{stat.value}</p>
                <p className="text-sm text-[#E5E5E5]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
