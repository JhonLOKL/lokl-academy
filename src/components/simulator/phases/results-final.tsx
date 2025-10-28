"use client";

import { ProjectCard } from "@/schemas/project-card-schema";
import { SimulationData } from "@/schemas/simulator-schema";
import { MapPin, TrendingUp, Phone, AlertCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ResultsFinalProps {
  project: ProjectCard;
  simulationData: SimulationData;
}

export default function ResultsFinal({ project, simulationData }: ResultsFinalProps) {
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

  // Preparar datos para la gráfica
  const chartData = simulationData.averageAnnualReturnYears.map((rate, index) => ({
    year: `Año ${index + 1}`,
    valorization: (simulationData.percentageValorizationYears[index] || 0) * 100,
    income: (simulationData.porcentageIncomeYears[index] || 0) * 100,
    return: rate * 100,
  }));

  return (
    <div className="space-y-6">
      {/* Header del proyecto con imagen */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 h-64">
        <div className="absolute inset-0">
          <Image
            src={project.imageURL}
            alt={project.name}
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
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
        <h4 className="font-bold text-lg mb-4 text-slate-900">
          Proyección de retorno a 5 años
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="year" 
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis 
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={{ stroke: '#cbd5e1' }}
              label={{ value: 'Millones COP', angle: -90, position: 'insideLeft', fill: '#64748b' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              formatter={(value: number) => `${value.toFixed(2)}%`}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
            />
            <Bar dataKey="valorization" fill="#6366f1" name="Valorización" radius={[8, 8, 0, 0]} />
            <Bar dataKey="income" fill="#10b981" name="Utilidades" radius={[8, 8, 0, 0]} />
            <Bar dataKey="return" fill="#8b5cf6" name="Rentabilidad" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Botón de contacto con asesor */}
      <div className="bg-gradient-to-r from-[#5352F6] to-[#7c3aed] rounded-2xl p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Phone className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-lg mb-2">¿Necesitas ayuda para decidir?</h4>
            <p className="text-white/90 text-sm mb-4">
              Agenda una llamada con nuestros expertos y resuelve todas tus dudas sobre esta inversión
            </p>
            <Button
              className="bg-white text-[#5352F6] hover:bg-white/90 font-semibold"
              size="lg"
            >
              <Phone className="w-4 h-4 mr-2" />
              Agendar llamada
            </Button>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-900">
          <p className="font-semibold mb-1">Información importante</p>
          <p className="text-amber-800">
            * Los retornos mostrados son estimaciones basadas en supuestos de mercado y pueden variar. 
            Las inversiones en bienes raíces conllevan riesgos y no garantizan rendimientos.
          </p>
        </div>
      </div>
    </div>
  );
}

