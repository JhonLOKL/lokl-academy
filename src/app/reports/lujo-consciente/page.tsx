"use client";

import React from 'react';
import {
  Diamond,
  Leaf,
  TrendingUp,
  Users,
  Globe,
  AlertTriangle,
  Check,
  ArrowDown,
  Lock,
  RefreshCw,
  Building2,
  Waves,
  Download,
  FileText,
  ExternalLink
} from 'lucide-react';

// Importar los nuevos componentes de gráficas
import RadarChart from '@/components/reports/RadarChart';
import { ReportJsonLd } from '@/components/reports/ReportJsonLd';

// --- LOKL DESIGN TOKENS ---
// Primary: #5352F6
// Dark: #0F0F0F
// Gray: #444444
// Light: #FAFAFA
// Surface: #FFFFFF

const LujoConscientePage = () => {
  return (
    <>
      <ReportJsonLd
        title="Del Lujo Opulente al Lujo Consciente"
        description="Análisis sobre cómo la ética, la regeneración y el propósito están redefiniendo el mercado inmobiliario de lujo."
        url="https://academy.lokl.life/reports/lujo-consciente"
        datePublished="2025-12-10"
        image="https://academy.lokl.life/images/reports/lujo-og.jpg"
      />

      {/* --- HERO SECTION --- */}
      <header className="relative pt-24 pb-20 px-6 text-center overflow-hidden bg-white border-b border-[#E5E5E5]">
        {/* Abstract Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#5352F6] rounded-full opacity-[0.03] blur-[100px] pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAFAFA] border border-[#E5E5E5] mb-8">
          <span className="w-2 h-2 rounded-full bg-[#5352F6]"></span>
          <span className="text-xs font-bold text-[#0F0F0F] uppercase tracking-wider">Reporte de Inteligencia de Mercado</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#0F0F0F] tracking-tight mb-6 leading-tight max-w-5xl mx-auto">
          Del Lujo <span className="text-[#6D6C6C] line-through decoration-2 decoration-[#EF4444]">Opulente</span> al <br />
          Lujo <span className="text-[#5352F6]">Consciente</span>
        </h1>

        <p className="text-lg text-[#6D6C6C] max-w-2xl mx-auto leading-relaxed">
          Un análisis profundo sobre cómo la exclusividad y el exceso han dado paso a la ética, la regeneración y el propósito como los nuevos indicadores de estatus global.
        </p>

        <div className="mt-12 flex justify-center animate-bounce">
          <ArrowDown className="text-[#5352F6]" />
        </div>
      </header>

      {/* --- PARTE 1: EL PARALELO (COMPARATIVA DETALLADA) --- */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#0F0F0F]">1. El Paralelo: Análisis Comparativo</h2>
          <p className="text-[#6D6C6C] mt-2 max-w-2xl mx-auto">
            La dicotomía entre el viejo y el nuevo mundo no es sutil. Hemos pasado de valorar la escasez artificial a valorar la transparencia radical.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Card: Tradicional */}
          <div className="bg-white rounded-2xl p-8 border border-[#E5E5E5] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F3F4F6] rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[#F3F4F6] rounded-xl text-[#6D6C6C]">
                  <Lock size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F0F0F]">Lujo Opulente (Tradicional)</h3>
                  <p className="text-xs font-bold text-[#6D6C6C] uppercase tracking-wider">El Viejo Paradigma</p>
                </div>
              </div>

              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="min-w-[4px] bg-[#E5E5E5] rounded-full"></div>
                  <div>
                    <h4 className="font-bold text-[#0F0F0F] text-sm">Valores Centrales</h4>
                    <p className="text-sm text-[#6D6C6C] mt-1">
                      Basado en la <strong>exclusión</strong>. El valor del producto aumenta cuanto más difícil es de obtener para otros. Elitismo y distancia social.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="min-w-[4px] bg-[#E5E5E5] rounded-full"></div>
                  <div>
                    <h4 className="font-bold text-[#0F0F0F] text-sm">Materiales y Procesos</h4>
                    <p className="text-sm text-[#6D6C6C] mt-1">
                      Uso de materiales exóticos (pieles raras), minería extractiva y procesos industriales opacos. El desperdicio es irrelevante si el resultado es "perfecto".
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="min-w-[4px] bg-[#E5E5E5] rounded-full"></div>
                  <div>
                    <h4 className="font-bold text-[#0F0F0F] text-sm">Percepción del Consumidor</h4>
                    <p className="text-sm text-[#6D6C6C] mt-1">
                      <strong>Ostentación.</strong> El objeto sirve como un trofeo visual para demostrar poder adquisitivo. Logomanía.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Card: Consciente */}
          <div className="bg-[#5352F6] rounded-2xl p-8 border border-[#5352F6] text-white relative overflow-hidden shadow-xl transform lg:scale-105 transition-transform">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -mr-8 -mt-8"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/20 rounded-xl text-white">
                  <Globe size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Lujo Consciente (Nuevo)</h3>
                  <p className="text-xs font-bold text-[#A1A0FB] uppercase tracking-wider">El Nuevo Estándar</p>
                </div>
              </div>

              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="min-w-[4px] bg-[#A1A0FB] rounded-full"></div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Valores Centrales</h4>
                    <p className="text-sm text-[#E0E0FC] mt-1">
                      Basado en la <strong>ética y propósito</strong>. El valor radica en la historia humana detrás del objeto y su impacto positivo en la comunidad.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="min-w-[4px] bg-[#A1A0FB] rounded-full"></div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Materiales y Procesos</h4>
                    <p className="text-sm text-[#E0E0FC] mt-1">
                      Innovación en biomateriales (cuero de hongos, textiles reciclados), artesanía local y economía circular. Regeneración en lugar de extracción.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="min-w-[4px] bg-[#A1A0FB] rounded-full"></div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Percepción del Consumidor</h4>
                    <p className="text-sm text-[#E0E0FC] mt-1">
                      <strong>Identidad.</strong> Comprar es un voto político. El consumidor busca alinearse con marcas que reflejen sus propios valores morales.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- PARTE 2: DATOS Y EVIDENCIA VISUAL --- */}
      <section className="bg-white border-y border-[#E5E5E5] py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F0F0F]">Evidencia Cuantitativa</h2>
            <p className="text-[#6D6C6C] mt-2">Los números detrás del cambio cultural.</p>
          </div>

          {/* Gráfico Radar centrado */}
          <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl p-8 h-[500px] relative flex items-center justify-center mb-12 shadow-sm">
            <div className="w-full h-full relative">
              <h4 className="absolute top-0 left-0 text-xs font-bold text-[#6D6C6C] uppercase tracking-wider mb-4">Radar de Prioridades</h4>
              <RadarChart />
            </div>
          </div>

          {/* Estadísticas debajo del gráfico */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#0F0F0F] text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={20} className="text-[#22C55E]" />
                <span className="text-xs font-bold uppercase text-[#A3A3A3] tracking-widest">Crecimiento 2024</span>
              </div>
              <div className="text-5xl font-extrabold mb-3">+180%</div>
              <p className="text-sm text-[#D4D4D4] leading-relaxed">
                Aumento en búsquedas de "Moda Ética" y "Lujo Sostenible" en comparación con marcas tradicionales.
              </p>
            </div>

            <div className="bg-white border border-[#E5E5E5] p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <Users size={20} className="text-[#5352F6]" />
                <span className="text-xs font-bold uppercase text-[#6D6C6C] tracking-widest">Gen Z & Millennials</span>
              </div>
              <div className="text-5xl font-extrabold text-[#0F0F0F] mb-3">73%</div>
              <p className="text-sm text-[#6D6C6C] leading-relaxed">
                Están dispuestos a pagar un precio premium por productos que garantizan transparencia total.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PARTE 3: LA TRANSFORMACIÓN (CHAIN OF THOUGHT) --- */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-20">
          <span className="bg-[#EEEEFF] text-[#5352F6] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">Metodología Chain of Thought</span>
          <h2 className="text-3xl font-bold text-[#0F0F0F] mt-6">¿Cómo ocurrió el cambio?</h2>
          <p className="text-[#6D6C6C] mt-2">
            Transformamos algo percibido como negativo (desigualdad) en un motor positivo.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Guide Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#E5E5E5] via-[#5352F6] to-[#E5E5E5]"></div>

          {/* STEP 1 */}
          <div className="relative z-10 mb-20 group">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 text-left md:text-right pl-20 md:pl-0">
                <h3 className="text-xl font-bold text-[#0F0F0F] group-hover:text-[#EF4444] transition-colors">1. El Punto de Quiebre</h3>
                <h4 className="text-sm font-bold text-[#6D6C6C] uppercase mb-2">"Luxury Shame"</h4>
                <p className="text-[#6D6C6C] text-sm leading-relaxed">
                  La crisis climática convirtió la ostentación en algo de mal gusto. Sentirse culpable por poseer algo que daña al planeta se volvió la norma.
                </p>
              </div>
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 bg-white border-2 border-[#E5E5E5] rounded-full flex items-center justify-center shadow-md group-hover:border-[#EF4444] transition-all">
                <AlertTriangle size={20} className="text-[#6D6C6C] group-hover:text-[#EF4444]" />
              </div>
              <div className="md:w-1/2 hidden md:block"></div>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="relative z-10 mb-20 group">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 hidden md:block"></div>
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 bg-white border-2 border-[#E5E5E5] rounded-full flex items-center justify-center shadow-md group-hover:border-[#5352F6] transition-all">
                <RefreshCw size={20} className="text-[#6D6C6C] group-hover:text-[#5352F6]" />
              </div>
              <div className="md:w-1/2 md:pl-12 pl-20 text-left">
                <h3 className="text-xl font-bold text-[#0F0F0F] group-hover:text-[#5352F6] transition-colors">2. La Redefinición</h3>
                <h4 className="text-sm font-bold text-[#6D6C6C] uppercase mb-2">Trazabilidad Total</h4>
                <p className="text-[#6D6C6C] text-sm leading-relaxed">
                  Las marcas cambiaron los códigos. "Caro" se convirtió en "Trazable". La historia del artesano y el impacto en la comunidad se volvieron el nuevo valor añadido.
                </p>
              </div>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="relative z-10 group">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 text-left md:text-right pl-20 md:pl-0">
                <h3 className="text-xl font-bold text-[#0F0F0F] group-hover:text-[#22C55E] transition-colors">3. El Resultado</h3>
                <h4 className="text-sm font-bold text-[#6D6C6C] uppercase mb-2">Regeneración</h4>
                <p className="text-[#6D6C6C] text-sm leading-relaxed">
                  El lujo ahora financia la innovación sostenible. Los altos márgenes permiten I+D en biomateriales que eventualmente benefician a todos.
                </p>
              </div>
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 bg-[#5352F6] border-4 border-[#E0E0FC] rounded-full flex items-center justify-center shadow-lg transition-all">
                <Check size={20} className="text-white" />
              </div>
              <div className="md:w-1/2 hidden md:block"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN: OPORTUNIDADES DE INVERSIÓN (CTAs) --- */}
      <section className="bg-white border-t border-[#E5E5E5] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F0F0F]">Pasa de la Teoría a la Acción</h2>
            <p className="text-[#6D6C6C] mt-2">Invierte en proyectos que encarnan los principios del lujo consciente y regenerativo.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* CTA CARD 1: Guatapé */}
            <a
              href="https://lokl.life/nido-de-agua"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl p-8 hover:border-[#5352F6] hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-[#EEEEFF] rounded-full flex items-center justify-center text-[#5352F6] mb-6 group-hover:scale-110 transition-transform">
                <Waves size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#0F0F0F] mb-2">Proyectos en Guatapé</h3>
              <p className="text-sm text-[#6D6C6C] mb-6">
                Descubre "Nido de Agua". Inversión en turismo regenerativo rodeado de naturaleza.
              </p>
              <span className="text-[#5352F6] font-bold text-sm flex items-center gap-2">
                Ver Oportunidad <ArrowDown className="rotate-[-90deg]" size={16} />
              </span>
            </a>

            {/* CTA CARD 2: Medellín */}
            <a
              href="https://lokl.life/indie-universe"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl p-8 hover:border-[#5352F6] hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-[#EEEEFF] rounded-full flex items-center justify-center text-[#5352F6] mb-6 group-hover:scale-110 transition-transform">
                <Building2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#0F0F0F] mb-2">Oportunidades en Medellín</h3>
              <p className="text-sm text-[#6D6C6C] mb-6">
                Explora "Indie Universe". Co-living urbano diseñado para la nueva generación creativa.
              </p>
              <span className="text-[#5352F6] font-bold text-sm flex items-center gap-2">
                Ver Oportunidad <ArrowDown className="rotate-[-90deg]" size={16} />
              </span>
            </a>

          </div>
        </div>
      </section>

      {/* --- FOOTER: RECURSOS --- */}
      <footer className="bg-[#0F0F0F] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">Recursos y Normatividad</h2>

          <div className="flex flex-col sm:flex-row justify-center gap-4">

            {/* Button: Descargar PDF */}
            <a
              href="https://drive.google.com/file/d/1b6zVbKIeUJaZa0dCxDLKAWHosSZD8kmp/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#5352F6] hover:bg-[#4241C5] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-[#5352F6]/30"
            >
              <Download size={18} />
              Descargar Informe PDF
            </a>
          </div>

          <div className="text-center mt-12 text-sm text-[#666]">
            <p>© 2025 LOKL Research Institute. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

    </>
  );
};

export default LujoConscientePage;
