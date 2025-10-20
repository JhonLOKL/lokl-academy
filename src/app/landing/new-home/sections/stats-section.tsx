"use client";

import { useState, useEffect, useRef } from 'react';
import { Users, TrendingUp, Building2, ArrowRight, Star, Calendar, Hotel } from 'lucide-react';

export default function StatsSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Detectar si es móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // Sin rotación automática ni funcionalidad de loop - solo navegación manual
  
  // Efecto para desplazar al índice actual
  useEffect(() => {
    if (!carouselRef.current || !isMobile) return;
    
    const itemWidth = 280 + 16; // Ancho del elemento + gap
    carouselRef.current.scrollTo({
      left: currentIndex * itemWidth,
      behavior: isTransitioning ? 'smooth' : (carouselRef.current.style.scrollBehavior as 'smooth' | 'auto' | undefined) || 'smooth'
    });
  }, [currentIndex, isMobile, isTransitioning]);
  
  // Manejar eventos táctiles
  const handleTouchStart = () => {
    setIsTouching(true);
  };
  
  const handleTouchEnd = () => {
    setIsTouching(false);
    
    // Detectar a qué elemento se ha desplazado
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const itemWidth = 280 + 16; // Ancho del elemento + gap
      const newIndex = Math.round(scrollLeft / itemWidth);
      
      // Asegurarse de que el índice esté dentro del rango válido
      if (newIndex >= 0 && newIndex <= 3) {
        setCurrentIndex(newIndex);
      }
    }
  };
  
  return (
    <section className="bg-[#5352F6] relative overflow-hidden py-12 md:py-16">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/20"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-white/15"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-white/10"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Título de la sección */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Construyendo inversiones inmobiliarias con <span className="text-white/90">propósito</span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Miles de inversionistas ya confían en <span className="font-semibold text-white">LOKL</span> para diversificar sus portafolios
          </p>
        </div>

        {/* Grid para desktop / Carrusel para móvil */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Inversionistas - Desktop */}
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 mb-4 group-hover:bg-white/30 transition-colors">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
              +2,000
            </div>
            <div className="text-lg text-white/90 font-medium mb-2">
              inversionistas activos
            </div>
            <div className="flex items-center justify-center text-sm text-white/70">
              <Star className="w-4 h-4 mr-1" />
              Confianza verificada
            </div>
          </div>

          {/* Capital Invertido - Desktop */}
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 mb-4 group-hover:bg-white/30 transition-colors">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
              $50M
            </div>
            <div className="text-lg text-white/90 font-medium mb-2">
              capital invertido
            </div>
            <div className="flex items-center justify-center text-sm text-white/70">
              <ArrowRight className="w-4 h-4 mr-1" />
              Crecimiento constante
            </div>
          </div>

          {/* Experiencia - Desktop */}
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 mb-4 group-hover:bg-white/30 transition-colors">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
              10 años
            </div>
            <div className="text-lg text-white/90 font-medium mb-2">
              de experiencia
            </div>
            <div className="flex items-center justify-center text-sm text-white/70">
              <Star className="w-4 h-4 mr-1" />
              Hotelería y bienes raíces
            </div>
          </div>

          {/* Ocupación promedio - Desktop */}
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 mb-4 group-hover:bg-white/30 transition-colors">
              <Hotel className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
              70%
            </div>
            <div className="text-lg text-white/90 font-medium mb-2">
              de ocupación promedio
            </div>
            <div className="flex items-center justify-center text-sm text-white/70">
              <TrendingUp className="w-4 h-4 mr-1" />
              Proyectos financiados
            </div>
          </div>
        </div>
        
        {/* Contenedor del carrusel - oculta los bordes y la barra de desplazamiento */}
        <div className="md:hidden relative overflow-hidden mb-12 -mx-6">
          
          {/* Carrusel solo para móvil */}
          <div 
            ref={carouselRef}
            className="flex overflow-x-scroll scrollbar-hide snap-x snap-mandatory gap-6 px-4 py-4 mx-auto justify-start md:justify-center"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleTouchStart}
            onMouseUp={handleTouchEnd}
            onMouseLeave={handleTouchEnd}
          >
            {/* Inversionistas - Móvil */}
            <div className="text-center group flex-shrink-0 w-[280px] snap-center mx-auto bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 mb-4 group-hover:bg-white/30 transition-colors">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                +2,000
              </div>
              <div className="text-lg text-white/90 font-medium mb-2">
                inversionistas activos
              </div>
              <div className="flex items-center justify-center text-sm text-white/70">
                <Star className="w-4 h-4 mr-1" />
                Confianza verificada
              </div>
            </div>

            {/* Capital Invertido - Móvil */}
            <div className="text-center group flex-shrink-0 w-[280px] snap-center mx-auto bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 mb-4 group-hover:bg-white/30 transition-colors">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                $50M
              </div>
              <div className="text-lg text-white/90 font-medium mb-2">
                capital invertido
              </div>
              <div className="flex items-center justify-center text-sm text-white/70">
                <ArrowRight className="w-4 h-4 mr-1" />
                Crecimiento constante
              </div>
            </div>

            {/* Experiencia - Móvil */}
            <div className="text-center group flex-shrink-0 w-[280px] snap-center mx-auto bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 mb-4 group-hover:bg-white/30 transition-colors">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                10 años
              </div>
              <div className="text-lg text-white/90 font-medium mb-2">
                de experiencia
              </div>
              <div className="flex items-center justify-center text-sm text-white/70">
                <Star className="w-4 h-4 mr-1" />
                Hotelería y bienes raíces
              </div>
            </div>

            {/* Ocupación promedio - Móvil */}
            <div className="text-center group flex-shrink-0 w-[280px] snap-center mx-auto bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 mb-4 group-hover:bg-white/30 transition-colors">
                <Hotel className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                70%
              </div>
              <div className="text-lg text-white/90 font-medium mb-2">
                de ocupación promedio
              </div>
              <div className="flex items-center justify-center text-sm text-white/70">
                <TrendingUp className="w-4 h-4 mr-1" />
                Proyectos financiados
              </div>
            </div>
            
          </div>
        </div>
        
        {/* Indicadores de posición - Solo móvil */}
        <div className="md:hidden flex justify-center gap-2 mt-4">
          {[0, 1, 2, 3].map((index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === index ? 'bg-white w-6' : 'bg-white/40'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}