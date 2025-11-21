import { BookOpen, Cloud, Handshake, Rocket, LucideIcon } from "lucide-react";

export interface InvestorProfile {
    title: string;
    message: string;
    cta: string;
    icon: LucideIcon;
}

export const perfiles: Record<string, InvestorProfile> = {
    NOVATO: {
        title: "NOVATO",
        message: "Sabemos que recién estás empezando, y por eso en LOKL te acompañamos con oportunidades simples, seguras y sin complicaciones.",
        cta: "Descubrir cómo empezar fácil",
        icon: BookOpen,
    },
    SOÑADOR: {
        title: "SOÑADOR",
        message: "Querés que tu dinero genere impacto real. En LOKL podés apoyar proyectos que transforman comunidades y construyen un mundo mejor.",
        cta: "Conocer inversiones con impacto",
        icon: Cloud,
    },
    EXPERTO: {
        title: "EXPERTO",
        message: "Tu experiencia te hace buscar decisiones bien fundamentadas. En LOKL vas a encontrar métricas claras, análisis y oportunidades sólidas.",
        cta: "Explorar análisis y rendimientos",
        icon: Handshake,
    },
    VISIONARIO: {
        title: "VISIONARIO",
        message: "Buscás más que rentabilidad. Querés transformar realidades con tu inversión. En LOKL te conectamos con proyectos que hacen la diferencia.",
        cta: "Invertir en transformación social",
        icon: Rocket,
    },
};
