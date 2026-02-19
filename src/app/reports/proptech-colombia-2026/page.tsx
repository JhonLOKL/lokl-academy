'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  RadialLinearScale,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js';
import { Bar, Line, Radar, Doughnut } from 'react-chartjs-2';
import { ArrowRight, FileText, Zap } from 'lucide-react';
import { ReportJsonLd } from '@/components/reports/ReportJsonLd';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  RadialLinearScale,
  Tooltip,
  Legend
);

const colors = {
  primary: '#5352F6',
  primaryLight: '#A1A0FB',
  neutral: '#E5E5E5',
  dark: '#0F0F0F',
  text: '#6D6C6C',
  white: '#FFFFFF'
};

ChartJS.defaults.font.family = "'Inter', sans-serif";
ChartJS.defaults.color = colors.text;

// --- Charts ---

// Formato corto para eje: $50K, $150M
const formatBarrierLabel = (value: number) => {
  if (value >= 1e6) return '$' + (value / 1e6).toFixed(0) + 'M';
  if (value >= 1e3) return '$' + (value / 1e3).toFixed(0) + 'K';
  return '$' + value.toLocaleString('es-CO');
};

// Plugin para mostrar el valor al final de cada barra (horizontal)
const barValuePlugin = {
  id: 'barValueLabels',
  afterDatasetsDraw(chart: InstanceType<typeof ChartJS>) {
    const ctx = chart.ctx;
    const config = chart.config as { type?: string; data?: { datasets?: Array<{ data?: unknown; backgroundColor?: string | string[] }> } };
    if (config.type !== 'bar' || !chart.scales?.x) return;
    const meta = chart.getDatasetMeta(0);
    const values = (config.data?.datasets?.[0]?.data ?? []) as number[];
    const ds = config.data?.datasets?.[0];
    const bg = ds?.backgroundColor ? (Array.isArray(ds.backgroundColor) ? ds.backgroundColor : [ds.backgroundColor]) : [];
    const colorsArr = [bg[0] ?? colors.neutral, bg[1] ?? colors.primary];
    meta.data.forEach((bar, i) => {
      const value = values[i];
      const x = (bar as { x?: number }).x ?? 0;
      const y = (bar as { y?: number }).y ?? 0;
      const label = value >= 1e6 ? '$' + (value / 1e6) + 'M' : value >= 1e3 ? '$' + (value / 1e3) + 'K' : '$' + value;
      ctx.save();
      ctx.font = '600 11px Inter, sans-serif';
      ctx.fillStyle = String(colorsArr[i] ?? colors.text);
      ctx.textAlign = 'left';
      ctx.fillText(label, x + 6, y + 4);
      ctx.restore();
    });
  }
};

const ChartTokenization = () => {
  const data: ChartData<'bar'> = {
    labels: ['Tradicional', 'Tokenización'],
    datasets: [{
      data: [150000000, 50000],
      backgroundColor: [colors.neutral, colors.primary],
      borderRadius: 6,
      barPercentage: 0.65
    }]
  };
  const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: { label: (ctx) => formatBarrierLabel(ctx.raw as number) + ' COP' }
      }
    },
    scales: {
      x: {
        type: 'logarithmic',
        min: 40000,
        max: 200000000,
        grid: { display: false },
        ticks: {
          maxTicksLimit: 6,
          callback: function (v) {
            const n = Number(v);
            if (n >= 1e6) return '$' + (n / 1e6) + 'M';
            if (n >= 1e3) return '$' + (n / 1e3) + 'K';
            return '$' + n;
          }
        }
      },
      y: { grid: { display: false } }
    }
  };
  return <Bar data={data} options={options} plugins={[barValuePlugin]} />;
};

const ChartCrowdfunding = () => {
  const data: ChartData<'line'> = {
    labels: ['2022', '2023', '2024', '2025', '2026'],
    datasets: [{
      label: 'Billones COP',
      data: [0.5, 1.2, 2.8, 5.5, 8.2],
      borderColor: colors.primary,
      borderWidth: 3,
      backgroundColor: 'rgba(83, 82, 246, 0.15)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: colors.white,
      pointBorderColor: colors.primary,
      pointBorderWidth: 2,
      pointRadius: 6
    }]
  };
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { grid: { color: '#f0f0f0' } },
      x: { grid: { display: false } }
    }
  };
  return <Line data={data} options={options} />;
};

