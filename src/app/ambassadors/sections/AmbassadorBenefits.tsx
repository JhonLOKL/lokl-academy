"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PointAccumulateDescription from '../components/PointAccumulateDescription';
import 'swiper/css/navigation';
import 'swiper/css';

export default function AmbassadorBenefits() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const currentSection = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  const goToRegister = () => {
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;
    
    // Si ya estás en una página de auth, mantén los parámetros
    if (currentPath.includes('/login') || currentPath.includes('/register')) {
      const searchParams = new URLSearchParams(window.location.search);
      router.push(`/register?${searchParams.toString()}`);
    } else {
      // Redirigir con el path actual como redirect_to
      router.push(`/register?redirect_to=${currentPath}${currentHash}`);
    }
  };

  const benefits = [
    {
      text: (
        <>
          $500.000 por <br />
          <span className="font-bold">cada referido</span> <br />
          exitoso.
        </>
      ),
    },
    {
      text: (
        <>
          <span className="font-bold">Insignias</span> y<br />
          reconocimiento<br />
          dentro de la<br />
          comunidad.
        </>
      ),
    },
    {
      text: (
        <>
          Participación en<br />
          <span className="font-bold">eventos exclusivos</span><br />
          para embajadores.
        </>
      ),
    },
    {
      text: (
        <>
          Acceso <span className="font-bold">anticipado</span><br />
          a nuevos proyectos.
        </>
      ),
    },
  ];

  return (
    <div ref={sectionRef} className="text-center space-y-12 md:space-y-16 py-16 md:py-24">
      <motion.h2
        className="text-4xl md:text-8xl font-medium px-4 mb-8 md:mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        Beneficios <br /> 
        <span className="font-extralight">del #EmbajadorLokl</span>
      </motion.h2>

      {/* Carrusel móvil */}
      <motion.div
        className="block md:hidden w-full px-4 py-8"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          centeredSlides
          navigation={true}
          loop
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
        >
          {benefits.map((benefit, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center justify-center px-8 py-6">
                <div className="w-20 h-20 relative mb-6">
                  <Image
                    src="/images/ambassadors/ambassador_icon_blue.png"
                    alt={`Beneficio ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-xl font-normal leading-relaxed text-center">
                  {benefit.text}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* Grid desktop */}
      <motion.div
        className="hidden md:grid grid-cols-4 gap-16 max-w-7xl mx-auto px-8 py-8"
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.6 }}
      >
        {benefits.map((benefit, index) => (
          <div key={index} className="flex flex-col items-start">
            <div className="w-16 h-16 relative mb-8">
              <Image
                src="/images/ambassadors/ambassador_icon_blue.png"
                alt={`Beneficio ${index + 1}`}
                fill
                className="object-contain"
              />
            </div>
            <p className="text-2xl font-normal leading-relaxed text-left">
              {benefit.text}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Botón CTA */}
      <div className="flex justify-center items-center pt-8 md:pt-12 pb-8">
        <button
          onClick={() => goToRegister()}
          id="btn-become-ambassador"
          className="px-8 py-4 md:px-12 md:py-5 text-xl md:text-3xl bg-[#5352F6] text-white rounded-full hover:bg-[#4A49E5] transition-all hover:scale-105 w-[280px] md:w-[550px]"
        >
          Quiero ser embajador
        </button>
      </div>

      {/* PointAccumulateDescription component */}
      <PointAccumulateDescription />
    </div>
  );
}

