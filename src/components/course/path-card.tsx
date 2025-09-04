"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, ChevronDown, ChevronUp } from "lucide-react";
import { LearningPath, UserProgress } from "@/lib/course/schema";

interface PathCardProps {
  path: LearningPath;
  userProgress?: UserProgress;
  variant?: "default" | "detailed" | "compact";
}

const PathCard: React.FC<PathCardProps> = ({
  path,
  userProgress,
  variant = "default",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Calcular el progreso si está disponible
  const progressPercentage = userProgress ? userProgress.overallProgress : 0;
  const completedCourses = userProgress ? 
    path.courses.filter(c => userProgress.moduleProgress.some(m => m.moduleId === c.courseId && m.progress === 100)).length : 
    0;
  const totalCourses = path.courses.length;
  
  // Verificar si la ruta es exclusiva para inversionistas
  const isInvestorExclusive = path.accessRequirements.plan === "investor";
  
  // Formatear la duración
  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) return `${mins} min`;
    if (mins === 0) return `${hours} h`;
    return `${hours} h ${mins} min`;
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-[#E5E5E5] bg-white shadow-sm transition-all hover:shadow-md">
      {/* Etiqueta para rutas exclusivas */}
      {isInvestorExclusive && (
        <div className="absolute right-0 top-0 z-10 bg-[#5352F6] px-2 py-1 text-xs font-medium text-white">
          Exclusivo
        </div>
      )}
      
      {/* Imagen de la ruta */}
      <div className="relative h-48">
        <Image
          src={path.thumbnail.url}
          alt={path.thumbnail.alt}
          fill
          className="object-cover grayscale"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {path.pricing.type !== "free" && (
          <div className="absolute bottom-0 left-0 bg-black/70 px-3 py-1 text-sm font-medium text-white">
            {path.pricing.type === "premium" ? "Premium" : "Exclusivo"}
          </div>
        )}
      </div>

      {/* Contenido de la ruta */}
      <div className="flex flex-col p-4">
        {/* Categoría y duración */}
        <div className="mb-2 flex items-center justify-between">
          <Badge variant="outline" className="bg-[#F5F5F5] text-xs font-medium text-[#5352F6]">
            {path.category.name}
          </Badge>
          <div className="flex items-center text-xs text-[#6D6C6C]">
            <Clock size={14} className="mr-1" />
            {path.structure.estimatedCompletionTime}
          </div>
        </div>

        {/* Título de la ruta */}
        <Link href={`/learning-path/${path.slug}`} className="group-hover:text-[#5352F6]">
          <h3 className="mb-2 line-clamp-2 text-lg font-bold tracking-tight">
            {path.title}
          </h3>
        </Link>

        {/* Descripción corta */}
        {variant !== "compact" && (
          <p className="mb-3 line-clamp-2 text-sm text-[#6D6C6C]">
            {path.excerpt}
          </p>
        )}

        {/* Estadísticas */}
        <div className="mb-3 flex items-center space-x-4 text-xs text-[#6D6C6C]">
          <div className="flex items-center">
            {totalCourses} cursos
          </div>
          <div className="flex items-center">
            {path.structure.totalLessons} lecciones
          </div>
          <div className="flex items-center">
            {formatDuration(path.structure.totalDuration)}
          </div>
        </div>

        {/* Barra de progreso */}
        {userProgress && (
          <div className="mb-3">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-medium">{progressPercentage}% completado</span>
              <span>{completedCourses}/{totalCourses} cursos</span>
            </div>
            <Progress value={progressPercentage} className="h-1.5" />
          </div>
        )}

        {/* Botón para expandir/colapsar la lista de cursos */}
        {variant === "detailed" && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="mb-2 flex items-center justify-center rounded-md border border-[#E5E5E5] bg-[#F5F5F5] px-4 py-2 text-sm font-medium text-[#0F0F0F] transition-colors hover:bg-[#EEEEFE] hover:text-[#5352F6]"
          >
            {isExpanded ? (
              <>
                <ChevronUp size={16} className="mr-1" />
                Ocultar cursos
              </>
            ) : (
              <>
                <ChevronDown size={16} className="mr-1" />
                Ver cursos ({totalCourses})
              </>
            )}
          </button>
        )}

        {/* Lista de cursos (expandible) */}
        {variant === "detailed" && isExpanded && (
          <div className="mt-2 space-y-3 rounded-md border border-[#E5E5E5] bg-[#F9F9F9] p-3">
            {path.courses.map((courseItem, index) => {
              const courseProgress = userProgress?.moduleProgress.find(m => m.moduleId === courseItem.courseId);
              const isCompleted = courseProgress?.progress === 100;
              const isInProgress = courseProgress && courseProgress.progress > 0 && courseProgress.progress < 100;
              
              return (
                <div key={courseItem.courseId} className="flex items-center rounded-md bg-white p-2">
                  <div className={`mr-3 flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                    isCompleted 
                      ? "bg-green-100 text-green-700" 
                      : isInProgress 
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{courseItem.course?.title || `Curso ${index + 1}`}</p>
                    {courseProgress && (
                      <Progress value={courseProgress.progress} className="mt-1 h-1" />
                    )}
                  </div>
                  <div className="ml-2 text-xs text-[#6D6C6C]">
                    {isCompleted 
                      ? "Completado" 
                      : isInProgress 
                        ? `${courseProgress.progress}%` 
                        : "No iniciado"}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Etiqueta de precio o gratuito */}
        {variant !== "compact" && (
          <div className="mt-auto pt-2">
            {path.pricing.type === "free" ? (
              <span className="text-sm font-medium text-green-600">Gratis</span>
            ) : (
              <div className="flex items-center">
                {path.pricing.individualCoursesPrice ? (
                  <>
                    <span className="mr-2 text-sm font-medium text-[#5352F6]">
                      {path.pricing.price ? `$${path.pricing.price.toLocaleString('es-CO')}` : '$0'}
                    </span>
                    <span className="text-xs line-through text-[#6D6C6C]">
                      {path.pricing.individualCoursesPrice ? `$${path.pricing.individualCoursesPrice.toLocaleString('es-CO')}` : '$0'}
                    </span>
                    {path.pricing.savings && (
                      <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                        Ahorra {`$${path.pricing.savings.toLocaleString('es-CO')}`}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-sm font-medium text-[#5352F6]">
                    {path.pricing.price ? `$${path.pricing.price.toLocaleString('es-CO')}` : '$0'}
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PathCard;
