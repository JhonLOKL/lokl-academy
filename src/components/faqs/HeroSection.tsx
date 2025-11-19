"use client";

import { Search, ShieldAlert, Lock, ArrowLeftRight, Building, Gift, Laptop } from "lucide-react";
import { TagChip } from "./TagChip";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

const tags = [
  { id: "riesgos", label: "Riesgos", icon: ShieldAlert },
  { id: "seguridad", label: "Seguridad", icon: Lock },
  { id: "funcionamiento", label: "Funcionamiento", icon: Laptop },
  { id: "liquidez", label: "Liquidez", icon: ArrowLeftRight },
  { id: "beneficios", label: "Beneficios", icon: Gift },
  { id: "proyectos", label: "Proyectos", icon: Building },
];

interface HeroSectionProps {
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function HeroSection({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
}: HeroSectionProps) {
  const handleTagClick = (tagId: string) => {
    // Si ya está activo, lo desactivamos; si no, lo activamos
    setActiveCategory(activeCategory === tagId ? null : tagId);
    
    // Desplazar suavemente hasta la sección de preguntas
    setTimeout(() => {
      const faqSection = document.getElementById("faq-section");
      if (faqSection) {
        faqSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* Imagen para móvil */}
        <ImageWithFallback
          src="https://lokl-academy.s3.us-east-1.amazonaws.com/blog-cover/movil-faqs.png"
          alt="Preguntas frecuentes sobre invertir con LOKL"
          className="w-full h-full object-cover md:hidden"
          width={800}
          height={1200}
        />
        {/* Imagen para desktop */}
        <ImageWithFallback
          src="https://lokl-academy.s3.us-east-1.amazonaws.com/blog-cover/faqs.png"
          alt="Preguntas frecuentes sobre invertir con LOKL"
          className="hidden md:block w-full h-full object-cover"
          width={1600}
          height={1080}
        />
        {/* Overlay sutil para mejor contraste */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-[1200px] mx-auto px-6 md:px-12 lg:px-0 lg:ml-[120px] lg:mr-[120px]">
        <div className="flex flex-col justify-center h-full py-12 md:py-16 max-w-[1200px]">
          {/* H1 */}
          <h1 className="text-white mb-4 md:mb-6 text-left text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
            Preguntas frecuentes sobre<br />invertir con LOKL
          </h1>

          {/* Description */}
          <p className="text-white/90 mb-8 max-w-[640px] text-left">
            Resolvemos tus dudas sobre riesgos, retornos, seguridad y
            funcionamiento de la plataforma.
          </p>

          {/* Search Bar */}
          <div className="mb-6 max-w-full md:max-w-[600px]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Busca por palabra clave (riesgo, pagos, salida…)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 max-w-fit">
            {tags.map((tag) => (
              <TagChip
                key={tag.id}
                icon={tag.icon}
                label={tag.label}
                active={activeCategory === tag.id}
                onClick={() => handleTagClick(tag.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
