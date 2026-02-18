'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { ReportJsonLd } from '@/components/reports/ReportJsonLd';

const PDF_URL = 'https://docs.google.com/document/d/1m_qIrRjgX_Fr1GymrQaO8kXJyCPWX2qdUO9zMQhw-EA/edit?usp=sharing';

export default function RadarInversion2026() {
    return (
        <>
            <ReportJsonLd
                title="Radar de Inversión 2026-2028: Las 5 Zonas de Explosión Inmobiliaria"
                description="Identificando los nodos de valorización agresiva para el ciclo 2026-2028 en Colombia."
                url="https://academy.lokl.life/reports/radar-inversion-2026-2028"
                datePublished="2026-02-01"
                image="https://academy.lokl.life/images/lokl-academy-og.jpg"
            />

            {/* CTA Descargar PDF - Barra superior */}
            <div className="flex justify-end mb-8">
                <a
                    href={PDF_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#5352F6] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#4241C5] transition-all shadow-md"
                >
                    <Download size={18} />
                    Descargar PDF Completo
                </a>
            </div>

            {/* Hero */}
            <header className="mb-20 text-center">
                <span className="inline-block mb-4 bg-[#FAFAFA] text-[#6D6C6C] px-3 py-1 rounded text-sm font-medium border border-[#E5E5E5]">
                    Análisis de Mercado · Colombia
                </span>
                <h1 className="text-5xl md:text-7xl font-extrabold text-[#0F0F0F] mb-6 leading-tight tracking-tight">
                    Las 5 Zonas de <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5352F6] to-[#4241C5]">
                        Explosión Inmobiliaria
                    </span>
                </h1>
                <p className="text-xl md:text-2xl text-[#444444] leading-relaxed max-w-3xl mx-auto font-light mb-8">
                    Identificando los nodos de valorización agresiva para el ciclo 2026-2028.
                </p>
                <div className="md:hidden">
                    <a
                        href={PDF_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-[#5352F6] text-white px-6 py-3 rounded-lg font-bold text-center"
                    >
                        Descargar Informe PDF
                    </a>
                </div>
            </header>

            <main className="space-y-20">
                {/* Section 1: Tesis Macro */}
                <section className="py-12 bg-[#FAFAFA] -mx-4 px-6 md:mx-0 md:px-8 rounded-2xl border border-[#E5E5E5]">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-[#0F0F0F]">La Tesis Macro (Step-Back)</h2>
                        <p className="text-[#6D6C6C] mt-2 max-w-2xl mx-auto">
                            Criterios fundamentales para la selección de activos de alto rendimiento.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { emoji: '🏗️', title: 'Infraestructura', desc: 'Metros, Túneles y Aeropuertos como catalizadores.' },
                            { emoji: '💻', title: 'Gentrificación', desc: 'Distritos creativos y demanda en dólares.' },
                            { emoji: '📜', title: 'Normativa', desc: 'Cambios de uso de suelo y densidad.' },
                            { emoji: '⚖️', title: 'Arbitraje', desc: 'Precio de mercado vs. Costo de reposición.' },
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-white p-6 rounded-xl border border-[#E5E5E5] text-center hover:border-[#5352F6] hover:shadow-lg transition-all duration-300"
                            >
                                <div className="text-3xl mb-3">{item.emoji}</div>
                                <h3 className="font-bold text-[#0F0F0F]">{item.title}</h3>
                                <p className="text-xs text-[#444444] mt-2">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Zona 1: Antioquia */}
                <section className="pt-8 border-t border-[#E5E5E5]">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-8">
                        <div>
                            <span className="text-[#5352F6] font-bold tracking-widest uppercase text-xs">Zona #1 · Antioquia</span>
                            <h2 className="text-4xl font-extrabold text-[#0F0F0F] mt-2">Rionegro & Medellín</h2>
                            <p className="text-xl text-[#6D6C6C] mt-2">El nuevo hub de innovación y lujo.</p>
                        </div>
                        <span className="mt-4 md:mt-0 bg-green-100 text-green-700 px-3 py-1 rounded text-xs font-bold border border-green-200">
                            Riesgo Bajo
                        </span>
                    </div>

                    <div className="bg-[#FAFAFA] p-8 rounded-xl border border-[#E5E5E5] mb-8">
                        <h3 className="text-sm font-bold text-[#6D6C6C] uppercase mb-6">Cadena de Valor</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <strong className="block text-[#0F0F0F] mb-2">1. Detonante</strong>
                                <p className="text-sm text-[#444444]">Túnel de Oriente + Consolidación de Medellín como Tech Hub Latam.</p>
                            </div>
                            <div>
                                <strong className="block text-[#0F0F0F] mb-2">2. Reacción</strong>
                                <p className="text-sm text-[#444444]">Llegada masiva de capital extranjero y nómadas digitales buscando rentas flexibles.</p>
                            </div>
                            <div>
                                <strong className="block text-[#5352F6] mb-2">3. Oportunidad</strong>
                                <p className="text-sm text-[#444444]">Proyectos con licencia turística y conceptos de co-living en zonas premium.</p>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 text-white relative overflow-hidden shadow-lg"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-bold select-none">MDE</div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <span className="bg-[#5352F6] text-white text-xs px-2 py-1 rounded uppercase tracking-wide font-bold mb-2 inline-block">
                                    LOKL Pick
                                </span>
                                <h3 className="text-3xl font-bold mb-2">Indie Universe</h3>
                                <p className="text-gray-300 text-sm max-w-lg">
                                    Inversión en el corazón de la innovación de Medellín. Un ecosistema diseñado para el nómada digital moderno con alta valorización proyectada.
                                </p>
                            </div>
                            <a
                                href="https://lokl.life/indie-universe"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="whitespace-nowrap bg-white text-[#0F0F0F] px-6 py-3 rounded-lg font-bold hover:bg-[#5352F6] hover:text-white transition-all shadow-lg"
                            >
                                Ver Oportunidades en Medellín →
                            </a>
                        </div>
                    </motion.div>
                </section>

                {/* Zona 2: San Felipe */}
                <section className="py-12 bg-[#FAFAFA] -mx-4 px-6 md:mx-0 md:px-8 rounded-2xl border border-[#E5E5E5]">
                    <div className="mb-8">
                        <span className="text-[#5352F6] font-bold tracking-widest uppercase text-xs">Zona #2 · Bogotá</span>
                        <h2 className="text-4xl font-extrabold text-[#0F0F0F] mt-2">San Felipe</h2>
                        <p className="text-xl text-[#6D6C6C] mt-2">Gentrificación pura: El Distrito de Arte.</p>
                    </div>
                    <div className="bg-white p-8 rounded-xl border border-[#E5E5E5] shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h4 className="font-bold text-[#0F0F0F] mb-4 text-lg">¿Por qué San Felipe?</h4>
                                <p className="text-sm text-[#444444] mb-4 leading-relaxed">
                                    Similar a Wynwood (Miami). La construcción de la <strong>Línea 1 del Metro</strong> y su designación como Distrito Creativo están transformando bodegas industriales en galerías y lofts.
                                </p>
                                <ul className="text-sm text-[#444444] space-y-2">
                                    <li className="flex items-center gap-2"><span className="text-[#5352F6]">✓</span> Entrada: $7M COP / m²</li>
                                    <li className="flex items-center gap-2"><span className="text-[#5352F6]">✓</span> Rentabilidad Potencial: 0.8% Mensual</li>
                                </ul>
                            </div>
                            <div className="flex items-center justify-center bg-gray-50 rounded-lg border border-[#E5E5E5] p-6">
                                <div className="text-center">
                                    <span className="block text-4xl font-bold text-[#0F0F0F] mb-1">15%</span>
                                    <span className="text-xs text-[#6D6C6C] uppercase tracking-wide">CAGR Proyectado</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Zona 3: Guatapé & Costa */}
                <section className="pt-8 border-t border-[#E5E5E5]">
                    <div className="mb-8">
                        <span className="text-[#5352F6] font-bold tracking-widest uppercase text-xs">Zona #3 · Turismo Experiencial</span>
                        <h2 className="text-4xl font-extrabold text-[#0F0F0F] mt-2">Guatapé & La Costa</h2>
                        <p className="text-xl text-[#6D6C6C] mt-2">Rentas Cortas de Alto Rendimiento.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-xl border border-[#E5E5E5] hover:border-[#5352F6] hover:shadow-lg transition-all">
                            <h3 className="text-2xl font-bold text-[#0F0F0F] mb-4">Pozos Colorados</h3>
                            <p className="text-sm text-[#444444] mb-6">
                                La alternativa premium a Cartagena. Escasez de suelo frente al mar y llegada de hotelería internacional impulsan los precios por m².
                            </p>
                            <div className="flex gap-2">
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">Santa Marta</span>
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">Playa</span>
                            </div>
                        </div>

                        <div className="relative rounded-xl overflow-hidden border-2 border-[#5352F6] shadow-xl">
                            <div className="absolute inset-0 bg-[#5352F6]/90 z-0" />
                            <div className="relative z-10 p-8 text-white flex flex-col justify-between min-h-[220px]">
                                <div>
                                    <span className="bg-white text-[#5352F6] text-xs px-2 py-1 rounded uppercase tracking-wide font-bold mb-3 inline-block">
                                        Destino Top
                                    </span>
                                    <h3 className="text-3xl font-bold mb-2">Guatapé: Nido de Agua</h3>
                                    <p className="text-blue-100 text-sm mb-6">
                                        El turismo en la piedra del Peñol rompe récords anuales. Invierte en un proyecto eco-sostenible único en la represa.
                                    </p>
                                </div>
                                <a
                                    href="https://lokl.life/nido-de-agua"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full text-center bg-white text-[#5352F6] px-4 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors shadow-sm"
                                >
                                    Ver Proyectos en Guatapé →
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Oportunidades Emergentes */}
                <section className="py-12 bg-[#FAFAFA] -mx-4 px-6 md:mx-0 md:px-8 rounded-2xl border border-[#E5E5E5]">
                    <h2 className="text-2xl font-bold text-[#0F0F0F] mb-8 text-center">Oportunidades Emergentes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-[#E5E5E5] hover:border-[#5352F6] hover:shadow-md transition-all">
                            <h4 className="font-bold text-[#0F0F0F]">Ciudad Mallorquín (Barranquilla)</h4>
                            <p className="text-xs text-[#444444] mt-2">Urbanismo sostenible planificado. La expansión natural de la clase media-alta.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-[#E5E5E5] hover:border-[#5352F6] hover:shadow-md transition-all">
                            <h4 className="font-bold text-[#0F0F0F]">Cerritos (Pereira)</h4>
                            <p className="text-xs text-[#444444] mt-2">Hub logístico y destino de retiro climático. Vivienda campestre de alto nivel.</p>
                        </div>
                    </div>
                </section>

                {/* Footer CTA */}
                <footer className="pt-12 border-t border-[#E5E5E5]">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <h2 className="text-3xl font-bold text-[#0F0F0F] mb-6">¿Listo para profundizar?</h2>
                        <p className="text-[#444444] mb-8">
                            Accede al análisis completo con data detallada de cada zona, proyecciones financieras y mapas de calor.
                        </p>
                        <a
                            href={PDF_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#5352F6] text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#4241C5] transition-all shadow-lg hover:shadow-xl"
                        >
                            <ExternalLink size={20} />
                            Descargar Informe Completo (PDF)
                        </a>
                    </div>
                    <div className="max-w-7xl mx-auto pt-8 border-t border-[#E5E5E5] flex flex-col md:flex-row justify-between items-center text-xs text-[#6D6C6C]">
                        <p>© 2026 LOKL Investment Group.</p>
                        <div className="flex gap-4 mt-4 md:mt-0">
                            <Link href="#" className="hover:text-[#5352F6]">Términos</Link>
                            <Link href="#" className="hover:text-[#5352F6]">Privacidad</Link>
                        </div>
                    </div>
                </footer>
            </main>
        </>
    );
}
