"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function LessonRedirectPage() {
  const { slug, lessonSlug } = useParams<{ slug: string; lessonSlug: string }>();
  const router = useRouter();

  useEffect(() => {
    // Redirigir a la nueva URL
    router.replace(`/course/${slug}/${lessonSlug}`);
  }, [slug, lessonSlug, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#5352F6] border-t-transparent"></div>
        <p className="mt-4 text-lg font-medium">Redirigiendo...</p>
      </div>
    </div>
  );
}