const ChartBigData = () => {
  const data: ChartData<'radar'> = {
    labels: ['Velocidad', 'Precisión', 'Costo', 'Datos', 'Transparencia'],
    datasets: [
      {
        label: 'Humano',
        data: [40, 70, 50, 30, 60],
        borderColor: colors.neutral,
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 0
      },
      {
        label: 'IA',
        data: [95, 98, 90, 95, 95],
        borderColor: colors.primary,
        backgroundColor: 'rgba(83, 82, 246, 0.2)',
        borderWidth: 2,
        pointBackgroundColor: colors.primary
      }
    ]
  };
  const options: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } },
    scales: {
      r: {
        angleLines: { color: '#E5E5E5' },
        grid: { color: '#E5E5E5' },
        pointLabels: { font: { size: 12, weight: 600 }, color: colors.dark },
        ticks: { display: false }
      }
    }
  };
  return <Radar data={data} options={options} />;
};

const ChartSmartContracts = () => {
  const data: ChartData<'bar'> = {
    labels: ['Tradicional', 'Smart Contract'],
    datasets: [
      { label: 'Comisión', data: [8, 0], backgroundColor: colors.neutral, barPercentage: 0.5 },
      { label: 'Seguro', data: [3, 1], backgroundColor: colors.primaryLight, barPercentage: 0.5 },
      { label: 'Trámites', data: [2, 0.5], backgroundColor: colors.primary, barPercentage: 0.5 }
    ]
  };
  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { stacked: true, grid: { display: false } },
      y: { stacked: true, grid: { display: false } }
    }
  };
  return <Bar data={data} options={options} />;
};

const ChartVR = () => {
  const data: ChartData<'doughnut'> = {
    labels: ['Visitas Virtuales', 'Trámites Digitales', 'Físico'],
    datasets: [{
      data: [65, 25, 10],
      backgroundColor: [colors.primary, colors.primaryLight, colors.neutral],
      borderWidth: 0,
      hoverOffset: 4
    }]
  };
  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '80%',
    plugins: { legend: { display: false } }
  };
  return <Doughnut data={data} options={options} />;
};

const ChartConstruction = () => {
  const data: ChartData<'bar'> = {
    labels: ['Tradicional', 'Modular 3D'],
    datasets: [{
      label: 'Meses',
      data: [24, 6],
      backgroundColor: ['rgba(255,255,255,0.2)', colors.primary],
      borderRadius: 4,
      barPercentage: 0.6
    }]
  };
  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#9CA3AF' } },
      y: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#9CA3AF' } }
    }
  };
  return <Bar data={data} options={options} />;
};

