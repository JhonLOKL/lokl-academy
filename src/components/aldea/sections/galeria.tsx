import Image from "next/image";

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
                        className="relative aspect-[4/3] overflow-hidden rounded-lg"
                    >
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            className="object-cover object-center"
                            sizes="50vw"
                        />
                    </div>
                ))}
            </div>

            {/* Desktop: fila con efecto hover */}
            <div className="mx-auto hidden h-[400px] w-full max-w-4xl items-stretch gap-2 overflow-hidden lg:flex">
                {GALERIA_IMAGES.map(({ src, alt }) => (
                    <div
                        key={src}
                        className="relative h-full min-w-0 flex-1 overflow-hidden rounded-lg transition-all duration-500 hover:flex-[4]"
                    >
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 1024px) 50vw, 200px"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
