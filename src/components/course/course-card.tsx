"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star } from "lucide-react";
import { Course, UserProgress } from "@/lib/course/schema";

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
  // Calcular el progreso si está disponible
  const progressPercentage = progress ? progress.overallProgress : 0;
  const completedLessons = progress ? progress.completedLessons : 0;
  const totalLessons = course.content.totalLessons;
  const remainingLessons = totalLessons - completedLessons;

  // Verificar si el curso es exclusivo para inversionistas
  const isInvestorExclusive = course.accessRequirements.plan === "investor";

  // Formatear la duración
  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) return `${mins} min`;
    if (mins === 0) return `${hours} h`;
    return `${hours} h ${mins} min`;
  };

  return (
    <div
      className={`
        group relative overflow-hidden rounded-lg border border-[#E5E5E5] bg-white shadow-sm transition-all hover:shadow-md
        ${variant === "horizontal" ? "flex flex-col md:flex-row" : "flex flex-col"}
        ${variant === "compact" ? "max-w-xs" : ""}
        ${variant === "featured" ? "border-[#5352F6]" : ""}
      `}
    >
      {/* Etiqueta para cursos exclusivos */}
      {isInvestorExclusive && (
        <div className="absolute right-0 top-0 z-10 bg-[#5352F6] px-2 py-1 text-xs font-medium text-white">
          Inversionista
        </div>
      )}

      {/* Imagen del curso */}
      <div className={`relative ${variant === "horizontal" ? "h-48 md:h-auto md:w-2/5" : "h-48"}`}>
        <Image
          src={course.thumbnail.url}
          alt={course.thumbnail.alt}
          fill
          className="object-cover grayscale"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {course.accessRequirements.plan === "investor" && (
          <div className="absolute bottom-0 left-0 bg-black/70 px-3 py-1 text-sm font-medium text-white">
            Inversionista
          </div>
        )}
      </div>

      {/* Contenido del curso */}
      <div className={`flex flex-1 flex-col p-4 ${variant === "horizontal" ? "md:p-6" : ""}`}>
        {/* Categoría y duración */}
        <div className="mb-2 flex items-center justify-between">
          <Badge variant="outline" className="bg-[#F5F5F5] text-xs font-medium text-[#5352F6]">
            {course.category.name}
          </Badge>
          <div className="flex items-center text-xs text-[#6D6C6C]">
            <Clock size={14} className="mr-1" />
            {formatDuration(course.content.totalDuration)}
          </div>
        </div>

        {/* Título del curso */}
        <Link href={`/course/${course.slug}`} className="group-hover:text-[#5352F6]">
          <h3 className="mb-2 line-clamp-2 text-lg font-bold tracking-tight">
            {course.title}
          </h3>
        </Link>

        {/* Descripción corta */}
        {variant !== "compact" && (
          <p className="mb-3 line-clamp-2 text-sm text-[#6D6C6C]">
            {course.excerpt}
          </p>
        )}

        {/* Instructor */}
        {showInstructor && (
          <div className="mb-3 flex items-center">
            <div className="relative mr-2 h-6 w-6 overflow-hidden rounded-full">
              <Image
                src={course.instructor.avatar}
                alt={course.instructor.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xs text-[#444444]">{course.instructor.name}</span>
          </div>
        )}

        {/* Estadísticas */}
        {showStats && variant !== "compact" && (
          <div className="mb-3 flex items-center space-x-4 text-xs text-[#6D6C6C]">
            <div className="flex items-center">
              <Users size={14} className="mr-1" />
              {course.stats.enrolledCount} estudiantes
            </div>
            <div className="flex items-center">
              <Star size={14} className="mr-1 text-yellow-400" />
              {course.stats.averageRating.toFixed(1)}
            </div>
          </div>
        )}

        {/* Barra de progreso */}
        {showProgress && progress && (
          <div className="mt-auto">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-medium">{progressPercentage}% completado</span>
              <span>{completedLessons}/{totalLessons} lecciones</span>
            </div>
            <Progress value={progressPercentage} className="h-1.5" />
            {remainingLessons > 0 && (
              <p className="mt-1 text-xs text-[#6D6C6C]">
                Te faltan {remainingLessons} {remainingLessons === 1 ? 'lección' : 'lecciones'}
              </p>
            )}
          </div>
        )}

        {/* Estado del curso: Gratis o Inversionista */}
        {!showProgress && (
          <div className="mt-auto pt-2">
            {course.accessRequirements.plan === "basic" || course.accessRequirements.plan === "any" ? (
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-sm font-medium text-green-600">
                Gratis
              </span>
            ) : (
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#5352F6]/10 px-2 py-0.5 text-sm font-medium text-[#5352F6]">
                  Inversionista
                </span>
                <span className="text-xs text-[#6D6C6C]">
                  Exclusivo para inversionistas
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
