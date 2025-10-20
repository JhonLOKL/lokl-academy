"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, TrendingUp, ChevronLeft, ChevronRight, Building2, Waves, Flame, UtensilsCrossed, Dumbbell, Briefcase, Cpu, Car, Coffee, Eye, Play, DollarSign, Home, Maximize2, Sofa } from 'lucide-react';
import LazyImage from './lazy-image';

// Uso de LazyImage en lugar del componente ImageWithFallback

export default function FeaturedProjects() {
  const [currentProject, setCurrentProject] = useState(1); // Indie Universe por defecto

  const projects = [
    {
      id: 1,
      name: 'Nido de Agua',
      location: 'Guatapé, Colombia',
      description: 'Complejo residencial premium con enfoque sostenible en una de las zonas más exclusivas de Guatapé.',
      image: "https://lokl-assets.s3.amazonaws.com/nido-de-agua/AEREA+NOCHE.jpg",
      videoUrl: 'https://www.youtube.com/watch?v=example',
      minRoi: 12,
      maxRoi: 14,
      status: 'En construcción',
      statusColor: 'bg-orange-500',
      viewingNow: 23,
      amenities: [
        { icon: 'home', text: '45 Alojamientos' },
        { icon: 'size', text: '24.5 m²' },
        { icon: 'pool', text: 'Piscina infinita' },
        { icon: 'bbq', text: 'Zona BBQ' },
        { icon: 'gym', text: 'Gimnasio' },
        { icon: 'coworking', text: 'Coworking' }
      ],
      minInvestment: 12900000,
      installments: 12,
      totalSize: 24.5,
      units: 125000,
      fundingProgress: 78,
      daysRemaining: 12,
      amountRaised: 19110000,
      totalInvestors: 186,
      availableSpots: 18,
      totalSpots: 50,
      tags: [
        { text: 'Residencial', color: 'bg-blue-500 text-white' },
        { text: 'Riesgo Medio', color: 'bg-yellow-500 text-white' }
      ]
    },
    {
      id: 2,
      name: 'Indie Universe',
      location: 'Medellín, Laureles, Colombia',
      description: 'Proyecto inmobiliario innovador en zona estratégica con tecnología smart building y espacios colaborativos.',
      image: "https://lokl-assets.s3.us-east-1.amazonaws.com/indie-universe/indie_universe.jpg",
      videoUrl: 'https://www.youtube.com/watch?v=example2',
      minRoi: 11,
      maxRoi: 13,
      status: 'Operando',
      statusColor: 'bg-green-500',
      viewingNow: 47,
      amenities: [
        { icon: 'home', text: '32 Alojamientos' },
        { icon: 'size', text: '18.2 m²' },
        { icon: 'coworking', text: 'Coworking' },
        { icon: 'restaurant', text: 'Restaurante' },
        { icon: 'smart', text: 'Smart Building' },
        { icon: 'cafe', text: 'Café lounge' }
      ],
      minInvestment: 5310000,
      installments: 6,
      totalSize: 18.2,
      units: 132000,
      fundingProgress: 94,
      daysRemaining: 5,
      amountRaised: 17108000,
      totalInvestors: 324,
      availableSpots: 3,
      totalSpots: 75,
      tags: [
        { text: 'Mixto', color: 'bg-purple-500 text-white' },
        { text: 'Riesgo Bajo', color: 'bg-green-500 text-white' }
      ]
    },
    {
      id: 3,
      name: 'Aldea',
      location: 'La Unión, Colombia',
      description: 'Desarrollo inmobiliario innovador en zona estratégica con enfoque en comunidad y espacios modernos. Un proyecto único que redefinirá el concepto de inversión inmobiliaria en la región.',
      image: 'https://lokl-assets.s3.us-east-1.amazonaws.com/aldea/aldea_houses.jpeg',
      videoUrl: 'https://www.youtube.com/watch?v=example3',
      minRoi: 14,
      maxRoi: 16,
      status: 'Coming Soon',
      statusColor: 'bg-purple-500',
      viewingNow: 15,
      amenities: [],
      minInvestment: 8500000,
      installments: 12,
      totalSize: 32.8,
      units: 138000,
      fundingProgress: 43,
      daysRemaining: 28,
      amountRaised: 14104000,
      totalInvestors: 98,
      availableSpots: 28,
      totalSpots: 50,
      tags: []
    }
  ];

  const formatCurrencyShort = (amount: number, unit: string = 'M') => {
    return `$${amount}${unit}`;
  };

  const formatCurrencyCOP = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const getVisibleProjects = () => {
    const prev = (currentProject - 1 + projects.length) % projects.length;
    const next = (currentProject + 1) % projects.length;
    return { prev, current: currentProject, next };
  };

  const visible = getVisibleProjects();
  const mainProject = projects[visible.current];

  return (
    <section className="py-8 md:py-12 bg-[rgb(243,243,243)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            <span className="text-[#5352F6]">Proyectos</span> destacados
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre oportunidades de inversión curadas por nuestro equipo de expertos
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto overflow-hidden">
          <div className="flex items-center justify-center">
            {/* Previous Project Preview - Partially Visible */}
            <div className="hidden lg:block w-80 -mr-8 opacity-90 scale-95 transform transition-all duration-500 z-10">
              <div className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform" onClick={prevProject}>
                <div className="mobile-aspect-ratio-container">
                  <LazyImage 
                    src={projects[visible.prev].image}
                    alt={projects[visible.prev].name}
                    className="w-full h-80 object-cover mobile-aspect-ratio-content"
                  />
                </div>
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute top-3 left-3">
                  <Badge className={`${projects[visible.prev].statusColor} text-white text-xs`}>
                    {projects[visible.prev].status}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-bold text-base">{projects[visible.prev].name}</h4>
                  <p className="text-xs opacity-90 mb-2">{projects[visible.prev].location}</p>
                  {projects[visible.prev].status !== 'Coming Soon' ? (
                    <div className="flex gap-1 mt-1">
                      <Badge className="bg-[#5352F6] text-white text-xs">
                        {projects[visible.prev].minRoi}-{projects[visible.prev].maxRoi}% ROI
                      </Badge>
                      <Badge className="bg-white/20 text-white text-xs">
                        {projects[visible.prev].availableSpots} cupos
                      </Badge>
                    </div>
                  ) : (
                    <Badge className="bg-white/20 text-white text-xs">
                      Próximamente
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Main Project - Larger and Prominent */}
            <div className="w-full max-w-4xl mx-2 z-20 relative">
              <div className={`${mainProject.status === 'Coming Soon' ? 'bg-black' : 'bg-white'} rounded-3xl shadow-2xl overflow-hidden transform scale-100`}>
                <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
                  {/* Left Side - Image */}
                  <div className="relative h-full group/image sm:block mobile-aspect-ratio-container">
                    <LazyImage 
                      src={mainProject.image} 
                      alt={mainProject.name}
                      className="w-full h-full min-h-[calc(100vw*16/9)] sm:min-h-[280px] lg:min-h-[420px] object-cover mobile-aspect-ratio-content"
                      priority={true}
                    />
                    
                    {/* Overlay oscuro sutil */}
                    <div className="absolute inset-0 bg-black/10"></div>

                    {/* Status Badge - Top Left */}
                    <div className="absolute top-4 left-4">
                      <Badge className={`${mainProject.statusColor} text-white text-xs font-semibold px-4 py-1.5 shadow-lg`}>
                        {mainProject.status}
                      </Badge>
                    </div>

                    {/* Viewing Now - Top Right with animation */}
                    {mainProject.status !== 'Coming Soon' && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-black/70 backdrop-blur-md text-white px-3 py-2 rounded-full text-xs flex items-center gap-2 shadow-lg animate-pulse">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <Eye className="w-3.5 h-3.5" />
                          <span className="font-semibold">{mainProject.viewingNow} viendo ahora</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Video Play Button - Center */}
                    {mainProject.status !== 'Coming Soon' && (
                      <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 group-hover/image:scale-105">
                        <Play className="w-7 h-7 text-[#5352F6] ml-1" fill="currentColor" />
                      </button>
                    )}

                    {/* ROI Range - Bottom Left */}
                  </div>

                  {/* Right Side - Content */}
                  {mainProject.status === 'Coming Soon' ? (
                    // DISEÑO ESPECIAL PARA COMING SOON - VERSION NEGRA
                     <div className="p-6 lg:p-8 flex flex-col h-full bg-black text-white">
                      {/* Badge superior "Próximamente" */}
                      <div className="mb-8">
                        <Badge variant="outline" className="border-white/30 text-white px-4 py-2 text-sm bg-transparent">
                          Próximamente disponible
                        </Badge>
                      </div>

                      {/* Nombre del proyecto */}
                      <h3 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                        {mainProject.name}
                      </h3>

                      {/* Location */}
                      <div className="flex items-center gap-2 mb-6">
                        <MapPin className="w-4 h-4 text-white/70" />
                        <p className="text-base text-white/90">
                          {mainProject.location}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-base text-white/80 leading-relaxed mb-12">
                        {mainProject.description}
                      </p>

                      {/* CTA Button - "Únete a la lista de espera" */}
                      <div className="w-full">
                        <Button 
                          size="lg" 
                          className="w-full bg-white hover:bg-white/90 text-black py-3 text-base font-semibold rounded-xl hover:scale-[1.02] transition-all duration-300"
                        >
                          Únete a la lista de espera
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // DISEÑO NORMAL PARA PROYECTOS ACTIVOS
                   <div className="p-4 lg:p-6 flex flex-col h-full max-h-[80vh] sm:max-h-none overflow-y-auto">
                    {/* Title */}
                    <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-2 leading-tight">
                      {mainProject.name}
                    </h3>

                    {/* Location */}
                    <div className="inline-flex items-center gap-2 text-muted-foreground mb-4">
                      <MapPin className="w-4 h-4 text-[#5352F6]" />
                      <span className="text-sm">{mainProject.location}</span>
                    </div>

                    {/* Stats Row - ROI, Inversionistas y Precio por Unit */}
                    <div className="grid grid-cols-3 gap-4 mb-6 pb-4 border-b border-border">
                      {/* ROI Estimado */}
                      <div>
                        <div className="font-bold text-foreground mb-1">
                          {mainProject.minRoi}-{mainProject.maxRoi}%
                        </div>
                        <div className="text-xs text-muted-foreground">ROI Estimado</div>
                      </div>
                      
                      {/* Número de Inversionistas */}
                      <div>
                        <div className="font-bold text-foreground mb-1">
                          {mainProject.totalInvestors.toLocaleString('es-CO')}
                        </div>
                        <div className="text-xs text-muted-foreground">Inversionistas</div>
                      </div>
                      
                      {/* Precio por Unit */}
                      <div>
                        <div className="font-bold text-foreground mb-1">
                          ${mainProject.units.toLocaleString('es-CO')}
                        </div>
                        <div className="text-xs text-muted-foreground">Precio por Unit</div>
                      </div>
                    </div>

                    {/* CUPOS DISPONIBLES - SUPER PROTAGONISMO */}
                    <div className="mb-4">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-6xl lg:text-7xl font-bold text-foreground leading-none">
                          {mainProject.availableSpots}
                        </span>
                        <span className="text-3xl lg:text-4xl font-bold text-muted-foreground leading-none">
                          /{mainProject.totalSpots}
                        </span>
                      </div>
                      <p className="text-base text-[#5352F6] font-semibold">Cupos Disponibles</p>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-3 leading-relaxed text-sm line-clamp-2">
                      {mainProject.description}
                    </p>

                    {/* Amenities Tags */}
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {mainProject.amenities.map((amenity, index) => {
                          const getAmenityIcon = (icon: string) => {
                            const iconMap: { [key: string]: any } = {
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
                            <div key={index} className="flex items-center gap-1.5 bg-[#5352F6]/5 hover:bg-[#5352F6]/10 border border-[#5352F6]/10 hover:border-[#5352F6]/20 rounded-full px-3 py-1.5 transition-all duration-300">
                              <IconComponent className="w-3.5 h-3.5 text-[#5352F6] flex-shrink-0" />
                              <span className="text-xs text-foreground font-medium">{amenity.text}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-border mb-3"></div>

                    {/* Investment Info - Simple text format */}
                    <div className="mb-4">
                      <p className="text-sm text-foreground leading-relaxed">
                        <span className="font-bold">${mainProject.minInvestment.toLocaleString('es-CO')}</span>
                        {' '}cupo de inversión hasta en{' '}
                        <span className="text-[#5352F6] font-bold">{mainProject.installments} cuotas</span>
                      </p>
                    </div>

                    {/* CTA Button */}
                    <Button 
                      size="lg" 
                      className="w-full bg-foreground hover:bg-foreground/90 text-white py-3 text-base font-semibold rounded-xl hover:scale-[1.02] transition-all duration-300 mt-auto"
                    >
                      Quiero conocer más
                    </Button>
                  </div>
                  )}
                </div>
              </div>
            </div>

            {/* Next Project Preview - Partially Visible */}
            <div className="hidden lg:block w-80 -ml-8 opacity-90 scale-95 transform transition-all duration-500 z-10">
              <div className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform" onClick={nextProject}>
                <div className="mobile-aspect-ratio-container">
                  <LazyImage 
                    src={projects[visible.next].image}
                    alt={projects[visible.next].name}
                    className="w-full h-80 object-cover mobile-aspect-ratio-content"
                  />
                </div>
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute top-3 left-3">
                  <Badge className={`${projects[visible.next].statusColor} text-white text-xs`}>
                    {projects[visible.next].status}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-bold text-base">{projects[visible.next].name}</h4>
                  <p className="text-xs opacity-90 mb-2">{projects[visible.next].location}</p>
                  {projects[visible.next].status !== 'Coming Soon' ? (
                    <div className="flex gap-1 mt-1">
                      <Badge className="bg-[#5352F6] text-white text-xs">
                        {projects[visible.next].minRoi}-{projects[visible.next].maxRoi}% ROI
                      </Badge>
                      <Badge className="bg-white/20 text-white text-xs">
                        {projects[visible.next].availableSpots} cupos
                      </Badge>
                    </div>
                  ) : (
                    <Badge className="bg-white/20 text-white text-xs">
                      Próximamente
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-full z-30 hover:bg-white hover:scale-110 transition-all"
            onClick={prevProject}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-full z-30 hover:bg-white hover:scale-110 transition-all"
            onClick={nextProject}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === visible.current 
                    ? 'bg-[#5352F6] w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => setCurrentProject(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
