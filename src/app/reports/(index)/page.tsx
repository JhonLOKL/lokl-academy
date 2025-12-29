import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';

const ReportsPage = () => {
  const reports = [
    {
      title: "Horizonte Estratégico 2026: El Año de la Sincronización",
      description: "Tras la estabilización de tasas, el capital global regresa a Colombia. Análisis completo del mercado inmobiliario colombiano y los activos refugio de la década.",
      slug: "horizonte-estrategico-2026",
      date: "Diciembre 2025",
      category: "Informe Estratégico"
    },
    {
      title: "Guía de Inversión LOKL: Inmuebles Fraccionados",
      description: "Tu mapa estratégico para construir patrimonio inmobiliario con LOKL, desde la primera fracción hasta la libertad financiera.",
      slug: "guia-inversion-fraccionada",
      date: "Enero 2025",
      category: "Guía Educativa"
    },
    {
      title: "La Vivienda como Activo vs. Pasivo",
      description: "Análisis financiero comparativo entre el modelo tradicional de vivienda propia y la inversión fraccionada en LOKL. Desglose de costos ocultos y proyecciones de riqueza.",
      slug: "vivienda-activo-pasivo",
      date: "Enero 2025",
      category: "Análisis Estructural"
    },
    {
      title: "Análisis Estratégico Oriente Antioqueño 2025",
      description: "Análisis basado en datos del mercado inmobiliario del Oriente Antioqueño. ¿Burbuja o crecimiento orgánico? Evaluación de micro-mercados, vectores de infraestructura y matriz de riesgos para inversores.",
      slug: "oriente-antioqueno-2025",
      date: "Diciembre 2025",
      category: "Análisis de Mercado Regional"
    },
    {
      title: "Choque Regulatorio: La Transformación del Turismo Andino",
      description: "Un análisis basado en datos sobre el Decreto del 18 de Diciembre, el riesgo de 'apagón digital' y las lecciones aprendidas de Nueva York y Barcelona.",
      slug: "impacto-regulatorio",
      date: "Diciembre 2025",
      category: "Investigación & Análisis de Políticas"
    },
    {
      title: "Del Lujo Opulente al Lujo Consciente",
      description: "Un análisis profundo sobre cómo la exclusividad y el exceso han dado paso a la ética, la regeneración y el propósito.",
      slug: "lujo-consciente",
      date: "Diciembre 2025",
      category: "Inteligencia de Mercado"
    }
    // Future reports will be added here
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#444444] font-sans selection:bg-[#5352F6] selection:text-white pb-20">
      <header className="relative pt-24 pb-20 px-6 text-center overflow-hidden bg-white border-b border-[#E5E5E5]">
        {/* Abstract Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#5352F6] rounded-full opacity-[0.03] blur-[100px] pointer-events-none"></div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F0F0F] tracking-tight mb-6">
          LOKL <span className="text-[#5352F6]">Reports</span>
        </h1>
        <p className="text-lg text-[#6D6C6C] max-w-2xl mx-auto leading-relaxed">
          Investigaciones y análisis sobre tendencias de mercado, sostenibilidad y el futuro del real estate.
        </p>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reports.map((report) => (
            <Link href={`/reports/${report.slug}`} key={report.slug} className="group block h-full">
              <div className="bg-white border border-[#E5E5E5] rounded-2xl p-8 h-full hover:border-[#5352F6] hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#5352F6] bg-[#EEEEFF] px-3 py-1 rounded-full uppercase tracking-wider">
                    {report.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#0F0F0F] mb-3 group-hover:text-[#5352F6] transition-colors">
                  {report.title}
                </h3>

                <p className="text-[#6D6C6C] text-sm leading-relaxed mb-6 flex-grow">
                  {report.description}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-[#F3F4F6] mt-auto">
                  <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                    <Calendar size={14} />
                    <span>{report.date}</span>
                  </div>
                  <span className="text-[#5352F6] font-bold text-sm flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                    Leer Reporte <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;

