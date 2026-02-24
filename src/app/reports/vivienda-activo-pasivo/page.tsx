'use client';

import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    RadialLinearScale,
    ChartOptions,
    LogarithmicScale
} from 'chart.js';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import { Download } from 'lucide-react';
import Image from 'next/image';
import { ReportJsonLd } from '@/components/reports/ReportJsonLd';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    RadialLinearScale,
    LogarithmicScale
);

// --- LOKL Design Tokens ---
const loklColors = {
    primary: '#5352F6',
    primaryTransparent: 'rgba(83, 82, 246, 0.1)',
    primarySolid: 'rgba(83, 82, 246, 0.8)',
    secondary: '#EF4444',
    secondaryTransparent: 'rgba(239, 68, 68, 0.1)',
    secondarySolid: 'rgba(239, 68, 68, 0.8)',
    textMain: '#0F0F0F',
    textSub: '#6D6C6C',
    gridColor: '#E5E5E5',
    orange: '#F97316',
    amber: '#F59E0B'
};

// Global Chart Defaults
ChartJS.defaults.font.family = "'Inter', sans-serif";
ChartJS.defaults.color = loklColors.textSub;
ChartJS.defaults.scale.grid.color = loklColors.gridColor;
// ChartJS.defaults.scale.grid.drawBorder = false; // Removed in v4
ChartJS.defaults.font.size = 13;

const formatCOP = (val: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);
const formatMillones = (val: number) => '$' + (val / 1000000).toFixed(0) + 'M';
const formatDays = (val: number) => val + ' Días';

// --- Components ---

const CostBreakdownChart = () => {
    const data = {
        labels: ['Intereses Bancarios', 'Seguros & Admin', 'Impuestos/Mto', 'Capital Real (Equity)'],
        datasets: [{
            data: [55, 15, 15, 15],
            backgroundColor: [loklColors.secondary, loklColors.orange, loklColors.amber, loklColors.primary],
            borderWidth: 0,
            hoverOffset: 15
        }]
    };
    const options: ChartOptions<'doughnut'> = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: { usePointStyle: true, font: { size: 14, weight: 'bold' }, padding: 20 }
            },
            tooltip: {
                backgroundColor: loklColors.textMain,
                padding: 16,
                titleFont: { size: 14 },
                bodyFont: { size: 14 },
                callbacks: {
                    label: function (context) {
                        return context.label + ': ' + context.raw + '%';
                    }
                }
            }
        }
    };
    return <Doughnut data={data} options={options} />;
};

const EntryBarrierChart = () => {
    const data = {
        labels: ['Tradicional (Cuota Inicial)', 'Fraccionada (Ticket)'],
        datasets: [{
            label: 'Capital Requerido',
            data: [240000000, 400000],
            backgroundColor: [loklColors.secondary, loklColors.primary],
            borderRadius: 8,
            barPercentage: 0.5
        }]
    };
    const options: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: loklColors.textMain,
                callbacks: { label: (c) => formatCOP(c.raw as number) }
            }
        },
        scales: {
            y: {
                type: 'logarithmic',
                grid: { color: '#E5E5E5' },
                ticks: {
                    callback: function (value) {
                        const v = Number(value);
                        if (v === 100000 || v === 1000000 || v === 10000000 || v === 100000000) {
                            return '$' + v / 1000000 + 'M';
                        }
                        return null;
                    }
                }
            },
            x: {
                grid: { display: false },
                ticks: { font: { size: 14, weight: 'bold' } }
            }
        }
    };
    return <Bar data={data} options={options} />;
};

const LiquidityChart = () => {
    const data = {
        labels: ['Venta Inmueble Usado', 'Venta Token LOKL'],
        datasets: [{
            label: 'Días',
            data: [240, 3],
            backgroundColor: [loklColors.secondary, loklColors.primary],
            borderRadius: 6,
            barPercentage: 0.6
        }]
    };
    const options: ChartOptions<'bar'> = {
        indexAxis: 'y' as const,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: loklColors.textMain,
                callbacks: { label: (c) => formatDays(c.raw as number) }
            }
        },
        scales: {
            x: {
                title: { display: true, text: 'Días Promedio para Venta' },
                grid: { color: '#E5E5E5' }
            },
            y: {
                grid: { display: false },
                ticks: { font: { size: 12, weight: 'bold' } }
            }
        }
    };
    return <Bar data={data} options={options} />;
};

