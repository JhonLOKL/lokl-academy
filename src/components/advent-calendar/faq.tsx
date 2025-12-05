"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
// import christmasBackground from 'figma:asset/e3b83a3cbdf49b6ad809658b0ec78e9f3f7fc7c2.png'; // Unused

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: '¿Cuándo puedo abrir los regalos?',
            answer: 'Puedes abrir cualquier regalo del 10 al 22 de diciembre. Cada día desbloquea una recompensa especial diseñada para impulsar tu crecimiento profesional.',
        },
        {
            question: '¿Qué tipo de recompensas hay?',
            answer: 'Las recompensas incluyen contenido premium, cupones exclusivos, acceso a recursos educativos, descuentos especiales y muchas más sorpresas relacionadas con desarrollo profesional.',
        },
        {
            question: '¿Puedo abrir más de un regalo al día?',
            answer: 'Sí, puedes abrir todos los regalos disponibles hasta la fecha actual. Sin embargo, cada regalo está diseñado para ser disfrutado día a día durante diciembre.',
        },
        {
            question: '¿Las recompensas tienen fecha de vencimiento?',
            answer: 'Algunas recompensas pueden tener fechas de validez específicas, especialmente los cupones. Te recomendamos revisar los detalles de cada recompensa al abrirla.',
        },
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="relative py-12 px-6 overflow-hidden bg-white">
            <div className="relative z-10 max-w-4xl mx-auto">

                {/* Título */}
                <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="mb-4 text-5xl font-bold" style={{ color: '#5352fe' }}>Preguntas frecuentes</h2>
                    <p className="text-lg" style={{ color: '#5352fe' }}>
                        Encuentra respuestas a las dudas más comunes sobre el Calendario de Adviento LOKL.
                    </p>
                </motion.div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            className="bg-[#5352fe]/5 backdrop-blur-md rounded-xl border border-[#5352fe]/20 overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.05 }}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#5352fe]/10 transition-all"
                            >
                                <span className="pr-4" style={{ color: '#5352fe' }}>{faq.question}</span>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDown className="text-[#5352fe]" size={20} />
                                </motion.div>
                            </button>

                            <motion.div
                                initial={false}
                                animate={{
                                    height: openIndex === index ? 'auto' : 0,
                                    opacity: openIndex === index ? 1 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="px-6 pb-5 pt-2" style={{ color: '#5352fe' }}>
                                    {faq.answer}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
