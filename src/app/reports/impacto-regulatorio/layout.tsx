import React from "react";
import type { Metadata } from "next";
import { MarketingFooter } from "@/components/footer/marketing-footer";

export const metadata: Metadata = {
    title: "Choque Regulatorio: Turismo Andino | LOKL Reports",
    description: "Análisis sobre el impacto del Decreto del 18 de Diciembre en el turismo y las rentas cortas en Colombia. Datos y proyecciones.",
    openGraph: {
        title: "Choque Regulatorio: La Transformación del Turismo Andino",
        description: "Riesgos, datos y lecciones aprendidas de NY y Barcelona sobre la nueva regulación de rentas cortas en Colombia.",
        url: "https://academy.lokl.life/reports/impacto-regulatorio",
        siteName: "LOKL Academy",
        images: [
            {
                url: "/images/reports/regulatorio-og.jpg",
                width: 1200,
                height: 630,
                alt: "Choque Regulatorio Turismo Andino",
            },
        ],
        locale: "es_ES",
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: "Impacto Regulatorio en Rentas Cortas 2025",
        description: "Análisis profundo sobre el Decreto del 18 de Diciembre y el futuro del turismo.",
        images: ["/images/reports/regulatorio-og.jpg"],
    },
};

export default function ImpactoLayout({
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
