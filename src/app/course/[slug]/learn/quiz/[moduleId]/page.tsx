"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCourseBySlugAction } from "@/actions/course-action";

export default function QuizRedirectPage() {
  const { slug, moduleId } = useParams<{ slug: string; moduleId: string }>();
  const router = useRouter();

  useEffect(() => {
    async function redirectToProperURL() {
      try {
        // Obtener datos del curso para encontrar el slug del quiz (API real)
        const res = await getCourseBySlugAction(String(slug));
        
        if (res.success && res.data && res.data.course) {
          const courseModule = res.data.course.content.modules.find(m => m.id === moduleId);
          
          if (courseModule && courseModule.quiz) {
            // Redirigir a la nueva URL con el slug del quiz
            router.replace(`/course/${slug}/${courseModule.quiz.slug || `quiz-${moduleId}`}`);
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