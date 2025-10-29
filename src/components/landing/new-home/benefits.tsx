"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";

export default function Benefits() {
  const [api, setApi] = useState<CarouselApi>();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Configuración del intervalo de rotación automática (6 segundos)
  const autoRotateInterval = 6000;
  
  useEffect(() => {
    if (!api) return;
    
    // Iniciar la rotación automática
    intervalRef.current = setInterval(() => {
      api.scrollNext();
    }, autoRotateInterval);
    
    // Limpiar el intervalo cuando el componente se desmonte
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [api]);
  
  // Pausar la rotación cuando el usuario interactúa con el carrusel
  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };
  
  // Reanudar la rotación cuando el usuario deja de interactuar
  const handleMouseLeave = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      api?.scrollNext();
    }, autoRotateInterval);
  };
  
  const benefits = [
    {
      title: "Impacto y comunidad",
      description:
        "Invertir con propósito es construir futuro. Invertimos donde el capital también construye comunidad y ecosistemas.",
      // Antes: "Haz parte de la nueva forma de invertir"
      ctaText: "Invierte con propósito",
      image: "/images/new-home/TECH_01.png",
      benefit: "Propósito"
    },
    {
      title: "Accesible desde montos bajos",
      description:
        "La inversión no es un privilegio. Desde $1.000 USD puedes activar impacto real, sin deudas ni barreras.",
      // Antes: "Crece con nosotros"
      ctaText: "Empieza desde $1.000",
      image: "/images/new-home/Camilodolar.jpg",
      benefit: "Inclusivo"
    },
    {
      title: "Rentabilidad que transforma",
      description:
        "Ganar sí, pero no a cualquier costo. Rentabilidad del 8% al 15% anual, con impacto real para todos.",
      // Antes: "Calcula tu retorno financiero y social"
      ctaText: "Mira tu retorno",
      image: "/images/new-home/TECH_03.png",
      benefit: "Sostenible"
    },
    {
      title: "Seguridad y transparencia",
      description:
        "La confianza no se promete, se construye. Curaduría experta y seguimiento 100% abierto y en tiempo real.",
      // Antes: "Conoce cómo protegemos tu inversión"
      ctaText: "Tu inversión segura",
      image:
        "https://i.pinimg.com/1200x/d2/bb/76/d2bb767f2db2eec528f23ca43858901e.jpg",
      benefit: "Confiable"
    },
    {
      title: "Valor que vuelve a ti",
      description:
        "Aquí tu inversión también te transforma. Ganas por rentabilidad, impacto y experiencias únicas.",
      // Antes: "Descubre todos los beneficios"
      ctaText: "Conoce tus beneficios",
      image: "/images/new-home/TECH_02.png",
      benefit: "Integral"
    },
  ];
  

  return (
    <section
      id="benefits"
      className="py-8 sm:py-12 md:py-16 bg-[rgb(243,243,243)]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
            <span className="text-[#5352F6]">BENEFICIOS</span> de
            invertir con LOKL
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
            Inversión inmobiliaria con propósito: rentabilidad financiera, impacto social
            y experiencias que transforman.
          </p>
        </div>

        {/* Benefits Carousel */}
        <Carousel
          opts={{
            align: "center",
            loop: true,
            containScroll: false
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleMouseEnter}
          onTouchEnd={handleMouseLeave}
          setApi={setApi}
          className="w-full overflow-visible px-2 sm:px-4 -mx-2 sm:-mx-4"
        >
          <CarouselContent className="-ml-1 sm:-ml-2 md:-ml-4">
            {benefits.map((benefit, index) => (
              <CarouselItem
                key={index}
                className="pl-1 sm:pl-2 md:pl-4 basis-[90%] sm:basis-[85%] md:basis-1/2 lg:basis-1/3"
              >
                <div 
                  className="group h-full cursor-pointer" 
                  onClick={() => api?.scrollTo(index)}
                >
                  {/* Tarjeta con imagen de fondo dominante */}
                  <div className="relative h-[400px] sm:h-[450px] md:h-[550px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                    {/* Imagen de fondo a pantalla completa */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(${benefit.image})`,
                      }}
                    />

                    {/* Overlay gradiente para legibilidad */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/80 group-hover:from-black/30 group-hover:to-black/90 transition-all duration-500" />

                    {/* Contenido sobre la imagen */}
                    <div className="relative h-full flex flex-col justify-between p-4 sm:p-6 md:p-8">
                      {/* Badge superior opcional */}
                      <div className="self-start">
                        <div className="inline-flex items-center gap-2 sm:gap-2.5 bg-white/20 backdrop-blur-md px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/30">
                          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#5352F6] rounded-full animate-pulse" />
                          <span className="text-white text-sm sm:text-base font-medium">
                           {benefit.benefit}
                          </span>
                        </div>
                      </div>

                      {/* Contenido inferior */}
                      <div className="space-y-3 sm:space-y-4">
                        {/* Título */}
                        <h3 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl leading-tight drop-shadow-lg">
                          {benefit.title}
                        </h3>

                        {/* Descripción */}
                        <p className="text-white/90 text-base sm:text-lg md:text-xl leading-relaxed drop-shadow-md overflow-y-auto max-h-[120px] sm:max-h-[140px] md:max-h-[160px] lg:max-h-[180px] pr-1 sm:pr-2 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
                          {benefit.description}
                        </p>

                        {/* Botón CTA */}
                        <Button className="w-full bg-white/95 hover:bg-white text-[#5352F6] border-0 rounded-xl sm:rounded-2xl px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group/button backdrop-blur-sm text-xs sm:text-sm md:text-base min-h-[44px] sm:min-h-[48px] md:min-h-[52px]">
                          <span className="flex items-center justify-center gap-2 text-center leading-tight px-2 break-words">
                            {benefit.ctaText}
                          </span>
                        </Button>
                      </div>
                    </div>

                    {/* Brillo decorativo en hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#5352F6]/0 via-[#5352F6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows */}
          <CarouselPrevious className="hidden md:flex -left-20 h-12 w-12 border-2 border-[#5352F6]/20 bg-white hover:bg-[#5352F6] hover:text-white hover:border-[#5352F6]" />
          <CarouselNext className="hidden md:flex -right-20 h-12 w-12 border-2 border-[#5352F6]/20 bg-white hover:bg-[#5352F6] hover:text-white hover:border-[#5352F6]" />
        </Carousel>

      </div>
    </section>
  );
}
