'use client';

import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend,
    Filler,
    ChartOptions
} from 'chart.js';
import { Bar, Line, Radar } from 'react-chartjs-2';
import {
    Mountain,
    Droplets,
    ExternalLink,
    ArrowRight,
    ShieldCheck,
    TrendingDown,
    Leaf,
    Building2,
    Activity,
    Zap,
    Users,
    Info,
    Map,
    Target,
    Globe,
    Download
} from 'lucide-react';
import { ReportJsonLd } from '@/components/reports/ReportJsonLd';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend,
    Filler
);

// --- CONFIGURACIÓN DE ENLACES ---
const URLS = {
    PDF: "https://drive.google.com/file/d/10_9dAIEmsZAO6qyrTp48_5NqzFsc7d43/view",
    GUATAPE: "https://lokl.life/nido-de-agua",
    MEDELLIN: "https://lokl.life/indie-universe"
};

// --- TOKENS DE DISEÑO LOKL ---
const COLORS = {
    PURPLE: '#5352F6',
    GREEN: '#22C55E',
    RED: '#EF4444',
    DARK: '#0F0F0F',
    GRAY_BODY: '#444444',
    GRAY_SUB: '#6D6C6C',
    GRAY_LIGHT: '#E5E5E5',
    BG_OFF: '#FAFAFA'
};

// Global Chart Defaults
ChartJS.defaults.font.family = "'Inter', sans-serif";
ChartJS.defaults.color = COLORS.GRAY_SUB;

// --- UTILIDADES ---
const wrapLabels = (labels: string[]): (string | string[])[] => {
    return labels.map(label => {
        if (label.length <= 16) return label;
        const words = label.split(' ');
        const lines: string[] = [];
        let currentLine = words[0];
        for (let i = 1; i < words.length; i++) {
            if ((currentLine + " " + words[i]).length <= 16) {
                currentLine += " " + words[i];
            } else {
                lines.push(currentLine);
                currentLine = words[i];
            }
        }
        lines.push(currentLine);
        return lines;
    });
};

// --- COMPONENTES DE GRÁFICAS ---

const RunoffChart = () => {
    const data = {
        labels: wrapLabels(['Bosque Nativo', 'Parques Urbanos', 'Barrios Ladera', 'Centro Ciudad']),
        datasets: [{
            label: 'Escorrentía % (Agua no absorbida)',
            data: [12, 38, 72, 96],
            backgroundColor: [COLORS.GREEN, '#A1A0FB', COLORS.PURPLE, COLORS.RED],
            borderRadius: 8
        }]
    };

    const options: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: COLORS.DARK,
                    font: { weight: 600, size: 11, family: 'Inter' }
                }
            },
            tooltip: {
                backgroundColor: COLORS.DARK,
                padding: 12,
                cornerRadius: 8,
                callbacks: {
                    title: (items) => {
                        const label = items[0].chart.data.labels?.[items[0].dataIndex];
                        return Array.isArray(label) ? label.join(' ') : String(label);
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                grid: { color: '#F3F4F6' }
            },
            x: {
                grid: { display: false }
            }
        }
    };

    return <Bar data={data} options={options} />;
};

const ComparisonRadarChart = () => {
    const data = {
        labels: ['Retención', 'Costo Obra', 'Impacto Social', 'Biodiversidad', 'Resiliencia'],
        datasets: [
            {
                label: 'Infraestructura Verde',
                data: [85, 55, 95, 100, 90],
                borderColor: COLORS.GREEN,
                backgroundColor: 'rgba(34, 197, 94, 0.15)',
                borderWidth: 3,
                pointRadius: 4,
                pointBackgroundColor: COLORS.GREEN
            },
            {
                label: 'Infraestructura Gris',
                data: [98, 90, 40, 15, 85],
                borderColor: COLORS.PURPLE,
                backgroundColor: 'rgba(83, 82, 246, 0.15)',
                borderWidth: 3,
                pointRadius: 4,
                pointBackgroundColor: COLORS.PURPLE
            }
        ]
    };

    const options: ChartOptions<'radar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: COLORS.DARK,
                padding: 12,
                cornerRadius: 8
            }
        },
        scales: {
            r: {
                angleLines: { display: true },
                ticks: { display: false },
                suggestedMin: 0,
                suggestedMax: 100
            }
        }
    };

    return <Radar data={data} options={options} />;
};

