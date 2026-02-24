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
    BubbleController,
    BubbleDataPoint,
    ScriptableContext
} from 'chart.js';
import { Line, Bar, Bubble, Radar } from 'react-chartjs-2';
import Image from 'next/image';
import {
    ArrowRight,
    Download,
    ExternalLink,
} from 'lucide-react';
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
    BubbleController
);

// --- LOKL Design Tokens ---
const loklColors = {
    primary: '#5352F6',
    primaryLight: '#A1A0FB',
    primaryTransparent: 'rgba(83, 82, 246, 0.1)',
    green: '#22C55E',
    cyan: '#06B6D4',
    textMain: '#0F0F0F',
    textSub: '#6D6C6C',
    gridColor: '#E5E5E5',
    red: '#EF4444',
    amber: '#F59E0B',
};

// Global Chart Defaults
ChartJS.defaults.font.family = "'Inter', sans-serif";
ChartJS.defaults.color = loklColors.textSub;

// --- Helper Functions ---
function formatLabels(labels: string[]): (string | string[])[] {
    return labels.map(label => {
        if (label.length > 18) {
            const words = label.split(' ');
            const lines: string[] = [];
            let currentLine = words[0];
            for (let i = 1; i < words.length; i++) {
                if ((currentLine + " " + words[i]).length <= 18) {
                    currentLine += " " + words[i];
                } else {
                    lines.push(currentLine);
                    currentLine = words[i];
                }
            }
            lines.push(currentLine);
            return lines;
        }
        return label;
    });
}

// --- Charts ---

const RatesChart = () => {
    const data = {
        labels: ['2023 Q1', '2023 Q3', '2024 Q1', '2024 Q3', '2025 Q1', '2025 Q3', '2026 Q1', '2026 Q3'],
        datasets: [{
            label: 'Tasa Hipotecaria (%)',
            data: [16.5, 15.2, 13.8, 12.5, 11.0, 9.8, 8.5, 7.9],
            borderColor: loklColors.primary,
            backgroundColor: 'rgba(83, 82, 246, 0.05)',
            borderWidth: 3,
            pointBackgroundColor: '#FFFFFF',
            pointBorderColor: loklColors.primary,
            pointRadius: 5,
            fill: true,
            tension: 0.4
        }]
    };
    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: loklColors.textMain,
                titleColor: '#FFFFFF',
                bodyColor: '#D1D1D1',
                padding: 12,
                cornerRadius: 8,
                titleFont: { weight: 'bold', size: 13 }
            }
        },
        scales: {
            y: {
                min: 6,
                grid: { color: '#F3F4F6' },
                ticks: { color: loklColors.textSub }
            },
            x: {
                grid: { display: false },
                ticks: { color: loklColors.textSub }
            }
        }
    };
    return <Line data={data} options={options} />;
};

const HotspotsChart = () => {
    const data = {
        labels: ['Medellín (Poblado)', 'Guatapé (Nido de Agua)', 'Santa Marta (Turístico)', 'Cartagena (Bocagrande)', 'Bogotá (Chapinero)'],
        datasets: [{
            label: 'Cap Rate Bruto (%)',
            data: [9.2, 8.8, 8.5, 7.4, 6.2],
            backgroundColor: [loklColors.primary, loklColors.cyan, '#7A79F9', loklColors.primaryLight, loklColors.gridColor],
            borderRadius: 4,
            barThickness: 32
        }]
    };
    const options: ChartOptions<'bar'> = {
        indexAxis: 'y' as const,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: { usePointStyle: true, boxWidth: 8, padding: 20 }
            },
            tooltip: {
                backgroundColor: loklColors.textMain,
                titleColor: '#FFFFFF',
                bodyColor: '#D1D1D1',
                padding: 12,
                cornerRadius: 8
            }
        },
        scales: {
            x: {
                grid: { color: '#F3F4F6' },
                max: 10,
                ticks: { color: loklColors.textSub }
            },
            y: {
                grid: { display: false },
                ticks: { color: loklColors.textSub }
            }
        }
    };
    return <Bar data={data} options={options} />;
};

