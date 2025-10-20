"use client";

import { useState, useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import YouTubeEmbed from './youtube-embed';

export default function Testimonials() {
  // Estado para controlar si algún video está reproduciéndose
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  
  // Efecto para controlar la pausa de animación en hover y reproducción de video
  useEffect(() => {
    // Función para manejar el hover en la primera fila
    const handleRow1MouseEnter = () => {
      if (row1Ref.current && !isVideoPlaying) {
        row1Ref.current.style.animationPlayState = 'paused';
      }
    };
    
    const handleRow1MouseLeave = () => {
      if (row1Ref.current && !isVideoPlaying) {
        row1Ref.current.style.animationPlayState = 'running';
      }
    };
    
    // Función para manejar el hover en la segunda fila
    const handleRow2MouseEnter = () => {
      if (row2Ref.current && !isVideoPlaying) {
        row2Ref.current.style.animationPlayState = 'paused';
      }
    };
    
    const handleRow2MouseLeave = () => {
      if (row2Ref.current && !isVideoPlaying) {
        row2Ref.current.style.animationPlayState = 'running';
      }
    };
    
    // Añadir event listeners
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;
    
    if (row1) {
      row1.addEventListener('mouseenter', handleRow1MouseEnter);
      row1.addEventListener('mouseleave', handleRow1MouseLeave);
    }
    
    if (row2) {
      row2.addEventListener('mouseenter', handleRow2MouseEnter);
      row2.addEventListener('mouseleave', handleRow2MouseLeave);
    }
    
    // Limpieza al desmontar
    return () => {
      if (row1) {
        row1.removeEventListener('mouseenter', handleRow1MouseEnter);
        row1.removeEventListener('mouseleave', handleRow1MouseLeave);
      }
      
      if (row2) {
        row2.removeEventListener('mouseenter', handleRow2MouseEnter);
        row2.removeEventListener('mouseleave', handleRow2MouseLeave);
      }
    };
  }, [isVideoPlaying]);
  
  // Función para manejar el estado de reproducción de video
  const handleVideoPlayStateChange = (isPlaying: boolean) => {
    setIsVideoPlaying(isPlaying);
    
    // Pausar ambos carruseles cuando un video está reproduciéndose
    if (isPlaying) {
      if (row1Ref.current) row1Ref.current.style.animationPlayState = 'paused';
      if (row2Ref.current) row2Ref.current.style.animationPlayState = 'paused';
    } else {
      // Restaurar el estado normal de los carruseles
      if (row1Ref.current) row1Ref.current.style.animationPlayState = 'running';
      if (row2Ref.current) row2Ref.current.style.animationPlayState = 'running';
    }
  };

  // Testimoniales de texto
  const textTestimonials = [
    {
      id: 1,
      name: "María González",
      project: "Indie Universe",
      content: "Invertir en LOKL es mucho mejor que los CDTs tradicionales. Los retornos son consistentes y la plataforma es transparente.",
      isVideo: false
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      project: "Nido de Agua",
      content: "Creo que LOKL va a ganar. Lo que me llevó a creer esto está más allá del producto en sí y cómo el equipo ejecuta.",
      isVideo: false
    },
    {
      id: 3,
      name: "Ana Martín",
      project: "Aldea",
      content: "Increíble. Acabo de construir mi portafolio con 1 prompt.",
      isVideo: false
    },
    {
      id: 4,
      name: "Diego López",
      project: "Indie Universe",
      content: "He estado usando LOKL exclusivamente durante semanas. No están pagando nada. Realmente muy bueno.",
      isVideo: false
    },
    {
      id: 6,
      name: "Roberto Silva",
      project: "Aldea",
      content: "La razón por la que elegí LOKL es porque están en una misión constante de optimizar y mejorar la experiencia. Los planes de transparencia son claros y justos.",
      isVideo: false
    },
    {
      id: 7,
      name: "Lucía Vega",
      project: "Indie Universe",
      content: "LOKL hace que invertir sea increíblemente divertido y rápido!",
      isVideo: false
    },
    {
      id: 8,
      name: "Miguel Torres",
      project: "Nido de Agua",
      content: "Una de las características más geniales de LOKL es la pestaña 'Proyectos' que lista todos los problemas en tu inversión.",
      isVideo: false
    },
    {
      id: 9,
      name: "Patricia Ruiz",
      project: "Aldea",
      content: "He estado construyendo mi patrimonio con LOKL. Pasé la última hora casi llorando porque las respuestas son increíbles.",
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

      {/* Scrolling Rows */}
      <div className="space-y-6">
        {/* Row 1 - Scrolling Right */}
        <div className="relative">
          <div 
            id="testimonial-row-1" 
            ref={row1Ref}
            className="flex gap-4 animate-scroll-right"
          >
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

        {/* Row 2 - Scrolling Left */}
        <div className="relative">
          <div 
            id="testimonial-row-2" 
            ref={row2Ref}
            className="flex gap-4 animate-scroll-left"
          >
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

      {/* Inline CSS for animations */}
      <style jsx>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-right {
          animation: scroll-right 60s linear infinite;
        }

        .animate-scroll-left {
          animation: scroll-left 60s linear infinite;
        }
      `}</style>
    </section>
  );
}

interface TestimonialCardProps {
  testimonial: any;
  onVideoPlayStateChange: (isPlaying: boolean) => void;
}

function TestimonialCard({ testimonial, onVideoPlayStateChange }: TestimonialCardProps) {
  // Función para obtener las iniciales del nombre
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  // Función para obtener un color de fondo basado en el nombre
  const getAvatarColor = (name: string) => {
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
    
    // Usar la suma de los códigos de caracteres del nombre para seleccionar un color
    const charSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[charSum % colors.length];
  };

  if (testimonial.isVideo) {
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
    <div className="flex-shrink-0 w-80 h-80 overflow-hidden group">
      <Card className="w-full h-full p-5 border border-gray-200 bg-white hover:shadow-xl transition-all duration-300 flex flex-col">
        <div className="flex items-start mb-4">
          <div className="flex items-center gap-3">
            <Avatar className={`h-10 w-10 ${getAvatarColor(testimonial.name)}`}>
              <AvatarFallback className="text-white font-medium">
                {getInitials(testimonial.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-bold text-sm">{testimonial.name}</div>
              <div className="text-xs text-muted-foreground">{testimonial.project}</div>
            </div>
          </div>
        </div>
        <p className="text-sm text-foreground leading-relaxed flex-1">
          {testimonial.content}
        </p>
      </Card>
    </div>
  );
}
