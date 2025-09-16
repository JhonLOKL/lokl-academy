"use client";

import React, { useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getCourseBySlug } from "@/lib/course/mock-data-from-api";

export default function LearnRedirectPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonId = searchParams.get("lesson");
  const moduleId = searchParams.get("module");
  const isQuizMode = searchParams.get("quiz") === "true";

  useEffect(() => {
    async function redirectToProperURL() {
      try {
        // Obtener datos del curso
        const courseData = await getCourseBySlug(String(slug));
        
        if (courseData.success && courseData.course) {
          const course = courseData.course;
          
          // Si es modo quiz, redirigir a la página de quiz
          if (isQuizMode && moduleId) {
            router.replace(`/course/${slug}/learn/quiz/${moduleId}`);
            return;
          }
          
          // Buscar el módulo y la lección
          let targetModule = null;
          let targetLesson = null;
          
          if (moduleId) {
            targetModule = course.content.modules.find(m => m.id === moduleId);
          } else {
            // Si no hay moduleId, usar el primer módulo
            targetModule = course.content.modules[0];
          }
          
          if (targetModule) {
            if (lessonId) {
              targetLesson = targetModule.lessons.find(l => l.id === lessonId);
            } else {
              // Si no hay lessonId, usar la primera lección del módulo
              targetLesson = targetModule.lessons[0];
            }
            
            if (targetLesson) {
              // Redirigir a la URL con slug
              router.replace(`/course/${slug}/learn/${targetLesson.slug || targetLesson.id}`);
              return;
            }
          }
          
          // Si no se encuentra el módulo o la lección, redirigir a la primera lección del primer módulo
          if (course.content.modules.length > 0 && course.content.modules[0].lessons.length > 0) {
            const firstLesson = course.content.modules[0].lessons[0];
            router.replace(`/course/${slug}/learn/${firstLesson.slug || firstLesson.id}`);
          } else {
            // Si no hay lecciones, redirigir a la página del curso
            router.replace(`/course/${slug}`);
          }
        } else {
          // Si no se encuentra el curso, redirigir a la página principal
          router.replace("/");
        }
      } catch (error) {
        console.error("Error al redirigir:", error);
        router.replace(`/course/${slug}`);
      }
    }
    
    redirectToProperURL();
  }, [slug, router, moduleId, lessonId, isQuizMode]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#5352F6] border-t-transparent"></div>
        <p className="mt-4 text-lg font-medium">Redirigiendo...</p>
      </div>
    </div>
  );
}