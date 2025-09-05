"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/design-system";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CourseCard from "@/components/course/course-card";
import {
  Clock,
  BookOpen,
  Award,
  CheckCircle,
  Calendar,
  ChevronRight,
  User,
  Trophy
} from "lucide-react";

import {
  mockLearningPaths,
  mockCourses
} from "@/lib/course/mock-data";

export default function LearningPathDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [, setActiveTab] = useState("contenido");

  // Encontrar la ruta por slug
  const path = mockLearningPaths.find(path => path.slug === slug);

  if (!path) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold">Ruta no encontrada</h1>
        <p className="mb-8">La ruta que estás buscando no existe o ha sido eliminada.</p>
        <Link href="/learning-path">
          <Button>Volver a rutas</Button>
        </Link>
      </div>
    );
  }

  // Obtener los cursos de la ruta
  const pathCourses = path.courses.map(pathCourse => {
    const course = mockCourses.find(c => c.id === pathCourse.courseId);
    return {
      ...pathCourse,
      course
    };
  }).sort((a, b) => a.order - b.order);

  // Obtener progreso del usuario en esta ruta
  // const userPathProgress = mockUserProgress.find(progress => progress.pathId === path.id);

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#0F0F0F] py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:gap-12">
            <div className="mb-8 md:mb-0 md:w-1/2">
              <Link href="/learning-path" className="mb-4 inline-flex items-center text-sm text-gray-300 hover:text-white">
                <ChevronRight className="mr-1 h-4 w-4 rotate-180" />
                Volver a rutas
              </Link>

              <Badge className="mb-4 bg-[#5352F6]/20 text-[#5352F6] hover:bg-[#5352F6]/30">
                {path.structure.difficulty === 'principiante' ? 'Principiante' :
                  path.structure.difficulty === 'intermedio' ? 'Intermedio' : 'Avanzado'}
              </Badge>

              <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                {path.title}
              </h1>

              <p className="mb-6 text-lg text-gray-300">
                {path.description}
              </p>

              {/* Estadísticas de la ruta */}
              <div className="mb-8 grid grid-cols-2 gap-6 md:grid-cols-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-[#5352F6]" />
                  <div>
                    <p className="text-sm text-gray-400">Cursos</p>
                    <p className="font-medium">{path.structure.totalCourses}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#5352F6]" />
                  <div>
                    <p className="text-sm text-gray-400">Duración</p>
                    <p className="font-medium">{Math.round(path.structure.totalDuration / 60)} horas</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#5352F6]" />
                  <div>
                    <p className="text-sm text-gray-400">Tiempo estimado</p>
                    <p className="font-medium">{path.structure.estimatedCompletionTime}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-[#5352F6]" />
                  <div>
                    <p className="text-sm text-gray-400">Estudiantes</p>
                    <p className="font-medium">{path.stats.enrolledCount.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                {path.accessRequirements.plan === 'basic' || path.accessRequirements.plan === 'any' ? (
                  <Button size="lg">Inscribirme gratis</Button>
                ) : (
                  <Button size="lg">Convertirme en inversionista</Button>
                )}
                <Button size="lg" variant="outline">Ver plan de estudios</Button>
              </div>
            </div>

            <div className="group relative h-64 overflow-hidden md:h-96 md:w-1/2">
              <Image
                src={path.thumbnail.url}
                alt={path.thumbnail.alt}
                fill
                className="rounded-xl object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/80 via-black/50 to-black/20" />

              {/* Badge de plan requerido */}
              {path.accessRequirements.plan === 'investor' && (
                <div className="absolute right-0 top-0 m-4">
                  <Badge className="bg-[#5352F6] px-3 py-1 text-white">
                    Exclusivo para inversionistas
                  </Badge>
                </div>
              )}

              {/* Rating */}
              <div className="absolute bottom-0 left-0 m-4 flex items-center gap-1 rounded-full bg-black/60 px-3 py-1">
                <Award className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium text-white">{path.stats.averageRating}</span>
                <span className="text-xs text-gray-300">({path.stats.reviewsCount} reseñas)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs y contenido */}
      <section className="container mx-auto px-4 py-12">
        <Tabs defaultValue="contenido" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-8 grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="contenido">Contenido</TabsTrigger>
            <TabsTrigger value="objetivos">Objetivos</TabsTrigger>
            <TabsTrigger value="hitos">Hitos</TabsTrigger>
          </TabsList>

          <TabsContent value="contenido" className="mt-0">
            <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold">Cursos en esta ruta</h2>

              <div className="space-y-8">
                {pathCourses.map((pathCourse, index) => (
                  <div key={pathCourse.courseId} className="border-b border-[#E5E5E5] pb-8 last:border-0 last:pb-0">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5352F6] text-white">
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-bold">{pathCourse.course?.title}</h3>
                    </div>

                    {pathCourse.description && (
                      <p className="mb-4 text-[#6D6C6C]">{pathCourse.description}</p>
                    )}

                    {pathCourse.course && (
                      <div className="rounded-xl border border-[#E5E5E5] bg-white">
                        <CourseCard
                          course={pathCourse.course}
                          variant="horizontal"
                          showProgress={false}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="objetivos" className="mt-0">
            <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold">Objetivos de aprendizaje</h2>

              <div className="mb-8">
                <h3 className="mb-4 text-xl font-bold">Lo que aprenderás</h3>
                <ul className="grid gap-3 md:grid-cols-2">
                  {path.structure.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#5352F6]" />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-xl font-bold">Habilidades que desarrollarás</h3>
                <div className="flex flex-wrap gap-2">
                  {path.structure.skillsYouWillLearn.map((skill, index) => (
                    <Badge key={index} variant="outline" className="bg-[#5352F6]/5 text-[#5352F6]">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="hitos" className="mt-0">
            <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold">Hitos y certificaciones</h2>

              <div className="space-y-8">
                {path.milestones.map((milestone) => (
                  <div key={milestone.id} className="rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5352F6]/10">
                        <Trophy className="h-5 w-5 text-[#5352F6]" />
                      </div>
                      <h3 className="text-xl font-bold">{milestone.title}</h3>
                    </div>

                    <p className="mb-4 text-[#6D6C6C]">{milestone.description}</p>

                    <div className="mb-4">
                      <h4 className="mb-2 text-sm font-medium">Cursos requeridos:</h4>
                      <div className="space-y-2">
                        {milestone.requiredCourses.map(courseId => {
                          const course = mockCourses.find(c => c.id === courseId);
                          return course ? (
                            <div key={courseId} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#5352F6]" />
                              <span>{course.title}</span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>

                    {milestone.certificate?.available && (
                      <div className="flex items-center gap-2 rounded-lg bg-[#5352F6]/5 p-3 text-sm">
                        <Award className="h-5 w-5 text-[#5352F6]" />
                        <span>Incluye certificado al completar este hito</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* CTA final */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            ¿Listo para comenzar tu camino?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-[#6D6C6C]">
            Inscríbete ahora y comienza a desarrollar las habilidades que necesitas para ser un inversionista exitoso
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {path.accessRequirements.plan === 'basic' || path.accessRequirements.plan === 'any' ? (
              <Button size="lg">Inscribirme gratis</Button>
            ) : (
              <Button size="lg">Convertirme en inversionista</Button>
            )}
            <Link href="/learning-path">
              <Button size="lg" variant="outline">Explorar otras rutas</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
