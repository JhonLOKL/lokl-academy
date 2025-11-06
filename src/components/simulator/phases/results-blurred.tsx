"use client";

import { ProjectCard } from "@/schemas/project-card-schema";
import { SimulationData } from "@/schemas/simulator-schema";
import { MapPin, TrendingUp, Sparkles } from "lucide-react";
import Image from "next/image";

interface ResultsBlurredProps {
  project: ProjectCard;
  simulationData: SimulationData;
}

export default function ResultsBlurred({ project, simulationData }: ResultsBlurredProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(value);
  };

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

  return (
    <div className="space-y-6">
      {/* Header con imagen pequeña */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 h-48">
        <div className="absolute inset-0">
          <Image
            src={project.imageURL}
            alt={project.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        </div>
        
        <div className="relative z-10 p-6 h-full flex flex-col justify-end text-white">
          <div className="mb-2">
            <div className="inline-flex items-center gap-2 bg-[#5352F6] px-3 py-1.5 rounded-full">
              <TrendingUp className="w-4 h-4" />
              <span className="font-semibold text-sm">
                {rentabilityMin.toFixed(1)}% - {rentabilityMax.toFixed(1)}%
              </span>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">{project.name}</h3>
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{project.city}, {project.country}</span>
          </div>
        </div>
      </div>

      {/* Contenido de resultados con blur */}
      <div className="relative">
        {/* Overlay de blur */}
        <div className="absolute inset-0 backdrop-blur-md bg-white/10 z-10 rounded-2xl flex items-center justify-center">
          <div className="text-center px-6 max-w-md">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#5352F6] rounded-full mb-4 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-slate-900 mb-3">
              ¡Estás a un paso de ver tu proyección!
            </h4>
            <p className="text-slate-700 text-sm leading-relaxed">
              Completa los datos a la izquierda para desbloquear tu análisis personalizado
            </p>
          </div>
        </div>

        {/* Contenido real con blur */}
        <div className="space-y-4 blur-sm pointer-events-none select-none">
          {/* Utilidad destacada */}
          <div className="bg-gradient-to-r from-[#5352F6] to-[#7c3aed] rounded-2xl p-6 text-white text-center">
            <p className="text-white/90 text-sm mb-2 font-medium">
              Utilidad estimada a 5 años*
            </p>
            <p className="text-4xl font-bold mb-3">
              {formatCurrency(simulationData.totalIncome + simulationData.totalValuation)}
            </p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <div>
                <p className="text-white/80 text-xs">Rentas percibidas</p>
                <p className="font-semibold text-lg">{formatCurrency(simulationData.totalIncome)}</p>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div>
                <p className="text-white/80 text-xs">Valorización activo</p>
                <p className="font-semibold text-lg">{formatCurrency(simulationData.totalValuation)}</p>
              </div>
            </div>
          </div>

          {/* Resumen en tarjetas */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-slate-600 text-xs mb-1">Inversión total</p>
              <p className="font-bold text-lg text-slate-900">{formatCurrency(simulationData.totalToPay)}</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-slate-600 text-xs mb-1">Unidades</p>
              <p className="font-bold text-lg text-slate-900">{simulationData.unitsAmount.toFixed(2)}</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-slate-600 text-xs mb-1">Costo unitario</p>
              <p className="font-bold text-lg text-slate-900">{formatCurrency(simulationData.unitValue)}</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-slate-600 text-xs mb-1">Participación</p>
              <p className="font-bold text-lg text-slate-900">
                {(simulationData.estimatedParticipation * 100).toFixed(4)}%
              </p>
            </div>
          </div>

          {/* Proyección anual */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h4 className="font-bold text-lg mb-4 text-slate-900">
              Proyección año a año
            </h4>
            <div className="space-y-3">
              {simulationData.averageAnnualReturnYears.map((rate, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Año {index + 1}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-700">
                      {(rate * 100).toFixed(2)}% retorno
                    </span>
                    <div className="w-32 bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-[#5352F6] h-2 rounded-full"
                        style={{ width: `${Math.min((rate * 100), 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Supuestos */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h4 className="font-bold text-base mb-3 text-slate-900">Supuestos de Operación</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Alojamiento</span>
                <span className="font-semibold text-slate-900">{simulationData.accommodations} días</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Tarifa promedio</span>
                <span className="font-semibold text-slate-900">{formatCurrency(simulationData.averageRate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Ocupación hotel</span>
                <span className="font-semibold text-slate-900">{(simulationData.occupation * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Margen de costos</span>
                <span className="font-semibold text-slate-900">{(simulationData.costMargin * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

