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
        "Invertir con propósito es construir futuro. No se trata solo de capital, sino de consciencia. Invertimos en proyectos que restauran ecosistemas, dignifican el habitar y fortalecen el tejido social. Creamos comunidad entre inversionistas y las localidades donde se encuentran nuestro proyectos.",
      ctaText: "Haz parte de la nueva forma de invertir",
      image:
        "https://i.pinimg.com/1200x/c9/69/d2/c969d204d68ff689d0bb306747ffef21.jpg",
      benefit: "Propósito"
    },
    {
      title: "Accesible desde montos bajos",
      description:
        "La inversión ya no es un privilegio. Es una herramienta de cambio. Desde $1.000 USD puedes activar un impacto real. Diseñamos este modelo para las nuevas generaciones: sin deudas, sin barreras, sin esperar a \"algún día\". Aquí, el acceso es el punto de partida, no el premio.",
      ctaText: "Empieza donde estás, crece con nosotros",
      image: "/images/new-home/Camilodolar.jpg",
      benefit: "Inclusivo"
    },
    {
      title: "Rentabilidad que transforma",
      description:
        "Ganar sí, pero no a cualquier costo. Aquí, la rentabilidad nace del valor que se crea para todos: personas, comunidades y ecosistema. Modelos claros, retornos estimados del 8% al 15% anual y un compromiso con lo que realmente importa. Invertir con propósito también es rentable. Y lo estamos demostrando.",
      ctaText: "Calcula tu retorno financiero y social",
      image:
        "https://i.pinimg.com/1200x/e0/6a/1f/e06a1f4c50a0c9547c67d7d31572ef4d.jpg",
      benefit: "Sostenible"
    },
    {
      title: "Seguridad y transparencia",
      description:
        "La confianza no se promete, se construye. Cada proyecto pasa por una curaduría experta y puedes seguirlo en tiempo real: contratos, pagos, avances, todo abierto. En Lokl, la transparencia no es una opción. Es la base de todo. Porque construir juntos también es rendir cuentas juntos.",
      ctaText: "Conoce cómo protegemos tu inversión",
      image:
        "https://i.pinimg.com/1200x/d2/bb/76/d2bb767f2db2eec528f23ca43858901e.jpg",
      benefit: "Confiable"
    },
    {
      title: "Valor que vuelve a ti",
      description:
        "Invertir con Lokl es más que mover tu dinero: es vivir lo que construyes. Pagas en cuotas, sin deuda ni intermediarios, mientras tu inversión genera impacto real en comunidades locales. Ganas por rentabilidad, valorización y experiencias únicas en los proyectos que ayudas a hacer posibles.",
      ctaText: "Descubre todos los beneficios",
      image:
        "https://i.pinimg.com/1200x/cc/02/33/cc02339533a0292bbd4d2ff5502c6a5a.jpg",
      benefit: "Integral"
    },
  ];

  return (
    <section
      id="benefits"
      className="py-12 md:py-16 bg-[rgb(243,243,243)]"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            <span className="text-[#5352F6]">BENEFICIOS</span> de
            invertir con LOKL
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
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
          className="w-full overflow-visible px-4 -mx-4"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {benefits.map((benefit, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 basis-[85%] md:basis-1/2 lg:basis-1/3"
              >
                <div 
                  className="group h-full cursor-pointer" 
                  onClick={() => api?.scrollTo(index)}
                >
                  {/* Tarjeta con imagen de fondo dominante */}
                  <div className="relative h-[450px] md:h-[550px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
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
                    <div className="relative h-full flex flex-col justify-between p-8">
                      {/* Badge superior opcional */}
                      <div className="self-start">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
                          <div className="w-2 h-2 bg-[#5352F6] rounded-full animate-pulse" />
                          <span className="text-white text-xs font-medium">
                           {benefit.benefit}
                          </span>
                        </div>
                      </div>

                      {/* Contenido inferior */}
                      <div className="space-y-4">
                        {/* Título */}
                        <h3 className="text-white font-bold text-2xl leading-tight drop-shadow-lg">
                          {benefit.title}
                        </h3>

                        {/* Descripción */}
                        <p className="text-white/90 text-sm md:text-base leading-relaxed drop-shadow-md overflow-y-auto max-h-[180px] md:max-h-[220px] pr-2 custom-scrollbar">
                          {benefit.description}
                        </p>

                        {/* Botón CTA */}
                        <Button className="w-full bg-white/95 hover:bg-white text-[#5352F6] border-0 rounded-2xl px-6 py-6 font-medium transition-all duration-300 hover:scale-[1.03] hover:shadow-xl group/button backdrop-blur-sm">
                          <span className="flex items-center justify-center gap-2">
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
