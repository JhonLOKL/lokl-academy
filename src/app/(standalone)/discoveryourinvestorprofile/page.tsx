import type { Metadata } from "next";
import DiscoverYourInvestorProfile from "@/components/discoveryourinvestorprofile";

export const metadata: Metadata = {
    title: "Descubre tu Perfil de Inversionista | LOKL",
    description:
        "En solo 3 minutos, descubre tu perfil de inversionista y encuentra las oportunidades de inversión que se alinean con tus metas. Test gratuito de perfil de riesgo LOKL.",
    keywords: [
        "perfil de inversionista",
        "test de perfil de riesgo",
        "inversión inmobiliaria",
        "LOKL",
        "bienes raíces",
        "finanzas personales",
        "educación financiera",
        "test de inversión",
        "perfil de riesgo",
    ],
    alternates: {
        canonical: "https://lokl.life/discoveryourinvestorprofile",
    },
    openGraph: {
        title: "Descubre tu Perfil de Inversionista | LOKL",
        description:
            "En solo 3 minutos, descubre tu perfil de inversionista y encuentra las oportunidades de inversión que se alinean con tus metas.",
        url: "https://lokl.life/discoveryourinvestorprofile",
        siteName: "LOKL Life",
        locale: "es_CO",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Descubre tu Perfil de Inversionista | LOKL",
        description:
            "En solo 3 minutos, descubre tu perfil de inversionista y encuentra las oportunidades de inversión que se alinean con tus metas.",
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

export default function DiscoverYourInvestorProfilePage() {
    return <DiscoverYourInvestorProfile />;
}
