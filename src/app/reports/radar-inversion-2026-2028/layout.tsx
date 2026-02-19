import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MarketingFooter } from "@/components/footer/marketing-footer";

export const metadata: Metadata = {
    title: "Radar de Inversión 2026-2028: Las 5 Zonas de Explosión Inmobiliaria | LOKL Reports",
    description: "Identificando los nodos de valorización agresiva para el ciclo 2026-2028. Antioquia, San Felipe, Guatapé, Santa Marta y oportunidades emergentes en Colombia.",
    openGraph: {
        title: "Radar de Inversión 2026-2028 | LOKL Intelligence",
        description: "Las 5 zonas de explosión inmobiliaria en Colombia. Análisis de mercado e inversión para 2026-2028.",
        url: "https://lokl.life/reports/radar-inversion-2026-2028",
        siteName: "LOKL",
        images: [
            {
                url: "/images/lokl-academy-og.jpg",
                width: 1200,
                height: 630,
                alt: "Radar de Inversión 2026-2028",
            },
        ],
        locale: "es_ES",
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: "Radar de Inversión 2026-2028: 5 Zonas de Explosión",
        description: "Nodos de valorización agresiva para el ciclo 2026-2028 en Colombia.",
        images: ["/images/lokl-academy-og.jpg"],
    },
    alternates: {
        canonical: "https://lokl.life/reports/radar-inversion-2026-2028",
    },
};

export default function RadarInversionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#FAFAFA] text-[#444444] font-sans selection:bg-[#5352F6] selection:text-white">
            <div className="p-4 md:p-10 max-w-7xl mx-auto">
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
