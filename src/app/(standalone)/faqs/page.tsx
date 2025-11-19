import type { Metadata } from "next";
import FAQsPage from "@/components/faqs";

export const metadata: Metadata = {
  title: "Preguntas frecuentes | LOKL",
  description:
    "Resolvemos tus dudas sobre riesgos, retornos, seguridad y funcionamiento de la plataforma LOKL. Encuentra respuestas a las preguntas más comunes sobre invertir con nosotros.",
  alternates: {
    canonical: "https://academy.lokl.life/faqs",
  },
  openGraph: {
    title: "Preguntas frecuentes | LOKL",
    description:
      "Resolvemos tus dudas sobre riesgos, retornos, seguridad y funcionamiento de la plataforma LOKL.",
    url: "https://academy.lokl.life/faqs",
    siteName: "LOKL Academy",
  },
};

export default function FAQsPageRoute() {
  return <FAQsPage />;
}

