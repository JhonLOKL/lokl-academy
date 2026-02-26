"use client";

import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const HERO_BG_IMAGE =
    "https://lokl-assets.s3.us-east-1.amazonaws.com/home/HeroLoklPage/IMG_ALDEA.png";

interface AldeaHeroProps {
    onListaClick?: () => void;
}

export function AldeaHero({ onListaClick }: AldeaHeroProps) {
    return (
        <header
            className="relative flex min-h-[100vh] w-full flex-col items-center justify-center overflow-hidden text-white"
            style={{ height: "100vh" }}
        >
            {/* Background: fallback detrás, imagen encima (solo se ve el gradient si la imagen falla) */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
                    aria-hidden
                />
                <Image
                    src={HERO_BG_IMAGE}
                    alt=""
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                    onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = "none";
                    }}
                />
            </div>

            {/* Overlay suave para contraste del texto (sin tapar la imagen) */}
            <div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50"
                aria-hidden
            />

            {/* Centered content - Flexbox */}
            <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
                <h1 className="mb-6 max-w-4xl text-4xl font-extrabold uppercase tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                    Invierte en el{" "}
                    <span className="text-[#5352F6]">Futuro del Hospitality</span>{" "}
                    Colombiano
                </h1>

                <p className="mb-10 max-w-2xl text-lg text-white sm:text-xl">
                    Sé parte de la revolución del turismo sostenible. Obtén altas rentabilidades a través de proyectos eco-turísticos de lujo en las regiones más exóticas de Colombia, impulsando el desarrollo comunitario.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    {onListaClick ? (
                        <button
                            type="button"
                            onClick={onListaClick}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5352F6] px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:bg-[#4241C5] hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#5352F6]/50"
                        >
                            Únete a la lista de espera
                            <ArrowRight className="h-5 w-5" aria-hidden />
                        </button>
                    ) : (
                        <a
                            href="#lista-espera"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5352F6] px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:bg-[#4241C5] hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#5352F6]/50"
                        >
                            Únete a la lista de espera
                            <ArrowRight className="h-5 w-5" aria-hidden />
                        </a>
                    )}
                    <a
                        href="#back-this-project"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/60 bg-transparent px-8 py-4 text-lg font-bold text-white transition-all hover:bg-white/10 hover:border-white/80 focus:outline-none focus:ring-4 focus:ring-white/30"
                    >
                        <Play className="h-5 w-5" aria-hidden />
                        Ver proyecto
                    </a>
                </div>
            </div>
        </header>
    );
}
