"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/design-system";
import HeroSection from "@/components/course/hero-section";
import CourseCard from "@/components/course/course-card";
import BenefitsSection from "@/components/course/benefits-section";
import PlanComparison from "@/components/course/plan-comparison";
 

// Componentes nuevos
import LearningPathsSection from "@/components/course/LearningPathsSection";
import ProfilesSection from "@/components/course/ProfilesSection";
import TestimonialsSection from "@/components/course/TestimonialsSection";
import NewsletterSection from "@/components/course/NewsletterSection";
import ToolsSection from "@/components/course/ToolsSection";
// import CourseFilters, { FilterOptions } from "@/components/course/CourseFilters";

import { 
  mockLearningPaths, 
  mockLearningProfiles,
  mockExternalTools,
  mockPlatformReviews
} from "@/lib/course/mock-data";
import { getCoursesCards } from "@/lib/course/mock-data-from-api";
import { Course, CourseCardLite, UserProgress } from "@/lib/course/schema";
import { getBlogsLiteAction } from "@/actions/blog-action";
import BlogSection from "@/components/lokl-academy/sections/blog-section";

export default function CoursePage() {
  // Estados
  // const [searchTerm, setSearchTerm] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [blogs, setBlogs] = useState<any[]>([]);
  // const [filters, setFilters] = useState<FilterOptions>({
  //   level: "",
  //   category: "",
  //   duration: "",
  //   featured: false,
  //   latest: false,
  //   exclusive: false,
  //   free: false
  // });

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
  
  // Datos desde la "API" simulada
  const apiCourses = useMemo(() => getCoursesCards.data.courses, []);

  // Derivar listas para "Mi progreso" y "Todos"
  const inProgressCourses = useMemo(
    () => apiCourses.filter(c => c.progress && c.progress.overallProgress > 0),
    [apiCourses]
  );
  const remainingCourses = useMemo(
    () => apiCourses.filter(c => !inProgressCourses.some(ip => ip.id === c.id)),
    [apiCourses, inProgressCourses]
  );

  // Adaptador: CourseCardLite -> Course (para reutilizar el componente CourseCard)
  const mapLiteToCourse = (lite: CourseCardLite): Course => {
    return {
      id: lite.id,
      slug: lite.slug,
      title: lite.title,
      subtitle: lite.subtitle,
      description: lite.description,
      excerpt: lite.excerpt,
      seo: lite.seo,
      content: {
        modules: [],
        totalLessons: lite.progress?.totalLessons ?? 0,
        totalDuration: lite.durationMinutes ?? 0,
        difficulty: 'principiante',
        requirements: [],
        learningObjectives: [],
        skillsYouWillLearn: [],
        targetAudience: [],
      },
      category: lite.category,
      tags: lite.tags,
      instructor: {
        id: lite.instructor.id,
        name: lite.instructor.name,
        slug: lite.instructor.slug,
        bio: lite.instructor.bio,
        avatar: lite.instructor.avatar,
        expertise: [],
      },
      pricing: {
        type: lite.pricing.type,
        price: lite.pricing.price,
        originalPrice: lite.pricing.originalPrice,
        currency: lite.pricing.currency,
      },
      accessRequirements: {
        plan: lite.accessRequirements.plan,
      },
      thumbnail: lite.thumbnail,
      stats: {
        enrolledCount: lite.studentsCount ?? 0,
        completedCount: 0,
        completionRate: 0,
        averageRating: lite.rating ?? 0,
        reviewsCount: 0,
        totalViews: 0,
        averageTimeToComplete: 0,
      },
      certificate: {
        available: false,
        criteria: {
          completionRequired: false,
        },
      },
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'published',
      settings: {
        allowDownloads: false,
        allowDiscussions: false,
        showProgress: true,
        enforceOrder: false,
      },
    };
  };
  
  const mapLiteProgressToUserProgress = (lite: CourseCardLite): UserProgress | undefined => {
    if (!lite.progress) return undefined;
    const started = new Date().toISOString();
    return {
      userId: 'guest',
      courseId: lite.id,
      overallProgress: lite.progress.overallProgress,
      completedLessons: lite.progress.completedLessons,
      totalLessons: lite.progress.totalLessons,
      timeSpent: 0,
      moduleProgress: [],
      startedAt: started,
      lastAccessedAt: started,
    };
  };
  // Paths en progreso se omiten por ahora

  // Filtros deshabilitados temporalmente
  // const filteredCourses = useMemo(() => apiCourses, [apiCourses]);

  // const categories = useMemo(() => [], []);

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {/* Hero Section */}
      <HeroSection 
        title="LOKL"
        subtitle="Aprende sobre inversiones inmobiliarias, IA, crowdfunding y más mientras recibes rentas de tus inversiones"
      />

      {/* Contenido principal */}
      <section className="container mx-auto px-4 py-12">
        {/* Cursos en progreso (si existen) */}
        {inProgressCourses.length > 0 && (
          <div className="mt-6">
            <h3 className="mb-6 text-xl font-bold tracking-tight">Continúa aprendiendo</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {inProgressCourses.map((course) => (
                      <CourseCard 
                  key={course.id} 
                  course={mapLiteToCourse(course)}
                        showProgress={true}
                  progress={mapLiteProgressToUserProgress(course)}
                />
              ))}
                      </div>
                    </div>
                  )}
                  
        {/* Todos los cursos (excluye los ya iniciados) */}
        {apiCourses.length > 0 && remainingCourses.length > 0 && (
          <div className="mt-10">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold tracking-tight">Todos los cursos</h3>
              <div className="text-sm text-[#6D6C6C]">
                Mostrando <span className="font-medium">{remainingCourses.length}</span> de {apiCourses.length} cursos
              </div>
            </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {remainingCourses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={mapLiteToCourse(course)}
                />
                ))}
              </div>
              </div>
            )}
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