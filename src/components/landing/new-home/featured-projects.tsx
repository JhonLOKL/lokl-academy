"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MapPin, Users, TrendingUp, Shield, ChevronLeft, ChevronRight, Clock, Building2, Ticket, Waves, Flame, UtensilsCrossed, Dumbbell, Briefcase, Cpu, Car, Coffee, Eye, Play, Percent, DollarSign, Home, Maximize2, Sofa, X } from 'lucide-react';
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
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  const formatCurrencyShort = (amount: number, unit: string = 'M') => {
    return `${amount}${unit}`;
  };

  const formatCurrencyCOP = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Navegación del carrusel
  const nextCarousel = () => {
    if (selectedProject !== null) {
      // Si hay un proyecto seleccionado, avanzar al siguiente proyecto
      setSelectedProject((prev) => prev !== null ? (prev + 1) % projects.length : 0);
    } else {
      // Sin selección, avanzar al siguiente proyecto en el carrusel
      setCarouselIndex((prev) => (prev + 1) % projects.length);
    }
  };

  const prevCarousel = () => {
    if (selectedProject !== null) {
      // Si hay un proyecto seleccionado, retroceder al proyecto anterior
      setSelectedProject((prev) => prev !== null ? (prev - 1 + projects.length) % projects.length : 0);
    } else {
      // Sin selección, retroceder al proyecto anterior en el carrusel
      setCarouselIndex((prev) => (prev - 1 + projects.length) % projects.length);
    }
  };

  // Calcula qué proyectos mostrar
  const getVisibleProjects = () => {
    // Siempre mostrar todos los proyectos, independientemente del estado de selección
    return projects.map((_, index) => index);
  };

  // Determina qué proyectos están en el rango visible del carrusel desktop
  const isInDesktopCarouselRange = (index: number) => {
    // Si hay un proyecto seleccionado, mostrar solo 3 proyectos: el seleccionado y los 2 adyacentes
    if (selectedProject !== null) {
      const totalProjects = projects.length;
      const prevIndex = (selectedProject - 1 + totalProjects) % totalProjects;
      const nextIndex = (selectedProject + 1) % totalProjects;
      return index === selectedProject || index === prevIndex || index === nextIndex;
    }
    
    // En desktop sin selección, solo mostrar 3 proyectos consecutivos basados en carouselIndex
    const visibleIndices = [];
    for (let i = 0; i < 3; i++) {
      visibleIndices.push((carouselIndex + i) % projects.length);
    }
    return visibleIndices.includes(index);
  };

  const visibleIndices = getVisibleProjects();
  const visibleProjects = visibleIndices.map(index => ({ project: projects[index], index }));

  // Manejo de gestos táctiles para móvil
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

  // Efecto para hacer scroll automático en móvil cuando cambia el carouselIndex
  useEffect(() => {
    if (selectedProject === null && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.scrollWidth / projects.length;
      const scrollPosition = cardWidth * carouselIndex;
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [carouselIndex, selectedProject, projects.length]);

  return (
    <section className="py-12 md:py-16 bg-[rgb(243,243,243)]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            <span className="text-primary">Proyectos</span> destacados
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre oportunidades de inversión curadas por nuestro equipo de expertos
          </p>
        </div>

        {/* Stacked Cards Container */}
        <div className="relative perspective-1000">
          {/* Navigation Buttons - Desktop (siempre visibles) - Con estilo de tarjeta principal */}
          <>
            <button
              onClick={prevCarousel}
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 bg-black/60 hover:bg-black/70 backdrop-blur-sm rounded-full shadow-xl items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Proyecto anterior"
            >
              <ChevronLeft className="w-6 h-6 text-white animate-pulse" />
            </button>
            <button
              onClick={nextCarousel}
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 bg-black/60 hover:bg-black/70 backdrop-blur-sm rounded-full shadow-xl items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Proyecto siguiente"
            >
              <ChevronRight className="w-6 h-6 text-white animate-pulse" />
            </button>
          </>

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
              ${selectedProject === null ? 'overflow-x-auto md:overflow-visible scrollbar-hide snap-x snap-mandatory' : ''}
            `}
          >
            <div className={`flex ${selectedProject !== null ? 'items-start' : 'items-stretch'} ${selectedProject !== null ? 'gap-2' : 'gap-4 md:gap-6'} ${selectedProject === null ? 'px-[5vw] md:px-0' : ''} max-w-7xl mx-auto ${selectedProject !== null ? 'justify-center md:justify-between' : 'justify-start md:justify-between'}`}>
            {visibleProjects
              .map(({ project, index }, arrayIndex) => {
              const isSelected = selectedProject === index;
              const hasSelection = selectedProject !== null;
              
              // En desktop sin selección, ocultar si no está en el rango del carrusel
              const hideInDesktop = !isInDesktopCarouselRange(index);
              
              // En móvil, si hay selección, solo mostrar el proyecto seleccionado
              const hideInMobile = isMobile && hasSelection && !isSelected;
              
              return (
                <div
                  key={index}
                  className={`
                    transition-all duration-500 ease-out cursor-pointer flex-shrink-0
                    ${hideInDesktop ? 'md:hidden' : ''}
                    ${hideInMobile ? 'hidden md:block' : ''}
                    ${isSelected 
                      ? 'w-full md:flex-1 z-30' 
                      : hasSelection 
                        ? 'md:w-24 lg:w-28 z-10 md:hover:w-28 lg:hover:w-32' 
                        : 'w-[78vw] md:w-[calc(33.333%-1rem)] z-20 snap-center'
                    }
                  `}
                  onClick={() => setSelectedProject(index)}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* Card */}
                  <div className={`
                    ${project.status === 'Próximamente' 
                      ? 'bg-gradient-to-br from-foreground via-foreground to-gray-900' 
                      : 'bg-white'
                    } 
                    rounded-3xl shadow-2xl overflow-hidden h-full
                    ${!isSelected && hasSelection && 'hover:shadow-3xl'}
                  `}>
                    <div className={`grid grid-cols-1 ${isSelected ? 'lg:grid-cols-2' : ''} h-full`}>
                      {/* Left Side - Image (Siempre visible) */}
                      <div className="relative group/image h-full">
                        <ImageWithFallback 
                          src={project.image} 
                          alt={project.name}
                          className="w-full h-full object-cover min-h-[500px] lg:min-h-[650px]"
                        />
                        
                        {/* Overlay oscuro - Menos intenso en móvil */}
                        <div className={`absolute inset-0 ${isSelected ? 'bg-black/10' : isMobile ? 'bg-black/5' : 'bg-black/30'}`}></div>

                        {/* Eliminado el overlay con flechas para tarjetas laterales */}

                        {/* Badges - Top Left */}
                        {(!hasSelection || isSelected) && (
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
                        {isSelected && project.status !== 'Próximamente' && (
                          <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 group-hover/image:scale-105">
                            <Play className="w-7 h-7 text-primary ml-1" fill="currentColor" />
                          </button>
                        )}

                        {/* Info prominente - En estado inicial (sin selección) - Versión móvil */}
                        {!hasSelection && isMobile && (
                          <div className="md:hidden absolute inset-0 flex flex-col justify-end p-5 text-white bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                            {project.status !== 'Próximamente' ? (
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
                        {!hasSelection && (
                          <div className="hidden md:flex absolute inset-0 flex-col justify-end p-6 lg:p-8 text-white">
                            {project.status !== 'Próximamente' ? (
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
                                setSelectedProject(null);
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
                                setSelectedProject(null);
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
                                  url = 'https://lokl.life/project/nido-de-agua';
                                } else if (projectName.includes('indie')) {
                                  url = 'https://lokl.life/project/indie-universe';
                                } else if (projectName.includes('aldea')) {
                                  url = 'https://lokl.life/project-signup/aldea';
                                } else if (projectName.includes('patito')) {
                                  url = 'https://lokl.life/project-signup/patito-feo';
                                }
                                
                                if (url) {
                                  window.open(url, '_blank');
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
          {selectedProject === null && (
            <div className="md:hidden flex justify-center gap-2 mt-8">
              {projects.map((_, index) => (
                <button
                  key={index}
                  className={`h-2.5 rounded-full transition-all duration-300 touch-manipulation ${
                    index === carouselIndex 
                      ? 'bg-primary w-10' 
                      : 'bg-gray-300 hover:bg-gray-400 active:bg-gray-500 w-2.5'
                  }`}
                  onClick={() => setCarouselIndex(index)}
                  aria-label={`Ir al grupo de proyectos ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}