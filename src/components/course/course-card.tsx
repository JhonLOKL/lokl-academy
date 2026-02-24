"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star, Lock } from "lucide-react";
import { Course, UserProgress } from "@/lib/course/schema";
import { useAuthStore } from "@/store/auth-store";
import {
  hasAccessToCourse,
  getCourseAccessLabel,
  getAccessBadgeClasses,
  getAccessRestrictionMessage,
  type UserPlanType,
} from "@/helpers/course-access";

interface CourseCardProps {
  course: Course;
  variant?: "default" | "compact" | "featured" | "horizontal";
  showProgress?: boolean;
  progress?: UserProgress;
  showInstructor?: boolean;
  showStats?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  variant = "default",
  showProgress = false,
  progress,
  showInstructor = true,
  showStats = true,
}) => {
  const { user } = useAuthStore();

  // Guard clause: si no hay curso, no renderizar nada para evitar errores
  if (!course) return null;

  const userPlan: UserPlanType = (user?.planType as UserPlanType) || "basic";

  // Lógica de acceso basada en el plan del usuario
  const requiredPlan = course.accessRequirements?.plan || "any";
  const userHasAccess = hasAccessToCourse(userPlan, requiredPlan);
  const isLoggedIn = !!user;

  // =================================================================================
  // NORMALIZACIÓN ROBUSTA DE PRICING (V2)
  // =================================================================================
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawObj = course as any;
  // Intentar leer de todas las fuentes posibles, priorizando pricing corregido
  const pricingObj = course.pricing || rawObj.princing;
  
  const pricingType = pricingObj?.type || "free";
  
  // Limpieza de precio - Conversión explícita a número y validación
  let finalPrice: number | undefined = undefined;
  if (pricingObj?.price !== undefined && pricingObj?.price !== null) {
      const p = Number(pricingObj.price);
      // Solo consideramos precio válido si es número y mayor a 0
      if (!isNaN(p) && p > 0) {
          finalPrice = p;
      }
  }
  // =================================================================================

  // Solo bloquear si el usuario ESTÁ logueado y NO tiene acceso
  const isLocked = isLoggedIn && !userHasAccess;

  // Obtener etiqueta de pricing usando los datos limpios
  const accessLabel = getCourseAccessLabel({
    pricingType: pricingType,
    price: finalPrice,
    accessPlan: requiredPlan,
  });
  
  const badgeClasses = getAccessBadgeClasses(accessLabel.variant);

  // Formatear la duración
  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) return `${mins} min`;
    if (mins === 0) return `${hours} h`;
    return `${hours} h ${mins} min`;
  };

  // Formatear precio
  const formatPrice = (price: number, currency?: string): string => {
    const curr = currency || "COP";
    return `$${price.toLocaleString("es-CO")}${curr !== "COP" ? ` ${curr}` : ""}`;
  };

  const cardContent = (
    <div
      className={`
        group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all
        ${isLocked ? "border-gray-300 opacity-75" : "border-[#E5E5E5] hover:shadow-md"}
        ${variant === "horizontal" ? "flex flex-col md:flex-row" : "flex flex-col"}
        ${variant === "compact" ? "max-w-xs" : ""}
        ${variant === "featured" ? "border-[#5352F6]" : ""}
      `}
    >
      {/* Overlay de bloqueo */}
      {isLocked && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/5 backdrop-blur-[1px]">
          <div className="rounded-lg bg-white/95 border border-gray-200 p-4 mx-4 text-center shadow-lg max-w-[260px]">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <Lock size={20} className="text-gray-500" />
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              {getAccessRestrictionMessage(requiredPlan)}
            </p>
          </div>
        </div>
      )}

      {/* Badge de pricing/plan (esquina superior izquierda) */}
      <div className="absolute left-0 top-0 z-10 flex flex-col gap-1">
        {/* Si el progreso está disponible, mostrar completado */}
        {(course.progress?.overallProgress === 100 || (progress && progress.overallProgress === 100)) && (
          <span className="bg-green-600 px-2 py-1 text-xs font-medium text-white">
            Completado
          </span>
        )}
        
        {/* Badge de Plan Requerido (Solo si es Premium/Investor) */}
        {pricingType === 'premium' && (
          <span className="bg-amber-500 px-2 py-1 text-xs font-medium text-white">
            Plan Premium
          </span>
        )}
        
        {pricingType === 'investor' && (
          <span className="bg-[#5352F6] px-2 py-1 text-xs font-medium text-white">
            Plan Inversionista
          </span>
        )}
      </div>

      {/* Lock icon */}
      {isLocked && (
        <div className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60">
          <Lock size={14} className="text-white" />
        </div>
      )}

      {/* Imagen del curso */}
      <div
        className={`relative overflow-hidden ${
          variant === "horizontal" ? "h-48 md:h-auto md:w-2/5" : "h-48"
        }`}
      >
        <Image
          src={course.thumbnail?.url || '/images/course/placeholder.jpg'}
          alt={course.thumbnail?.alt || course.title}
          fill
          className={`object-cover transition-all duration-500 ${
            isLocked
              ? "grayscale"
              : "grayscale group-hover:grayscale-0 group-hover:scale-110"
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Contenido del curso */}
      <div
        className={`flex flex-1 flex-col p-4 ${
          variant === "horizontal" ? "md:p-6" : ""
        }`}
      >
        {/* Categoría y duración */}
        <div className="mb-2 flex items-center justify-between">
          <Badge
            variant="outline"
            className="bg-[#F5F5F5] text-xs font-medium text-[#5352F6]"
          >
            {course.category?.name ?? "Curso"}
          </Badge>
          {course.content?.totalDuration > 0 && (
            <div className="flex items-center text-xs text-[#6D6C6C]">
              <Clock size={14} className="mr-1" />
              {formatDuration(course.content.totalDuration)}
            </div>
          )}
        </div>

        {/* Título */}
        <Link
          href={`/course/${course.slug}`}
          className={isLocked ? "pointer-events-none" : "group-hover:text-[#5352F6]"}
        >
          <h3 className="mb-2 line-clamp-2 text-lg font-bold tracking-tight">
            {course.title}
          </h3>
        </Link>

        {/* Descripción */}
        {variant !== "compact" && (
          <p className="mb-3 line-clamp-2 text-sm text-[#6D6C6C]">
            {course.excerpt}
          </p>
        )}

        {/* Instructor */}
        {showInstructor && course.instructor && (
          <div className="mb-3 flex items-center">
            <div className="relative mr-2 h-6 w-6 overflow-hidden rounded-full">
              {course.instructor.avatar ? (
                <Image
                  src={course.instructor.avatar}
                  alt={course.instructor.name || "Instructor"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#EEEEFE] text-[10px] font-medium text-[#5352F6]">
                  {(course.instructor.name || "L").charAt(0)}
                </div>
              )}
            </div>
            <span className="text-xs text-[#444444]">
              {course.instructor.name || "Instructor LOKL"}
            </span>
          </div>
        )}

        {/* Estadísticas */}
        {showStats &&
          variant !== "compact" &&
          course.stats &&
          (course.stats.enrolledCount > 0 ||
            course.stats.averageRating > 0) && (
            <div className="mb-3 flex items-center space-x-4 text-xs text-[#6D6C6C]">
              {course.stats.enrolledCount > 0 && (
                <div className="flex items-center">
                  <Users size={14} className="mr-1" />
                  {course.stats.enrolledCount} estudiantes
                </div>
              )}
              {course.stats.averageRating > 0 && (
                <div className="flex items-center">
                  <Star size={14} className="mr-1 text-yellow-400" />
                  {course.stats.averageRating.toFixed(1)}
                </div>
              )}
            </div>
          )}

        {/* Barra de progreso */}
        {(showProgress || course.progress) && (
          <div className="mt-auto">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-medium">
                {(course.progress?.overallProgress === 100 || (progress && progress.overallProgress === 100)) ? (
                  <span className="flex items-center text-green-600">Completado</span>
                ) : (
                  `${course.progress?.overallProgress || (progress ? progress.overallProgress : 0)}% completado`
                )}
              </span>
              <span>
                {course.progress?.completedLessons || (progress ? progress.completedLessons : 0)}
                /
                {course.content.totalLessons} lecciones
              </span>
            </div>
            <Progress
              value={course.progress?.overallProgress || (progress ? progress.overallProgress : 0)}
              className={`h-1.5 ${(course.progress?.overallProgress === 100 || (progress && progress.overallProgress === 100)) ? "bg-green-100" : ""}`}
              indicatorClassName={(course.progress?.overallProgress === 100 || (progress && progress.overallProgress === 100)) ? "bg-green-600" : undefined}
            />
          </div>
        )}

        {/* Pricing y estado de acceso */}
        {!showProgress && !course.progress && (
          <div className="mt-auto pt-2">
            <div className="flex items-center justify-between">
              
              {/* IZQUIERDA: Etiqueta de Acceso (Gratis, o Mensaje de Precio) */}
              {finalPrice != null ? (
                // Si hay precio, mostrar el precio grande y claro
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(finalPrice, pricingObj?.currency)}
                  </span>
                  {/* Precio original tachado si aplica */}
                  {pricingObj?.originalPrice != null && pricingObj.originalPrice > finalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {formatPrice(pricingObj.originalPrice, pricingObj?.currency)}
                    </span>
                  )}
                </div>
              ) : (
                // Si es gratis o solo por suscripción sin precio individual
                <span className={`rounded-full px-2.5 py-0.5 text-sm font-medium ${badgeClasses}`}>
                  {accessLabel.label}
                </span>
              )}

              {/* DERECHA: Información adicional o CTA implícito */}
              {finalPrice != null && pricingType === 'premium' && (
                 <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded">
                      o Gratis con Premium
                    </span>
                 </div>
              )}
            </div>
            
            {/* Mensaje inferior contextual */}
            {pricingType === 'premium' && finalPrice == null && (
              <p className="mt-2 text-xs text-amber-600 font-medium">
                Incluido en suscripción Premium
              </p>
            )}
            
            {pricingType === 'investor' && (
              <p className="mt-2 text-xs text-[#5352F6] font-medium">
                Solo para inversionistas
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );

  if (isLocked) {
    return (
      <Link href={`/course/${course.slug}`} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default CourseCard;
