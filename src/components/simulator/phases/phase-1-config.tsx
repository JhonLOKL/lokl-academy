"use client";

import { ProjectCard } from "@/schemas/project-card-schema";
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
import { Building2, DollarSign, CreditCard } from "lucide-react";

interface Phase1ConfigProps {
  selectedProject: ProjectCard | null;
  availableProjects: ProjectCard[];
  isLoadingProjects: boolean;
  projectsError: string | null;
  investmentAmount: number;
  installments: number;
  onProjectChange: (projectId: string) => void;
  onInvestmentChange: (amount: number) => void;
  onInstallmentsChange: (installments: number) => void;
  onCalculate: () => void;
  isCalculating: boolean;
}

export default function Phase1Config({
  selectedProject,
  availableProjects,
  isLoadingProjects,
  projectsError,
  investmentAmount,
  installments,
  onProjectChange,
  onInvestmentChange,
  onInstallmentsChange,
  onCalculate,
  isCalculating,
}: Phase1ConfigProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const minInvestment = selectedProject
    ? selectedProject.unitPrice * selectedProject.minInvestmentUnits
    : 0;
  const maxInvestment = 500000000;
  const maxInstallments = selectedProject?.maxInvestmentQuota || 1;

  return (
    <div className="space-y-6 bg-[#5352F6] rounded-2xl p-8 text-white">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold mb-2">Simulador de inversiones</h3>
        <p className="text-white/80 text-sm">
          Calcula el retorno de tu inversión y descubre cómo hacer crecer tu patrimonio con LOKL
        </p>
      </div>

      {/* Selector de Proyecto */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-white/90">
          <Building2 className="w-4 h-4" />
          Selecciona tu Proyecto
        </Label>
        {isLoadingProjects ? (
          <div className="flex items-center gap-2 p-3 bg-white/20 rounded-lg">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
            <span className="text-sm">Cargando proyectos...</span>
          </div>
        ) : projectsError ? (
          <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-sm">{projectsError}</p>
          </div>
        ) : (
          <Select
            value={selectedProject?.id || ""}
            onValueChange={onProjectChange}
            disabled={availableProjects.length === 0}
          >
            <SelectTrigger className="bg-white/20 border-white/30 text-white hover:bg-white/25 h-12">
              <SelectValue
                placeholder={
                  availableProjects.length === 0
                    ? "No hay proyectos disponibles"
                    : "Selecciona un proyecto"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {availableProjects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name} - {project.city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {selectedProject && (
        <>
          {/* Monto a Invertir */}
          <div className="space-y-3">
            <Label className="flex items-center justify-between text-white/90">
              <span className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Monto a Invertir (COP)
              </span>
              <span className="text-lg font-bold">
                {formatCurrency(investmentAmount)}
              </span>
            </Label>
            <Slider
              value={[investmentAmount]}
              onValueChange={([value]) => onInvestmentChange(value)}
              min={minInvestment}
              max={maxInvestment}
              step={selectedProject.unitPrice}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-white/60">
              <span>{formatCurrency(minInvestment)}</span>
              <span>{formatCurrency(maxInvestment)}</span>
            </div>
          </div>

          {/* Forma de Pago */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-white/90">
              <CreditCard className="w-4 h-4" />
              Forma de Pago
            </Label>
            <Select
              value={installments.toString()}
              onValueChange={(value) => onInstallmentsChange(parseInt(value))}
            >
              <SelectTrigger className="bg-white/20 border-white/30 text-white hover:bg-white/25 h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: maxInstallments }, (_, i) => i + 1).map(
                  (num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num === 1 ? "Pago único" : `${num} cuotas`}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Resumen Rápido */}
          <div className="bg-white/10 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Total a pagar</span>
              <span className="font-bold">{formatCurrency(investmentAmount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Costo unit.</span>
              <span className="font-bold">{formatCurrency(selectedProject.unitPrice)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Cupos disponibles</span>
              <span className="font-bold">
                {selectedProject.availableSpots} de {selectedProject.totalSpots}
              </span>
            </div>
          </div>

          {/* Botón Calcular */}
          <Button
            onClick={onCalculate}
            disabled={isCalculating}
            className="w-full h-12 bg-white text-[#5352F6] hover:bg-white/90 font-semibold text-base"
          >
            {isCalculating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#5352F6] border-t-transparent mr-2"></div>
                Calculando...
              </>
            ) : (
              "Calcular Retorno"
            )}
          </Button>
        </>
      )}
    </div>
  );
}

