"use client";

import { motion } from 'framer-motion';
import { Calendar, Gift, Sparkles } from 'lucide-react';
// import christmasBackground from 'figma:asset/e3b83a3cbdf49b6ad809658b0ec78e9f3f7fc7c2.png'; // Missing asset

export function HowItWorks() {
    const steps = [
        {
            icon: Calendar,
            title: '1. Elige un día',
            description: 'Selecciona cualquier caja del calendario del 10 al 22 de diciembre.',
        },
        {
            icon: Gift,
            title: '2. Abre tu regalo',
            description: 'Haz clic en la caja para descubrir la recompensa exclusiva del día.',
        },
        {
            icon: Sparkles,
            title: '3. Disfruta tu recompensa',
            description: 'Accede a contenido premium, cupones y ventajas para tu crecimiento profesional.',
        },
    ];

    return (
        <section className="relative py-8 md:py-12 px-4 md:px-6 overflow-hidden">
            <div className="relative z-10 max-w-6xl mx-auto">

                {/* Título de la sección */}
                <motion.div
                    className="text-center mb-8 md:mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-white mb-3 md:mb-4 text-3xl md:text-5xl font-bold">¿Cómo funciona?</h2>
                    <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto px-4">
                        Participar es simple. Sigue estos pasos para disfrutar de las recompensas diarias.
                    </p>
                </motion.div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="relative"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-5 border border-white/20 hover:border-white/40 transition-all h-full">

                                {/* Ícono */}
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4" style={{ backgroundColor: '#5352f6' }}>
                                    <step.icon className="text-white" size={20} />
                                </div>

                                {/* Contenido */}
                                <h3 className="text-white mb-2 text-lg font-semibold">{step.title}</h3>
                                <p className="text-white/80 text-sm">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
