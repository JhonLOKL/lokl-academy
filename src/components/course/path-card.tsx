"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, ChevronDown, ChevronUp } from "lucide-react";
import { LearningPath, UserProgress } from "@/lib/course/schema";
import { useAuthStore } from "@/store/auth-store";
import {
  canUserViewCourse,
  calculatePrincingForUser,
  getCourseAccessLabel,
  getAccessBadgeClasses,
  getAccessRestrictionMessage,
  type UserPlanType,
} from "@/helpers/course-access";

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

  const { user } = useAuthStore();
  const userPlan: UserPlanType = (user?.plan as UserPlanType) || 'none';
  const isInvestor = !!user?.isInvestor || userPlan === 'investor';
  const userContext = { plan: userPlan, isInvestor };

  const princing = path.princing;
  const princingResult = calculatePrincingForUser(userContext, princing);
  const finalPrice = princingResult.price;

  // Lógica de acceso basada en el usuario
  const userHasAccess = canUserViewCourse(userContext, path.accessRequirements);

  // Verificar si la ruta es exclusiva
  const isExclusive = path.accessRequirements.requiresInvestor ||
    (path.accessRequirements.allowedPlans &&
      path.accessRequirements.allowedPlans.length > 0 &&
      !path.accessRequirements.allowedPlans.includes('any'));

  const accessLabel = getCourseAccessLabel(userContext, princing, path.accessRequirements);
  const badgeClasses = getAccessBadgeClasses(accessLabel.variant);

  // Calcular el progreso si está disponible
  const progressPercentage = userProgress ? userProgress.overallProgress : 0;
  const completedCourses = userProgress ?
    path.courses.filter(c => userProgress.moduleProgress.some(m => m.moduleId === c.courseId && m.progress === 100)).length :
    0;
  const totalCourses = path.courses.length;

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
      {isExclusive && (
        <div className="absolute right-0 top-0 z-10 bg-[#5352F6] px-2 py-1 text-xs font-medium text-white">
          Exclusivo
        </div>
      )}

      {/* Imagen de la ruta */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={path.thumbnail.url}
          alt={path.thumbnail.alt}
          fill
          className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {princing.type !== "free" && (
          <div className="absolute bottom-0 left-0 bg-black/70 px-3 py-1 text-sm font-medium text-white">
            {princing.type === "premium" ? "Premium" : "Exclusivo"}
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
                  <div className={`mr-3 flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${isCompleted
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

        {/* Etiqueta de acceso */}
        {variant !== "compact" && (
          <div className="mt-auto pt-2">
            {!princingResult.isFree ? (
              <div className="flex items-center">
                <span className="mr-2 text-sm font-medium text-[#5352F6]">
                  {finalPrice ? `$${finalPrice.toLocaleString('es-CO')}` : '$0'}
                </span>
                {princing.originalPrice != null && princing.originalPrice > finalPrice && (
                  <span className="text-xs line-through text-[#6D6C6C]">
                    {`$${princing.originalPrice.toLocaleString('es-CO')}`}
                  </span>
                )}
              </div>
            ) : (
              <span className={`rounded-full px-2.5 py-0.5 text-sm font-medium ${badgeClasses}`}>
                {accessLabel.label}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PathCard;
