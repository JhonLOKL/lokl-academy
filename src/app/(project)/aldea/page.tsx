"use client";

import { useState, useEffect, useRef } from "react";
import { AldeaV3Hero } from "@/components/aldea-v3";
import {
    AldeaContentLayout,
    AldeaSectionInspiracion,
    AldeaSectionPorQueUnionLugar,
    AldeaSectionPorQueInvertir,
    AldeaSectionGaleria,
    AldeaSectionModeloNegocio,
    AldeaSectionTestimonios,
    AldeaSectionFaqs,
    ListaEsperaModal,
    AldeaStickyCtaMobile,
} from "@/components/aldea";
import { MarketingFooter } from "@/components/footer/marketing-footer";

export default function AldeaPage() {
    const [listaModalOpen, setListaModalOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const heroSentinelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const sentinel = heroSentinelRef.current;
        if (!sentinel) return;
        const io = new IntersectionObserver(
            ([entry]) => setShowSidebar(entry.isIntersecting),
            { rootMargin: "-10% 0px 0px 0px", threshold: 0 }
        );
        io.observe(sentinel);
        return () => io.disconnect();
    }, []);

    return (
        <>
            <AldeaV3Hero
                title={
                    <>
                        Invierte en el{" "}
                        <span className="text-[#5352F6]">Futuro del Hospitality</span>{" "}
                        Colombiano
                    </>
                }
                subtitle="Sé parte de la revolución del turismo sostenible. Obtén altas rentabilidades a través de proyectos eco-turísticos de lujo en las regiones más exóticas de Colombia, impulsando el desarrollo comunitario."
                primaryButtonLabel="Únete a la lista de espera"
                onPrimaryClick={() => setListaModalOpen(true)}
            />

            {/* Centinela: cuando entra en vista, el hero ya no está visible → se muestra el sidebar */}
            <div ref={heroSentinelRef} className="h-0 w-full" aria-hidden />

            <AldeaContentLayout
                onListaClick={() => setListaModalOpen(true)}
                sidebarVariant="purple"
                showSidebar={showSidebar}
            >
                <AldeaSectionInspiracion onListaClick={() => setListaModalOpen(true)} />
                <AldeaSectionPorQueUnionLugar />
                <AldeaSectionPorQueInvertir onListaClick={() => setListaModalOpen(true)} />
                <AldeaSectionGaleria />
                <AldeaSectionModeloNegocio />
                <AldeaSectionTestimonios />
                <AldeaSectionFaqs />

                {/* Ancla para el CTA "Únete a la lista de espera" del hero */}
                <section id="lista-espera" className="scroll-mt-24 pt-12" />
            </AldeaContentLayout>

            <MarketingFooter />

            <AldeaStickyCtaMobile onListaClick={() => setListaModalOpen(true)} />
            <ListaEsperaModal open={listaModalOpen} onOpenChange={setListaModalOpen} />
        </>
    );
}
