"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ExternalTool } from "@/lib/course/schema";

interface ToolCardProps {
  tool: ExternalTool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  // Obtener etiqueta según la categoría
  const getCategoryLabel = (category: string): string => {
    switch (category) {
      case "simulator":
        return "Simulador";
      case "calculator":
        return "Calculadora";
      case "comparator":
        return "Comparador";
      case "analyzer":
        return "Analizador";
      default:
        return category;
    }
  };

  // Obtener color según la categoría
  const getCategoryColor = (category: string): string => {
    switch (category) {
      case "simulator":
        return "bg-blue-100 text-blue-700";
      case "calculator":
        return "bg-green-100 text-green-700";
      case "comparator":
        return "bg-purple-100 text-purple-700";
      case "analyzer":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Link 
      href={tool.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-lg border border-[#E5E5E5] bg-white shadow-sm transition-all hover:border-[#5352F6] hover:shadow-md"
    >
      {/* Imagen de la herramienta */}
      <div className="relative h-48 w-full">
        <Image
          src={tool.thumbnail.url}
          alt={tool.thumbnail.alt}
          fill
          className="object-cover grayscale"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute bottom-0 left-0 bg-black/70 px-2 py-1">
          <span className={`rounded-sm px-2 py-0.5 text-xs font-medium ${getCategoryColor(tool.category)}`}>
            {getCategoryLabel(tool.category)}
          </span>
        </div>
        
        {/* Etiqueta premium si aplica */}
        {tool.isPremium && (
          <div className="absolute right-0 top-0 bg-[#5352F6] px-2 py-1 text-xs font-medium text-white">
            Premium
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-1 flex-col p-4">
        {/* Título */}
        <h3 className="mb-2 flex items-center text-lg font-bold tracking-tight group-hover:text-[#5352F6]">
          {tool.name}
          <ExternalLink size={16} className="ml-2" />
        </h3>

        {/* Descripción */}
        <p className="mb-4 line-clamp-2 text-sm text-[#6D6C6C]">
          {tool.description}
        </p>

        {/* Estadísticas */}
        <div className="mt-auto grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-md bg-[#F5F5F5] p-2">
            <p className="font-medium text-[#0F0F0F]">{tool.stats.totalClicks}</p>
            <p className="text-[#6D6C6C]">Visitas</p>
          </div>
          <div className="rounded-md bg-[#F5F5F5] p-2">
            <p className="font-medium text-[#0F0F0F]">{tool.stats.averageTimeSpent} min</p>
            <p className="text-[#6D6C6C]">Tiempo medio</p>
          </div>
          <div className="rounded-md bg-[#F5F5F5] p-2">
            <p className="font-medium text-[#0F0F0F]">{tool.stats.userRating.toFixed(1)}/5</p>
            <p className="text-[#6D6C6C]">Valoración</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ToolCard;
