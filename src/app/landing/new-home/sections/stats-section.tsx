"use client";

import { Users, TrendingUp, Building2, ArrowRight, Star, Calendar, Hotel } from 'lucide-react';

export default function StatsSection() {
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

        {/* Grid de estadísticas mejorado */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Inversionistas */}
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

          {/* Capital Invertido */}
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

          {/* Experiencia */}
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

          {/* Ocupación promedio */}
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
      </div>
    </section>
  );
}
