import React from "react";
import type { Metadata } from "next";
import { MarketingFooter } from "@/components/footer/marketing-footer";

export const metadata: Metadata = {
  title: "Créditos Vs. Inversión Colaborativa: La Tabla de Verdad | LOKL Reports",
  description: "Análisis de la brecha entre lo que pagan los bancos y lo que cobran. Cómo la Fintech elimina intermediarios para beneficiar a inversionistas y solicitantes.",
  openGraph: {
    title: "Créditos Vs. Inversión Colaborativa: La Tabla de Verdad",
    description: "La brecha real de tasas, costos ocultos y comparativa banca tradicional vs. inversión colaborativa.",
    url: "https://academy.lokl.life/reports/creditos-vs-inversion-colaborativa",
    siteName: "LOKL",
    images: [
      {
        url: "/images/lokl-academy-og.jpg",
        width: 1200,
        height: 630,
        alt: "Créditos Vs. Inversión Colaborativa - LOKL Research",
      },
    ],
    locale: "es_ES",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Créditos Vs. Inversión Colaborativa: La Tabla de Verdad",
    description: "Análisis de tasas, costos ocultos y comparativa banca vs. Fintech.",
    images: ["/images/lokl-academy-og.jpg"],
  },
  alternates: {
    canonical: "https://academy.lokl.life/reports/creditos-vs-inversion-colaborativa",
  },
};

export default function CreditosVsInversionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#444444] font-sans selection:bg-[#5352F6] selection:text-white">
      {children}
      <MarketingFooter />
    </div>
  );
}
