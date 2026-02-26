"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";

interface AldeaSectionInspiracionProps {
    /** Si se pasa, el botón CTA abre el modal de lista de espera. */
    onListaClick?: () => void;
}

const IMAGEN_PRINCIPAL = {
    src: "/images/home/Gemini_Generated_Image_7u6mlk7u6mlk7u6m.png",
    alt: "Inspiración Aldea - Naturaleza y comunidad",
};

export function AldeaSectionInspiracion({ onListaClick }: AldeaSectionInspiracionProps) {
    const ctaButton = onListaClick ? (
        <button
            type="button"
            onClick={onListaClick}
            className="w-full rounded-xl bg-[#5352F6] px-6 py-3.5 text-base font-bold text-white shadow-lg transition-colors hover:bg-[#4241C5] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#5352F6]/50 sm:w-auto"
        >
            Únete a la lista de espera
        </button>
    ) : (
        <Link
            href="#lista-espera"
            className="inline-block w-full rounded-xl bg-[#5352F6] px-6 py-3.5 text-center text-base font-bold text-white shadow-lg transition-colors hover:bg-[#4241C5] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#5352F6]/50 sm:w-auto"
        >
            Únete a la lista de espera
        </Link>
    );

    return (
        <section id="inspiracion" className="scroll-mt-24">
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-12">
                {/* Columna izquierda: texto */}
                <div>
                    <div className="mb-2 flex items-center gap-2 text-[#5352F6]">
                        <Sparkles className="h-5 w-5" aria-hidden />
                        <span className="text-sm font-semibold uppercase tracking-wider">
                            Nuestro origen
                        </span>
                    </div>
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
                        La visión detrás de <span className="text-[#5352F6]">Aldea</span>
                    </h2>
                    <p className="text-lg leading-relaxed text-neutral-600">
                        Aldea nació de la convicción de que el turismo puede ser una fuerza de desarrollo sin sacrificar la naturaleza ni la identidad de las comunidades. Conectamos a viajeros que buscan experiencias únicas y responsables con territorios de alto potencial.
                    </p>
                </div>
                {/* Columna derecha: imagen */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white">
                    <Image
                        src={IMAGEN_PRINCIPAL.src}
                        alt={IMAGEN_PRINCIPAL.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                </div>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-4 border-t border-neutral-200 pt-10">
                <p className="w-full text-center text-sm font-medium text-neutral-600 sm:w-auto sm:flex-1 sm:text-left">
                    ¿Te inspira el turismo sostenible? Sé de los primeros en conocer el proyecto.
                </p>
                {ctaButton}
            </div>
        </section>
    );
}
