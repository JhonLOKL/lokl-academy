import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Del Lujo Opulente al Lujo Consciente | LOKL Reports",
    description: "Cómo la ética, la regeneración y el propósito están redefiniendo el estatus global y el mercado inmobiliario de lujo.",
    openGraph: {
        title: "Lujo Consciente: El Nuevo Estándar de Estatus",
        description: "Análisis sobre la transformación de la exclusividad hacia la sostenibilidad y el propósito.",
        url: "https://lokl.life/reports/lujo-consciente",
        siteName: "LOKL",
        images: [
            {
                url: "/images/reports/lujo-og.jpg",
                width: 1200,
                height: 630,
                alt: "Del Lujo Opulente al Lujo Consciente",
            },
        ],
        locale: "es_ES",
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: "Lujo Consciente y Propósito",
        description: "La evolución del mercado de lujo hacia la regeneración y la ética.",
        images: ["/images/reports/lujo-og.jpg"],
    },
};

export default function LujoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#FAFAFA] text-[#444444] font-sans selection:bg-[#5352F6] selection:text-white">
            {children}
        </div>
    );
}
