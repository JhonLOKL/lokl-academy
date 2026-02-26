import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Aldea | LOKL",
    description:
        "Aldea — El proyecto de próxima generación. Vive la experiencia de invertir en comunidad.",
    keywords: [
        "Aldea",
        "inversión inmobiliaria",
        "LOKL",
        "bienes raíces",
        "proyecto inmobiliario",
        "comunidad",
        "sostenibilidad",
    ],
    alternates: {
        canonical: "https://lokl.life/aldea",
    },
    openGraph: {
        title: "Aldea | LOKL",
        description: "El proyecto de próxima generación. Inversión inmobiliaria con impacto.",
        url: "https://lokl.life/aldea",
        siteName: "LOKL",
        locale: "es_ES",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Aldea | LOKL",
        description: "El proyecto de próxima generación. Inversión inmobiliaria con impacto.",
    },
};

export default function AldeaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
