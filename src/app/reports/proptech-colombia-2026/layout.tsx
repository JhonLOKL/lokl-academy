import React from "react";
import type { Metadata } from "next";
import { MarketingFooter } from "@/components/footer/marketing-footer";

export const metadata: Metadata = {
  title: "PropTech 2026: La Democratización del Ladrillo | LOKL Reports",
  description: "Cómo 7 tecnologías clave desmantelaron las barreras de entrada al real estate. Inversión desde $50.000 COP. Análisis post-Ley Fintech.",
  openGraph: {
    title: "PropTech 2026: La Democratización del Ladrillo",
    description: "Tokenización, crowdfunding 2.0, iBuying, AVM, smart contracts, realidad inmersiva y construcción modular. El futuro del ladrillo en Colombia.",
    url: "https://academy.lokl.life/reports/proptech-colombia-2026",
    siteName: "LOKL",
    images: [
      {
        url: "/images/lokl-academy-og.jpg",
        width: 1200,
        height: 630,
        alt: "PropTech Colombia 2026 - LOKL Research",
      },
    ],
    locale: "es_ES",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PropTech 2026: La Democratización del Ladrillo",
    description: "7 tecnologías que permiten invertir en real estate desde $50.000 COP.",
    images: ["/images/lokl-academy-og.jpg"],
  },
  alternates: {
    canonical: "https://academy.lokl.life/reports/proptech-colombia-2026",
  },
};

export default function ProptechColombia2026Layout({
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
