"use client";

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ImageWithFallback } from './image-with-fallback';
import { Clock, ChevronRight } from 'lucide-react';

export default function ArticulosTab() {
  return (
    <div className="animate-fade-in space-y-8">
      {/* Grid de artículos 2x2 */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Artículo 1 */}
        <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer p-0">
          <div className="relative h-56 overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1653378972336-103e1ea62721?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlc3RtZW50JTIwd2ViaW5hciUyMHByZXNlbnRhdGlvbnxlbnwxfHx8fDE3NTk5NTI2NTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="La estrategia de inversión que todo colombiano debería conocer"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <Badge className="absolute top-3 left-3 bg-[#5352F6] text-primary-foreground">Destacado</Badge>
          </div>
          <div className="p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>12 sep 2025</span>
              <span className="mx-1">•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                5 min
              </span>
            </div>
            <h4 className="font-bold text-foreground group-hover:text-[#5352F6] transition-colors">
              La estrategia de inversión que todo colombiano debería conocer
            </h4>
            <p className="text-sm text-muted-foreground">
              Descubre por qué invertir en lo familiar reduce el riesgo y aprende la metodología de Peter Lynch aplicada al mercado colombiano.
            </p>
            <div className="flex items-center gap-3 pt-3 border-t border-border/40">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=MariaJoseBotero" />
                <AvatarFallback>MJ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">María José Botero</p>
              </div>
              <Button size="sm" variant="ghost" className="text-[#5352F6]">
                Leer
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Artículo 2 */}
        <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer p-0">
          <div className="relative h-56 overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1759428807275-b798a80e2801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwaW52ZXN0bWVudCUyMG9mZmljZXxlbnwxfHx8fDE3NTk5NTE5NDd8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Guía para Reconocer Estafas en Inversiones"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <Badge className="absolute top-3 left-3 bg-green-500 text-white">Nuevo</Badge>
          </div>
          <div className="p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>10 sep 2025</span>
              <span className="mx-1">•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                6 min
              </span>
            </div>
            <h4 className="font-bold text-foreground group-hover:text-[#5352F6] transition-colors">
              Guía Definitiva para Reconocer Estafas en Inversiones
            </h4>
            <p className="text-sm text-muted-foreground">
              En el mundo digital, las oportunidades de inversión abundan, pero también los riesgos. Aprende a proteger tu patrimonio.
            </p>
            <div className="flex items-center gap-3 pt-3 border-t border-border/40">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=MariaJoseBotero" />
                <AvatarFallback>MJ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">María José Botero</p>
              </div>
              <Button size="sm" variant="ghost" className="text-[#5352F6]">
                Leer
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Artículo 3 */}
        <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer p-0">
          <div className="relative h-56 overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1695067440629-b5e513976100?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTk4NTA0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Guía Completa de Inversión Inmobiliaria 2026"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <Badge className="absolute top-3 left-3 bg-[#5352F6] text-primary-foreground">Caso práctico</Badge>
          </div>
          <div className="p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>8 sep 2025</span>
              <span className="mx-1">•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                8 min
              </span>
            </div>
            <h4 className="font-bold text-foreground group-hover:text-[#5352F6] transition-colors">
              Guía Completa de Inversión Inmobiliaria 2026
            </h4>
            <p className="text-sm text-muted-foreground">
              Descubre las estrategias más efectivas para invertir en bienes raíces. Desde análisis de mercado hasta gestión de riesgo.
            </p>
            <div className="flex items-center gap-3 pt-3 border-t border-border/40">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=JhonVelazquez" />
                <AvatarFallback>JV</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Jhon Velazquez</p>
              </div>
              <Button size="sm" variant="ghost" className="text-[#5352F6]">
                Leer
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Artículo 4 - NUEVO */}
        <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer p-0">
          <div className="relative h-56 overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwbW9kZXJuJTIwaG91c2V8ZW58MXx8fHwxNzU5OTUyNjU4fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Diversificación: Clave del Éxito en Bienes Raíces"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <Badge className="absolute top-3 left-3 bg-orange-500 text-white">Tendencia</Badge>
          </div>
          <div className="p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>5 sep 2025</span>
              <span className="mx-1">•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                7 min
              </span>
            </div>
            <h4 className="font-bold text-foreground group-hover:text-[#5352F6] transition-colors">
              Diversificación: Clave del Éxito en Bienes Raíces
            </h4>
            <p className="text-sm text-muted-foreground">
              Aprende cómo distribuir tu capital entre diferentes tipos de proyectos para maximizar retornos y minimizar riesgos.
            </p>
            <div className="flex items-center gap-3 pt-3 border-t border-border/40">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=CamiloOlarte" />
                <AvatarFallback>CO</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Camilo Olarte</p>
              </div>
              <Button size="sm" variant="ghost" className="text-[#5352F6]">
                Leer
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="text-center">
        <Button variant="outline" className="border-[#5352F6]/20 text-[#5352F6] hover:bg-[#5352F6]/5">
          Ver todos los artículos
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
