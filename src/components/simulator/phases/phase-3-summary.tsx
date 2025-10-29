"use client";

import { ProjectCard } from "@/schemas/project-card-schema";
import { SimulationData } from "@/schemas/simulator-schema";
import { Building2, DollarSign, CreditCard, TrendingUp, RefreshCw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Phase3SummaryProps {
  project: ProjectCard;
  simulationData: SimulationData;
  investmentAmount: number;
  installments: number;
  availableProjects: ProjectCard[];
  onProjectChange: (projectId: string) => void;
  onInvestmentChange: (amount: number) => void;
  onInstallmentsChange: (installments: number) => void;
  onRecalculate: () => void;
  isRecalculating: boolean;
}

export default function Phase3Summary({
  project,
  simulationData,
  investmentAmount,
  installments,
  availableProjects,
  onProjectChange,
  onInvestmentChange,
  onInstallmentsChange,
  onRecalculate,
  isRecalculating,
}: Phase3SummaryProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const minInvestment = project.unitPrice * project.minInvestmentUnits;
  const maxInvestment = 500000000;
  const maxInstallments = project.maxInvestmentQuota || 1;

  return (
    <div className="space-y-6 bg-[#5352F6] rounded-2xl p-8 text-white">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold mb-2">Tu proyección está lista</h3>
        <p className="text-white/80 text-sm">
          Ajusta los parámetros y recalcula para ver diferentes escenarios de inversión
        </p>
      </div>

      {/* Controles de Resimulación */}
      <div className="space-y-4 bg-white/10 rounded-xl p-5 border border-white/20">
        <h4 className="font-semibold text-white text-sm uppercase tracking-wide flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Ajustar simulación
        </h4>

        {/* Selector de Proyecto */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-white/90 text-xs">
            <Building2 className="w-3.5 h-3.5" />
            Proyecto
          </Label>
          <Select value={project.id} onValueChange={onProjectChange}>
            <SelectTrigger className="bg-white/20 border-white/30 text-white hover:bg-white/25 h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {availableProjects.map((proj) => (
                <SelectItem key={proj.id} value={proj.id}>
                  {proj.name} - {proj.city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Monto a Invertir */}
        <div className="space-y-2">
          <Label className="flex items-center justify-between text-white/90 text-xs">
            <span className="flex items-center gap-2">
              <DollarSign className="w-3.5 h-3.5" />
              Monto a Invertir
            </span>
            <span className="font-bold text-sm">{formatCurrency(investmentAmount)}</span>
          </Label>
          <Slider
            value={[investmentAmount]}
            onValueChange={([value]) => onInvestmentChange(value)}
            min={minInvestment}
            max={maxInvestment}
            step={project.unitPrice}
            className="py-1"
          />
          <div className="flex justify-between text-[10px] text-white/50">
            <span>{formatCurrency(minInvestment)}</span>
            <span>{formatCurrency(maxInvestment)}</span>
          </div>
        </div>

        {/* Forma de Pago */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-white/90 text-xs">
            <CreditCard className="w-3.5 h-3.5" />
            Forma de Pago
          </Label>
          <Select
            value={installments.toString()}
            onValueChange={(value) => onInstallmentsChange(parseInt(value))}
          >
            <SelectTrigger className="bg-white/20 border-white/30 text-white hover:bg-white/25 h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: maxInstallments }, (_, i) => i + 1).map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num === 1 ? "Pago único" : `${num} cuotas`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Botón Recalcular */}
        <Button
          onClick={onRecalculate}
          disabled={isRecalculating}
          className="w-full bg-white text-[#5352F6] hover:bg-white/90 font-semibold h-10"
        >
          {isRecalculating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#5352F6] border-t-transparent mr-2"></div>
              Recalculando...
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4 mr-2" />
              Recalcular proyección
            </>
          )}
        </Button>
      </div>

      {/* Resultados destacados */}
      <div className="space-y-3">
        <h4 className="font-semibold text-white/90 text-sm uppercase tracking-wide">
          Resumen de resultados
        </h4>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-white/70 text-xs mb-1">Total a pagar</p>
            <p className="font-bold text-lg">{formatCurrency(simulationData.totalToPay)}</p>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-white/70 text-xs mb-1">Costo unit.</p>
            <p className="font-bold text-lg">{formatCurrency(simulationData.unitValue)}</p>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-white/70 text-xs mb-1">Participación</p>
            <p className="font-bold text-lg">
              {(simulationData.estimatedParticipation * 100).toFixed(4)}%
            </p>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-white/70 text-xs mb-1">Unidades</p>
            <p className="font-bold text-lg">{simulationData.unitsAmount.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Supuestos de operación */}
      <div className="space-y-3">
        <h4 className="font-semibold text-white/90 text-sm uppercase tracking-wide">
          Supuestos Operación*
        </h4>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-white/80">Alojamiento</span>
            <span className="font-semibold">{simulationData.accommodations} días</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-white/80">Tarifa Promedio</span>
            <span className="font-semibold">{formatCurrency(simulationData.averageRate)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-white/80">Ocupación Hotel</span>
            <span className="font-semibold">{(simulationData.occupation * 100).toFixed(0)}%</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-white/80">Margen de Costos</span>
            <span className="font-semibold">{(simulationData.costMargin * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>

      {/* Utilidad destacada */}
      <div className="bg-gradient-to-r from-white/20 to-white/10 rounded-xl p-6 text-center border border-white/20">
        <div className="flex items-center justify-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5" />
          <p className="text-white/90 text-sm font-medium">Utilidad de tu inversión estimada a 5 años*</p>
        </div>
        <p className="text-4xl font-bold mb-1">
          {formatCurrency(simulationData.totalIncome + simulationData.totalValuation)}
        </p>
        <div className="flex items-center justify-center gap-4 mt-3 text-sm">
          <div>
            <p className="text-white/70 text-xs">Rentas</p>
            <p className="font-semibold">{formatCurrency(simulationData.totalIncome)}</p>
          </div>
          <div className="w-px h-8 bg-white/20"></div>
          <div>
            <p className="text-white/70 text-xs">Valorización</p>
            <p className="font-semibold">{formatCurrency(simulationData.totalValuation)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

