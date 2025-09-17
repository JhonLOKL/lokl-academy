"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCourseBySlugAction } from "@/actions/course-action";
import { Course, Lesson, Module } from "@/lib/course/schema";
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
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
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
          // Validar que el usuario esté inscrito en el curso; si no, redirigir a la landing del curso
          if (!res.data.isEnrolled) {
            router.replace(`/course/${slug}`);
            return;
          }
          const c = res.data.course as Course;
          // Normalizar flags de completado si vienen con completedAt
          c.content.modules.forEach((m: Module) => {
            m.lessons.forEach((l: Lesson) => {
              if (l.completedAt && !l.isCompleted) l.isCompleted = true;
            });
            if (m.quiz && m.quiz.completedAt && !m.quiz.isCompleted) m.quiz.isCompleted = true;
          });
          setCourse(c);
          console.log("Curso cargado:", c.title);
          console.log("Módulos disponibles:", c.content.modules.length);
          
          // Buscar la lección o quiz por slug
          let foundLesson: Lesson | null = null;
          let foundModule: Module | null = null;
          let isQuiz = false;
          
          for (const courseModule of c.content.modules as Module[]) {
            console.log("Revisando módulo:", courseModule.title);
            console.log("Lecciones en este módulo:", courseModule.lessons.length);
            
            // Imprimir todas las lecciones y sus slugs para depuración
            courseModule.lessons.forEach((l: Lesson) => {
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
            const lesson = courseModule.lessons.find((l: Lesson) => 
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
  }, [slug, lessonSlug, router]);

  if (!loading && (!course || error)) {
    return (
      <div className="flex h-screen items-center justify-center px-4">
        <div className="w-full max-w-xl rounded-lg border border-[#E5E5E5] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-red-50 flex items-center justify-center">
            {/* icono inline para evitar más imports */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          </div>
          <h1 className="mb-2 text-xl font-bold">No se pudo cargar el contenido</h1>
          <p className="mb-6 text-[#6D6C6C]">
            {error || "Revisa tu conexión e intenta nuevamente."}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button className="inline-flex h-10 items-center justify-center rounded-md border border-[#E5E5E5] bg-white px-4 text-sm font-medium hover:bg-[#F5F5F5]" onClick={() => window.location.reload()}>Reintentar</button>
            <button className="inline-flex h-10 items-center justify-center rounded-md bg-[#5352F6] px-4 text-sm font-medium text-white hover:opacity-90" onClick={() => router.replace(`/course/${slug}`)}>Volver al curso</button>
          </div>
        </div>
      </div>
    );
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