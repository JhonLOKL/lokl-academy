import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MarketingFooter } from "@/components/footer/marketing-footer";

export const metadata: Metadata = {
    title: "Vivienda: ¿Activo o Pasivo? | LOKL Reports",
    description: "Análisis financiero entre comprar vivienda tradicional vs. inversión fraccionada. Descubre los costos ocultos y la eficiencia de capital.",
    openGraph: {
        title: "Vivienda: ¿Activo o Pasivo? | LOKL Reports",
        description: "Análisis estructural de la vivienda como activo vs. pasivo. Simulación de riqueza a 10 años y desglose de costos.",
        url: "https://lokl.life/reports/vivienda-activo-pasivo",
        siteName: "LOKL",
        images: [
            {
                url: "/images/reports/vivienda-og.jpg",
                width: 1200,
                height: 630,
                alt: "Reporte Vivienda Activo vs Pasivo",
            },
        ],
        locale: "es_ES",
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: "Vivienda: ¿Activo o Pasivo?",
        description: "Descubre la verdad financiera sobre la vivienda propia en Colombia.",
        images: ["/images/reports/vivienda-og.jpg"],
    },
};

export default function ViviendaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#FAFAFA] text-[#444444] font-sans selection:bg-[#5352F6] selection:text-white">
            {/* Wrapper for content with consistent padding/width like other reports */}
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
            {/* Marketing Footer is already in page.tsx but layout pattern usually has it global. 
                However, looking at page.tsx, I added `MarketingFooter` MANUALLY there.
                The pattern in `oriente-antioqueno-2025` has it in layout. 
                I should REMOVE it from page.tsx to avoid duplication if I put it here.
                
                Wait, if I put it here, it applies to all pages in this segment.
                Checking `oriente-antioqueno-2025/page.tsx`, does it have the footer?
                I should verify that first to match EXACTLY.
            */}
            {/* Re-checking oriente-2025 layout: it HAS MarketingFooter.
               So I should add it here and REMOVE from page.tsx. 
            */}
            <MarketingFooter />
        </div>
    );
}
