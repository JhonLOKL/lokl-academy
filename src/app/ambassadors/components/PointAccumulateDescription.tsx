"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const PointAccumulateDescription: React.FC = () => {
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
      className="bg-[#5352F6] text-white p-8 mt-8 relative"
      ref={sectionRef}
    >
      <div className="flex items-center justify-between gap-10 md:mt-20 pt-9">
        <motion.div
          className="text-left md:ml-40 -space-y-1 md:-space-y-3"
          initial={{ opacity: 0, x: -50 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:translate-y-4 md:text-8xl font-thin">
            Acumula
          </h2>
          <div>
            <h2 className="text-7xl md:text-[170px] font-bold">
              puntos
            </h2>
          </div>
          <p className="text-3xl translate-y-4 md:text-8xl font-thin">
            con tus referidos
          </p>
        </motion.div>

        <motion.div
          className="md:w-[340px] md:h-[340px] md:-translate-y-5 w-[240px] h-[240px] md:mr-44 md:mt-10 md:pt-10 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/images/ambassadors/ambassadors-icons-white.png"
            alt="Referidos"
            fill
            className="object-contain"
          />
        </motion.div>
      </div>

      <div className="flex flex-col md:flex-row items-center md:mt-12 w-full mb-20 relative">
        
        <motion.div
          className="md:w-1/2 flex flex-col md:mr-20 my-8 md:my-0 items-center md:items-end text-center md:text-right"
          initial={{ opacity: 0, x: -50 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative">
            <div className="md:text-right">
              <h3 className="text-3xl md:text-5xl font-extralight">
                Gana
              </h3>
              <h3 className="text-3xl md:text-5xl font-semibold">
                recompensas
              </h3>
              <h3 className="text-3xl md:text-5xl font-extralight">
                adicionales
              </h3>
            </div>
          </div>
        </motion.div>

       
        <div className="hidden md:block h-36 w-[1px] bg-white mx-6 relative">
          <div className="w-2 h-2 bg-white rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <motion.div
          className="md:w-1/2 flex flex-col md:flex-row items-center md:text-xl md:ml-28 md:items-start text-center md:text-left gap-4 md:gap-6 flex-wrap"
          initial={{ opacity: 0, x: 25 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-white font-light px-5 py-4 text-base md:text-xl border border-white rounded-xl w-[280px] md:w-auto text-center">
            Estadías en <span className="font-semibold">proyectos únicos</span>
          </div>
          <div className="text-white px-5 py-4 text-base md:text-xl font-light border border-white rounded-xl w-[280px] md:w-auto text-center">
            Bonos de <span className="font-semibold">inversión</span> adicionales
          </div>
          <div className="text-white px-5 py-4 text-base md:text-xl font-light border border-white rounded-xl w-[280px] md:w-auto text-center">
            <span className="font-semibold">Asesorías</span> personalizadas
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PointAccumulateDescription;

