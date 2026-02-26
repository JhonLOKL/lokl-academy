"use client";

import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";

const HERO_IMAGE =
    "https://lokl-assets.s3.us-east-1.amazonaws.com/home/HeroLoklPage/IMG_ALDEA.png";

interface AldeaHeroSplitProps {
    onListaClick?: () => void;
}

export function AldeaHeroSplit({ onListaClick }: AldeaHeroSplitProps) {
    return (
        <header className="min-h-screen w-full bg-background">
            <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
                {/* Columna imagen: ocupa toda la altura de la pantalla */}
                <div className="relative flex min-h-[50vh] w-full overflow-hidden lg:min-h-full">
                    <Image
                        src={HERO_IMAGE}
                        alt="Aldea - Proyecto eco-turístico en La Unión"
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        onError={(e) => {
                            e.currentTarget.style.display = "none";
                        }}
                    />
                    {/* Overlay gradiente */}
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent"
                        aria-hidden
                    />
                    <div
                        className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
                        aria-hidden
                    />

                    {/* Play centrado */}
                    <div
                        className="absolute left-1/2 top-1/2 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition hover:bg-white/30"
                        aria-hidden
                    >
                        <Play className="h-7 w-7 text-white" fill="currentColor" />
                    </div>

                    {/* Banda inferior - pills */}
                    <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-wrap justify-center gap-2 bg-black/40 px-4 py-3 backdrop-blur-sm lg:justify-start lg:px-6">
                        <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white">
                            Eco-turístico
                        </span>
                        <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white">
                            Inversión en comunidad
                        </span>
                        <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white">
                            La Unión, Colombia
                        </span>
                    </div>
                </div>

                {/* Columna derecha: título arriba, descripción debajo */}
                <div className="flex flex-col justify-center border-l border-border bg-background px-6 py-10 lg:px-10 lg:py-16 xl:px-14">
                    {/* Título grande arriba — fuente Inter del sitio */}
                    <h1 className="mb-8 max-w-xl text-left font-sans text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl xl:text-[3.25rem]">
                        <span className="block">Invierte en el</span>
                        <span className="block font-medium text-[#5352F6]">futuro del hospitality</span>
                        <span className="mt-0.5 flex items-center gap-2">
                            colombiano.
                            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#5352F6]" aria-hidden />
                        </span>
                    </h1>

                    {/* Descripción debajo: línea acento + texto + CTA */}
                    <div className="flex flex-col">
                        <div className="mb-4 h-0.5 w-12 shrink-0 rounded-full bg-[#5352F6]" aria-hidden />
                        <p className="mb-6 max-w-md font-sans text-sm font-normal leading-relaxed text-muted-foreground sm:text-base">
                            Proyecto eco-turístico de LOKL en La Unión. Inversión en comunidad con impacto y rentabilidad para quienes invierten.
                        </p>
                        {onListaClick ? (
                            <button
                                type="button"
                                onClick={onListaClick}
                                className="inline-flex w-full items-center gap-2 font-sans text-base font-normal uppercase tracking-wide text-foreground transition hover:text-[#5352F6] focus:outline-none focus:ring-2 focus:ring-[#5352F6]/30 focus:ring-offset-2 sm:w-fit"
                            >
                                Únete a la lista de espera
                                <ArrowRight className="h-5 w-5" aria-hidden />
                            </button>
                        ) : (
                            <a
                                href="#lista-espera"
                                className="inline-flex w-full items-center gap-2 font-sans text-base font-normal uppercase tracking-wide text-foreground transition hover:text-[#5352F6] focus:outline-none focus:ring-2 focus:ring-[#5352F6]/30 focus:ring-offset-2 sm:w-fit"
                            >
                                Únete a la lista de espera
                                <ArrowRight className="h-5 w-5" aria-hidden />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
