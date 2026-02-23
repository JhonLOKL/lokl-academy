"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  imageSide?: "left" | "right";
  desktopImages: string[];
  mobileImages: string[];
}

export function AuthLayout({
  children,
  title,
  subtitle,
  imageSide = "left",
  desktopImages,
  mobileImages,
}: AuthLayoutProps) {
  const [currentDesktopImageIndex, setCurrentDesktopImageIndex] = useState(0);
  const [currentMobileImageIndex, setCurrentMobileImageIndex] = useState(0);

  // Rotación automática de imágenes móviles
  useEffect(() => {
    if (mobileImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentMobileImageIndex((prev) => (prev + 1) % mobileImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [mobileImages.length]);

  // Rotación automática de imágenes desktop
  useEffect(() => {
    if (desktopImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentDesktopImageIndex((prev) => (prev + 1) % desktopImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [desktopImages.length]);

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-4 lg:p-6 overflow-hidden">
      <div className="w-full max-w-[1440px] grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 lg:items-center">
        
        {/* Columna Imagen */}
        <motion.div
          initial={{ opacity: 0, x: imageSide === "left" ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={cn(
            "relative w-full h-[320px] lg:h-[560px] rounded-[32px] overflow-hidden order-first shadow-xl",
            imageSide === "right" ? "lg:order-last" : "lg:order-first"
          )}
        >
          {/* Fondo Desktop */}
          <div className="hidden lg:block absolute inset-0">
            {desktopImages.map((imageUrl, index) => (
              <motion.div
                key={`desktop-${index}`}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: index === currentDesktopImageIndex ? 1 : 0,
                  scale: index === currentDesktopImageIndex ? 1.05 : 1
                }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={imageUrl}
                  alt={`LOKL Academy ${index + 1}`}
                  fill
                  className="object-cover object-center"
                  priority={index === 0}
                  quality={90}
                />
              </motion.div>
            ))}
          </div>

          {/* Fondo Móvil */}
          <div className="lg:hidden absolute inset-0">
            {mobileImages.map((imageUrl, index) => (
              <motion.div
                key={`mobile-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentMobileImageIndex ? 1 : 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <Image
                  src={imageUrl}
                  alt={`LOKL Academy ${index + 1}`}
                  fill
                  className="object-cover object-center"
                  priority={index === 0}
                  quality={90}
                />
              </motion.div>
            ))}
          </div>
          
          {/* Overlay y Texto sobre imagen */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10 p-8 text-center space-y-6">
            
            <div className="space-y-2">
              <h3 className="text-2xl lg:text-3xl font-bold tracking-tight">¿Por qué invertir en LOKL?</h3>
              <p className="text-lg lg:text-xl font-medium">
                Ya somos <span className="text-primary-foreground font-bold text-3xl">+ 1000</span>
                <br/>
                inversionistas creciendo juntos
              </p>
            </div>

            <div className="space-y-2 pt-4">
              <p className="text-xl font-medium">Invierte de manera</p>
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
                Simple, transparente, <br/> y flexible
              </h2>
            </div>

          </div>
        </motion.div>

        {/* Columna Formulario */}
        <motion.div
          initial={{ opacity: 0, x: imageSide === "left" ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col justify-center px-4 md:px-12 lg:px-16 py-6"
        >
          <div className="w-full max-w-md mx-auto space-y-6">
            <div className="text-center lg:text-left space-y-2">
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
                {title}
              </h1>
              <p className="text-lg text-gray-500">
                {subtitle}
              </p>
            </div>
            
            {children}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
