"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { getCourseBySlugAction } from "@/actions/course-action";
import { Course, Module } from "@/lib/course/schema";
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
  const [currentModule, setCurrentModule] = useState<Module | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    async function loadCourse() {
      try {
        setLoading(true);
        console.log("Cargando curso con slug:", slug);
        console.log("Buscando quiz para módulo:", moduleId);
        
        const res = await getCourseBySlugAction(String(slug));
        
        if (!isMounted) return;
        
        if (res.success && res.data && res.data.course) {
          const c = res.data.course as Course;
          setCourse(c);
          console.log("Curso cargado:", c.title);
          console.log("Módulos disponibles:", c.content.modules.length);
          
          // Buscar el módulo por ID
          const courseModule = c.content.modules.find(m => m.id === moduleId);
          
          if (courseModule && courseModule.quiz) {
            console.log("Módulo y quiz encontrados:", courseModule.title);
            setCurrentModule(courseModule);
          } else {
            console.error("Quiz no encontrado para el módulo:", moduleId);
            setError("Quiz no encontrado");
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

  return (
    <LearningComponent
      course={course as Course}
      currentModule={currentModule}
      isQuizMode={true}
    />
  );
}
