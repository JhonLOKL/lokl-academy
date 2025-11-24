"use client";

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import YouTubeEmbed from './youtube-embed';

export default function Testimonials() {
  // Estado para controlar si algún video está reproduciéndose
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const isVideoPlayingRef = useRef(isVideoPlaying);
  
  // Estado para el carrusel móvil
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  useEffect(() => {
    isVideoPlayingRef.current = isVideoPlaying;
  }, [isVideoPlaying]);
  
  useEffect(() => {
    type Direction = 'left' | 'right';
    
    const setupAutoScroll = (container: HTMLDivElement | null, direction: Direction) => {
      if (!container) return;
      
      container.style.cursor = 'grab';
      container.style.touchAction = 'pan-y';
      container.style.userSelect = 'none';
      
      let loopWidth = 0;
      let virtualScroll = 0;
      let animationFrameId: number | null = null;
      let recalcFrameId: number | null = null;
      let isDragging = false;
      let isHovering = false;
      let startX = 0;
      let startVirtualScroll = 0;
      
      const baseSpeed = direction === 'left' ? 0.4 : -0.4;
      
      const wrapPosition = (value: number) => {
        if (loopWidth === 0) return 0;
        return ((value % loopWidth) + loopWidth) % loopWidth;
      };
      
      const syncScrollLeft = () => {
        container.scrollLeft = virtualScroll;
      };
      
      const recalcLoopWidth = () => {
        const totalWidth = container.scrollWidth;
        loopWidth = totalWidth / 2;
        
        if (loopWidth === 0) return;
        
        if (direction === 'right' && virtualScroll === 0) {
          virtualScroll = loopWidth;
        }
        
        virtualScroll = wrapPosition(virtualScroll);
        syncScrollLeft();
      };
      
      recalcLoopWidth();
      recalcFrameId = requestAnimationFrame(recalcLoopWidth);
      
      const handleResize = () => {
        recalcLoopWidth();
      };
      
      window.addEventListener('resize', handleResize);
      
      const autoScroll = () => {
        if (!isDragging && !isHovering && !isVideoPlayingRef.current && loopWidth > 0) {
          virtualScroll = wrapPosition(virtualScroll + baseSpeed);
          syncScrollLeft();
        }
        
        animationFrameId = requestAnimationFrame(autoScroll);
      };
      
      animationFrameId = requestAnimationFrame(autoScroll);
      
      const handlePointerDown = (event: PointerEvent) => {
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        
        isDragging = true;
        startX = event.clientX;
        startVirtualScroll = virtualScroll;
        container.style.cursor = 'grabbing';
        
        try {
          container.setPointerCapture(event.pointerId);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          // Ignoramos errores de pointer capture en navegadores que no lo soporten
        }
      };
      
      const handlePointerMove = (event: PointerEvent) => {
        if (!isDragging) return;
        
        event.preventDefault();
        const delta = event.clientX - startX;
        virtualScroll = wrapPosition(startVirtualScroll - delta);
        syncScrollLeft();
      };
      
      const endDrag = (event: PointerEvent) => {
        if (!isDragging) return;
        
        isDragging = false;
        container.style.cursor = 'grab';
        
        try {
          if (container.hasPointerCapture(event.pointerId)) {
            container.releasePointerCapture(event.pointerId);
          }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          // Ignoramos errores de pointer capture en navegadores que no lo soporten
        }
      };
      
      const handleMouseEnter = () => {
        isHovering = true;
      };
      
      const handleMouseLeave = () => {
        isHovering = false;
      };
      
      container.addEventListener('pointerdown', handlePointerDown);
      container.addEventListener('pointermove', handlePointerMove);
      container.addEventListener('pointerup', endDrag);
      container.addEventListener('pointercancel', endDrag);
      container.addEventListener('pointerleave', endDrag);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId);
        }
        
        if (recalcFrameId !== null) {
          cancelAnimationFrame(recalcFrameId);
        }
        
        window.removeEventListener('resize', handleResize);
        container.removeEventListener('pointerdown', handlePointerDown);
        container.removeEventListener('pointermove', handlePointerMove);
        container.removeEventListener('pointerup', endDrag);
        container.removeEventListener('pointercancel', endDrag);
        container.removeEventListener('pointerleave', endDrag);
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
        container.style.cursor = '';
        container.style.touchAction = '';
        container.style.userSelect = '';
      };
    };
    
    const cleanups = [
      setupAutoScroll(row1Ref.current, 'right'),
      setupAutoScroll(row2Ref.current, 'left')
    ].filter(Boolean) as Array<() => void>;
    
    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);
  
  // Función para manejar el estado de reproducción de video
  const handleVideoPlayStateChange = (isPlaying: boolean) => {
    setIsVideoPlaying(isPlaying);
  };

  // Funciones para navegación móvil
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % allTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + allTestimonials.length) % allTestimonials.length);
  };

  // Testimoniales de texto
  const textTestimonials = [
    {
      id: 1,
      name: "María Camila R.",
      project: "Nido de Agua",
      content:
        "Fue la primera vez en mi vida que invertí en real estate. Entré con un monto que sí podía pagar, no millones imposibles. Tres meses después ya me quedé en la propiedad con mi pareja y sentí: ‘wow, esto no es teoría, es mío’.",
      isVideo: false
    },
    {
      id: 2,
      name: "Andrés P.",
      project: "Aldea",
      content:
        "Yo siempre pensé que invertir en hotelería era solo para gente con mucho capital. Con LOKL fue distinto: cero papeleo raro, todo súper claro, y ahora tengo una parte de un proyecto que genera renta turística. Literal estoy diversificando sin pelear con el banco.",
      isVideo: false
    },
    {
      id: 3,
      name: "Laura G.",
      project: "Indie Universe",
      content:
        "No es solo la rentabilidad. Es acompañamiento. Me explicaron paso a paso dónde va mi plata, qué riesgo hay y cómo salgo si algún día quiero vender. Nadie en finanzas te habla así de claro.",
      isVideo: false
    },
    {
      id: 4,
      name: "Jorge M.",
      project: "Nido de Agua",
      content:
        "Yo trabajo tiempo completo y no tengo cabeza para administrar propiedades. LOKL me dejó entrar al negocio hotelero sin tener que ser ‘el administrador’. Recibo actualizaciones, sé cuánto entra, y puedo usar noches en el lugar. Eso para mí es libertad.",
      isVideo: false
    },
    {
      id: 5,
      name: "Daniela S.",
      project: "Aldea",
      content:
        "En mi familia nadie había invertido en bienes raíces porque siempre era: ‘toca comprar el apartamento completo’. Con LOKL entendí que también puedo ser dueña de un pedacito de un hotel hermoso que la gente sí usa. Me cambió la mentalidad.",
      isVideo: false
    },
    {
      id: 6,
      name: "Felipe L.",
      project: "Indie Universe",
      content:
        "Lo que más me gustó fue la transparencia. Antes de poner un peso vi números reales de ocupación, costos y proyección. No fue ‘confía y ya’, fue: aquí están los datos, decide tú. Eso me dio mucha paz.",
      isVideo: false
    },
    {
      id: 7,
      name: "Lucía V.",
      project: "Nido de Agua",
      content:
        "Para mí esto es doble impacto: crecimiento financiero y estilo de vida. Invierto en turismo consciente, en un lugar al que quiero volver, y además estoy construyendo patrimonio. Nunca había sentido que una inversión también me regalaba recuerdos.",
      isVideo: false
    },
    {
      id: 8,
      name: "Ricardo T.",
      project: "Aldea",
      content:
        "Yo venía guardando plata en CDT porque ‘eso es lo seguro’. Pero el CDT no me da nada más que intereses chiquitos. Aquí siento que mi dinero está trabajando en algo real, físico, que puedo visitar y mostrar.",
      isVideo: false
    }
  ];
  
  
  // Videos de YouTube Shorts
  const videoTestimonials = [
    {
      id: 101,
      videoId: "Rrj91s3Fawc", // YouTube Shorts ID
      isVideo: true,
      duration: "0:30"
    },
    {
      id: 102,
      videoId: "RNH4CcUWhTU", // YouTube Shorts ID
      isVideo: true,
      duration: "0:30"
    },
    {
      id: 103,
      videoId: "MOshfGMEsME", // YouTube Shorts ID
      isVideo: true,
      duration: "0:30"
    },
    {
      id: 104,
      videoId: "jZeIbMTLx-0", // YouTube Shorts ID
      isVideo: true,
      duration: "0:30"
    }
  ];
  
  // Combinamos todos los testimonios para el carrusel móvil
  // Los videos van primero para móvil
  const allTestimonials = [
    ...videoTestimonials,
    ...textTestimonials
  ];

  // Combinamos los testimoniales para crear dos filas, intercalando videos con texto
  const row1Testimonials = [
    textTestimonials[0],
    textTestimonials[1],
    videoTestimonials[0],
    textTestimonials[2],
    textTestimonials[3],
    videoTestimonials[1],
    // Repetimos para el scroll infinito
    textTestimonials[0],
    textTestimonials[1],
    videoTestimonials[0],
    textTestimonials[2],
    textTestimonials[3],
    videoTestimonials[1]
  ];
  
  const row2Testimonials = [
    textTestimonials[4],
    textTestimonials[5],
    videoTestimonials[2],
    textTestimonials[6],
    textTestimonials[7],
    videoTestimonials[3],
    // Repetimos para el scroll infinito
    textTestimonials[4],
    textTestimonials[5],
    videoTestimonials[2],
    textTestimonials[6],
    textTestimonials[7],
    videoTestimonials[3]
  ];

  // Ya hemos definido row1Testimonials y row2Testimonials arriba

  return (
    <section 
      className="py-16 md:py-24 bg-background overflow-hidden relative"
    >
      <div className="container mx-auto px-6 mb-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            <span className="text-[#5352F6]">Nuestra</span> Comunidad
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Historias de éxito de inversores que han construido patrimonio con LOKL. 
            Descubre cómo otros han alcanzado sus objetivos financieros.
          </p>
        </div>
      </div>

      {/* Mobile Carousel - Solo visible en móvil */}
      <div className="block md:hidden">
        <div className="flex justify-center items-center mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="rounded-full p-2"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <span className="text-sm text-muted-foreground">
              {currentTestimonial + 1} / {allTestimonials.length}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="rounded-full p-2"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex justify-center">
          <TestimonialCard 
            testimonial={allTestimonials[currentTestimonial]} 
            onVideoPlayStateChange={handleVideoPlayStateChange}
          />
        </div>
      </div>

      {/* Desktop Scrolling Rows - Solo visible en desktop */}
      <div className="hidden md:block space-y-6">
        {/* Row 1 - Scrolling Right */}
        <div className="relative overflow-hidden">
          <div 
            id="testimonial-row-1" 
            ref={row1Ref}
            className="w-full overflow-hidden"
          >
            <div className="flex gap-4 w-max select-none cursor-grab touch-pan-y">
              {row1Testimonials.map((testimonial, index) => (
                <div key={`${testimonial.id}-${index}`}>
                  <TestimonialCard 
                    testimonial={testimonial} 
                    onVideoPlayStateChange={handleVideoPlayStateChange}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 - Scrolling Left */}
        <div className="relative overflow-hidden">
          <div 
            id="testimonial-row-2" 
            ref={row2Ref}
            className="w-full overflow-hidden"
          >
            <div className="flex gap-4 w-max select-none cursor-grab touch-pan-y">
              {row2Testimonials.map((testimonial, index) => (
                <div key={`${testimonial.id}-${index}`}>
                  <TestimonialCard 
                    testimonial={testimonial} 
                    onVideoPlayStateChange={handleVideoPlayStateChange}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type Testimonial = {
  id: number;
  isVideo: boolean;
  videoId?: string;
  duration?: string;
  name?: string;
  project?: string;
  content?: string;
};

interface TestimonialCardProps {
  testimonial: Testimonial;
  onVideoPlayStateChange: (isPlaying: boolean) => void;
}

function TestimonialCard({ testimonial, onVideoPlayStateChange }: TestimonialCardProps) {
  // Función para obtener las iniciales del nombre
  const getInitials = (name?: string) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('');
  };

  // Función para obtener un color de fondo basado en el nombre
  const getAvatarColor = (name?: string) => {
    // Lista de colores para los avatares
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-red-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
      "bg-orange-500",
      "bg-cyan-500"
    ];
    
    if (!name) return colors[0];
    
    // Usar la suma de los códigos de caracteres del nombre para seleccionar un color
    const charSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[charSum % colors.length];
  };

  if (testimonial.isVideo && testimonial.videoId) {
    return (
      <div className="flex-shrink-0 w-80 h-80 overflow-hidden group relative">
        {/* Video component that fills the entire card */}
        <div className="w-full h-full">
          <YouTubeEmbed 
            videoId={testimonial.videoId} 
            onPlayStateChange={onVideoPlayStateChange}
          />
          
          {/* Duration Badge - Top Right */}
          {testimonial.duration && (
            <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded z-10">
              {testimonial.duration}
            </div>
          )}
          
          {/* Eliminamos la información del perfil en la parte inferior */}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-shrink-0 w-80 sm:w-[38rem] md:w-[42rem] h-80 overflow-hidden group">
      <Card className="w-full h-full p-5 border border-gray-200 bg-white hover:shadow-xl transition-all duration-300 flex flex-col">
        <div className="flex items-start mb-4">
          <div className="flex items-center gap-3">
            <Avatar className={`h-10 w-10 ${getAvatarColor(testimonial.name)}`}>
              <AvatarFallback className="text-white font-medium">
                {getInitials(testimonial.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-bold text-base md:text-lg">{testimonial.name}</div>
              <div className="text-sm md:text-base text-muted-foreground">{testimonial.project}</div>
            </div>
          </div>
        </div>
        <p className="text-base md:text-lg text-foreground leading-relaxed flex-1">
          {testimonial.content}
        </p>
      </Card>
    </div>
  );
}
