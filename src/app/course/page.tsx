"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/design-system";
import HeroSection from "@/components/course/hero-section";
import CourseCard from "@/components/course/course-card";
import CourseSwiper from "@/components/course/course-swiper";
import BenefitsSection from "@/components/course/benefits-section";
import PlanComparison from "@/components/course/plan-comparison";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Componentes nuevos
import LearningPathsSection from "@/components/course/LearningPathsSection";
import ProfilesSection from "@/components/course/ProfilesSection";
import TestimonialsSection from "@/components/course/TestimonialsSection";
import NewsletterSection from "@/components/course/NewsletterSection";
import ToolsSection from "@/components/course/ToolsSection";
import CourseFilters, { FilterOptions } from "@/components/course/CourseFilters";

import { 
  mockCourses, 
  mockLearningPaths, 
  mockLearningProfiles,
  mockExternalTools,
  mockPlatformReviews,
  mockUserProgress
} from "@/lib/course/mock-data";
import { getBlogsLiteAction } from "@/actions/blog-action";
import BlogSection from "@/components/lokl-academy/sections/blog-section";

export default function CoursePage() {
  // Estados
  const [searchTerm, setSearchTerm] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [blogs, setBlogs] = useState<any[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    level: "",
    category: "",
    duration: "",
    featured: false,
    latest: false,
    exclusive: false,
    free: false
  });

  // Cargar blogs
  useEffect(() => {
    async function loadBlogs() {
      try {
        const result = await getBlogsLiteAction({ limit: 4, featured: true });
        setBlogs(result.blogs || []);
      } catch (error) {
        console.error("Error loading blogs:", error);
        setBlogs([]);
      }
    }
    
    loadBlogs();
  }, []);
  
  // Preparar datos para los filtros
  const coursesData = useMemo(() => ({
    recommended: mockCourses.filter(course => course.featured),
    latest: [...mockCourses].sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    ).slice(0, 10),
    exclusive: mockCourses.filter(course => 
      course.accessRequirements.plan === "investor" || course.accessRequirements.plan === "premium"
    ),
    free: mockCourses.filter(course =>
      course.accessRequirements.plan === "basic" || course.accessRequirements.plan === "any"
    )
  }), []);

  // Obtener progreso del usuario
  const userCourseProgress = mockUserProgress.find(progress => progress.courseId);
  const userPathProgress = mockUserProgress.find(progress => progress.pathId);

  // Filtrar cursos basados en los criterios de búsqueda y filtros
  const filteredCourses = useMemo(() => {
    return mockCourses.filter(course => {
      // Filtro de búsqueda
      if (searchTerm && !course.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !course.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Filtro por nivel
      if (filters.level && course.content.difficulty !== filters.level) {
        return false;
      }
      
      // Filtro por categoría
      if (filters.category && course.category.id !== filters.category) {
        return false;
      }
      
      // Filtro por duración
      if (filters.duration) {
        const duration = course.content.totalDuration; // En minutos
        if (filters.duration === 'short' && duration >= 60) return false;
        if (filters.duration === 'medium' && (duration < 60 || duration > 180)) return false;
        if (filters.duration === 'long' && duration <= 180) return false;
      }
      
      // Filtros de tipo
      if (filters.featured && !course.featured) return false;
      if (filters.latest && !coursesData.latest.some(c => c.id === course.id)) return false;
      if (filters.exclusive && !coursesData.exclusive.some(c => c.id === course.id)) return false;
      if (filters.free && !coursesData.free.some(c => c.id === course.id)) return false;
      
      return true;
    });
  }, [searchTerm, filters, coursesData]);

  // Extraer categorías únicas para los filtros
  const categories = useMemo(() => {
    const uniqueCategories = new Map();
    mockCourses.forEach(course => {
      if (!uniqueCategories.has(course.category.id)) {
        uniqueCategories.set(course.category.id, {
          id: course.category.id,
          name: course.category.name
        });
      }
    });
    return Array.from(uniqueCategories.values());
  }, []);

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {/* Hero Section */}
      <HeroSection 
        title="LOKL"
        subtitle="Aprende sobre inversiones inmobiliarias, IA, crowdfunding y más mientras recibes rentas de tus inversiones"
      />

      {/* Explorar contenido con tabs */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Explora contenido educativo
          </h2>
        </div>

        <Tabs defaultValue="todos" className="w-full">
          {/* Navbar y filtros */}
          <div className="bg-white rounded-lg shadow-sm border border-[#E5E5E5] mb-8">
            {/* Header con tabs y buscador */}
            <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Buscador unificado */}
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  placeholder="Buscar cursos..." 
                  className="w-full pl-9 pr-9 py-2 text-sm rounded-lg border border-[#E5E5E5] bg-white focus:outline-none focus:ring-1 focus:ring-[#5352F6]/30 focus:border-[#5352F6]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Buscar cursos"
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    aria-label="Limpiar búsqueda"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              
              {/* Tabs */}
              <TabsList className="flex gap-1 p-1 bg-[#F5F5F5] rounded-md">
                <TabsTrigger value="todos" className="flex items-center gap-1.5 text-sm px-4 py-1.5 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  Todos
                  <span className="rounded-full bg-[#EEEEFE] px-1.5 py-0.5 text-xs font-medium text-[#5352F6]">
                    {mockCourses.length}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="mi-progreso" className="flex items-center gap-1.5 text-sm px-4 py-1.5 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Mi progreso
                  <span className="rounded-full bg-[#EEEEFE] px-1.5 py-0.5 text-xs font-medium text-[#5352F6]">
                    {userCourseProgress ? 1 : 0}
                  </span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Componente de filtros */}
            <CourseFilters 
              onFilterChange={setFilters}
              recommendedCount={coursesData.recommended.length}
              latestCount={coursesData.latest.length}
              exclusiveCount={coursesData.exclusive.length}
              freeCount={coursesData.free.length}
              categories={categories}
            />
          </div>

          {/* Contenido de las tabs */}
          <TabsContent value="mi-progreso" className="mt-6">
            <h3 className="mb-6 text-xl font-bold tracking-tight">Continúa aprendiendo</h3>
            
            <div className="flex flex-col gap-6">
              {/* Cursos en progreso */}
              <div className="w-full">
                <h4 className="text-lg font-semibold">Tus cursos actuales</h4>
                <CourseSwiper>
                  {/* Curso en progreso real */}
                  {userCourseProgress && (
                    <div>
                      <CourseCard 
                        course={mockCourses.find(course => course.id === userCourseProgress.courseId)!}
                        showProgress={true}
                        progress={userCourseProgress}
                        variant="horizontal"
                      />
                    </div>
                  )}
                  
                  {/* Cursos de ejemplo (placeholders) */}
                  <div>
                    <CourseCard 
                      course={mockCourses[1]}
                      showProgress={true}
                      progress={{
                        userId: 'user-1',
                        courseId: mockCourses[1].id,
                        overallProgress: 35,
                        completedLessons: 3,
                        totalLessons: 8,
                        moduleProgress: [],
                        timeSpent: 120,
                        startedAt: '2024-01-15T10:00:00Z',
                        lastAccessedAt: '2024-01-20T14:30:00Z'
                      }}
                      variant="horizontal"
                    />
                  </div>
                  
                  <div>
                    <CourseCard 
                      course={mockCourses[2]}
                      showProgress={true}
                      progress={{
                        userId: 'user-1',
                        courseId: mockCourses[2].id,
                        overallProgress: 15,
                        completedLessons: 1,
                        totalLessons: 6,
                        moduleProgress: [],
                        timeSpent: 45,
                        startedAt: '2024-01-25T16:00:00Z',
                        lastAccessedAt: '2024-01-26T10:15:00Z'
                      }}
                      variant="horizontal"
                    />
                  </div>
                  
                  {/* Tarjeta para explorar más cursos */}
                  <div key="discover-more" className="flex flex-col justify-center items-center rounded-lg border border-dashed border-[#E5E5E5] bg-[#F9F9F9] p-6 text-center">
                    <div className="mb-4 rounded-full bg-[#EEEEFE] p-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#5352F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <h5 className="mb-2 font-medium">Descubre más cursos</h5>
                    <p className="mb-4 text-sm text-[#6D6C6C]">Explora todos nuestros cursos disponibles</p>
                    <Button variant="secondary" size="sm">Ver todos</Button>
                  </div>
                </CourseSwiper>
              </div>
              
              {/* Rutas en progreso */}
              <div className="w-full">
                <h4 className="text-lg font-semibold">Tus rutas actuales</h4>
                <CourseSwiper>
                  {/* Ruta en progreso real */}
                  {userPathProgress && (
                    <div key="user-path">
                      <div className="group relative overflow-hidden rounded-lg border border-[#E5E5E5] bg-white p-4 shadow-sm transition-all hover:shadow-md h-full">
                        <div className="flex items-center justify-between">
                          {/* Información principal */}
                          <div className="flex-1">
                            <div className="mb-1 flex items-center gap-2">
                              <span className="bg-[#EEEEFE] px-2 py-0.5 rounded-full text-xs font-medium text-[#5352F6]">
                                {mockLearningPaths.find(path => path.id === userPathProgress.pathId)?.category.name}
                              </span>
                              <span className="text-xs text-[#6D6C6C]">
                                {mockLearningPaths.find(path => path.id === userPathProgress.pathId)?.structure.estimatedCompletionTime}
                              </span>
                            </div>
                            
                            {/* Título con enlace */}
                            <a href={`/learning-path/${mockLearningPaths.find(path => path.id === userPathProgress.pathId)?.slug}`}>
                              <h4 className="mb-2 text-lg font-bold tracking-tight group-hover:text-[#5352F6]">
                                {mockLearningPaths.find(path => path.id === userPathProgress.pathId)?.title}
                              </h4>
                            </a>
                            
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
                          <a 
                            href={`/learning-path/${mockLearningPaths.find(path => path.id === userPathProgress.pathId)?.slug}`} 
                            className="block w-full"
                          >
                            <Button className="w-full">Continuar ruta</Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Ruta de ejemplo 1 */}
                  <div key="example-path-1">
                    <div className="group relative overflow-hidden rounded-lg border border-[#E5E5E5] bg-white p-4 shadow-sm transition-all hover:shadow-md h-full">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="mb-1 flex items-center gap-2">
                            <span className="bg-[#EEEEFE] px-2 py-0.5 rounded-full text-xs font-medium text-[#5352F6]">
                              {mockLearningPaths[1].category.name}
                            </span>
                            <span className="text-xs text-[#6D6C6C]">
                              {mockLearningPaths[1].structure.estimatedCompletionTime}
                            </span>
                          </div>
                          
                          <a href={`/learning-path/${mockLearningPaths[1].slug}`}>
                            <h4 className="mb-2 text-lg font-bold tracking-tight group-hover:text-[#5352F6]">
                              {mockLearningPaths[1].title}
                            </h4>
                          </a>
                          
                          <div className="flex items-center gap-4 text-xs text-[#6D6C6C]">
                            <div className="flex items-center">
                              <span>1 de {mockLearningPaths[1].courses.length} cursos completados</span>
                            </div>
                          </div>
                        </div>
                        
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
                                strokeDashoffset={251.2 - (251.2 * 20 / 100)}
                                transform="rotate(-90 50 50)"
                                strokeLinecap="round"
                              />
                            </svg>
                            <span className="text-sm font-bold text-[#5352F6]">20%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <a 
                          href={`/learning-path/${mockLearningPaths[1].slug}`} 
                          className="block w-full"
                        >
                          <Button className="w-full">Continuar ruta</Button>
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tarjeta para explorar más rutas */}
                  <div key="discover-more-paths" className="flex flex-col justify-center items-center rounded-lg border border-dashed border-[#E5E5E5] bg-[#F9F9F9] p-6 text-center">
                    <div className="mb-4 rounded-full bg-[#EEEEFE] p-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#5352F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </div>
                    <h5 className="mb-2 font-medium">Descubre más rutas</h5>
                    <p className="mb-4 text-sm text-[#6D6C6C]">Explora todas nuestras rutas de aprendizaje</p>
                    <Button variant="secondary" size="sm">Ver todas</Button>
                  </div>
                </CourseSwiper>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="todos" className="mt-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold tracking-tight">Todos los cursos</h3>
              <div className="text-sm text-[#6D6C6C]">
                Mostrando <span className="font-medium">{filteredCourses.length}</span> de {mockCourses.length} cursos
              </div>
            </div>
            
            {filteredCourses.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#6D6C6C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-2">No se encontraron cursos</h4>
                <p className="text-[#6D6C6C] mb-6">No hay cursos que coincidan con tus criterios de búsqueda.</p>
                <Button 
                  variant="secondary" 
                  onClick={() => {
                    setSearchTerm("");
                    setFilters({
                      level: "",
                      category: "",
                      duration: "",
                      featured: false,
                      latest: false,
                      exclusive: false,
                      free: false
                    });
                  }}
                >
                  Limpiar filtros
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>

      {/* Rutas de aprendizaje */}
      <LearningPathsSection paths={mockLearningPaths} />

      {/* Perfiles de aprendizaje */}
      <ProfilesSection 
        profiles={mockLearningProfiles} 
        userProgress={
          mockLearningProfiles[0] ? {
            profileId: mockLearningProfiles[0].id,
            completedCourses: 1,
            totalCourses: mockLearningProfiles[0].aggregatedStats.totalCourses,
            overallProgress: 33
          } : null
        }
      />

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
      <TestimonialsSection testimonials={mockPlatformReviews} />

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
      <NewsletterSection />

      {/* Herramientas para inversores */}
      <ToolsSection tools={mockExternalTools} />

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