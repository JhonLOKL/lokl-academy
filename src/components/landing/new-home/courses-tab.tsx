"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ImageWithFallback } from './image-with-fallback';
import { Clock, ChevronRight, Award, Loader2 } from 'lucide-react';
import { getAllCoursesAction } from '@/actions/course-action';
import type { Course } from '@/lib/course/schema';
import Link from 'next/link';

export default function CursosTab() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const getBadgeVariant = (course: Course, index: number) => {
    if (course.pricing?.price === 0 || course.pricing?.type === 'free') return 'bg-green-500 text-white';
    if (course.featured) return 'bg-[#5352F6] text-primary-foreground';
    if (index === 0) return 'bg-orange-500 text-white';
    return 'bg-blue-500 text-white';
  };

  const getBadgeText = (course: Course, index: number) => {
    if (course.pricing?.price === 0 || course.pricing?.type === 'free') return 'Gratis';
    if (course.featured) return 'Destacado';
    if (index === 0) return 'Nuevo';
    return 'Premium';
  };

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
        {courses.map((course, index) => (
          <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer p-0">
            <div className="relative h-56 overflow-hidden">
              <ImageWithFallback
                src={course.coverImage?.url || course.thumbnail?.url || '/images/course/placeholder.jpg'}
                alt={course.coverImage?.alt || course.thumbnail?.alt || course.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                <Badge className={getBadgeVariant(course, index)}>
                  {getBadgeText(course, index)}
                </Badge>
                {course.certificate && (
                  <Badge className="bg-[#5352F6] text-primary-foreground flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    Certificado
                  </Badge>
                )}
              </div>
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{formatDuration(course.content?.totalDuration || 0)}</span>
              </div>
            </div>
            <div className="p-6 space-y-3">
              <h4 className="font-bold text-foreground group-hover:text-[#5352F6] transition-colors">
                {course.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {course.description || course.excerpt || 'Descubre más sobre este curso y mejora tus habilidades de inversión.'}
              </p>
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
        ))}
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
