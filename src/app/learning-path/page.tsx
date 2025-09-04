"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/design-system";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CourseCard from "@/components/course/course-card";
import { Clock, ChevronRight, BookOpen, Award, BarChart4, CheckCircle } from "lucide-react";

import { 
  mockLearningPaths,
  mockCourses,
  mockUserProgress
} from "@/lib/course/mock-data";

export default function LearningPathsPage() {
  // Obtener progreso del usuario
  const userPathProgress = mockUserProgress.find(progress => progress.pathId);

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#0F0F0F] py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <Badge className="mb-4 bg-[#5352F6]/20 text-[#5352F6] hover:bg-[#5352F6]/30">
              Rutas de aprendizaje
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Domina la inversión inmobiliaria <br className="hidden md:block" />
              <span className="text-[#5352F6]">paso a paso</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
              Nuestras rutas de aprendizaje estructuradas te guiarán desde los conceptos básicos hasta estrategias avanzadas de inversión inmobiliaria
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button size="lg">Explorar rutas</Button>
              <Button size="lg" variant="outline">Ver todos los cursos</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Rutas de aprendizaje */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Rutas de aprendizaje
          </h2>
          <p className="max-w-2xl text-[#6D6C6C]">
            Secuencias estructuradas de cursos diseñadas para desarrollar habilidades específicas en inversión inmobiliaria
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          {mockLearningPaths.map((path) => (
            <Link href={`/learning-path/${path.slug}`} key={path.id} className="block">
              <div className="group overflow-hidden rounded-xl border-2 border-[#E5E5E5] bg-white shadow-sm transition-all hover:border-[#5352F6]/30 hover:shadow-lg">
                <div className="relative h-64">
                  <Image
                    src={path.thumbnail.url}
                    alt={path.thumbnail.alt}
                    fill
                    className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
                  
                  {/* Badge de dificultad */}
                  <div className="absolute left-0 top-0 m-4">
                    <Badge className={`
                      ${path.structure.difficulty === 'principiante' ? 'bg-green-100 text-green-600' : 
                        path.structure.difficulty === 'intermedio' ? 'bg-yellow-100 text-yellow-600' : 
                        'bg-red-100 text-red-600'}
                    `}>
                      {path.structure.difficulty === 'principiante' ? 'Principiante' : 
                       path.structure.difficulty === 'intermedio' ? 'Intermedio' : 'Avanzado'}
                    </Badge>
                  </div>
                  
                  {/* Badge de plan requerido */}
                  {path.accessRequirements.plan === 'investor' && (
                    <div className="absolute right-0 top-0 m-4">
                      <Badge className="bg-[#5352F6]/10 text-[#5352F6]">
                        Inversionista
                      </Badge>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold">{path.title}</h3>
                  <p className="mb-4 text-[#6D6C6C]">{path.excerpt}</p>
                  
                  {/* Estadísticas de la ruta */}
                  <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-[#5352F6]" />
                      <span className="text-sm">{path.structure.totalCourses} cursos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-[#5352F6]" />
                      <span className="text-sm">{Math.round(path.structure.totalDuration / 60)} horas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-[#5352F6]" />
                      <span className="text-sm">{path.stats.averageRating} rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart4 className="h-5 w-5 text-[#5352F6]" />
                      <span className="text-sm">{path.stats.enrolledCount} estudiantes</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      {path.accessRequirements.plan === 'basic' || path.accessRequirements.plan === 'any' ? (
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-sm font-medium text-green-600">
                          Gratis
                        </span>
                      ) : (
                        <span className="rounded-full bg-[#5352F6]/10 px-2 py-0.5 text-sm font-medium text-[#5352F6]">
                          Exclusivo
                        </span>
                      )}
                    </div>
                    <span className="flex items-center text-sm font-medium text-[#5352F6]">
                      Ver detalles <ChevronRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Beneficios de las rutas */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Beneficios de nuestras rutas
            </h2>
            <p className="mx-auto max-w-2xl text-[#6D6C6C]">
              Aprende de manera estructurada y efectiva con nuestras rutas de aprendizaje diseñadas por expertos
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#5352F6]/10">
                <BookOpen className="h-6 w-6 text-[#5352F6]" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Aprendizaje estructurado</h3>
              <p className="text-[#6D6C6C]">
                Contenido organizado en una secuencia lógica que facilita la comprensión y retención de conocimientos
              </p>
            </div>
            
            <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#5352F6]/10">
                <Award className="h-6 w-6 text-[#5352F6]" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Certificaciones por hitos</h3>
              <p className="text-[#6D6C6C]">
                Obtén certificados al completar hitos importantes en tu ruta de aprendizaje
              </p>
            </div>
            
            <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#5352F6]/10">
                <CheckCircle className="h-6 w-6 text-[#5352F6]" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Progreso medible</h3>
              <p className="text-[#6D6C6C]">
                Seguimiento detallado de tu avance y logros a lo largo de toda la ruta
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-[#5352F6] py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
            Comienza tu camino hacia la libertad financiera
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg">
            Aprende, invierte y crece con LOKL Academy. La plataforma educativa diseñada por y para inversores inmobiliarios.
          </p>
          <Button size="lg">Explorar todas las rutas</Button>
        </div>
      </section>
    </div>
  );
}
