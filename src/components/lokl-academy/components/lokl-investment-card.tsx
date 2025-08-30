"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Badge, Text } from "@/components/design-system";

interface LoklInvestmentCardProps {
  className?: string;
}

const LoklInvestmentCard: React.FC<LoklInvestmentCardProps> = ({ className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`relative overflow-hidden rounded-xl ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#F8F9FC] to-[#E9EEFF] z-0"></div>
      
      {/* Elementos decorativos */}
      <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[#5352F6]/10 z-0"></div>
      <div className="absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-[#5352F6]/5 z-0"></div>
      
      <div className="relative z-10 p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Contenido */}
        <div className="md:col-span-7">
          <div className="flex items-center mb-3">
            <Image 
              src="/images/window.svg" 
              alt="LOKL" 
              width={24} 
              height={24} 
              className="mr-2" 
            />
            <span className="text-sm font-medium text-[#5352F6]">LOKL</span>
          </div>
          
          <h3 className="text-2xl font-bold mb-4">
            <span className="text-[#0F0F0F]">¿Qué es </span>
            <span className="text-[#5352F6]">LOKL</span>
            <span className="text-[#0F0F0F]"> y cómo te ayuda?</span>
          </h3>
          
          <Text 
            size="base" 
            color="muted" 
            className="mb-6 max-w-2xl"
          >
            LOKL es una plataforma que democratiza la inversión inmobiliaria, permitiéndote 
            invertir en propiedades premium con montos accesibles. Nuestro equipo de expertos 
            selecciona cuidadosamente cada proyecto para maximizar tu retorno de inversión y 
            ayudarte a construir patrimonio a largo plazo.
          </Text>
          
          {/* Estadísticas */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Retorno anual</p>
              <p className="text-xl font-bold text-[#5352F6]">8-12%</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Inversión mínima</p>
              <p className="text-xl font-bold text-[#0F0F0F]">$500.000</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Proyectos</p>
              <p className="text-xl font-bold text-[#0F0F0F]">Premium</p>
            </div>
          </div>
          
          {/* Botones */}
          <div className="flex flex-wrap gap-4">
            <Link href="https://lokl.life/project/nido-de-agua?utmSource=lokl-academy&utmMedium=organic" target="_blank" rel="noopener noreferrer">
              <Button 
                variant="primary" 
                size="lg"
              >
                Ver proyectos disponibles
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
                Conocer más sobre LOKL
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
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
        
        {/* Imagen */}
        <div className="md:col-span-5 relative h-64 md:h-80 rounded-xl overflow-hidden">
          <Image
            src="/images/modern-building.jpg"
            alt="Inversión inmobiliaria con LOKL"
            fill
            className={`object-cover transition-all duration-500 ${isHovered ? 'scale-105 grayscale-0' : 'grayscale'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute top-4 left-4">
            <Badge variant="default" className="bg-[#5352F6]">Inversión Inmobiliaria</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoklInvestmentCard;