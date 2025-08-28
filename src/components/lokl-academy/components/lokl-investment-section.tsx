"use client";

import React, { useState } from "react";
import Link from "next/link";
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
      <div className="container mx-auto mb-6">
        <div className="h-0.5 w-16 bg-[#5352F6]"></div>
      </div>
      
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Columna de contenido */}
          <div className="md:w-1/2 space-y-0">
            <div className="mb-2">
              <span className="text-sm font-medium text-[#5352F6]">#CreceConLokl</span>
              <h2 className="text-2xl md:text-3xl font-bold mt-3">
                <span className="text-[#0F0F0F]">¿Quieres empezar a invertir en inmuebles, </span>
                <span className="text-[#5352F6]">pero...?</span>
              </h2>
            </div>
            
            <Text 
              size="sm" 
              color="muted" 
              className="mb-4"
            >
              LOKL es una plataforma de inversión inmobiliaria que conecta a personas y proyectos únicos. 
              A través de nuestro ecosistema 100% digital democratizamos el acceso a bienes raíces de manera 
              accesible y transparente.
            </Text>
            
            <div className="my-8 pt-2 pb-2">
              <Text 
                size="sm" 
                color="muted" 
                className="border-l-2 border-[#5352F6]/30 pl-3 py-2"
              >
                Tres bloqueos comunes cuando das tus primeros pasos. En LOKL lo hacemos simple.
              </Text>
            </div>
            
            {/* Puntos clave */}
            <div className="grid grid-cols-1 gap-5 py-2">
              <div className="flex items-start gap-4 p-3 bg-white rounded-lg shadow-sm border border-gray-50">
                <div className="bg-[#EEF1FF] p-2.5 rounded-md flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5352F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v6a2 2 0 0 0 2 2h6"></path><path d="M22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-sm mb-1">No quieres el estrés de las deudas eternas y las hipotecas</p>
                  <p className="text-xs text-gray-500">Invierte en proyectos inmobiliarios sin la carga de deudas a largo plazo.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-3 bg-white rounded-lg shadow-sm border border-gray-50">
                <div className="bg-[#EEF1FF] p-2.5 rounded-md flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5352F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-sm mb-1">¿Cómo generar rentas y valorización sin complicaciones?</p>
                  <p className="text-xs text-gray-500">Obtén rentabilidades sin gestionar arriendos ni mantenimiento.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-3 bg-white rounded-lg shadow-sm border border-gray-50">
                <div className="bg-[#EEF1FF] p-2.5 rounded-md flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5352F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-sm mb-1">No quieres esperar una década para empezar a invertir</p>
                  <p className="text-xs text-gray-500">Comienza con tus ahorros y ve resultados desde el primer año.</p>
                </div>
              </div>
            </div>
            
            {/* Botones de acción */}
            <div className="flex flex-wrap gap-4 pt-4 mt-2">
              <Link href="https://lokl.life/project/nido-de-agua" target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="primary" 
                  size="default"
                >
                  Ver proyectos
                </Button>
              </Link>
              
              <Link href="https://lokl.life/" target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="outline" 
                  size="default"
                >
                  Más sobre LOKL
                </Button>
              </Link>
              
              <Link href="https://api.whatsapp.com/send/?phone=573017328112" target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="secondary" 
                  size="default"
                >
                  Hablar con Laura
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Columna de video */}
          <div className="md:w-1/2">
            <div 
              className="aspect-video relative rounded-xl overflow-hidden shadow-lg border border-gray-100"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className={`absolute inset-0 bg-black/10 z-10 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5352F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <p className="text-xs text-center text-gray-500 mt-3">
              Conoce más sobre cómo LOKL te ayuda a crecer tu patrimonio
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoklInvestmentSection;