"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/design-system";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import HeroSection from "@/components/course/hero-section";
import BenefitsSection from "@/components/course/benefits-section";
import CourseCard from "@/components/course/course-card";
import ProfileCard from "@/components/course/profile-card";
// import SubscriptionPlanCard from "@/components/course/subscription-plan-card";
import PlanComparison from "@/components/course/plan-comparison";
import NewsletterCard from "@/components/course/newsletter-card";
import ToolCard from "@/components/course/tool-card";
import TestimonialCard from "@/components/course/testimonial-card";
import { Clock, ChevronDown } from "lucide-react";

import { 
  mockCourses, 
  mockLearningPaths, 
  mockLearningProfiles,
  // mockSubscriptionPlans,
  mockExternalTools,
  mockNewsletterItems,
  mockPlatformReviews,
  mockUserProgress
} from "@/lib/course/mock-data";

export default function CoursePage() {
  // Filtrar cursos por categorías
  const recommendedCourses = mockCourses.filter(course => course.featured);
  const latestCourses = [...mockCourses].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  const exclusiveCourses = mockCourses.filter(course => 
    course.accessRequirements.plan === "investor" || course.accessRequirements.plan === "premium"
  );

  // Obtener progreso del usuario
  const userCourseProgress = mockUserProgress.find(progress => progress.courseId);
  const userPathProgress = mockUserProgress.find(progress => progress.pathId);

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {/* Hero Section */}
      <HeroSection 
        title="LOKL"
        subtitle="Aprende sobre inversiones inmobiliarias, IA, crowdfunding y más mientras recibes rentas de tus inversiones"
      />


      {/* Explorar contenido con tabs */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">
          Explora contenido educativo
        </h2>

        <Tabs defaultValue="mi-progreso" className="w-full">
          <div className="mb-6 overflow-x-auto">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="mi-progreso" className="flex items-center gap-2">
                Mi progreso
                <span className="rounded-full bg-[#EEEEFE] px-2 py-0.5 text-xs font-medium text-[#5352F6]">
                  {userCourseProgress ? 1 : 0}
                </span>
              </TabsTrigger>
              <TabsTrigger value="recomendados" className="flex items-center gap-2">
                Recomendados
                <span className="rounded-full bg-[#EEEEFE] px-2 py-0.5 text-xs font-medium text-[#5352F6]">
                  {recommendedCourses.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="ultimos" className="flex items-center gap-2">
                Últimos cursos
                <span className="rounded-full bg-[#EEEEFE] px-2 py-0.5 text-xs font-medium text-[#5352F6]">
                  {latestCourses.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="exclusivos" className="flex items-center gap-2">
                Para inversionistas
                <span className="rounded-full bg-[#EEEEFE] px-2 py-0.5 text-xs font-medium text-[#5352F6]">
                  {exclusiveCourses.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="todos" className="flex items-center gap-2">
                Todos los cursos
                <span className="rounded-full bg-[#EEEEFE] px-2 py-0.5 text-xs font-medium text-[#5352F6]">
                  {mockCourses.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="rutas" className="flex items-center gap-2">
                Rutas de aprendizaje
                <span className="rounded-full bg-[#EEEEFE] px-2 py-0.5 text-xs font-medium text-[#5352F6]">
                  {mockLearningPaths.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="perfiles" className="flex items-center gap-2">
                Perfiles de aprendizaje
                <span className="rounded-full bg-[#EEEEFE] px-2 py-0.5 text-xs font-medium text-[#5352F6]">
                  {mockLearningProfiles.length}
                </span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Contenido de las tabs */}
          <TabsContent value="mi-progreso" className="mt-6">
            <h3 className="mb-6 text-xl font-bold tracking-tight">Continúa aprendiendo</h3>
            
            <div className="grid gap-8 md:grid-cols-12">
              {/* Curso en progreso */}
              {userCourseProgress && (
                <div className="md:col-span-7">
                  <h4 className="mb-4 text-lg font-semibold">Tu curso actual</h4>
                  <CourseCard 
                    course={mockCourses.find(course => course.id === userCourseProgress.courseId)!}
                    showProgress={true}
                    progress={userCourseProgress}
                    variant="horizontal"
                  />
                </div>
              )}
              
              {/* Ruta en progreso */}
              {userPathProgress && (
                <div className="md:col-span-5">
                  <h4 className="mb-4 text-lg font-semibold">Tu ruta actual</h4>
                  <div className="group relative overflow-hidden rounded-lg border border-[#E5E5E5] bg-white transition-all hover:bg-[#FAFAFA]">
                    {/* Barra lateral de color */}
                    <div className="absolute left-0 top-0 h-full w-1.5 bg-[#5352F6]"></div>
                    
                    <div className="p-5 pl-8">
                      {/* Encabezado con badge y tiempo estimado */}
                      <div className="mb-4 flex items-center justify-between">
                        <Badge className="bg-[#EEEEFE] text-xs font-medium text-[#5352F6]">
                          {mockLearningPaths.find(path => path.id === userPathProgress.pathId)?.category.name}
                        </Badge>
                        <div className="flex items-center rounded-full bg-[#F5F5F5] px-3 py-1 text-xs text-[#6D6C6C]">
                          <Clock size={14} className="mr-1 text-[#5352F6]" />
                          {mockLearningPaths.find(path => path.id === userPathProgress.pathId)?.structure.estimatedCompletionTime}
                        </div>
                      </div>
                      
                      {/* Título con enlace */}
                      <Link href={`/learning-path/${mockLearningPaths.find(path => path.id === userPathProgress.pathId)?.slug}`}>
                        <h4 className="mb-2 text-lg font-bold tracking-tight group-hover:text-[#5352F6]">
                          {mockLearningPaths.find(path => path.id === userPathProgress.pathId)?.title}
                        </h4>
                      </Link>
                      
                      {/* Métricas de progreso */}
                      <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-[#6D6C6C]">
                        <div className="flex items-center">
                          <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#EEEEFE] text-[#5352F6]">
                            {userPathProgress.moduleProgress.filter(m => m.progress === 100).length}
                          </div>
                          <span>de {mockLearningPaths.find(path => path.id === userPathProgress.pathId)?.courses.length} cursos completados</span>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#EEEEFE] text-[#5352F6]">
                            {userPathProgress.overallProgress}%
                          </div>
                          <span>progreso total</span>
                        </div>
                      </div>
                      
                      {/* Barra de progreso */}
                      <div className="mb-4">
                        <Progress value={userPathProgress.overallProgress} className="h-2" />
                      </div>
                      
                      {/* Cursos próximos */}
                      <div className="mb-4">
                        <h5 className="mb-2 text-xs font-semibold">Próximo curso a completar:</h5>
                        <div className="space-y-2">
                          {mockLearningPaths.find(path => path.id === userPathProgress.pathId)?.courses
                            .filter(c => !userPathProgress.moduleProgress.some(m => m.moduleId === c.courseId && m.progress === 100))
                            .slice(0, 1)
                            .map((courseItem, index) => (
                              <div key={courseItem.courseId} className="flex items-center rounded-md bg-[#F9F9F9] p-2">
                                <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#5352F6]/10 text-xs text-[#5352F6]">
                                  {index + 1}
                                </div>
                                <span className="flex-1 text-xs font-medium line-clamp-1">
                                  {courseItem.course?.title || `Curso ${index + 1}`}
                                </span>
                                <div className="ml-2 rounded-full bg-[#5352F6]/10 px-2 py-0.5 text-xs text-[#5352F6]">
                                  Siguiente
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                      
                      {/* Botones de acción */}
                      <div className="flex gap-2">
                        <Link 
                          href={`/learning-path/${mockLearningPaths.find(path => path.id === userPathProgress.pathId)?.slug}`} 
                          className="block flex-1"
                        >
                          <Button className="w-full">Continuar</Button>
                        </Link>
                        <button 
                          className="flex items-center justify-center rounded-md border border-[#E5E5E5] bg-white px-3 py-2 text-sm font-medium text-[#0F0F0F] transition-colors hover:bg-[#EEEEFE] hover:text-[#5352F6]"
                        >
                          <ChevronDown size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {!userCourseProgress && !userPathProgress && (
                <div className="col-span-12 rounded-lg border border-dashed border-[#E5E5E5] bg-[#F9F9F9] p-8 text-center">
                  <p className="mb-4 text-[#6D6C6C]">Aún no has comenzado ningún curso o ruta de aprendizaje</p>
                  <Button variant="secondary">Explorar contenido</Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="recomendados" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {recommendedCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ultimos" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {latestCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="exclusivos" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {exclusiveCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="todos" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {mockCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rutas" className="mt-6">
            <div className="space-y-8">
              {mockLearningPaths.map((path) => (
                <div key={path.id} className="group relative overflow-hidden rounded-lg bg-white p-0 transition-all hover:bg-[#FAFAFA]">
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
                          
                          <p className="mb-4 text-sm text-[#6D6C6C]">
                            {path.excerpt}
                          </p>
                          
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
                                <span 
                                  key={index} 
                                  className="rounded-full bg-[#F5F5F5] px-3 py-1 text-xs"
                                >
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
          </TabsContent>

          <TabsContent value="perfiles" className="mt-6">
            <div className="grid gap-6 md:grid-cols-3">
              {mockLearningProfiles.map((profile) => (
                <ProfileCard 
                  key={profile.id} 
                  profile={profile} 
                  userProgress={
                    profile.id === 'profile-1' ? 
                    {
                      completedCourses: 1,
                      totalCourses: profile.aggregatedStats.totalCourses,
                      overallProgress: 33
                    } : undefined
                  }
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>


      {/* Sección de beneficios */}
      <BenefitsSection />

      {/* Comparación de planes */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Planes de acceso
            </h2>
            <p className="mx-auto max-w-2xl text-[#6D6C6C]">
              Descubre las ventajas de ser inversionista LOKL y accede a contenido exclusivo
            </p>
          </div>

          <PlanComparison />
          
          <div className="mt-8 text-center">
            <p className="text-[#6D6C6C]">¿Tienes dudas sobre nuestros planes? <a href="#" className="text-[#5352F6] hover:underline">Contáctanos</a></p>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Lo que dicen nuestros estudiantes
          </h2>
          <p className="mx-auto max-w-2xl text-[#6D6C6C]">
            Experiencias reales de inversores que han transformado su futuro financiero con LOKL Academy
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockPlatformReviews.map((review) => (
            <TestimonialCard key={review.id} testimonial={{
              id: review.id,
              userName: review.userName,
              userAvatar: review.userAvatar,
              userTitle: review.userTitle,
              content: review.comment,
              rating: review.rating,
              featured: review.featured,
              createdAt: review.createdAt
            }} />
          ))}
        </div>
      </section>

      {/* Perfiles de aprendizaje */}
      <section className="bg-[#F5F5F5] py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Perfiles de aprendizaje
            </h2>
            <p className="mx-auto max-w-2xl text-[#6D6C6C]">
              Rutas estructuradas para diferentes niveles de experiencia en inversión inmobiliaria
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {mockLearningProfiles.map((profile) => (
              <ProfileCard 
                key={profile.id} 
                profile={profile} 
                userProgress={
                  profile.id === 'profile-1' ? 
                  {
                    completedCourses: 1,
                    totalCourses: profile.aggregatedStats.totalCourses,
                    overallProgress: 33
                  } : undefined
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tendencias y Newsletter */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Tendencias actuales
          </h2>
          <p className="max-w-2xl text-[#6D6C6C]">
            Mantente al día con las últimas novedades del sector inmobiliario y financiero
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockNewsletterItems.map((item) => (
            <NewsletterCard key={item.id} item={item} />
          ))}
          <div className="rounded-lg border border-[#E5E5E5] bg-white p-6 md:col-span-2 lg:col-span-1">
            <h3 className="mb-4 text-xl font-bold">Suscríbete a nuestro newsletter</h3>
            <p className="mb-4 text-[#6D6C6C]">
              Recibe las últimas tendencias y oportunidades directamente en tu correo
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="flex-1 rounded-md border border-[#E5E5E5] px-4 py-2 focus:border-[#5352F6] focus:outline-none focus:ring-1 focus:ring-[#5352F6]"
              />
              <Button>Suscribirme</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Herramientas externas */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Herramientas para inversores
            </h2>
            <p className="max-w-2xl text-[#6D6C6C]">
              Complementa tu aprendizaje con estas herramientas prácticas para tus inversiones
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {mockExternalTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
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
          <Button size="lg">Explorar todos los cursos</Button>
        </div>
      </section>
    </div>
  );
}