const RoiChart = () => {
    const years = Array.from({ length: 11 }, (_, i) => `Año ${i}`);
    const tradROI = [200];
    const fracROI = [200];
    for (let i = 1; i <= 10; i++) {
        tradROI.push(tradROI[i - 1] * 1.037);
        fracROI.push(fracROI[i - 1] * 1.10);
    }
    const tradData = tradROI.map(v => v * 1000000);
    const fracData = fracROI.map(v => v * 1000000);

    const data = {
        labels: years,
        datasets: [
            {
                label: 'Tradicional (Apreciación)',
                data: tradData,
                borderColor: loklColors.secondary,
                backgroundColor: loklColors.secondaryTransparent,
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 4,
                pointHoverRadius: 8
            },
            {
                label: 'LOKL (Interés Compuesto)',
                data: fracData,
                borderColor: loklColors.primary,
                backgroundColor: loklColors.primaryTransparent,
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 4,
                pointHoverRadius: 8
            }
        ]
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                align: 'end',
                labels: { usePointStyle: true, font: { size: 13, weight: 'bold' }, padding: 20 }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: loklColors.textMain,
                padding: 12,
                callbacks: { label: (c) => c.dataset.label + ': ' + formatMillones(c.raw as number) }
            }
        },
        scales: {
            y: {
                ticks: { callback: (val) => formatMillones(Number(val)), font: { size: 11 } },
                grid: { color: '#F3F4F6' }
            },
            x: {
                grid: { display: false },
                ticks: { font: { size: 12 } }
            }
        },
        interaction: { mode: 'nearest', axis: 'x', intersect: false }
    };
    return <Line data={data} options={options} />;
};

const EfficiencyRadarChart = () => {
    const data = {
        labels: ['Liquidez', 'Ticket Bajo', 'Rentabilidad', 'Pasividad', 'Diversificación'],
        datasets: [{
            label: 'Modelo LOKL',
            data: [9, 10, 9, 10, 10],
            fill: true,
            backgroundColor: loklColors.primaryTransparent,
            borderColor: loklColors.primary,
            pointBackgroundColor: loklColors.primary,
            borderWidth: 2
        }, {
            label: 'Tradicional',
            data: [2, 1, 5, 2, 1],
            fill: true,
            backgroundColor: loklColors.secondaryTransparent,
            borderColor: loklColors.secondary,
            pointBackgroundColor: loklColors.secondary,
            borderWidth: 2
        }]
    };
    const options: ChartOptions<'radar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20 } }
        },
        scales: {
            r: {
                angleLines: { color: '#E5E7EB' },
                grid: { color: '#E5E7EB' },
                pointLabels: { font: { size: 12, weight: 'bold' }, color: loklColors.textMain },
                ticks: { display: false }
            }
        }
    };
    return <Radar data={data} options={options} />;
};


// --- Main Page Component ---

