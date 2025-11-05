"use client";

import { useEffect, useRef, useState } from "react";
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
  const [carouselIndex, setCarouselIndex] = useState(0);
  
  // Referencias para el manejo de gestos táctiles en móvil (igual que featured-projects)
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const benefits = [
    {
      title: "Impacto y comunidad",
      description:
        "Invertir con propósito es construir futuro. Invertimos donde el capital también construye comunidad y ecosistemas.",
      ctaText: "Invierte con propósito",
      image: "https://lokl-assets.s3.us-east-1.amazonaws.com/home/benefits/Benefit_5.png",
      benefit: "Propósito"
    },
    {
      title: "Accesible desde montos bajos",
      description:
        "La inversión no es un privilegio. Desde $1.000 USD puedes activar impacto real, sin deudas ni barreras.",
      ctaText: "Empieza desde $1.000",
      image: "https://lokl-assets.s3.us-east-1.amazonaws.com/home/benefits/Benefit_1.png",
      benefit: "Inclusivo"
    },
    {
      title: "Rentabilidad que transforma",
      description:
        "Ganar sí, pero no a cualquier costo. Rentabilidad del 8% al 15% anual, con impacto real para todos.",
      ctaText: "Mira tu retorno",
      image: "https://lokl-assets.s3.us-east-1.amazonaws.com/home/benefits/Benefit_2.png",
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
      image: "https://lokl-assets.s3.us-east-1.amazonaws.com/home/benefits/Benefit_4.png",
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
    if (isMobile) {
      setCarouselIndex((prev) => (prev + 1) % benefits.length);
    } else {
      // En desktop con loop, solo usar API
      if (api) {
        api.scrollNext();
      }
    }
  };

  const prevCarousel = () => {
    if (isMobile) {
      setCarouselIndex((prev) => (prev - 1 + benefits.length) % benefits.length);
    } else {
      // En desktop con loop, solo usar API
      if (api) {
        api.scrollPrev();
      }
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
  
  // Sincronizar carouselIndex con el API cuando cambie (solo desktop con loop)
  useEffect(() => {
    if (!api || isMobile) return;
    
    const handleSelect = () => {
      const selected = api.selectedScrollSnap();
      // Con loop, el índice puede ser mayor que benefits.length, así que usamos módulo
      setCarouselIndex(selected % benefits.length);
    };
    
    api.on("select", handleSelect);
    
    return () => {
      api.off("select", handleSelect);
    };
  }, [api, isMobile, benefits.length]);

  return (
    <section
      id="benefits"
      className="py-8 sm:py-12 md:py-16 landscape:py-6 bg-[rgb(243,243,243)]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
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
        <div className="relative md:px-8 lg:px-10 xl:px-12">
          {/* Navigation Buttons - Móvil */}
          {isMobile && (
            <>
              <button
                onClick={prevCarousel}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Beneficio anterior"
              >
                <ChevronLeft className="w-6 h-6 text-black" />
              </button>
              <button
                onClick={nextCarousel}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Beneficio siguiente"
              >
                <ChevronRight className="w-6 h-6 text-black" />
              </button>
            </>
          )}

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
                      <div className="group relative h-[550px] sm:h-[600px] landscape:h-[450px] landscape:sm:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] cursor-pointer">
                        {/* Imagen de fondo a pantalla completa - Optimizada con Next.js Image */}
                        <Image
                          src={benefit.image}
                          alt={benefit.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          priority={index === 0}
                          quality={85}
                        />

                        {/* Overlay gradiente para legibilidad */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/80 group-hover:from-black/30 group-hover:to-black/90 transition-all duration-500 z-10" />

                        {/* Contenido sobre la imagen */}
                        <div className="relative h-full flex flex-col justify-end p-4 sm:p-6 md:p-8 landscape:p-3 landscape:sm:p-4 z-20">
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
                          </div>
                        </div>

                        {/* Brillo decorativo en hover */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#5352F6]/0 via-[#5352F6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-[15]" />
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
                loop: true,
                skipSnaps: false,
              }}
              setApi={setApi}
              className="hidden md:block"
            >
              <CarouselContent className="-ml-4">
                {benefits.map((benefit, index) => (
                  <CarouselItem key={index} className="pl-4 basis-1/3">
                    <div className="group h-full cursor-pointer select-none">
                      {/* Tarjeta con imagen de fondo dominante */}
                      <div className="relative h-[700px] landscape:h-[550px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                        {/* Imagen de fondo a pantalla completa - Optimizada con Next.js Image */}
                        <Image
                          src={benefit.image}
                          alt={benefit.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          priority={index < 3}
                          quality={85}
                        />

                        {/* Overlay gradiente para legibilidad */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/80 group-hover:from-black/30 group-hover:to-black/90 transition-all duration-500 z-10" />

                        {/* Contenido sobre la imagen */}
                        <div className="relative h-full flex flex-col justify-end p-8 landscape:p-5 z-20">
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
          )}

        </div>
      </div>
    </section>
  );
}
