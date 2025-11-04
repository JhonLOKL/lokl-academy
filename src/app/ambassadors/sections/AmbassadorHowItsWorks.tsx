"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function AmbassadorHowItsWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentRef = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      id="como-funciona"
      ref={sectionRef}
      className="flex flex-col relative items-center text-center py-16 md:py-20 min-h-[80vh] w-full px-4 justify-center"
    >
      <motion.p
        className="text-[#5352F6] text-xl md:text-3xl font-light mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        #CreceConLokl
      </motion.p>

      <motion.h2
        className="text-[#5352F6] text-5xl md:text-8xl font-bold mb-12 md:mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        ¿Cómo funciona?
      </motion.h2>

      <motion.div
        className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 w-full max-w-5xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="flex items-center border-[1px] border-[#5352F6] rounded-2xl px-8 py-6 md:px-10 md:py-8 w-full max-w-3xl text-[#5352F6] text-sm md:text-2xl font-light relative gap-4 md:gap-6">
          <span className="font-bold text-2xl md:text-5xl shrink-0">HTTP</span>
          <div className="hidden md:block w-[1px] h-16 bg-[#5352F6] rotate-[25deg]"></div>
          <p className="font-normal text-base md:text-2xl text-left">
            Cada embajador recibe un código y URL único para invitar a sus contactos. Por cada referido que invierta...
          </p>
        </div>
      </motion.div>

      <motion.p
        className="text-[#5352F6] mt-12 md:mt-20 text-5xl md:text-8xl font-bold"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        ¡Tú ganas!
      </motion.p>
    </div>
  );
}

