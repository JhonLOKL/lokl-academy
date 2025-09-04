import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Card, CardContent, Input, H2, Paragraph } from "@/components/design-system";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import HeroSection from "@/components/course/hero-section";
import BenefitsSection from "@/components/course/benefits-section";
import CourseCard from "@/components/course/course-card";
import ProfileCard from "@/components/course/profile-card";
// import SubscriptionPlanCard from "@/components/course/subscription-plan-card";
import PlanComparison from "@/components/course/plan-comparison";
// import NewsletterCard from "@/components/course/newsletter-card";
// import ToolCard from "@/components/course/tool-card";
import TestimonialCard from "@/components/course/testimonial-card";
import BlogSection from "@/components/lokl-academy/sections/blog-section";
import { Clock, ExternalLink, Star } from "lucide-react";

import { 
  mockCourses, 
  mockLearningPaths, 
  mockLearningProfiles,
  // mockSubscriptionPlans,
  mockExternalTools,
  // mockNewsletterItems,
  mockPlatformReviews,
  mockUserProgress
} from "@/lib/course/mock-data";
import { getBlogsLiteAction } from "@/actions/blog-action";

export default async function CoursePage() {
  // Obtener blogs desde la API
  const { blogs } = await getBlogsLiteAction({ limit: 4, featured: true });
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
            
            <div className="flex flex-col gap-6">
              {/* Cursos en progreso */}
              <div className="w-full">
                <h4 className="mb-4 text-lg font-semibold">Tus cursos actuales</h4>
                <div className="flex overflow-x-auto pb-4 gap-4">
                  {userCourseProgress ? (
                    <div className="w-full max-w-lg flex-shrink-0">
                      <CourseCard 
                        course={mockCourses.find(course => course.id === userCourseProgress.courseId)!}
                        showProgress={true}
                        progress={userCourseProgress}
                        variant="horizontal"
                      />
                    </div>
                  ) : (
                    <div className="w-full max-w-lg flex-shrink-0 rounded-lg border border-dashed border-[#E5E5E5] bg-[#F9F9F9] p-6 text-center">
                      <p className="mb-4 text-[#6D6C6C]">No has comenzado ningún curso</p>
                      <Button variant="secondary" size="sm">Explorar cursos</Button>
                    </div>
                  )}
                  
                  {/* Aquí se pueden agregar más cursos en progreso */}
                  {/* Ejemplo de otro curso en progreso (comentado) */}
                  {/*
                  <div className="w-full max-w-lg flex-shrink-0">
                    <CourseCard 
                      course={mockCourses[1]}
                      showProgress={true}
                      progress={{ overallProgress: 25, completedLessons: 2, totalLessons: 8 }}
                      variant="horizontal"
                    />
                  </div>
                  */}
                </div>
              </div>
              
              {/* Rutas en progreso */}
              <div className="w-full">
                <h4 className="mb-4 text-lg font-semibold">Tus rutas actuales</h4>
                <div className="flex overflow-x-auto pb-4 gap-4">
                  {userPathProgress ? (
                    <div className="w-full max-w-md flex-shrink-0">
                      <div className="group relative overflow-hidden rounded-lg border border-[#E5E5E5] bg-white p-4 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center justify-between">
                          {/* Información principal */}
                          <div className="flex-1">
                            <div className="mb-1 flex items-center gap-2">
                              <Badge className="bg-[#EEEEFE] text-xs font-medium text-[#5352F6]">
                                {mockLearningPaths.find(path => path.id === userPathProgress.pathId)?.category.name}
                              </Badge>
                              <span className="text-xs text-[#6D6C6C]">
                                {mockLearningPaths.find(path => path.id === userPathProgress.pathId)?.structure.estimatedCompletionTime}
                              </span>
                            </div>
                            
                            {/* Título con enlace */}
                            <Link href={`/learning-path/${mockLearningPaths.find(path => path.id === userPathProgress.pathId)?.slug}`}>
                              <h4 className="mb-2 text-lg font-bold tracking-tight group-hover:text-[#5352F6]">
                                {mockLearningPaths.find(path => path.id === userPathProgress.pathId)?.title}
                              </h4>
                            </Link>
                            
                            <div className="flex items-center gap-4 text-xs text-[#6D6C6C]">
                              <div className="flex items-center">
                                <span>{userPathProgress.moduleProgress.filter(m => m.progress === 100).length} de {mockLearningPaths.find(path => path.id === userPathProgress.pathId)?.courses.length} cursos completados</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Círculo de progreso */}
                          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border border-[#EEEEFE] bg-white">
                            <div className="relative flex h-14 w-14 items-center justify-center rounded-full">
                              <svg className="absolute h-full w-full" viewBox="0 0 100 100">
                                <circle 
                                  cx="50" cy="50" r="40" 
                                  fill="none" 
                                  stroke="#EEEEFE" 
                                  strokeWidth="8"
                                />
                                <circle 
                                  cx="50" cy="50" r="40" 
                                  fill="none" 
                                  stroke="#5352F6" 
                                  strokeWidth="8"
                                  strokeDasharray="251.2"
                                  strokeDashoffset={251.2 - (251.2 * userPathProgress.overallProgress / 100)}
                                  transform="rotate(-90 50 50)"
                                  strokeLinecap="round"
                                />
                              </svg>
                              <span className="text-sm font-bold text-[#5352F6]">{userPathProgress.overallProgress}%</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Botón de acción */}
                        <div className="mt-4">
                          <Link 
                            href={`/learning-path/${mockLearningPaths.find(path => path.id === userPathProgress.pathId)?.slug}`} 
                            className="block w-full"
                          >
                            <Button className="w-full">Continuar ruta</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full max-w-md flex-shrink-0 rounded-lg border border-dashed border-[#E5E5E5] bg-[#F9F9F9] p-6 text-center">
                      <p className="mb-4 text-[#6D6C6C]">No has comenzado ninguna ruta</p>
                      <Button variant="secondary" size="sm">Explorar rutas</Button>
                    </div>
                  )}
                  
                  {/* Aquí se pueden agregar más rutas en progreso */}
                  {/* Ejemplo de otra ruta en progreso (comentado) */}
                  {/*
                  <div className="w-full max-w-md flex-shrink-0">
                    <div className="group relative overflow-hidden rounded-lg border border-[#E5E5E5] bg-white p-4 shadow-sm transition-all hover:shadow-md">
                      ... contenido similar al anterior ...
                    </div>
                  </div>
                  */}
                </div>
              </div>
              
              {/* Mensaje de no contenido eliminado ya que ahora mostramos mensajes separados */}
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

      {/* Blog Section */}
      <section className="bg-[#F5F5F5] py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Blog de LOKL Academy
            </h2>
            <p className="mx-auto max-w-2xl text-[#6D6C6C]">
              Artículos y recursos sobre inversión inmobiliaria, finanzas personales y estrategias para inversionistas
            </p>
          </div>
          <BlogSection blogs={blogs} />
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="bg-gradient-to-br bg-[#5352F6] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/dot-pattern.png')] bg-repeat"></div>
          <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
        </div>
        
        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <H2 className="text-white mb-4">Mantente <span className="text-[#FFD447]">actualizado</span></H2>
            <Paragraph className="text-white/90 text-lg">
              Recibe contenido exclusivo sobre inversión inmobiliaria, estrategias financieras y oportunidades directamente en tu correo.
            </Paragraph>
          </div>
          
          <Card className="max-w-2xl mx-auto border-none shadow-xl overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col gap-6">
                <div>
                  <h4 className="font-bold text-xl mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[#5352F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Newsletter LOKL Academy
                  </h4>
                  <p className="text-[#6D6C6C]">
                    Únete a +3,500 inversionistas que ya reciben nuestro contenido exclusivo
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input 
                    type="email" 
                    placeholder="Tu correo electrónico" 
                    className="flex-1 border-[#E5E5E5] focus:border-[#5352F6]"
                  />
                  <Button size="lg" className="bg-[#5352F6] hover:bg-[#4241E0] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#5352F6]/20">
                    Suscribirme
                  </Button>
                </div>
                
                <div className="flex items-center justify-center gap-6 pt-2 text-sm text-[#6D6C6C]">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Contenido semanal
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Cancela cuando quieras
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Herramientas para inversores */}
      <section className="bg-[#F9F9F9] py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Herramientas <span className="text-[#5352F6]">prácticas</span>
            </h2>
            <p className="mx-auto max-w-2xl text-[#6D6C6C]">
              Potencia tus decisiones de inversión con nuestras herramientas exclusivas
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            {mockExternalTools.map((tool) => (
              <div key={tool.id} className="group relative">
                <Link 
                  href={tool.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  {/* Imagen con overlay */}
                  <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-lg">
                    <Image
                      src={tool.thumbnail.url}
                      alt={tool.thumbnail.alt}
                      fill
                      className="object-cover transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-75"></div>
                    
                    {/* Badge de categoría */}
                    <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-[#0F0F0F]">
                      {tool.category === 'simulator' ? 'Simulador' : 
                       tool.category === 'calculator' ? 'Calculadora' : 
                       tool.category === 'comparator' ? 'Comparador' : 'Herramienta'}
                    </div>
                    
                    {/* Badge premium */}
                    {tool.isPremium && (
                      <div className="absolute right-4 top-4 rounded-full bg-[#5352F6]/90 px-3 py-1 text-sm font-medium text-white">
                        Premium
                      </div>
                    )}
                  </div>
                  
                  {/* Contenido */}
                  <div>
                    <h3 className="mb-2 flex items-center text-xl font-bold tracking-tight transition-colors group-hover:text-[#5352F6]">
                      {tool.name}
                      <ExternalLink size={16} className="ml-2 opacity-50 transition-opacity group-hover:opacity-100" />
                    </h3>
                    <p className="mb-4 text-[#6D6C6C]">
                      {tool.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center">
                        <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#F0F0F0]">
                          <Star size={14} className="text-[#FFD447]" />
                        </div>
                        <span>{tool.stats.userRating.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#F0F0F0]">
                          <Clock size={14} className="text-[#5352F6]" />
                        </div>
                        <span>{tool.stats.averageTimeSpent} min</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
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
