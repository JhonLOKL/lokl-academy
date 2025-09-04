"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/design-system";
import HeroSection from "@/components/course/hero-section";
import BenefitsSection from "@/components/course/benefits-section";
import CourseCard from "@/components/course/course-card";
import PathCard from "@/components/course/path-card";
import ProfileCard from "@/components/course/profile-card";
import HorizontalScroll from "@/components/course/horizontal-scroll";
import SubscriptionPlanCard from "@/components/course/subscription-plan-card";
import NewsletterCard from "@/components/course/newsletter-card";
import ToolCard from "@/components/course/tool-card";
import TestimonialCard from "@/components/course/testimonial-card";

import { 
  mockCourses, 
  mockLearningPaths, 
  mockLearningProfiles,
  mockSubscriptionPlans,
  mockExternalTools,
  mockNewsletterItems,
  mockPlatformReviews,
  mockUserProgress,
  mockUserProfile
} from "@/lib/course/mock-data";

export default function CoursePage() {
  // Estado para controlar la carga de la página
  const [isLoading, setIsLoading] = useState(true);

  // Simular carga de datos
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

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

  // Obtener el plan actual del usuario
  const currentUserPlan = mockSubscriptionPlans.find(plan => plan.slug === mockUserProfile.plan);

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {/* Hero Section */}
      <HeroSection 
        title="LOKL"
        subtitle="Aprende sobre inversiones inmobiliarias, IA, crowdfunding y más mientras recibes rentas de tus inversiones"
      />

      {/* Sección de cursos en progreso */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">
          Continúa aprendiendo
        </h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Curso en progreso */}
          {userCourseProgress && (
            <div className="col-span-full lg:col-span-2">
              <h3 className="mb-4 text-lg font-semibold">Tu curso actual</h3>
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
            <div className="col-span-full lg:col-span-1">
              <h3 className="mb-4 text-lg font-semibold">Tu ruta actual</h3>
              <PathCard 
                path={mockLearningPaths.find(path => path.id === userPathProgress.pathId)!}
                userProgress={userPathProgress}
                variant="detailed"
              />
            </div>
          )}
        </div>
      </section>

      {/* Cursos recomendados */}
      <section className="container mx-auto px-4 py-8">
        <HorizontalScroll title="Cursos recomendados para ti" subtitle="Seleccionados según tus intereses y nivel">
          {recommendedCourses.map((course) => (
            <div key={course.id} className="min-w-[300px] max-w-[350px] flex-shrink-0">
              <CourseCard course={course} />
            </div>
          ))}
        </HorizontalScroll>
      </section>

      {/* Últimos cursos */}
      <section className="container mx-auto px-4 py-8">
        <HorizontalScroll title="Últimos cursos" subtitle="Las novedades más recientes en nuestra plataforma">
          {latestCourses.map((course) => (
            <div key={course.id} className="min-w-[300px] max-w-[350px] flex-shrink-0">
              <CourseCard course={course} />
            </div>
          ))}
        </HorizontalScroll>
      </section>

      {/* Cursos exclusivos para inversionistas */}
      <section className="container mx-auto px-4 py-8">
        <HorizontalScroll title="Cursos exclusivos para inversionistas" subtitle="Contenido premium solo para miembros con plan Inversionista o Premium">
          {exclusiveCourses.map((course) => (
            <div key={course.id} className="min-w-[300px] max-w-[350px] flex-shrink-0">
              <CourseCard course={course} />
            </div>
          ))}
        </HorizontalScroll>
      </section>

      {/* Sección de beneficios */}
      <BenefitsSection />

      {/* Planes de suscripción */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Planes de suscripción
            </h2>
            <p className="mx-auto max-w-2xl text-[#6D6C6C]">
              Elige el plan que mejor se adapte a tus objetivos de inversión y aprendizaje
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {mockSubscriptionPlans.map((plan) => (
              <SubscriptionPlanCard 
                key={plan.id} 
                plan={plan} 
                isCurrentPlan={plan.slug === mockUserProfile.plan}
              />
            ))}
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
