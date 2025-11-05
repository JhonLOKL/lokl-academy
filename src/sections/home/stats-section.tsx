"use client";

import { Users, TrendingUp, Calendar, DollarSign } from 'lucide-react';

export default function StatsSection() {
  
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
          <div className="group flex justify-center">
            <div className="grid grid-cols-[56px_1fr] md:flex md:flex-col md:items-center gap-3 md:gap-4 w-full max-w-[280px] md:max-w-none">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/20 group-hover:bg-white/30 transition-colors flex-shrink-0">
                <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div className="flex flex-col md:items-center md:text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1">
                  +2,000
                </div>
                <div className="text-base md:text-lg text-white/90 font-medium">
                  inversionistas activos
                </div>
              </div>
            </div>
          </div>

          <div className="group flex justify-center">
            <div className="grid grid-cols-[56px_1fr] md:flex md:flex-col md:items-center gap-3 md:gap-4 w-full max-w-[280px] md:max-w-none">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/20 group-hover:bg-white/30 transition-colors flex-shrink-0">
                <DollarSign className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div className="flex flex-col md:items-center md:text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1">
                  $50MM
                </div>
                <div className="text-base md:text-lg text-white/90 font-medium">
                  capital invertido
                </div>
              </div>
            </div>
          </div>

          <div className="group flex justify-center">
            <div className="grid grid-cols-[56px_1fr] md:flex md:flex-col md:items-center gap-3 md:gap-4 w-full max-w-[280px] md:max-w-none">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/20 group-hover:bg-white/30 transition-colors flex-shrink-0">
                <Calendar className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div className="flex flex-col md:items-center md:text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1">
                  5 años
                </div>
                <div className="text-base md:text-lg text-white/90 font-medium">
                  de experiencia
                </div>
              </div>
            </div>
          </div>

          <div className="group flex justify-center">
            <div className="grid grid-cols-[56px_1fr] md:flex md:flex-col md:items-center gap-3 md:gap-4 w-full max-w-[280px] md:max-w-none">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/20 group-hover:bg-white/30 transition-colors flex-shrink-0">
                <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div className="flex flex-col md:items-center md:text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1">
                  12 - 15%
                </div>
                <div className="text-base md:text-lg text-white/90 font-medium">
                  de rentabilidad estimada
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
