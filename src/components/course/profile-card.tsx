"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, ChevronDown, ChevronUp } from "lucide-react";
import { LearningProfile } from "@/lib/course/schema";

interface ProfileCardProps {
  profile: LearningProfile;
  userProgress?: {
    completedCourses: number;
    totalCourses: number;
    overallProgress: number;
  };
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  userProgress,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Calcular el progreso
  const progressPercentage = userProgress?.overallProgress || 0;
  const completedCourses = userProgress?.completedCourses || 0;
  const totalCourses = profile.aggregatedStats.totalCourses;
  
  // Obtener el nivel en español
  const getLevelInSpanish = (level: string): string => {
    switch (level) {
      case "explorer": return "Explorador";
      case "adventurer": return "Aventurero";
      case "hero": return "Héroe";
      default: return level;
    }
  };
  
  // Formatear la duración
  const formatDuration = (hours: number): string => {
    if (hours < 1) return "Menos de 1 hora";
    return `${hours} ${hours === 1 ? 'hora' : 'horas'}`;
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-[#E5E5E5] bg-white shadow-sm transition-all hover:shadow-md">
      <div className="relative h-48">
        <Image
          src={profile.thumbnail.url}
          alt={profile.thumbnail.alt}
          fill
          className="object-cover grayscale"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />
        
        {/* Badge de nivel */}
        <div className="absolute bottom-4 left-4">
          <Badge className="bg-[#5352F6] px-3 py-1 text-sm font-medium text-white">
            Nivel: {getLevelInSpanish(profile.level)}
          </Badge>
        </div>
        
        {/* Badge con imagen si existe */}
        {profile.badge && (
          <div className="absolute bottom-4 right-4 h-12 w-12 overflow-hidden rounded-full border-2 border-white bg-white">
            <Image
              src={profile.badge.url}
              alt={profile.badge.alt}
              fill
              className="object-contain"
            />
          </div>
        )}
      </div>

      {/* Contenido del perfil */}
      <div className="flex flex-col p-4">
        {/* Título del perfil */}
        <Link href={`/learning-profile/${profile.slug}`} className="group-hover:text-[#5352F6]">
          <h3 className="mb-2 text-xl font-bold tracking-tight">
            {profile.title}
          </h3>
        </Link>

        {/* Descripción */}
        <p className="mb-4 text-sm text-[#6D6C6C]">
          {profile.description}
        </p>

        {/* Estadísticas */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="rounded-md bg-[#F5F5F5] p-3">
            <p className="text-xs text-[#6D6C6C]">Cursos totales</p>
            <p className="text-lg font-bold text-[#0F0F0F]">{totalCourses}</p>
          </div>
          <div className="rounded-md bg-[#F5F5F5] p-3">
            <p className="text-xs text-[#6D6C6C]">Duración estimada</p>
            <p className="text-lg font-bold text-[#0F0F0F]">
              {profile.aggregatedStats.estimatedCompletionTime}
            </p>
          </div>
        </div>

        {/* Barra de progreso */}
        {userProgress && (
          <div className="mb-4">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-medium">{progressPercentage}% completado</span>
              <span>{completedCourses}/{totalCourses} cursos</span>
            </div>
            <Progress value={progressPercentage} className="h-1.5" />
          </div>
        )}

        {/* Beneficios */}
        <div className="mb-4">
          <h4 className="mb-2 text-sm font-semibold">Beneficios:</h4>
          <ul className="space-y-1 text-sm text-[#6D6C6C]">
            {profile.benefits.slice(0, 3).map((benefit, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 text-[#5352F6]">•</span>
                {benefit}
              </li>
            ))}
            {profile.benefits.length > 3 && !isExpanded && (
              <li className="text-xs text-[#5352F6]">+ {profile.benefits.length - 3} más</li>
            )}
            {isExpanded && profile.benefits.slice(3).map((benefit, index) => (
              <li key={index + 3} className="flex items-start">
                <span className="mr-2 text-[#5352F6]">•</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {/* Botón para expandir/colapsar rutas */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="mb-2 flex items-center justify-center rounded-md border border-[#E5E5E5] bg-[#F5F5F5] px-4 py-2 text-sm font-medium text-[#0F0F0F] transition-colors hover:bg-[#EEEEFE] hover:text-[#5352F6]"
        >
          {isExpanded ? (
            <>
              <ChevronUp size={16} className="mr-1" />
              Ocultar rutas
            </>
          ) : (
            <>
              <ChevronDown size={16} className="mr-1" />
              Ver rutas ({profile.paths.length})
            </>
          )}
        </button>

        {/* Lista de rutas (expandible) */}
        {isExpanded && (
          <div className="mt-2 space-y-3 rounded-md border border-[#E5E5E5] bg-[#F9F9F9] p-3">
            {profile.paths.map((pathItem, index) => (
              <div key={pathItem.pathId} className="flex items-center rounded-md bg-white p-2">
                <div className={`mr-3 flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                  pathItem.isCore 
                    ? "bg-[#EEEEFE] text-[#5352F6]" 
                    : "bg-gray-100 text-gray-700"
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {pathItem.path?.title || `Ruta ${index + 1}`}
                    {pathItem.isCore && (
                      <Badge variant="outline" className="ml-2 border-[#5352F6] text-xs text-[#5352F6]">
                        Esencial
                      </Badge>
                    )}
                  </p>
                  <p className="text-xs text-[#6D6C6C]">{pathItem.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Botón de acción */}
        <Link href={`/learning-profile/${profile.slug}`} className="mt-4">
          <button className="w-full rounded-md bg-[#5352F6] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90">
            Explorar perfil
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
