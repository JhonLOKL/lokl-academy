"use client";

import { useState } from "react";
import {
    AldeaHeroSplit,
    AldeaTrustBar,
    AldeaContentLayout,
    AldeaSectionInspiracion,
    AldeaSectionPorQueUnionLugar,
    AldeaSectionPorQueInvertir,
    AldeaSectionGaleria,
    AldeaSectionBeneficiosUbicacion,
    AldeaSectionModeloNegocio,
    AldeaSectionTestimonios,
    AldeaSectionFaqs,
    ListaEsperaModal,
    AldeaStickyCtaMobile,
} from "@/components/aldea";
import { MarketingFooter } from "@/components/footer/marketing-footer";

export default function AldeaPage() {
    const [listaModalOpen, setListaModalOpen] = useState(false);

    return (
        <>
            <AldeaHeroSplit onListaClick={() => setListaModalOpen(true)} />
            <AldeaTrustBar />

            <AldeaContentLayout onListaClick={() => setListaModalOpen(true)}>
                <AldeaSectionInspiracion />
                <AldeaSectionPorQueUnionLugar />
                <AldeaSectionPorQueInvertir />
                <AldeaSectionGaleria />
                <AldeaSectionBeneficiosUbicacion />
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
