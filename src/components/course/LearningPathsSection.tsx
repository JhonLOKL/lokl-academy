"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/design-system";
import { Clock } from "lucide-react";
import { LearningPath } from "@/lib/course/schema";

interface LearningPathsSectionProps {
  paths: LearningPath[];
}

const LearningPathsSection: React.FC<LearningPathsSectionProps> = ({ paths }) => {
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">
        Rutas de aprendizaje
      </h2>
      <div className="space-y-8">
        {paths.map((path) => (
          <div key={path.id} className="group relative overflow-hidden rounded-lg bg-white p-0 transition-all">
            <div className="absolute left-0 top-0 h-full w-1.5 bg-[#5352F6]"></div>
            <div className="flex flex-col md:flex-row">
              {/* Imagen lateral solo visible en desktop */}
              <div className="group relative hidden h-auto w-64 shrink-0 overflow-hidden md:block">
                <Image
                  src={path.thumbnail.url}
                  alt={path.thumbnail.alt}
                  fill
                  className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
                {/* Etiqueta de nivel */}
                <div className="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white">
                  Nivel: {path.structure.difficulty}
                </div>
              </div>

              {/* Contenido principal */}
              <div className="flex flex-1 flex-col p-6 pl-8 md:pl-6">
                <div className="mb-4 flex flex-wrap items-center justify-between">
                  <Badge className="bg-[#EEEEFE] px-3 py-1 text-xs font-medium text-[#5352F6]">
                    {path.category.name}
                  </Badge>
                  {/* Etiqueta para rutas exclusivas */}
                  {path.accessRequirements.plan !== "any" && (
                    <div className="rounded-md bg-[#5352F6] px-3 py-1 text-xs font-medium text-white">
                      {path.accessRequirements.plan === "premium" ? "Premium" : "Inversionista"}
                    </div>
                  )}
                </div>

                <div className="flex flex-col md:flex-row md:gap-8">
                  <div className="md:w-7/12">
                    <Link href={`/learning-path/${path.slug}`}>
                      <h3 className="mb-3 text-xl font-bold tracking-tight group-hover:text-[#5352F6]">
                        {path.title}
                      </h3>
                    </Link>

                    <p className="mb-4 text-sm text-[#6D6C6C]">{path.excerpt}</p>

                    {/* Métricas */}
                    <div className="mb-4 flex flex-wrap items-center gap-6 text-xs text-[#6D6C6C]">
                      <div className="flex items-center">
                        <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#EEEEFE] text-[#5352F6]">
                          {path.courses.length}
                        </div>
                        <span>cursos</span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#EEEEFE] text-[#5352F6]">
                          {path.structure.totalLessons}
                        </div>
                        <span>lecciones</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1 text-[#5352F6]" />
                        <span>{path.structure.estimatedCompletionTime}</span>
                      </div>
                    </div>

                    {/* Lista de habilidades */}
                    <div className="mb-4">
                      <h4 className="mb-2 text-xs font-semibold">Habilidades que desarrollarás:</h4>
                      <div className="flex flex-wrap gap-2">
                        {path.structure.skillsYouWillLearn.slice(0, 3).map((skill, index) => (
                          <span key={index} className="rounded-full bg-[#F5F5F5] px-3 py-1 text-xs">
                            {skill}
                          </span>
                        ))}
                        {path.structure.skillsYouWillLearn.length > 3 && (
                          <span className="rounded-full bg-[#F5F5F5] px-3 py-1 text-xs">
                            +{path.structure.skillsYouWillLearn.length - 3} más
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Sección de precios y progreso */}
                  <div className="flex flex-col justify-between border-t pt-4 md:w-5/12 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                    {/* Cursos incluidos */}
                    <div className="mb-4">
                      <h4 className="mb-2 text-xs font-semibold">Cursos incluidos:</h4>
                      <div className="space-y-2">
                        {path.courses.slice(0, 2).map((courseItem, index) => (
                          <div key={courseItem.courseId} className="flex items-center">
                            <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#F5F5F5] text-xs">
                              {index + 1}
                            </div>
                            <span className="text-xs line-clamp-1">
                              {courseItem.course?.title || `Curso ${index + 1}`}
                            </span>
                          </div>
                        ))}
                        {path.courses.length > 2 && (
                          <div className="flex items-center text-xs text-[#5352F6]">
                            <span className="ml-7">+{path.courses.length - 2} cursos más</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Precio y CTA */}
                    <div>
                      <div className="mb-3">
                        {path.pricing.type === "free" ? (
                          <span className="text-lg font-medium text-green-600">Gratis</span>
                        ) : (
                          <div className="flex items-end">
                            <span className="text-2xl font-bold text-[#5352F6]">
                              {path.pricing.price ? `$${path.pricing.price.toLocaleString('es-CO')}` : '$0'}
                            </span>
                            {path.pricing.individualCoursesPrice && (
                              <span className="ml-2 text-xs text-[#6D6C6C]">
                                Ahorro de {`$${path.pricing.savings?.toLocaleString('es-CO')}`}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <Link href={`/learning-path/${path.slug}`} className="block w-full">
                        <Button className="w-full">Ver ruta completa</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LearningPathsSection;
