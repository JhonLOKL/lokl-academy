"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button, Text } from "@/components/design-system";

interface LoklInvestmentSectionProps {
  className?: string;
}

const LoklInvestmentSection: React.FC<LoklInvestmentSectionProps> = ({ className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <section className={`relative py-16 ${className}`}>
      {/* Fondo con gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-[#F8F9FC] -z-10"></div>
      
      {/* Línea decorativa */}
      <div className="container mx-auto mb-12">
        <div className="h-0.5 w-24 bg-[#5352F6]"></div>
      </div>
      
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Columna de contenido */}
          <div className="md:w-1/2 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              {/* <Image 
                src="/images/window.svg" 
                alt="LOKL" 
                width={24} 
                height={24}
              /> */}
              <span className="text-sm font-medium text-[#5352F6]">#CreceConLokl</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-[#0F0F0F]">Descubre cómo </span>
              <span className="text-[#5352F6]">LOKL</span>
              <span className="text-[#0F0F0F]"> te ayuda a crecer tu patrimonio</span>
            </h2>
            
            <Text 
              size="lg" 
              color="muted" 
              className="max-w-xl"
            >
              LOKL es una plataforma que democratiza la inversión inmobiliaria, conectando a personas 
              y proyectos únicos. A través de un ecosistema 100% digital, facilitamos el acceso a bienes 
              raíces de manera accesible, transparente y con gran impacto social.
            </Text>
            
            {/* Métricas en línea */}
            <div className="flex flex-wrap gap-8 py-4">
              <div>
                <p className="text-sm text-gray-500">Retorno anual</p>
                <p className="text-2xl font-bold text-[#5352F6]">12-15%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Inversión mínima</p>
                <p className="text-2xl font-bold text-[#0F0F0F]">$500.000</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Proyectos</p>
                <p className="text-2xl font-bold text-[#0F0F0F]">Premium</p>
              </div>
            </div>
            
            {/* Botones de acción */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="https://lokl.life/project/nido-de-agua" target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="primary" 
                  size="lg"
                >
                  Ver proyectos
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </Button>
              </Link>
              
              <Link href="https://lokl.life/" target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="outline" 
                  size="lg"
                >
                  Más sobre LOKL
                </Button>
              </Link>
              
              <Link href="https://api.whatsapp.com/send/?phone=573017328112" target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="secondary" 
                  size="lg"
                >
                  Hablar con Laura
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Columna de video */}
          <div 
            className="md:w-1/2 aspect-video relative rounded-xl overflow-hidden shadow-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className={`absolute inset-0 bg-black/10 z-10 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5352F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
            </div>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/tuGviQOfMQU?autoplay=0&rel=0"
              title="LOKL - Descubre cómo crecer tu patrimonio"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoklInvestmentSection;
