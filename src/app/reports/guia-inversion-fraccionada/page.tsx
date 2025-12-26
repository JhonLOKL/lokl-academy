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
    ChartOptions
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import {
    ArrowRight,
    Building2,
    TrendingUp,
    MousePointer2,
    SlidersHorizontal,
    CreditCard,
    ScanLine, // For identification/validation
    PenTool, // For signature
    CheckCircle2,
    Wrench,
    LogOut,
    Calendar,
    Play
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
    RadialLinearScale
);

// --- LOKL Design Tokens ---
const loklColors = {
    primary: '#5352F6',
    primaryLight: '#A1A0FB',
    primaryTransparent: 'rgba(83, 82, 246, 0.1)',
    secondary: '#EF4444', // Red/Tradicional
    secondaryTransparent: 'rgba(239, 68, 68, 0.1)',
    emerald: '#10B981', // Success/Green
    emeraldTransparent: 'rgba(16, 185, 129, 0.1)',
    amber: '#F59E0B', // Warning/Amber
    slate: '#64748B', // Neutral
    textMain: '#0F0F0F',
    textSub: '#6D6C6C',
    gridColor: '#E5E5E5'
};

// Global Chart Defaults
ChartJS.defaults.font.family = "'Inter', sans-serif";
ChartJS.defaults.color = loklColors.textSub;
ChartJS.defaults.scale.grid.color = loklColors.gridColor;

const formatCOP = (val: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);
const formatMillions = (val: number) => '$' + (val / 1000000).toFixed(0) + 'M';

// --- Charts ---

const BarrierChart = () => {
    const data = {
        labels: ['Tradicional (Inicial)', 'LOKL (Fracción)'],
        datasets: [{
            label: 'Capital Requerido',
            data: [50000000, 4000000],
            backgroundColor: ['#E2E8F0', loklColors.emerald], // Slate-200, Emerald
            borderRadius: 8,
            barPercentage: 0.6
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
                ticks: { callback: (val) => formatMillions(Number(val)) },
                grid: { display: false }
            },
            x: { grid: { display: false } }
        }
    };
    return <Bar data={data} options={options} />;
};

const ComparisonChart = () => {
    const data = {
        labels: ['Rentabilidad', 'Facilidad (Pasivo)', 'Accesibilidad ($)'],
        datasets: [
            {
                label: 'LOKL',
                data: [9, 10, 10],
                backgroundColor: loklColors.emerald,
                borderRadius: 4,
                barPercentage: 0.7
            },
            {
                label: 'Tradicional',
                data: [7, 3, 2],
                backgroundColor: loklColors.amber,
                borderRadius: 4,
                barPercentage: 0.7
            },
            {
                label: 'CDT / Ahorro',
                data: [5, 9, 8],
                backgroundColor: loklColors.slate,
                borderRadius: 4,
                barPercentage: 0.7
            }
        ]
    };
    const options: ChartOptions<'bar'> = {
        indexAxis: 'y' as const,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8 } },
            tooltip: { backgroundColor: loklColors.textMain }
        },
        scales: {
            x: { max: 10, grid: { display: false }, ticks: { display: false } },
            y: { grid: { display: false } }
        }
    };
    return <Bar data={data} options={options} />;
};

const GrowthChart = () => {
    const data = {
        labels: ["Año 0", "Año 1", "Año 2", "Año 3", "Año 4", "Año 5"],
        datasets: [
            {
                label: 'LOKL (Compuesto)',
                data: [10000000, 11500000, 13225000, 15208000, 17500000, 20100000],
                borderColor: loklColors.primary,
                backgroundColor: loklColors.primaryTransparent,
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 4
            },
            {
                label: 'Tradicional (Simple)',
                data: [10000000, 10600000, 11236000, 11910000, 12624000, 13380000],
                borderColor: loklColors.amber,
                backgroundColor: 'transparent',
                borderDash: [5, 5],
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 3
            },
            {
                label: 'Ahorro / CDT',
                data: [10000000, 10400000, 10816000, 11248000, 11698000, 12166000],
                borderColor: loklColors.slate,
                backgroundColor: 'transparent',
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 3
            }
        ]
    };
    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: loklColors.textMain,
                mode: 'index',
                intersect: false,
                callbacks: { label: (c) => c.dataset.label + ': ' + formatMillions(c.raw as number) }
            }
        },
        scales: {
            y: {
                grid: { color: '#F1F5F9' },
                ticks: { callback: (val) => formatMillions(Number(val)) }
            },
            x: { grid: { display: false } }
        },
        interaction: { mode: 'nearest', axis: 'x', intersect: false }
    };
    return <Line data={data} options={options} />;
};