const ImpactChart = () => {
    const data = {
        labels: ['Hoy', '2026', '2028', '2030', '2032', '2034'],
        datasets: [{
            label: 'Reducción de Riesgo de Inundación (%)',
            data: [0, 18, 42, 65, 80, 92],
            borderColor: COLORS.PURPLE,
            backgroundColor: 'rgba(83, 82, 246, 0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 4,
            pointRadius: 6,
            pointBackgroundColor: COLORS.PURPLE
        }]
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#FFFFFF',
                    font: { weight: 600, size: 11 }
                }
            },
            tooltip: {
                backgroundColor: COLORS.DARK,
                padding: 12,
                cornerRadius: 8
            }
        },
        scales: {
            y: {
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                ticks: { color: '#FFFFFF' }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#FFFFFF' }
            }
        }
    };

    return <Line data={data} options={options} />;
};

// --- COMPONENTES UI ---

interface ComparisonScoreProps {
    icon: React.ElementType;
    title: string;
    desc: string;
    greenScore: number;
    purpleScore: number;
}

const ComparisonScore = ({ icon: Icon, title, desc, greenScore, purpleScore }: ComparisonScoreProps) => {
    const winner = greenScore > purpleScore ? 'green' : 'purple';
    return (
        <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl hover:bg-[#F5F5F5] transition-all border border-transparent hover:border-gray-200">
            <div className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl flex-shrink-0 ${winner === 'green' ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-[#5352F6]/10 text-[#5352F6]'}`}>
                <Icon size={18} className="sm:w-5 sm:h-5" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 mb-2">
                    <h4 className="font-bold text-[#0F0F0F] text-xs sm:text-sm">{title}</h4>
                    <span className={`text-[8px] sm:text-[9px] font-black uppercase tracking-widest ${winner === 'green' ? 'text-[#22C55E]' : 'text-[#5352F6]'}`}>
                        {winner === 'green' ? 'Naturaleza' : 'Ingeniería'}
                    </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-[#6D6C6C] leading-relaxed mb-2 sm:mb-3">{desc}</p>
                <div className="flex gap-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#22C55E]" style={{ width: `${greenScore}%` }}></div>
                    <div className="h-full bg-[#5352F6]" style={{ width: `${purpleScore}%` }}></div>
                </div>
            </div>
        </div>
    );
};

// --- PÁGINA PRINCIPAL ---

const ResilienciaUrbanaPage = () => {
    return (
        <>
            <ReportJsonLd
                title="El Futuro es una Ciudad Esponja - Resiliencia Urbana"
                description="Investigación técnica sobre la gestión de inundaciones en valles profundos. Una propuesta para transformar a Medellín en un ecosistema que respira y absorbe."
                url="https://lokl.life/reports/resiliencia-urbana"
                datePublished="2026-01-30"
                image="https://lokl.life/images/reports/resiliencia-urbana-og.jpg"
            />

            <div className="min-h-screen">

                {/* --- HERO --- */}
                <header className="px-4 sm:px-6 py-12 sm:py-20 lg:py-32 max-w-7xl mx-auto text-center flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#5352F6]/10 text-[#5352F6] rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-6 sm:mb-8">
                        <Activity size={14} /> Investigación Senior Medellín
                    </div>
                    <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-[#0F0F0F] leading-[1.1] mb-6 sm:mb-8">
                        El Futuro es una <br />
                        <span className="text-[#5352F6]">Ciudad Esponja</span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-[#6D6C6C] max-w-2xl leading-relaxed mb-8 sm:mb-12 px-4">
                        Investigación técnica sobre la gestión de inundaciones en valles profundos. Una propuesta para transformar a Medellín en un ecosistema que respira y absorbe.
                    </p>
                    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4">
                        <a href={URLS.GUATAPE} target="_blank" rel="noopener noreferrer" className="bg-[#0F0F0F] text-white px-6 sm:px-10 py-3 sm:py-4 rounded-2xl font-bold text-sm sm:text-base hover:bg-[#5352F6] transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/10">
                            Proyectos en Guatapé <ArrowRight size={18} />
                        </a>
                        <a href={URLS.MEDELLIN} target="_blank" rel="noopener noreferrer" className="border border-[#E5E5E5] text-[#0F0F0F] px-6 sm:px-10 py-3 sm:py-4 rounded-2xl font-bold text-sm sm:text-base hover:border-[#5352F6] hover:text-[#5352F6] transition-all">
                            Oportunidades Medellín
                        </a>
                    </div>
                </header>

                {/* --- PRINCIPIOS --- */}
                <section className="py-12 sm:py-24 bg-[#FAFAFA] border-y border-[#E5E5E5] px-4 sm:px-6">
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
                        <div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F0F0F] mb-4 sm:mb-6">El Reto de la Ladera</h2>
                            <p className="text-base sm:text-lg text-[#6D6C6C] mb-6 sm:mb-10 leading-relaxed">
                                En Medellín, el &quot;efecto tobogán&quot; acelera el agua en laderas de más de 30°. Al cubrir la tierra con concreto, eliminamos la infiltración natural, saturando el valle en menos de 20 minutos.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                                <div className="p-4 sm:p-6 bg-white rounded-2xl border border-[#E5E5E5] shadow-sm">
                                    <Mountain className="text-[#5352F6] mb-3" size={24} />
                                    <h4 className="font-bold text-[#0F0F0F] text-sm">Geografía Crítica</h4>
                                    <p className="text-xs text-[#6D6C6C] mt-1">Valles profundos que atrapan humedad y aceleran el caudal superficial.</p>
                                </div>
                                <div className="p-4 sm:p-6 bg-white rounded-2xl border border-[#E5E5E5] shadow-sm">
                                    <Droplets className="text-[#22C55E] mb-3" size={24} />
                                    <h4 className="font-bold text-[#0F0F0F] text-sm">Cero Infiltración</h4>
                                    <p className="text-xs text-[#6D6C6C] mt-1">El 96% de la lluvia en el centro de Medellín ya no es absorbida por el suelo.</p>
                                </div>
                            </div>
                        </div>
                        <div className="h-[350px] sm:h-[450px] bg-white p-6 sm:p-10 rounded-2xl sm:rounded-[3rem] border border-[#E5E5E5] shadow-sm">
                            <h4 className="text-[9px] sm:text-[10px] font-black text-[#0F0F0F] uppercase tracking-widest mb-4 sm:mb-8 text-center">Porcentaje de agua no absorbida</h4>
                            <div className="h-[250px] sm:h-[320px]">
                                <RunoffChart />
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- EFICACIA COMPARATIVA --- */}
                <section className="py-12 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6 sm:gap-12 mb-8 sm:mb-16">
                        <div className="max-w-xl">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F0F0F] mb-3 sm:mb-4">Eficacia Comparativa</h2>
                            <p className="text-base sm:text-lg text-[#6D6C6C]">No se trata de elegir uno, sino de equilibrar ambos. La ingeniería gris protege la vida, la verde regenera el futuro social.</p>
                        </div>
                        <div className="flex gap-4 sm:gap-6 bg-gray-50 p-3 sm:p-4 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#22C55E]"></div><span className="text-xs font-bold text-[#0F0F0F]">Naturaleza</span></div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#5352F6]"></div><span className="text-xs font-bold text-[#0F0F0F]">Ingeniería</span></div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
                        <div className="h-[350px] sm:h-[480px] bg-[#FAFAFA] rounded-2xl sm:rounded-[3rem] p-6 sm:p-10 border border-[#F5F5F5] relative group">
                            <ComparisonRadarChart />
                            <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 bg-white p-2 sm:p-3 rounded-xl shadow-sm border border-[#E5E5E5] flex items-center gap-2">
                                <Zap size={14} className="text-[#F59E0B]" />
                                <span className="text-[9px] sm:text-[10px] font-bold text-[#0F0F0F]">Diseño Híbrido LOKL</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <ComparisonScore icon={ShieldCheck} title="Poder de Retención" desc="La infraestructura gris (tanques y canales) es necesaria para gestionar picos extremos en áreas densas." greenScore={85} purpleScore={98} />
                            <ComparisonScore icon={TrendingDown} title="Eficiencia de Costos" desc="La infraestructura verde es más económica y escalable, reduciendo gastos de mantenimiento térmico." greenScore={60} purpleScore={90} />
                            <ComparisonScore icon={Users} title="Impacto en la Comunidad" desc="Los parques verdes generan valorización y bienestar; el concreto no crea apego social." greenScore={98} purpleScore={40} />
                            <ComparisonScore icon={Leaf} title="Biodiversidad" desc="Solo la naturaleza devuelve la vida al valle y reduce el efecto de isla de calor." greenScore={100} purpleScore={15} />
                            <ComparisonScore icon={Info} title="Resiliencia Crítica" desc="Un sistema mixto garantiza que la ciudad siga operativa incluso ante fallas mecánicas." greenScore={92} purpleScore={80} />
                        </div>
                    </div>
                </section>

                {/* --- PROPUESTA MEDELLÍN --- */}
                <section className="py-12 sm:py-24 px-4 sm:px-6 bg-[#0F0F0F] text-white rounded-2xl sm:rounded-[4rem] mb-16 sm:mb-32 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 sm:gap-24 items-center">
                        <div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 sm:mb-10 leading-tight">Estrategia Medellín <br /> <span className="text-[#5352F6]">2024 - 2034</span></h2>
                            <div className="space-y-4 sm:space-y-8">
                                <div className="flex gap-4 sm:gap-6 p-4 sm:p-6 bg-white/5 rounded-2xl sm:rounded-3xl border border-white/10 hover:bg-white/10 transition-all group">
                                    <Target className="text-[#5352F6] group-hover:scale-110 transition-transform flex-shrink-0" size={28} />
                                    <div><h4 className="text-base sm:text-xl font-bold mb-1">Micro-Reservorios</h4><p className="text-xs sm:text-sm text-[#919090]">Diques de bioingeniería en las cuencas altas para frenar el caudal en la fuente.</p></div>
                                </div>
                                <div className="flex gap-4 sm:gap-6 p-4 sm:p-6 bg-white/5 rounded-2xl sm:rounded-3xl border border-white/10 hover:bg-white/10 transition-all group">
                                    <Building2 className="text-[#22C55E] group-hover:scale-110 transition-transform flex-shrink-0" size={28} />
                                    <div><h4 className="text-base sm:text-xl font-bold mb-1">Espacios Inundables</h4><p className="text-xs sm:text-sm text-[#919090]">Escenarios del INDER diseñados para actuar como reservorios temporales en tormentas.</p></div>
                                </div>
                                <div className="flex gap-4 sm:gap-6 p-4 sm:p-6 bg-white/5 rounded-2xl sm:rounded-3xl border border-white/10 hover:bg-white/10 transition-all group">
                                    <Map className="text-[#F59E0B] group-hover:scale-110 transition-transform flex-shrink-0" size={28} />
                                    <div><h4 className="text-base sm:text-xl font-bold mb-1">Drenajes Urbanos SUDS</h4><p className="text-xs sm:text-sm text-[#919090]">Jardines de lluvia en andenes que capturan agua antes de llegar al sistema pluvial.</p></div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/5 p-6 sm:p-10 rounded-2xl sm:rounded-[3rem] border border-white/10 backdrop-blur-md">
                            <h4 className="font-bold mb-6 sm:mb-10 text-center text-[#5352F6] text-sm sm:text-base">Impacto en Seguridad Hídrica</h4>
                            <div className="h-[250px] sm:h-[320px]">
                                <ImpactChart />
                            </div>
                            <div className="mt-6 sm:mt-10 p-4 sm:p-5 bg-[#22C55E]/10 rounded-2xl border border-[#22C55E]/20 text-center">
                                <p className="text-[#22C55E] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 italic">
                                    <ShieldCheck size={16} /> Reducción del 92% en daños estructurales proyectados.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-[#5352F6]/5 -skew-x-12 translate-x-32 -z-0 hidden sm:block"></div>
                </section>

                {/* --- PROYECTOS DE INVERSIÓN --- */}
                <section id="proyectos" className="py-12 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-gray-100">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-16 gap-6 sm:gap-8">
                        <div className="max-w-2xl">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#0F0F0F] mb-3 sm:mb-4 tracking-tight">Inversión con Propósito</h2>
                            <p className="text-base sm:text-lg text-[#6D6C6C]">Sé parte de la transformación invirtiendo en activos que regeneran el territorio y aplican estos principios.</p>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-bold text-[#0F0F0F] bg-gray-50 px-4 sm:px-5 py-2 sm:py-3 rounded-2xl whitespace-nowrap">
                            <Globe size={16} className="text-[#5352F6] flex-shrink-0" /> <span>+2,400 Inversionistas</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {/* NIDO DE AGUA */}
                        <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden group hover:shadow-xl hover:border-[#5352F6] transition-all duration-300">
                            <div className="h-48 sm:h-64 bg-gray-200 relative overflow-hidden">
                                <img
                                    src="https://lokl-assets.s3.us-east-1.amazonaws.com/nido-de-agua/nido-de-agua.jpg"
                                    alt="Nido de Agua - Proyecto eco-turístico en Guatapé"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="inline-flex items-center px-3 py-1 bg-[#5352F6] text-white text-xs font-bold uppercase rounded-full">
                                        Guatapé
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-[#0F0F0F] mb-2">Nido de Agua</h3>
                                <p className="text-[#6D6C6C] text-sm mb-6 leading-relaxed">
                                    Un proyecto icónico que redefine la relación con el agua mediante arquitectura regenerativa diseñada para proteger la cuenca del embalse.
                                </p>
                                <a
                                    href={URLS.GUATAPE}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex items-center justify-center gap-2 bg-[#5352F6] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#4241C5] transition-colors"
                                >
                                    Ver Proyecto <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>

                        {/* INDIE UNIVERSE */}
                        <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden group hover:shadow-xl hover:border-[#5352F6] transition-all duration-300">
                            <div className="h-48 sm:h-64 bg-gray-200 relative overflow-hidden">
                                <img
                                    src="https://lokl-assets.s3.us-east-1.amazonaws.com/indie-universe/Indie_Page/Landing_Banner.png"
                                    alt="Indie Universe - Coliving en Medellín"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                                    Desarrollo urbano inteligente que aplica principios de Ciudad Esponja en el centro, optimizando la gestión de aguas y mejorando el confort térmico.
                                </p>
                                <a
                                    href={URLS.MEDELLIN}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex items-center justify-center gap-2 bg-[#5352F6] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#4241C5] transition-colors"
                                >
                                    Ver Oportunidades <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>

                        {/* REPORTE TÉCNICO */}
                        <div className="bg-gradient-to-br from-[#F5F5FF] to-white border-2 border-[#5352F6]/20 rounded-xl overflow-hidden flex flex-col justify-between p-6 sm:p-8 hover:shadow-xl hover:border-[#5352F6]/40 transition-all duration-300">
                            <div className="flex-1 flex flex-col items-center justify-center text-center">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#5352F6]/10 flex items-center justify-center mb-6">
                                    <Download size={28} className="sm:w-8 sm:h-8 text-[#5352F6]" strokeWidth={2.5} />
                                </div>
                                <h3 className="text-xl font-bold text-[#0F0F0F] mb-3">
                                    Informe Completo PDF
                                </h3>
                                <p className="text-[#6D6C6C] text-sm mb-6 leading-relaxed">
                                    Descarga el análisis detallado con modelos hidrológicos, bibliografía y metodología completa.
                                </p>
                            </div>
                            <a
                                href={URLS.PDF}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center gap-2 bg-white border-2 border-[#5352F6] text-[#5352F6] font-semibold px-6 py-3 rounded-lg hover:bg-[#5352F6] hover:text-white transition-colors"
                            >
                                Descargar PDF <Download size={16} />
                            </a>
                        </div>

                    </div>
                </section>

            </div>
        </>
    );
};

export default ResilienciaUrbanaPage;
