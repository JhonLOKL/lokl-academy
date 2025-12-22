"use client";

import React from 'react';
import Link from 'next/link';
import {
  Download,
  ExternalLink,
  AlertTriangle,
  Info,
  TrendingDown,
  DollarSign,
  Calendar,
  Building2,
  Waves,
  ArrowRight
} from 'lucide-react';

import SupplyShockChart from '@/components/reports/impacto-regulatorio/SupplyShockChart';
import RegionalBubbleChart from '@/components/reports/impacto-regulatorio/RegionalBubbleChart';
import EconomicFalloutChart from '@/components/reports/impacto-regulatorio/EconomicFalloutChart';
import { MarketingFooter } from '@/components/footer/marketing-footer';
import { ReportJsonLd } from '@/components/reports/ReportJsonLd';

const ImpactoRegulatorioPage = () => {
  return (
    <>
      <ReportJsonLd
        title="Choque Regulatorio: La Transformación del Turismo Andino"
        description="Análisis sobre el impacto del Decreto del 18 de Diciembre en el turismo y las rentas cortas en Colombia."
        url="https://academy.lokl.life/reports/impacto-regulatorio"
        datePublished="2025-12-18"
        image="https://academy.lokl.life/images/reports/regulatorio-og.jpg"
      />

      {/* Hero Section */}
      <header className="bg-[#FAFAFA] pt-24 pb-16 px-6 border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5352F6]/10 text-[#5352F6] text-xs font-bold uppercase tracking-wider mb-6">
            Investigación & Análisis de Políticas
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#0F0F0F] mb-6 leading-tight">
            Choque Regulatorio: <br />
            <span className="text-[#5352F6]">La Transformación del Turismo Andino</span>
          </h1>
          <p className="text-xl text-[#444444] max-w-2xl leading-relaxed mb-8">
            Un análisis basado en datos sobre el Decreto del 18 de Diciembre, el riesgo de "apagón digital" y las lecciones aprendidas de Nueva York y Barcelona.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="https://drive.google.com/file/d/1P6QOD27GMIdE1nJL9-L5hjgiYu7XQqUV/view"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#5352F6] text-white font-medium px-6 py-3 rounded-lg hover:bg-[#4241C5] transition-colors"
            >
              <Download size={18} /> Descargar Reporte PDF
            </a>
            <a
              href="https://www.mincit.gov.co/normatividad/proyectos-de-normatividad/proyectos-de-decreto-2025/02-12-2025-pd-registro-nacional-de-turismo-rnt.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#0F0F0F] border border-[#E5E5E5] font-medium px-6 py-3 rounded-lg hover:border-[#5352F6] hover:text-[#5352F6] transition-all"
            >
              <ExternalLink size={18} /> Ver Gaceta Oficial (MinCIT)
            </a>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white border border-[#E5E5E5] rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between h-full border-t-4 border-t-[#5352F6]">
              <div>
                <p className="text-[#6D6C6C] text-xs font-bold uppercase tracking-wider mb-2">Fecha Crítica</p>
                <h3 className="text-3xl font-bold text-[#0F0F0F]">18 Dic 2025</h3>
              </div>
              <p className="text-sm text-[#444444] mt-4 pt-4 border-t border-[#F5F5F5]">
                Inicio de verificación obligatoria API y RNT.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-[#E5E5E5] rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between h-full border-t-4 border-t-[#EF4444]">
              <div>
                <p className="text-[#6D6C6C] text-xs font-bold uppercase tracking-wider mb-2">Impacto en Oferta</p>
                <h3 className="text-3xl font-bold text-[#0F0F0F]">-45%</h3>
              </div>
              <p className="text-sm text-[#444444] mt-4 pt-4 border-t border-[#F5F5F5]">
                Caída proyectada de listados activos en Q1 2026.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-[#E5E5E5] rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between h-full border-t-4 border-t-[#F59E0B]">
              <div>
                <p className="text-[#6D6C6C] text-xs font-bold uppercase tracking-wider mb-2">Riesgo Económico</p>
                <h3 className="text-3xl font-bold text-[#0F0F0F]">$2.1 Billones</h3>
              </div>
              <p className="text-sm text-[#444444] mt-4 pt-4 border-t border-[#F5F5F5]">
                COP en pérdidas anuales estimadas (PIB Turístico).
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-24">

        {/* Section 1: The Process Shift */}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#0F0F0F]">El Cambio de Paradigma</h2>
              <p className="text-[#6D6C6C] mt-2">De la confianza declarativa a la vigilancia algorítmica.</p>
            </div>
          </div>
          <div className="relative py-10">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-[#E5E5E5] -z-10 transform -translate-y-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border border-[#E5E5E5] rounded-xl p-8 text-center relative z-10 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-[#F5F5F5] text-[#6D6C6C] font-bold flex items-center justify-center mx-auto mb-4 border border-[#E5E5E5]">1</div>
                <h3 className="font-bold text-[#0F0F0F] mb-2">Registro Declarativo</h3>
                <p className="text-sm text-[#6D6C6C] leading-relaxed">Modelo anterior (Ley 2068). Basado en la "buena fe". Auditorías post-registro.</p>
              </div>
              <div className="bg-white border border-[#5352F6] ring-1 ring-[#5352F6]/20 rounded-xl p-8 text-center relative z-10 shadow-md">
                <div className="w-10 h-10 rounded-full bg-[#5352F6] text-white font-bold flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#5352F6]/30">2</div>
                <h3 className="font-bold text-[#0F0F0F] mb-2">Decreto 18 Dic</h3>
                <p className="text-sm text-[#444444] leading-relaxed"><strong>Punto de Inflexión.</strong> Las plataformas asumen rol fiscalizador. Interoperabilidad API obligatoria.</p>
              </div>
              <div className="bg-white border border-[#E5E5E5] rounded-xl p-8 text-center relative z-10 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-[#F59E0B] text-white font-bold flex items-center justify-center mx-auto mb-4">3</div>
                <h3 className="font-bold text-[#0F0F0F] mb-2">Pre-Verificación</h3>
                <p className="text-sm text-[#6D6C6C] leading-relaxed">Bloqueo automático si el RNT no cruza con base de datos oficial. Riesgo de falsos positivos.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Supply Shock Chart */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4">
            <h2 className="text-2xl font-bold text-[#0F0F0F] mb-4">Proyección de Oferta: El "Apagón Digital"</h2>
            <p className="text-[#444444] mb-6 leading-relaxed">Basado en la incapacidad técnica de las bases de datos gubernamentales para manejar consultas en tiempo real, se proyecta una caída drástica en los listados activos.</p>
            <div className="space-y-4">
              <div className="bg-white border border-[#E5E5E5] rounded-xl p-4 flex items-center gap-4 shadow-sm">
                <div className="w-2 h-12 bg-[#E5E5E5] rounded-full"></div>
                <div>
                  <p className="text-xs text-[#919090] uppercase font-bold">Escenario Base</p>
                  <p className="font-medium text-[#0F0F0F]">Crecimiento Orgánico (Inercial)</p>
                </div>
              </div>
              <div className="bg-[#FFF5F5] border border-[#EF4444]/30 rounded-xl p-4 flex items-center gap-4 shadow-sm">
                <div className="w-2 h-12 bg-[#EF4444] rounded-full"></div>
                <div>
                  <p className="text-xs text-[#EF4444] uppercase font-bold">Escenario Riesgo</p>
                  <p className="font-medium text-[#0F0F0F]">Colapso Regulatorio (-45%)</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-[#0F0F0F]">Listados Activos (Índice Base 100)</h3>
                <div className="flex gap-2">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#E5E5E5]"></span> <span className="text-xs text-[#6D6C6C]">Inercial</span></span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#5352F6]"></span> <span className="text-xs text-[#6D6C6C]">Real</span></span>
                </div>
              </div>
              <SupplyShockChart />
            </div>
          </div>
        </section>

        {/* Section 3: Regional Analysis (Bubble Chart) */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl font-bold text-[#0F0F0F]">Impacto Asimétrico Regional</h2>
            <p className="text-[#6D6C6C] mt-2">Medellín y Cartagena presentan la mayor vulnerabilidad debido a su alta dependencia del turismo dolarizado y la informalidad en propiedad horizontal.</p>
          </div>
          <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-sm">
            <RegionalBubbleChart />
            <div className="mt-4 flex flex-wrap justify-center gap-6 text-xs text-[#6D6C6C]">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#5352F6]"></div> Alta Dependencia</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#EF4444]"></div> Riesgo Crítico</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div> Riesgo Medio</div>
            </div>
          </div>
        </section>

        {/* Section 4: Benchmarks (Studies) */}
        <section className="bg-[#F5F5F5] -mx-6 px-6 py-16 rounded-3xl mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10">
              <div>
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F59E0B]/10 text-[#F59E0B] mb-2">
                  Estudios Comparativos
                </div>
                <h2 className="text-2xl font-bold text-[#0F0F0F]">Lecciones Globales: ¿Funciona la Prohibición?</h2>
                <p className="text-[#6D6C6C] mt-2 max-w-2xl">Evidencia empírica de Nueva York (Ley Local 18) y Barcelona muestra que restringir STRs no garantiza la baja en precios de alquiler.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Case Study 1: NYC */}
              <div className="bg-white border border-[#E5E5E5] rounded-xl p-8 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-bold text-lg text-[#0F0F0F]">Nueva York (Ley Local 18)</h3>
                    <p className="text-sm text-[#6D6C6C]">Implementada: Sep 2023</p>
                  </div>
                  <span className="text-xs font-bold bg-[#EF4444]/10 text-[#EF4444] px-2 py-1 rounded">-90% Listados</span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm border-b border-[#F5F5F5] pb-2">
                    <span className="text-[#444444]">Impacto en Renta (Largo Plazo)</span>
                    <span className="font-bold text-[#0F0F0F]">+2.1% (Aumento)</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-[#F5F5F5] pb-2">
                    <span className="text-[#444444]">Tarifas Hoteleras</span>
                    <span className="font-bold text-[#0F0F0F]">+6% (Inflación)</span>
                  </div>
                  <div className="mt-4 bg-[#F5F5F5] p-3 rounded text-xs text-[#6D6C6C] leading-relaxed">
                    <strong>Conclusión:</strong> La eliminación de Airbnb transfirió demanda a hoteles y mercado negro, sin resolver la crisis de vivienda.
                  </div>
                </div>
              </div>
              {/* Case Study 2: Barcelona */}
              <div className="bg-white border border-[#E5E5E5] rounded-xl p-8 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-bold text-lg text-[#0F0F0F]">Barcelona (Prohibición Total)</h3>
                    <p className="text-sm text-[#6D6C6C]">Meta: Noviembre 2028</p>
                  </div>
                  <span className="text-xs font-bold bg-[#F59E0B]/10 text-[#F59E0B] px-2 py-1 rounded">Eliminación Total</span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm border-b border-[#F5F5F5] pb-2">
                    <span className="text-[#444444]">Riesgo PIB Local</span>
                    <span className="font-bold text-[#0F0F0F]">€1.9 Billones</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-[#F5F5F5] pb-2">
                    <span className="text-[#444444]">Empleos en Riesgo</span>
                    <span className="font-bold text-[#0F0F0F]">40,000</span>
                  </div>
                  <div className="mt-4 bg-[#F5F5F5] p-3 rounded text-xs text-[#6D6C6C] leading-relaxed">
                    <strong>Conclusión:</strong> A pesar de moratorias desde 2014, los alquileres subieron 72%. La prohibición enfrenta litigios masivos.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Economic Fallout (Donut) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-sm">
            <EconomicFalloutChart />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#0F0F0F] mb-4">La Ecuación Económica</h2>
            <p className="text-[#444444] mb-6 leading-relaxed">El "Efecto Derrame" es vital. Por cada <span className="font-bold text-[#5352F6]">$100</span> gastados en alojamiento, se generan <span className="font-bold text-[#5352F6]">$250</span> en la economía local. El decreto pone en riesgo principalmente a sectores conexos.</p>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#5352F6]/10 flex items-center justify-center text-[#5352F6] font-bold">35%</div>
                <div>
                  <p className="text-sm font-bold text-[#0F0F0F]">Alojamiento</p>
                  <p className="text-xs text-[#6D6C6C]">Ingreso directo anfitrión</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#22C55E]/10 flex items-center justify-center text-[#22C55E] font-bold">40%</div>
                <div>
                  <p className="text-sm font-bold text-[#0F0F0F]">Gastos Locales</p>
                  <p className="text-xs text-[#6D6C6C]">Restaurantes, comercio, ocio</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B] font-bold">25%</div>
                <div>
                  <p className="text-sm font-bold text-[#0F0F0F]">Transporte e Impuestos</p>
                  <p className="text-xs text-[#6D6C6C]">Movilidad y recaudo fiscal</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NEW: LOKL Promotional Section */}
        <section className="border-t border-[#E5E5E5] pt-16">
          <div className="text-center mb-12">
            <span className="inline-block py-1 px-3 rounded-full bg-[#5352F6]/10 text-[#5352F6] text-xs font-bold uppercase tracking-wide mb-4">LOKL Inversiones</span>
            <h2 className="text-3xl font-bold text-[#0F0F0F]">Invierte en el Futuro del Turismo</h2>
            <p className="text-[#6D6C6C] mt-4 max-w-2xl mx-auto">
              A pesar de la volatilidad regulatoria, los activos de alta calidad y cumplimiento garantizado siguen siendo refugios seguros. Conoce nuestros proyectos activos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
        </section>

      </main>

    </>
  );
};

export default ImpactoRegulatorioPage;
