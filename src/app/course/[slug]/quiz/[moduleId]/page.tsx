"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/lib/course/mock-data-from-api";
import { mockUserProgress } from "@/lib/course/mock-data";
import { Course } from "@/lib/course/schema";
import dynamic from "next/dynamic";

// Importar dinámicamente el componente de aprendizaje para evitar problemas de SSR
const LearningComponent = dynamic(() => import("@/components/course/learning-component"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#5352F6] border-t-transparent"></div>
        <p className="mt-4 text-lg font-medium">Cargando quiz...</p>
      </div>
    </div>
  ),
});

export default function QuizPage() {
  const { slug, moduleId } = useParams<{ slug: string; moduleId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentModule, setCurrentModule] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    
    async function loadCourse() {
      try {
        setLoading(true);
        console.log("Cargando curso con slug:", slug);
        console.log("Buscando quiz para módulo:", moduleId);
        
        const res = await getCourseBySlug(String(slug));
        
        if (!isMounted) return;
        
        if (res.success && res.course) {
          setCourse(res.course);
          console.log("Curso cargado:", res.course.title);
          console.log("Módulos disponibles:", res.course.content.modules.length);
          
          // Buscar el módulo por ID
          const module = res.course.content.modules.find(m => m.id === moduleId);
          
          if (module && module.quiz) {
            console.log("Módulo y quiz encontrados:", module.title);
            setCurrentModule(module);
          } else {
            console.error("Quiz no encontrado para el módulo:", moduleId);
            setError("Quiz no encontrado");
          }
        } else {
          setError(res.message || "No encontrado");
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
  }, [slug, moduleId]);

  if (!loading && (!course || error)) {
    notFound();
  }

  if (loading || !currentModule) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#5352F6] border-t-transparent"></div>
          <p className="mt-4 text-lg font-medium">Cargando quiz...</p>
        </div>
      </div>
    );
  }

  // Obtener el progreso del usuario
  const userProgress = mockUserProgress.find(progress => progress.courseId === course.id);

  return (
    <LearningComponent
      course={course}
      currentModule={currentModule}
      userProgress={userProgress}
      isQuizMode={true}
    />
  );
}
