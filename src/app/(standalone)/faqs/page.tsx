import type { Metadata } from "next";
import FAQsPage from "@/components/faqs";

export const metadata: Metadata = {
  title: "Preguntas frecuentes | LOKL",
  description:
    "Resolvemos tus dudas sobre riesgos, retornos, seguridad y funcionamiento de la plataforma LOKL. Encuentra respuestas a las preguntas más comunes sobre invertir con nosotros.",
  keywords: [
    "preguntas frecuentes",
    "FAQs",
    "inversión inmobiliaria",
    "LOKL",
    "bienes raíces",
    "crowdfunding inmobiliario",
    "riesgos de inversión",
    "retornos de inversión",
    "seguridad financiera",
    "cómo invertir",
  ],
  alternates: {
    canonical: "https://lokl.life/faqs",
  },
  openGraph: {
    title: "Preguntas frecuentes | LOKL",
    description:
      "Resolvemos tus dudas sobre riesgos, retornos, seguridad y funcionamiento de la plataforma LOKL.",
    url: "https://lokl.life/faqs",
    siteName: "LOKL Life",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Preguntas frecuentes | LOKL",
    description:
      "Resolvemos tus dudas sobre riesgos, retornos, seguridad y funcionamiento de la plataforma LOKL.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function FAQsPageRoute() {
  return <FAQsPage />;
}