const HousingAssetVsLiabilityReport = () => {
    return (
        <>
            <ReportJsonLd
                title="Informe Estratégico: La Vivienda como Activo vs. Pasivo"
                description="Análisis financiero comparativo entre el modelo tradicional de vivienda propia y la inversión fraccionada en LOKL."
                url="https://lokl.life/reports/vivienda-activo-pasivo"
                datePublished="2025-01-15"
                image="https://lokl.life/images/reports/vivienda-og.jpg"
            />

            <header className="py-16 px-6 relative overflow-hidden">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#5352F6]/5 border border-[#5352F6]/20">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#5352F6]"></span>
                            <span className="text-[#5352F6] text-xs font-bold uppercase tracking-wider">LOKL Intelligence Unit</span>
                        </div>
                        <div className="flex gap-3">
                            <a href="https://drive.google.com/file/d/1GDa8EGKSsXDtvaPl1nHsLGAp5__F3UFZ/view?usp=sharing" target="_blank" className="text-sm font-bold text-[#5352F6] hover:underline flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#F5F5FF] transition-colors">
                                <Download size={16} />
                                Descargar Reporte PDF
                            </a>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-[#0F0F0F] tracking-tight mb-8 leading-tight max-w-4xl">
                        Análisis Estructural:<br />
                        <span className="text-[#6D6C6C] font-normal">Eficiencia de Capital en Bienes Raíces</span>
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-[#E5E5E5] pt-10">
                        <div>
                            <h3 className="font-bold text-[#0F0F0F] text-lg mb-3">Resumen Ejecutivo</h3>
                            <p className="text-sm text-[#444444] leading-relaxed">
                                El modelo tradicional de &quot;Vivienda Propia&quot; enfrenta rendimientos netos reales cercanos a cero debido a la inflación y costos ocultos.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-[#0F0F0F] text-lg mb-3">Tesis Central</h3>
                            <p className="text-sm text-[#444444] leading-relaxed">
                                La <strong>propiedad fraccionada</strong> maximiza el retorno al eliminar barreras de entrada, reducir fricción transaccional y permitir diversificación inmediata.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-[#0F0F0F] text-lg mb-3">Datos del Estudio</h3>
                            <p className="text-sm text-[#444444] leading-relaxed">
                                Simulación de flujos de caja a 10 años en mercado colombiano (Estratos 4-6) vs. Portafolios LOKL de alto rendimiento.
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-20 space-y-24">

                {/* DEEP DIVE 1: THE UNRECOVERABLE COSTS */}
                <section>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-8">
                        <div className="lg:col-span-5">
                            <h2 className="text-3xl font-bold text-[#0F0F0F] mb-6">1. Anatomía de los &quot;Costos Fantasma&quot;</h2>
                            <p className="text-base text-[#444444] leading-8 mb-6">
                                En Colombia, los primeros 7 años de una hipoteca están dominados por intereses. Adicionalmente, los costos operativos (predial, administración, mantenimiento) consumen la mayor parte de la apreciación natural del inmueble.
                            </p>
                            <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-sm">
                                <h4 className="font-bold text-[#0F0F0F] text-sm mb-4 uppercase tracking-wide">Desglose de Fugas de Capital</h4>
                                <ul className="space-y-4 text-sm text-[#444444]">
                                    <li className="flex justify-between items-center border-b border-[#E5E5E5] border-dashed pb-2">
                                        <span>Intereses Bancarios (Promedio)</span>
                                        <span className="font-bold text-[#EF4444]">~13% E.A.</span>
                                    </li>
                                    <li className="flex justify-between items-center border-b border-[#E5E5E5] border-dashed pb-2">
                                        <span>Impuesto Predial Anual</span>
                                        <span className="font-bold text-[#EF4444]">~1.0% Valor</span>
                                    </li>
                                    <li className="flex justify-between items-center border-b border-[#E5E5E5] border-dashed pb-2">
                                        <span>Mantenimiento (Regla del 1%)</span>
                                        <span className="font-bold text-[#EF4444]">~1.0% Valor</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div className="lg:col-span-7">
                            <div className="bg-white border border-[#E5E5E5] rounded-2xl p-8 shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-all h-full flex flex-col justify-center">
                                <div className="text-center mb-6">
                                    <h3 className="font-bold text-[#0F0F0F] text-lg">Distribución Real del Pago Mensual</h3>
                                    <p className="text-sm text-[#6D6C6C]">Primeros 60 meses de amortización</p>
                                </div>
                                <div className="relative w-full h-[300px] lg:h-[400px]">
                                    <CostBreakdownChart />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* DEEP DIVE 2: BARRIERS TO ENTRY */}
                <section className="bg-[#FAFAFA] border-y border-[#E5E5E5] py-20 -mx-6 px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-12 text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl font-bold text-[#0F0F0F] mb-4">2. Costo de Oportunidad del Capital</h2>
                            <p className="text-base text-[#444444] leading-8">
                                La barrera de entrada tradicional bloquea capital masivo que podría estar diversificado. Comparamos la cuota inicial de un apartamento estrato 5 versus el ticket de entrada fraccionado.
                            </p>
                        </div>

                        {/* Cards Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            <div className="bg-white border border-[#E5E5E5] rounded-2xl p-8 border-l-4 border-l-[#EF4444] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]">
                                <div className="text-xs uppercase letter-spacing-wide text-[#6D6C6C] font-semibold mb-2">Barrera Tradicional (30%)</div>
                                <div className="text-3xl font-extrabold text-[#EF4444] mb-2">$240.000.000</div>
                                <p className="text-sm text-[#6D6C6C]">+ $28M en gastos de escrituración (Fondo Perdido)</p>
                            </div>
                            <div className="bg-[#5352F6]/5 border border-[#5352F6]/20 rounded-2xl p-8 border-l-4 border-l-[#5352F6] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]">
                                <div className="text-xs uppercase letter-spacing-wide text-[#5352F6] font-semibold mb-2">Barrera Fraccionada</div>
                                <div className="text-3xl font-extrabold text-[#5352F6] mb-2">$400.000</div>
                                <p className="text-sm text-[#6D6C6C]">$0 en gastos notariales de entrada</p>
                            </div>
                        </div>

                        {/* Full Width Chart Row */}
                        <div className="bg-white border border-[#E5E5E5] rounded-2xl p-8 shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]">
                            <h3 className="font-bold text-[#0F0F0F] text-lg mb-6 text-center">Comparativa Visual de Capital Requerido (Escala Logarítmica)</h3>
                            <div className="relative w-full h-[300px]">
                                <EntryBarrierChart />
                            </div>
                        </div>
                    </div>
                </section>

                {/* DEEP DIVE 3: LIQUIDITY & WEALTH */}
                <section>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Liquidity Section */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#0F0F0F] mb-6">3. El Riesgo de Iliquidez</h2>
                            <p className="text-sm text-[#444444] mb-8 leading-relaxed">
                                Vender un inmueble usado en Colombia toma entre <strong>8 y 12 meses</strong>. Durante este tiempo, el capital sigue pagando administración e impuestos sin generar retorno.
                            </p>
                            <div className="bg-white border border-[#E5E5E5] rounded-2xl p-8 shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]">
                                <div className="relative w-full h-[300px]">
                                    <LiquidityChart />
                                </div>
                            </div>
                        </div>

                        {/* Qualitative Radar Section */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#0F0F0F] mb-6">4. Matriz de Eficiencia</h2>
                            <p className="text-sm text-[#444444] mb-8 leading-relaxed">
                                Evaluación cualitativa de los vehículos de inversión. El modelo LOKL domina en diversificación y gestión pasiva, eliminando la &quot;Tasa de Estrés&quot; del propietario tradicional.
                            </p>
                            <div className="bg-white border border-[#E5E5E5] rounded-2xl p-8 shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]">
                                <div className="relative w-full h-[300px]">
                                    <EfficiencyRadarChart />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* DEEP DIVE 4: WEALTH SIMULATION (HERO CHART) */}
                <section className="bg-white border border-[#E5E5E5] rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-8 md:p-12 border-b border-[#E5E5E5] bg-[#FAFAFA]">
                        <div className="max-w-4xl">
                            <h2 className="text-3xl font-bold text-[#0F0F0F] mb-4">5. Simulación de Riqueza (10 Años)</h2>
                            <p className="text-base text-[#444444] leading-8">
                                Proyección de <strong>$200 Millones COP</strong> invertidos hoy. El modelo tradicional asume valorización promedio menos gastos. El modelo LOKL asume reinversión de rentas (Interés Compuesto).
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
                            <div>
                                <div className="text-sm text-[#6D6C6C] uppercase font-bold mb-1">Tradicional (Final)</div>
                                <div className="text-2xl md:text-4xl font-bold text-[#EF4444]">$288.000.000</div>
                                <div className="text-sm font-medium text-[#EF4444] bg-[#EF4444]/10 inline-block px-2 py-0.5 rounded mt-2">+44% Total</div>
                            </div>
                            <div>
                                <div className="text-sm text-[#6D6C6C] uppercase font-bold mb-1">LOKL Fraccionado (Final)</div>
                                <div className="text-2xl md:text-4xl font-bold text-[#5352F6]">$518.000.000</div>
                                <div className="text-sm font-medium text-[#5352F6] bg-[#5352F6]/10 inline-block px-2 py-0.5 rounded mt-2">+159% Total</div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 md:p-12 bg-white">
                        <div className="relative w-full h-[400px]">
                            <RoiChart />
                        </div>
                    </div>
                </section>





                {/* CALL TO ACTION */}
                <section className="py-12">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-3xl font-bold text-[#0F0F0F]">Oportunidades Activas</h2>
                        <div className="hidden md:block h-px flex-grow bg-[#E5E5E5] ml-8"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        {/* Card 1: Nido de Agua */}
                        <a href="https://lokl.life/nido-de-agua" target="_blank" className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden group hover:shadow-xl hover:border-[#5352F6] transition-all duration-300 block">
                            <div className="h-48 bg-gray-200 relative">
                                <Image
                                    src="https://lokl-assets.s3.us-east-1.amazonaws.com/nido-de-agua/nido-de-agua.jpg"
                                    alt="Nido de Agua"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-[#5352F6]/0 group-hover:bg-[#5352F6]/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <span className="bg-white text-[#5352F6] px-4 py-2 rounded-full font-bold text-sm shadow-sm">Ver Proyecto</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="px-2.5 py-1 bg-[#5352F6]/10 text-[#5352F6] text-[10px] font-bold uppercase rounded tracking-wider">Guatapé, ANT</span>
                                </div>
                                <h3 className="text-xl font-bold text-[#0F0F0F] mb-2 group-hover:text-[#5352F6] transition-colors">Nido de Agua</h3>
                                <p className="text-[#6D6C6C] text-sm leading-relaxed">Proyecto eco-turístico premium. <br />Rentabilidad + Valorización.</p>
                            </div>
                        </a>

                        {/* Card 2: Indie Universe */}
                        <a href="https://lokl.life/indie-universe" target="_blank" className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden group hover:shadow-xl hover:border-[#5352F6] transition-all duration-300 block">
                            <div className="h-48 bg-gray-200 relative">
                                <Image
                                    src="https://lokl-assets.s3.us-east-1.amazonaws.com/indie-universe/Indie_Page/Landing_Banner.png"
                                    alt="Indie Universe"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-[#5352F6]/0 group-hover:bg-[#5352F6]/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <span className="bg-white text-[#5352F6] px-4 py-2 rounded-full font-bold text-sm shadow-sm">Ver Proyecto</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="px-2.5 py-1 bg-[#5352F6]/10 text-[#5352F6] text-[10px] font-bold uppercase rounded tracking-wider">Medellín, ANT</span>
                                </div>
                                <h3 className="text-xl font-bold text-[#0F0F0F] mb-2 group-hover:text-[#5352F6] transition-colors">Indie Universe</h3>
                                <p className="text-[#6D6C6C] text-sm leading-relaxed">Coliving para nómadas digitales. <br />Inversión de alto flujo.</p>
                            </div>
                        </a>

                        {/* Service Card 3: Download PDF */}
                        <div className="bg-[#F5F5FF] border border-[#5352F6]/20 rounded-xl p-8 flex flex-col justify-center items-center text-center h-full hover:shadow-lg transition-all duration-300">
                            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#5352F6] shadow-sm mb-6">
                                <Download size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-[#0F0F0F] mb-3">Informe Completo</h3>
                            <p className="text-sm text-[#444444] mb-8 px-2 leading-relaxed">
                                Descarga el análisis detallado con todas las tablas de proyección y supuestos financieros.
                            </p>
                            <a
                                href="https://drive.google.com/file/d/1GDa8EGKSsXDtvaPl1nHsLGAp5__F3UFZ/view?usp=sharing"
                                target="_blank"
                                className="bg-[#5352F6] text-white px-8 py-3.5 rounded-xl font-semibold w-full shadow-lg shadow-[#5352F6]/20 hover:bg-[#4241C5] transition-colors flex items-center justify-center gap-2"
                            >
                                Descargar PDF
                            </a>
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="pt-12 border-t border-[#E5E5E5] text-[#6D6C6C] mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-xs leading-relaxed">
                        <div>
                            <h5 className="font-bold text-[#0F0F0F] mb-3 text-sm">Fuentes de Datos</h5>
                            <ul className="space-y-2">
                                <li>• <strong>Fedelonjas (2023-2024):</strong> Reporte de tiempos de venta y vacancia en vivienda usada.</li>
                                <li>• <strong>DANE (IPC):</strong> Ajustes por inflación proyectada (4-5% anual).</li>
                                <li>• <strong>Superfinanciera:</strong> Tasas de interés crédito hipotecario (Promedio 13% E.A.).</li>
                                <li>• <strong>Galeria Inmobiliaria:</strong> Valorización promedio estratos 4, 5 y 6.</li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold text-[#0F0F0F] mb-3 text-sm">Nota de Responsabilidad</h5>
                            <p>
                                Este informe es una simulación financiera con fines educativos. Los rendimientos pasados no garantizan rendimientos futuros. Las proyecciones de LOKL asumen una ocupación promedio del 65% en rentas cortas y valorización de mercado estándar.
                            </p>
                        </div>
                    </div>
                    <div className="mt-12 text-center text-[10px] text-[#919090] uppercase tracking-widest font-semibold">
                        &copy; 2025 LOKL Research. Todos los derechos reservados.
                    </div>
                </footer>
            </main>
        </>
    );
};

export default HousingAssetVsLiabilityReport;
