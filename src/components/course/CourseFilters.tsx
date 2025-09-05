"use client";

import React, { useState, useEffect, useCallback } from "react";

export interface FilterOptions {
  level: string;
  category: string;
  duration: string;
  featured: boolean;
  latest: boolean;
  exclusive: boolean;
  free: boolean;
}

interface CourseFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  recommendedCount: number;
  latestCount: number;
  exclusiveCount: number;
  freeCount: number;
  categories: { id: string, name: string }[];
}

const CourseFilters: React.FC<CourseFiltersProps> = ({ 
  onFilterChange, 
  recommendedCount, 
  latestCount, 
  exclusiveCount, 
  freeCount,
  categories
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    level: "",
    category: "",
    duration: "",
    featured: false,
    latest: false,
    exclusive: false,
    free: false
  });

  // Memoizar la función para evitar re-renders innecesarios
  const handleFilterChange = useCallback((key: keyof FilterOptions, value: string | boolean) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value };
      return newFilters;
    });
  }, []);

  // Actualizar los filtros cuando cambian
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  // Contar filtros activos
  const activeFilterCount = Object.values(filters).filter(value => 
    value !== "" && value !== false
  ).length;

  return (
    <>
      {/* Botón de filtros (visible en móvil) */}
      <div className="p-4 border-t border-[#E5E5E5] flex justify-between items-center md:hidden">
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1.5 text-sm font-medium text-[#5352F6]"
          aria-expanded={showFilters}
          aria-controls="mobile-filters"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
          <span className="ml-1 rounded-full bg-[#EEEEFE] px-1.5 py-0.5 text-xs font-medium text-[#5352F6]">
            {recommendedCount + latestCount + exclusiveCount + freeCount}
          </span>
        </button>
        
        {/* Indicador de filtros activos */}
        {activeFilterCount > 0 && (
          <div className="flex items-center gap-1 text-xs text-[#6D6C6C]">
            <span className="rounded-full h-2 w-2 bg-[#5352F6]"></span>
            <span>{activeFilterCount} filtro{activeFilterCount !== 1 ? 's' : ''} activo{activeFilterCount !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>
      
      {/* Indicador de filtros en desktop */}
      <div className="hidden md:flex p-4 border-t border-[#E5E5E5] items-center justify-between">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#5352F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="font-medium text-sm">Filtros</span>
          <span className="ml-1 rounded-full bg-[#EEEEFE] px-1.5 py-0.5 text-xs font-medium text-[#5352F6]">
            {recommendedCount + latestCount + exclusiveCount + freeCount}
          </span>
        </div>
        
        {activeFilterCount > 0 && (
          <button 
            onClick={() => {
              setFilters({
                level: "",
                category: "",
                duration: "",
                featured: false,
                latest: false,
                exclusive: false,
                free: false
              });
            }}
            className="text-xs text-[#5352F6] hover:text-[#4241E0] hover:underline flex items-center gap-1"
            aria-label="Limpiar todos los filtros"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Limpiar filtros ({activeFilterCount})
          </button>
        )}
      </div>
      
      {/* Filtros (ocultos en móvil por defecto, siempre visibles en desktop) */}
      <div className={`border-t border-[#E5E5E5] ${showFilters ? 'block' : 'hidden'} md:block`} id="mobile-filters">
          {/* Filtros tipo chip */}
          <div className="p-4 flex flex-wrap items-center gap-3">
            <button 
              onClick={() => handleFilterChange('featured', !filters.featured)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                filters.featured 
                  ? "bg-[#5352F6] text-white hover:bg-[#4241E0]" 
                  : "bg-[#F5F5F5] text-[#6D6C6C] hover:bg-[#EEEEFE] hover:text-[#5352F6]"
              }`}
              aria-pressed={filters.featured}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Recomendados
              <span className={`ml-1 rounded-full px-1 py-0.5 text-xs font-medium ${
                filters.featured 
                  ? "bg-white/20 text-white" 
                  : "bg-white text-[#6D6C6C]"
              }`}>
                {recommendedCount}
              </span>
            </button>
            
            <button 
              onClick={() => handleFilterChange('latest', !filters.latest)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                filters.latest 
                  ? "bg-[#5352F6] text-white hover:bg-[#4241E0]" 
                  : "bg-[#F5F5F5] text-[#6D6C6C] hover:bg-[#EEEEFE] hover:text-[#5352F6]"
              }`}
              aria-pressed={filters.latest}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Últimos
              <span className={`ml-1 rounded-full px-1 py-0.5 text-xs font-medium ${
                filters.latest 
                  ? "bg-white/20 text-white" 
                  : "bg-white text-[#6D6C6C]"
              }`}>
                {latestCount}
              </span>
            </button>
            
            <button 
              onClick={() => handleFilterChange('exclusive', !filters.exclusive)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                filters.exclusive 
                  ? "bg-[#5352F6] text-white hover:bg-[#4241E0]" 
                  : "bg-[#F5F5F5] text-[#6D6C6C] hover:bg-[#EEEEFE] hover:text-[#5352F6]"
              }`}
              aria-pressed={filters.exclusive}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Inversionistas
              <span className={`ml-1 rounded-full px-1 py-0.5 text-xs font-medium ${
                filters.exclusive 
                  ? "bg-white/20 text-white" 
                  : "bg-white text-[#6D6C6C]"
              }`}>
                {exclusiveCount}
              </span>
            </button>
            
            <button 
              onClick={() => handleFilterChange('free', !filters.free)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                filters.free 
                  ? "bg-[#5352F6] text-white hover:bg-[#4241E0]" 
                  : "bg-[#F5F5F5] text-[#6D6C6C] hover:bg-[#EEEEFE] hover:text-[#5352F6]"
              }`}
              aria-pressed={filters.free}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Gratis
              <span className={`ml-1 rounded-full px-1 py-0.5 text-xs font-medium ${
                filters.free 
                  ? "bg-white/20 text-white" 
                  : "bg-white text-[#6D6C6C]"
              }`}>
                {freeCount}
              </span>
            </button>
            
            <div className="mt-3 md:mt-0 md:ml-auto flex flex-wrap gap-2 w-full md:w-auto">
              {/* Filtro por nivel */}
              <select 
                className="text-xs border border-[#E5E5E5] rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-[#5352F6]/20 focus:border-[#5352F6] appearance-none"
                value={filters.level}
                onChange={(e) => handleFilterChange('level', e.target.value)}
                aria-label="Filtrar por nivel"
              >
                <option value="">Nivel: Todos</option>
                <option value="principiante">Principiante</option>
                <option value="intermedio">Intermedio</option>
                <option value="avanzado">Avanzado</option>
              </select>
              
              {/* Filtro por categoría */}
              <select 
                className="text-xs border border-[#E5E5E5] rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-[#5352F6]/20 focus:border-[#5352F6] appearance-none"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                aria-label="Filtrar por categoría"
              >
                <option value="">Categoría: Todas</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              
              {/* Filtro por duración */}
              <select 
                className="text-xs border border-[#E5E5E5] rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-[#5352F6]/20 focus:border-[#5352F6] appearance-none"
                value={filters.duration}
                onChange={(e) => handleFilterChange('duration', e.target.value)}
                aria-label="Filtrar por duración"
              >
                <option value="">Duración: Cualquiera</option>
                <option value="short">Corta (menos de 1h)</option>
                <option value="medium">Media (1-3h)</option>
                <option value="long">Larga (más de 3h)</option>
              </select>
              
              {/* Botón para limpiar filtros (solo visible si hay filtros activos) */}
              {activeFilterCount > 0 && (
                <button 
                  onClick={() => {
                    setFilters({
                      level: "",
                      category: "",
                      duration: "",
                      featured: false,
                      latest: false,
                      exclusive: false,
                      free: false
                    });
                  }}
                  className="text-xs text-[#5352F6] hover:text-[#4241E0] hover:underline flex items-center gap-1"
                  aria-label="Limpiar todos los filtros"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Limpiar
                </button>
              )}
            </div>
          </div>
        </div>
    </>
  );
};

export default CourseFilters;