const RentalChart = () => {
    const data = {
        labels: ['2023', '2024', '2025 (Est)', '2026 (Proy)'],
        datasets: [
            {
                label: 'Tradicional',
                data: [92, 88, 82, 75],
                backgroundColor: '#404040',
                borderRadius: 4
            },
            {
                label: 'Multifamily',
                data: [8, 12, 18, 25],
                backgroundColor: loklColors.primary,
                borderRadius: 4
            }
        ]
    };
    const options: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: { color: '#D1D1D1' }
            },
            tooltip: {
                backgroundColor: loklColors.textMain,
                titleColor: '#FFFFFF',
                bodyColor: '#D1D1D1',
                padding: 12,
                cornerRadius: 8
            }
        },
        scales: {
            x: {
                stacked: true,
                grid: { display: false },
                ticks: { color: '#9CA3AF' }
            },
            y: {
                stacked: true,
                grid: { color: '#404040' },
                ticks: { color: '#9CA3AF' }
            }
        }
    };
    return <Bar data={data} options={options} />;
};

const RadarChart = () => {
    const data = {
        labels: formatLabels(['Adopción PropTech', 'ESG/Sostenibilidad', 'Transparencia Datos', 'Valorización Precios', 'Facilidad Regulatoria', 'Oferta Multifamily']),
        datasets: [
            {
                label: 'Global (OCDE)',
                data: [8.5, 9.0, 8.8, 6.0, 7.5, 9.2],
                fill: true,
                backgroundColor: 'rgba(15, 15, 15, 0.05)',
                borderColor: '#9CA3AF',
                borderWidth: 2
            },
            {
                label: 'Colombia 2026',
                data: [5.5, 6.2, 5.0, 9.5, 6.8, 4.5],
                fill: true,
                backgroundColor: loklColors.primaryTransparent,
                borderColor: loklColors.primary,
                borderWidth: 2
            }
        ]
    };
    const options: ChartOptions<'radar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: { usePointStyle: true, boxWidth: 8, padding: 20 }
            },
            tooltip: {
                backgroundColor: loklColors.textMain,
                titleColor: '#FFFFFF',
                bodyColor: '#D1D1D1',
                padding: 12,
                cornerRadius: 8
            }
        },
        scales: {
            r: {
                angleLines: { color: loklColors.gridColor },
                grid: { color: loklColors.gridColor },
                pointLabels: {
                    color: '#444444',
                    font: { size: 11 }
                },
                ticks: {
                    display: false,
                    backdropColor: 'transparent'
                }
            }
        }
    };
    return <Radar data={data} options={options} />;
};

