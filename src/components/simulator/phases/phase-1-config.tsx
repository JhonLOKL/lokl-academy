"use client";

import { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";

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

  const maxInstallments = selectedProject?.maxInvestmentQuota || 1;

  // Selector en unidades (UI) -> se convierte a dinero (store/API)
  const unitPrice = selectedProject?.unitPrice ?? 1;
  const minUnits = selectedProject ? selectedProject.minInvestmentUnits : 0;
  const maxUnits = 500;
  const currentUnits = selectedProject
    ? Math.min(
        maxUnits,
        Math.max(minUnits, Math.round(investmentAmount / unitPrice))
      )
    : 0;

  // Estado local del campo de texto para permitir escritura fluida
  const [unitsInput, setUnitsInput] = useState<string>("");

  // Sincronizar cuando cambie el valor desde el slider/store o el proyecto
  useEffect(() => {
    if (selectedProject) {
      setUnitsInput(String(currentUnits));
    } else {
      setUnitsInput("");
    }
  }, [currentUnits, selectedProject]);

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
          {/* Unidades a Invertir (se muestra COP equivalente) */}
          <div className="space-y-3">
            <Label className="flex items-center justify-between text-white/90">
              <span className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Unidades a invertir
              </span>
              <span className="text-lg font-bold">{formatCurrency(currentUnits * unitPrice)}</span>
            </Label>
            <Slider
              value={[currentUnits]}
              onValueChange={([units]) => onInvestmentChange(units * unitPrice)}
              min={minUnits}
              max={maxUnits}
              step={1}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-white/60">
              <span>{minUnits} units</span>
              <span>{maxUnits} units</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              {/* Columna: Units input */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-white/90">
                  <DollarSign className="w-4 h-4" />
                  Unidades
                </Label>
                <div>
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={unitsInput}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v === "") {
                        setUnitsInput("");
                        return;
                      }
                      if (/^\d+$/.test(v)) {
                        setUnitsInput(v);
                      }
                    }}
                    onBlur={() => {
                      const parsed = parseInt(unitsInput || String(minUnits), 10);
                      const clamped = Math.max(
                        minUnits,
                        Math.min(maxUnits, Number.isNaN(parsed) ? minUnits : parsed)
                      );
                      onInvestmentChange(clamped * unitPrice);
                      setUnitsInput(String(clamped));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const parsed = parseInt(unitsInput || String(minUnits), 10);
                        const clamped = Math.max(
                          minUnits,
                          Math.min(maxUnits, Number.isNaN(parsed) ? minUnits : parsed)
                        );
                        onInvestmentChange(clamped * unitPrice);
                        setUnitsInput(String(clamped));
                      }
                    }}
                    className="h-9 w-full px-3 py-1 text-sm leading-none bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  />
                </div>
              </div>

              {/* Columna: Forma de Pago */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-white/90">
                  <CreditCard className="w-4 h-4" />
                  Forma de Pago
                </Label>
                <Select
                  value={installments.toString()}
                  onValueChange={(value) => onInstallmentsChange(parseInt(value))}
                >
                  <SelectTrigger className="bg-white/20 border-white/30 text-white hover:bg-white/25 h-12 w-full">
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
            </div>
          </div>

          {/* Forma de Pago movida junto a Units */}

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
              "Simular inversión"
            )}
          </Button>
        </>
      )}
    </div>
  );
}

