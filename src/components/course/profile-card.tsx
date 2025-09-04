"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/design-system";
import { Clock, ChevronDown, ChevronUp, BookOpen, Award, Users } from "lucide-react";
import { LearningProfile } from "@/lib/course/schema";
import { cn } from "@/lib/utils";

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
  
  // Formatear la duración (función disponible para uso futuro)
  // const formatDuration = (hours: number): string => {
  //   if (hours < 1) return "Menos de 1 hora";
  //   return `${hours} ${hours === 1 ? 'hora' : 'horas'}`;
  // };

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border-2 border-[#E5E5E5] bg-white shadow-sm transition-all hover:shadow-lg hover:border-[#5352F6]/30">
      <div className="relative h-52">
        <Image
            /*       src={`/images/profiles/${profile.level}.${profile.level === 'hero' ? 'jpg' : 'png'}`} */
          src={
            profile.level === 'explorer' 
              ? 'https://media.istockphoto.com/id/2194197289/photo/portrait-of-a-mid-adult-male-hiker.jpg?s=1024x1024&w=is&k=20&c=NmWmyTEFvdk4wfbZ42-tZ-CT3eJvqsdNmkRnRYhLnOc=' 
              : profile.level === 'adventurer' 
              ? 'https://media.istockphoto.com/id/2164477556/photo/low-angle-view-of-woman-climbing-on-cliff.jpg?s=2048x2048&w=is&k=20&c=IN1bZyeoGxyJLtDDBwIF-wdW8u-uxRhXjNLQF3GAzU4=' 
              : 'https://media.istockphoto.com/id/2148292077/photo/woman-exploring-ice-cave.jpg?s=2048x2048&w=is&k=20&c=_3xQGeaw2QVJ-nV_XTReVdPZMz5cnuKrdxjIIiAMAy0='
          }
          alt={profile.title}
          fill
          className="object-cover grayscale"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
        
        {/* Overlay con patrón de puntos */}
        <div className="absolute inset-0 bg-[url('/images/dot-pattern.png')] opacity-10"></div>
        
        {/* Badge de nivel */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 p-1.5">
            <Award className={cn(
              "h-5 w-5",
              profile.level === "explorer" ? "text-blue-500" : 
              profile.level === "adventurer" ? "text-orange-500" : 
              "text-[#5352F6]"
            )} />
          </div>
          <Badge className="bg-white/90 px-3 py-1 text-sm font-medium text-[#0F0F0F]">
            {getLevelInSpanish(profile.level)}
          </Badge>
        </div>
        
        {/* Badge con imagen si existe */}
        {profile.badge && (
          <div className="absolute bottom-0 right-8 h-16 w-16 translate-y-1/2 overflow-hidden rounded-full border-4 border-white bg-white shadow-md">
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
      <div className="flex flex-1 flex-col p-6 pt-8">
        {/* Título del perfil */}
        <Link href={`/learning-profile/${profile.slug}`} className="group-hover:text-[#5352F6]">
          <h3 className="mb-2 text-2xl font-bold tracking-tight">
            {profile.title}
          </h3>
        </Link>

        {/* Descripción */}
        <p className="mb-5 text-sm text-[#6D6C6C] line-clamp-2">
          {profile.description}
        </p>

        {/* Estadísticas */}
        <div className="mb-5 grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center rounded-md bg-[#F9F9F9] p-3 transition-colors group-hover:bg-[#EEEEFE]">
            <BookOpen className="mb-1 h-5 w-5 text-[#5352F6]" />
            <p className="text-lg font-bold text-[#0F0F0F]">{totalCourses}</p>
            <p className="text-xs text-[#6D6C6C]">Cursos</p>
          </div>
          <div className="flex flex-col items-center rounded-md bg-[#F9F9F9] p-3 transition-colors group-hover:bg-[#EEEEFE]">
            <Clock className="mb-1 h-5 w-5 text-[#5352F6]" />
            <p className="text-lg font-bold text-[#0F0F0F]">
              {profile.paths.length}
            </p>
            <p className="text-xs text-[#6D6C6C]">Rutas</p>
          </div>
          <div className="flex flex-col items-center rounded-md bg-[#F9F9F9] p-3 transition-colors group-hover:bg-[#EEEEFE]">
            <Users className="mb-1 h-5 w-5 text-[#5352F6]" />
            <p className="text-lg font-bold text-[#0F0F0F]">
              {profile.aggregatedStats.totalEnrolled || 0}
            </p>
            <p className="text-xs text-[#6D6C6C]">Alumnos</p>
          </div>
        </div>
        
        {/* Duración estimada */}
        <div className="mb-4 flex items-center gap-2 rounded-md border border-dashed border-[#E5E5E5] bg-[#FAFAFA] px-3 py-2">
          <Clock className="h-4 w-4 text-[#5352F6]" />
          <span className="text-sm">
            Duración estimada: <span className="font-medium">{profile.aggregatedStats.estimatedCompletionTime}</span>
          </span>
        </div>

        {/* Barra de progreso */}
        {userProgress && (
          <div className="mb-5 rounded-md border border-[#E5E5E5] bg-white p-3">
            <div className="mb-2 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-[#5352F6]"></div>
                <span className="font-medium">{progressPercentage}% completado</span>
              </div>
              <span>{completedCourses}/{totalCourses} cursos</span>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-[#F0F0F0]" />
          </div>
        )}

        {/* Beneficios */}
        <div className="mb-5">
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <div className="h-1 w-5 rounded-full bg-[#5352F6]"></div>
            Lo que aprenderás
          </h4>
          <ul className="space-y-2 text-sm text-[#6D6C6C]">
            {profile.benefits.slice(0, 3).map((benefit, index) => (
              <li key={index} className="flex items-start rounded-md bg-[#F9F9F9] p-2 transition-all hover:bg-[#EEEEFE]">
                <div className="mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5352F6]/10 text-xs font-medium text-[#5352F6]">
                  {index + 1}
                </div>
                <span className="text-[#444444]">{benefit}</span>
              </li>
            ))}
            {profile.benefits.length > 3 && !isExpanded && (
              <li className="flex cursor-pointer items-center justify-center rounded-md border border-dashed border-[#E5E5E5] p-2 text-xs text-[#5352F6] hover:bg-[#F9F9F9]" onClick={() => setIsExpanded(true)}>
                + {profile.benefits.length - 3} beneficios más
              </li>
            )}
            {isExpanded && profile.benefits.slice(3).map((benefit, index) => (
              <li key={index + 3} className="flex items-start rounded-md bg-[#F9F9F9] p-2 transition-all hover:bg-[#EEEEFE]">
                <div className="mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5352F6]/10 text-xs font-medium text-[#5352F6]">
                  {index + 4}
                </div>
                <span className="text-[#444444]">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Espacio flexible para empujar los botones al fondo */}
        <div className="flex-grow"></div>
        
        {/* Contenedor de botones en la parte inferior */}
        <div className="mt-auto space-y-4">
          {/* Botón para expandir/colapsar rutas */}
          {profile.paths.length > 0 && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex w-full items-center justify-center rounded-md border border-[#E5E5E5] bg-[#F9F9F9] px-4 py-2.5 text-sm font-medium text-[#0F0F0F] transition-colors hover:bg-[#EEEEFE] hover:text-[#5352F6] hover:border-[#5352F6]/30"
            >
              {isExpanded ? (
                <>
                  <ChevronUp size={16} className="mr-2" />
                  Ocultar rutas de aprendizaje
                </>
              ) : (
                <>
                  <ChevronDown size={16} className="mr-2" />
                  Ver rutas de aprendizaje ({profile.paths.length})
                </>
              )}
            </button>
          )}

        {/* Lista de rutas (expandible) */}
        {isExpanded && (
          <div className="mb-5 space-y-3 rounded-md border border-[#E5E5E5] bg-[#FAFAFA] p-4">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <div className="h-1 w-5 rounded-full bg-[#5352F6]"></div>
              Rutas de aprendizaje incluidas
            </h4>
            {profile.paths.map((pathItem, index) => (
              <div key={pathItem.pathId} className="group/path flex items-start overflow-hidden rounded-md border border-[#E5E5E5] bg-white p-3 transition-all hover:border-[#5352F6]/30 hover:shadow-sm">
                <div className={`mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                  pathItem.isCore 
                    ? "bg-[#EEEEFE] text-[#5352F6]" 
                    : "bg-gray-100 text-gray-700"
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center flex-wrap gap-2">
                    <p className="text-sm font-medium group-hover/path:text-[#5352F6]">
                      {pathItem.path?.title || `Ruta ${index + 1}`}
                    </p>
                    {pathItem.isCore && (
                      <Badge variant="outline" className="border-[#5352F6] text-xs text-[#5352F6]">
                        Esencial
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-[#6D6C6C]">{pathItem.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

          {/* Botón de acción */}
          <Link href={`/learning-profile/${profile.slug}`}>
            <Button className="w-full py-2.5">
              Explorar perfil completo
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
