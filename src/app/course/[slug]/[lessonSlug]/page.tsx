"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { getCourseBySlugAction } from "@/actions/course-action";
import { Course } from "@/lib/course/schema";
import dynamic from "next/dynamic";

// Importar dinámicamente el componente de aprendizaje para evitar problemas de SSR
const LearningComponent = dynamic(() => import("@/components/course/learning-component"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#5352F6] border-t-transparent"></div>
        <p className="mt-4 text-lg font-medium">Cargando lección...</p>
      </div>
    </div>
  ),
});

export default function LessonPage() {
  const { slug, lessonSlug } = useParams<{ slug: string; lessonSlug: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLesson, setCurrentLesson] = useState<any>(null);
  const [currentModule, setCurrentModule] = useState<any>(null);
  const [isQuizMode, setIsQuizMode] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    async function loadCourse() {
      try {
        setLoading(true);
        console.log("Cargando curso con slug:", slug);
        
        // Decodificar el slug para manejar caracteres especiales
        const decodedContentSlug = decodeURIComponent(String(lessonSlug));
        console.log("Buscando contenido con slug decodificado:", decodedContentSlug);
        
        const res = await getCourseBySlugAction(String(slug));
        
        if (!isMounted) return;
        
        if (res.success && res.data && res.data.course) {
          const c = res.data.course;
          // Normalizar flags de completado si vienen con completedAt
          c.content.modules.forEach((m: any) => {
            m.lessons.forEach((l: any) => {
              if (l.completedAt && !l.isCompleted) l.isCompleted = true;
            });
            if (m.quiz && m.quiz.completedAt && !m.quiz.isCompleted) m.quiz.isCompleted = true;
          });
          setCourse(c);
          console.log("Curso cargado:", c.title);
          console.log("Módulos disponibles:", c.content.modules.length);
          
          // Buscar la lección o quiz por slug
          let foundLesson = null;
          let foundModule = null;
          let isQuiz = false;
          
          for (const courseModule of c.content.modules) {
            console.log("Revisando módulo:", courseModule.title);
            console.log("Lecciones en este módulo:", courseModule.lessons.length);
            
            // Imprimir todas las lecciones y sus slugs para depuración
            courseModule.lessons.forEach(l => {
              console.log(`Lección: ${l.title}, ID: ${l.id}, Slug: ${l.slug || 'sin slug'}`);
            });
            
            // Verificar si es un quiz
            if (courseModule.quiz) {
              console.log(`Quiz: ${courseModule.quiz.title}, ID: ${courseModule.quiz.id}, Slug: ${courseModule.quiz.slug || 'sin slug'}`);
              
              if (courseModule.quiz.slug === decodedContentSlug || courseModule.quiz.id === decodedContentSlug) {
                console.log("¡Quiz encontrado!", courseModule.quiz.title);
                foundModule = courseModule;
                isQuiz = true;
                break;
              }
            }
            
            // Verificar si es una lección
            const lesson = courseModule.lessons.find(l => 
              l.slug === decodedContentSlug || 
              l.id === decodedContentSlug
            );
            
            if (lesson) {
              console.log("¡Lección encontrada!", lesson.title);
              foundLesson = lesson;
              foundModule = courseModule;
              break;
            }
          }
          
          if (isQuiz && foundModule) {
            console.log("Estableciendo modo quiz para:", foundModule.quiz?.title);
            setCurrentModule(foundModule);
            setCurrentLesson(null); // No hay lección en modo quiz
            setIsQuizMode(true);
          } else if (foundLesson && foundModule) {
            console.log("Estableciendo lección y módulo encontrados");
            setCurrentLesson(foundLesson);
            setCurrentModule(foundModule);
            setIsQuizMode(false);
          } else {
            console.error("Contenido no encontrado con slug:", decodedContentSlug);
            setError("Contenido no encontrado");
          }
        } else {
          setError(res.error || "No encontrado");
        }
      } catch (err) {
        if (!isMounted) return;
        setError("Error cargando el curso");
        console.error("Error cargando el curso:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    
    loadCourse();
    
    return () => { isMounted = false; };
  }, [slug, lessonSlug]);

  if (!loading && (!course || error)) {
    notFound();
  }

  if (loading || (!currentLesson && !isQuizMode) || !currentModule) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#5352F6] border-t-transparent"></div>
          <p className="mt-4 text-lg font-medium">Cargando lección...</p>
        </div>
      </div>
    );
  }

  // Verificar si hay un problema con el video en la última lección
  if (currentLesson && currentLesson.type === 'video' && !currentLesson.videoUrl) {
    console.error("Error: URL de video no encontrada para la lección:", currentLesson.title);
  }

  return (
    <LearningComponent
      course={course as Course}
      currentLesson={currentLesson}
      currentModule={currentModule}
      userProgress={course?.progress}
      isQuizMode={isQuizMode}
    />
  );
}