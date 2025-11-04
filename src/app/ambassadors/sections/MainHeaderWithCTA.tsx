"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function MainHeaderWithCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target === logoRef.current) {
          setIsVisible(true);
        }
        if (entry.target === textRef.current) {
          setIsButtonVisible(true);
        }
      }
    });
  };
  
  const goToRegister = () => {
    // Adaptar para Next.js - verificar si existe una página de registro de embajadores
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

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.2, 
    });

    if (logoRef.current) observer.observe(logoRef.current);
    if (textRef.current) observer.observe(textRef.current);
    if (buttonRef.current) observer.observe(buttonRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative w-full h-[100vh] bg-gray-50 overflow-hidden">
      {/* Logo en la esquina superior derecha */}
      <div
        ref={logoRef}
        className="absolute top-8 right-8 w-44 h-44 md:w-60 md:h-60 flex items-center justify-center z-20"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1s ease-in-out',
        }}
      >
          <Image
            src="/images/ambassadors/ambassador_logo.png"
            alt="Logo embajadores Inversiones inmobiliarias"
            width={240}
            height={240}
            className="w-full h-full object-contain"
            priority
          />
      </div>

      {/* Contenido principal centrado */}
      <div
        ref={textRef}
        className="relative flex flex-col items-center justify-center h-[100vh] md:mt-36 mt-16 md:h-[80vh] text-center z-10 px-4"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1s ease-in-out 0.3s',
        }}
      >
        <p className="text-base md:text-xl lg:text-3xl text-black mb-2">#CreceConLokl</p>

        <h1
          className="w-full text-[55px] md:text-[80px] lg:text-[165px] font-semibold text-black leading-tight"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(-50px)',
            transition: 'opacity 1s ease-in-out, transform 1s ease-in-out 0.6s',
          }}
        >
          Sé <span className="text-[#5352F6]">Embajador</span> Lokl
        </h1>

        <p
          className="mt-4 text-lg text-gray-600 font-light md:text-3xl mx-10 max-w-[1100px]"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 1s ease-in-out 0.9s',
          }}
        >
          Únete a una comunidad apasionada por democratizar el acceso <br className="hidden md:block" /> 
          a bienes raíces y crear impacto positivo mientras creces con nosotros.
        </p>

        <div
          ref={buttonRef}
          className="mt-8 pt-4 flex flex-col md:flex-row gap-6 md:gap-32 justify-center text-xs md:text-3xl w-[280px] md:w-full md:max-w-[900px]"
          style={{
            opacity: isButtonVisible ? 1 : 0,
            transition: 'opacity 1s ease-in-out 1.2s',
          }}
        >
          <button 
            onClick={() => goToRegister()} 
            id="btn-become-ambassador"
            className="flex-1 px-4 py-3 md:px-2 md:py-2 bg-[#5352F6] text-white rounded-full hover:bg-blue-700 transition-all hover:scale-105 whitespace-nowrap"
          >
            Quiero ser embajador
          </button>

          <button
            onClick={() => scrollToSection('#como-funciona')}
            className="flex-1 px-4 py-3 md:px-2 md:py-2 bg-[#5352F6] text-white rounded-full hover:bg-blue-700 transition-all hover:scale-105 whitespace-nowrap"
          >
            Descubrir cómo funciona
          </button>
        </div>

        <div
          className="absolute hidden xl:block left-0 font-normal md:top-[70%] transform -translate-y-1/2 rotate-[-90deg] text-gray-600 text-lg tracking-widest"
          style={{
            opacity: isButtonVisible ? 1 : 0,
            transition: 'opacity 1s ease-in-out 1.5s',
          }}
        >
          EmbajadoresLokl
        </div>
      </div>
    </div>
  );
}

