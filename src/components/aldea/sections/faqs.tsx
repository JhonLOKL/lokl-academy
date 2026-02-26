"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
    {
        id: "que-es-aldea",
        question: "¿Qué es Aldea?",
        answer:
            "Aldea es una plataforma de inversión en proyectos de turismo sostenible y eco-turismo de lujo en Colombia. Conectamos a inversionistas con oportunidades en regiones con alto potencial, generando rentabilidad y desarrollo comunitario.",
    },
    {
        id: "donde-esta-union",
        question: "¿Dónde está La Unión?",
        answer:
            "La Unión está en el Eje Cafetero colombiano, en una zona de gran riqueza natural y tradición cafetera. Cuenta con buena conectividad para viajeros nacionales e internacionales, manteniendo un entorno rural y auténtico.",
    },
    {
        id: "como-invierto",
        question: "¿Cómo puedo invertir en La Unión?",
        answer:
            "Puedes registrarte en la lista de espera desde esta página. Una vez abierta la ronda de inversión, te contactaremos con los pasos para conocer el proyecto en detalle y formalizar tu participación.",
    },
    {
        id: "riesgos",
        question: "¿Qué riesgos conlleva esta inversión?",
        answer:
            "Como toda inversión, existen riesgos de mercado, ejecución y liquidez. En Aldea realizamos due diligence y curaduría de proyectos, y te entregamos toda la información para que tomes una decisión informada.",
    },
    {
        id: "plazos",
        question: "¿Cuáles son los plazos y la liquidez?",
        answer:
            "Los plazos y condiciones de liquidez dependen del proyecto. Toda la información detallada se comparte con los inversionistas interesados antes de comprometer capital.",
    },
] as const;

export function AldeaSectionFaqs() {
    return (
        <section id="faqs" className="scroll-mt-24 pt-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
                Todo lo que necesitas <span className="text-[#5352F6]">saber</span>
            </h2>
            <p className="mb-10 max-w-2xl text-lg text-neutral-600 leading-relaxed">
                Resolvemos las dudas más comunes sobre Aldea y La Unión.
            </p>

            <Accordion type="single" collapsible className="w-full">
                {FAQ_ITEMS.map(({ id, question, answer }) => (
                    <AccordionItem key={id} value={id}>
                        <AccordionTrigger className="text-left text-base font-medium text-neutral-900">
                            {question}
                        </AccordionTrigger>
                        <AccordionContent className="text-neutral-600 leading-relaxed">
                            {answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}
