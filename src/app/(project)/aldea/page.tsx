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
    const inspiracionSentinelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const sentinel = inspiracionSentinelRef.current;
        if (!sentinel) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                // Visible: estamos en "La visión detrás de Aldea" o más abajo
                // No visible + top < 0: scrolleamos hacia abajo, ya pasamos la sección → mantener sidebar
                // No visible + top > 0: aún no llegamos → ocultar sidebar
                const visible = entry.isIntersecting || entry.boundingClientRect.top < 0;
                setShowSidebar(visible);
            },
            { rootMargin: "-15% 0px -15% 0px", threshold: 0 }
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

            <AldeaContentLayout
                onListaClick={() => setListaModalOpen(true)}
                sidebarVariant="purple"
                showSidebar={showSidebar}
            >
                {/* Centinela: el sidebar solo se muestra cuando se llega a "La visión detrás de Aldea" */}
                <div ref={inspiracionSentinelRef} className="h-0 w-full" aria-hidden />
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
