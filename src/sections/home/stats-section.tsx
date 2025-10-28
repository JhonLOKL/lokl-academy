"use client";

import { useState, useEffect, useRef } from 'react';
import { Users, TrendingUp, ArrowRight, Star, Calendar, Hotel, DollarSign } from 'lucide-react';

export default function StatsSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [, setIsTouching] = useState(false);
  const [isTransitioning,] = useState(false);
  
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
  
  useEffect(() => {
    if (!carouselRef.current || !isMobile) return;
    
    const itemWidth = 280 + 16;
    carouselRef.current.scrollTo({
      left: currentIndex * itemWidth,
      behavior: isTransitioning ? 'smooth' : (carouselRef.current.style.scrollBehavior as 'smooth' | 'auto' | undefined) || 'smooth'
    });
  }, [currentIndex, isMobile, isTransitioning]);
  
  const handleTouchStart = () => {
    setIsTouching(true);
  };
  
  const handleTouchEnd = () => {
    setIsTouching(false);
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const itemWidth = 280 + 16;
      const newIndex = Math.round(scrollLeft / itemWidth);
      if (newIndex >= 0 && newIndex <= 3) {
        setCurrentIndex(newIndex);
      }
    }
  };
  
  return (
    <section className="bg-[#5352F6] relative overflow-hidden py-12 md:py-16">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/20"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-white/15"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-white/10"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Construyendo inversiones inmobiliarias con <span className="text-white/90">propósito</span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Miles de inversionistas ya confían en <span className="font-semibold text-white">LOKL</span> para diversificar sus portafolios
          </p>
        </div>

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
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

          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 mb-4 group-hover:bg-white/30 transition-colors">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
              $50MM
            </div>
            <div className="text-lg text-white/90 font-medium mb-2">
              capital invertido
            </div>
            <div className="flex items-center justify-center text-sm text-white/70">
              <ArrowRight className="w-4 h-4 mr-1" />
              Crecimiento constante
            </div>
          </div>

          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 mb-4 group-hover:bg-white/30 transition-colors">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
              5 años
            </div>
            <div className="text-lg text-white/90 font-medium mb-2">
              de experiencia
            </div>
            <div className="flex items-center justify-center text-sm text-white/70">
              <Star className="w-4 h-4 mr-1" />
              Hotelería y bienes raíces
            </div>
          </div>

          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 mb-4 group-hover:bg-white/30 transition-colors">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
              12 - 15%
            </div>
            <div className="text-lg text-white/90 font-medium mb-2">
              de rentabilidad estimada
            </div>
            <div className="flex items-center justify-center text-sm text-white/70">
              <TrendingUp className="w-4 h-4 mr-1" />
              Potencial de ganancias pasivas
            </div>
          </div>
        </div>
        
        <div className="md:hidden relative overflow-hidden mb-12 -mx-6">
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


