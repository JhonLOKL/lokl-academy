"use client";

import { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const ROTATION_INTERVAL_MS = 5000;

const TESTIMONIOS = [
    {
        quote:
            "Invertir en La Unión fue una decisión alineada con lo que buscamos: impacto en la comunidad, turismo responsable y un equipo serio detrás del proyecto.",
        author: "María C.",
        role: "Inversionista",
    },
    {
        quote:
            "El modelo de Aldea nos convenció. No es solo un proyecto aislado; es una plataforma que va a replicar en otras regiones. Queremos ser parte de eso desde el inicio.",
        author: "Carlos R.",
        role: "Inversionista",
    },
    {
        quote:
            "La combinación de ubicación, equipo y oportunidad de mercado en el Eje Cafetero nos dio confianza. Estamos muy satisfechos con el proceso y la comunicación.",
        author: "Ana L.",
        role: "Inversionista",
    },
    {
        quote:
            "Buscábamos algo con propósito además de rentabilidad. Aldea y La Unión encajaron perfecto: desarrollo local, naturaleza y un plan de negocio claro.",
        author: "Andrés M.",
        role: "Inversionista",
    },
    {
        quote:
            "La transparencia desde el primer día nos convenció. Sabemos en qué estamos invirtiendo y cómo avanza el proyecto. Recomiendo explorar la oportunidad.",
        author: "Laura S.",
        role: "Inversionista",
    },
    {
        quote:
            "El Eje Cafetero tiene un potencial enorme y aún poco explotado de forma sostenible. Para nosotros fue la oportunidad de entrar en un sector en crecimiento.",
        author: "Diego P.",
        role: "Inversionista",
    },
    {
        quote:
            "Invertimos pensando a largo plazo. La Unión y el equipo detrás nos dieron la seguridad para dar el paso. Muy buena experiencia hasta ahora.",
        author: "Patricia G.",
        role: "Inversionista",
    },
    {
        quote:
            "Nos gustó que no fuera turismo masivo. Un proyecto que cuida el territorio y la comunidad, con estándares altos. Eso es lo que queremos apoyar.",
        author: "Roberto V.",
        role: "Inversionista",
    },
];

const PAGE_SIZE = 2;
const NUM_PAGES = Math.ceil(TESTIMONIOS.length / PAGE_SIZE);

export function AldeaSectionTestimonios() {
    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setPageIndex((prev) => (prev + 1) % NUM_PAGES);
        }, ROTATION_INTERVAL_MS);
        return () => clearInterval(timer);
    }, []);

    const start = pageIndex * PAGE_SIZE;
    const visible = TESTIMONIOS.slice(start, start + PAGE_SIZE);

    const goToPage = (idx: number) => {
        setPageIndex((idx + NUM_PAGES) % NUM_PAGES);
    };

    return (
        <section id="testimonios" className="scroll-mt-24 pt-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
                Qué dicen <span className="text-[#5352F6]">de nosotros</span>
            </h2>
            <p className="mb-10 max-w-2xl text-lg text-neutral-600 leading-relaxed">
                Lo que dicen quienes ya confían en Aldea y en La Unión.
            </p>

            <div className="relative">
                <div
                    key={pageIndex}
                    className="grid grid-cols-1 gap-6 animate-in fade-in duration-500 sm:grid-cols-2"
                >
                    {visible.map((t) => (
                        <div
                            key={t.author}
                            className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm md:p-10"
                        >
                            <Quote className="mb-5 h-10 w-10 text-[#5352F6]" aria-hidden />
                            <p className="mb-6 text-lg text-neutral-700 leading-relaxed md:text-xl">
                                &ldquo;{t.quote}&rdquo;
                            </p>
                            <p className="font-semibold text-neutral-900">{t.author}</p>
                            <p className="text-sm text-neutral-500">{t.role}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
                    <button
                        type="button"
                        onClick={() => goToPage(pageIndex - 1)}
                        aria-label="Página anterior"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 shadow-sm transition-colors hover:bg-neutral-50 hover:text-neutral-900"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>

                    <div className="flex items-center gap-2" role="tablist" aria-label="Páginas de testimonios">
                        {Array.from({ length: NUM_PAGES }).map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => goToPage(i)}
                                aria-label={`Ir a página ${i + 1}`}
                                aria-selected={i === pageIndex}
                                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                                    i === pageIndex
                                        ? "bg-[#5352F6] scale-110"
                                        : "bg-neutral-300 hover:bg-neutral-400"
                                }`}
                            />
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={() => goToPage(pageIndex + 1)}
                        aria-label="Página siguiente"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 shadow-sm transition-colors hover:bg-neutral-50 hover:text-neutral-900"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </section>
    );
}
