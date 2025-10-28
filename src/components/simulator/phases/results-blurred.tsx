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
    rentabilityMin = ((project.minRent * 12) / project.unitPrice) * 100;
    rentabilityMax = ((project.maxRent * 12) / project.unitPrice) * 100;
  } else {
    if (project.subscriptionFeePercentage > 0) {
      const annualRate = project.subscriptionFeePercentage * 12 * 100;
      rentabilityMin = annualRate * 0.8;
      rentabilityMax = annualRate * 1.2;
    } else {
      rentabilityMin = 6.18;
      rentabilityMax = 14.26;
    }
  }

  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 h-full min-h-[600px]">
      {/* Imagen de fondo con overlay más oscuro para el blur */}
      <div className="absolute inset-0">
        <Image
          src={project.imageURL}
          alt={project.name}
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/60" />
      </div>

      {/* Contenido blur */}
      <div className="relative z-10 h-full">
        {/* Header del proyecto */}
        <div className="p-6 border-b border-white/10">
          <div className="mb-3">
            <div className="inline-flex items-center gap-2 bg-[#5352F6]/80 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <TrendingUp className="w-4 h-4 text-white" />
              <span className="font-semibold text-sm text-white">
                {rentabilityMin.toFixed(2)}% - {rentabilityMax.toFixed(2)}%
              </span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{project.name}</h3>
          <div className="flex items-center gap-2 text-white/80">
            <MapPin className="w-4 h-4" />
            <span>{project.city}, {project.country}</span>
          </div>
        </div>

        {/* Contenido con blur */}
        <div className="relative p-6">
          {/* Overlay de blur */}
          <div className="absolute inset-0 backdrop-blur-xl bg-slate-900/40 z-10 flex items-center justify-center">
            <div className="text-center px-6 max-w-md">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#5352F6] rounded-full mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-3">
                ¡Estás a un paso de ver tu proyección!
              </h4>
              <p className="text-white/80 text-sm leading-relaxed">
                Completa los datos a la izquierda para desbloquear tu análisis personalizado y conocer todos los detalles de tu inversión
              </p>
            </div>
          </div>

          {/* Contenido simulado (blur) */}
          <div className="space-y-4 blur-sm">
            <div className="bg-white/10 rounded-xl p-4">
              <h4 className="text-white/70 text-sm mb-3">Proyección de retorno a 5 años</h4>
              <div className="h-48 bg-white/5 rounded-lg flex items-center justify-center">
                <div className="text-white/30">Gráfica de proyección</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/10 rounded-lg p-3">
                  <p className="text-white/50 text-xs mb-1">Dato {i}</p>
                  <p className="text-white font-bold">$XXX.XXX</p>
                </div>
              ))}
            </div>

            <div className="bg-white/10 rounded-xl p-4 space-y-2">
              <h4 className="text-white/70 text-sm mb-2">Supuestos Operación</h4>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-white/50">Parámetro {i}</span>
                  <span className="text-white">XX%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

