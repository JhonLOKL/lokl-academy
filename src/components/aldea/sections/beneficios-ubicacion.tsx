import { TrendingUp, Calendar, MapPin } from "lucide-react";

const BENEFICIOS = [
    {
        icon: TrendingUp,
        title: "Oportunidad clave",
        description:
            "Entrar en una zona con demanda turística creciente pero aún sin saturación. La Unión permite posicionarse como referente de turismo de experiencias y sostenible antes de que el mercado se masifique, con ventaja para quienes invierten hoy.",
    },
    {
        icon: Calendar,
        title: "Futuro",
        description:
            "Proyecciones de crecimiento del turismo en Colombia y en el Eje Cafetero respaldan el modelo. La tendencia hacia viajes más largos, conscientes y con foco en naturaleza y cultura local favorece directamente a proyectos como La Unión en los próximos años.",
    },
    {
        icon: MapPin,
        title: "Clave de esta ubicación",
        description:
            "Combinación de accesibilidad, paisaje, clima y comunidad. La Unión no es solo un punto en el mapa: es un territorio con identidad cafetera, biodiversidad y gente dispuesta a sumarse al proyecto, lo que reduce riesgos operativos y mejora la experiencia del huésped.",
    },
] as const;

export function AldeaSectionBeneficiosUbicacion() {
    return (
        <section id="beneficios-ubicacion" className="scroll-mt-24 pt-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
                La oportunidad de mercado en <span className="text-[#5352F6]">La Unión</span>
            </h2>
            <p className="mb-10 max-w-2xl text-lg text-neutral-600 leading-relaxed">
                Por qué el mercado en La Unión representa una oportunidad única para invertir.
            </p>

            <div className="space-y-6">
                {BENEFICIOS.map(({ icon: Icon, title, description }) => (
                    <div
                        key={title}
                        className="flex gap-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8"
                    >
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#5352F6]/10 text-[#5352F6]">
                            <Icon className="h-7 w-7" aria-hidden />
                        </div>
                        <div>
                            <h3 className="mb-3 text-xl font-semibold text-neutral-900">
                                {title}
                            </h3>
                            <p className="text-neutral-600 leading-relaxed">
                                {description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
