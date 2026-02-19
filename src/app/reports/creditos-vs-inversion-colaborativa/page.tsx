"use client";

import React, { useState } from 'react';
import {
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
  Landmark,
  Users,
  Info,
  ArrowRight,
  PieChart,
  FileText,
  Unlock
} from 'lucide-react';
import { ReportJsonLd } from '@/components/reports/ReportJsonLd';

// --- LOKL Design Tokens & Atoms ---

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-xl border border-[#E5E5E5] shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, type = "neutral", className = "" }: { children: React.ReactNode; type?: "neutral" | "primary" | "success" | "warning" | "error"; className?: string }) => {
  const styles: Record<string, string> = {
    neutral: "bg-[#F5F5F5] text-[#6D6C6C]",
    primary: "bg-[#5352F6]/10 text-[#5352F6]",
    success: "bg-[#22C55E]/10 text-[#22C55E]",
    warning: "bg-[#F59E0B]/10 text-[#F59E0B]",
    error: "bg-[#EF4444]/10 text-[#EF4444]",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${styles[type]} ${className}`}>
      {children}
    </span>
  );
};

// --- Infographic Components ---

const ProgressBar = ({ label, value, max, color, subLabel }: { label: string; value: number; max: number; color: string; subLabel?: string }) => (
  <div className="w-full mb-6">
    <div className="flex justify-between items-end mb-2">
      <span className="font-bold text-[#0F0F0F] text-sm">{label}</span>
      <span className="font-bold text-lg" style={{ color }}>{value}%</span>
    </div>
    <div className="h-4 w-full bg-[#F5F5F5] rounded-full overflow-hidden relative">
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out relative"
        style={{ width: `${(value / max) * 100}%`, backgroundColor: color }}
      >
        <div className="absolute right-0 top-0 h-full w-2 bg-white/20" />
      </div>
    </div>
    {subLabel && <p className="text-xs text-[#6D6C6C] mt-1 text-right">{subLabel}</p>}
  </div>
);

const StatBox = ({ title, value, subtitle, icon: Icon, type = "primary" }: { title: string; value: string; subtitle: string; icon: React.ElementType; type?: "primary" | "error" | "success" | "warning" }) => {
  const colorMap = {
    primary: "text-[#5352F6] bg-[#5352F6]/5",
    error: "text-[#EF4444] bg-[#EF4444]/5",
    success: "text-[#22C55E] bg-[#22C55E]/5",
    warning: "text-[#F59E0B] bg-[#F59E0B]/5",
  };

  return (
    <div className={`p-6 rounded-xl border border-[#E5E5E5] flex flex-col items-center text-center ${colorMap[type]}`}>
      <Icon size={32} className="mb-3 opacity-80" />
      <h4 className="text-3xl font-bold mb-1 tracking-tight">{value}</h4>
      <p className="font-bold text-sm uppercase tracking-wide opacity-80">{title}</p>
      <p className="text-xs mt-2 opacity-60 max-w-[150px]">{subtitle}</p>
    </div>
  );
};

const TruthTableRow = ({ label, bankText, fintechText, winner }: { label: string; bankText: string; fintechText: string; winner: 'bank' | 'fintech' }) => (
  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-5 border-b border-[#E5E5E5] last:border-0 hover:bg-[#FAFAFA]/50 transition-colors group items-stretch">
    {/* Label: espacio suficiente y texto que hace wrap para que no se corte */}
    <div className="md:col-span-3 flex items-center pr-2 min-w-0">
      <h4 className="font-bold text-[#0F0F0F] group-hover:text-[#5352F6] transition-colors text-sm md:text-base break-words overflow-visible">{label}</h4>
    </div>
    {/* Banca Tradicional */}
    <div className={`md:col-span-4 h-full min-h-[100px] flex flex-col p-4 rounded-xl bg-white border overflow-visible ${winner === 'bank' ? 'ring-2 ring-[#5352F6] border-[#5352F6]/30 shadow-sm' : 'border-[#E5E5E5]'}`}>
      <div className="flex gap-3 flex-1 min-h-0 overflow-visible">
        <Landmark className="text-[#6D6C6C] shrink-0 mt-0.5" size={18} />
        <div className="min-w-0 flex-1 overflow-visible">
          <p className="text-xs font-bold text-[#6D6C6C] uppercase mb-1.5">Banca Tradicional</p>
          <p className="text-sm text-[#0F0F0F] leading-relaxed break-words">{bankText}</p>
        </div>
      </div>
      {winner === 'bank' && (
        <div className="mt-3 pt-3 border-t border-[#E5E5E5] flex items-center gap-1.5 text-[#5352F6] flex-wrap">
          <ShieldCheck size={14} className="shrink-0" />
          <span className="text-xs font-semibold">Ventaja en este criterio</span>
        </div>
      )}
    </div>
    {/* VS */}
    <div className="md:col-span-1 flex items-center justify-center shrink-0">
      <span className="text-[10px] font-black text-[#9CA3AF] bg-[#F5F5F5] px-2.5 py-1.5 rounded-full border border-[#E5E5E5]">VS</span>
    </div>
    {/* Inversión Colaborativa */}
    <div className={`md:col-span-4 h-full min-h-[100px] flex flex-col p-4 rounded-xl bg-white border overflow-visible ${winner === 'fintech' ? 'ring-2 ring-[#5352F6] border-[#5352F6]/30 shadow-sm' : 'border-[#E5E5E5]'}`}>
      <div className="flex gap-3 flex-1 min-h-0 overflow-visible">
        <Users className="text-[#5352F6] shrink-0 mt-0.5" size={18} />
        <div className="min-w-0 flex-1 overflow-visible">
          <p className="text-xs font-bold text-[#5352F6] uppercase mb-1.5">Inversión Colaborativa</p>
          <p className="text-sm text-[#0F0F0F] leading-relaxed break-words">{fintechText}</p>
        </div>
      </div>
      {winner === 'fintech' && (
        <div className="mt-3 pt-3 border-t border-[#E5E5E5] flex items-center gap-1.5 text-[#5352F6] flex-wrap">
          <ShieldCheck size={14} className="shrink-0" />
          <span className="text-xs font-semibold">Ventaja en este criterio</span>
        </div>
      )}
    </div>
  </div>
);

const CreditosVsInversionPage = () => {
  const [userProfile, setUserProfile] = useState<'pyme' | 'natural'>('pyme');

  return (
    <>
      <ReportJsonLd
        title="Créditos Vs. Inversión Colaborativa: La Tabla de Verdad"
        description="Análisis de la brecha entre lo que pagan los bancos y lo que cobran, y cómo la Fintech elimina intermediarios para beneficiar a ambas puntas."
        url="https://academy.lokl.life/reports/creditos-vs-inversion-colaborativa"
        datePublished="2026-02-13"
        image="https://academy.lokl.life/images/lokl-academy-og.jpg"
      />

      {/* Hero */}
      <header className="relative pt-24 pb-20 px-6 text-center overflow-hidden bg-white border-b border-[#E5E5E5]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#5352F6] rounded-full opacity-[0.03] blur-[100px] pointer-events-none" />
        <Badge type="primary" className="mb-4 inline-block">Investigación de Mercado</Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F0F0F] leading-tight mb-6 max-w-3xl mx-auto">
          Créditos Vs. Inversión Colaborativa: <br />
          <span className="text-[#5352F6]">La Tabla de Verdad</span>
        </h1>
        <p className="text-lg text-[#6D6C6C] leading-relaxed max-w-3xl mx-auto">
          Analizamos la brecha real entre lo que pagan los bancos y lo que cobran, revelando cómo la tecnología financiera (Fintech) elimina intermediarios para beneficiar a ambas puntas.
        </p>
      </header>

      <main className="pb-20 max-w-5xl mx-auto px-4 sm:px-6 py-16">
        {/* Section 1: El Techo de Cristal (Tasas) */}
        <section className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#0F0F0F]">1. El Techo de Cristal (Tasas)</h2>
              <p className="text-[#6D6C6C]">Comparativa frente a la Tasa de Usura vigente (Feb 2026).</p>
            </div>
            <div className="flex bg-white border border-[#E5E5E5] rounded-lg p-1 shrink-0">
              <button
                onClick={() => setUserProfile('natural')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${userProfile === 'natural' ? 'bg-[#5352F6] text-white shadow-sm' : 'text-[#6D6C6C] hover:text-[#0F0F0F]'}`}
              >
                Persona Natural
              </button>
              <button
                onClick={() => setUserProfile('pyme')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${userProfile === 'pyme' ? 'bg-[#5352F6] text-white shadow-sm' : 'text-[#6D6C6C] hover:text-[#0F0F0F]'}`}
              >
                Empresa (PYME)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <Card className="p-8 bg-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <AlertTriangle size={150} />
              </div>
              <h3 className="text-lg font-bold mb-6">Brecha de Tasas (Efectiva Anual)</h3>
              <div className="space-y-2">
                <ProgressBar
                  label="Tasa de Usura (Microcrédito)"
                  value={55.0}
                  max={60}
                  color="#EF4444"
                  subLabel="Límite legal máximo"
                />
                <ProgressBar
                  label="Banca Tradicional (Promedio)"
                  value={userProfile === 'pyme' ? 45.5 : 28.2}
                  max={60}
                  color="#F59E0B"
                  subLabel={userProfile === 'pyme' ? "Crédito Productivo con garantías" : "Tarjeta de Crédito / Libre Inversión"}
                />
                <ProgressBar
                  label="Plataforma Colaborativa (Fintech)"
                  value={userProfile === 'pyme' ? 24.0 : 18.5}
                  max={60}
                  color="#5352F6"
                  subLabel="Tasa justa basada en riesgo real (Data)"
                />
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <StatBox
                title="Spread Bancario"
                value="~35%"
                subtitle="Margen de intermediación promedio"
                type="error"
                icon={TrendingUp}
              />
              <StatBox
                title="Retorno Inversor"
                value="17.4%"
                subtitle="Rentabilidad promedio en Fintech"
                type="success"
                icon={PieChart}
              />
              <Card className="col-span-2 p-6 bg-[#FAFAFA] border-dashed">
                <div className="flex gap-4">
                  <Info className="text-[#5352F6] shrink-0" />
                  <div>
                    <h4 className="font-bold text-[#0F0F0F]">¿Por qué la diferencia?</h4>
                    <p className="text-sm text-[#6D6C6C] mt-2">
                      La banca tradicional carga con una pesada estructura operativa (sucursales, personal). Las Fintech conectan directamente inversionistas con solicitantes, eliminando costos y trasladando el beneficio a la tasa.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Section 2: La Anatomía del Costo Oculto */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#0F0F0F]">2. La Anatomía del Costo Oculto</h2>
            <p className="text-[#6D6C6C]">Lo que no ves en la Tasa Nominal: Seguros, GMF y Comisiones.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 hover:border-[#F59E0B] transition-colors group">
              <div className="w-12 h-12 rounded-full bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B] mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#0F0F0F]">Seguro de Vida Deudores</h3>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6D6C6C]">Banca:</span>
                  <span className="font-bold text-[#EF4444]">Obligatorio / Costoso</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6D6C6C]">Fintech:</span>
                  <span className="font-bold text-[#22C55E]">Opcional / Competitivo</span>
                </div>
                <p className="text-xs text-[#6D6C6C] pt-2 border-t border-[#E5E5E5] leading-relaxed">
                  Muchos bancos cobran hasta $2,500 COP por millón, independientemente de la edad o riesgo real.
                </p>
              </div>
            </Card>

            <Card className="p-6 hover:border-[#F59E0B] transition-colors group">
              <div className="w-12 h-12 rounded-full bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B] mb-4 group-hover:scale-110 transition-transform">
                <FileText size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#0F0F0F]">GMF (4x1000)</h3>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6D6C6C]">Banca:</span>
                  <span className="font-bold text-[#EF4444]">Se descuenta al desembolso</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6D6C6C]">Fintech:</span>
                  <span className="font-bold text-[#22C55E]">Optimización de Flujos</span>
                </div>
                <p className="text-xs text-[#6D6C6C] pt-2 border-t border-[#E5E5E5] leading-relaxed">
                  En préstamos rotativos, el GMF puede comerse hasta el 2% del capital de trabajo real si no se gestiona bien.
                </p>
              </div>
            </Card>

            <Card className="p-6 hover:border-[#F59E0B] transition-colors group">
              <div className="w-12 h-12 rounded-full bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B] mb-4 group-hover:scale-110 transition-transform">
                <Unlock size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#0F0F0F]">Garantías (FNG)</h3>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6D6C6C]">Banca:</span>
                  <span className="font-bold text-[#EF4444]">Comisión FNG (+costo)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6D6C6C]">Fintech:</span>
                  <span className="font-bold text-[#22C55E]">Colateral Digital / Pagaré</span>
                </div>
                <p className="text-xs text-[#6D6C6C] pt-2 border-t border-[#E5E5E5] leading-relaxed">
                  Las plataformas colaborativas usan &quot;scoring alternativo&quot; (facturación electrónica) para reducir la necesidad de garantías costosas.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Section 3: La Tabla de Verdad */}
        <section className="mb-20">
          <div className="bg-[#0F0F0F] rounded-2xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#5352F6] opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10 mb-10 text-center">
              <h2 className="text-3xl font-bold mb-4">La Tabla de Verdad</h2>
              <p className="text-[#E5E5E5] max-w-2xl mx-auto">
                Comparativa directa basada en el <span className="text-[#5352F6] font-bold">Decreto 1357 de 2018</span> y estudios de mercado.
              </p>
            </div>

            <div className="bg-white rounded-xl text-[#0F0F0F] overflow-visible p-4 md:p-6">
              <TruthTableRow
                label="Rentabilidad (Inversionista)"
                bankText="Tasas pasivas bajas (CDT ~9% E.A. o Cuentas ~4% E.A.). El banco se queda con el margen."
                fintechText="Retornos directos del 14% al 24% E.A. El margen es para el inversor."
                winner="fintech"
              />
              <TruthTableRow
                label="Flexibilidad & Prepago"
                bankText="Sanciones por pago anticipado frecuentes en líneas comerciales. Procesos lentos."
                fintechText="Generalmente sin sanciones de prepago. Incentiva la rotación del capital."
                winner="fintech"
              />
              <TruthTableRow
                label="Seguridad de Fondos"
                bankText="Protegido por seguro de depósito FOGAFIN (hasta 50M). Riesgo sistémico bajo."
                fintechText="Capital a riesgo. El Decreto 1357 obliga a la diversificación para mitigar pérdidas."
                winner="bank"
              />
              <TruthTableRow
                label="Experiencia de Usuario"
                bankText="Trámites presenciales, papel físico, tiempos de aprobación de semanas."
                fintechText="100% Digital, aprobación en horas/días basada en APIs y data."
                winner="fintech"
              />
            </div>

            <div className="mt-6 flex justify-center">
              <p className="text-xs text-[#6D6C6C] opacity-70 italic max-w-lg text-center">
                * Nota: La inversión en plataformas colaborativas conlleva riesgos. No se garantiza rentabilidad fija.
              </p>
            </div>
          </div>
        </section>

        {/* CTA / Conclusión */}
        <section className="text-center py-12 border-t border-[#E5E5E5]">
          <h2 className="text-2xl font-bold text-[#0F0F0F] mb-6">Conclusión del Analista</h2>
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl border border-[#E5E5E5] shadow-sm">
            <p className="text-lg text-[#444444] leading-relaxed mb-8">
              &quot;La desintermediación financiera no es solo una tendencia tecnológica, es una <span className="font-bold text-[#5352F6]">necesidad de eficiencia de mercado</span>. Mientras la banca tradicional siga dependiendo de costos operativos físicos y seguros cruzados, la inversión colaborativa seguirá ofreciendo un spread más justo para ambas partes de la ecuación.&quot;
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://lokl.life/nido-de-agua"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#5352F6] text-white hover:bg-[#4241C5] px-8 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Ver Proyectos en Guatapé <ArrowRight size={18} />
              </a>
              <a
                href="https://lokl.life/indie-universe"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-white border border-[#E5E5E5] text-[#0F0F0F] hover:border-[#5352F6] hover:text-[#5352F6] px-8 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
              >
                Oportunidades en Medellín <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0F0F0F] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">Recursos y Documento</h2>
          <a
            href="https://drive.google.com/file/d/15nR3LjvnKa6PLc_QW2wW0q0O1HYl3Pp4/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#5352F6] hover:bg-[#4241C5] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-[#5352F6]/30"
          >
            <FileText size={18} />
            Descargar PDF
          </a>
        </div>
      </footer>
    </>
  );
};

export default CreditosVsInversionPage;
