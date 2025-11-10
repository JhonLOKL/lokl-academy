"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-is-mobile";

export default function Benefits() {
  const isMobile = useIsMobile();
  const [api, setApi] = useState<CarouselApi>();

  const benefits = [
    {
      title: "Impacto y comunidad",
      description:
        "Inversión inmobiliaria con propósito: proyectos reales que crean valor, empleo y tejido local.",
      ctaText: "Invierte con propósito",
      image: "https://lokl-assets.s3.us-east-1.amazonaws.com/home/benefits/Benefit-01.png",
      benefit: "Propósito"
    },
    {
      title: "Accesibilidad",
      description:
        "Montos flexibles y procesos simples para diversificar tu patrimonio sin barreras.",
      ctaText: "Empieza desde $1.000",
      image: "https://lokl-assets.s3.us-east-1.amazonaws.com/home/benefits/Benefit-02.png",
      benefit: "Inclusivo"
    },
    {
      title: "Rentabilidad",
      description:
        "Potencial de retorno con seguimiento transparente y gestión experta del activo.",
      ctaText: "Mira tu retorno",
      image: "https://lokl-assets.s3.us-east-1.amazonaws.com/home/benefits/Benefit-03.png",
      benefit: "Sostenible"
    },
    {
      title: "Seguridad y transparencia",
      description:
        "La confianza no se promete, se construye. Curaduría experta y seguimiento 100% abierto y en tiempo real.",
      ctaText: "Tu inversión segura",
      image:
        "https://lokl-assets.s3.us-east-1.amazonaws.com/home/benefits/Benefit-04.png",
      benefit: "Confiable"
    },
    {
      title: "Valor que vuelve a ti",
      description:
        "Inversión inmobiliaria con propósito: proyectos reales que crean valor, empleo y tejido local..",
      ctaText: "Conoce tus beneficios",
      image: "https://lokl-assets.s3.us-east-1.amazonaws.com/home/benefits/Benefit-05.png",
      benefit: "Integral"
    },
    {
      title: "Educación",
      description:
        "Aprende a invertir mejor: test de perfil, guías, cursos y webinars en vivo.",
      ctaText: "Aprende a invertir",
      image: "https://lokl-assets.s3.us-east-1.amazonaws.com/home/benefits/Benefit-06.png",
      benefit: "Formación"
    },
  ];

  // Navegación del carrusel
  const nextCarousel = () => {
    if (api) {
      api.scrollNext();
    }
  };

  const prevCarousel = () => {
    if (api) {
      api.scrollPrev();
    }
  };

  return (
    <section
      id="benefits"
      className="py-20 sm:py-28 md:py-32 lg:py-36 landscape:py-12 bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 landscape:mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            <span className="text-foreground">Beneficios </span>
            <span className="text-[#5352F6]">de invertir con LOKL</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl landscape:text-sm landscape:sm:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed landscape:leading-snug px-2">
            Inversión inmobiliaria con propósito: rentabilidad financiera, impacto social
            y experiencias que transforman.
          </p>
        </div>

        {/* Benefits Container */}
        <div className="relative md:px-8 lg:px-10 xl:px-12">
          {/* Navigation Buttons - Desktop */}
          {!isMobile && (
            <>
              <button
                onClick={prevCarousel}
                className="hidden md:flex absolute -left-6 lg:-left-8 xl:-left-10 top-1/2 -translate-y-1/2 z-50 w-12 h-12 lg:w-14 lg:h-14 items-center justify-center bg-white rounded-full shadow-lg border-2 border-[#5352F6]/20 hover:bg-[#5352F6] hover:border-[#5352F6] transition-all duration-300 hover:scale-110 group"
                aria-label="Beneficio anterior"
              >
                <ChevronLeft className="w-6 h-6 lg:w-7 lg:h-7 text-black group-hover:text-white transition-colors duration-300" />
              </button>
              <button
                onClick={nextCarousel}
                className="hidden md:flex absolute -right-6 lg:-right-8 xl:-right-10 top-1/2 -translate-y-1/2 z-50 w-12 h-12 lg:w-14 lg:h-14 items-center justify-center bg-white rounded-full shadow-lg border-2 border-[#5352F6]/20 hover:bg-[#5352F6] hover:border-[#5352F6] transition-all duration-300 hover:scale-110 group"
                aria-label="Beneficio siguiente"
              >
                <ChevronRight className="w-6 h-6 lg:w-7 lg:h-7 text-black group-hover:text-white transition-colors duration-300" />
              </button>
            </>
          )}

          {/* Carousel unificado para móvil y desktop */}
          <Carousel
            opts={{
              align: "center",
              loop: true,
              skipSnaps: false,
            }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent className={isMobile ? "-ml-2" : "-ml-4"}>
              {benefits.map((benefit, index) => (
                <CarouselItem 
                  key={index} 
                  className={isMobile 
                    ? "pl-2 basis-[85%] sm:basis-[80%]" 
                    : "pl-4 basis-1/3"
                  }
                >
                  <div className="group h-full cursor-pointer select-none">
                    {/* Tarjeta con imagen de fondo dominante */}
                    <div className={`relative rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 shadow-lg md:shadow-none md:hover:shadow-none ${
                      isMobile 
                        ? "h-[550px] sm:h-[600px] landscape:h-[450px] landscape:sm:h-[500px]" 
                        : "h-[700px] landscape:h-[550px]"
                    }`}>
                      {/* Imagen de fondo a pantalla completa - Optimizada con Next.js Image */}
                      <Image
                        src={benefit.image}
                        alt={benefit.title}
                        fill
                        sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700"
                        priority={index < 3}
                        quality={85}
                      />

                      {/* Overlay gradiente para legibilidad */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/80 group-hover:from-black/30 group-hover:to-black/90 transition-all duration-500 z-10" />

                      {/* Contenido sobre la imagen */}
                      <div className={`relative h-full flex flex-col justify-end z-20 ${
                        isMobile 
                          ? "p-4 sm:p-6 landscape:p-3 landscape:sm:p-4" 
                          : "p-8 landscape:p-5"
                      }`}>
                        {/* Contenido inferior */}
                        <div className={isMobile 
                          ? "space-y-3 sm:space-y-4 landscape:space-y-2" 
                          : "space-y-4 landscape:space-y-2.5"
                        }>
                          {/* Título */}
                          <h3 className={`text-white font-bold leading-tight drop-shadow-lg ${
                            isMobile 
                              ? "text-2xl sm:text-3xl landscape:text-xl landscape:sm:text-2xl" 
                              : "text-4xl landscape:text-2xl"
                          }`}>
                            {benefit.title}
                          </h3>

                          {/* Descripción */}
                          <p className={`text-white/90 leading-relaxed landscape:leading-snug drop-shadow-md ${
                            isMobile 
                              ? "text-base sm:text-lg landscape:text-sm landscape:sm:text-base" 
                              : "text-xl landscape:text-base"
                          }`}>
                            {benefit.description}
                          </p>
                        </div>
                      </div>

                      {/* Brillo decorativo en hover */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#5352F6]/0 via-[#5352F6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-[15]" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

        </div>
      </div>
    </section>
  );
}
