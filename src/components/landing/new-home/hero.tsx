"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import LazyImage from "./lazy-image";
import { useProjectStore } from "@/store/project-store";
import { useSimulatorStore } from "@/store/simulator-store";

interface HeroProps {
  onWhatIsClick?: () => void;
}

export default function Hero({ onWhatIsClick }: HeroProps) {
  const { projects: globalProjects } = useProjectStore();
  const { setSelectedProject, setInvestmentAmount, setInstallments } = useSimulatorStore();

  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Filtrar proyectos activos (que no estén en "Etapa 0")
  const availableProjects = globalProjects.filter(p => p.phase !== "Etapa 0");

  // Estado para el simulador del hero
  const [selectedHeroProjectId, setSelectedHeroProjectId] = useState<string>("");
  const [heroInvestmentAmount, setHeroInvestmentAmount] = useState(5310000);

  // Marcar como montado después del primer render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Inicializar el proyecto y monto cuando estén disponibles
  useEffect(() => {
    if (availableProjects.length > 0 && !selectedHeroProjectId) {
      const firstProject = availableProjects[0];
      setSelectedHeroProjectId(firstProject.id);
      const { minInvestment } = calculateSliderRange(firstProject);
      setHeroInvestmentAmount(minInvestment);
    }
  }, [availableProjects, selectedHeroProjectId]);

  // Obtener el proyecto actualmente seleccionado
  const currentHeroProject = availableProjects.find(p => p.id === selectedHeroProjectId) || availableProjects[0];

  // Rotación automática de proyectos cada 5 segundos
  useEffect(() => {
    if (availableProjects.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentProjectIndex(
        (prev) => (prev + 1) % availableProjects.length,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [availableProjects.length]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Helper para calcular rangos del slider
  const calculateSliderRange = (project: { unitPrice: number; minInvestmentUnits: number }) => {
    const minInvestment = project.unitPrice * project.minInvestmentUnits;
    const calculatedMax = project.unitPrice * 100;
    
    // Asegurar que el máximo sea siempre mayor que el mínimo
    let maxInvestment;
    if (calculatedMax <= minInvestment) {
      // Si el máximo calculado es menor o igual al mínimo, usar un múltiplo del mínimo
      maxInvestment = minInvestment * 10; // 10 veces el mínimo para dar rango suficiente
    } else {
      maxInvestment = calculatedMax;
    }
    
    const step = project.unitPrice;
    
    
    return { minInvestment, maxInvestment, step };
  };

  // Actualizar el monto mínimo cuando cambia el proyecto en el hero
  const handleHeroProjectChange = (projectId: string) => {
    const project = availableProjects.find(p => p.id === projectId);
    if (project) {
      setSelectedHeroProjectId(projectId);
      const { minInvestment } = calculateSliderRange(project);
      
      // Siempre iniciar en el valor mínimo del proyecto
      setHeroInvestmentAmount(minInvestment);
    }
  };

  // Handler para el cambio del slider
  const handleSliderChange = (value: number[]) => {
    if (currentHeroProject) {
      const newValue = value[0];
      const { minInvestment, maxInvestment } = calculateSliderRange(currentHeroProject);
      
      // Asegurar que el valor esté dentro del rango válido
      if (newValue >= minInvestment && newValue <= maxInvestment) {
        setHeroInvestmentAmount(newValue);
      }
    }
  };

  const handleViewFullProjection = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!currentHeroProject) return;

    // Guardar datos de la simulación actual en el store global
    setSelectedProject(currentHeroProject);
    setInvestmentAmount(heroInvestmentAmount);
    setInstallments(1); // Por defecto 1 cuota (Pago único)

    console.log("Navegando al simulador con datos:", {
      project: currentHeroProject.name,
      amount: heroInvestmentAmount,
      installments: 1,
    });

    // Hacer scroll al simulador
    const simulatorElement = document.getElementById("simulador");
    if (simulatorElement) {
      simulatorElement.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // Si no existe todavía (por ejemplo, si aún no se ha renderizado)
      // intentar después de un pequeño delay
      setTimeout(() => {
        const element = document.getElementById("simulador");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  const handleWhatIsClick = () => {
    if (onWhatIsClick) {
      onWhatIsClick();
    } else {
      document
        .getElementById("que-es-lokl")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative text-white"
    >
      {/* Contenedor del Hero con imagen de fondo */}
      <div className="relative h-screen md:min-h-screen overflow-hidden">
        {/* Video de fondo - Solo desktop */}
        <div className="absolute inset-0 hidden md:block overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            poster="https://lokl-assets.s3.us-east-1.amazonaws.com/home/video_heroe_poster.jpg"
            aria-label="Video de fondo mostrando proyectos inmobiliarios LOKL"
          >
            <source 
              src="https://lokl-assets.s3.us-east-1.amazonaws.com/home/video_heroe.mp4" 
              type="video/mp4"
            />
            <track
              kind="captions"
              srcLang="es"
              label="Español"
            />
            Tu navegador no soporta videos HTML5.
          </video>
        </div> 

        {/* Fondo con imágenes - Solo móvil - ocupa toda la altura de viewport */}
        <div className="absolute inset-0 md:hidden h-screen">
          {availableProjects.length > 0 ? (
            availableProjects.map((project, index) => (
              <div
                key={project.id}
                aria-hidden="true"
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentProjectIndex
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              >
                <picture>
                  <LazyImage
                    src={project.imageURL}
                    alt={`Proyecto ${project.name} - ${project.city} - LOKL`}
                    className="absolute inset-0 h-full w-full object-cover"
                    priority={index === 0}
                  />
                </picture>
              </div>
            ))
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#5352F6] to-[#3a39c4]" />
          )}
        </div>

        {/* Overlay para contraste del texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 via-50% to-transparent"></div>

        {/* Contenido en 2 columnas - Desktop, 1 columna Mobile - Centrado verticalmente */}
        <div className="relative z-10 mx-auto flex items-center h-full max-w-7xl px-6">
          <div className="grid grid-cols-1 w-full gap-8 md:grid-cols-12">
          {/* Columna IZQUIERDA: texto */}
          <div className="md:col-span-7">
            <h1 className="leading-[0.85] font-semibold md:text-6xl text-[48px] text-left text-[rgb(255,248,248)] max-w-xl">
              Invierte en bienes raíces con propósito y construye tu futuro
            </h1>

            <p className="mt-4 max-w-xl text-lg text-white/90"> 
              Proyectos creativos y sostenibles que generan empleo local y valor real para las nuevas generaciones.
            </p>

            {/* "Invierte" / micro-beneficios */}
            <div className="mt-5 grid grid-cols-2 gap-2 w-fit">
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-center whitespace-nowrap">
                <span className="text-[rgba(255,255,255,1)] font-bold">
                  Diversificación
                </span>
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-center whitespace-nowrap">
                <span className="text-[rgba(255,255,255,1)] font-bold">
                  Hospitality
                </span>
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-center whitespace-nowrap">
                <span className="text-[rgba(255,255,255,1)] font-bold">
                  Sostenibilidad
                </span>
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-center whitespace-nowrap">
                <span className="text-[rgba(255,255,255,1)] font-bold">
                  Crowdfunding
                </span>
              </span>
            </div>

            {/* Proyecto destacado rotativo - fuera de tarjeta */}
            {availableProjects.length > 0 && (
              <div className="mt-6">
                <div
                  key={currentProjectIndex}
                  className="animate-in fade-in duration-500"
                >
                  <p className="text-lg text-white/90 mb-2">
                    <span className="text-white/90">
                      Invierte en{" "}
                    </span>
                    <span className="text-[rgba(255,255,255,1)] font-semibold font-bold">
                      {availableProjects[currentProjectIndex]?.name}
                    </span>
                    <span className="text-white/90"> desde</span>
                  </p>
                  <p className="text-3xl font-semibold text-white">
                    {formatCurrency(
                      availableProjects[currentProjectIndex]?.unitPrice * 
                      availableProjects[currentProjectIndex]?.minInvestmentUnits
                    )}
                  </p>
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#featured-projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("featured-projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-xl bg-[#5352F6] px-5 py-3 font-medium text-white hover:bg-[#5352F6]/90 focus:outline-none focus:ring-2 focus:ring-[#5352F6]/30"
              >
                Ver proyectos
              </a>
              <a
                href="#que-es-lokl"
                onClick={handleWhatIsClick}
                className="rounded-xl border border-white/70 px-5 py-3 font-medium text-white hover:bg-white/10"
              >
                <span className="text-white">¿Qué es </span>
                <span className="text-[rgba(255,255,255,1)] font-bold">
                  LOKL
                </span>
                <span className="text-white">?</span>
              </a>
            </div>
          </div>

          {/* Columna DERECHA: preview del simulador con glassmorphism - Solo desktop */}
          <div className="hidden md:block md:col-span-5">
            <div className="rounded-2xl p-6 shadow-2xl ring-1 ring-white/20 bg-white/15 backdrop-blur-xl backdrop-saturate-150 max-w-sm mx-auto">
              {/* Título del teaser */}
              <h3 className="text-xl font-semibold text-white mb-1">
                Proyección rápida
              </h3>
              <p className="text-sm text-white/70 mb-6">
                Simula tu inversión en segundos
              </p>

              {/* Simulador funcional del hero */}
              {availableProjects.length > 0 && selectedHeroProjectId && currentHeroProject ? (
                <div className="space-y-5 max-w-xs mx-auto">
                  {/* Selector de Proyecto */}
                  <div className="w-full">
                    <label className="text-sm text-white/90 block mb-2">
                      Proyecto
                    </label>
                    <Select
                      value={selectedHeroProjectId}
                      onValueChange={handleHeroProjectChange}
                    >
                      <SelectTrigger className="bg-white/20 border-white/30 text-white hover:bg-white/25 transition-colors w-full">
                        <SelectValue placeholder="Selecciona un proyecto" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableProjects.map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.name} - {project.city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Barra deslizable para monto de inversión */}
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm text-white/90">
                        Valor a invertir
                      </label>
                      <span className="text-sm font-semibold text-white">
                        {formatCurrency(heroInvestmentAmount)}
                      </span>
                    </div>
                    
                    <div className="w-full py-2">
                      {(() => {
                        const { minInvestment, maxInvestment, step } = calculateSliderRange(currentHeroProject);
                        return (
                          <Slider
                            value={[heroInvestmentAmount]}
                            onValueChange={handleSliderChange}
                            min={minInvestment}
                            max={maxInvestment}
                            step={step}
                            className="w-full touch-pan-y"
                          />
                        );
                      })()}
                    </div>
                    
                    <div className="flex justify-between mt-1 text-xs text-white/60">
                      {(() => {
                        const { minInvestment, maxInvestment } = calculateSliderRange(currentHeroProject);
                        return (
                          <>
                            <span>{formatCurrency(minInvestment)}</span>
                            <span>{formatCurrency(maxInvestment)}</span>
                          </>
                        );
                      })()}
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={handleViewFullProjection}
                    className="block w-full rounded-xl bg-[#5352F6] px-4 py-3 text-center font-medium text-white hover:bg-[#5352F6]/90 focus:outline-none focus:ring-2 focus:ring-[#5352F6]/30 transition-all shadow-lg hover:shadow-xl"
                  >
                    Ver proyección completa
                  </button>
                </div>
              ) : (
                <div className="text-center text-white/70 py-8">
                  Cargando simulador...
                </div>
              )}
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Simulador Mobile - Sin tarjeta, directo sobre fondo */}
      <div className="md:hidden bg-background py-8 px-6">
        <div className="max-w-sm mx-auto">
          {/* Título del simulador mobile */}
          <h3 className="text-xl font-semibold text-foreground mb-1">
            Proyección rápida
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Simula tu inversión en segundos
          </p>

          {/* Simulador funcional mobile */}
          {availableProjects.length > 0 && selectedHeroProjectId && currentHeroProject && isMounted ? (
            <div className="space-y-5">
              {/* Selector de Proyecto */}
              <div className="w-full">
                <label className="text-sm text-foreground block mb-2 font-medium">
                  Proyecto
                </label>
                <Select
                  value={selectedHeroProjectId}
                  onValueChange={handleHeroProjectChange}
                >
                  <SelectTrigger className="w-full bg-white !text-black">
                    <SelectValue placeholder="Selecciona un proyecto" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableProjects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name} - {project.city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Barra deslizable para monto de inversión */}
              <div className="w-full">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-foreground font-medium">
                    Valor a invertir
                  </label>
                  <span className="text-sm font-semibold text-[#5352F6]">
                    {formatCurrency(heroInvestmentAmount)}
                  </span>
                </div>
                
                <div className="w-full py-2">
                  {(() => {
                    const { minInvestment, maxInvestment, step } = calculateSliderRange(currentHeroProject);
                    return (
                      <Slider
                        value={[heroInvestmentAmount]}
                        onValueChange={handleSliderChange}
                        min={minInvestment}
                        max={maxInvestment}
                        step={step}
                        className="w-full touch-pan-y"
                      />
                    );
                  })()}
                </div>
                
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  {(() => {
                    const { minInvestment, maxInvestment } = calculateSliderRange(currentHeroProject);
                    return (
                      <>
                        <span>{formatCurrency(minInvestment)}</span>
                        <span>{formatCurrency(maxInvestment)}</span>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={handleViewFullProjection}
                className="block w-full rounded-xl bg-[#5352F6] px-4 py-3 text-center font-medium text-white hover:bg-[#5352F6]/90 focus:outline-none focus:ring-2 focus:ring-[#5352F6]/30 transition-all shadow-lg hover:shadow-xl"
              >
                Ver proyección completa
              </button>
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              Cargando simulador...
            </div>
          )}
        </div>
      </div>

      {/* Schema JSON-LD para SEO del video */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": "LOKL - Inversiones inmobiliarias con propósito",
            "description": "Descubre cómo invertir en bienes raíces y proyectos hoteleros con LOKL. Crowdfunding inmobiliario accesible desde $1.3M mensuales.",
            "thumbnailUrl": "https://lokl-assets.s3.us-east-1.amazonaws.com/home/video_heroe_poster.jpg",
            "uploadDate": "2025-10-28T00:00:00.000Z",
            "contentUrl": "https://lokl-assets.s3.us-east-1.amazonaws.com/home/video_heroe.mp4",
            "embedUrl": "https://lokl.life",
            "duration": "PT1M",
            "publisher": {
              "@type": "Organization",
              "name": "LOKL",
              "logo": {
                "@type": "ImageObject",
                "url": "https://lokl.life/images/lokl-logo.png"
              }
            },
            "inLanguage": "es",
            "keywords": "inversiones inmobiliarias, crowdfunding, bienes raíces, hotelería, LOKL"
          })
        }}
      />
    </section>
  );
}
