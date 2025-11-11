"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, ChevronLeft, ChevronRight, Building2, Waves, Flame, UtensilsCrossed, Dumbbell, Briefcase, Cpu, Car, Coffee, Eye, Play, Home, Maximize2, Sofa, X } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { ProjectCard } from '@/schemas/project-card-schema';

interface FeaturedProjectsProps {
  projectsData?: ProjectCard[];
}

export default function FeaturedProjects({ projectsData }: FeaturedProjectsProps) {
  const isMobile = useIsMobile();
  const [carouselIndex, setCarouselIndex] = useState(0); // Índice del carrusel (qué 3 proyectos mostrar)
  const [selectedProject, setSelectedProject] = useState<number | null>(null); // null = estado inicial
  const [isVideoPlaying, setIsVideoPlaying] = useState(false); // Estado para controlar la reproducción del video
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>(''); // URL del video actual
  const [showInvestors, setShowInvestors] = useState(true); // Estado para alternar entre inversionistas y precio
  const [hoverEnabled, setHoverEnabled] = useState(true);
  const hoverTimeoutRef = useRef<number | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const touchMoved = useRef<boolean>(false);
  const swipeExecuted = useRef<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current !== null) {
        window.clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const scheduleHoverEnable = () => {
    if (hoverTimeoutRef.current !== null) {
      window.clearTimeout(hoverTimeoutRef.current);
    }

    hoverTimeoutRef.current = window.setTimeout(() => {
      setHoverEnabled(true);
      hoverTimeoutRef.current = null;
    }, 800);
  };

  const handleCloseSelection = () => {
    setSelectedProject(null);
    setHoverEnabled(false);
    scheduleHoverEnable();
  };

  // Usar datos de la API si están disponibles
  const projects = projectsData && projectsData.length > 0 ? 
    projectsData.map(project => ({
      id: project.id,
      name: project.name.charAt(0).toUpperCase() + project.name.slice(1), // Capitalizar nombre
      location: `${project.city.charAt(0).toUpperCase() + project.city.slice(1)}, ${project.country.charAt(0).toUpperCase() + project.country.slice(1)}`,
      description: project.description,
      image: project.imageURL,
      videoUrl: project.videoURL || 'https://www.youtube.com/watch?v=example',
      minRoi: project.minRent * 100,
      maxRoi: project.maxRent * 100,
      status: project.name.toLowerCase().includes('aldea') || project.name.toLowerCase().includes('patito') || project.phase === 'No current phase' ? 'Próximamente' : 
              project.name.toLowerCase().includes('nido') ? 'Construcción' :
              project.name.toLowerCase().includes('indie') ? 'Operando' :
              project.phase.includes('Etapa') ? 'En construcción' : project.phase,
      statusColor: project.name.toLowerCase().includes('aldea') || project.name.toLowerCase().includes('patito') || project.phase === 'No current phase' ? 'bg-purple-500' : 
                  project.name.toLowerCase().includes('nido') ? 'bg-blue-500' :
                  project.name.toLowerCase().includes('indie') ? 'bg-green-500' :
                  project.phase.includes('Etapa') ? 'bg-green-500' : 'bg-purple-500',
      viewingNow: Math.floor(Math.random() * 30) + 10, // Valor aleatorio para demostración
      amenities: project.amenities.map(amenity => {
        // Mapear amenidades a formato esperado
        const iconMap: { [key: string]: string } = {
          'Bongo': 'home',
          'Duneke': 'pool',
          'Nido': 'coworking',
          'Tambo': 'gym',
          'Madriguera': 'bbq',
          'Content Labs': 'smart',
          'Coworking': 'coworking',
          'Cafetería': 'cafe',
          'Hotel': 'home',
          'Coliving': 'home',
          'Rooftop': 'restaurant'
        };
        
        return { 
          icon: iconMap[amenity] || 'home', 
          text: amenity 
        };
      }),
      minInvestment: project.unitPrice * project.minInvestmentUnits,
      installments: 12, // Valor por defecto
      totalSize: project.squareMeters / 100, // Convertir a una escala más pequeña para la UI
      units: project.unitPrice,
      fundingProgress: Math.min(Math.floor(Math.random() * 100), 100), // Valor aleatorio para demostración
      daysRemaining: Math.floor(Math.random() * 30) + 5, // Valor aleatorio para demostración
      amountRaised: project.unitPrice * project.partners,
      totalInvestors: project.partners,
      availableSpots: project.availableSpots || 10,
      totalSpots: project.totalSpots || 50,
      tags: [
        { text: project.accommodations > 0 ? 'Residencial' : 'Mixto', color: 'bg-blue-500 text-white' },
        { text: `Riesgo ${project.minRent > 0.14 ? 'Alto' : project.minRent > 0.11 ? 'Medio' : 'Bajo'}`, color: project.minRent > 0.14 ? 'bg-red-500 text-white' : project.minRent > 0.11 ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white' }
      ]
    }))
    : [];

  // Navegación del carrusel
  const nextCarousel = () => {
    if (selectedProject !== null) {
      // Si hay un proyecto seleccionado, avanzar al siguiente proyecto
      setSelectedProject((prev) => prev !== null ? (prev + 1) % projects.length : 0);
    } else {
      // Sin selección, avanzar al siguiente proyecto individualmente
      setCarouselIndex((prev) => (prev + 1) % projects.length);
    }
  };

  const prevCarousel = () => {
    if (selectedProject !== null) {
      // Si hay un proyecto seleccionado, retroceder al proyecto anterior
      setSelectedProject((prev) => prev !== null ? (prev - 1 + projects.length) % projects.length : 0);
    } else {
      // Sin selección, retroceder al proyecto anterior individualmente
      setCarouselIndex((prev) => (prev - 1 + projects.length) % projects.length);
    }
  };

  // Función para manejar la reproducción del video
  const handlePlayVideo = (videoUrl: string) => {
    setCurrentVideoUrl(videoUrl);
    setIsVideoPlaying(true);
  };

  // Función para cerrar el video
  const handleCloseVideo = () => {
    setIsVideoPlaying(false);
    setCurrentVideoUrl('');
  };


  // Obtener los proyectos visibles en el orden correcto
  const getVisibleProjectsInOrder = () => {
    if (selectedProject !== null) {
      // Si hay un proyecto seleccionado, mostrar solo 3 proyectos: el seleccionado y los 2 adyacentes
      const totalProjects = projects.length;
      const prevIndex = (selectedProject - 1 + totalProjects) % totalProjects;
      const nextIndex = (selectedProject + 1) % totalProjects;
      return [
        { project: projects[prevIndex], index: prevIndex },
        { project: projects[selectedProject], index: selectedProject },
        { project: projects[nextIndex], index: nextIndex }
      ];
    }
    
    // Sin selección
    const totalProjects = projects.length;
    
    if (isMobile) {
      // En móvil sin selección, mostrar solo el proyecto actual
      return [{ project: projects[carouselIndex], index: carouselIndex }];
    }
    
    // En desktop sin selección, mostrar 3 proyectos consecutivos basados en carouselIndex
    if (totalProjects <= 3) {
      // Si hay 3 o menos proyectos, mostrar todos en orden
      return projects.map((project, index) => ({ project, index }));
    }
    
    // Para más de 3 proyectos, mostrar 3 consecutivos en orden
    const visibleProjects = [];
    for (let i = 0; i < 3; i++) {
      const actualIndex = (carouselIndex + i) % totalProjects;
      visibleProjects.push({ project: projects[actualIndex], index: actualIndex });
    }
    
    return visibleProjects;
  };

  const visibleProjects = getVisibleProjectsInOrder();

  // Manejo de gestos táctiles para móvil
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchMoved.current = false;
    swipeExecuted.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
    // Marcar que hubo movimiento si la diferencia es mayor a 10px
    const delta = Math.abs(touchStartX.current - touchEndX.current);
    if (delta > 10) {
      touchMoved.current = true;
    }
  };

  const handleTouchEnd = (e?: React.TouchEvent) => {
    // Solo navegar si hubo un movimiento significativo (swipe real)
    // Si fue un tap simple (touchMoved = false), no hacer nada aquí
    // El onClick se encargará de seleccionar el proyecto
    if (!touchMoved.current) {
      touchMoved.current = false;
      return;
    }

    const delta = touchStartX.current - touchEndX.current;
    if (delta > 75) {
      // Swipe left - prevenir que el onClick se ejecute
      swipeExecuted.current = true;
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      nextCarousel();
    } else if (delta < -75) {
      // Swipe right - prevenir que el onClick se ejecute
      swipeExecuted.current = true;
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      prevCarousel();
    }
    
    // Resetear el flag de movimiento, pero mantener swipeExecuted para que onClick lo verifique
    touchMoved.current = false;
  };

  // Efecto para hacer scroll automático en móvil cuando cambia el carouselIndex (solo para desktop)
  useEffect(() => {
    if (selectedProject === null && scrollContainerRef.current && !isMobile) {
      const container = scrollContainerRef.current;
      const cardWidth = container.scrollWidth / projects.length;
      const scrollPosition = cardWidth * carouselIndex;
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [carouselIndex, selectedProject, projects.length, isMobile]);

  // Efecto para resetear el carrusel cuando se deselecciona un proyecto
  useEffect(() => {
    if (selectedProject === null) {
      // Asegurar que el carouselIndex esté dentro del rango válido
      if (carouselIndex >= projects.length) {
        setCarouselIndex(0);
      }
    }
  }, [selectedProject, carouselIndex, projects.length]);

  // Efecto para cerrar el video con la tecla Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isVideoPlaying) {
        handleCloseVideo();
      }
    };

    if (isVideoPlaying) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isVideoPlaying]);

  // Efecto para alternar entre inversionistas y precio en las tarjetas
  useEffect(() => {
    // Resetear al estado inicial cuando cambia el proyecto seleccionado o el carrusel
    setShowInvestors(true);
    
    const interval = setInterval(() => {
      setShowInvestors((prev) => !prev);
    }, 3000); // Cambiar cada 3 segundos

    return () => clearInterval(interval);
  }, [selectedProject, carouselIndex]);

  return (
    <section className="py-12 md:py-16 bg-[rgb(243,243,243)]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            <span className="text-foreground">Proyectos </span>
            <span className="text-[#5352F6]">destacados</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre oportunidades de inversión curadas por nuestro equipo de expertos
          </p>
        </div>

        {/* Stacked Cards Container */}
        <div className="relative perspective-1000 overflow-visible">
          {/* Navigation Buttons - Desktop (ocultos cuando hay selección para evitar que se vean moviendo) */}
          {selectedProject === null && (
            <>
              <button
                onClick={prevCarousel}
                className="hidden md:flex absolute -left-8 lg:-left-12 xl:-left-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 lg:w-14 lg:h-14 items-center justify-center bg-white rounded-full shadow-lg border-2 border-[#5352F6]/20 hover:bg-[#5352F6] hover:border-[#5352F6] transition-all duration-300 hover:scale-110 group"
                aria-label="Proyecto anterior"
              >
                <ChevronLeft className="w-6 h-6 lg:w-7 lg:h-7 text-black group-hover:text-white transition-colors duration-300" />
              </button>
              <button
                onClick={nextCarousel}
                className="hidden md:flex absolute -right-8 lg:-right-12 xl:-right-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 lg:w-14 lg:h-14 items-center justify-center bg-white rounded-full shadow-lg border-2 border-[#5352F6]/20 hover:bg-[#5352F6] hover:border-[#5352F6] transition-all duration-300 hover:scale-110 group"
                aria-label="Proyecto siguiente"
              >
                <ChevronRight className="w-6 h-6 lg:w-7 lg:h-7 text-black group-hover:text-white transition-colors duration-300" />
              </button>
            </>
          )}

          {/* Navigation Buttons - Mobile (solo cuando no hay selección) */}
          {isMobile && selectedProject === null && (
            <>
              <button
                onClick={prevCarousel}
                className="flex md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-40 w-10 h-10 items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Proyecto anterior"
              >
                <ChevronLeft className="w-6 h-6 text-black" />
              </button>
              <button
                onClick={nextCarousel}
                className="flex md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-40 w-10 h-10 items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Proyecto siguiente"
              >
                <ChevronRight className="w-6 h-6 text-black" />
              </button>
            </>
          )}

          {/* Mini Carrusel/Galería en móvil cuando hay proyecto seleccionado */}
          {isMobile && selectedProject !== null && (
            <div className="mb-4 px-4">
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-2 pb-2">
                  {projects.map((project, idx) => (
                    <div 
                      key={idx} 
                      className={`flex-shrink-0 cursor-pointer transition-all duration-300 ${
                        idx === selectedProject 
                          ? 'opacity-100 scale-100 border-2 border-primary' 
                          : 'opacity-70 scale-95 hover:opacity-90 hover:scale-100'
                      }`}
                      onClick={() => setSelectedProject(idx)}
                    >
                      <div className="w-20 h-20 rounded-lg overflow-hidden relative">
                        <ImageWithFallback 
                          src={project.image} 
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                        <div className={`absolute inset-0 ${idx === selectedProject ? 'bg-black/10' : 'bg-black/40'}`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Container con overflow para peek effect en móvil */}
          <div 
            ref={scrollContainerRef}
            className={`
              ${selectedProject === null ? 'md:overflow-visible' : ''}
            `}
          >
            <div className={`flex ${selectedProject !== null ? 'items-start' : 'items-stretch'} ${selectedProject !== null ? 'gap-2' : 'gap-4 md:gap-6'} ${selectedProject === null ? 'md:px-0' : ''} max-w-7xl mx-auto ${selectedProject !== null ? 'justify-center md:justify-between' : isMobile ? 'justify-center' : 'justify-start md:justify-between'}`}>
            {visibleProjects.map(({ project, index }) => {
              // El index viene de getVisibleProjectsInOrder() y debería ser correcto
              // Pero para estar seguros, verificamos que el proyecto en ese índice sea el correcto
              const actualIndex = projects[index]?.id === project.id ? index : projects.findIndex(p => p.id === project.id);
              const finalIndex = actualIndex !== -1 ? actualIndex : index;
              
              const hasManualSelection = selectedProject !== null;
              const isSelected = selectedProject === finalIndex;
              const hasActiveProject = hasManualSelection;
              
              // En móvil, si hay selección, solo mostrar el proyecto seleccionado
              const hideInMobile = isMobile && hasActiveProject && !isSelected;
              
              return (
                <div
                  key={`${finalIndex}-${project.id}`}
                  className={`
                    transition-all duration-700 ease-in-out flex-shrink-0
                    ${hideInMobile ? 'hidden md:block' : ''}
                    ${isSelected 
                      ? 'w-full md:w-[calc(100%-400px)] lg:w-[calc(100%-464px)] z-30' 
                      : hasActiveProject 
                        ? hasManualSelection
                          ? 'md:w-48 lg:w-56 z-10 cursor-pointer'
                          : 'md:w-48 lg:w-56 z-10 md:hover:w-52 lg:hover:w-60 cursor-pointer'
                        : isMobile 
                          ? 'w-full max-w-72 mx-auto z-20' 
                          : 'w-[calc(33.333%-1rem)] z-20 snap-center'
                    }
                    ${!hasManualSelection ? 'cursor-pointer' : ''}
                  `}
                  onClick={() => {
                    // Si hubo un swipe real, el handleTouchEnd ya manejó la navegación
                    // No ejecutar el onClick si se ejecutó un swipe
                    if (swipeExecuted.current) {
                      swipeExecuted.current = false;
                      return;
                    }
                    
                    // Si hay un proyecto seleccionado y se hace clic en una tarjeta lateral, seleccionar ese proyecto
                    if (hasManualSelection && selectedProject !== finalIndex) {
                      setSelectedProject(finalIndex);
                    } else if (!hasManualSelection) {
                      // Si no hay selección, seleccionar el proyecto usando el índice correcto
                      setSelectedProject(finalIndex);
                      // Actualizar carouselIndex para mantener consistencia en móvil
                      if (isMobile) {
                        setCarouselIndex(finalIndex);
                      }
                    }
                  }}
                  onTouchStart={!hasManualSelection ? handleTouchStart : undefined}
                  onTouchMove={!hasManualSelection ? handleTouchMove : undefined}
                  onTouchEnd={!hasManualSelection ? (e) => {
                    handleTouchEnd(e);
                  } : undefined}
                  onMouseEnter={!isMobile && !hasManualSelection && hoverEnabled ? () => {
                    setSelectedProject(finalIndex);
                  } : undefined}
                >
                  {/* Card */}
                  <div className={`
                    ${project.status === 'Próximamente' 
                      ? 'bg-gradient-to-br from-foreground via-foreground to-gray-900' 
                      : 'bg-white'
                    } 
                    rounded-3xl shadow-2xl overflow-hidden
                    ${!hasActiveProject ? 'h-[500px] lg:h-[650px]' : 'h-full'}
                    ${!isSelected && hasActiveProject && !hasManualSelection && 'hover:shadow-3xl'}
                  `}>
                    <div className={`grid grid-cols-1 ${isSelected ? 'lg:grid-cols-2' : ''} ${isSelected ? 'min-h-[600px] lg:min-h-[700px]' : 'h-full'}`}>
                      {/* Left Side - Image (Siempre visible) */}
                      <div className={`relative group/image w-full ${isSelected ? 'min-h-[600px] lg:min-h-[700px]' : !hasActiveProject ? 'h-full' : 'min-h-[500px] lg:min-h-[650px]'} overflow-hidden`}>
                        <ImageWithFallback 
                          src={project.image} 
                          alt={project.name}
                          className="w-full h-full object-cover"
                          width={800}
                          height={600}
                        />
                        
                        {/* Overlay oscuro - Menos intenso en móvil */}
                        <div className={`absolute inset-0 ${isSelected ? 'bg-black/10' : hasActiveProject && !isSelected ? 'bg-black/40' : isMobile ? 'bg-black/5' : 'bg-black/30'}`}></div>

                        {/* Eliminado el overlay con flechas para tarjetas laterales */}

                        {/* Badges - Top Left */}
                        {(!hasActiveProject || isSelected) && (
                          <div className="absolute top-4 left-4 flex flex-col gap-2">
                            <Badge className={`${project.statusColor} text-white text-xs font-semibold px-4 py-1.5 shadow-lg`}>
                              {project.status}
                            </Badge>
                            {project.status !== 'Próximamente' && (
                              <Badge className="bg-primary text-white text-xs font-semibold px-4 py-1.5 shadow-lg">
                                {project.minRoi}-{project.maxRoi}% ROI
                              </Badge>
                            )}
                          </div>
                        )}

                        {/* Badges para tarjetas laterales cuando hay selección */}
                        {hasActiveProject && !isSelected && (
                          <div className="absolute top-4 left-4 flex flex-col gap-2 z-50">
                            <Badge className={`${project.statusColor} text-white text-sm font-semibold px-3 py-1.5 shadow-lg`}>
                              {project.status}
                            </Badge>
                            {project.status !== 'Próximamente' && (
                              <Badge className="bg-primary text-white text-sm font-semibold px-3 py-1.5 shadow-lg">
                                {project.minRoi}-{project.maxRoi}% ROI
                              </Badge>
                            )}
                          </div>
                        )}

                        {/* Viewing Now - Top Right (solo en seleccionada) */}
                        {isSelected && project.status !== 'Próximamente' && (
                          <div className="absolute top-4 right-4">
                            <div className="bg-black/70 backdrop-blur-md text-white px-3 py-2 rounded-full text-xs flex items-center gap-2 shadow-lg animate-pulse">
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                              <Eye className="w-3.5 h-3.5" />
                              <span className="font-semibold">{project.viewingNow} viendo ahora</span>
                            </div>
                          </div>
                        )}
                        
                        {/* Video Play Button - Center (solo en seleccionada) */}
                        {isSelected && project.status !== 'Próximamente' && project.videoUrl && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlayVideo(project.videoUrl);
                            }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 group-hover/image:scale-105"
                          >
                            <Play className="w-7 h-7 text-primary ml-1" fill="currentColor" />
                          </button>
                        )}

                        {/* Info prominente - En estado inicial (sin selección) - Versión móvil */}
                        {!hasActiveProject && isMobile && (
                          <div className="md:hidden absolute inset-0 flex flex-col justify-end p-5 text-white bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                            {project.status !== 'Próximamente' ? (
                              <>
                                {/* Nombre del proyecto */}
                                <h3 className="text-2xl font-bold mb-2 leading-tight drop-shadow-lg text-shadow">
                                  {project.name}
                                </h3>

                                {/* Ubicación */}
                                <div className="flex items-center gap-2 mb-3">
                                  <MapPin className="w-4 h-4 drop-shadow-md" />
                                  <span className="text-base drop-shadow-lg text-shadow-sm">
                                    {project.location}
                                  </span>
                                </div>

                                {/* Información rotativa: Inversionistas o Precio del Unit (tamaño pequeño) */}
                                {(() => {
                                  const hasInvestors = project.totalInvestors !== undefined && project.totalInvestors > 0;
                                  const hasUnits = project.units !== undefined && project.units > 0;
                                  
                                  if (!hasInvestors && !hasUnits) return null;
                                  
                                  // Si solo tiene una opción, mostrar esa
                                  if (hasInvestors && !hasUnits) {
                                    return (
                                      <div className="mb-3 min-h-[30px] flex items-center">
                                        <div className="flex flex-col">
                                          <span className="text-lg font-semibold drop-shadow-md text-shadow">
                                            {project.totalInvestors.toLocaleString('es-CO')}
                                          </span>
                                          <span className="text-xs text-white/80 drop-shadow-sm">
                                            Inversionistas
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  }
                                  
                                  if (!hasInvestors && hasUnits) {
                                    return (
                                      <div className="mb-3 min-h-[30px] flex items-center">
                                        <div className="flex flex-col">
                                          <span className="text-lg font-semibold drop-shadow-md text-shadow">
                                            ${project.units.toLocaleString('es-CO')}
                                          </span>
                                          <span className="text-xs text-white/80 drop-shadow-sm">
                                            Precio por Unit
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  }
                                  
                                  // Si tiene ambas, alternar
                                  return (
                                    <div className="mb-3 min-h-[30px] flex items-center">
                                      <div className="transition-all duration-500 ease-in-out">
                                        {showInvestors ? (
                                          <div className="flex flex-col">
                                            <span className="text-lg font-semibold drop-shadow-md text-shadow">
                                              {project.totalInvestors.toLocaleString('es-CO')}
                                            </span>
                                            <span className="text-xs text-white/80 drop-shadow-sm">
                                              Inversionistas
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="flex flex-col">
                                            <span className="text-lg font-semibold drop-shadow-md text-shadow">
                                              ${project.units.toLocaleString('es-CO')}
                                            </span>
                                            <span className="text-xs text-white/80 drop-shadow-sm">
                                              Precio por Unit
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })()}

                                {/* CUPOS DISPONIBLES - Reducido */}
                                <div className="mb-4">
                                  <div className="flex items-baseline gap-2 mb-1">
                                    <span className="text-3xl font-bold leading-none drop-shadow-lg text-shadow">
                                      {project.availableSpots}
                                    </span>
                                    <span className="text-xl font-bold opacity-80 leading-none drop-shadow-md">
                                      /{project.totalSpots}
                                    </span>
                                  </div>
                                  <p className="text-base font-semibold drop-shadow-lg">Cupos Disponibles</p>
                                </div>
                              </>
                            ) : (
                              // Coming Soon - Misma altura mínima que las otras tarjetas
                              <>
                                {/* Nombre del proyecto */}
                                <h3 className="text-2xl font-bold mb-2 leading-tight drop-shadow-lg text-shadow">
                                  {project.name}
                                </h3>

                                {/* Ubicación */}
                                <div className="flex items-center gap-2 mb-4">
                                  <MapPin className="w-4 h-4 drop-shadow-md" />
                                  <span className="text-base drop-shadow-lg text-shadow-sm">
                                    {project.location}
                                  </span>
                                </div>

                                {/* Badge de Próximamente */}
                                <div className="mb-4">
                                  <Badge className="bg-white/40 text-white text-sm px-4 py-1.5 w-fit backdrop-blur-sm shadow-lg">
                                    Únete a la lista de espera
                                  </Badge>
                                </div>
                              </>
                            )}
                          </div>
                        )}

                        {/* Info prominente - En estado inicial (sin selección) - Versión desktop */}
                        {!hasActiveProject && (
                          <div className="hidden md:flex absolute inset-0 flex-col justify-end p-6 lg:p-8 text-white">
                            {project.status !== 'Próximamente' ? (
                              <>
                                {/* Nombre del proyecto */}
                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 leading-tight">
                                  {project.name}
                                </h3>

                                {/* Ubicación */}
                                <div className="flex items-center gap-2 mb-6">
                                  <MapPin className="w-5 h-5" />
                                  <span className="text-base lg:text-lg">{project.location}</span>
                                </div>

                                {/* Información rotativa: Inversionistas o Precio del Unit (tamaño pequeño) */}
                                {(() => {
                                  const hasInvestors = project.totalInvestors !== undefined && project.totalInvestors > 0;
                                  const hasUnits = project.units !== undefined && project.units > 0;
                                  
                                  if (!hasInvestors && !hasUnits) return null;
                                  
                                  // Si solo tiene una opción, mostrar esa
                                  if (hasInvestors && !hasUnits) {
                                    return (
                                      <div className="mb-6 min-h-[40px] flex items-center">
                                        <div className="flex flex-col">
                                          <span className="text-xl sm:text-2xl font-semibold leading-none">
                                            {project.totalInvestors.toLocaleString('es-CO')}
                                          </span>
                                          <span className="text-sm text-white/80">
                                            Inversionistas
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  }
                                  
                                  if (!hasInvestors && hasUnits) {
                                    return (
                                      <div className="mb-6 min-h-[40px] flex items-center">
                                        <div className="flex flex-col">
                                          <span className="text-xl sm:text-2xl font-semibold leading-none">
                                            ${project.units.toLocaleString('es-CO')}
                                          </span>
                                          <span className="text-sm text-white/80">
                                            Precio por Unit
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  }
                                  
                                  // Si tiene ambas, alternar
                                  return (
                                    <div className="mb-6 min-h-[40px] flex items-center">
                                      <div className="transition-all duration-500 ease-in-out">
                                        {showInvestors ? (
                                          <div className="flex flex-col">
                                            <span className="text-xl sm:text-2xl font-semibold leading-none">
                                              {project.totalInvestors.toLocaleString('es-CO')}
                                            </span>
                                            <span className="text-sm text-white/80">
                                              Inversionistas
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="flex flex-col">
                                            <span className="text-xl sm:text-2xl font-semibold leading-none">
                                              ${project.units.toLocaleString('es-CO')}
                                            </span>
                                            <span className="text-sm text-white/80">
                                              Precio por Unit
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })()}

                                {/* CUPOS DISPONIBLES - Reducido */}
                                <div className="mb-4 min-h-[80px] sm:min-h-[85px] lg:min-h-[90px]">
                                  <div className="flex items-baseline gap-2 mb-2">
                                    <span className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-none">
                                      {project.availableSpots}
                                    </span>
                                    <span className="text-2xl sm:text-3xl lg:text-4xl font-bold opacity-70 leading-none">
                                      /{project.totalSpots}
                                    </span>
                                  </div>
                                  <p className="text-base lg:text-lg font-semibold">Cupos Disponibles</p>
                                </div>
                              </>
                            ) : (
                              // Coming Soon - Misma altura mínima que las otras tarjetas
                              <>
                                {/* Nombre del proyecto */}
                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 leading-tight">
                                  {project.name}
                                </h3>

                                {/* Ubicación */}
                                <div className="flex items-center gap-2 mb-8">
                                  <MapPin className="w-5 h-5" />
                                  <span className="text-base lg:text-lg">{project.location}</span>
                                </div>

                                {/* Espaciador con misma altura que sección de cupos */}
                                <div className="mb-4 min-h-[80px] sm:min-h-[85px] lg:min-h-[90px]">
                                  <Badge className="bg-white/20 text-white text-base px-6 py-3 w-fit backdrop-blur-sm">
                                    Únete a la lista de espera
                                  </Badge>
                                </div>
                              </>
                            )}
                          </div>
                        )}

                        {/* Contenido para tarjetas laterales cuando hay selección */}
                        {hasActiveProject && !isSelected && (
                          <div className="absolute inset-0 flex flex-col justify-end p-5 lg:p-6 text-white bg-gradient-to-t from-black/70 via-black/40 to-transparent z-50">
                            {project.status !== 'Próximamente' ? (
                              <>
                                {/* Nombre del proyecto */}
                                <h3 className="text-xl lg:text-2xl font-bold mb-3 leading-tight drop-shadow-lg line-clamp-2">
                                  {project.name}
                                </h3>

                                {/* Ubicación */}
                                <div className="flex items-center gap-2 mb-4">
                                  <MapPin className="w-4 h-4 lg:w-5 lg:h-5 drop-shadow-md flex-shrink-0" />
                                  <span className="text-sm lg:text-base drop-shadow-lg line-clamp-1">
                                    {project.location}
                                  </span>
                                </div>

                                {/* Información rotativa: Inversionistas o Precio del Unit */}
                                {(() => {
                                  const hasInvestors = project.totalInvestors !== undefined && project.totalInvestors > 0;
                                  const hasUnits = project.units !== undefined && project.units > 0;
                                  
                                  if (!hasInvestors && !hasUnits) return null;
                                  
                                  // Si solo tiene una opción, mostrar esa
                                  if (hasInvestors && !hasUnits) {
                                    return (
                                      <div className="mb-4 min-h-[40px] flex items-center">
                                        <div className="flex flex-col">
                                          <span className="text-lg lg:text-xl font-bold drop-shadow-lg">
                                            {project.totalInvestors.toLocaleString('es-CO')}
                                          </span>
                                          <span className="text-xs lg:text-sm text-white/90 drop-shadow-md">
                                            Inversionistas
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  }
                                  
                                  if (!hasInvestors && hasUnits) {
                                    return (
                                      <div className="mb-4 min-h-[40px] flex items-center">
                                        <div className="flex flex-col">
                                          <span className="text-lg lg:text-xl font-bold drop-shadow-lg">
                                            ${project.units.toLocaleString('es-CO')}
                                          </span>
                                          <span className="text-xs lg:text-sm text-white/90 drop-shadow-md">
                                            Precio por Unit
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  }
                                  
                                  // Si tiene ambas, alternar
                                  return (
                                    <div className="mb-4 min-h-[40px] flex items-center">
                                      <div className="transition-all duration-500 ease-in-out">
                                        {showInvestors ? (
                                          <div className="flex flex-col">
                                            <span className="text-lg lg:text-xl font-bold drop-shadow-lg">
                                              {project.totalInvestors.toLocaleString('es-CO')}
                                            </span>
                                            <span className="text-xs lg:text-sm text-white/90 drop-shadow-md">
                                              Inversionistas
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="flex flex-col">
                                            <span className="text-lg lg:text-xl font-bold drop-shadow-lg">
                                              ${project.units.toLocaleString('es-CO')}
                                            </span>
                                            <span className="text-xs lg:text-sm text-white/90 drop-shadow-md">
                                              Precio por Unit
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })()}

                                {/* CUPOS DISPONIBLES */}
                                <div className="mb-3">
                                  <div className="flex items-baseline gap-1.5 mb-1.5">
                                    <span className="text-2xl lg:text-3xl font-bold leading-none drop-shadow-lg">
                                      {project.availableSpots}
                                    </span>
                                    <span className="text-lg lg:text-xl font-bold opacity-80 leading-none drop-shadow-md">
                                      /{project.totalSpots}
                                    </span>
                                  </div>
                                  <p className="text-sm lg:text-base font-semibold drop-shadow-lg">Cupos Disponibles</p>
                                </div>
                              </>
                            ) : (
                              <>
                                {/* Nombre del proyecto */}
                                <h3 className="text-xl lg:text-2xl font-bold mb-3 leading-tight drop-shadow-lg line-clamp-2">
                                  {project.name}
                                </h3>

                                {/* Ubicación */}
                                <div className="flex items-center gap-2 mb-4">
                                  <MapPin className="w-4 h-4 lg:w-5 lg:h-5 drop-shadow-md flex-shrink-0" />
                                  <span className="text-sm lg:text-base drop-shadow-lg line-clamp-1">
                                    {project.location}
                                  </span>
                                </div>

                                {/* Badge de Próximamente */}
                                <div className="mb-3">
                                  <Badge className="bg-white/20 text-white text-sm lg:text-base px-4 py-2 w-fit backdrop-blur-sm shadow-lg">
                                    Únete a la lista de espera
                                  </Badge>
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Right Side - Content (Solo visible en tarjeta seleccionada) */}
                      {isSelected && (
                        project.status === 'Próximamente' ? (
                          // DISEÑO ESPECIAL PARA COMING SOON
                          <div className="p-6 lg:p-10 flex flex-col justify-center h-full bg-gradient-to-br from-foreground via-foreground to-gray-900 text-white relative">
                            {/* Close Button */}
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCloseSelection();
                              }}
                              className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
                            >
                              <X className="w-5 h-5" />
                            </button>

                            <div className="mb-4">
                              <Badge variant="outline" className="border-white/30 text-white px-4 py-2 text-sm bg-transparent">
                                Próximamente disponible
                              </Badge>
                            </div>

                            <h3 className="text-3xl lg:text-4xl font-bold mb-3 leading-tight">
                              {project.name}
                            </h3>

                            <div className="flex items-center gap-2 mb-6">
                              <MapPin className="w-4 h-4 text-white/70" />
                              <p className="text-base text-white/90">
                                {project.location}
                              </p>
                            </div>

                            <p className="text-base text-white/80 mb-8 leading-relaxed">
                              {project.description}
                            </p>

                            <Button 
                              size="lg" 
                              className="w-full bg-white hover:bg-white/90 text-foreground py-6 text-base font-semibold rounded-xl hover:scale-[1.02] transition-all duration-300"
                              onClick={() => {
                                // Determinar la URL según el proyecto
                                let url = '';
                                const projectName = project.name.toLowerCase();
                                if (projectName.includes('aldea')) {
                                  url = 'https://lokl.life/project-signup/aldea';
                                } else if (projectName.includes('patito')) {
                                  url = 'https://lokl.life/project-signup/patito-feo';
                                }
                                
                                if (url) {
                                  window.open(url, '_blank');
                                }
                              }}
                            >
                              Únete a la lista de espera
                            </Button>
                          </div>
                        ) : (
                          // DISEÑO NORMAL PARA PROYECTOS ACTIVOS
                          <div className="p-6 lg:p-10 flex flex-col h-full relative">
                            {/* Close Button */}
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCloseSelection();
                              }}
                              className="absolute top-4 right-4 z-50 w-10 h-10 bg-gray-100 hover:bg-gray-200 text-foreground rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
                            >
                              <X className="w-5 h-5" />
                            </button>

                            <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-2 leading-tight">
                              {project.name}
                            </h3>

                            <div className="inline-flex items-center gap-2 text-muted-foreground mb-4">
                              <MapPin className="w-4 h-4 text-primary" />
                              <span className="text-sm">{project.location}</span>
                            </div>

                            {/* Stats Row */}
                            <div className="grid grid-cols-3 gap-4 mb-6 pb-4 border-b border-border">
                              <div>
                                <div className="font-bold text-foreground mb-1">
                                  {project.totalInvestors.toLocaleString('es-CO')}
                                </div>
                                <div className="text-xs text-muted-foreground">Inversionistas</div>
                              </div>
                              
                              <div>
                                <div className="font-bold text-foreground mb-1">
                                  {project.minRoi}-{project.maxRoi}%
                                </div>
                                <div className="text-xs text-muted-foreground">ROI Anual</div>
                              </div>
                              
                              <div>
                                <div className="font-bold text-foreground mb-1">
                                  ${project.units.toLocaleString('es-CO')}
                                </div>
                                <div className="text-xs text-muted-foreground">Precio por Unit</div>
                              </div>
                            </div>

                            {/* CUPOS DISPONIBLES */}
                            <div className="mb-6">
                              <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-3xl lg:text-4xl font-bold text-foreground leading-none">
                                  {project.availableSpots}
                                </span>
                                <span className="text-xl lg:text-2xl font-bold text-muted-foreground leading-none">
                                  /{project.totalSpots}
                                </span>
                              </div>
                              <p className="text-base text-primary font-semibold">Cupos Disponibles</p>
                            </div>

                            {/* Description */}
                            <p className="text-muted-foreground mb-5 leading-relaxed text-sm">
                              {project.description}
                            </p>

                            {/* Amenities Tags */}
                            <div className="mb-5">
                              <div className="flex flex-wrap gap-2">
                                {project.amenities.map((amenity, index) => {
                                  const getAmenityIcon = (icon: string) => {
                                    const iconMap: Record<string, typeof Home> = {
                                      home: Home,
                                      size: Maximize2,
                                      pool: Waves,
                                      bbq: Flame,
                                      gym: Dumbbell,
                                      coworking: Briefcase,
                                      restaurant: UtensilsCrossed,
                                      smart: Cpu,
                                      parking: Car,
                                      cafe: Coffee,
                                      sofa: Sofa
                                    };
                                    return iconMap[icon] || Building2;
                                  };
                                  
                                  const IconComponent = getAmenityIcon(amenity.icon);
                                  
                                  return (
                                    <div key={index} className="flex items-center gap-1.5 bg-primary/5 hover:bg-primary/10 border border-primary/10 hover:border-primary/20 rounded-full px-3 py-1.5 transition-all duration-300">
                                      <IconComponent className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                                      <span className="text-xs text-foreground font-medium">{amenity.text}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-border mb-5"></div>

                            {/* Investment Info */}
                            <div className="mb-6">
                              <p className="text-base text-foreground leading-relaxed">
                                <span className="font-bold">${project.minInvestment.toLocaleString('es-CO')}</span>
                                {' '}cupo de inversión hasta en{' '}
                                <span className="text-primary font-bold">{project.installments} cuotas</span>
                              </p>
                            </div>

                            {/* CTA Button */}
                            <Button 
                              size="lg" 
                              className="w-full bg-foreground hover:bg-foreground/90 text-white py-6 text-base font-semibold rounded-xl hover:scale-[1.02] transition-all duration-300 mt-auto"
                              onClick={() => {
                                // Determinar la URL según el proyecto
                                let url = '';
                                const projectName = project.name.toLowerCase();
                                if (projectName.includes('nido')) {
                                  url = 'https://dashboard.lokl.life/project/nido-de-agua';
                                } else if (projectName.includes('indie')) {
                                  url = 'https://dashboard.lokl.life/project/indie-universe';
                                } else if (projectName.includes('aldea')) {
                                  url = 'https://dashboard.lokl.life/project-signup/aldea';
                                } else if (projectName.includes('patito')) {
                                  url = 'https://dashboard.lokl.life/project-signup/patito-feo';
                                }
                                
                                if (url) {
                                  window.open(url, '_self');
                                }
                              }}
                            >
                              Quiero conocer más
                            </Button>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            </div> {/* Cierre flex container */}
          </div> {/* Cierre overflow container */}

          {/* Dots Indicator - Solo móvil */}
          {selectedProject === null && projects.length > 1 && (
            <div className="md:hidden flex justify-center gap-2 mt-8">
              {projects.map((_, index) => (
                <button
                  key={index}
                  className="min-w-[44px] min-h-[44px] rounded-full transition-all duration-300 touch-manipulation flex items-center justify-center"
                  onClick={() => setCarouselIndex(index)}
                  aria-label={`Ir al proyecto ${index + 1}`}
                >
                  <span className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === carouselIndex 
                      ? 'bg-primary w-10' 
                      : 'bg-gray-300 w-2.5'
                  }`}></span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de Video */}
      {isVideoPlaying && currentVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl mx-4">
            {/* Botón de cerrar */}
            <button
              onClick={handleCloseVideo}
              className="absolute -top-12 right-0 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Contenedor del video */}
            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
              <iframe
                src={currentVideoUrl}
                title="Video del proyecto"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}