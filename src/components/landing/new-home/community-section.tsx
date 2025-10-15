"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import NewsletterTab from './newsletter-tab';
import ArticulosTab from './articulos-tab';
import CursosTab from './cursos-tab';
import PerfilTab from './perfil-tab';
import { 
  Mail, 
  Calendar, 
  Clock, 
  CheckCircle,
  BookOpen,
  Star,
  Share2,
  Bookmark,
  Award,
  Shield,
  Users,
  ExternalLink,
  ChevronRight,
  Check,
  TrendingUp,
  Play,
  Download,
} from 'lucide-react';

interface FormData {
  email: string;
  consent: boolean;
}

export default function CommunitySection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'newsletter' | 'articulos' | 'cursos' | 'perfil'>('newsletter');
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Newsletter subscription:', data);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="comunidad" className="py-16 md:py-20 bg-[#F3F3F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============ HEADER ============ */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 font-normal">
            Centro de <span className="text-[#5352F6] font-bold">aprendizaje</span> de inversión inmobiliaria
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Guías prácticas, cursos y webinars para invertir con criterio. Actualizado cada semana.
          </p>
        </div>

        {/* ============ STEPPER/TABS NAVIGATION ============ */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4">
            {[
              { id: 'newsletter', label: 'Newsletter', icon: Mail },
              { id: 'articulos', label: 'Artículos recientes', icon: BookOpen },
              { id: 'cursos', label: 'Últimos cursos', icon: Play },
              { id: 'perfil', label: 'Descubre tu perfil', icon: TrendingUp }
            ].map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                    isActive 
                      ? 'bg-[#5352F6] text-white shadow-lg shadow-[#5352F6]/30 scale-105' 
                      : 'bg-white text-muted-foreground hover:bg-white/80 hover:text-foreground'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#5352F6]'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============ TAB CONTENT ============ */}
        <div className="min-h-[600px] mb-0">
          {activeTab === 'newsletter' && <NewsletterTab onSubmit={handleSubmit(onSubmit)} register={register} isSubmitted={isSubmitted} />}
          {activeTab === 'articulos' && <ArticulosTab />}
          {activeTab === 'cursos' && <CursosTab />}
          {activeTab === 'perfil' && <PerfilTab />}
        </div>
      </div>
    </section>
  );
}
