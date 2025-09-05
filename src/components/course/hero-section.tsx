"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SearchBar from "./search-bar";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  backgroundImage = "/images/buildings-bw.jpg",
}) => {
  return (
    <section className="relative min-h-[500px] w-full overflow-hidden">
      {/* Imagen de fondo en blanco y negro */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="LOKL Academy - Plataforma educativa"
          fill
          className="object-cover grayscale"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
      </div>

      <div className="relative z-10 flex h-full min-h-[500px] w-full items-center">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
                {title} <span className="text-[#5352F6]">Academy</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="mb-8 text-lg text-white md:text-xl">
                {subtitle}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mx-auto max-w-2xl"
            >
              <SearchBar />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
