"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ImageWithFallback } from './image-with-fallback';
import { Clock, ChevronRight, Award, Loader2, Lock } from 'lucide-react';
import { getAllCoursesAction } from '@/actions/course-action';
import type { Course } from '@/lib/course/schema';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth-store';
import {
  canUserViewCourse,
  getCourseAccessLabel,
  getAccessBadgeClasses,
  calculatePrincingForUser,
  type UserPlanType,
} from '@/helpers/course-access';

export default function CursosTab() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();
  const userPlan: UserPlanType = (user?.plan as UserPlanType) || 'none';
  const isInvestor = !!user?.isInvestor || userPlan === 'investor';
  const userContext = { plan: userPlan, isInvestor };

  useEffect(() => {
    async function loadCourses() {
      try {
        setLoading(true);
        const result = await getAllCoursesAction();
        if (result.success) {
          // Mostrar solo los primeros 4 cursos
          setCourses((result.data || []).slice(0, 4));
          setError(null);
        } else {
          setError(result.error || 'Error al cargar los cursos');
          setCourses([]);
        }
      } catch (err) {
        console.error('Error loading courses:', err);
        setError('Error al cargar los cursos');
        setCourses([]);
      } finally {
        setLoading(false);
      }
    }

    loadCourses();
  }, []);

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) return `${hours} h`;
    return `${hours} h ${remainingMinutes} min`;
  };

  if (loading) {
    return (
      <div className="animate-fade-in flex items-center justify-center py-12">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Cargando cursos...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="animate-fade-in text-center py-12">
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="border-[#5352F6]/20 text-[#5352F6] hover:bg-[#5352F6]/5"
        >
          Reintentar
        </Button>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="animate-fade-in text-center py-12">
        <p className="text-muted-foreground">No hay cursos disponibles en este momento.</p>
      </div>
    );
  }
  return (
    <div className="animate-fade-in space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        {courses.map((course) => {
          const courseHasAccess = canUserViewCourse(userContext, course.accessRequirements);
          const isLoggedIn = !!user;
          const isCourseLocked = isLoggedIn && !courseHasAccess;

          const princing = course.princing;
          const princingResult = calculatePrincingForUser(userContext, princing);
          const price = princingResult.price;

          const label = getCourseAccessLabel(userContext, princing, course.accessRequirements);
          const labelClasses = getAccessBadgeClasses(label.variant);

          return (
            <Card key={course.id} className={`overflow-hidden transition-shadow group cursor-pointer p-0 ${isCourseLocked ? 'opacity-80' : 'hover:shadow-lg'}`}>
              <div className="relative h-56 overflow-hidden">
                <ImageWithFallback
                  src={course.coverImage?.url || course.thumbnail?.url || '/images/course/placeholder.jpg'}
                  alt={course.coverImage?.alt || course.thumbnail?.alt || course.title}
                  className={`w-full h-full object-cover transition-transform duration-300 ${isCourseLocked ? 'grayscale' : 'group-hover:scale-105'}`}
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  <Badge className={labelClasses}>
                    {label.label}
                  </Badge>
                  {course.certificate && (
                    <Badge className="bg-[#5352F6] text-primary-foreground flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      Certificado
                    </Badge>
                  )}
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  {isCourseLocked && (
                    <div className="bg-red-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                      <Lock className="h-3 w-3" />
                      <span>Bloqueado</span>
                    </div>
                  )}
                  <div className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatDuration(course.content?.totalDuration || 0)}</span>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h4 className="font-bold text-foreground group-hover:text-[#5352F6] transition-colors">
                  {course.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {course.description || course.excerpt || 'Descubre más sobre este curso y mejora tus habilidades de inversión.'}
                </p>

                {/* Pricing visible */}
                {price != null && price > 0 && (
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-gray-900">
                      ${price.toLocaleString('es-CO')}
                    </span>
                    {princing?.originalPrice != null && princing.originalPrice > price && (
                      <span className="text-sm text-gray-400 line-through">
                        ${princing.originalPrice.toLocaleString('es-CO')}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-3 pt-3 border-t border-border/40">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={course.instructor?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${course.instructor?.name || 'Instructor'}`} />
                    <AvatarFallback>
                      {course.instructor?.name ? course.instructor.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'I'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {course.instructor?.name || 'Instructor'}
                    </p>
                  </div>
                  <Link href={`/course/${course.slug}`}>
                    <Button size="sm" variant="ghost" className="text-[#5352F6]">
                      Ver curso
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="text-center">
        <Link href="/course">
          <Button variant="outline" className="border-[#5352F6]/20 text-[#5352F6] hover:bg-[#5352F6]/5">
            Ver todos los cursos
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
