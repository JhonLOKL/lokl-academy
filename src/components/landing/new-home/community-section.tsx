"use client";

import React, { useState } from 'react';
import NewsletterTab from './newsletter-tab';
import ArticlesTab from './articles-tab';
import CoursesTab from './courses-tab';
import PerfilTab from './perfil-tab';
import { 
  Mail, 
  BookOpen,
  TrendingUp,
  Play,
} from 'lucide-react';

export default function CommunitySection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'newsletter' | 'articulos' | 'cursos' | 'perfil'>('perfil');

  const handleSuccess = () => {
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="comunidad" className="py-16 md:py-20 bg-[#F3F3F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============ HEADER ============ */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Lokl <span className="text-[#5352F6] font-bold">academy</span> 
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Guías prácticas, cursos y webinars para invertir con criterio. Actualizado cada semana.
          </p>
        </div>

        {/* ============ STEPPER/TABS NAVIGATION ============ */}
        <div className="mb-8">
          <div className="flex flex-nowrap items-center justify-around sm:justify-start md:justify-center gap-2 sm:gap-2 overflow-x-auto pb-4 px-2 -mx-4 md:mx-0 md:px-0 scrollbar-hide">
            {[
              { id: 'perfil', label: 'Descubre tu perfil', icon: TrendingUp },
              { id: 'newsletter', label: 'Newsletter', icon: Mail },
              { id: 'articulos', label: 'Artículos recientes', icon: BookOpen },
              { id: 'cursos', label: 'Últimos cursos', icon: Play }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'newsletter' | 'articulos' | 'cursos' | 'perfil')}
                  className={`flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-6 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                    isActive 
                      ? 'bg-[#5352F6] text-white shadow-lg shadow-[#5352F6]/30 scale-105' 
                      : 'bg-white text-muted-foreground hover:bg-white/80 hover:text-foreground'
                  }`}
                >
                  <Icon className={`w-6 h-6 sm:w-5 sm:h-5 ${isActive ? 'text-white' : 'text-[#5352F6]'}`} />
                  <span className={`text-sm sm:text-base ${isActive ? 'block' : 'hidden sm:block'}`}>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============ TAB CONTENT ============ */}
        <div className="min-h-[600px] mb-0">
          {activeTab === 'perfil' && <PerfilTab />}
          {activeTab === 'newsletter' && <NewsletterTab isSubmitted={isSubmitted} onSuccess={handleSuccess} />}
          {activeTab === 'articulos' && <ArticlesTab />}
          {activeTab === 'cursos' && <CoursesTab />}
        </div>
      </div>
    </section>
  );
}
