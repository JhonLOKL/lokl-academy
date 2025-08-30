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
      
      <div className="container mx-auto">
        {/* Encabezado */}
        <div className="mb-10">
          <span className="text-sm font-medium text-[#5352F6] mb-3 block">#CreceConLokl</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-[#0F0F0F]">Descubre cómo LOKL te ayuda a </span>
            <span className="text-[#5352F6]">crecer tu patrimonio </span>
            <span className="text-[#0F0F0F]">con inversiones inmobiliarias</span>
          </h2>
          
          <Text 
            size="sm" 
            color="muted"
            className="max-w-2xl"
          >
            LOKL es una plataforma de inversión inmobiliaria que conecta a personas y 
            proyectos únicos. A través de nuestro ecosistema 100% digital democratizamos el 
            acceso a bienes raíces de manera accesible y transparente.
          </Text>
        </div>
        
        <div className="flex flex-col md:flex-row gap-12">
          {/* Columna izquierda: Video */}
          <div className="md:w-1/2 order-2 md:order-1">
            <div 
              className="aspect-video relative rounded-xl overflow-hidden shadow-md border border-gray-100"
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
          
          {/* Columna derecha: Puntos clave */}
          <div className="md:w-1/2 order-1 md:order-2">
            <div className="border-l-2 border-[#5352F6]/30 pl-4 mb-6">
              <Text size="sm" color="muted">
                Tres bloqueos comunes cuando das tus primeros pasos. En LOKL lo hacemos simple.
              </Text>
            </div>
            
            <div className="space-y-5">
              {/* Punto 1 */}
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-50">
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
              
              {/* Punto 2 */}
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-50">
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
              
              {/* Punto 3 */}
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-50">
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
          </div>
        </div>
        
        {/* Botones de acción */}
        <div className="flex flex-wrap gap-4 mt-10 justify-center">
          <Link href="https://lokl.life/project/nido-de-agua?utmSource=lokl-academy&utmMedium=organic" target="_blank" rel="noopener noreferrer">
            <Button 
              variant="primary" 
              size="lg"
            >
              Ver proyectos
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
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoklInvestmentSection;