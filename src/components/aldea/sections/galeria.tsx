"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Expand, X } from "lucide-react";

const GALERIA_IMAGES = [
    {
        src: "https://lokl-assets.s3.us-east-1.amazonaws.com/lokl-marketing/IMG_7118+(1).jpg",
        alt: "La Unión - paisaje",
    },
    {
        src: "https://lokl-assets.s3.us-east-1.amazonaws.com/lokl-marketing/image_fx_+-+2025-03-20T223832.470.png",
        alt: "La Unión - entorno",
    },
    {
        src: "https://lokl-assets.s3.us-east-1.amazonaws.com/lokl-marketing/Aldea_5+(1).png",
        alt: "La Unión - naturaleza",
    },
    {
        src: "https://lokl-assets.s3.us-east-1.amazonaws.com/lokl-marketing/Gemini_Generated_Image_lpbqbqlpbqbqlpbq+(1).png",
        alt: "La Unión - sector",
    },
    {
        src: "https://lokl-assets.s3.us-east-1.amazonaws.com/lokl-marketing/IMG_7112+(1).jpg",
        alt: "La Unión - detalle",
    },
    {
        src: "https://lokl-assets.s3.us-east-1.amazonaws.com/lokl-marketing/image_fx_+-+2025-02-22T212057.650.png",
        alt: "La Unión - vista general",
    },
];

export function AldeaSectionGaleria() {
    const [selectedImage, setSelectedImage] = useState<{ src: string, alt: string } | null>(null);

    return (
        <section id="galeria" className="relative z-10 scroll-mt-24 bg-white pt-16 pb-10">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
                Así es <span className="text-[#5352F6]">La Unión</span>: conoce el entorno
            </h2>
            <p className="mb-10 max-w-2xl text-lg text-neutral-600 leading-relaxed">
                Conoce el entorno de La Unión: paisajes, infraestructura y el día a día del lugar que estamos transformando en un destino de turismo sostenible.
            </p>

            {/* Móvil: grid 2 columnas para que no haya scroll horizontal */}
            <div className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-2 overflow-hidden lg:hidden">
                {GALERIA_IMAGES.map(({ src, alt }) => (
                    <div
                        key={src}
                        className="relative aspect-[4/3] overflow-hidden rounded-lg group cursor-pointer"
                        onClick={() => setSelectedImage({ src, alt })}
                    >
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            className="object-cover object-center transition-all duration-500 group-hover:scale-105"
                            sizes="50vw"
                        />
                        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20 flex items-center justify-center z-10">
                            <Expand className="text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100 w-6 h-6 drop-shadow-md" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop: fila con efecto hover */}
            <div className="mx-auto hidden h-[400px] w-full max-w-4xl items-stretch gap-2 overflow-hidden lg:flex">
                {GALERIA_IMAGES.map(({ src, alt }) => (
                    <div
                        key={src}
                        className="relative h-full min-w-0 flex-1 overflow-hidden rounded-lg transition-all duration-500 hover:flex-[4] group cursor-pointer"
                        onClick={() => setSelectedImage({ src, alt })}
                    >
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            className="object-cover object-center transition-all duration-500 group-hover:scale-105"
                            sizes="(max-width: 1024px) 50vw, 200px"
                        />
                        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20 flex items-center justify-center z-10">
                            <Expand className="text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100 w-8 h-8 drop-shadow-md" />
                        </div>
                    </div>
                ))}
            </div>

            <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
                <DialogContent className="max-w-5xl border-none bg-transparent p-0 shadow-none" showCloseButton={false}>
                    <DialogTitle className="sr-only">{selectedImage?.alt || "Imagen ampliada"}</DialogTitle>

                    <DialogClose className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm transition-all hover:bg-black/70 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 md:right-0 md:-top-4">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Cerrar</span>
                    </DialogClose>

                    {selectedImage && (
                        <div className="relative w-full h-[85vh]">
                            <Image
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                fill
                                className="object-contain"
                                sizes="100vw"
                            />
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
}
