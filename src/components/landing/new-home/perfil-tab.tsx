"use client";

import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ImageWithFallback } from './image-with-fallback';
import { TrendingUp, Check, ChevronRight, Users } from 'lucide-react';

export default function PerfilTab() {
  const router = useRouter();

  return (
    <div className="animate-fade-in">
      <div>
        <Card className="overflow-hidden border-[#5352F6]/20 hover:shadow-lg transition-shadow p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
            {/* Columna izquierda - Imagen */}
            <div className="relative h-[500px] lg:h-auto overflow-hidden group">
              <ImageWithFallback
                src="https://lokl-assets.s3.us-east-1.amazonaws.com/home/benefits/Discover.jpg"
                alt="Descubre tu perfil de inversionista"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay solo en la parte inferior para el texto */}
              <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>
              
              {/* Texto sobre la imagen - Parte inferior */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-3">
                  Descubre tu perfil de <span className="text-white/90">inversionista</span>
                </h3>
                <p className="text-base text-white/90">
                  Conoce qué tipo de inversionista eres y recibe recomendaciones personalizadas para tu portafolio.
                </p>
              </div>
            </div>

            {/* Columna derecha - Contenido */}
            <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
              {/* Icono */}
              <div className="w-16 h-16 bg-[#5352F6]/10 rounded-full flex items-center justify-center mb-6 ring-4 ring-[#5352F6]/20 mx-auto">
                <TrendingUp className="h-8 w-8 text-[#5352F6]" />
              </div>

              {/* Beneficios del test */}
              <div className="mb-8">
                <h4 className="font-bold text-foreground mb-4">¿Qué descubrirás?</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#5352F6] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Tu tolerancia al riesgo y horizonte de inversión ideal</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#5352F6] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Proyectos recomendados según tu perfil</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#5352F6] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Estrategias de diversificación personalizadas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#5352F6] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Guía de primeros pasos en inversión inmobiliaria</span>
                  </li>
                </ul>
              </div>

              {/* CTA */}
              <Button 
                size="lg" 
                className="w-full bg-[#5352F6] hover:bg-[#5352F6]/90 text-primary-foreground h-12 mb-4"
                onClick={() => router.push('/discoveryourinvestorprofile')}
              >
                Hacer el test (2 minutos)
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>

              {/* Social proof */}
              <p className="text-xs text-muted-foreground text-center">
                <Users className="h-3 w-3 inline mr-1" />
                Más de 5,000 inversionistas ya conocen su perfil
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
