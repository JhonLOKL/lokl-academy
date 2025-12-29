import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MarketingFooter } from "@/components/footer/marketing-footer";

export const metadata: Metadata = {
    title: "Análisis Estratégico Oriente Antioqueño 2025 | LOKL Reports",
    description: "Análisis profundo del mercado inmobiliario en el Oriente Antioqueño. ¿Burbuja o crecimiento orgánico? Datos sobre Rionegro, La Ceja y El Retiro.",
    openGraph: {
        title: "Análisis Estratégico Oriente Antioqueño 2025 | LOKL Reports",
        description: "Evaluación de micro-mercados, vectores de infraestructura y matriz de riesgos para inversores en el Oriente Antioqueño.",
        url: "https://lokl.life/reports/oriente-antioqueno-2025",
        siteName: "LOKL",
        images: [
            {
                url: "/images/reports/oriente-og.jpg",
                width: 1200,
                height: 630,
                alt: "Reporte Oriente Antioqueño 2025",
            },
        ],
        locale: "es_ES",
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: "Oriente Antioqueño 2025: Análisis de Mercado",
        description: "Datos y análisis sobre el futuro inmobiliario del Oriente Antioqueño.",
        images: ["/images/reports/oriente-og.jpg"],
    },
    alternates: {
        canonical: "https://lokl.life/reports/oriente-antioqueno-2025",
    },
};

export default function OrienteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#FAFAFA] text-[#444444] font-sans selection:bg-[#5352F6] selection:text-white">
            <div className="p-4 md:p-10 max-w-7xl mx-auto">
                {/* Back Navigation */}
                <Link
                    href="/reports"
                    className="inline-flex items-center gap-2 text-[#5352F6] hover:text-[#4241C5] transition-colors mb-8 font-medium"
                >
                    <ArrowLeft size={20} />
                    Volver a Reportes
                </Link>
                {children}
            </div>
            <MarketingFooter />
        </div>
    );
}
