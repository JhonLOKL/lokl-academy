import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "LOKL Reports | Investigación y Análisis de Mercado",
  description: "Reportes exclusivos, análisis de políticas y tendencias del mercado inmobiliario y turístico. Datos impulsados por LOKL.",
  openGraph: {
    title: "LOKL Reports | Investigación y Análisis de Mercado",
    description: "Reportes exclusivos, análisis de políticas y tendencias del mercado inmobiliario y turístico.",
    url: "https://academy.lokl.life/reports",
    siteName: "LOKL Life",
    images: [
      {
        url: "/images/lokl-academy-og.jpg", // Using default OG image for now, or specific if available
        width: 1200,
        height: 630,
        alt: "LOKL Reports",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LOKL Reports | Investigación y Análisis",
    description: "Datos y análisis profundos sobre el mercado inmobiliario y turístico.",
    images: ["/images/lokl-academy-og.jpg"],
  },
};

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
