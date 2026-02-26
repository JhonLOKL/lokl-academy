"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";

const BENEFIT_IMAGES = [
    "https://lokl-assets.s3.us-east-1.amazonaws.com/lokl-marketing/Aldea_5+(1).png",
    "https://lokl-assets.s3.us-east-1.amazonaws.com/lokl-marketing/Gemini_Generated_Image_lpbqbqlpbqbqlpbq+(1).png",
    "https://lokl-assets.s3.us-east-1.amazonaws.com/lokl-marketing/IMG_7112+(1).jpg",
    "https://lokl-assets.s3.us-east-1.amazonaws.com/lokl-marketing/image_fx_+-+2025-02-22T212057.650.png",
];

const HIGHLIGHTS = [
    { title: "Ubicación estratégica", description: "Conectividad para viajeros sin perder el carácter rural.", image: BENEFIT_IMAGES[0] },
    { title: "Riqueza natural", description: "Paisaje, clima y actividades de alto valor.", image: BENEFIT_IMAGES[1] },
    { title: "Tradición cafetera", description: "Cultura del café y gastronomía local.", image: BENEFIT_IMAGES[2] },
    { title: "Comunidad activa", description: "Crecer junto al turismo sostenible.", image: BENEFIT_IMAGES[3] },
];

function HighlightCard({
    title,
    description,
    image,
}: { title: string; description: string; image: string }) {
    return (
        <div className="group relative h-[380px] min-h-[320px] w-full overflow-hidden rounded-2xl shadow-lg transition-all duration-500">
            <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/40 to-black/85 z-10" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                <h3 className="text-xl font-bold leading-tight text-white md:text-2xl">
                    {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white md:text-base">
                    {description}
                </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-[#5352F6]/0 via-[#5352F6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[15]" />
        </div>
    );
}

export function AldeaSectionPorQueUnionLugar() {
    return (
        <section id="por-que-union-lugar" className="scroll-mt-24 pt-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
                Qué hace especial a <span className="text-[#5352F6]">La Unión</span>
            </h2>
            <p className="mb-10 max-w-3xl text-lg text-neutral-600 leading-relaxed">
                La Unión reúne todo lo que buscamos para un proyecto de impacto. No es un destino masificado; es un lugar donde la experiencia del visitante se construye con calma y autenticidad.
            </p>

            <div className="porque-union-swiper-container overflow-hidden w-full">
                <div className="mb-4 flex justify-end gap-2">
                    <button
                        type="button"
                        aria-label="Anterior"
                        className="porque-union-prev flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 shadow-sm transition hover:bg-neutral-50 hover:text-neutral-900 disabled:opacity-40"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>
                    <button
                        type="button"
                        aria-label="Siguiente"
                        className="porque-union-next flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 shadow-sm transition hover:bg-neutral-50 hover:text-neutral-900 disabled:opacity-40"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                </div>
                <Swiper
                    modules={[Navigation, Pagination, A11y]}
                    spaceBetween={16}
                    slidesPerView={1.15}
                    navigation={{
                        prevEl: ".porque-union-prev",
                        nextEl: ".porque-union-next",
                    }}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    breakpoints={{
                        640: { slidesPerView: 2, spaceBetween: 20 },
                        1024: { slidesPerView: 4, spaceBetween: 24 },
                    }}
                    className="porque-union-swiper porque-union-swiper-stagger pb-10"
                >
                    {HIGHLIGHTS.map((item, i) => (
                        <SwiperSlide key={item.title} className="!h-auto">
                            <div className={i % 2 === 1 ? "lg:pt-20" : ""}>
                                <HighlightCard {...item} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="mt-10 rounded-2xl bg-white p-6 md:p-8">
                <p className="text-neutral-600 leading-relaxed">
                    La zona permite diseñar una propuesta de alojamiento y experiencias de alto valor. Elegir La Unión como primer nodo de Aldea nos permite demostrar que el modelo funciona: inversión seria, turismo de calidad y desarrollo comunitario pueden ir de la mano en las regiones más bellas de Colombia.
                </p>
            </div>
        </section>
    );
}
