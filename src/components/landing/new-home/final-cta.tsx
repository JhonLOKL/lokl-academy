"use client";

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Shield, Users, Calendar, Check } from 'lucide-react';
import { ImageWithFallback } from './image-with-fallback';

type GtagFunction = {
  (command: "js", date: Date): void;
  (command: "config", id: string, params?: Record<string, unknown>): void;
  (command: "event", action: string, parameters?: Record<string, unknown>): void;
};

interface WindowWithGtag extends Window {
  gtag?: GtagFunction;
}

export default function FinalCTA() {
  const handleScheduleCall = () => {
    if (typeof window !== 'undefined') {
      const w = window as WindowWithGtag;
      if (w.gtag) {
        w.gtag('event', 'schedule_call_click', {
          'event_category': 'Lead Generation',
          'event_label': 'CTA Schedule Call'
        });
      }
    }
    window.open('https://calendly.com/lokl/proyectos', '_blank');
  };

  return (
    <section id="cta-final" className="py-8 md:py-12 lg:py-16 bg-gradient-to-br from-[#5352F6] via-[#5352F6]/95 to-[#5352F6]/90 text-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Decorative Elements - Más sutiles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl translate-y-40 -translate-x-40"></div>
        
        <div className="relative z-10">
          
          {/* Header - Optimizado para móvil */}
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl mb-3 md:mb-4 text-white max-w-4xl mx-auto leading-tight">
              Agenda una llamada con nuestro equipo
            </h2>
            <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              Resuelve todas tus dudas en 45 minutos con un asesor especializado
            </p>
          </div>

          {/* Tarjeta Principal - Responsive */}
          <Card className="overflow-hidden border-white/20 shadow-2xl max-w-3xl mx-auto p-0">
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] bg-white">
              
              {/* Columna izquierda - Foto del asesor */}
              <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-full overflow-hidden group order-1 lg:order-1">
                <ImageWithFallback
                  src="https://lokl-assets.s3.us-east-1.amazonaws.com/home/benefits/Cta-final.jpg"
                  alt="Asesora especializada LOKL"
                  className="w-full h-full object-cover object-top landscape:object-center lg:object-center transition-transform duration-700 group-hover:scale-105"
                  width={300}
                  height={500}
                  priority={true}
                  quality={85}
                  sizes="(max-width: 1024px) 100vw, 300px"
                />
                {/* Overlay sutil */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#5352F6]/40 via-transparent to-transparent"></div>
                
                {/* Badge sobre la imagen - Solo visible en desktop */}
                <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-6 hidden md:block">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 lg:p-4 shadow-lg">
                    <div className="flex items-center gap-2 lg:gap-3">
                      <div className="w-8 h-8 lg:w-12 lg:h-12 bg-[#5352F6]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-4 w-4 lg:h-6 lg:w-6 text-[#5352F6]" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-xs lg:text-sm">Asesor especializado</p>
                        <p className="text-xs text-muted-foreground">10+ años de experiencia</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Columna derecha - Contenido */}
              <div className="px-4 py-6 sm:px-6 md:px-10 md:py-5 flex flex-col justify-center order-2 lg:order-2">
                
                {/* Beneficios */}
                <div className="mb-4 md:mb-6">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 md:mb-5">
                    En esta llamada descubrirás:
                  </h3>
                  <ul className="space-y-2 md:space-y-3">
                    <li className="flex items-start gap-2 md:gap-3">
                      <div className="w-5 h-5 md:w-6 md:h-6 bg-[#5352F6]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 md:h-4 md:w-4 text-[#5352F6]" />
                      </div>
                      <span className="text-sm md:text-base text-muted-foreground">Cómo empezar a invertir desde <span className="font-bold text-foreground">COP $1.3M/mes</span></span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3">
                      <div className="w-5 h-5 md:w-6 md:h-6 bg-[#5352F6]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 md:h-4 md:w-4 text-[#5352F6]" />
                      </div>
                      <span className="text-sm md:text-base text-muted-foreground">Proyectos disponibles y retornos esperados</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3">
                      <div className="w-5 h-5 md:w-6 md:h-6 bg-[#5352F6]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 md:h-4 md:w-4 text-[#5352F6]" />
                      </div>
                      <span className="text-sm md:text-base text-muted-foreground">Tu plan personalizado de inversión inmobiliaria</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3">
                      <div className="w-5 h-5 md:w-6 md:h-6 bg-[#5352F6]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 md:h-4 md:w-4 text-[#5352F6]" />
                      </div>
                      <span className="text-sm md:text-base text-muted-foreground">Respuestas a todas tus preguntas sobre <span className="text-[#5352F6] font-bold">LOKL</span></span>
                    </li>
                  </ul>
                </div>

                {/* CTA Principal */}
                <Button 
                  onClick={handleScheduleCall}
                  size="lg"
                  className="w-full bg-[#5352F6] hover:bg-[#5352F6]/90 text-white py-4 md:py-6 text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] mb-3 md:mb-4"
                >
                  <Calendar className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  Agendar asesoría personalizada
                </Button>

                {/* Social proof */}
                <p className="text-xs text-muted-foreground text-center mb-4 md:mb-5">
                  <Users className="h-3 w-3 inline mr-1" />
                  Más de 2,000 colombianos ya invirtieron con LOKL
                </p>

                {/* Trust Seals */}
                <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 lg:gap-6 pt-4 md:pt-5 border-t border-border">
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <Shield className="h-3 w-3 md:h-4 md:w-4 text-[#5352F6]" />
                    <span className="text-xs md:text-sm text-muted-foreground">Datos seguros</span>
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-[#5352F6]" />
                    <span className="text-xs md:text-sm text-muted-foreground">Sin compromiso</span>
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <Calendar className="h-3 w-3 md:h-4 md:w-4 text-[#5352F6]" />
                    <span className="text-xs md:text-sm text-muted-foreground">45 minutos</span>
                  </div>
                </div>
              </div>

            </div>
          </Card>

        </div>
      </div>
    </section>
  );
}