const YouTubeFacade = ({ videoId, title }: { videoId: string, title: string }) => {
    const [showVideo, setShowVideo] = React.useState(false);

    if (showVideo) {
        return (
            <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&start=19&rel=0&modestbranding=1&playsinline=1&controls=1&fs=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        );
    }

    return (
        <button
            onClick={() => setShowVideo(true)}
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center group cursor-pointer"
            style={{ backgroundImage: `url(https://img.youtube.com/vi/${videoId}/maxresdefault.jpg)` }}
            aria-label={`Reproducir video: ${title}`}
        >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#EF4444] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    <Play size={32} className="text-white fill-white ml-2" />
                </div>
            </div>
            {/* YouTube Logo / Title Overlay */}
            <div className="absolute top-4 left-4 text-white font-medium text-lg drop-shadow-md truncate max-w-[80%]">
                {title}
            </div>
        </button>
    );
};

// --- Page Component ---

const GuiaInversionPage = () => {
    return (
        <>
            <ReportJsonLd
                title="Guía de Inversión LOKL: Inmuebles Fraccionados"
                description="Tu mapa estratégico para construir patrimonio inmobiliario con LOKL, desde la primera fracción hasta la libertad financiera."
                url="https://lokl.life/reports/guia-inversion-fraccionada"
                datePublished="2025-01-20"
                image="https://lokl.life/images/reports/guia-og.jpg"
            />

            {/* HEADER HERO */}
            <header className="bg-[#0F172A] text-white py-20 px-6 relative overflow-hidden rounded-3xl mb-12 shadow-2xl">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6366F1] opacity-10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
                        Domina la Inversión <span className="text-[#34D399]">Fraccionada</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
                        Tu mapa estratégico para construir patrimonio inmobiliario con LOKL, desde la primera fracción hasta la libertad financiera.
                    </p>
                </div>
            </header>

            <div className="max-w-7xl mx-auto space-y-20">

                {/* INTRO: THE CONCEPT */}
                <section className="bg-white rounded-2xl shadow-lg border-t-4 border-[#10B981] p-8 md:p-10 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold text-[#0F0F0F] mb-4">¿Por qué Fracciones?</h2>
                            <p className="text-lg text-[#444444] leading-relaxed">
                                LOKL democratiza el ladrillo. Obtienes <strong>Derechos Fiduciarios</strong> de proyectos premium. Es simple: eres dueño de una parte del edificio, recibes una parte de la renta y ganas una parte de la valorización. Sin bancos, sin papeleo físico.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <div className="text-center px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 min-w-[140px]">
                                <Building2 size={36} className="mx-auto mb-2 text-[#444444]" />
                                <span className="text-sm font-bold text-slate-700">Respaldo Real</span>
                            </div>
                            <div className="text-center px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 min-w-[140px]">
                                <TrendingUp size={36} className="mx-auto mb-2 text-[#444444]" />
                                <span className="text-sm font-bold text-slate-700">Renta Pasiva</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* BLOCK 1: DATA ANALYSIS */}
                <section>
                    <div className="flex items-center mb-8">
                        <div className="bg-[#E0E7FF] text-[#4338CA] p-2.5 rounded-lg mr-4">
                            <TrendingUp size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-[#0F0F0F]">Análisis de Mercado</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Barrier Chart */}
                        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E5E5] p-6 hover:shadow-md transition-shadow">
                            <h4 className="text-lg font-bold text-[#0F0F0F] mb-1 pb-2 border-b border-[#F1F5F9]">Barrera de Entrada</h4>
                            <p className="text-sm text-[#6D6C6C] mb-6">Comparativa de capital mínimo necesario (COP).</p>
                            <div className="h-[300px] w-full">
                                <BarrierChart />
                            </div>
                        </div>

                        {/* Comparison Chart */}
                        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E5E5] p-6 hover:shadow-md transition-shadow">
                            <h4 className="text-lg font-bold text-[#0F0F0F] mb-1 pb-2 border-b border-[#F1F5F9]">Comparativa de Mercado</h4>
                            <p className="text-sm text-[#6D6C6C] mb-6">Puntaje de eficiencia (1-10) en Rentabilidad, Facilidad y Acceso.</p>
                            <div className="h-[300px] w-full">
                                <ComparisonChart />
                            </div>
                        </div>

                        {/* Growth Chart (Full Width) */}
                        <div className="col-span-1 md:col-span-2 bg-white rounded-2xl shadow-sm border border-[#E5E5E5] p-8 border-l-8 border-l-[#4F46E5] hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row justify-between items-end mb-8">
                                <div>
                                    <h4 className="text-2xl font-bold text-[#312E81]">Proyección de Riqueza Comparativa</h4>
                                    <p className="text-[#6D6C6C] mt-1">Comparativa de crecimiento a 5 años (Capital Inicial: $10M).</p>
                                </div>
                                <div className="hidden md:block text-right">
                                    <span className="text-3xl font-bold text-[#10B981]">+75%</span>
                                    <p className="text-xs text-[#94A3B8] uppercase tracking-wider font-semibold">LOKL (Compuesto)</p>
                                </div>
                            </div>
                            <div className="h-[350px] w-full">
                                <GrowthChart />
                            </div>
                            <div className="mt-8 flex flex-wrap gap-4 justify-center text-xs text-[#64748B]">
                                <div className="flex items-center bg-[#EEF2FF] px-3 py-1.5 rounded-full"><span className="w-2.5 h-2.5 rounded-full bg-[#4F46E5] mr-2"></span><strong>LOKL:</strong> Reinversión Automática (Interés Compuesto)</div>
                                <div className="flex items-center bg-[#FFFBEB] px-3 py-1.5 rounded-full"><span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] mr-2"></span><strong>Tradicional:</strong> Valorización (Sin reinversión fácil)</div>
                                <div className="flex items-center bg-[#F1F5F9] px-3 py-1.5 rounded-full"><span className="w-2.5 h-2.5 rounded-full bg-[#94A3B8] mr-2"></span><strong>CDT / Ahorro:</strong> Interés Simple</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* BLOCK 2: THE PROCESS */}
                <section>
                    <div className="flex items-center mb-10">
                        <div className="bg-[#D1FAE5] text-[#047857] p-2.5 rounded-lg mr-4">
                            <ArrowRight size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-[#0F0F0F]">Tu Ruta de Inversión</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Common Card Style */}
                        {[
                            { step: '01', icon: <MousePointer2 size={32} />, title: "Selección y Registro", desc: "Elige el proyecto (ej. Nido de Agua), haz clic en 'quiero ser socio' y regístrate.", colorClass: "border-slate-300 text-slate-900 bg-slate-100", iconColor: "text-slate-800" },
                            { step: '02', icon: <SlidersHorizontal size={32} />, title: "Configuración Units", desc: "Selecciona cantidad de 'units', ingresa cupón si tienes, y elige pago único o diferido.", colorClass: "border-[#A5B4FC] text-[#312E81] bg-[#E0E7FF]", iconColor: "text-[#4F46E5]" },
                            { step: '03', icon: <CreditCard size={32} />, title: "Info y Pago", desc: "Completa tus datos personales y selecciona tu método de pago preferido (Tarjeta o PSE).", colorClass: "border-[#6366F1] text-[#312E81] bg-[#EEF2FF]", iconColor: "text-[#4F46E5]" },
                            { step: '04', icon: <ScanLine size={32} />, title: "Validación (KYC)", desc: "Escanea tu documento por ambos lados desde tu celular. Verifica antecedentes y seguridad.", colorClass: "border-[#34D399] text-[#064E3B] bg-[#ECFDF5]", iconColor: "text-[#10B981]" },
                            { step: '05', icon: <PenTool size={32} />, title: "Firma Contrato", desc: "Lee el documento legal y firma digitalmente (firma manual en pantalla o foto).", colorClass: "border-[#059669] text-[#064E3B] bg-[#D1FAE5]", iconColor: "text-[#059669]" },
                            { step: '06', icon: <CheckCircle2 size={32} />, title: "Confirmación", desc: "Ingresa datos de pago, espera aprobación y regresa al comercio para ver tu inversión.", colorClass: "border-[#F59E0B] text-[#78350F] bg-[#FFFBEB]", iconColor: "text-[#D97706]" },
                        ].map((item, idx) => (
                            <div key={idx} className={`bg-white rounded-xl p-6 shadow-sm border-t-4 hover:shadow-lg transition-all relative overflow-hidden group ${item.colorClass.split(' ')[0]}`}>
                                <div className={`absolute top-0 right-0 -mr-4 -mt-4 w-20 h-20 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500 ${item.colorClass.split(' ')[2]}`}></div>
                                <span className={`absolute top-4 right-4 text-4xl font-black opacity-10 select-none ${item.iconColor}`}>{item.step}</span>
                                <div className="relative z-10">
                                    <div className={`mb-4 ${item.iconColor}`}>{item.icon}</div>
                                    <h4 className={`font-bold text-lg mb-2 ${item.colorClass.split(' ')[1]}`}>{item.title}</h4>
                                    <p className="text-xs text-[#64748B] leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* BLOCK 3: MANAGEMENT & EXIT */}
                <section className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-[#E2E8F0]">
                    <div className="flex items-center mb-10">
                        <div className="bg-[#E0E7FF] text-[#4338CA] p-2.5 rounded-lg mr-4">
                            <Building2 size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-[#0F0F0F]">Lo que debes saber: Gestión y Salida</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-[#EEF2FF] rounded-2xl p-8 border-l-8 border-[#4F46E5] hover:shadow-md transition-shadow">
                            <div className="flex items-start mb-4 gap-4">
                                <div className="bg-white p-3 rounded-xl text-[#4F46E5] shadow-sm">
                                    <Wrench size={24} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-[#312E81]">¿Quién repara el baño?</h4>
                                    <p className="text-xs font-bold text-[#4F46E5] uppercase tracking-wide mt-1">Gestión 100% Pasiva</p>
                                </div>
                            </div>
                            <p className="text-[#475569] leading-relaxed text-sm">
                                <strong>¡No eres tú!</strong> Un operador profesional se encarga de todo: mantenimiento, reparaciones y búsqueda de inquilinos. Tu rol es 100% pasivo. El costo de esta operación se descuenta automáticamente de la renta bruta.
                            </p>
                        </div>

                        <div className="bg-[#ECFDF5] rounded-2xl p-8 border-l-8 border-[#10B981] hover:shadow-md transition-shadow">
                            <div className="flex items-start mb-4 gap-4">
                                <div className="bg-white p-3 rounded-xl text-[#10B981] shadow-sm">
                                    <LogOut size={24} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-[#064E3B]">Estrategia de Salida</h4>
                                    <p className="text-xs font-bold text-[#059669] uppercase tracking-wide mt-1">Mercado Secundario</p>
                                </div>
                            </div>
                            <p className="text-[#475569] leading-relaxed text-sm">
                                La inversión inmobiliaria es de mediano/largo plazo. Sin embargo, si necesitas liquidez, LOKL cuenta con un <strong>Mercado Secundario</strong> donde puedes poner en venta tus fracciones a otros inversionistas de la comunidad.
                            </p>
                        </div>
                    </div>
                </section>

                {/* TAX NOTE */}
                <div className="bg-[#FFFBEB] border border-[#FCD34D] rounded-xl p-6 flex flex-col md:flex-row items-center justify-between shadow-sm">
                    <div className="flex items-center gap-5 mb-4 md:mb-0">
                        <div className="bg-[#F59E0B] text-white p-3 rounded-full">
                            <Calendar size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-[#78350F] text-lg">Nota Fiscal Importante</h4>
                            <p className="text-sm text-[#92400E]">Recuerda descargar tus certificados de retención en <strong>Marzo/Abril</strong> para tu declaración de renta.</p>
                        </div>
                    </div>
                </div>



                {/* VIDEO TUTORIAL */}
                <section className="bg-[#0F172A] rounded-2xl shadow-2xl overflow-hidden border border-[#1E293B]">
                    <div className="p-8 border-b border-[#1E293B] flex flex-col md:flex-row justify-between items-center gap-4 bg-[#1E293B]/50">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-1">Mira cómo invertir en tiempo real</h3>
                            <p className="text-[#94A3B8] text-sm">Sin trucos. Un recorrido real por la plataforma.</p>
                        </div>
                        <span className="bg-[#10B981] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                            <Play size={14} fill="currentColor" /> Video Tutorial
                        </span>
                    </div>
                    <div className="relative w-full aspect-video bg-slate-900">
                        <YouTubeFacade videoId="zWDBP4Xl-PI" title="Tutorial Inversión LOKL" />
                    </div>
                </section>

                {/* CTA */}
                <div className="bg-gradient-to-r from-[#312E81] to-[#4338CA] rounded-3xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">¿Listo para ser dueño?</h2>
                        <p className="text-[#C7D2FE] text-lg mb-10 max-w-2xl mx-auto">
                            No necesitas millones para empezar. Únete a la revolución inmobiliaria hoy mismo.
                        </p>
                        <a href="https://lokl.life/" target="_blank" className="inline-flex items-center justify-center bg-[#10B981] hover:bg-[#059669] text-white font-bold py-4 px-10 rounded-full text-lg transition duration-300 transform hover:scale-105 shadow-lg group">
                            Ir al Marketplace LOKL
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>

            </div>
        </>
    );
};

export default GuiaInversionPage;
