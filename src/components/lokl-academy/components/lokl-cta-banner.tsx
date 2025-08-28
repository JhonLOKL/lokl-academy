"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/design-system";

interface LoklCTABannerProps {
  className?: string;
}

const LoklCTABanner: React.FC<LoklCTABannerProps> = ({ className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className={`relative overflow-hidden rounded-xl bg-gradient-to-r from-[#5352F6] to-[#4A4AE5] p-6 md:p-8 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Elementos decorativos */}
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white opacity-10"></div>
      <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-white opacity-10"></div>
      
      <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h3 className="mb-2 text-xl font-bold text-white md:text-2xl">
            Comienza a crecer tu patrimonio con LOKL
          </h3>
          <p className="text-white/90">
            Invierte en bienes raíces, explora proyectos o habla con nuestra asesora IA Laura.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Link href="https://lokl.life/project/nido-de-agua" target="_blank" rel="noopener noreferrer">
            <Button 
              variant="secondary" 
              className={`bg-white text-[#5352F6] hover:bg-gray-100 transition-all duration-300 ${isHovered ? 'shadow-md' : ''}`}
            >
              Ver proyectos
            </Button>
          </Link>
          
          <Link href="https://api.whatsapp.com/send/?phone=573017328112" target="_blank" rel="noopener noreferrer">
            <Button 
              variant="outline" 
              className={`border-white bg-transparent text-white hover:bg-white/10 transition-all duration-300 ${isHovered ? 'shadow-md' : ''}`}
            >
              Hablar con Laura
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default LoklCTABanner;
