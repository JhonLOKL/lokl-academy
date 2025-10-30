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
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-is-mobile";

export default function Benefits() {
  const isMobile = useIsMobile();
  const [api, setApi] = useState<CarouselApi>();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Referencias para el manejo de gestos táctiles en móvil (igual que featured-projects)
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Configuración del intervalo de rotación automática (6 segundos)
  const autoRotateInterval = 6000;

  const benefits = [
    {
      title: "Impacto y comunidad",
      description:
        "Invertir con propósito es construir futuro. Invertimos donde el capital también construye comunidad y ecosistemas.",
      ctaText: "Invierte con propósito",
      image: "https://lokl-assets.s3.us-east-1.amazonaws.com/home/benefits/benefit2.jpg",
      benefit: "Propósito"
    },
    {
      title: "Accesible desde montos bajos",
      description:
        "La inversión no es un privilegio. Desde $1.000 USD puedes activar impacto real, sin deudas ni barreras.",
      ctaText: "Empieza desde $1.000",
      image: "https://lokl-assets.s3.us-east-1.amazonaws.com/home/benefits/benefit1.jpg",
      benefit: "Inclusivo"
    },
    {
      title: "Rentabilidad que transforma",
      description:
        "Ganar sí, pero no a cualquier costo. Rentabilidad del 8% al 15% anual, con impacto real para todos.",
      ctaText: "Mira tu retorno",
      image: "https://lokl-assets.s3.us-east-1.amazonaws.com/home/benefits/benefit2.jpg",
      benefit: "Sostenible"
    },
    {
      title: "Seguridad y transparencia",
      description:
        "La confianza no se promete, se construye. Curaduría experta y seguimiento 100% abierto y en tiempo real.",
      ctaText: "Tu inversión segura",
      image:
        "https://i.pinimg.com/1200x/d2/bb/76/d2bb767f2db2eec528f23ca43858901e.jpg",
      benefit: "Confiable"
    },
    {
      title: "Valor que vuelve a ti",
      description:
        "Aquí tu inversión también te transforma. Ganas por rentabilidad, impacto y experiencias únicas.",
      ctaText: "Conoce tus beneficios",
      image: "https://lokl-assets.s3.us-east-1.amazonaws.com/home/benefits/benefit3.jpg",
      benefit: "Integral"
    },
  ];

  // Manejo de gestos táctiles para móvil (igual que en featured-projects)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 75) {
      // Swipe left
      nextCarousel();
    }

    if (touchStartX.current - touchEndX.current < -75) {
      // Swipe right
      prevCarousel();
    }
  };

  // Navegación del carrusel
  const nextCarousel = () => {
    setCarouselIndex((prev) => (prev + 1) % benefits.length);
    // En desktop, usar API del carrusel
    if (!isMobile && api) {
      api.scrollNext();
    }
  };

  const prevCarousel = () => {
    setCarouselIndex((prev) => (prev - 1 + benefits.length) % benefits.length);
    // En desktop, usar API del carrusel
    if (!isMobile && api) {
      api.scrollPrev();
    }
  };

  // Obtener los beneficios visibles en el orden correcto (igual que featured-projects)
  const getVisibleBenefitsInOrder = () => {
    if (isMobile) {
      // En móvil, mostrar solo el beneficio actual
      return [{ benefit: benefits[carouselIndex], index: carouselIndex }];
    }
    
    // En desktop, mostrar todos los beneficios
    return benefits.map((benefit, index) => ({ benefit, index }));
  };

  const visibleBenefits = getVisibleBenefitsInOrder();
  
  // Auto-rotación solo en desktop
  useEffect(() => {
    if (!api || isMobile) return;
    
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
  }, [api, isMobile]);
  
  // Pausar la rotación cuando el usuario interactúa con el carrusel
  const handleInteractionStart = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };
  
  // Reanudar la rotación cuando el usuario deja de interactuar
  const handleInteractionEnd = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Pequeño delay antes de reanudar para mejor UX
    setTimeout(() => {
      if (!isMobile && api) {
        intervalRef.current = setInterval(() => {
          api.scrollNext();
        }, autoRotateInterval);
      }
    }, 1000);
  };
  
  // Sincronizar carouselIndex con el API cuando cambie (solo desktop)
  useEffect(() => {
    if (!api || isMobile) return;
    
    const handleSelect = () => {
      const selected = api.selectedScrollSnap();
      setCarouselIndex(selected);
    };
    
    api.on("select", handleSelect);
    
    return () => {
      api.off("select", handleSelect);
    };
  }, [api, isMobile]);

  return (
    <section
      id="benefits"
      className="py-8 sm:py-12 md:py-16 landscape:py-6 bg-[rgb(243,243,243)] overflow-x-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 overflow-x-hidden">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 landscape:mb-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl landscape:text-2xl landscape:sm:text-3xl font-bold text-foreground mb-4 sm:mb-6 landscape:mb-3 leading-tight">
            <span className="text-[#5352F6]">BENEFICIOS</span> de
            invertir con LOKL
          </h2>
          <p className="text-base sm:text-lg md:text-xl landscape:text-sm landscape:sm:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed landscape:leading-snug px-2">
            Inversión inmobiliaria con propósito: rentabilidad financiera, impacto social
            y experiencias que transforman.
          </p>
        </div>

        {/* Benefits Container */}
        <div className="relative">
          {/* Navigation Buttons - Mobile (igual que featured-projects) */}
          {isMobile && (
            <>
              <button
                onClick={prevCarousel}
                className="flex md:hidden absolute -left-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Beneficio anterior"
              >
                <ChevronLeft className="w-6 h-6 text-black" />
              </button>
              <button
                onClick={nextCarousel}
                className="flex md:hidden absolute -right-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Beneficio siguiente"
              >
                <ChevronRight className="w-6 h-6 text-black" />
              </button>
            </>
          )}

          {/* Móvil: Contenedor simple con swipe (igual que featured-projects) */}
          {isMobile && (
            <div ref={scrollContainerRef}>
              <div className="flex items-stretch gap-4 max-w-7xl mx-auto justify-center">
                {visibleBenefits.map(({ benefit, index }) => {
                  return (
                    <div
                      key={index}
                      className="transition-all duration-700 ease-in-out flex-shrink-0 w-full max-w-72 landscape:max-w-md mx-auto z-20"
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                    >
                      {/* Tarjeta con imagen de fondo dominante */}
                      <div className="group relative h-[400px] sm:h-[450px] landscape:h-[320px] landscape:sm:h-[360px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] cursor-pointer">
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
                        <div className="relative h-full flex flex-col justify-between p-4 sm:p-6 md:p-8 landscape:p-3 landscape:sm:p-4">
                          {/* Badge superior opcional */}
                          <div className="self-start">
                            <div className="inline-flex items-center gap-2 sm:gap-2.5 landscape:gap-1.5 bg-white/20 backdrop-blur-md px-4 sm:px-5 landscape:px-3 py-2 sm:py-2.5 landscape:py-1.5 rounded-full border border-white/30">
                              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 landscape:w-1.5 landscape:h-1.5 bg-[#5352F6] rounded-full animate-pulse" />
                              <span className="text-white text-sm sm:text-base landscape:text-xs font-medium">
                               {benefit.benefit}
                              </span>
                            </div>
                          </div>

                          {/* Contenido inferior */}
                          <div className="space-y-3 sm:space-y-4 landscape:space-y-2">
                            {/* Título */}
                            <h3 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl landscape:text-xl landscape:sm:text-2xl leading-tight drop-shadow-lg">
                              {benefit.title}
                            </h3>

                            {/* Descripción */}
                            <p className="text-white/90 text-base sm:text-lg md:text-xl landscape:text-sm landscape:sm:text-base leading-relaxed landscape:leading-snug drop-shadow-md overflow-y-auto max-h-[120px] sm:max-h-[140px] md:max-h-[160px] lg:max-h-[180px] landscape:max-h-[80px] landscape:sm:max-h-[100px] pr-1 sm:pr-2 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
                              {benefit.description}
                            </p>

                            {/* Botón CTA */}
                            <Button className="w-full bg-white/95 hover:bg-white text-[#5352F6] border-0 rounded-xl sm:rounded-2xl landscape:rounded-lg px-4 sm:px-5 md:px-6 landscape:px-3 py-3 sm:py-4 md:py-5 landscape:py-2 font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group/button backdrop-blur-sm text-xs sm:text-sm md:text-base landscape:text-xs min-h-[44px] sm:min-h-[48px] md:min-h-[52px] landscape:min-h-[36px]">
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
                  );
                })}
              </div>
            </div>
          )}

          {/* Desktop Carousel */}
          {!isMobile && (
            <Carousel
              opts={{
                align: "start",
                loop: false,
                skipSnaps: false,
              }}
              onMouseEnter={handleInteractionStart}
              onMouseLeave={handleInteractionEnd}
              setApi={setApi}
              className="hidden md:block"
            >
              <CarouselContent className="-ml-4">
                {benefits.map((benefit, index) => (
                  <CarouselItem key={index} className="pl-4 basis-1/3">
                    <div className="group h-full cursor-pointer select-none">
                      {/* Tarjeta con imagen de fondo dominante */}
                      <div className="relative h-[550px] landscape:h-[400px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
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
                        <div className="relative h-full flex flex-col justify-between p-8 landscape:p-5">
                          {/* Badge superior opcional */}
                          <div className="self-start">
                            <div className="inline-flex items-center gap-2.5 landscape:gap-1.5 bg-white/20 backdrop-blur-md px-5 landscape:px-3 py-2.5 landscape:py-1.5 rounded-full border border-white/30">
                              <div className="w-2.5 h-2.5 landscape:w-2 landscape:h-2 bg-[#5352F6] rounded-full animate-pulse" />
                              <span className="text-white text-base landscape:text-sm font-medium">
                               {benefit.benefit}
                              </span>
                            </div>
                          </div>

                          {/* Contenido inferior */}
                          <div className="space-y-4 landscape:space-y-2.5">
                            {/* Título */}
                            <h3 className="text-white font-bold text-4xl landscape:text-2xl leading-tight drop-shadow-lg">
                              {benefit.title}
                            </h3>

                            {/* Descripción */}
                            <p className="text-white/90 text-xl landscape:text-base leading-relaxed landscape:leading-snug drop-shadow-md overflow-y-auto max-h-[180px] landscape:max-h-[100px] pr-2 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
                              {benefit.description}
                            </p>

                            {/* Botón CTA */}
                            <Button className="w-full bg-white/95 hover:bg-white text-[#5352F6] border-0 rounded-2xl landscape:rounded-xl px-6 landscape:px-4 py-5 landscape:py-3 font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group/button backdrop-blur-sm text-base landscape:text-sm min-h-[52px] landscape:min-h-[40px]">
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
          )}

          {/* Dots Indicator - Solo móvil */}
          {isMobile && benefits.length > 1 && (
            <div className="md:hidden flex justify-center gap-2 mt-8 landscape:mt-4">
              {benefits.map((_, index) => (
                <button
                  key={index}
                  className={`h-2.5 landscape:h-2 rounded-full transition-all duration-300 touch-manipulation ${
                    index === carouselIndex 
                      ? 'bg-[#5352F6] w-10 landscape:w-8' 
                      : 'bg-gray-300 hover:bg-gray-400 active:bg-gray-500 w-2.5 landscape:w-2'
                  }`}
                  onClick={() => setCarouselIndex(index)}
                  aria-label={`Ir al beneficio ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
