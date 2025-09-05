"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/design-system";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Clock, Users, Star, Calendar, CheckCircle, BookOpen, Award, Share2 } from "lucide-react";
import { mockCourses, mockUserProgress } from "@/lib/course/mock-data";

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const [, setActiveTab] = useState("contenido");
  
  // Encontrar el curso por slug
  const course = mockCourses.find((course) => course.slug === params.slug);
  
  // Si el curso no existe, mostrar 404
  if (!course) {
    notFound();
  }
  
  // Verificar si el curso es exclusivo para inversionistas
  const isInvestorExclusive = course.accessRequirements.plan === "investor";
  
  // Obtener progreso del usuario (si existe)
  const userProgress = mockUserProgress.find(progress => progress.courseId === course.id);
  const progressPercentage = userProgress?.overallProgress || 0;
  
  // Formatear la duración
  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) return `${mins} min`;
    if (mins === 0) return `${hours} h`;
    return `${hours} h ${mins} min`;
  };
  
  // Formatear la fecha
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section */}
      <section className="relative">
        {/* Imagen de fondo */}
        <div className="relative h-[300px] w-full md:h-[400px]">
          <Image
            src={course.coverImage?.url || course.thumbnail.url}
            alt={course.title}
            fill
            className="object-cover grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
          
          {/* Etiqueta para cursos exclusivos */}
          {isInvestorExclusive && (
            <div className="absolute right-4 top-4 z-10 bg-[#5352F6] px-3 py-1.5 text-sm font-medium text-white rounded-md">
              Inversionista
            </div>
          )}
        </div>
        
        {/* Contenido del hero */}
        <div className="container mx-auto px-4">
          <div className="relative -mt-20 rounded-xl bg-white p-6 shadow-md md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:gap-8">
              {/* Miniatura del curso */}
              <div className="relative mb-6 h-48 w-full shrink-0 overflow-hidden rounded-lg md:mb-0 md:h-64 md:w-64">
                <Image
                  src={course.thumbnail.url}
                  alt={course.title}
                  fill
                  className="object-cover grayscale"
                />
              </div>
              
              {/* Información del curso */}
              <div className="flex-1">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <Badge variant="outline" className="bg-[#F5F5F5] text-xs font-medium text-[#5352F6]">
                    {course.category.name}
                  </Badge>
                  <span className="flex items-center text-xs text-[#6D6C6C]">
                    <Clock size={14} className="mr-1 text-[#5352F6]" />
                    {formatDuration(course.content.totalDuration)}
                  </span>
                  <span className="flex items-center text-xs text-[#6D6C6C]">
                    <Calendar size={14} className="mr-1 text-[#5352F6]" />
                    Actualizado: {formatDate(course.updatedAt)}
                  </span>
                </div>
                
                <h1 className="mb-2 text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
                  {course.title}
                </h1>
                
                {course.subtitle && (
                  <p className="mb-4 text-lg text-[#6D6C6C]">{course.subtitle}</p>
                )}
                
                <p className="mb-6 text-[#6D6C6C]">{course.description}</p>
                
                {/* Estadísticas */}
                <div className="mb-6 flex flex-wrap gap-6 text-sm text-[#6D6C6C]">
                  <div className="flex items-center">
                    <Users size={16} className="mr-2 text-[#5352F6]" />
                    <span>{course.stats.enrolledCount} estudiantes</span>
                  </div>
                  <div className="flex items-center">
                    <Star size={16} className="mr-2 text-yellow-400" />
                    <span>{course.stats.averageRating.toFixed(1)} ({course.stats.reviewsCount} reseñas)</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen size={16} className="mr-2 text-[#5352F6]" />
                    <span>{course.content.totalLessons} lecciones</span>
                  </div>
                  {course.certificate.available && (
                    <div className="flex items-center">
                      <Award size={16} className="mr-2 text-[#5352F6]" />
                      <span>Certificado incluido</span>
                    </div>
                  )}
                </div>
                
                {/* Instructor */}
                <div className="mb-6 flex items-center">
                  <div className="relative mr-3 h-12 w-12 overflow-hidden rounded-full">
                    <Image 
                      src={course.instructor.avatar} 
                      alt={course.instructor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{course.instructor.name}</p>
                    <p className="text-sm text-[#6D6C6C]">{course.instructor.title || course.instructor.expertise.join(", ")}</p>
                  </div>
                </div>
                
                {/* Barra de progreso (si está inscrito) */}
                {userProgress && (
                  <div className="mb-6">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium">{progressPercentage}% completado</span>
                      <span>{userProgress.completedLessons}/{course.content.totalLessons} lecciones</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                )}
                
                {/* Botones de acción */}
                <div className="flex flex-col gap-3 sm:flex-row">
                  {isInvestorExclusive ? (
                    <>
                      <Button size="lg" className="flex-1">
                        {userProgress ? "Continuar curso" : "Inscribirme como inversionista"}
                      </Button>
                      <Button variant="outline" size="lg" className="flex items-center gap-2">
                        <Share2 size={18} />
                        Compartir
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href={`/course/${course.slug}/learn`} className="flex-1">
                        <Button size="lg" className="w-full">
                          {userProgress ? "Continuar curso" : "Ver curso"}
                        </Button>
                      </Link>
                      <Button variant="outline" size="lg" className="flex items-center gap-2">
                        <Share2 size={18} />
                        Compartir
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contenido principal */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Columna principal */}
          <div className="md:col-span-2">
            <Tabs defaultValue="contenido" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="mb-6 w-full justify-start">
                <TabsTrigger value="contenido">Contenido del curso</TabsTrigger>
                <TabsTrigger value="objetivos">Objetivos</TabsTrigger>
                <TabsTrigger value="requisitos">Requisitos</TabsTrigger>
                <TabsTrigger value="reviews">Reseñas</TabsTrigger>
              </TabsList>
              
              <TabsContent value="contenido" className="space-y-6">
                <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
                  <h2 className="mb-6 text-xl font-bold">Contenido del curso</h2>
                  
                  <div className="mb-4 flex items-center justify-between text-sm text-[#6D6C6C]">
                    <span>{course.content.modules.length} módulos • {course.content.totalLessons} lecciones</span>
                    <span>{formatDuration(course.content.totalDuration)} de duración total</span>
                  </div>
                  
                  <div className="space-y-4">
                    {course.content.modules.map((module, moduleIndex) => (
                      <div key={module.id} className="rounded-lg border border-[#E5E5E5] bg-[#FAFAFA]">
                        <div className="flex items-center justify-between p-4">
                          <h3 className="font-medium">
                            {moduleIndex + 1}. {module.title}
                          </h3>
                          <span className="text-sm text-[#6D6C6C]">{formatDuration(module.duration)}</span>
                        </div>
                        
                        <div className="border-t border-[#E5E5E5]">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <Link 
                              href={`/course/${params.slug}/learn?module=${module.id}&lesson=${lesson.id}`}
                              key={lesson.id} 
                              className={`flex items-center justify-between p-4 ${
                                lessonIndex < module.lessons.length - 1 ? "border-b border-[#E5E5E5]" : ""
                              } hover:bg-[#F5F5F5] transition-colors cursor-pointer`}
                            >
                              <div className="flex items-center">
                                {lesson.isPreview ? (
                                  <div className="mr-3 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                                    <BookOpen size={14} className="text-green-600" />
                                  </div>
                                ) : userProgress?.moduleProgress.some(m => m.moduleId === module.id && m.progress === 100) ? (
                                  <div className="mr-3 h-6 w-6 rounded-full bg-[#EEEEFE] flex items-center justify-center">
                                    <CheckCircle size={14} className="text-[#5352F6]" />
                                  </div>
                                ) : (
                                  <div className="mr-3 h-6 w-6 rounded-full border border-[#E5E5E5] bg-white flex items-center justify-center">
                                    <span className="text-xs">{moduleIndex + 1}.{lessonIndex + 1}</span>
                                  </div>
                                )}
                                <span className={`text-sm ${lesson.isPreview ? "font-medium" : ""}`}>
                                  {lesson.title}
                                  {lesson.isPreview && (
                                    <Badge className="ml-2 bg-green-100 text-green-600 text-xs">
                                      Vista previa
                                    </Badge>
                                  )}
                                </span>
                              </div>
                              <span className="text-xs text-[#6D6C6C]">{formatDuration(lesson.duration)}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="objetivos" className="space-y-6">
                <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
                  <h2 className="mb-6 text-xl font-bold">Lo que aprenderás</h2>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    {course.content.learningObjectives.map((objective, index) => (
                      <div key={index} className="flex items-start">
                        <div className="mr-3 mt-1 text-[#5352F6]">
                          <CheckCircle size={16} />
                        </div>
                        <span>{objective}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
                  <h2 className="mb-6 text-xl font-bold">Habilidades que desarrollarás</h2>
                  
                  <div className="flex flex-wrap gap-2">
                    {course.content.skillsYouWillLearn.map((skill, index) => (
                      <span 
                        key={index} 
                        className="rounded-full bg-[#F5F5F5] px-3 py-1 text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="requisitos" className="space-y-6">
                <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
                  <h2 className="mb-6 text-xl font-bold">Requisitos previos</h2>
                  
                  <ul className="space-y-3">
                    {course.content.requirements.length > 0 ? (
                      course.content.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mr-3 mt-1 h-1.5 w-1.5 rounded-full bg-[#5352F6]"></div>
                          <span>{requirement}</span>
                        </li>
                      ))
                    ) : (
                      <li>No hay requisitos previos para este curso.</li>
                    )}
                  </ul>
                </div>
                
                <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
                  <h2 className="mb-6 text-xl font-bold">Audiencia objetivo</h2>
                  
                  <ul className="space-y-3">
                    {course.content.targetAudience.map((audience, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-3 mt-1 h-1.5 w-1.5 rounded-full bg-[#5352F6]"></div>
                        <span>{audience}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-6">
                <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
                  <h2 className="mb-6 text-xl font-bold">Reseñas de estudiantes</h2>
                  
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-4xl font-bold text-[#5352F6]">{course.stats.averageRating.toFixed(1)}</div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={i < Math.round(course.stats.averageRating) ? "text-yellow-400" : "text-gray-300"} 
                            fill={i < Math.round(course.stats.averageRating) ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                      <div className="mt-1 text-sm text-[#6D6C6C]">{course.stats.reviewsCount} reseñas</div>
                    </div>
                    
                    <div className="flex-1">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const reviewsCount = course.reviews?.filter(r => Math.round(r.rating) === rating).length || 0;
                        const percentage = course.stats.reviewsCount > 0 
                          ? (reviewsCount / course.stats.reviewsCount) * 100 
                          : 0;
                        
                        return (
                          <div key={rating} className="mb-1 flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <span className="text-sm">{rating}</span>
                              <Star size={12} className="text-yellow-400" fill="currentColor" />
                            </div>
                            <div className="h-2 flex-1 rounded-full bg-[#F5F5F5]">
                              <div 
                                className="h-2 rounded-full bg-[#5352F6]" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-[#6D6C6C]">{reviewsCount}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Lista de reseñas */}
                  <div className="space-y-6">
                    {course.reviews?.slice(0, 3).map((review) => (
                      <div key={review.id} className="border-b border-[#E5E5E5] pb-6 last:border-0">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {review.userAvatar && (
                              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                                <Image 
                                  src={review.userAvatar} 
                                  alt={review.userName}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div>
                              <div className="font-medium">{review.userName}</div>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    size={14} 
                                    className={i < Math.round(review.rating) ? "text-yellow-400" : "text-gray-300"} 
                                    fill={i < Math.round(review.rating) ? "currentColor" : "none"}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-[#6D6C6C]">
                            {formatDate(review.createdAt)}
                          </div>
                        </div>
                        
                        {review.title && (
                          <h4 className="mb-1 font-medium">{review.title}</h4>
                        )}
                        
                        <p className="text-sm text-[#6D6C6C]">{review.comment}</p>
                      </div>
                    ))}
                    
                    {(course.reviews?.length || 0) > 3 && (
                      <div className="text-center">
                        <Button variant="outline">Ver todas las reseñas</Button>
                      </div>
                    )}
                    
                    {(!course.reviews || course.reviews.length === 0) && (
                      <div className="text-center py-8 text-[#6D6C6C]">
                        <p>No hay reseñas disponibles para este curso.</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tarjeta de acceso */}
            <div className="sticky top-6 rounded-lg border border-[#E5E5E5] bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Accede a este curso</h3>
              
              {/* Estado del curso: Gratis o Inversionista */}
              <div className="mb-6">
                {course.accessRequirements.plan === "basic" || course.accessRequirements.plan === "any" ? (
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-600">
                      Gratis
                    </span>
                    <span className="text-sm text-[#6D6C6C]">
                      Acceso completo
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#5352F6]/10 px-3 py-1 text-sm font-medium text-[#5352F6]">
                      Inversionista
                    </span>
                    <span className="text-sm text-[#6D6C6C]">
                      Exclusivo para inversionistas
                    </span>
                  </div>
                )}
              </div>
              
              <div className="mb-6 space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-[#5352F6]" />
                  <span className="text-sm">{course.content.totalLessons} lecciones</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-[#5352F6]" />
                  <span className="text-sm">{formatDuration(course.content.totalDuration)} de contenido</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-[#5352F6]" />
                  <span className="text-sm">Acceso de por vida</span>
                </div>
                {course.certificate.available && (
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[#5352F6]" />
                    <span className="text-sm">Certificado de finalización</span>
                  </div>
                )}
                {course.settings.allowDownloads && (
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[#5352F6]" />
                    <span className="text-sm">Recursos descargables</span>
                  </div>
                )}
              </div>
              
              {isInvestorExclusive ? (
                <Button className="w-full">Inscribirme como inversionista</Button>
              ) : (
                <Link href={`/course/${course.slug}/learn`} className="w-full">
                  <Button className="w-full">Ver curso</Button>
                </Link>
              )}
            </div>
            
            {/* Instructor */}
            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <h3 className="mb-4 text-lg font-bold">Sobre el instructor</h3>
              
              <div className="mb-4 flex items-center">
                <div className="relative mr-3 h-16 w-16 overflow-hidden rounded-full">
                  <Image 
                    src={course.instructor.avatar} 
                    alt={course.instructor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{course.instructor.name}</p>
                  <p className="text-sm text-[#6D6C6C]">{course.instructor.title || course.instructor.expertise.join(", ")}</p>
                </div>
              </div>
              
              <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="font-medium">{course.instructor.stats?.totalCourses || 0}</p>
                  <p className="text-[#6D6C6C]">Cursos</p>
                </div>
                <div>
                  <p className="font-medium">{course.instructor.stats?.totalStudents || 0}</p>
                  <p className="text-[#6D6C6C]">Estudiantes</p>
                </div>
                <div>
                  <p className="font-medium">{course.instructor.stats?.averageRating || 0}</p>
                  <p className="text-[#6D6C6C]">Calificación</p>
                </div>
                <div>
                  <p className="font-medium">{course.instructor.stats?.yearsExperience || 0}</p>
                  <p className="text-[#6D6C6C]">Años exp.</p>
                </div>
              </div>
              
              <p className="text-sm text-[#6D6C6C] line-clamp-4">{course.instructor.bio}</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA final */}
      <section className="bg-[#5352F6] py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight">
            ¿Listo para comenzar tu aprendizaje?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg">
            {isInvestorExclusive 
              ? "Conviértete en inversionista LOKL y desbloquea este y muchos más cursos exclusivos."
              : "Inscríbete ahora y comienza a aprender con este curso gratuito de alta calidad."
            }
          </p>
          <Button size="lg" variant="secondary">
            {isInvestorExclusive ? "Conocer más sobre inversiones LOKL" : "Ver curso ahora"}
          </Button>
        </div>
      </section>
    </div>
  );
}
