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
        
        {/* Gráfica de barras sin leyenda en el chart */}
        <ResponsiveContainer width="100%" height={280}>
          <BarChart 
            data={chartData}
            margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis 
              dataKey="year" 
              tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              label={{ 
                value: 'Millones COP', 
                angle: -90, 
                position: 'insideLeft', 
                fill: '#64748b',
                style: { fontSize: 12 }
              }}
              tickFormatter={(value) => `${value.toFixed(1)}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)',
                padding: '12px'
              }}
              labelStyle={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}
              formatter={(value: number, name: string) => {
                if (name === 'Valorización' || name === 'Utilidades') {
                  return [`$${value.toFixed(2)}M`, name];
                }
                return [`${value.toFixed(2)}%`, name];
              }}
              cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }}
            />
            <Bar 
              dataKey="valorization" 
              fill="#6366f1" 
              name="Valorización" 
              radius={[8, 8, 0, 0]}
              maxBarSize={60}
            />
            <Bar 
              dataKey="income" 
              fill="#10b981" 
              name="Utilidades" 
              radius={[8, 8, 0, 0]}
              maxBarSize={60}
            />
          </BarChart>
        </ResponsiveContainer>

        {/* Tags de rentabilidad exactamente debajo de cada año */}
        <div className="relative mt-2" style={{ marginLeft: '65px', marginRight: '0px' }}>
          <div className="grid grid-cols-5 gap-0">
            {chartData.map((data, index) => (
              <div key={index} className="flex justify-center items-center">
                <div className="inline-flex items-center gap-1.5 px-2 py-1 md:px-3 md:py-1.5 bg-white border-2 border-[#5352F6] rounded-full">
                  <span className="text-xs md:text-sm font-semibold text-[#5352F6]">
                    {data.return.toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

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
      <div className="bg-slate-50 border-l-4 border-[#5352F6] rounded-lg p-5 shadow-sm">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-[#5352F6]/10 rounded-full flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-[#5352F6]" />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-bold text-slate-900 mb-2 text-sm">Información importante</p>
            <p className="text-slate-600 text-xs leading-relaxed">
              * Los retornos mostrados son estimaciones basadas en supuestos de mercado y pueden variar.
              Las inversiones en bienes raíces conllevan riesgos y no garantizan rendimientos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

