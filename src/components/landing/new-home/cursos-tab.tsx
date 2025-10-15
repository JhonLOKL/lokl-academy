"use client";

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ImageWithFallback } from './image-with-fallback';
import { Clock, ChevronRight, Award } from 'lucide-react';

export default function CursosTab() {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Curso 1 */}
        <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer p-0">
          <div className="relative h-56 overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/flagged/photo-1558954157-aa76c0d246c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9wZXJ0eSUyMHJlYWwlMjBlc3RhdGUlMjBndWlkZXxlbnwxfHx8fDE3NTk5NTE5NDh8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Curso de inversión en turismo"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              <Badge className="bg-green-500 text-white">Gratis</Badge>
              <Badge className="bg-[#5352F6] text-primary-foreground flex items-center gap-1">
                <Award className="h-3 w-3" />
                Certificado
              </Badge>
            </div>
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-xs flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>8 min</span>
            </div>
          </div>
          <div className="p-6 space-y-3">
            <h4 className="font-bold text-foreground group-hover:text-[#5352F6] transition-colors">
              Cómo invertir en turismo en Colombia sin ser experto
            </h4>
            <p className="text-sm text-muted-foreground">
              Colombia vive un auge turístico sin precedentes, con casi 6.7 millones de visitantes no residentes en 2023...
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
                Ver curso
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Curso 2 */}
        <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer p-0">
          <div className="relative h-56 overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1734856080638-71e78b3d8d5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGludmVzdG1lbnQlMjBhbmFseXRpY3N8ZW58MXx8fHwxNzU5OTUxOTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Curso de estrategia inmobiliaria"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              <Badge className="bg-green-500 text-white">Gratis</Badge>
              <Badge className="bg-[#5352F6] text-primary-foreground flex items-center gap-1">
                <Award className="h-3 w-3" />
                Certificado
              </Badge>
            </div>
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-xs flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>2 h</span>
            </div>
          </div>
          <div className="p-6 space-y-3">
            <h4 className="font-bold text-foreground group-hover:text-[#5352F6] transition-colors">
              Invertir con Visión: Curso de Estrategia Inmobiliaria
            </h4>
            <p className="text-sm text-muted-foreground">
              Este curso te enseña a pensar como inversionista. Vas a entender cómo se analiza un proyecto inmobiliario...
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
                Ver curso
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Curso 3 - NUEVO */}
        <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer p-0">
          <div className="relative h-56 overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNlJTIwcGxhbm5pbmclMjBkZXNrfGVufDF8fHx8MTc1OTk1MjY1OHww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Análisis Financiero de Proyectos"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              <Badge className="bg-orange-500 text-white">Premium</Badge>
              <Badge className="bg-[#5352F6] text-primary-foreground flex items-center gap-1">
                <Award className="h-3 w-3" />
                Certificado
              </Badge>
            </div>
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-xs flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>3 h</span>
            </div>
          </div>
          <div className="p-6 space-y-3">
            <h4 className="font-bold text-foreground group-hover:text-[#5352F6] transition-colors">
              Análisis Financiero de Proyectos Inmobiliarios
            </h4>
            <p className="text-sm text-muted-foreground">
              Domina las métricas clave: ROI, TIR, VPN. Aprende a leer estados financieros y evaluar la viabilidad real de un proyecto.
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
                Ver curso
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Curso 4 - NUEVO */}
        <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer p-0">
          <div className="relative h-56 overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWdhbCUyMGRvY3VtZW50cyUyMGNvbnRyYWN0fGVufDF8fHx8MTc1OTk1MjY1OHww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Aspectos Legales de Inversión"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              <Badge className="bg-green-500 text-white">Gratis</Badge>
              <Badge className="bg-[#5352F6] text-primary-foreground flex items-center gap-1">
                <Award className="h-3 w-3" />
                Certificado
              </Badge>
            </div>
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-xs flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>1.5 h</span>
            </div>
          </div>
          <div className="p-6 space-y-3">
            <h4 className="font-bold text-foreground group-hover:text-[#5352F6] transition-colors">
              Aspectos Legales de la Inversión Inmobiliaria
            </h4>
            <p className="text-sm text-muted-foreground">
              Protege tu inversión conociendo tus derechos. Contratos, regulaciones, due diligence y más aspectos legales esenciales.
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
                Ver curso
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="text-center">
        <Button variant="outline" className="border-[#5352F6]/20 text-[#5352F6] hover:bg-[#5352F6]/5">
          Ver todos los cursos
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
