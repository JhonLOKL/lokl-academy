"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';

// Date's events
const events = [
  { year: "2018", description: 'Creación Lokl', color: '#C3E7FB', icon: "/images/about-us/img-home.png" },
  { year: "2020", description: 'Firma primer proyecto', color: '#FFF068', icon: "/images/about-us/img-house-check.png" },
  { year: "2021", description: 'Lanzamiento Indie Universe', color: '#DAD2F8', icon: "/images/about-us/img-building-up.png" },
  { year: "2022", description: 'Lanzamiento Nido de agua', color: '#54FFCC', icon: "/images/about-us/img-houseboat-outline.png" },
  { year: "2023", description: 'Apertura Indie', color: '#C3E7FB', icon: "/images/about-us/img-building-check.png" },
  { year: "2023", description: 'Alcanzamos 1.000 inversionistas', color: '#DAD2F8', icon: "/images/about-us/img-fluent-people-add-light.png" },
  { year: "2024", description: 'Entrega primeros dividendos', color: '#FFF068', icon: "/images/about-us/img-chat-round-money.png" },
  { year: "20♾️", description: 'Construcción de ciudades colaborativas', color: '#54FFCC', icon: "/images/about-us/img-graph-new-up.png" },
];

export function TimeLineColors() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => {
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current);
      }
    };
  }, []);

  // Detectar orientación y tamaño de pantalla
  useEffect(() => {
    const checkOrientation = () => {
      if (typeof window === 'undefined') return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isLandscapeMode = width > height;
      const isMobileDevice = width < 1024; // Consideramos móvil/tablet si es menor a 1024px
      
      setIsLandscape(isLandscapeMode);
      setIsMobile(isMobileDevice);
    };

    // Ejecutar inmediatamente para evitar flash de contenido incorrecto
    checkOrientation();
    
    // Escuchar cambios de tamaño y orientación
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  // Determinar qué layout mostrar
  // isMobile ya considera width < 1024, así que no necesitamos acceder a window aquí
  const showMobileHorizontal = isMobile && isLandscape;
  const showMobileVertical = isMobile && !isLandscape;
  const showDesktop = !isMobile; // Desktop cuando width >= 1024

  return (
    <div className="flex flex-col items-center mx-4 md:mx-16 mt-32 md:mt-60 mb-16 sm:mb-24 md:mb-0" ref={timelineRef}>
      {/* DESKTOP - Horizontal Timeline (pantallas grandes >= 1024px) */}
      <div className={`hidden md:block ${showDesktop ? '!block' : ''} ${!showDesktop ? '!hidden' : ''} relative w-full h-72 pb-4`}>
        {/* Horizontal line */}
        <div className="w-full h-0.5 bg-gray-400 absolute top-[30px]" />

        {/* Horizontal Swiper */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={10}
          slidesPerView={4}
          autoplay={{ delay: 3400, disableOnInteraction: false }}
          className="relative z-10 h-full"
        >
          {events.map((event, index) => (
            <SwiperSlide key={index} className="flex flex-col items-center pt-0">
              {/* Estructura vertical: Icono -> Año -> Descripción */}
              <motion.div
                className="flex flex-col items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Icono - sobre la línea */}
                <motion.div
                  style={{ backgroundColor: event.color }}
                  className="w-[60px] h-[60px] flex items-center rounded-xl justify-center relative z-20"
                  initial={{ scale: 0 }}
                  animate={isVisible ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                >
                  <div className="relative w-[30px] h-[30px]">
                    <Image
                      src={event.icon}
                      alt={`Icono para ${event.year}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </motion.div>
                
                {/* Año */}
                <div className="text-xl font-bold font-mono mt-1">{event.year}</div>
                
                {/* Descripción */}
                <div className="text-base italic text-center max-w-[150px] px-2 pb-2 min-h-[56px] flex items-center justify-center leading-snug">{event.description}</div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      {/* MOBILE HORIZONTAL - Horizontal Timeline with more space (móvil en landscape) */}
      <div className={`hidden sm:block md:hidden ${showMobileHorizontal ? '!block' : ''} ${!showMobileHorizontal ? '!hidden' : ''} relative w-full min-h-[220px] pb-8`}>
        {/* Horizontal line */}
        <div className="w-full h-0.5 bg-gray-400 absolute top-[30px]" />

        {/* Horizontal Swiper */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={8}
          slidesPerView={4}
          autoplay={{ delay: 3400, disableOnInteraction: false }}
          className="relative z-10"
          style={{ height: '220px' }}
        >
          {events.map((event, index) => (
            <SwiperSlide key={index} className="flex flex-col items-center pt-0">
              {/* Estructura vertical: Icono -> Año -> Descripción */}
              <motion.div
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Icono - sobre la línea */}
                <motion.div
                  style={{ backgroundColor: event.color }}
                  className="w-[50px] h-[50px] flex items-center rounded-xl justify-center relative z-20"
                  initial={{ scale: 0 }}
                  animate={isVisible ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                >
                  <div className="relative w-[25px] h-[25px]">
                    <Image
                      src={event.icon}
                      alt={`Icono para ${event.year}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </motion.div>
                
                {/* Año */}
                <div className="text-base font-bold font-mono mt-1">{event.year}</div>
                
                {/* Descripción */}
                <div className="text-sm italic text-center max-w-[120px] px-1 pb-2 min-h-[60px] flex items-center justify-center leading-tight">{event.description}</div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* MOBILE PORTRAIT - Vertical Timeline (móvil en portrait) */}
      <div className={`block sm:hidden ${showMobileVertical ? '!block' : ''} ${!showMobileVertical ? '!hidden' : ''} relative w-full min-h-[600px] pb-8`}>
        {/* Vertical line - centrada con los iconos */}
        <div className="w-0.5 bg-gray-400 absolute left-[20px] top-0 bottom-0" />

        {/* Vertical Swiper */}
        <Swiper
          modules={[Autoplay]}
          direction="vertical"
          spaceBetween={20}
          slidesPerView={3.5}
          autoplay={{ delay: 3400, disableOnInteraction: false }}
          className="relative z-10"
          style={{ height: '600px' }}
          loop={false}
        >
          {events.map((event, index) => (
            <SwiperSlide key={index} className="flex items-center pl-2">
              <div className="flex items-center gap-3 w-full">
                <motion.div
                  style={{ backgroundColor: event.color }}
                  className="w-[40px] h-[40px] flex items-center flex-shrink-0 rounded-xl justify-center relative z-20"
                  initial={{ scale: 0 }}
                  animate={isVisible ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="relative w-[20px] h-[20px]">
                    <Image
                      src={event.icon}
                      alt={`Icono para ${event.year}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </motion.div>
                <motion.div
                  className="text-left flex-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                >
                  <div className="text-base font-bold font-mono">{event.year}</div>
                  <div className="text-xs italic leading-tight">{event.description}</div>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