const RiskBubbleChart = () => {
    interface BubbleDataWithLabel extends BubbleDataPoint {
        label: string;
    }

    const data = {
        datasets: [{
            label: 'Riesgos 2026',
            data: [
                { x: 8.5, y: 4, r: 18, label: 'Regulación Renta Corta' },
                { x: 6, y: 7.5, r: 12, label: 'Costos Construcción' },
                { x: 9, y: 5.5, r: 20, label: 'Devaluación Peso' },
                { x: 4, y: 8, r: 10, label: 'Competencia Digital' },
                { x: 7, y: 6, r: 14, label: 'Impuestos Patrimonio' },
                { x: 8, y: 6.5, r: 16, label: 'Crisis Hídrica (El Niño)' },
                { x: 5, y: 7, r: 12, label: 'Protestas Gentrificación' },
                { x: 3, y: 3, r: 8, label: 'Ciberataques PropTech' }
            ] as BubbleDataWithLabel[],
            backgroundColor: (context: ScriptableContext<'bubble'>) => {
                const raw = context.raw as { x: number; y: number } | undefined;
                const val = raw?.x ?? 0;
                const prob = raw?.y ?? 0;
                if (val > 8 && prob > 5) return 'rgba(239, 68, 68, 0.9)';
                if (val > 7) return 'rgba(239, 68, 68, 0.7)';
                if (val > 5) return 'rgba(245, 158, 11, 0.7)';
                return 'rgba(83, 82, 246, 0.7)';
            },
            borderColor: 'transparent'
        }]
    };
    const options: ChartOptions<'bubble'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: loklColors.textMain,
                titleColor: '#FFFFFF',
                bodyColor: '#D1D1D1',
                padding: 12,
                cornerRadius: 8,
                callbacks: {
                    title: (ctx) => (ctx[0].raw as BubbleDataWithLabel).label,
                    label: (ctx) => `Impacto: ${(ctx.raw as BubbleDataWithLabel).x} | Probabilidad: ${(ctx.raw as BubbleDataWithLabel).y}`
                }
            }
        },
        scales: {
            x: {
                title: { display: true, text: 'Impacto Económico (1-10)' },
                min: 2,
                max: 10,
                grid: { color: '#F3F4F6' },
                ticks: { color: loklColors.textSub }
            },
            y: {
                title: { display: true, text: 'Probabilidad (1-10)' },
                min: 0,
                max: 10,
                grid: { color: '#F3F4F6' },
                ticks: { color: loklColors.textSub }
            }
        }
    };
    return <Bubble data={data} options={options} />;
};

// --- Page Component ---

