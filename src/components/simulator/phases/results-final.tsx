"use client";

import dynamic from "next/dynamic";
import { ProjectCard } from "@/schemas/project-card-schema";
import { SimulationData } from "@/schemas/simulator-schema";
import { MapPin, TrendingUp, Phone } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// OPTIMIZACIÓN CRÍTICA: Lazy load de Recharts para reducir -1800ms TBT
const ProjectionChart = dynamic(() => import("./projection-chart"), {
  loading: () => (
    <div className="w-full h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-[#5352F6] rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-sm text-gray-500">Cargando gráfica...</p>
      </div>
    </div>
  ),
  ssr: false,
});

interface ResultsFinalProps {
  project: ProjectCard;
  simulationData: SimulationData;
  bannerComponent?: React.ReactNode;
}

export default function ResultsFinal({ project, simulationData, bannerComponent }: ResultsFinalProps) {
  // Calcular rentabilidad con validación
  const hasValidRent = project.minRent > 0 && project.maxRent > 0 && project.unitPrice > 0;
  
  let rentabilityMin: number;
  let rentabilityMax: number;
  
  if (hasValidRent) {
    rentabilityMin = project.minRent * 100;
    rentabilityMax = project.maxRent * 100;
  } else {
      rentabilityMin = 6.18;
      rentabilityMax = 14.26;
  }

  // Preparar datos para la gráfica
  const chartData = simulationData.averageAnnualReturnYears.map((rate, index) => ({
    year: `Año ${index + 1}`,
    valorization: (simulationData.percentageValorizationYears[index] || 0) * 100,
    income: (simulationData.porcentageIncomeYears[index] || 0) * 100,
    return: rate * 100,
  }));

  // Key única para forzar re-render del gráfico cuando cambien los datos
  return (
    <div className="space-y-6">
      {/* Header del proyecto con imagen */}
      <div className="relative rounded-2xl h-64">
        <div className="absolute inset-0">
          <Image
            src={project.imageURL}
            alt={project.name}
            fill
            className="object-cover opacity-90 overflow-hidden rounded-2xl"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent rounded-2xl" />
        </div>

        <div className="relative z-10 p-6 h-full flex flex-col justify-end text-white">
          <div className="mb-3">
            <div className="inline-flex items-center gap-2 bg-[#5352F6] px-3 py-1.5 rounded-full">
              <TrendingUp className="w-4 h-4" />
              <span className="font-semibold text-sm">
                {rentabilityMin.toFixed(2)}% - {rentabilityMax.toFixed(2)}%
              </span>
            </div>
          </div>
          <h3 className="text-3xl font-bold mb-2">{project.name}</h3>
          <div className="flex items-center gap-2 text-white/90">
            <MapPin className="w-4 h-4" />
            <span>{project.city}, {project.country}</span>
          </div>
        </div>
      </div>

      {/* Gráfica de proyección */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h4 className="font-bold text-lg mb-6 text-slate-900">
          Proyección de retorno a 5 años
        </h4>
        
        {/* Gráfica de barras con lazy loading de Recharts */}
        <ProjectionChart chartData={chartData} />

        {/* Leyenda de colores debajo */}
        <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#6366f1] rounded-full"></div>
            <span className="text-sm text-slate-700 font-medium">Valorización</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#10b981] rounded-full"></div>
            <span className="text-sm text-slate-700 font-medium">Utilidades</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border-2 border-[#6366f1] rounded-full"></div>
            <span className="text-sm text-slate-700 font-medium">Rentabilidad</span>
          </div>
        </div>
      </div>

      {/* Banner de niveles - Solo mobile, después de gráfica */}
      {bannerComponent && (
        <div className="md:hidden">
          {bannerComponent}
        </div>
      )}

      {/* Card de asesor */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <div className="flex items-start gap-4">
          {/* Foto del asesor */}
          <div className="flex-shrink-0">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-[#5352F6]">
              <Image
                src="https://lokl-assets.s3.amazonaws.com/about-us/pipe.jpg"
                alt="Felipe Restrepo - Asesor LOKL"
                fill
                sizes="80px"
                quality={85}
                className="object-cover"
              />
            </div>
          </div>

          {/* Contenido */}
          <div className="flex-1">
            <div className="mb-3">
              <h4 className="font-bold text-lg text-slate-900 mb-1">
                ¿Necesitas ayuda para decidir?
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Agenda una llamada con nuestros expertos y resuelve todas tus dudas sobre esta inversión
              </p>
            </div>

            <Button
              className="w-full bg-[#5352F6] hover:bg-[#5352F6]/90 text-white font-semibold shadow-md"
              size="lg"
            >
              <Phone className="w-4 h-4 mr-2" />
              Agendar llamada
            </Button>

            {/* Info del asesor */}
            <div className="mt-3 pt-3 border-t border-slate-100">
              <p className="text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Felipe Restrepo</span> · Asesor de Inversiones LOKL
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-center px-4">
        <p className="text-xs text-slate-500 leading-relaxed">
          * Los retornos mostrados son estimaciones basadas en supuestos de mercado y pueden variar. Las inversiones en bienes raíces conllevan riesgos y no garantizan rendimientos.
        </p>
      </div>
    </div>
  );
}

