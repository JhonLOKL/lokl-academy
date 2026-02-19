import type { Metadata } from "next";
import { Suspense } from "react";
import SatisfactionSurvey from "./satisfaction-survey.client";

export const metadata: Metadata = {
  title: "Satisfaction Survey | LOKL",
  description:
    "Tu opinión es fundamental para mejorar. Ayúdanos respondiendo estas preguntas rápidas sobre tu experiencia reciente.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SatisfactionSurveyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-purple-600">Cargando...</div>
    </div>}>
      <SatisfactionSurvey />
    </Suspense>
  );
}
