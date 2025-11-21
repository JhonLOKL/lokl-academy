import type { Metadata } from "next";
import DiscoverYourInvestorProfile from "@/components/discoveryourinvestorprofile";

export const metadata: Metadata = {
    title: "Descubre tu Perfil de Inversionista | LOKL",
    description:
        "En solo 3 minutos, descubre tu perfil de inversionista y encuentra las oportunidades de inversión que se alinean con tus metas. Test gratuito de perfil de riesgo LOKL.",
    alternates: {
        canonical: "https://academy.lokl.life/discoveryourinvestorprofile",
    },
    openGraph: {
        title: "Descubre tu Perfil de Inversionista | LOKL",
        description:
            "En solo 3 minutos, descubre tu perfil de inversionista y encuentra las oportunidades de inversión que se alinean con tus metas.",
        url: "https://academy.lokl.life/discoveryourinvestorprofile",
        siteName: "LOKL Academy",
    },
};

export default function DiscoverYourInvestorProfilePage() {
    return <DiscoverYourInvestorProfile />;
}
