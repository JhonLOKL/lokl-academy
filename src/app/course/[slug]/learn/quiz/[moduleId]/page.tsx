"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCourseBySlug } from "@/lib/course/mock-data-from-api";

export default function QuizRedirectPage() {
  const { slug, moduleId } = useParams<{ slug: string; moduleId: string }>();
  const router = useRouter();

  useEffect(() => {
    async function redirectToProperURL() {
      try {
        // Obtener datos del curso para encontrar el slug del quiz
        const courseData = await getCourseBySlug(String(slug));
        
        if (courseData.success && courseData.course) {
          const module = courseData.course.content.modules.find(m => m.id === moduleId);
          
          if (module && module.quiz) {
            // Redirigir a la nueva URL con el slug del quiz
            router.replace(`/course/${slug}/${module.quiz.slug || `quiz-${moduleId}`}`);
          } else {
            // Si no se encuentra el quiz, redirigir a la página del curso
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
  }, [slug, moduleId, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#5352F6] border-t-transparent"></div>
        <p className="mt-4 text-lg font-medium">Redirigiendo...</p>
      </div>
    </div>
  );
}