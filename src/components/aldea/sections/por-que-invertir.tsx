"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/** Mapa de La Unión, Valle del Cauca (Eje Cafetero). Sin marcador para evitar el punto rojo. */
const MAPA_LA_UNION_EMBED =
    "https://www.openstreetmap.org/export/embed.html?bbox=-76.14%2C4.51%2C-76.06%2C4.56&layer=mapnik";

const INVERSION_IMAGES = [
    { src: "https://lokl-assets.s3.us-east-1.amazonaws.com/lokl-marketing/IMG_7118+(1).jpg", alt: "La Unión - paisaje" },
    { src: "https://lokl-assets.s3.us-east-1.amazonaws.com/lokl-marketing/image_fx_+-+2025-03-20T223832.470.png", alt: "La Unión - entorno" },
    { src: "https://lokl-assets.s3.us-east-1.amazonaws.com/lokl-marketing/Aldea_5+(1).png", alt: "La Unión - naturaleza" },
    { src: "https://lokl-assets.s3.us-east-1.amazonaws.com/lokl-marketing/Gemini_Generated_Image_lpbqbqlpbqbqlpbq+(1).png", alt: "La Unión - sector" },
    { src: "https://lokl-assets.s3.us-east-1.amazonaws.com/lokl-marketing/IMG_7112+(1).jpg", alt: "La Unión - detalle" },
    { src: "https://lokl-assets.s3.us-east-1.amazonaws.com/lokl-marketing/image_fx_+-+2025-02-22T212057.650.png", alt: "La Unión - vista general" },
];

const ROTATION_INTERVAL_MS = 4000;

interface AldeaSectionPorQueInvertirProps {
    /** Si se pasa, el botón CTA abre el modal de lista de espera. */
    onListaClick?: () => void;
}

export function AldeaSectionPorQueInvertir({ onListaClick }: AldeaSectionPorQueInvertirProps) {
    const [rotationIndex, setRotationIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setRotationIndex((prev) => (prev + 1) % INVERSION_IMAGES.length);
        }, ROTATION_INTERVAL_MS);
        return () => clearInterval(id);
    }, []);

    const img0 = INVERSION_IMAGES[rotationIndex];
    const img1 = INVERSION_IMAGES[(rotationIndex + 2) % INVERSION_IMAGES.length];
    const img2 = INVERSION_IMAGES[(rotationIndex + 4) % INVERSION_IMAGES.length];
    const ctaButton = onListaClick ? (
        <button
            type="button"
            onClick={onListaClick}
            className="w-full rounded-xl bg-[#5352F6] px-6 py-3.5 text-base font-bold text-white shadow-lg transition-colors hover:bg-[#4241C5] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#5352F6]/50"
        >
            Ver más e invertir
        </button>
    ) : (
        <Link
            href="#lista-espera"
            className="inline-block w-full rounded-xl bg-[#5352F6] px-6 py-3.5 text-center text-base font-bold text-white shadow-lg transition-colors hover:bg-[#4241C5] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#5352F6]/50"
        >
            Ver más e invertir
        </Link>
    );

    return (
        <section id="por-que-invertir" className="scroll-mt-24 pt-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-6 lg:items-start">
                {/* Columna 1: título, texto e imagen grande */}
                <div className="flex min-h-0 flex-col gap-6">
                    <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
                        Tu oportunidad de invertir con <span className="text-[#5352F6]">propósito</span>
                    </h2>
                    <p className="text-lg text-neutral-600 leading-relaxed">
                        Explora por qué La Unión es una oportunidad de inversión con propósito: activo real, sector en crecimiento y un modelo que combina rentabilidad con impacto en la comunidad.
                    </p>
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white">
                        <iframe
                            title="Mapa de La Unión, Valle del Cauca"
                            src={MAPA_LA_UNION_EMBED}
                            className="absolute inset-0 h-full w-full border-0"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>

                {/* Columna 2: dos imágenes apiladas (rotan con las 6) */}
                <div className="flex min-h-0 flex-col gap-4">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                        <Image
                            key={img0.src}
                            src={img0.src}
                            alt={img0.alt}
                            fill
                            className="object-cover transition-opacity duration-500"
                            sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                    </div>
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                        <Image
                            key={img1.src}
                            src={img1.src}
                            alt={img1.alt}
                            fill
                            className="object-cover transition-opacity duration-500"
                            sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                    </div>
                </div>

                {/* Columna 3: imagen más alta + botón CTA */}
                <div className="flex min-h-0 flex-col gap-4">
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
                        <Image
                            key={img2.src}
                            src={img2.src}
                            alt={img2.alt}
                            fill
                            className="object-cover transition-opacity duration-500"
                            sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                    </div>
                    <div className="flex shrink-0">
                        {ctaButton}
                    </div>
                </div>
            </div>
        </section>
    );
}