const ProptechColombia2026Page = () => {
  return (
    <>
      <ReportJsonLd
        title="PropTech 2026: La Democratización del Ladrillo"
        description="Cómo 7 tecnologías clave desmantelaron las barreras de entrada, permitiendo invertir en real estate desde $50.000 COP. Análisis post-Ley Fintech."
        url="https://academy.lokl.life/reports/proptech-colombia-2026"
        datePublished="2026-02-13"
        image="https://academy.lokl.life/images/lokl-academy-og.jpg"
      />

      {/* Hero */}
      <header className="bg-white pt-24 pb-16 border-b border-[#E5E5E5] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#5352F6]/5 to-transparent skew-x-12 transform translate-x-20 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 mb-6 bg-[#F5F5F5] rounded-full px-4 py-1.5 border border-[#E5E5E5]">
            <span className="w-2 h-2 rounded-full bg-[#5352F6] animate-pulse" />
            <span className="text-xs font-semibold text-[#6D6C6C] uppercase tracking-wide">Medellín, Colombia | 13 Febrero 2026</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#0F0F0F] tracking-tight leading-[1.1] mb-6">
            PropTech 2026: <br />
            <span className="text-[#5352F6]">La Democratización</span> del Ladrillo.
          </h1>
          <p className="text-lg md:text-xl text-[#6D6C6C] max-w-3xl leading-relaxed font-light">
            Cómo 7 tecnologías clave desmantelaron las barreras de entrada, permitiendo que el colombiano promedio invierta desde <strong>$50.000 COP</strong>. Un análisis de la revolución post-Ley Fintech.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 border-t border-[#E5E5E5] pt-8">
            <div>
              <p className="text-[#6D6C6C] text-sm mb-1 uppercase tracking-wide">Ticket Promedio 2022</p>
              <p className="text-2xl font-bold text-[#0F0F0F] line-through decoration-[#EF4444] decoration-2">$200 Millones</p>
            </div>
            <div>
              <p className="text-[#6D6C6C] text-sm mb-1 uppercase tracking-wide">Ticket Promedio 2026</p>
              <p className="text-2xl font-bold text-[#5352F6]">$50.000 COP</p>
            </div>
            <div>
              <p className="text-[#6D6C6C] text-sm mb-1 uppercase tracking-wide">Crecimiento Inversores</p>
              <p className="text-2xl font-bold text-[#22C55E]">+450%</p>
            </div>
          </div>
        </div>
      </header>

      {/* Section 1: Acceso */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="bg-[#5352F6] text-white font-bold px-3 py-1 rounded text-sm">Fase 1</div>
            <h2 className="text-3xl font-bold text-[#0F0F0F]">Acceso: El Fin del &quot;Club Privado&quot;</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-2xl font-bold text-[#0F0F0F] mb-4">1. Tokenización de Activos Reales (RWA)</h3>
              <p className="text-[#444444] leading-relaxed mb-6">
                La implementación de la <strong>Ley Fintech de 2024</strong> permitió a plataformas como <em>LadrilloChain</em> y <em>BloomBlock</em> dividir escrituras tradicionales en tokens digitales.
              </p>
              <ul className="space-y-3 mb-8 text-[#6D6C6C]">
                {['Validación automática por la Superfinanciera.', 'Liquidez secundaria: vende tu token un domingo a las 3 AM.', 'Dividendos diarios depositados en billeteras digitales.'].map((item, i) => (
                  <li key={i} className="relative pl-6 before:content-['✓'] before:absolute before:left-0 before:text-[#5352F6] before:font-bold">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="bg-[#FAFAFA] p-6 rounded-xl border border-[#E5E5E5] shadow-sm">
                <p className="text-sm text-[#6D6C6C] mb-2">Comparativa de Barrera de Entrada</p>
                <div className="h-[200px] w-full">
                  <ChartTokenization />
                </div>
              </div>
            </div>
            <div className="bg-[#5352F6]/5 p-8 rounded-2xl border border-[#5352F6]/20">
              <h3 className="text-2xl font-bold text-[#5352F6] mb-4">2. Crowdfunding 2.0</h3>
              <p className="text-[#444444] mb-6">
                Ya no se financian edificios aislados, sino distritos enteros. La IA selecciona proyectos con la mejor TIR (Tasa Interna de Retorno) ajustada al riesgo.
              </p>
              <div className="bg-white p-4 rounded-xl border border-[#E5E5E5] shadow-sm mb-6 h-[280px]">
                <ChartCrowdfunding />
              </div>
              <div className="flex items-center justify-between border-t border-[#5352F6]/20 pt-4">
                <span className="text-sm font-medium text-[#444444]">Volumen Gestionado 2026</span>
                <span className="text-xl font-bold text-[#5352F6]">8.2 Billones COP</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Velocidad */}
      <section className="py-20 bg-[#FAFAFA] border-y border-[#E5E5E5]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="bg-[#5352F6] text-white font-bold px-3 py-1 rounded text-sm">Fase 2</div>
            <h2 className="text-3xl font-bold text-[#0F0F0F]">Velocidad: Liquidez Instantánea</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-16 text-center items-center">
            <div className="bg-white p-8 rounded-xl border border-[#E5E5E5] shadow-sm">
              <p className="text-[#6D6C6C] text-sm uppercase mb-2">Tiempo Venta Tradicional</p>
              <p className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#E5E5E5] line-through">180</p>
              <p className="text-[#9CA3AF] font-medium">Días</p>
            </div>
            <div className="flex justify-center">
              <div className="bg-[#5352F6]/10 p-4 rounded-full text-[#5352F6]">
                <Zap className="w-8 h-8" />
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl border-2 border-[#5352F6] shadow-lg shadow-[#5352F6]/20">
              <p className="text-[#5352F6] text-sm uppercase mb-2">Tiempo iBuyer 2026</p>
              <p className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#5352F6]">4</p>
              <p className="text-[#0F0F0F] font-medium">Días</p>
            </div>
          </div>
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <h3 className="text-2xl font-bold text-[#0F0F0F] mb-4">3. Algoritmos de Precio (AVM)</h3>
              <p className="text-[#6D6C6C] mb-6">
                El avaluador humano ha pasado a un rol de auditor. Los modelos AVM (Automated Valuation Models) analizan hoy:
              </p>
              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-white rounded-lg border border-[#E5E5E5]">
                  <div className="bg-[#F5F5F5] p-2 rounded h-fit text-lg">📊</div>
                  <div>
                    <h4 className="font-bold text-[#0F0F0F] text-sm">Variables Macro</h4>
                    <p className="text-xs text-[#6D6C6C]">Inflación, tasas de interés, PIB local.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-white rounded-lg border border-[#E5E5E5]">
                  <div className="bg-[#F5F5F5] p-2 rounded h-fit text-lg">🛰️</div>
                  <div>
                    <h4 className="font-bold text-[#0F0F0F] text-sm">Variables Geoespaciales</h4>
                    <p className="text-xs text-[#6D6C6C]">Tráfico en tiempo real, niveles de ruido, criminalidad.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-7">
              <div className="bg-white p-6 rounded-xl border border-[#E5E5E5] shadow-sm h-full">
                <h4 className="text-sm font-bold text-[#6D6C6C] mb-4 text-center uppercase">Humano vs Inteligencia Artificial</h4>
                <div className="h-[300px] w-full">
                  <ChartBigData />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Eficiencia */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="bg-[#5352F6] text-white font-bold px-3 py-1 rounded text-sm">Fase 3</div>
            <h2 className="text-3xl font-bold text-[#0F0F0F]">Eficiencia: Cero Fricción</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-[#FAFAFA] rounded-2xl p-8 border border-[#E5E5E5]">
              <h3 className="text-xl font-bold text-[#0F0F0F] mb-4">5. Smart Contracts</h3>
              <p className="text-sm text-[#6D6C6C] mb-6 leading-relaxed">
                La &quot;Identidad Digital Notarial&quot; eliminó el papel. Los contratos de arrendamiento se autoejecutan: si el pago no ingresa a la blockchain el día 5, el acceso digital a la propiedad se restringe automáticamente.
              </p>
              <div className="h-[220px] w-full mb-4">
                <ChartSmartContracts />
              </div>
              <p className="text-center text-xs text-[#9CA3AF] mt-2">Costos transaccionales eliminados</p>
            </div>
            <div className="bg-[#FAFAFA] rounded-2xl p-8 border border-[#E5E5E5]">
              <h3 className="text-xl font-bold text-[#0F0F0F] mb-4">6. Realidad Inmersiva</h3>
              <p className="text-sm text-[#6D6C6C] mb-6 leading-relaxed">
                La tasa de visitas físicas ha caído un 80%. El inversor de 2026 utiliza gafas de realidad mixta para &quot;caminar&quot; por 20 apartamentos en Medellín estando sentado en Bogotá.
              </p>
              <div className="h-[220px] w-full relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none z-10">
                  <span className="text-3xl font-bold text-[#0F0F0F]">80%</span>
                  <span className="text-xs text-[#6D6C6C]">Ahorro Tiempo</span>
                </div>
                <div className="w-full h-full">
                  <ChartVR />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Construcción (dark) */}
      <section className="py-20 bg-[#0F0F0F] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute w-96 h-96 bg-[#5352F6] rounded-full blur-3xl -top-20 -left-20" />
          <div className="absolute w-96 h-96 bg-purple-600 rounded-full blur-3xl bottom-0 right-0" />
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">7. Construcción Modular 3D</h2>
              <p className="text-[#D1D5DB] text-lg leading-relaxed mb-8">
                Mientras el software optimiza la inversión, el hardware optimiza el activo. La construcción off-site (tipo LEGO) ha reducido el desperdicio de materiales en un 40% y los tiempos de entrega en un 70%.
              </p>
              <div className="flex gap-4">
                <div className="bg-[#1F2937] p-4 rounded-lg border border-[#374151] w-1/2">
                  <p className="text-xs text-[#9CA3AF] uppercase">Obra Tradicional</p>
                  <p className="text-2xl font-bold text-white">24 Meses</p>
                </div>
                <div className="bg-[#5352F6] p-4 rounded-lg border border-[#5352F6] w-1/2 shadow-lg">
                  <p className="text-xs text-white/80 uppercase">Modular 3D</p>
                  <p className="text-2xl font-bold text-white">6 Meses</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="h-[280px] w-full">
                <ChartConstruction />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Oportunidades */}
      <section className="py-20 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="bg-[#5352F6]/10 text-[#5352F6] font-bold px-3 py-1 rounded text-sm uppercase tracking-wider">Portafolio 2026</span>
            <h2 className="text-3xl font-bold text-[#0F0F0F] mt-4">Invierta en el Futuro Hoy</h2>
            <p className="text-[#6D6C6C] max-w-2xl mx-auto mt-2">Proyectos activos que utilizan estas tecnologías ahora mismo.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group relative overflow-hidden rounded-2xl border border-[#E5E5E5] shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-[#5352F6]" />
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs font-bold text-[#6D6C6C] uppercase tracking-wide">Guatapé, Antioquia</p>
                    <h3 className="text-2xl font-bold text-[#0F0F0F] mt-1">Nido de Agua</h3>
                  </div>
                  <span className="bg-[#22C55E]/10 text-[#22C55E] text-xs font-bold px-2 py-1 rounded">En Fondeo</span>
                </div>
                <p className="text-[#6D6C6C] mb-8 leading-relaxed">
                  Eco-habitat turístico de alta rentabilidad. Invierta en la joya turística de Colombia con modelo de operación hotelera automatizada.
                </p>
                <a href="https://lokl.life/nido-de-agua" target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-white border-2 border-[#5352F6] text-[#5352F6] hover:bg-[#5352F6] hover:text-white font-bold py-3 rounded-xl transition-all">
                  Ver Proyecto en Guatapé <ArrowRight className="inline-block w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl border border-[#E5E5E5] shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#5352F6] to-purple-500" />
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs font-bold text-[#6D6C6C] uppercase tracking-wide">Medellín, El Poblado</p>
                    <h3 className="text-2xl font-bold text-[#0F0F0F] mt-1">Indie Universe</h3>
                  </div>
                  <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded">Últimos Cupos</span>
                </div>
                <p className="text-[#6D6C6C] mb-8 leading-relaxed">
                  Coliving tecnológico para nómadas digitales. Rentabilidad en dólares y gestión 100% digital a través de la App LOKL.
                </p>
                <a href="https://lokl.life/indie-universe" target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-[#5352F6] text-white hover:bg-[#4241C5] font-bold py-3 rounded-xl shadow-lg hover:shadow-[#5352F6]/30 transition-all">
                  Ver Oportunidades en Medellín <ArrowRight className="inline-block w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-16 pb-8 border-t border-[#E5E5E5]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-[#0F0F0F] mb-6">El Futuro es Ahora</h2>
          <p className="text-[#6D6C6C] max-w-2xl mx-auto mb-10">
            La democratización inmobiliaria no es una tendencia pasajera; es la nueva norma. Con $50.000 pesos y un smartphone, usted es parte del mercado.
          </p>
          <a
            href="https://drive.google.com/file/d/1htu4jdOuMN3MHWVukGKnV_scrD1EIgfO/view"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#5352F6] text-white hover:bg-[#4241C5] rounded-lg px-8 py-3 font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <FileText size={18} />
            Descargar Informe Completo (PDF)
          </a>
        </div>
      </footer>
    </>
  );
};

export default ProptechColombia2026Page;
