"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';

export default function AmbassadorStepsToRefer() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const router = useRouter();

  const handlePlayClick = () => {
    setIsVideoPlaying(true);
  };

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
    
    if (currentPath.includes('/login') || currentPath.includes('/register')) {
      const searchParams = new URLSearchParams(window.location.search);
      router.push(`/register?${searchParams.toString()}`);
    } else {
      router.push(`/register?redirect_to=${currentPath}${currentHash}`);
    }
  };

  const steps = [
    {
      icon: "/images/ambassadors/icon-white-ambassadors-union.png",
      text: "Comparte tu código o URL en redes sociales."
    },
    {
      icon: "/images/ambassadors/icon-white-ambassadors-script.png",
      text: "Ayuda a tus referidos a conocer LOKL con nuestras guías."
    },
    {
      icon: "/images/ambassadors/icon-white-ambassadors-chart.png",
      text: "Ve cómo crecen tus recompensas con cada inversión exitosa."
    }
  ];

  return (
    <div ref={sectionRef} className="relative w-full h-auto bg-[#ADADAD]">
      <div className="absolute top-[1%] left-1/2 z-20 transform -translate-x-1/2 -translate-y-[50px] md:-translate-y-[110px]">
        <Image
          src="/images/ambassadors/ambassador_icon_blue.png"
          alt="Ícono Azul"
          width={208}
          height={208}
          className="w-24 h-24 md:w-52 md:h-52"
        />
      </div>

      <motion.div
        className="relative flex flex-col items-center justify-center text-center z-10 py-16 mb-11 px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-[60px] md:text-[90px] lg:text-[140px] font-semibold text-white mb-4">
          Pasos Para <span className="text-[#5352F6]">Referir</span>
        </h2>
      </motion.div>

      {/* Carrusel móvil */}
      <div className="px-4 md:hidden">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true }}
          className="w-full h-56"
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
        >
          {steps.map((step, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center text-center">
                <div className="w-[100px] h-[100px] border-2 border-white rounded-full flex justify-center items-center mb-4">
                  <div className="relative w-[50px] h-[50px]">
                    <Image
                      src={step.icon}
                      alt={`Paso ${index + 1}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <p className="md:text-2xl text-white font-light">
                  {step.text}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Vista desktop */}
      <div className="hidden md:flex flex-col items-center px-4">
        <motion.div
          className="w-full max-w-7xl h-auto mb-8 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Image
            src="/images/ambassadors/ambassador-icons-tasks-white.png"
            alt="Ambassadors Tasks Icons"
            width={1200}
            height={200}
            className="w-full h-auto"
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-14 text-white text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="font-light text-4xl">
            Comparte tu código o <br /> URL en redes sociales.
          </p>
          <p className="font-light text-4xl">
            Ayuda a tus referidos a <br /> conocer LOKL con nuestras <br /> guías.
          </p>
          <p className="font-light text-4xl">
            Ve cómo crecen tus <br /> recompensas con cada <br /> inversión exitosa.
          </p>
        </motion.div>
      </div>

      <motion.h2
        className="text-white text-center text-3xl md:mt-40 md:mb-10 mt-16 md:text-6xl font-semibold mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        ¡Así funcionamos!
      </motion.h2>

      {/* Video section */}
      <div className="flex flex-col items-center w-full mt-16 mb-16">
        {isVideoPlaying ? (
          <motion.div
            className="w-full max-w-[320px] sm:max-w-[480px] md:max-w-6xl aspect-video bg-black rounded-lg overflow-hidden"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/ECcqmGXRrns?autoplay=1&mute=0"
              title="Lokl Video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </motion.div>
        ) : (
          <div className="relative w-full max-w-[320px] sm:max-w-[480px] md:max-w-6xl aspect-video">
            <Image
              src="/images/ambassadors/img-camilo-amabassador.png"
              alt="Video Camilo Ambassador"
              fill
              className="object-cover rounded-lg"
            />
            <button
              onClick={handlePlayClick}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg hover:bg-opacity-60 transition-all"
              id="btn-play-video-stepstorefer"
              aria-label="Reproducir video"
            >
              <div className="relative w-16 h-16 md:w-20 md:h-20">
                <Image
                  src="/images/ambassadors/icon-play.svg"
                  alt="Reproducir video"
                  fill
                  className="object-contain"
                />
              </div>
            </button>
          </div>
        )}
      </div>

      {/* CTA final con imagen de fondo */}
      <div className="relative">
        <Image
          src="/images/ambassadors/ambassador-img-building-gray.png"
          alt="Imagen de edificio"
          width={1920}
          height={300}
          className="w-full h-[300px] object-cover"
        />
        <div className="absolute inset-0 flex justify-center items-center">
          <button
            id="btn-become-ambassador"
            onClick={() => goToRegister()}
            className="bg-[#5352F6] text-white text-xl md:text-4xl font-extralight py-2 md:py-3 px-10 rounded-full hover:bg-[#4A49E5] transition-all transform hover:scale-105"
          >
            QUIERO SER <span className="font-bold">EMBAJADOR</span>
          </button>
        </div>
      </div>
    </div>
  );
}

