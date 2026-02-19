"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/design-system";
import HeroSection from "@/components/course/hero-section";
import CourseCard from "@/components/course/course-card";
import BenefitsSection from "@/components/course/benefits-section";
import PlanComparison from "@/components/course/plan-comparison";
import { Skeleton } from "@/components/ui/skeleton";
import { Award, Star, User } from "lucide-react"; 
 

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
import { Course } from "@/lib/course/schema";
import { getAllCoursesAction, getUserCoursesAction } from "@/actions/course-action";
import { useAuthStore } from "@/store/auth-store";
import { getBlogsLiteAction } from "@/actions/blog-action";
import BlogSection from "@/components/lokl-academy/sections/blog-section";
import { getPlanDisplayName, type UserPlanType } from "@/helpers/course-access";

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
  
  const { token, user } = useAuthStore();
  const userPlan: UserPlanType = (user?.planType as UserPlanType) || 'basic';

  const [userCourses, setUserCourses] = useState<Course[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function loadCourses() {
      setLoadingCourses(true);
      try {
        const [allRes, userRes] = await Promise.all([
          getAllCoursesAction(),
          token ? getUserCoursesAction() : Promise.resolve({ success: true, data: [] as Course[] })
        ]);
        if (!mounted) return;
        if (allRes.success) setAllCourses(allRes.data || []);
        if (userRes.success) setUserCourses(userRes.data || []);
      } catch {
        if (!mounted) return;
        setAllCourses([]);
        setUserCourses([]);
      } finally {
        if (mounted) setLoadingCourses(false);
      }
    }
    loadCourses();
    return () => { mounted = false; };
  }, [token]);

  const inProgressCourses = useMemo(() => userCourses, [userCourses]);
  const remainingCourses = useMemo(
    () => allCourses.filter(c => !inProgressCourses.some(uc => uc.id === c.id)),
    [allCourses, inProgressCourses]
  );
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
        {/* Banner de plan del usuario */}
        {user && (
          <div className="mb-10 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
            <div className={`h-1.5 w-full ${
              userPlan === 'investor' ? 'bg-[#5352F6]' :
              userPlan === 'premium' ? 'bg-amber-500' :
              'bg-gray-300'
            }`} />
            <div className="p-6 sm:flex sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${
                  userPlan === 'investor' ? 'bg-[#5352F6]/10 text-[#5352F6]' :
                  userPlan === 'premium' ? 'bg-amber-100 text-amber-600' :
                  'bg-gray-100 text-gray-500'
                }`}>
                  {userPlan === 'investor' ? <Award size={24} /> : 
                   userPlan === 'premium' ? <Star size={24} /> : 
                   <User size={24} />}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Plan actual</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold text-gray-900">
                      {getPlanDisplayName(userPlan)}
                    </h3>
                    {userPlan !== 'investor' && (
                      <span className="text-sm text-gray-400">•</span>
                    )}
                    <p className="text-sm text-gray-600">
                      {userPlan === 'investor' && 'Acceso total a todos los cursos y herramientas.'}
                      {userPlan === 'premium' && 'Acceso a cursos Premium y contenido exclusivo.'}
                      {userPlan === 'basic' && 'Explora nuestros cursos gratuitos o mejora tu plan.'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 sm:mt-0 sm:ml-6">
                {userPlan === 'basic' && (
                  <Button 
                    onClick={() => document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full sm:w-auto"
                  >
                    Mejorar Plan
                  </Button>
                )}
                {userPlan !== 'basic' && (
                  <div className="rounded-lg bg-gray-50 px-3 py-2 text-center sm:text-right">
                    <p className="text-xs font-medium text-gray-500">Estado</p>
                    <p className="text-sm font-bold text-green-600">Activo</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Cursos en progreso (si existen) */}
        {loadingCourses ? (
          <div className="mt-6">
            <h3 className="mb-6 text-xl font-bold tracking-tight">Cargando cursos...</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="overflow-hidden rounded-lg border border-[#E5E5E5] bg-white shadow-sm">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-4">
                    <Skeleton className="mb-2 h-4 w-24" />
                    <Skeleton className="mb-2 h-6 w-full" />
                    <Skeleton className="mb-4 h-4 w-3/4" />
                    <Skeleton className="mb-3 h-4 w-32" />
                    <Skeleton className="h-2 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {inProgressCourses.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-6 text-xl font-bold tracking-tight">Continúa aprendiendo</h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {inProgressCourses.map((course) => (
                    <CourseCard key={course.id} course={course} showProgress={true} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Todos los cursos (excluye los ya iniciados) */}
            {allCourses.length > 0 && remainingCourses.length > 0 && (
              <div className="mt-10">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-bold tracking-tight">Todos los cursos</h3>
                  <div className="text-sm text-[#6D6C6C]">
                    Mostrando <span className="font-medium">{remainingCourses.length}</span> de {allCourses.length} cursos
                  </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {remainingCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>
            )}
          </>
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
      <section id="planes" className="bg-white py-16 scroll-mt-20">
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