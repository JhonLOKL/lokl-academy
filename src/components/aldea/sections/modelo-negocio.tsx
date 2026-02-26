"use client";

import { DonutChart } from "@/components/design-system";

const FUENTES_INGRESOS = [
    { name: "Restaurante farm-to-table", value: 17, color: "#2D5A3D" },
    { name: "Huerta + invernadero", value: 17, color: "#1E4D5C" },
    { name: "Temazcal / sauna", value: 17, color: "#8B7355" },
    { name: "Deck de yoga y wellness", value: 17, color: "#3D6B4A" },
    { name: "Fogatero + plaza comunitaria", value: 16, color: "#722F37" },
    { name: "Senderos + mirador", value: 16, color: "#5352F6" },
] as const;

export function AldeaSectionModeloNegocio() {
    return (
        <section id="modelo-negocio" className="scroll-mt-24 pt-16">
            <div className="relative z-0 left-1/2 -translate-x-1/2 w-screen overflow-x-clip bg-[#5352F6] pt-16 pb-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
                        {/* Columna texto */}
                        <div>
                            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                                Cómo generamos <span className="text-white">valor para todos</span>
                            </h2>
                            <p className="text-lg leading-relaxed text-white">
                                Generamos valor para inversionistas, proyectos y comunidades a través de la inversión colectiva y el turismo sostenible. Las fuentes de ingresos se diversifican entre los distintos productos y servicios del ecosistema, como se muestra en el gráfico.
                            </p>
                        </div>

                        {/* Fuentes de ingresos: pie chart con 6 amenities */}
                        <div className="rounded-2xl border border-white/20 bg-white/95 p-6 shadow-lg md:p-8">
                            <h3 className="mb-6 text-xl font-semibold text-neutral-900">
                                Fuentes de ingresos
                            </h3>
                            <DonutChart
                                data={FUENTES_INGRESOS.map(({ name, value, color }) => ({
                                    name,
                                    value,
                                    color,
                                }))}
                                height={320}
                                innerRadius={80}
                                outerRadius={120}
                                showTooltip={true}
                                legendPosition="left"
                                tooltipFormatter={(value) => `${value}%`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
