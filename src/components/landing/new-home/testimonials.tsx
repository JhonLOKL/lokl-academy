"use client";

import { useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function Testimonials() {
  // Efecto para controlar la pausa de animación en hover
  useEffect(() => {
    // Función para manejar el hover en la primera fila
    const handleRow1MouseEnter = () => {
      const row = document.getElementById('testimonial-row-1');
      if (row) row.style.animationPlayState = 'paused';
    };
    
    const handleRow1MouseLeave = () => {
      const row = document.getElementById('testimonial-row-1');
      if (row) row.style.animationPlayState = 'running';
    };
    
    // Función para manejar el hover en la segunda fila
    const handleRow2MouseEnter = () => {
      const row = document.getElementById('testimonial-row-2');
      if (row) row.style.animationPlayState = 'paused';
    };
    
    const handleRow2MouseLeave = () => {
      const row = document.getElementById('testimonial-row-2');
      if (row) row.style.animationPlayState = 'running';
    };
    
    // Añadir event listeners
    const row1 = document.getElementById('testimonial-row-1');
    const row2 = document.getElementById('testimonial-row-2');
    
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
  }, []);

  const allTestimonials = [
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
      id: 5,
      name: "Sofía Chen",
      project: "Nido de Agua",
      videoThumbnail: "https://images.unsplash.com/photo-1560472354-ca5be50bd4e0?w=400&h=225&fit=crop",
      isVideo: true,
      duration: "2:15"
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
    },
    {
      id: 10,
      name: "Andrés Moreno",
      project: "Indie Universe",
      videoThumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=225&fit=crop",
      isVideo: true,
      duration: "1:45"
    },
    {
      id: 11,
      name: "Laura Jiménez",
      project: "Nido de Agua",
      content: "La mejor decisión fue empezar con poco. Ahora mis $1.3M mensuales se convirtieron en un portafolio sólido que crece cada mes.",
      isVideo: false
    },
    {
      id: 12,
      name: "Fernando Castro",
      project: "Aldea",
      content: "Perfecta para complementar mi jubilación. Los dividendos llegan puntual cada trimestre y puedo reinvertir fácilmente.",
      isVideo: false
    }
  ];

  // Duplicate testimonials for seamless infinite scroll
  const row1Testimonials = [...allTestimonials, ...allTestimonials];
  const row2Testimonials = [...allTestimonials.slice(6), ...allTestimonials.slice(0, 6), ...allTestimonials.slice(6), ...allTestimonials.slice(0, 6)];

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
          <div id="testimonial-row-1" className="flex gap-4 animate-scroll-right">
            {row1Testimonials.map((testimonial, index) => (
              <div key={`${testimonial.id}-${index}`}>
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Scrolling Left */}
        <div className="relative">
          <div id="testimonial-row-2" className="flex gap-4 animate-scroll-left">
            {row2Testimonials.map((testimonial, index) => (
              <div key={`${testimonial.id}-${index}`}>
                <TestimonialCard testimonial={testimonial} />
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

function TestimonialCard({ testimonial }: { testimonial: any }) {
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
        {/* Video thumbnail fills the entire card without Card wrapper */}
        <div className="relative w-full h-full bg-black rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
          <img 
            src={testimonial.videoThumbnail} 
            alt={`Video de ${testimonial.name}`}
            className="w-full h-full object-cover rounded-xl"
          />
          
          {/* Play Button Overlay - Centered */}
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-xl">
            <div className="bg-white/95 rounded-full p-4 group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-lg">
              <Play className="h-8 w-8 text-[#5352F6] ml-1" fill="currentColor" />
            </div>
          </div>
          
          {/* Duration Badge - Top Right */}
          {testimonial.duration && (
            <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {testimonial.duration}
            </div>
          )}
          
          {/* Profile info overlay - Bottom with gradient */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 pt-16 rounded-b-xl">
            <div className="flex items-center gap-3">
              <Avatar className={`h-10 w-10 border-2 border-white/20 ${getAvatarColor(testimonial.name)}`}>
                <AvatarFallback className="text-white font-medium">
                  {getInitials(testimonial.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-bold text-sm text-white">{testimonial.name}</div>
                <div className="text-xs text-white/80">{testimonial.project}</div>
              </div>
            </div>
          </div>
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
