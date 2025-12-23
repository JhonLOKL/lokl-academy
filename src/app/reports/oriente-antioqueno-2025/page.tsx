'use client';

import React from 'react';
import Link from 'next/link';
import {
    ArrowLeft,
    ExternalLink,
    TrendingUp,
    Layout,
    AlertTriangle,
    PieChart,
    ShieldCheck,
    BarChart3,
    UserX,
    Activity,
    Home,
    Briefcase
} from 'lucide-react';
import { motion } from 'framer-motion';
import { MarketingFooter } from '@/components/footer/marketing-footer';
import { ReportJsonLd } from '@/components/reports/ReportJsonLd';

const OrienteAnalytics2025 = () => {
    return (
        <>
            <ReportJsonLd
                title="Análisis Estratégico Oriente Antioqueño 2025"
                description="Análisis profundo del mercado inmobiliario del Oriente Antioqueño. Evaluación de micro-mercados y vectores de infraestructura."
                url="https://academy.lokl.life/reports/oriente-antioqueno-2025"
                datePublished="2025-12-01"
                image="https://academy.lokl.life/images/reports/oriente-og.jpg"
            />
            <style jsx>{`
        h1, h2, h3, h4, h5, h6 { color: #0F0F0F; }
`}</style>

            <div className="">


                {/* Executive Summary / Thesis */}
                <header className="mb-20">
                    <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">Resumen Ejecutivo</span>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 text-[#0F0F0F] leading-tight">
                        La Maduración de una <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5352F6] to-[#A1A0FB]">Economía Subregional</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-5xl">
                        El Oriente Antioqueño ha superado su etapa de &quot;satélite recreativo&quot; para consolidarse como una zona económica autónoma. A pesar de la rápida valorización, el reporte concluye que el mercado se fundamenta en <strong>crecimiento orgánico</strong> y no en una burbuja especulativa, aunque advierte sobre riesgos específicos en segmentos de ultra-lujo y rentas cortas saturadas.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-white px-8 py-6 rounded-2xl border-2 border-light shadow-sm hover:shadow-md transition-all hover:border-primary/30">
                            <span className="block text-xs text-gray-400 uppercase font-bold mb-3 tracking-wider">Inflación (IPC)</span>
                            <span className="text-4xl font-extrabold text-[#0F0F0F]">~5.3%</span>
                        </div>
                        <div className="bg-white px-8 py-6 rounded-2xl border-2 border-light shadow-sm hover:shadow-md transition-all hover:border-primary/30">
                            <span className="block text-xs text-gray-400 uppercase font-bold mb-3 tracking-wider">Tasa Hipotecaria</span>
                            <span className="text-4xl font-extrabold text-[#0F0F0F]">8.25 - 9.25%</span>
                        </div>
                        <div className="bg-white px-8 py-6 rounded-2xl border-2 border-light shadow-sm hover:shadow-md transition-all hover:border-red-200">
                            <span className="block text-xs text-gray-400 uppercase font-bold mb-3 tracking-wider">Déficit Vivienda</span>
                            <span className="text-4xl font-extrabold text-red-500">Escasez 2026</span>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-[#F5F5F5] via-white to-[#FAFAFA] border-2 border-[#E5E5E5] rounded-2xl p-8 shadow-sm">
                        <div>
                            <span className="card-label text-primary mb-1">Señal de Mercado</span>
                            <div className="text-3xl md:text-4xl font-extrabold text-[#0F0F0F] mb-3">Acumulación Cautelosa</div>
                            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                                Se recomienda priorizar activos con utilidad intrínseca en nodos consolidados (Rionegro, La Ceja) sobre apuestas especulativas en zonas periféricas.
                            </p>
                        </div>
                    </div>
                </header>

                <main className="space-y-20">
                    {/* Section 1: Infrastructure & Valuation Vectors */}
                    <section id="infraestructura">
                        <div className="section-header">
                            <h2 className="text-2xl font-bold">Vectores de Valoración: Infraestructura</h2>
                            <div className="section-line"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Vector 1 */}
                            <article className="info-card">
                                <div className="mb-4">
                                    <span className="tag tag-blue mb-2">Multiplicador 1.5x</span>
                                    <h3 className="text-xl font-bold text-[#0F0F0F] mt-1">Expansión Túnel de Oriente</h3>
                                </div>
                                <p className="text-sm text-gray-600 mb-4 flex-grow leading-relaxed">
                                    Con entrega proyectada para <strong>2027</strong>, esta obra funciona como una &quot;opción de venta&quot; (put option) sobre el valor del suelo. Las propiedades a &lt;15 mins (Sajonia, Palmas) mantienen la prima más alta por conectividad.
                                </p>
                                <div className="text-xs text-gray-400 border-t border-light pt-3">
                                    Impacto: Consolidación del modelo &quot;Ciudad Dormitorio&quot;.
                                </div>
                            </article>

                            {/* Vector 2 */}
                            <article className="info-card">
                                <div className="mb-4">
                                    <span className="tag tag-blue mb-2">Aerotrópolis</span>
                                    <h3 className="text-xl font-bold text-[#0F0F0F] mt-1">Aeropuerto JMC</h3>
                                </div>
                                <p className="text-sm text-gray-600 mb-4 flex-grow leading-relaxed">
                                    La modernización de la terminal y la segunda pista impulsan la demanda de tres tipologías específicas: Residencial de corta estancia (Tripulaciones/Ejecutivos), Logística (Zona Franca) y Oficinas Multinacionales.
                                </p>
                                <div className="text-xs text-gray-400 border-t border-light pt-3">
                                    Impacto: Micro-mercado comercial independiente del ciclo hipotecario.
                                </div>
                            </article>

                            {/* Vector 3 */}
                            <article className="info-card">
                                <div className="mb-4">
                                    <span className="tag tag-blue mb-2">Ciudad Policéntrica</span>
                                    <h3 className="text-xl font-bold text-[#0F0F0F] mt-1">Conectividad Interna</h3>
                                </div>
                                <p className="text-sm text-gray-600 mb-4 flex-grow leading-relaxed">
                                    Vías como la Doble Calzada Llanogrande-La Ceja desbloquean suelo rural y difunden la demanda. Permiten vivir en municipios de menor costo (La Ceja) accediendo a servicios premium (Rionegro).
                                </p>
                                <div className="text-xs text-gray-400 border-t border-light pt-3">
                                    Impacto: Arbitraje de precios entre municipios vecinos.
                                </div>
                            </article>
                        </div>
                    </section>

                    {/* Section 2: Deep Dive Micro-Markets */}
                    <section id="micromercados" className="relative">
                        <div className="section-header">
                            <h2 className="text-2xl font-bold">Análisis de Micro-Mercados</h2>
                            <div className="section-line"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            {/* Rionegro / Llanogrande */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="absolute top-0 left-0 w-1.5 h-full bg-primary rounded-l-2xl"></div>
                                <div className="flex justify-between items-start mb-6 pl-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-[#0F0F0F] group-hover:text-primary transition-colors">Rionegro &amp; Llanogrande</h3>
                                        <p className="text-sm text-gray-500 mt-1">Núcleo metropolitano y Milla de Oro</p>
                                    </div>
                                    <span className="px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-amber-100">
                                        Saturación Tráfico
                                    </span>
                                </div>

                                <p className="text-sm text-gray-600 mb-8 pl-2 leading-relaxed">
                                    Tendencia hacia la densificación (subdivisión de fincas en aptos de lujo). Alta demanda corporativa y residencial premium.
                                </p>

                                <div className="grid grid-cols-2 gap-4 pl-2">
                                    <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                                        <div className="flex items-center gap-2 mb-2 text-gray-400">
                                            <TrendingUp size={14} />
                                            <span className="text-[10px] font-bold uppercase tracking-wider">Precio Venta</span>
                                        </div>
                                        <span className="text-sm font-bold text-[#0F0F0F]">$8M - $12M</span>
                                        <span className="text-[10px] text-gray-400 block mt-0.5">COP/m²</span>
                                    </div>
                                    <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                                        <div className="flex items-center gap-2 mb-2 text-gray-400">
                                            <Layout size={14} />
                                            <span className="text-[10px] font-bold uppercase tracking-wider">Renta Mensual</span>
                                        </div>
                                        <span className="text-sm font-bold text-[#0F0F0F]">$6.5M - $9.0M</span>
                                        <span className="text-[10px] text-gray-400 block mt-0.5">COP (3 Hab)</span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-50 pl-2">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 p-1 bg-red-50 rounded text-red-500">
                                            <AlertTriangle size={12} />
                                        </div>
                                        <p className="text-[11px] text-gray-500 leading-normal">
                                            <strong className="text-gray-700">Riesgo:</strong> Compresión de Yields (4-5% bruto) por alto valor del activo. Inversión depende de apreciación.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* La Ceja */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                transition={{ delay: 0.1 }}
                                className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="absolute top-0 left-0 w-1.5 h-full bg-green-500 rounded-l-2xl"></div>
                                <div className="flex justify-between items-start mb-6 pl-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-[#0F0F0F] group-hover:text-green-600 transition-colors">La Ceja</h3>
                                        <p className="text-sm text-gray-500 mt-1">La alternativa sostenible</p>
                                    </div>
                                    <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-green-100">
                                        Oportunidad Valor
                                    </span>
                                </div>

                                <p className="text-sm text-gray-600 mb-8 pl-2 leading-relaxed">
                                    Topografía plana, caminable. Absorbe el desbordamiento de Rionegro con precios competitivos y alta calidad de vida.
                                </p>

                                <div className="grid grid-cols-2 gap-4 pl-2">
                                    <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                                        <div className="flex items-center gap-2 mb-2 text-gray-400">
                                            <TrendingUp size={14} />
                                            <span className="text-[10px] font-bold uppercase tracking-wider">Precio Venta</span>
                                        </div>
                                        <span className="text-sm font-bold text-[#0F0F0F]">$4.5M - $6.5M</span>
                                        <span className="text-[10px] text-gray-400 block mt-0.5">COP/m²</span>
                                    </div>
                                    <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                                        <div className="flex items-center gap-2 mb-2 text-gray-400">
                                            <PieChart size={14} />
                                            <span className="text-[10px] font-bold uppercase tracking-wider">Valorización</span>
                                        </div>
                                        <span className="text-sm font-bold text-[#0F0F0F]">~9% Anual</span>
                                        <span className="text-[10px] text-gray-400 block mt-0.5">Datos 2024</span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-50 pl-2">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 p-1 bg-green-50 rounded text-green-500">
                                            <ShieldCheck size={12} />
                                        </div>
                                        <p className="text-[11px] text-gray-500 leading-normal">
                                            <strong className="text-gray-700">Tesis:</strong> Atractivo para jubilados y familias jóvenes. Alta liquidez en reventa por ticket de entrada accesible.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* San Antonio */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                transition={{ delay: 0.2 }}
                                className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500 rounded-l-2xl"></div>
                                <div className="flex justify-between items-start mb-6 pl-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-[#0F0F0F] group-hover:text-red-500 transition-colors">San Antonio de Pereira</h3>
                                        <p className="text-sm text-gray-500 mt-1">Nodo gastronómico y turístico</p>
                                    </div>
                                    <span className="px-3 py-1 bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-red-100">
                                        Riesgo Airbnb
                                    </span>
                                </div>

                                <p className="text-sm text-gray-600 mb-8 pl-2 leading-relaxed">
                                    Zona de alta densidad residencial y turística. Fuerte concentración de oferta de rentas cortas y saturación comercial.
                                </p>

                                <div className="grid grid-cols-2 gap-4 pl-2">
                                    <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                                        <div className="flex items-center gap-2 mb-2 text-gray-400">
                                            <BarChart3 size={14} />
                                            <span className="text-[10px] font-bold uppercase tracking-wider">Yield Bruto</span>
                                        </div>
                                        <span className="text-sm font-bold text-[#0F0F0F]">0.8% - 1.0%</span>
                                        <span className="text-[10px] text-gray-400 block mt-0.5">Mensual Potencial</span>
                                    </div>
                                    <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                                        <div className="flex items-center gap-2 mb-2 text-gray-400">
                                            <UserX size={14} />
                                            <span className="text-[10px] font-bold uppercase tracking-wider">Vacancia Real</span>
                                        </div>
                                        <span className="text-sm font-bold text-[#0F0F0F]">40% - 55%</span>
                                        <span className="text-[10px] text-gray-400 block mt-0.5">Estacionalidad alta</span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-50 pl-2">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 p-1 bg-red-50 rounded text-red-500">
                                            <Activity size={12} />
                                        </div>
                                        <p className="text-[11px] text-gray-500 leading-normal">
                                            <strong className="text-gray-700">Alerta:</strong> La saturación amenaza la ocupación. Sensible a cambios en regulación de Propiedad Horizontal.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* El Retiro */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                transition={{ delay: 0.3 }}
                                className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0F0F0F] rounded-l-2xl"></div>
                                <div className="flex justify-between items-start mb-6 pl-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-[#0F0F0F] group-hover:text-gray-700 transition-colors">El Retiro</h3>
                                        <p className="text-sm text-gray-500 mt-1">Enclave de Slow Living</p>
                                    </div>
                                    <span className="px-3 py-1 bg-gray-50 text-gray-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-gray-200">
                                        Lifestyle / Lujo
                                    </span>
                                </div>

                                <p className="text-sm text-gray-600 mb-8 pl-2 leading-relaxed">
                                    POT restrictivo limita la altura, preservando exclusividad y vistas. Mercado de segundas residencias de ultra-lujo.
                                </p>

                                <div className="grid grid-cols-2 gap-4 pl-2">
                                    <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                                        <div className="flex items-center gap-2 mb-2 text-gray-400">
                                            <Home size={14} />
                                            <span className="text-[10px] font-bold uppercase tracking-wider">Ticket Entrada</span>
                                        </div>
                                        <span className="text-sm font-bold text-[#0F0F0F]">$500M+</span>
                                        <span className="text-[10px] text-gray-400 block mt-0.5">Apartamentos</span>
                                    </div>
                                    <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                                        <div className="flex items-center gap-2 mb-2 text-gray-400">
                                            <TrendingUp size={14} />
                                            <span className="text-[10px] font-bold uppercase tracking-wider">Valorización</span>
                                        </div>
                                        <span className="text-sm font-bold text-[#0F0F0F]">8% - 12%</span>
                                        <span className="text-[10px] text-gray-400 block mt-0.5">Proyectado Tierra</span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-50 pl-2">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 p-1 bg-gray-50 rounded text-gray-600">
                                            <Briefcase size={12} />
                                        </div>
                                        <p className="text-[11px] text-gray-500 leading-normal">
                                            <strong className="text-gray-700">Perfil:</strong> Comprador de "Hogar Definitivo". Baja rotación de inventario y alta resiliencia de precios.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Detailed Metrics Table */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                        >
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100">
                                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-500">Zona</th>
                                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-500">Clase de Activo</th>
                                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-500 text-right">Precio m²</th>
                                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-500 text-right">Renta (3-Hab)</th>
                                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-500 text-center">Liquidez</th>
                                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-500">Perfil Riesgo</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {[
                                            { zona: "Llanogrande", activo: "Aptos Lujo", precio: "$8M - $12M", renta: "$6.5M - $9.0M", liquidez: "Media", liqColor: "amber", riesgo: "Tráfico / Saturación" },
                                            { zona: "San Antonio", activo: "Aptos Medio-Alto", precio: "$6M - $8M", renta: "$3.5M - $5.0M", liquidez: "Alta", liqColor: "green", riesgo: "Regulación Airbnb" },
                                            { zona: "La Ceja", activo: "Residencial Medio", precio: "$4.5M - $6.5M", renta: "$1.8M - $2.5M", liquidez: "Alta", liqColor: "green", riesgo: "Exceso Oferta Futura" },
                                            { zona: "San Vicente", activo: "Lotes / Rural", precio: "Variable", renta: "N/A", liquidez: "Muy Baja", liqColor: "red", riesgo: "Especulativo" },
                                        ].map((row, i) => (
                                            <motion.tr
                                                key={row.zona}
                                                whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.5)" }}
                                                className="transition-colors group"
                                            >
                                                <td className="px-6 py-4 font-bold text-gray-900">{row.zona}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{row.activo}</td>
                                                <td className="px-6 py-4 text-sm text-gray-900 font-medium text-right">{row.precio}</td>
                                                <td className="px-6 py-4 text-sm text-gray-900 font-medium text-right">{row.renta}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight
                                                        ${row.liqColor === 'green' ? 'bg-green-50 text-green-700' :
                                                            row.liqColor === 'amber' ? 'bg-amber-50 text-amber-700' :
                                                                'bg-red-50 text-red-700'}`}>
                                                        {row.liquidez}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-xs text-gray-500 italic">{row.riesgo}</td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    </section>


                    {/* Section 3: Bubble Analysis (Fact Check) */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 rounded-2xl border border-light">
                        <div>
                            <h3 className="text-2xl font-bold text-[#0F0F0F] mb-6">¿Burbuja o Crecimiento?</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                El reporte pondera la evidencia y favorece la tesis del <strong>Crecimiento Orgánico</strong>, citando cuatro pilares fundamentales que sostienen las valoraciones actuales.
                            </p>

                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm">1</div>
                                    <div>
                                        <h4 className="font-bold text-[#0F0F0F] text-sm">Déficit Estructural</h4>
                                        <p className="text-xs text-gray-500">Formación de hogares supera la entrega de unidades. Caída de inicios de obra (-16.1%) asegura escasez futura.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm">2</div>
                                    <div>
                                        <h4 className="font-bold text-[#0F0F0F] text-sm">Costos (Cost-Push)</h4>
                                        <p className="text-xs text-gray-500">Precios suben porque construir es más caro (Acero, Cemento, Labor), no solo por especulación.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm">3</div>
                                    <div>
                                        <h4 className="font-bold text-[#0F0F0F] text-sm">Apalancamiento Sano</h4>
                                        <p className="text-xs text-gray-500">LTV (Loan-to-Value) conservador (&lt;70%). No hay evidencia de préstamos depredadores.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#FAFAFA] p-6 rounded-xl border border-light">
                            <h4 className="text-sm font-bold text-red-600 uppercase mb-4 tracking-widest">Síntomas de Alerta</h4>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <span className="text-red-500 font-bold">⚠</span>
                                    <div className="text-sm text-gray-600">
                                        <strong className="text-[#0F0F0F]">La Prima &quot;Airbnb&quot;:</strong> Propiedades vendidas con sobreprecio del 20-30% basado en proyecciones de renta optimistas que ignoran la vacancia estacional.
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-500 font-bold">⚠</span>
                                    <div className="text-sm text-gray-600">
                                        <strong className="text-[#0F0F0F]">Compresión de Yields:</strong> En Llanogrande, precios de activos suben más rápido que los alquileres, bajando la rentabilidad al 4-5%.
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-500 font-bold">⚠</span>
                                    <div className="text-sm text-gray-600">
                                        <strong className="text-[#0F0F0F]">Brecha de Asequibilidad:</strong> Desplazamiento de la fuerza laboral local hacia la periferia por incapacidad de compra/renta.
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 4: Returns & Strategy */}
                    <section id="riesgos">
                        <div className="section-header">
                            <h2 className="text-2xl font-bold">Rentabilidad y Estrategia</h2>
                            <div className="section-line"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            {/* Appreciation */}
                            <div className="info-card">
                                <span className="card-label text-primary">Motor de Riqueza</span>
                                <h3 className="text-lg font-bold text-[#0F0F0F] mb-2">Valorización de Capital</h3>
                                <div className="big-stat text-[#0F0F0F]">6% - 9%</div>
                                <span className="text-xs text-gray-400 mb-4">Proyección Anual (Residencial)</span>
                                <p className="text-xs text-gray-500 border-t border-light pt-3 mt-auto">
                                    Tierra en zonas de expansión puede alcanzar 10%-15% pero con menor liquidez.
                                </p>
                            </div>

                            {/* Long Term Rent */}
                            <div className="info-card">
                                <span className="card-label text-green-600">Flujo Estable</span>
                                <h3 className="text-lg font-bold text-[#0F0F0F] mb-2">Renta Tradicional</h3>
                                <div className="big-stat text-[#0F0F0F]">0.5%</div>
                                <span className="text-xs text-gray-400 mb-4">Mensual Promedio</span>
                                <p className="text-xs text-gray-500 border-t border-light pt-3 mt-auto">
                                    Baja vacancia. Limitado por IPC (5.6% renovaciones 2025). Ideal para cubrir costos fijos.
                                </p>
                            </div>

                            {/* Short Term Rent */}
                            <div className="info-card border-l-4 border-l-amber-500 rounded-l-none">
                                <span className="card-label text-amber-600">Alta Volatilidad</span>
                                <h3 className="text-lg font-bold text-[#0F0F0F] mb-2">Renta Turística</h3>
                                <div className="big-stat text-[#0F0F0F]">0.8% - 1.0%</div>
                                <span className="text-xs text-gray-400 mb-4">Mensual Bruto (Potencial)</span>
                                <p className="text-xs text-gray-500 border-t border-light pt-3 mt-auto">
                                    Altos costos operativos (20% gestión + servicios). Vacancia real del 40-55%.
                                </p>
                            </div>
                        </div>

                        {/* Risk Matrix */}
                        <div className="bg-[#FAFAFA] p-8 rounded-xl border border-light">
                            <h3 className="text-lg font-bold text-[#0F0F0F] mb-6">Matriz de Riesgo (Inversor Conservador)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div>
                                    <h4 className="text-sm font-bold text-gray-800 mb-2">Liquidez</h4>
                                    <div className="h-1 w-full bg-gray-200 rounded mb-2"><div className="h-1 bg-red-500 w-3/4 rounded"></div></div>
                                    <p className="text-xs text-gray-500">Alta dificultad de venta para propiedades &gt;$1.500M COP. Mercado lento en gama alta.</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-800 mb-2">Construcción</h4>
                                    <div className="h-1 w-full bg-gray-200 rounded mb-2"><div className="h-1 bg-yellow-500 w-1/2 rounded"></div></div>
                                    <p className="text-xs text-gray-500">Riesgo medio. Mitigar exigiendo &quot;Fiducia Completa&quot; y evitando preventas de desconocidos.</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-800 mb-2">Regulatorio</h4>
                                    <div className="h-1 w-full bg-gray-200 rounded mb-2"><div className="h-1 bg-yellow-500 w-2/3 rounded"></div></div>
                                    <p className="text-xs text-gray-500">Escrutinio creciente sobre Airbnb en PH residencial. Verificar reglamentos explícitos.</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-800 mb-2">Seguridad</h4>
                                    <div className="h-1 w-full bg-gray-200 rounded mb-2"><div className="h-1 bg-green-500 w-1/4 rounded"></div></div>
                                    <p className="text-xs text-gray-500">Bajo en zonas urbanas. En rural, preferir unidades cerradas con portería 24/7.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CTA / Footer Updated */}
                    <footer className="mt-20 pt-10 border-t border-light">
                        <div className="text-center max-w-4xl mx-auto mb-12">
                            <h4 className="text-2xl font-bold text-[#0F0F0F] mb-4">Próximos Pasos</h4>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Profundice en los datos con el reporte completo o explore oportunidades de inversión curadas que se alinean con las tesis de crecimiento del Oriente y Medellín.
                            </p>

                            <a
                                href="https://drive.google.com/file/d/1Usy9et7Lhvv9uvGDlFJA9bqygPBqeAMu/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary inline-flex items-center justify-center gap-2 mb-16"
                            >
                                <span>📄</span> Descargar PDF
                            </a>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
                            {/* Card 1: Nido de Agua */}
                            <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden group hover:shadow-xl hover:border-[#5352F6] transition-all duration-300">
                                <div className="h-80 bg-gray-200 relative">
                                    <img
                                        src="https://lokl-assets.s3.us-east-1.amazonaws.com/nido-de-agua/nido-de-agua.jpg"
                                        alt="Nido de Agua"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-8">
                                    <h3 className="text-xl font-bold text-[#0F0F0F] mb-2">Nido de Agua</h3>
                                    <p className="text-[#6D6C6C] text-sm mb-6">Proyecto eco-turístico premium en el embalse de Guatapé. Cumplimiento normativo 100% garantizado.</p>
                                    <a
                                        href="https://lokl.life/nido-de-agua"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full inline-flex items-center justify-center gap-2 bg-[#5352F6] text-white font-medium px-4 py-2 rounded-lg hover:bg-[#4241C5] transition-colors"
                                    >
                                        Ver Proyecto <ExternalLink size={16} />
                                    </a>
                                </div>
                            </div>

                            {/* Card 2: Indie Universe */}
                            <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden group hover:shadow-xl hover:border-[#5352F6] transition-all duration-300">
                                <div className="h-80 bg-gray-200 relative">
                                    <img
                                        src="https://lokl-assets.s3.us-east-1.amazonaws.com/indie-universe/Indie_Page/Landing_Banner.png"
                                        alt="Indie Universe"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-8">
                                    <h3 className="text-xl font-bold text-[#0F0F0F] mb-2">Indie Universe</h3>
                                    <p className="text-[#6D6C6C] text-sm mb-6">El primer hub creativo y coliving en el corazón de Medellín. Diseñado para nómadas digitales y locales.</p>
                                    <a
                                        href="https://lokl.life/indie-universe"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full inline-flex items-center justify-center gap-2 bg-[#5352F6] text-white font-medium px-4 py-2 rounded-lg hover:bg-[#4241C5] transition-colors"
                                    >
                                        Ver Oportunidades <ExternalLink size={16} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </main>
            </div>
        </>
    );
};

export default OrienteAnalytics2025;