const HorizonteEstrategico2026 = () => {
    return (
        <>
            <ReportJsonLd
                title="Horizonte Estratégico 2026: Informe de Mercado LOKL"
                description="El año de la sincronización. Tras la estabilización de tasas, el capital global regresa a Colombia."
                url="https://lokl.life/reports/horizonte-estrategico-2026"
                datePublished="2025-12-29"
                image="https://lokl.life/images/reports/horizonte-2026-og.jpg"
            />

            {/* HEADER HERO */}
            <header className="relative overflow-hidden -mx-4 md:-mx-10 mb-16">
                {/* Background con patrón de grid */}
                <div className="absolute inset-0 bg-white"></div>
                <div
                    className="absolute inset-0 opacity-[0.4]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, #E5E5FF 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }}
                ></div>

                {/* Formas decorativas */}
                <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-[#5352F6] to-[#A1A0FB] rounded-full opacity-10 blur-3xl"></div>
                <div className="absolute bottom-0 right-20 w-96 h-96 bg-gradient-to-tl from-[#5352F6] to-[#7C7BF7] rounded-full opacity-10 blur-3xl"></div>

                {/* Líneas decorativas */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5352F6]/20 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#5352F6]/30 to-transparent"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
                    {/* Badge superior */}
                    <div className="mb-8">
                        <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-white to-[#F5F5FF] text-[#5352F6] border border-[#5352F6]/30 rounded-full text-xs font-bold uppercase tracking-wider shadow-md backdrop-blur-sm">
                            Informe Estratégico • Edición 2026
                        </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Contenido izquierdo */}
                        <div className="lg:col-span-7 space-y-8">
                            <div>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] text-[#0F0F0F] mb-6">
                                    El Año de la{' '}
                                    <span className="text-[#5352F6] block mt-2">Sincronización</span>
                                </h1>
                                <p className="text-lg md:text-xl text-[#444444] leading-relaxed max-w-2xl">
                                    Tras la estabilización de tasas, el capital global regresa a Colombia. Descubre los activos refugio de la década.
                                </p>
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="https://drive.google.com/file/d/1WrELZj7C8XKAjqoUn4I5H9DfmsgWHIIH/view?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 bg-[#5352F6] text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-[#4241C5] transition-all shadow-lg shadow-[#5352F6]/25 hover:shadow-xl hover:shadow-[#5352F6]/30 hover:-translate-y-0.5"
                                >
                                    <Download size={20} strokeWidth={2.5} />
                                    Descargar Informe PDF
                                </a>
                                <a
                                    href="https://lokl.life/indie-universe"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 bg-white border-2 border-[#E5E5E5] text-[#0F0F0F] px-6 py-3.5 rounded-xl font-semibold hover:border-[#5352F6] hover:text-[#5352F6] hover:bg-[#F5F5FF] transition-all"
                                >
                                    Invertir en Medellín
                                    <ArrowRight size={18} strokeWidth={2.5} />
                                </a>
                            </div>

                            {/* Indicadores */}
                            <div className="flex flex-wrap gap-6 pt-2">
                                <div className="flex items-center gap-2.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse"></span>
                                    <span className="text-sm font-medium text-[#444444]">Tasas a la baja (2026)</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#5352F6] animate-pulse"></span>
                                    <span className="text-sm font-medium text-[#444444]">Escasez Oferta Prime</span>
                                </div>
                            </div>
                        </div>

                        {/* Tarjeta derecha - Tesis */}
                        <div className="lg:col-span-5">
                            <div className="bg-gradient-to-br from-[#0F0F0F] to-[#1F1F1F] text-white p-8 rounded-2xl shadow-2xl border border-white/10 hover:scale-[1.02] transition-transform duration-300">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-white">Tesis de Inversión</h3>
                                    <div className="w-10 h-10 rounded-full bg-[#5352F6]/20 flex items-center justify-center">
                                        <span className="text-xl">💡</span>
                                    </div>
                                </div>
                                <div className="space-y-5">
                                    <div className="flex items-start gap-4 pb-5 border-b border-white/10">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#5352F6] flex items-center justify-center text-white font-bold text-sm">
                                            01
                                        </div>
                                        <p className="text-[#E5E5E5] text-sm leading-relaxed">
                                            El <strong className="text-white">Green Premium</strong> es obligatorio. Activos sin certificación pierden valor.
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#5352F6] flex items-center justify-center text-white font-bold text-sm">
                                            02
                                        </div>
                                        <p className="text-[#E5E5E5] text-sm leading-relaxed">
                                            El modelo <strong className="text-white">Multifamily</strong> (Renta) desplaza a la venta tradicional.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 space-y-24">

                {/* SECTION 1: MACRO CONTEXT */}
                <section className="py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-4 space-y-6">
                            <span className="text-[#5352F6] font-bold tracking-wider uppercase text-sm">Contexto Macro</span>
                            <h2 className="text-3xl font-bold text-[#0F0F0F]">El Ciclo de Crédito</h2>
                            <p className="text-[#6D6C6C] leading-relaxed">
                                La corrección inflacionaria permite al Banco de la República reducir tasas agresivamente, reactivando la demanda de vivienda No-VIS.
                            </p>
                            <div className="bg-white border border-[#E5E5E5] border-l-4 border-l-[#5352F6] rounded-lg p-6 shadow-sm">
                                <p className="text-3xl font-bold text-[#0F0F0F] mb-1">+22%</p>
                                <p className="text-sm text-[#444444]">Incremento en desembolsos hipotecarios (Proy. 2026).</p>
                            </div>
                        </div>
                        <div className="lg:col-span-8">
                            <div className="bg-white border border-[#E5E5E5] rounded-2xl p-6 md:p-8 shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-lg">Proyección Tasas Hipotecarias</h3>
                                    <span className="inline-flex items-center px-3 py-1 bg-[#F0FDF4] text-[#22C55E] text-xs font-bold uppercase rounded-full">Tendencia Bajista</span>
                                </div>
                                <div className="relative w-full h-[350px]">
                                    <RatesChart />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 2: HOTSPOTS & PROJECTS */}
                <section id="proyectos" className="bg-white border-y border-[#E5E5E5] py-20 -mx-6 md:-mx-10 lg:-mx-6">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <span className="inline-flex items-center px-4 py-2 bg-[#E0E7FF] text-[#5352F6] text-xs font-bold uppercase rounded-full mb-4">Oportunidades Regionales</span>
                            <h2 className="text-4xl font-bold mb-4 text-[#0F0F0F]">Puntos Calientes de Inversión</h2>
                            <p className="text-lg text-[#6D6C6C] max-w-2xl mx-auto">
                                Ciudades intermedias y turísticas superan a las capitales en Yield bruto gracias a la demanda de rentas cortas y nómadas digitales.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Chart Column */}
                            <div>
                                <div className="bg-white border border-[#E5E5E5] rounded-2xl p-8 h-full shadow-sm">
                                    <h3 className="font-bold text-[#0F0F0F] mb-6">Cap Rate Promedio Estimado (%)</h3>
                                    <div className="relative w-full h-[450px]">
                                        <HotspotsChart />
                                    </div>
                                </div>
                            </div>

                            {/* Projects Column */}
                            <div className="space-y-6">
                                {/* Project Card: MEDELLIN */}
                                <div className="bg-white border border-[#E5E5E5] hover:border-[#5352F6] rounded-xl p-6 group relative overflow-hidden transition-all shadow-sm hover:shadow-lg">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <span className="text-6xl">🏙️</span>
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="text-xl font-bold text-[#0F0F0F]">Medellín (Indie Universe)</h4>
                                                <p className="text-sm text-[#5352F6] font-semibold">El Distrito Creativo</p>
                                            </div>
                                            <span className="inline-flex items-center px-3 py-1 bg-[#F0FDF4] text-[#22C55E] text-xs font-bold uppercase rounded-full">Top Performer</span>
                                        </div>
                                        <p className="text-sm text-[#444444] mb-4 leading-relaxed">
                                            Ubicado en el corazón de la demanda de nómadas digitales. Alta ocupación y valorización en el sector más vibrante de la ciudad.
                                        </p>
                                        <a href="https://lokl.life/indie-universe" target="_blank" className="text-sm font-bold text-[#5352F6] hover:text-[#4241C5] flex items-center gap-1">
                                            Ver Oportunidad Indie Universe
                                            <ArrowRight size={16} />
                                        </a>
                                    </div>
                                </div>

                                {/* Project Card: GUATAPE */}
                                <div className="bg-white border border-[#E5E5E5] hover:border-[#06B6D4] rounded-xl p-6 group relative overflow-hidden transition-all shadow-sm hover:shadow-lg">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <span className="text-6xl">💧</span>
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="text-xl font-bold text-[#0F0F0F]">Guatapé (Nido de Agua)</h4>
                                                <p className="text-sm text-[#06B6D4] font-semibold">Eco-Luxury Living</p>
                                            </div>
                                            <span className="inline-flex items-center px-3 py-1 bg-[#ECFEFF] text-[#06B6D4] text-xs font-bold uppercase rounded-full">Emergente</span>
                                        </div>
                                        <p className="text-sm text-[#444444] mb-4 leading-relaxed">
                                            Un refugio natural de alta rentabilidad turística. El destino #1 de Antioquia para turismo experiencial y de desconexión.
                                        </p>
                                        <a href="https://lokl.life/nido-de-agua" target="_blank" className="text-sm font-bold text-[#06B6D4] hover:text-[#0891B2] flex items-center gap-1">
                                            Ver Proyecto Nido de Agua
                                            <ArrowRight size={16} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 3: RENTAL DYNAMICS */}
                <section className="bg-[#1A1A1A] text-white rounded-3xl py-20 px-6 md:px-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <span className="text-[#5352F6] font-bold text-sm mb-2 block uppercase">Tendencia 2026</span>
                                <h2 className="text-4xl font-bold mb-6">La Era del Multifamily</h2>
                                <p className="text-[#D1D1D1] text-lg leading-relaxed mb-8">
                                    El &quot;Build-to-Rent&quot; institucional desplaza la venta tradicional. Inversores buscan estabilidad de flujo sobre plusvalía especulativa.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                        <p className="text-[#22C55E] font-bold text-xl mb-1">Menor Riesgo</p>
                                        <p className="text-xs text-[#9CA3AF]">Vacancia controlada por operadores profesionales.</p>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                        <p className="text-[#5352F6] font-bold text-xl mb-1">Gen Z Ready</p>
                                        <p className="text-xs text-[#9CA3AF]">Preferencia por flexibilidad y servicios (amenities).</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#262626] p-8 rounded-2xl border border-[#404040]">
                                <h3 className="font-bold mb-6 text-center">Cuota de Mercado: Renta</h3>
                                <div className="relative w-full h-[350px]">
                                    <RentalChart />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 4: MATURITY RADAR */}
                <section className="py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1 space-y-6">
                            <h2 className="text-3xl font-bold text-[#0F0F0F]">Brecha Tecnológica</h2>
                            <p className="text-[#6D6C6C]">Comparativa Colombia vs. Estándares OCDE.</p>
                            <div className="bg-white border border-[#E5E5E5] border-t-4 border-t-[#5352F6] rounded-lg p-6 shadow-sm">
                                <h4 className="font-bold mb-2">Oportunidad PropTech</h4>
                                <p className="text-sm text-[#444444]">La baja adopción digital (5.5/10) representa una oportunidad masiva para plataformas que automaticen la gestión de activos.</p>
                            </div>
                        </div>
                        <div className="lg:col-span-2">
                            <div className="bg-white border border-[#E5E5E5] rounded-2xl p-8 h-full shadow-sm">
                                <div className="relative w-full h-[450px]">
                                    <RadarChart />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 5: RISK MATRIX 2026 */}
                <section className="bg-white border border-[#E5E5E5] rounded-3xl py-16 px-6 md:px-12 shadow-sm">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <span className="inline-flex items-center px-4 py-2 bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA] text-xs font-bold uppercase rounded-full mb-4">Análisis de Sensibilidad</span>
                            <h2 className="text-3xl font-bold mb-2">Matriz de Riesgo y Oportunidad 2026</h2>
                            <p className="text-[#6D6C6C] max-w-2xl mx-auto">
                                Evaluación multidimensional de amenazas (Cisnes Negros) y tendencias macroeconómicas que impactarán el valor de los activos en el próximo ciclo.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {/* CHART */}
                            <div className="lg:col-span-8 bg-white border border-[#E5E5E5] rounded-xl p-6">
                                <h3 className="font-bold text-[#0F0F0F] mb-1">Mapa de Calor: Impacto vs. Probabilidad</h3>
                                <p className="text-xs text-[#6D6C6C] mb-4">Eje X: Severidad Financiera | Eje Y: Probabilidad de Ocurrencia | Tamaño: Urgencia</p>
                                <div className="relative w-full h-[450px]">
                                    <RiskBubbleChart />
                                </div>
                            </div>

                            {/* KEY INSIGHTS SIDEBAR */}
                            <div className="lg:col-span-4 space-y-4">
                                <h3 className="font-bold text-[#0F0F0F] mb-2">Top 3 Amenazas Críticas</h3>

                                <div className="bg-white border border-[#E5E5E5] border-l-4 border-l-[#EF4444] rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold text-sm">Regulación Renta Corta</h4>
                                        <span className="text-[10px] bg-[#FEF2F2] text-[#EF4444] px-2 py-0.5 rounded font-bold">ALTO IMPACTO</span>
                                    </div>
                                    <p className="text-xs text-[#444444] leading-relaxed">
                                        Potencial prohibición o limitación estricta de Airbnb en zonas residenciales saturadas (ej. Medellín), reduciendo el Yield proyectado.
                                    </p>
                                </div>

                                <div className="bg-white border border-[#E5E5E5] border-l-4 border-l-[#F59E0B] rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold text-sm">Escasez Hídrica/Energética</h4>
                                        <span className="text-[10px] bg-[#FFFBEB] text-[#F59E0B] px-2 py-0.5 rounded font-bold">CLIMÁTICO</span>
                                    </div>
                                    <p className="text-xs text-[#444444] leading-relaxed">
                                        Fenómenos como El Niño pueden afectar el turismo en destinos dependientes de agua (Guatapé) y aumentar costos operativos.
                                    </p>
                                </div>

                                <div className="bg-white border border-[#E5E5E5] border-l-4 border-l-[#5352F6] rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold text-sm">Tensión Social / Gentrificación</h4>
                                        <span className="text-[10px] bg-[#F5F5FF] text-[#5352F6] px-2 py-0.5 rounded font-bold">SOCIAL</span>
                                    </div>
                                    <p className="text-xs text-[#444444] leading-relaxed">
                                        Protestas contra el alza de costos de vida impulsada por extranjeros pueden derivar en políticas proteccionistas locales.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* DETAILED CATEGORIES GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            {/* Regulatory Risks */}
                            <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-[#E0E7FF] text-[#5352F6] flex items-center justify-center font-bold">⚖️</div>
                                    <h4 className="font-bold text-[#0F0F0F]">Riesgos Regulatorios</h4>
                                </div>
                                <ul className="space-y-3 text-sm text-[#444444]">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#EF4444] mt-0.5">•</span>
                                        <span><strong>Impuestos Patrimonio:</strong> Posible reducción del umbral para declarantes, afectando inversores medios.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#EF4444] mt-0.5">•</span>
                                        <span><strong>Visas Digitales:</strong> Endurecimiento de requisitos para visas de Nómada Digital.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Economic Risks */}
                            <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-[#DCFCE7] text-[#22C55E] flex items-center justify-center font-bold">📉</div>
                                    <h4 className="font-bold text-[#0F0F0F]">Riesgos Financieros</h4>
                                </div>
                                <ul className="space-y-3 text-sm text-[#444444]">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#F59E0B] mt-0.5">•</span>
                                        <span><strong>Volatilidad COP/USD:</strong> Fluctuaciones que afecten el ROI dolarizado de inversores externos.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#F59E0B] mt-0.5">•</span>
                                        <span><strong>Costo de Materiales:</strong> Rebote inflacionario en acero y cemento frenando nuevos inicios de obra.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Market Risks */}
                            <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-[#FEF3C7] text-[#F59E0B] flex items-center justify-center font-bold">🏙️</div>
                                    <h4 className="font-bold text-[#0F0F0F]">Riesgos de Mercado</h4>
                                </div>
                                <ul className="space-y-3 text-sm text-[#444444]">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#5352F6] mt-0.5">•</span>
                                        <span><strong>Saturación Zonal:</strong> Sobreoferta de apartaestudios en El Poblado reduciendo la ocupación promedio al 60%.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#5352F6] mt-0.5">•</span>
                                        <span><strong>Obsolescencia Tecnológica:</strong> Activos sin cerraduras inteligentes o internet de alta velocidad quedando fuera del mercado.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* MITIGATION STRATEGY BANNER */}
                        <div className="mt-8 bg-[#0F0F0F] rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
                            <div>
                                <h4 className="text-xl font-bold mb-2">🛡️ Estrategia de Blindaje LOKL</h4>
                                <p className="text-[#D1D1D1] text-sm max-w-2xl">
                                    Recomendamos un portafolio híbrido: <strong>60% Multifamily</strong> (Estabilidad) + <strong>40% Renta Turística en Nichos Emergentes</strong> (Alto Yield, ej. Guatapé) para diversificar el riesgo regulatorio urbano.
                                </p>
                            </div>
                            <a href="#proyectos" className="bg-white text-[#0F0F0F] hover:bg-[#E5E5E5] px-6 py-3 rounded-lg font-bold transition-colors whitespace-nowrap">
                                Ver Portafolio Blindado
                            </a>
                        </div>
                    </div>
                </section>

                {/* FINAL CTA */}
                <footer className="py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F0F0F] mb-4">
                            Explora nuestras oportunidades recomendadas
                        </h2>
                        <p className="text-[#6D6C6C] text-lg max-w-2xl mx-auto">
                            Proyectos verificados con alto potencial de rentabilidad y valorización
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {/* Card 1: Nido de Agua */}
                        <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden group hover:shadow-xl hover:border-[#5352F6] transition-all duration-300">
                            <div className="h-64 bg-gray-200 relative overflow-hidden">
                                <Image
                                    src="https://lokl-assets.s3.us-east-1.amazonaws.com/nido-de-agua/nido-de-agua.jpg"
                                    alt="Nido de Agua - Proyecto eco-turístico en Guatapé"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="inline-flex items-center px-3 py-1 bg-[#06B6D4] text-white text-xs font-bold uppercase rounded-full">
                                        Guatapé
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-[#0F0F0F] mb-2">Nido de Agua</h3>
                                <p className="text-[#6D6C6C] text-sm mb-6 leading-relaxed">
                                    Proyecto eco-turístico premium en el embalse de Guatapé. Alto yield en renta corta y valorización garantizada.
                                </p>
                                <a
                                    href="https://lokl.life/nido-de-agua"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex items-center justify-center gap-2 bg-[#06B6D4] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#0891B2] transition-colors"
                                >
                                    Ver Proyecto <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>

                        {/* Card 2: Indie Universe */}
                        <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden group hover:shadow-xl hover:border-[#5352F6] transition-all duration-300">
                            <div className="h-64 bg-gray-200 relative overflow-hidden">
                                <Image
                                    src="https://lokl-assets.s3.us-east-1.amazonaws.com/indie-universe/Indie_Page/Landing_Banner.png"
                                    alt="Indie Universe - Coliving en Medellín"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="inline-flex items-center px-3 py-1 bg-[#5352F6] text-white text-xs font-bold uppercase rounded-full">
                                        Medellín
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-[#0F0F0F] mb-2">Indie Universe</h3>
                                <p className="text-[#6D6C6C] text-sm mb-6 leading-relaxed">
                                    El primer hub creativo y coliving en el corazón de Medellín. Diseñado para nómadas digitales y emprendedores.
                                </p>
                                <a
                                    href="https://lokl.life/indie-universe"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex items-center justify-center gap-2 bg-[#5352F6] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#4241C5] transition-colors"
                                >
                                    Ver Oportunidades <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>

                        {/* Card 3: Download PDF */}
                        <div className="bg-gradient-to-br from-[#F5F5FF] to-white border-2 border-[#5352F6]/20 rounded-xl overflow-hidden flex flex-col justify-between p-8 hover:shadow-xl hover:border-[#5352F6]/40 transition-all duration-300">
                            <div className="flex-1 flex flex-col items-center justify-center text-center">
                                <div className="w-16 h-16 rounded-full bg-[#5352F6]/10 flex items-center justify-center mb-6">
                                    <Download size={32} className="text-[#5352F6]" strokeWidth={2.5} />
                                </div>
                                <h3 className="text-xl font-bold text-[#0F0F0F] mb-3">
                                    Informe Completo PDF
                                </h3>
                                <p className="text-[#6D6C6C] text-sm mb-6 leading-relaxed">
                                    Descarga el análisis detallado con todas las proyecciones, gráficas y metodología completa.
                                </p>
                            </div>
                            <a
                                href="https://drive.google.com/file/d/1WrELZj7C8XKAjqoUn4I5H9DfmsgWHIIH/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center gap-2 bg-white border-2 border-[#5352F6] text-[#5352F6] font-semibold px-6 py-3 rounded-lg hover:bg-[#5352F6] hover:text-white transition-colors"
                            >
                                Descargar PDF <Download size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Footer info */}
                    <div className="border-t border-[#E5E5E5] pt-8 text-center">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <span className="font-bold text-[#5352F6]">LOKL</span>
                            <span className="text-sm text-[#0F0F0F]">Analytics</span>
                        </div>
                        <p className="text-xs text-[#919090]">&copy; 2026 LOKL. Todos los derechos reservados. Datos proyectados con fines informativos.</p>
                    </div>
                </footer>

            </div>
        </>
    );
};

export default HorizonteEstrategico2026;

