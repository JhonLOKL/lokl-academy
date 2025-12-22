'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { MarketingFooter } from '@/components/footer/marketing-footer';

const OrienteAnalytics2025 = () => {
    return (
        <div className="min-h-screen bg-[#FAFAFA] text-[#444444] font-sans selection:bg-[#5352F6] selection:text-white">
            <style jsx>{`
        h1, h2, h3, h4, h5, h6 { color: #0F0F0F; }

        .text-primary { color: #5352F6; }
        .bg-primary { background-color: #5352F6; }
        .border-primary { border-color: #5352F6; }
        
        .bg-surface { background-color: #FFFFFF; }
        .border-light { border-color: #E5E5E5; }

        .info-card {
          background: #FFFFFF;
          border: 1px solid #E5E5E5;
          border-radius: 1rem;
          padding: 1.5rem;
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .info-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(83, 82, 246, 0.1), 0 4px 6px -2px rgba(83, 82, 246, 0.05);
          border-color: #A1A0FB;
        }

        .big-stat {
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #5352F6;
          margin-bottom: 0.5rem;
        }

        .card-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 600;
          color: #6D6C6C;
          margin-bottom: 0.75rem;
          display: block;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          padding-top: 2rem;
        }
        
        .section-line {
          height: 1px;
          flex-grow: 1;
          background: #E5E5E5;
        }
        
        .lokl-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          font-size: 0.875rem;
        }
        
        .lokl-table th {
          text-align: left;
          padding: 1rem;
          background-color: #FAFAFA;
          color: #0F0F0F;
          font-weight: 600;
          border-bottom: 2px solid #E5E5E5;
        }
        
        .lokl-table td {
          padding: 1rem;
          border-bottom: 1px solid #E5E5E5;
          color: #444444;
        }
        
        .lokl-table tr:last-child td {
          border-bottom: none;
        }

        .tag {
          display: inline-flex;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
        }
        
        .tag-green { background: #DCFCE7; color: #166534; }
        .tag-amber { background: #FEF3C7; color: #B45309; }
        .tag-red { background: #FEE2E2; color: #991B1B; }
        .tag-blue { background: #DBEAFE; color: #1E40AF; }

        .btn-primary {
          background-color: #5352F6;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 500;
          transition: background-color 0.2s;
          box-shadow: 0 4px 6px -1px rgba(83, 82, 246, 0.2);
          text-align: center;
          display: inline-block;
        }
        
        .btn-primary:hover { background-color: #4241C5; }
        
        .btn-outline {
          background-color: transparent;
          border: 1px solid #E5E5E5;
          color: #0F0F0F;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 500;
          transition: all 0.2s;
          text-align: center;
          display: inline-block;
        }
        
        .btn-outline:hover {
          border-color: #5352F6;
          color: #5352F6;
        }
      `}</style>

            <div className="p-4 md:p-10 max-w-7xl mx-auto">
                {/* Back Navigation */}
                <Link href="/reports" className="inline-flex items-center gap-2 text-[#5352F6] hover:text-[#4241C5] transition-colors mb-8 font-medium">
                    <ArrowLeft size={20} />
                    Volver a Reportes
                </Link>


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
                    <section id="micromercados">
                        <div className="section-header">
                            <h2 className="text-2xl font-bold">Análisis de Micro-Mercados</h2>
                            <div className="section-line"></div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                            {/* Rionegro / Llanogrande */}
                            <div className="info-card border-l-4 border-l-primary rounded-l-none">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-[#0F0F0F]">Rionegro &amp; Llanogrande</h3>
                                    <span className="tag tag-amber">Saturación Tráfico</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-6">
                                    El núcleo metropolitano y la &quot;Milla de Oro&quot;. Tendencia hacia la densificación (subdivisión de fincas en aptos de lujo).
                                </p>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="bg-gray-50 p-3 rounded">
                                        <span className="block text-xs font-bold text-gray-500">Precio Venta</span>
                                        <span className="text-sm font-bold text-[#0F0F0F]">$8M - $12M COP/m²</span>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded">
                                        <span className="block text-xs font-bold text-gray-500">Renta Mensual</span>
                                        <span className="text-sm font-bold text-[#0F0F0F]">$6.5M - $9.0M COP</span>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500">
                                    <strong>Riesgo:</strong> Compresión de Yields (4-5% bruto) por alto valor del activo. Inversión depende de apreciación futura.
                                </div>
                            </div>

                            {/* La Ceja */}
                            <div className="info-card border-l-4 border-l-green-600 rounded-l-none">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-[#0F0F0F]">La Ceja</h3>
                                    <span className="tag tag-green">Oportunidad Valor</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-6">
                                    La &quot;alternativa sostenible&quot;. Topografía plana, caminable. Absorbe el desbordamiento de Rionegro con precios más accesibles.
                                </p>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="bg-gray-50 p-3 rounded">
                                        <span className="block text-xs font-bold text-gray-500">Precio Venta</span>
                                        <span className="text-sm font-bold text-[#0F0F0F]">$4.5M - $6.5M COP/m²</span>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded">
                                        <span className="block text-xs font-bold text-gray-500">Valorización Tierra</span>
                                        <span className="text-sm font-bold text-[#0F0F0F]">~9% Anual (2024)</span>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500">
                                    <strong>Tesis:</strong> Atractivo para jubilados y familias jóvenes. Alta liquidez en reventa.
                                </div>
                            </div>

                            {/* San Antonio */}
                            <div className="info-card border-l-4 border-l-red-500 rounded-l-none">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-[#0F0F0F]">San Antonio de Pereira</h3>
                                    <span className="tag tag-red">Riesgo Airbnb</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-6">
                                    Zona de alta densidad residencial y turística. Fuerte concentración de oferta de rentas cortas.
                                </p>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="bg-gray-50 p-3 rounded">
                                        <span className="block text-xs font-bold text-gray-500">Yield Bruto Potencial</span>
                                        <span className="text-sm font-bold text-[#0F0F0F]">0.8% - 1.0% Mensual</span>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded">
                                        <span className="block text-xs font-bold text-gray-500">Vacancia Real</span>
                                        <span className="text-sm font-bold text-[#0F0F0F]">40% - 55%</span>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500">
                                    <strong>Alerta:</strong> La saturación amenaza la ocupación. Sensible a regulación PH.
                                </div>
                            </div>

                            {/* El Retiro */}
                            <div className="info-card border-l-4 border-l-[#0F0F0F] rounded-l-none">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-[#0F0F0F]">El Retiro</h3>
                                    <span className="tag tag-blue">Lifestyle / Lujo</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-6">
                                    Enclave de &quot;Slow Living&quot;. POT restrictivo limita la altura, preservando exclusividad y vistas.
                                </p>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="bg-gray-50 p-3 rounded">
                                        <span className="block text-xs font-bold text-gray-500">Ticket de Entrada</span>
                                        <span className="text-sm font-bold text-[#0F0F0F]">$500M+ (Aptos)</span>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded">
                                        <span className="block text-xs font-bold text-gray-500">Valorización Tierra</span>
                                        <span className="text-sm font-bold text-[#0F0F0F]">8% - 12% Proyectado</span>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500">
                                    <strong>Perfil:</strong> Comprador de &quot;Hogar Definitivo&quot;. Baja rotación de inventario.
                                </div>
                            </div>
                        </div>

                        {/* Detailed Metrics Table */}
                        <div className="overflow-x-auto border border-light rounded-lg">
                            <table className="lokl-table">
                                <thead>
                                    <tr>
                                        <th>Zona</th>
                                        <th>Clase de Activo</th>
                                        <th>Precio Aprox./m²</th>
                                        <th>Renta (3-Hab)</th>
                                        <th>Liquidez</th>
                                        <th>Perfil de Riesgo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="font-bold">Llanogrande</td>
                                        <td>Aptos Lujo</td>
                                        <td>$8M - $12M</td>
                                        <td>$6.5M - $9.0M</td>
                                        <td><span className="text-yellow-600 font-medium">Media</span></td>
                                        <td>Tráfico / Saturación</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">San Antonio</td>
                                        <td>Aptos Medio-Alto</td>
                                        <td>$6M - $8M</td>
                                        <td>$3.5M - $5.0M</td>
                                        <td><span className="text-green-600 font-medium">Alta</span></td>
                                        <td>Regulación Airbnb</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">La Ceja</td>
                                        <td>Residencial Medio</td>
                                        <td>$4.5M - $6.5M</td>
                                        <td>$1.8M - $2.5M</td>
                                        <td><span className="text-green-600 font-medium">Alta</span></td>
                                        <td>Exceso Oferta Futura</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">Guarne / S. Vicente</td>
                                        <td>Lotes / Rural</td>
                                        <td>Variable</td>
                                        <td>N/A</td>
                                        <td><span className="text-red-600 font-medium">Muy Baja</span></td>
                                        <td>Especulativo / Iliquidez</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
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
            <MarketingFooter />
        </div>
    );
};

export default OrienteAnalytics2025;
