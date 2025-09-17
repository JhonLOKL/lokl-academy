"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { Button, toast } from "@/components/design-system";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Clock, Star, Calendar, CheckCircle, BookOpen, Award, Share2, AlertTriangle } from "lucide-react";
import { Course } from "@/lib/course/schema";
import { getCourseBySlugAction, enrollCourseAction } from "@/actions/course-action";
import { useAuthStore } from "@/store/auth-store";
import { ensureLoginOrRedirect } from "@/lib/auth-utils";

export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { user } = useAuthStore();
  const [, setActiveTab] = useState("contenido");

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false);

  // Verificar si el curso está completado - definido antes de cualquier return
  const isCourseCompleted = useMemo(() => {
    if (!course) return false;
    return course?.content?.modules?.every(m => 
      m.lessons.every(l => l.isCompleted) && 
      (!m.quiz || m.quiz.isCompleted)
    ) || false;
  }, [course]);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setLoading(true);
        const res = await getCourseBySlugAction(String(slug));
        if (!isMounted) return;
        if (res.success && res.data) {
          const c = res.data.course as Course | null;
          if (c) {
            // Normalizar estados de completado a partir de completedAt si viene del backend
            c.content.modules.forEach(m => {
              m.lessons.forEach(lesson => {
                if (lesson.completedAt && !lesson.isCompleted) lesson.isCompleted = true;
              });
              if (m.quiz) {
                if (m.quiz.completedAt && !m.quiz.isCompleted) m.quiz.isCompleted = true;
              }
            });
          }
          setCourse(c);
          setIsEnrolled(Boolean(res.data.isEnrolled));
        } else setError(res.error || "No encontrado");
      } catch {
        if (!isMounted) return;
        setError("Error cargando el curso");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => { isMounted = false; };
  }, [slug]);

  if (!loading && (!course || error)) {
    notFound();
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA]">
        <section className="relative">
          <div className="relative h-[300px] w-full md:h-[400px]">
            <div className="h-full w-full animate-pulse bg-gray-200" />
          </div>
        </section>
        <section className="container mx-auto px-4 py-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-40 rounded-lg bg-gray-100 animate-pulse" />
              ))}
            </div>
            <div className="space-y-4">
              <div className="h-64 rounded-lg bg-gray-100 animate-pulse" />
            </div>
          </div>
        </section>
      </div>
    );
  }
  
  if (!course) return null;

  // Aseguramos que course.stats siempre tenga valores por defecto
  if (course && !course.stats) {
    course.stats = {
      enrolledCount: 0,
      completedCount: 0,
      completionRate: 0,
      averageRating: 0,
      reviewsCount: 0,
      totalViews: 0,
      averageTimeToComplete: 0,
    };
  }
  
  const isInvestorExclusive = Boolean(course && course.accessRequirements.plan === "investor");
  
  const progressPercentage = course?.progress?.overallProgress || 0;
  
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
    <>
      
      <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section */}
      <section className="relative">
        {/* Imagen de fondo */}
        <div className="relative h-[300px] w-full md:h-[400px]">
          {loading ? (
            <div className="h-full w-full animate-pulse bg-gray-200" />
          ) : (
            course && (
              <Image
                src={course.coverImage?.url || course.thumbnail.url}
                alt={course.title}
                fill
                className="object-cover grayscale"
                priority
              />
            )
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
          
          {/* Etiqueta para cursos exclusivos */}
          {isInvestorExclusive && !loading && (
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
                {loading ? (
                  <div className="h-full w-full animate-pulse bg-gray-200" style={{ animationDuration: '1.2s' }} />
                ) : course?.thumbnail?.url ? (
                  <Image
                    src={course.thumbnail.url}
                    alt={course.title}
                    fill
                    className="object-cover grayscale"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-100 text-[#6D6C6C]">
                    Sin imagen
                  </div>
                )}
              </div>
              
              {/* Información del curso */}
              <div className="flex-1">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <Badge variant="outline" className="bg-[#F5F5F5] text-xs font-medium text-[#5352F6]">
                    {loading ? 'Cargando…' : course?.category.name}
                  </Badge>
                  <span className="flex items-center text-xs text-[#6D6C6C]">
                    <Clock size={14} className="mr-1 text-[#5352F6]" />
                    {loading ? '—' : formatDuration(course?.content.totalDuration || 0)}
                  </span>
                  <span className="flex items-center text-xs text-[#6D6C6C]">
                    <Calendar size={14} className="mr-1 text-[#5352F6]" />
                    {loading ? 'Actualizado: —' : `Actualizado: ${formatDate(course!.updatedAt)}`}
                  </span>
                </div>
                
                <h1 className="mb-2 text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
                  {loading ? 'Cargando curso…' : course?.title}
                </h1>
                
                {!loading && course?.subtitle && (
                  <p className="mb-4 text-lg text-[#6D6C6C]">{course.subtitle}</p>
                )}
                
                <p className="mb-6 text-[#6D6C6C]">{loading ? 'Cargando descripción…' : course?.description}</p>
                
                {/* Estadísticas */}
                <div className="mb-6 flex flex-wrap gap-6 text-sm text-[#6D6C6C]">
{/*                   <div className="flex items-center">
                    <Users size={16} className="mr-2 text-[#5352F6]" />
                    <span>{loading || !course?.stats ? '—' : `${course.stats.enrolledCount} estudiantes`}</span>
                  </div>
                  <div className="flex items-center">
                    <Star size={16} className="mr-2 text-yellow-400" />
                    <span>{loading || !course?.stats ? '—' : `${course.stats.averageRating.toFixed(1)} (${course.stats.reviewsCount} reseñas)`}</span>
                  </div> */}
                  <div className="flex items-center">
                    <BookOpen size={16} className="mr-2 text-[#5352F6]" />
                    <span>{loading || !course ? '—' : `${course.content.totalLessons} lecciones`}</span>
                  </div>
                  {!loading && course && course.certificate?.available && (
                    <div className="flex items-center">
                      <Award size={16} className="mr-2 text-[#5352F6]" />
                      <span>Certificado incluido</span>
                    </div>
                  )}
                </div>
                
                {/* Barra de progreso (si está inscrito) */}
                {!loading && isEnrolled && course && course.progress && (
                  <>
                    {isCourseCompleted ? (
                      <div className="mb-6 bg-gradient-to-r from-[#F0FDF4] to-[#F7FEF5] p-5 rounded-lg border border-[#86EFAC] shadow-sm">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <CheckCircle size={24} className="text-green-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-green-800 mb-1">¡Felicidades! Curso completado</h4>
                            <p className="text-sm text-green-700 mb-3">
                              Has completado todas las lecciones y evaluaciones de este curso. ¡Sigue aprendiendo con más cursos de LOKL Academy!
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <Link href="/course">
                                <Button variant="outline" size="sm" className="text-xs px-3 py-1 h-auto border-green-600 text-green-700 hover:bg-green-50">
                                  Ver más cursos
                                </Button>
                              </Link>
{/*                               <Button size="sm" className="text-xs px-3 py-1 h-auto bg-green-600 hover:bg-green-700">
                                Obtener certificado
                              </Button> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-6 bg-gradient-to-r from-[#F4F6FF] to-[#F8F9FF] p-5 rounded-lg border border-[#E8EAFF] shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-[#5352F6]/10 flex items-center justify-center">
                              <CheckCircle size={16} className="text-[#5352F6]" />
                            </div>
                            <div>
                              <span className="block font-medium text-[#333]">{progressPercentage}% completado</span>
                              <span className="block text-xs text-[#6D6C6C]">{course.progress.completedLessons} de {course.content.totalLessons} lecciones</span>
                            </div>
                          </div>
                      <Button variant="outline" size="sm" className="text-xs px-3 py-1 h-auto border-[#5352F6] text-[#5352F6] hover:bg-[#5352F6]/5">
                        Ver de nuevo
                      </Button>
                        </div>
                        <div className="relative mt-2">
                          <div className="h-2 w-full bg-[#E8EAFF] rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#5352F6] to-[#7A79FF] rounded-full transition-all duration-500 ease-out"
                              style={{ width: `${progressPercentage}%` }}
                            />
                          </div>
                          <div className="mt-1 flex justify-between text-xs text-[#6D6C6C]">
                            <span>Progreso</span>
                            <span className="font-medium text-[#5352F6]">{progressPercentage}%</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
                
                {/* Botones de acción */}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <>
                    <Button
                      size="lg"
                      className="flex-1"
                      disabled={loading || !course}
                      onClick={async () => {
                        if (!course) return;
                        const courseLanding = `/course/${course.slug}`;
                        // Requiere login para iniciar/continuar
                        const ok = ensureLoginOrRedirect(courseLanding, router.push);
                        if (!ok) return;

                        // Validación de plan
                        const requiredPlan = course.accessRequirements.plan; // 'basic' | 'investor' | 'any' | 'premium'
                        const userPlan = user?.planType || 'basic';

                        const hasAccess =
                          requiredPlan === 'any' ||
                          requiredPlan === 'basic' ||
                          (requiredPlan === 'premium' && (userPlan === 'investor' || userPlan === 'premium')) ||
                          (requiredPlan === 'investor' && userPlan === 'investor');

                        if (!hasAccess) {
                          toast({
                            title: "Acceso denegado",
                            description: "Tu plan actual no permite acceder a este curso. Actualiza tu plan para continuar.",
                            variant: "destructive",
                            icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
                          });
                          return;
                        }

                        if (!isEnrolled) {
                          const res = await enrollCourseAction({ courseId: course.id });
                          if (!res.success) {
                            toast({
                              title: "Error de inscripción",
                              description: res.error || "No se pudo inscribir al curso. Intenta nuevamente más tarde.",
                              variant: "destructive",
                              icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
                            });
                            return;
                          } else {
                            toast({
                              title: "¡Inscripción exitosa!",
                              description: "Te has inscrito correctamente al curso. ¡Comienza a aprender ahora!",
                              variant: "success",
                              icon: <CheckCircle className="h-5 w-5 text-green-600" />,
                            });
                          }
                          // Recargar datos del curso para reflejar inscripción y progreso
                          const reload = await getCourseBySlugAction(String(slug));
                          if (reload.success && reload.data) {
                            setCourse(reload.data.course as Course);
                            setIsEnrolled(Boolean(reload.data.isEnrolled));
                          }
                        }

                        // Navegar a la primera lección
                        const first = course.content.modules[0]?.lessons[0];
                        if (first) {
                          router.push(`/course/${course.slug}/${first.slug || first.id}`);
                        }
                      }}
                    >
                      {isEnrolled ? (isCourseCompleted ? 'Ver de nuevo' : 'Continuar curso') : (isInvestorExclusive ? 'Ver curso' : 'Ver curso')}
                    </Button>
                    <Button variant="outline" size="lg" className="flex items-center gap-2">
                      <Share2 size={18} />
                      Compartir
                    </Button>
                  </>
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
                {/* <TabsTrigger value="reviews">Reseñas</TabsTrigger> */}
              </TabsList>
              
              <TabsContent value="contenido" className="space-y-6">
                <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
                  <h2 className="mb-6 text-xl font-bold">{loading ? 'Cargando contenido…' : 'Contenido del curso'}</h2>
                  
                  <div className="mb-4 flex items-center justify-between text-sm text-[#6D6C6C]">
                    <span>{loading || !course ? '—' : `${course.content.modules.length} módulos • ${course.content.totalLessons} lecciones`}</span>
                    <span>{loading ? '—' : `${formatDuration(course?.content.totalDuration || 0)} de duración total`}</span>
                  </div>
                  
                  <div className="space-y-4">
                    {loading ? (
                      <div className="space-y-3">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="h-16 w-full animate-pulse rounded-lg bg-gray-100" />
                        ))}
                      </div>
                    ) : course && course.content.modules.map((module, moduleIndex) => (
                      <div key={module.id} className="rounded-lg border border-[#E5E5E5] bg-[#FAFAFA]">
                        <div className="flex items-center justify-between p-4">
                          <h3 className="font-medium">
                            {moduleIndex + 1}. {module.title}
                          </h3>
                          <span className="text-sm text-[#6D6C6C]">{formatDuration(module.duration)}</span>
                        </div>
                        
                          <div className="border-t border-[#E5E5E5]">
                           {module.lessons.map((lesson, lessonIndex) => {
                             // Determinar si la lección está bloqueada
                             let isLocked = true; // Por defecto, todas bloqueadas excepto las que cumplen condiciones
                             
                             if (course.settings?.enforceOrder) {
                               // Las lecciones ya completadas nunca están bloqueadas
                               if (lesson.isCompleted) {
                                 isLocked = false;
                               }
                               // Las lecciones de vista previa nunca están bloqueadas
                               else if (lesson.isPreview) {
                                 isLocked = false;
                               }
                               // Primera lección del primer módulo siempre está desbloqueada
                               else if (moduleIndex === 0 && lessonIndex === 0) {
                                 isLocked = false;
                               }
                               // Para las demás, verificar si es la siguiente lección después de una completada
                               else {
                                 // Si es la primera lección de un módulo
                                 if (lessonIndex === 0) {
                                   // Verificar si el módulo anterior tiene todas sus lecciones completadas o un quiz completado
                                   if (moduleIndex > 0) {
                                     const prevModule = course.content.modules[moduleIndex - 1];
                                     
                                     // Si todas las lecciones del módulo anterior están completadas
                                     const allPrevLessonsCompleted = prevModule.lessons.every(l => l.isCompleted);
                                     
                                     // Verificar si el quiz del módulo anterior está completado y aprobado (si existe)
                                     const prevQuizCompletedAndPassed = 
                                       prevModule.quiz?.isCompleted && prevModule.quiz?.passed || false;
                                     
                                     // Desbloquear solo si todas las lecciones están completadas
                                     // Y si hay quiz, debe estar aprobado
                                     if (allPrevLessonsCompleted && 
                                         (!prevModule.quiz || prevQuizCompletedAndPassed)) {
                                       isLocked = false;
                                     }
                                   }
                                 }
                                 // Si no es la primera lección del módulo
                                 else {
                                   // Desbloquear solo si la lección anterior está completada
                                   const prevLesson = module.lessons[lessonIndex - 1];
                                   if (prevLesson.isCompleted) {
                                     isLocked = false;
                                   }
                                 }
                               }
                             } else {
                               // Si no se requiere orden, todas las lecciones están desbloqueadas
                               isLocked = false;
                             }
                             
                             return (
                               <div
                                 key={lesson.id}
                                 className={`flex items-center justify-between p-4 ${
                                   lessonIndex < module.lessons.length - 1 ? "border-b border-[#E5E5E5]" : ""
                                 } ${isLocked ? "opacity-70 cursor-not-allowed" : "hover:bg-[#F5F5F5] cursor-pointer"} transition-colors`}
                               >
                                 {isLocked ? (
                                   <div className="flex items-center gap-3 w-full">
                                     <div className="h-10 w-16 rounded-md bg-gray-200 flex items-center justify-center flex-shrink-0">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                         <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                                         <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                       </svg>
                                     </div>
                                     <div className="flex flex-col">
                                       <span className="text-sm text-gray-500">{lesson.title}</span>
                                       <span className="text-xs text-gray-400">{formatDuration(lesson.duration)}</span>
                                     </div>
                                     <div className="ml-auto">
                                       <Badge variant="outline" className="bg-gray-100 text-gray-500 text-xs border-gray-200">
                                         Bloqueado
                                       </Badge>
                                     </div>
                                   </div>
                                 ) : (
                                   <Link 
                                     href={`/course/${course?.slug || ''}/${lesson.slug || lesson.id}`}
                                     className="flex items-center justify-between w-full"
                                   >
                                     <div className="flex items-center gap-3">
                                       {lesson.thumbnail ? (
                                         <div className="relative h-10 w-16 overflow-hidden rounded-md flex-shrink-0">
                                           <Image
                                             src={lesson.thumbnail.url}
                                             alt={lesson.thumbnail.alt || lesson.title}
                                             fill
                                             className="object-cover"
                                           />
                                         </div>
                                       ) : lesson.isPreview ? (
                                         <div className="h-10 w-16 rounded-md bg-green-100 flex items-center justify-center flex-shrink-0">
                                           <BookOpen size={20} className="text-green-600" />
                                         </div>
                                       ) : module.lessons.every(l => l.isCompleted) ? (
                                         <div className="h-10 w-16 rounded-md bg-[#EEEEFE] flex items-center justify-center flex-shrink-0">
                                           <CheckCircle size={20} className="text-[#5352F6]" />
                                         </div>
                                       ) : (
                                         <div className="h-10 w-16 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0">
                                           <span className="text-sm font-medium text-gray-500">{moduleIndex + 1}.{lessonIndex + 1}</span>
                                         </div>
                                       )}
                                       <div className="flex flex-col">
                                         <span className={`text-sm ${lesson.isPreview ? "font-medium" : ""}`}>
                                           {lesson.title}
                                           {lesson.isPreview && (
                                             <Badge className="ml-2 bg-green-100 text-green-600 text-xs">
                                               Vista previa
                                             </Badge>
                                           )}
                                         </span>
                                         <span className="text-xs text-[#6D6C6C]">{formatDuration(lesson.duration)}</span>
                                       </div>
                                     </div>
                                     <div className="flex items-center">
                                       {lesson.isCompleted && (
                                         <CheckCircle size={16} className="text-green-500 mr-2" />
                                       )}
                                     </div>
                                   </Link>
                                 )}
                               </div>
                             );
                           })}
                           
                           {/* Mostrar quiz del módulo si existe */}
                           {module.quiz && (() => {
                             // Determinar si el quiz está bloqueado
                             let isQuizLocked = true;
                             
                             if (course.settings?.enforceOrder) {
                               // Si el quiz ya está completado, no está bloqueado
                               if (module.quiz.isCompleted) {
                                 isQuizLocked = false;
                               }
                               // Si todas las lecciones del módulo están completadas, el quiz está desbloqueado
                               else if (module.lessons.every(lesson => lesson.isCompleted)) {
                                 isQuizLocked = false;
                               }
                             } else {
                               // Si no se requiere orden, el quiz está desbloqueado
                               isQuizLocked = false;
                             }
                             
                             return (
                               <div className={`flex items-center justify-between p-4 ${module.lessons.length > 0 ? "border-t border-[#E5E5E5]" : ""} ${isQuizLocked ? "opacity-70" : ""} bg-[#FAFCFF]`}>
                                 {isQuizLocked ? (
                                   <div className="flex items-center gap-3 w-full">
                                     <div className="h-10 w-16 rounded-md bg-gray-200 flex items-center justify-center flex-shrink-0">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                         <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                                         <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                       </svg>
                                     </div>
                                     <div className="flex flex-col">
                                       <span className="text-sm text-gray-500">
                                         {module.quiz.title || `Evaluación: ${module.title}`}
                                         <Badge className="ml-2 bg-gray-100 text-gray-500 text-xs">
                                           Quiz
                                         </Badge>
                                       </span>
                                       <span className="text-xs text-gray-400">{module.quiz.questions.length} preguntas • Puntaje mínimo: {module.quiz.passingScore}%</span>
                                     </div>
                                     <div className="ml-auto">
                                       <Badge variant="outline" className="bg-gray-100 text-gray-500 text-xs border-gray-200">
                                         Bloqueado
                                       </Badge>
                                     </div>
                                   </div>
                                 ) : (
                                   <>
                                     <Link 
                                       href={`/course/${course.slug}/${module.quiz.slug || module.quiz.id}`}
                                       className="flex items-center gap-3 hover:text-[#5352F6] transition-colors"
                                     >
                                       <div className="h-10 w-16 rounded-md bg-[#FFF4E5] flex items-center justify-center flex-shrink-0">
                                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
                                           <path d="M9 11l3 3 8-8"/>
                                           <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9"/>
                                         </svg>
                                       </div>
                                       <div className="flex flex-col">
                                         <span className="text-sm font-medium">
                                           {module.quiz.title || `Evaluación: ${module.title}`}
                                           <Badge className="ml-2 bg-amber-100 text-amber-600 text-xs">
                                             Quiz
                                           </Badge>
                                         </span>
                                         <span className="text-xs text-[#6D6C6C]">{module.quiz.questions.length} preguntas • Puntaje mínimo: {module.quiz.passingScore}%</span>
                                       </div>
                                     </Link>
                                     <div className="flex items-center">
                                       {module.quiz.isCompleted && (
                                         <Badge className={`${module.quiz.passed ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"} text-xs mr-2`}>
                                           {module.quiz.passed ? "Aprobado" : "No aprobado"}
                                         </Badge>
                                       )}
                                     </div>
                                   </>
                                 )}
                               </div>
                             );
                           })()}
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
                      <div className="text-4xl font-bold text-[#5352F6]">{(course.stats?.averageRating || 0).toFixed(1)}</div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={i < Math.round(course.stats?.averageRating || 0) ? "text-yellow-400" : "text-gray-300"} 
                            fill={i < Math.round(course.stats?.averageRating || 0) ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                      <div className="mt-1 text-sm text-[#6D6C6C]">{course.stats?.reviewsCount || 0} reseñas</div>
                    </div>
                    
                    <div className="flex-1">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const reviewsCount = course.reviews?.filter(r => Math.round(r.rating) === rating).length || 0;
                        const rc = course.stats?.reviewsCount || 0;
                        const percentage = rc > 0 
                          ? (reviewsCount / rc) * 100 
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
            <div className="sticky top-6 z-10 rounded-lg border border-[#E5E5E5] bg-white p-6 shadow-sm mb-8">
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
                {course.certificate?.available && (
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[#5352F6]" />
                    <span className="text-sm">Certificado de finalización</span>
                  </div>
                )}
                {course.settings?.allowDownloads && (
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[#5352F6]" />
                    <span className="text-sm">Recursos descargables</span>
                  </div>
                )}
              </div>
              
              {isInvestorExclusive ? (
                <Button className="w-full">Soy inversionista, ver curso</Button>
              ) : isEnrolled ? (
                <Link href={`/course/${course.slug}/${course.content.modules[0].lessons[0].slug || course.content.modules[0].lessons[0].id}`} className="w-full">
                  <Button className="w-full">{isCourseCompleted ? 'Ver de nuevo' : 'Continuar curso'}</Button>
                </Link>
              ) : (
                <Link href={`/course/${course.slug}/${course.content.modules[0].lessons[0].slug || course.content.modules[0].lessons[0].id}`} className="w-full">
                  <Button className="w-full">Ver curso</Button>
                </Link>
              )}
            </div>
            
            {/* Instructor */}
            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <h3 className="mb-4 text-lg font-bold">Sobre el instructor</h3>
              
              <div className="mb-6 flex items-center">
                <div className="relative mr-4 h-20 w-20 overflow-hidden border-2 border-[#5352F6]/10 rounded-full shadow-md">
                  {loading ? (
                    <div className="h-full w-full animate-pulse rounded-full bg-gray-200" style={{ animationDuration: '1.2s' }} />
                  ) : course?.instructor?.avatar ? (
                    <Image 
                      src={course.instructor.avatar} 
                      alt={course.instructor.name || 'Instructor LOKL'}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-[#EEEEFE] text-[#5352F6] text-lg font-medium">
                      {(course?.instructor?.name || 'L').charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  {loading ? (
                    <div className="h-4 w-36 animate-pulse rounded bg-gray-200 mb-2" style={{ animationDuration: '1.2s' }} />
                  ) : (
                    <p className="text-lg font-medium text-[#333]">{course?.instructor?.name || 'Instructor LOKL'}</p>
                  )}
                  {loading ? (
                    <div className="h-3 w-48 animate-pulse rounded bg-gray-200" style={{ animationDuration: '1.2s' }} />
                  ) : (
                    <p className="text-sm text-[#6D6C6C]">{course?.instructor?.title || course?.instructor?.expertise?.join(", ") || ''}</p>
                  )}
                </div>
              </div>
              
              {/* Biografía del instructor */}
              {course?.instructor?.bio && (
                <div className="mb-6">
                  <h4 className="mb-2 text-sm font-semibold text-[#333]">Biografía</h4>
                  <p className="text-sm text-[#6D6C6C] leading-relaxed">{course.instructor.bio}</p>
                </div>
              )}
              
              {/* Enlaces sociales */}
              {course?.instructor?.socialLinks && typeof course.instructor.socialLinks === 'object' && Object.keys(course.instructor.socialLinks).length > 0 && (
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-[#333]">Redes sociales</h4>
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(course.instructor.socialLinks).map(([platform, url], index) => (
                      url && (
                        <a 
                          key={index}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-md bg-[#F5F5F5] px-3 py-1.5 text-sm text-[#5352F6] hover:bg-[#EEEEFE] transition-colors"
                        >
                          {platform}
                        </a>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA final */}
      <section className={`${isCourseCompleted ? 'bg-gradient-to-r from-green-600 to-green-700' : 'bg-[#5352F6]'} py-16 text-white`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight">
            {isCourseCompleted 
              ? "¡Felicidades por completar el curso!" 
              : "¿Listo para comenzar tu aprendizaje?"}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg">
            {isCourseCompleted 
              ? "No pares de aprender. Explora más cursos y sigue mejorando tus habilidades con LOKL Academy."
              : isInvestorExclusive 
                ? "Conviértete en inversionista LOKL y desbloquea este y muchos más cursos exclusivos."
                : "Inscríbete ahora y comienza a aprender con este curso gratuito de alta calidad."
            }
          </p>
          <Button size="lg" variant="secondary">
            {isCourseCompleted 
              ? "Explorar más cursos" 
              : isInvestorExclusive 
                ? "Conocer más sobre inversiones LOKL" 
                : "Ver curso ahora"
            }
          </Button>
        </div>
      </section>
    </div>
    </>
  );
}
