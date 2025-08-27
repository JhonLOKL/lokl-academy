"use client";

import React from "react";
import Image from "next/image";
import { Button, H1, Paragraph } from "@/components/design-system";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Imagen de fondo en blanco y negro */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/buildings-bw.jpg"
          alt="LOKL Academy - Inversiones inmobiliarias"
          fill
          className="object-cover grayscale"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
      </div>

      <div className="relative z-10 flex h-full min-h-screen w-full items-center">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <H1 variant="hero" color="white" className="mb-6">
                Domina el mundo de las <span className="text-[#5352F6]">inversiones inmobiliarias</span> con LOKL Academy
              </H1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Paragraph variant="lead" color="white" className="mb-8">
                Accede a cursos, blogs, podcasts, noticias y más para transformar tus inversiones y convertirte en un experto del sector inmobiliario.
              </Paragraph>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg">Empieza ahora</Button>
              <Button variant="secondary" size="lg">Explora nuestros cursos</Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
