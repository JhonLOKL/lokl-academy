"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, ExternalLink, Star } from "lucide-react";
import { Tool } from "@/lib/course/schema";

interface ToolsSectionProps {
  tools: Tool[];
}

const ToolsSection: React.FC<ToolsSectionProps> = ({ tools }) => {
  return (
    <section className="bg-[#F9F9F9] py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Herramientas <span className="text-[#5352F6]">prácticas</span>
          </h2>
          <p className="mx-auto max-w-2xl text-[#6D6C6C]">
            Potencia tus decisiones de inversión con nuestras herramientas exclusivas
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          {tools.map((tool) => (
            <div key={tool.id} className="group relative">
              <Link 
                href={tool.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
                aria-label={`Herramienta ${tool.name}`}
              >
                {/* Imagen con overlay */}
                <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={tool.thumbnail.url}
                    alt={tool.thumbnail.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-75"></div>
                  
                  {/* Badge de categoría */}
                  <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-[#0F0F0F]">
                    {tool.category === 'simulator' ? 'Simulador' : 
                     tool.category === 'calculator' ? 'Calculadora' : 
                     tool.category === 'comparator' ? 'Comparador' : 'Herramienta'}
                  </div>
                  
                  {/* Badge premium */}
                  {tool.isPremium && (
                    <div className="absolute right-4 top-4 rounded-full bg-[#5352F6]/90 px-3 py-1 text-sm font-medium text-white">
                      Premium
                    </div>
                  )}
                </div>
                
                {/* Contenido */}
                <div>
                  <h3 className="mb-2 flex items-center text-xl font-bold tracking-tight transition-colors group-hover:text-[#5352F6]">
                    {tool.name}
                    <ExternalLink size={16} className="ml-2 opacity-50 transition-opacity group-hover:opacity-100" />
                  </h3>
                  <p className="mb-4 text-[#6D6C6C]">
                    {tool.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center">
                      <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#F0F0F0]">
                        <Star size={14} className="text-[#FFD447]" />
                      </div>
                      <span>{tool.stats.userRating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#F0F0F0]">
                        <Clock size={14} className="text-[#5352F6]" />
                      </div>
                      <span>{tool.stats.averageTimeSpent} min</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
