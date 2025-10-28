"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SimulationData } from "@/schemas/simulator-schema";

interface SimulationResultsProps {
  simulationData: SimulationData;
  projectName: string;
  isBlurred?: boolean;
}

export default function SimulationResults({
  simulationData,
  projectName,
  isBlurred = false,
}: SimulationResultsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="relative">
      {/* Overlay con blur */}
      {isBlurred && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-md z-10 flex items-center justify-center rounded-lg">
          <div className="text-center p-6 max-w-md">
            <h3 className="text-2xl font-bold mb-2">
              ¡Completa tus datos para ver los resultados!
            </h3>
            <p className="text-muted-foreground">
              Queremos conocerte mejor para ofrecerte una experiencia personalizada
              y mostrarte los detalles completos de tu simulación.
            </p>
          </div>
        </div>
      )}

      {/* Contenido con blur condicional */}
      <div className={isBlurred ? "blur-sm pointer-events-none" : ""}>
        <Card>
          <CardHeader>
            <CardTitle>Resultados de la Simulación</CardTitle>
            <CardDescription>
              Proyección detallada de tu inversión en {projectName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Resumen de inversión */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Resumen de Inversión</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Total a Pagar:</p>
                    <p className="text-lg font-bold">
                      {formatCurrency(simulationData.totalToPay)}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Valor de Inversión:</p>
                    <p className="text-lg font-bold">
                      {formatCurrency(simulationData.investmentValue)}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Valor por Cuota:</p>
                    <p className="text-lg font-bold">
                      {formatCurrency(simulationData.installmentValue)}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Cuota de Financiación:</p>
                    <p className="text-lg font-bold">
                      {formatCurrency(simulationData.financingFee)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Unidades y participación */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Unidades y Participación</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Cantidad de Unidades:</p>
                    <p className="text-lg font-bold">
                      {simulationData.unitsAmount.toFixed(2)}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Valor por Unidad:</p>
                    <p className="text-lg font-bold">
                      {formatCurrency(simulationData.unitValue)}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg col-span-2">
                    <p className="text-sm text-muted-foreground">Participación Estimada:</p>
                    <p className="text-lg font-bold">
                      {(simulationData.estimatedParticipation * 100).toFixed(4)}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Ingresos y valorización */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Proyección Financiera</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Ingreso Total:</p>
                    <p className="text-lg font-bold text-primary">
                      {formatCurrency(simulationData.totalIncome)}
                    </p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Valorización Total:</p>
                    <p className="text-lg font-bold text-primary">
                      {formatCurrency(simulationData.totalValuation)}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Tarifa Promedio:</p>
                    <p className="text-lg font-bold">
                      {formatCurrency(simulationData.averageRate)}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Ocupación:</p>
                    <p className="text-lg font-bold">
                      {(simulationData.occupation * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Retorno anual promedio */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Retorno Anual Promedio por Año</h3>
                <div className="grid grid-cols-5 gap-2">
                  {simulationData.averageAnnualReturnYears.map((rate, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Año {index + 1}</p>
                      <p className="text-sm font-bold">{(rate * 100).toFixed(2)}%</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

