"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AmbassadorWhoWeAre() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

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

  return (
    <div ref={sectionRef} className="flex flex-col items-center bg-[#E0E0E0] text-gray-800 min-h-[100vh]">
      <div className="relative w-full h-[35vh] md:h-[50vh]">
        <motion.div
          className="w-full h-full bg-center bg-cover relative"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <Image
            src="/images/ambassadors/ambassador-forest-image.png"
            alt="Bosque LOKL"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between w-full lg:max-w-6xl max-w-3xl mt-20 md:mt-40 md:mb-28">
        <div className="lg:w-1/2 flex flex-col items-center lg:items-end text-center md:text-right">
          <motion.h2
            className="text-7xl lg:text-9xl font-thin md:translate-y-12 lg:mr-20 tracking-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            ¿Quiénes <br />
            <span className="text-[#333333] font-semibold">somos?</span>
          </motion.h2>
        </div>

        <div className="hidden lg:block h-80 md:translate-y-10 w-[1px] bg-black lg:mx-6"></div>

        <div className="lg:w-[45%] xl:w-[90%] w-[80%] flex flex-col xl:translate-x-20 items-center lg:items-start text-center md:text-left">
          <motion.div
            className="w-10 mt-12 h-10 md:w-20 md:h-20 mb-10 relative"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Image
              src="/images/ambassadors/ambassadors-question-mark.png"
              alt="icono signo pregunta lokl"
              fill
              className="object-contain"
            />
          </motion.div>
          <motion.p
            className="text-lg md:text-2xl font-bold text-black mb-10 md:mb-12"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            #CreceConLokl
          </motion.p>
          <motion.p
            className="text-base lg:text-2xl font-normal text-left leading-6 mb-4"
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Lokl es una plataforma de inversión <br />
            inmobiliaria; aunque más que eso, es <br />
            una comunidad que conecta a personas <br />
            y proyectos únicos.
          </motion.p>
          <motion.p
            className="text-base lg:text-2xl font-normal text-left leading-6"
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.9 }}
          >
            A través de un ecosistema 100% digital <br />
            democratizamos el acceso a la inversión <br />
            y a los bienes raíces de manera accesible, <br />
            transparente y con gran impacto social.
          </motion.p>
        </div>
      </div>

      <div className="flex flex-col items-center w-full mt-16 mb-16">
        {isVideoPlaying ? (
          <div className="w-full max-w-[320px] sm:max-w-[480px] md:max-w-6xl aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/GcQSVdwwnKI?autoplay=1&mute=0"
              title="Lokl Video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
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
              id="btn-play-video-who-we-are"
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
        <motion.p
          className="text-lg md:text-4xl font-light text-black mt-7 md:my-20"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.1 }}
        >
          #CreceConLokl
        </motion.p>
      </div>
    </div>
  );
}

