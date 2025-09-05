"use client";

import React, { useState, useEffect } from "react";
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
import CourseSwiper from "@/components/course/course-swiper";
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

export default function CoursePage() {
  // Estado para mostrar/ocultar filtros en móvil
  const [showFilters, setShowFilters] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [blogs, setBlogs] = useState<any[]>([]);
  
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
  const coursesData = {
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
  };

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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Explora contenido educativo
          </h2>
          
          {/* Buscador de cursos */}
          <div className="relative w-full md:w-auto md:min-w-[300px]">
            <div className="flex items-center relative">
              <input 
                type="text" 
                placeholder="Buscar cursos..." 
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#5352F6]/30 focus:border-[#5352F6]"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <Tabs defaultValue="todos" className="w-full">
          {/* Navbar y filtros */}
          <div className="bg-white rounded-lg shadow-sm border border-[#E5E5E5] mb-8">
            {/* Header con tabs */}
            <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Buscador */}
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  placeholder="Buscar cursos..." 
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-[#E5E5E5] bg-white focus:outline-none focus:ring-1 focus:ring-[#5352F6]/30 focus:border-[#5352F6]"
                />
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
            
            {/* Botón de filtros (visible en móvil) */}
            <div className="p-4 border-t border-[#E5E5E5] flex justify-between items-center md:hidden">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1.5 text-sm font-medium text-[#5352F6]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
                <span className="ml-1 rounded-full bg-[#EEEEFE] px-1.5 py-0.5 text-xs font-medium text-[#5352F6]">
                  {coursesData.recommended.length + coursesData.latest.length + coursesData.exclusive.length + coursesData.free.length}
                </span>
              </button>
              
              {/* Indicador de filtros activos */}
              <div className="flex items-center gap-1 text-xs text-[#6D6C6C]">
                <span className="rounded-full h-2 w-2 bg-[#5352F6]"></span>
                Filtros activos
              </div>
            </div>
            
            {/* Filtros (ocultos en móvil por defecto) */}
            <div className={`border-t border-[#E5E5E5] ${showFilters ? 'block' : 'hidden'} md:block`}>
              {/* Filtros tipo chip */}
              <div className="p-4 flex flex-wrap items-center gap-3">
                <button className="inline-flex items-center gap-1.5 rounded-full bg-[#5352F6] px-3 py-1 text-xs font-medium text-white hover:bg-[#4241E0] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  Recomendados
                  <span className="ml-1 rounded-full bg-white/20 px-1 py-0.5 text-xs font-medium text-white">
                    {coursesData.recommended.length}
                  </span>
                </button>
                <button className="inline-flex items-center gap-1.5 rounded-full bg-[#F5F5F5] px-3 py-1 text-xs font-medium text-[#6D6C6C] hover:bg-[#EEEEFE] hover:text-[#5352F6] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Últimos
                  <span className="ml-1 rounded-full bg-white px-1 py-0.5 text-xs font-medium text-[#6D6C6C]">
                    {coursesData.latest.length}
                  </span>
                </button>
                <button className="inline-flex items-center gap-1.5 rounded-full bg-[#F5F5F5] px-3 py-1 text-xs font-medium text-[#6D6C6C] hover:bg-[#EEEEFE] hover:text-[#5352F6] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Inversionistas
                  <span className="ml-1 rounded-full bg-white px-1 py-0.5 text-xs font-medium text-[#6D6C6C]">
                    {coursesData.exclusive.length}
                  </span>
                </button>
                <button className="inline-flex items-center gap-1.5 rounded-full bg-[#F5F5F5] px-3 py-1 text-xs font-medium text-[#6D6C6C] hover:bg-[#EEEEFE] hover:text-[#5352F6] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Gratis
                  <span className="ml-1 rounded-full bg-white px-1 py-0.5 text-xs font-medium text-[#6D6C6C]">
                    {coursesData.free.length}
                  </span>
                </button>
                
                <div className="mt-3 md:mt-0 md:ml-auto flex flex-wrap gap-2 w-full md:w-auto">
                  {/* Filtro por nivel */}
                  <select className="text-xs border border-[#E5E5E5] rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-[#5352F6]/20 focus:border-[#5352F6] appearance-none">
                    <option value="">Nivel: Todos</option>
                    <option value="principiante">Principiante</option>
                    <option value="intermedio">Intermedio</option>
                    <option value="avanzado">Avanzado</option>
                  </select>
                  
                  {/* Filtro por categoría */}
                  <select className="text-xs border border-[#E5E5E5] rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-[#5352F6]/20 focus:border-[#5352F6] appearance-none">
                    <option value="">Categoría: Todas</option>
                    <option value="inmobiliaria">Inversión Inmobiliaria</option>
                    <option value="finanzas">Finanzas Personales</option>
                    <option value="crowdfunding">Crowdfunding</option>
                    <option value="ia">Inteligencia Artificial</option>
                  </select>
                  
                  {/* Filtro por duración */}
                  <select className="text-xs border border-[#E5E5E5] rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-[#5352F6]/20 focus:border-[#5352F6] appearance-none">
                    <option value="">Duración: Cualquiera</option>
                    <option value="short">Corta (menos de 1h)</option>
                    <option value="medium">Media (1-3h)</option>
                    <option value="long">Larga (más de 3h)</option>
                  </select>
                </div>
              </div>
            </div>
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
                  <div className="flex flex-col justify-center items-center rounded-lg border border-dashed border-[#E5E5E5] bg-[#F9F9F9] p-6 text-center">
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
                    <div>
                      <div className="group relative overflow-hidden rounded-lg border border-[#E5E5E5] bg-white p-4 shadow-sm transition-all hover:shadow-md h-full">
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
                  )}
                  
                  {/* Ruta de ejemplo 1 */}
                  <div>
                    <div className="group relative overflow-hidden rounded-lg border border-[#E5E5E5] bg-white p-4 shadow-sm transition-all hover:shadow-md h-full">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="mb-1 flex items-center gap-2">
                            <Badge className="bg-[#EEEEFE] text-xs font-medium text-[#5352F6]">
                              {mockLearningPaths[1].category.name}
                            </Badge>
                            <span className="text-xs text-[#6D6C6C]">
                              {mockLearningPaths[1].structure.estimatedCompletionTime}
                            </span>
                          </div>
                          
                          <Link href={`/learning-path/${mockLearningPaths[1].slug}`}>
                            <h4 className="mb-2 text-lg font-bold tracking-tight group-hover:text-[#5352F6]">
                              {mockLearningPaths[1].title}
                            </h4>
                          </Link>
                          
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
                        <Link 
                          href={`/learning-path/${mockLearningPaths[1].slug}`} 
                          className="block w-full"
                        >
                          <Button className="w-full">Continuar ruta</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  {/* Ruta de ejemplo 2 */}
                  <div>
                    <div className="group relative overflow-hidden rounded-lg border border-[#E5E5E5] bg-white p-4 shadow-sm transition-all hover:shadow-md h-full">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="mb-1 flex items-center gap-2">
                            <Badge className="bg-[#EEEEFE] text-xs font-medium text-[#5352F6]">
                              {mockLearningPaths[0].category.name}
                            </Badge>
                            <span className="text-xs text-[#6D6C6C]">
                              {mockLearningPaths[0].structure.estimatedCompletionTime}
                            </span>
                          </div>
                          
                          <Link href={`/learning-path/${mockLearningPaths[0].slug}`}>
                            <h4 className="mb-2 text-lg font-bold tracking-tight group-hover:text-[#5352F6]">
                              {mockLearningPaths[0].title}
                            </h4>
                          </Link>
                          
                          <div className="flex items-center gap-4 text-xs text-[#6D6C6C]">
                            <div className="flex items-center">
                              <span>2 de {mockLearningPaths[0].courses.length} cursos completados</span>
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
                                strokeDashoffset={251.2 - (251.2 * 40 / 100)}
                                transform="rotate(-90 50 50)"
                                strokeLinecap="round"
                              />
                            </svg>
                            <span className="text-sm font-bold text-[#5352F6]">40%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <Link 
                          href={`/learning-path/${mockLearningPaths[0].slug}`} 
                          className="block w-full"
                        >
                          <Button className="w-full">Continuar ruta</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tarjeta para explorar más rutas */}
                  <div className="flex flex-col justify-center items-center rounded-lg border border-dashed border-[#E5E5E5] bg-[#F9F9F9] p-6 text-center">
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
              
              {/* Mensaje de no contenido eliminado ya que ahora mostramos mensajes separados */}
            </div>
          </TabsContent>

          <TabsContent value="todos" className="mt-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold tracking-tight">Todos los cursos</h3>
              <div className="text-sm text-[#6D6C6C]">
                Mostrando <span className="font-medium">{mockCourses.length}</span> cursos
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {mockCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          

          
        </Tabs>
      </section>

      {/* Rutas de aprendizaje (siempre visible) */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">
          Rutas de aprendizaje
        </h2>
        <div className="space-y-8">
          {mockLearningPaths.map((path) => (
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

      {/* Perfiles de aprendizaje (siempre visible) */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">
          Perfiles de aprendizaje
        </h2>
        <CourseSwiper
          slidesPerView={1}
          spaceBetween={32}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1.05,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 1.2,
              spaceBetween: 40,
            },
            1440: {
              slidesPerView: 1.5,
              spaceBetween: 50,
            },
            1800: {
              slidesPerView: 1.8,
              spaceBetween: 60,
            },
          }}
        >
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
        </CourseSwiper>
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
