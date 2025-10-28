"use client";

import { getProjectCardsAction } from "@/actions/project-actions";
import { createSimulationAction, saveSimulationAction } from "@/actions/simulator-actions";
import { useSimulatorStore } from "@/store/simulator-store";
import { useAuthStore } from "@/store/auth-store";
import { useUtmStore } from "@/store/utm-store";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SimulationData } from "@/schemas/simulator-schema";
import { LeadFormData } from "@/schemas/lead-schema";
import LeadCaptureModal from "./lead-capture-modal";
import SimulationResults from "./simulation-results";
import { parsePhoneData } from "@/lib/phone-utils";

interface SimulatorPhase1Props {
  simulatorName: string;
}

export default function SimulatorPhase1({ simulatorName }: SimulatorPhase1Props) {
  const {
    availableProjects,
    selectedProject,
    investmentAmount,
    installments,
    isLoadingProjects,
    projectsError,
    setAvailableProjects,
    setSelectedProject,
    setInvestmentAmount,
    setInstallments,
    setLoadingProjects,
    setProjectsError,
  } = useSimulatorStore();

  // Auth store
  const { user } = useAuthStore();

  // UTM store
  const { utmSource, utmMedium, utmCampaign, utmTerm, utmContent } = useUtmStore();

  // Estados para la simulación
  const [simulationData, setSimulationData] = useState<SimulationData | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationError, setSimulationError] = useState<string | null>(null);
  
  // Estados para el modal de captura de leads
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [hasSubmittedLead, setHasSubmittedLead] = useState(false);
  
  // Estado para trackear la primera simulación CON datos completos
  const [hasSimulatedWithData, setHasSimulatedWithData] = useState(false);

  // Cargar proyectos disponibles
  useEffect(() => {
    const loadProjects = async () => {
      setLoadingProjects(true);
      try {
        const response = await getProjectCardsAction();
        if (response.success && response.projects) {
          // Filtrar proyectos que NO estén en "Etapa 0"
          const validProjects = response.projects.filter(
            (project) => project.phase !== "Etapa 0"
          );
          setAvailableProjects(validProjects);
        } else {
          setProjectsError(response.error || "Error al cargar proyectos");
        }
      } catch (error) {
        setProjectsError(error instanceof Error ? error.message : "Error al cargar proyectos");
      }
    };

    if (availableProjects.length === 0 && !isLoadingProjects) {
      loadProjects();
    }
  }, [availableProjects.length, isLoadingProjects, setAvailableProjects, setLoadingProjects, setProjectsError]);

  // Calcular valores mínimo y máximo para el slider de inversión
  const minInvestment = selectedProject
    ? selectedProject.unitPrice * selectedProject.minInvestmentUnits
    : 0;
  const maxInvestment = 500000000; // 500M

  // Calcular cuotas máximas
  const maxInstallments = selectedProject?.maxInvestmentQuota || 1;

  // Formatear moneda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Función que se ejecuta en la primera simulación CON datos completos del usuario
  const onFirstSimulationWithData = (userData: { name: string; email: string; isAuthenticated: boolean }) => {
    console.log("🎉 PRIMERA SIMULACIÓN CON DATOS COMPLETOS!", {
      usuario: {
        nombre: userData.name,
        email: userData.email,
        autenticado: userData.isAuthenticated,
      },
      simulacion: {
        proyecto: selectedProject?.name,
        montoInversion: formatCurrency(investmentAmount),
        cuotas: installments,
        simulador: simulatorName,
      },
      marketing: {
        utmSource,
        utmMedium,
        utmCampaign,
        utmTerm,
        utmContent,
      },
      timestamp: new Date().toISOString(),
    });

    // TODO: Aquí se llamará a la función real del backend cuando esté disponible
    // Ejemplo:
    // await trackFirstSimulationEvent({
    //   userId: user?.id,
    //   userName: userData.name,
    //   userEmail: userData.email,
    //   projectId: selectedProject?.id,
    //   projectName: selectedProject?.name,
    //   investmentAmount,
    //   installments,
    //   simulator: simulatorName,
    //   utmSource,
    //   utmMedium,
    //   utmCampaign,
    //   isAuthenticated: userData.isAuthenticated,
    // });
  };

  // Función para guardar la simulación
  const saveSimulation = async (simData: SimulationData) => {
    if (!selectedProject) return;

    try {
      if (user) {
        // Usuario autenticado - solo enviar datos básicos
        await saveSimulationAction(
          {
            email: user.email,
            installments,
            investmentValue: investmentAmount,
            name: `${user.firstName} ${user.lastName}`,
            projectId: selectedProject.id,
            simulator: simulatorName,
            termsAccepted: true,
            unitsQuantity: simData.unitsAmount,
            // Incluir parámetros UTM si existen
            ...(utmSource && { utmSource }),
            ...(utmMedium && { utmMedium }),
            ...(utmCampaign && { utmCampaign }),
            ...(utmTerm && { utmTerm }),
            ...(utmContent && { utmContent }),
          },
          true // isAuthenticated
        );

        // Ejecutar función de primera simulación con datos completos (usuario autenticado)
        if (!hasSimulatedWithData) {
          onFirstSimulationWithData({
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            isAuthenticated: true,
          });
          setHasSimulatedWithData(true);
        }
      } else if (hasSubmittedLead) {
        // Usuario no autenticado pero ya envió datos del lead
        // Aquí necesitarías guardar los datos del lead en el estado
        // Por ahora solo logueamos
        console.log("Usuario no autenticado con lead enviado - no se guarda la simulación automáticamente");
      }
      // Si no está autenticado y no ha enviado lead, se guardará después del formulario
    } catch (error) {
      console.error("Error al guardar simulación:", error);
      // No mostramos error al usuario para no interrumpir el flujo
    }
  };

  // Función para ejecutar la simulación
  const handleSimulate = async () => {
    if (!selectedProject) {
      setSimulationError("Debes seleccionar un proyecto");
      return;
    }

    setIsSimulating(true);
    setSimulationError(null);

    try {
      const response = await createSimulationAction({
        projectId: selectedProject.id,
        investmentValue: investmentAmount,
        installmentsNumber: installments,
      });

      if (response.success && response.data) {
        setSimulationData(response.data);
        
        // Guardar la simulación en el backend
        await saveSimulation(response.data);
        
        // Si no está autenticado y no ha enviado el lead, mostrar modal
        if (!user && !hasSubmittedLead) {
          setShowLeadModal(true);
        }
      } else {
        setSimulationError(response.error || "Error al crear la simulación");
      }
    } catch (error) {
      setSimulationError(
        error instanceof Error ? error.message : "Error al crear la simulación"
      );
    } finally {
      setIsSimulating(false);
    }
  };

  // Función para manejar el envío del formulario de leads
  const handleLeadSubmit = async (data: LeadFormData) => {
    // Parsear el número de teléfono
    const phoneData = parsePhoneData(data.phone);
    
    console.log("Lead capturado:", {
      ...data,
      phoneDetails: phoneData,
    });
    
    // Guardar la simulación con los datos del lead
    if (simulationData && selectedProject) {
      try {
        await saveSimulationAction(
          {
            countryCodePhone: phoneData.countryCode,
            email: data.email,
            installments,
            investmentValue: investmentAmount,
            leadOrigin: data.howDidYouHearAboutUs,
            name: `${data.firstName} ${data.lastName}`,
            phone: phoneData.phoneNumber,
            projectId: selectedProject.id,
            simulator: simulatorName,
            termsAccepted: data.termsAccepted,
            unitsQuantity: simulationData.unitsAmount,
            // Incluir parámetros UTM si existen
            ...(utmSource && { utmSource }),
            ...(utmMedium && { utmMedium }),
            ...(utmCampaign && { utmCampaign }),
            ...(utmTerm && { utmTerm }),
            ...(utmContent && { utmContent }),
          },
          false // isAuthenticated
        );

        // Ejecutar función de primera simulación con datos completos (usuario no autenticado)
        if (!hasSimulatedWithData) {
          onFirstSimulationWithData({
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            isAuthenticated: false,
          });
          setHasSimulatedWithData(true);
        }
      } catch (error) {
        console.error("Error al guardar simulación con datos del lead:", error);
      }
    }
    
    // Marcar que el usuario ya envió sus datos
    setHasSubmittedLead(true);
    setShowLeadModal(false);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configuración de Simulación</CardTitle>
          <CardDescription>
            Selecciona un proyecto y configura los parámetros de inversión
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Select para seleccionar proyecto */}
          <div className="space-y-2">
            <Label htmlFor="project-select">Proyecto</Label>
            {isLoadingProjects ? (
              <div className="flex items-center gap-2 p-3 border rounded-md bg-muted/50">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
                <span className="text-sm text-muted-foreground">
                  Cargando proyectos disponibles...
                </span>
              </div>
            ) : projectsError ? (
              <div className="p-3 border border-destructive/50 rounded-md bg-destructive/10">
                <p className="text-sm text-destructive">{projectsError}</p>
              </div>
            ) : (
              <Select
                value={selectedProject?.id || ""}
                onValueChange={(value) => {
                  const project = availableProjects.find((p) => p.id === value);
                  if (project) {
                    setSelectedProject(project);
                  }
                }}
                disabled={availableProjects.length === 0}
              >
                <SelectTrigger id="project-select">
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
                      {project.name} - {project.city}, {project.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {selectedProject && (
            <>
              {/* Select para número de cuotas */}
              <div className="space-y-2">
                <Label htmlFor="installments-select">
                  Número de Cuotas (máx: {maxInstallments})
                </Label>
                <Select
                  value={installments.toString()}
                  onValueChange={(value) => setInstallments(parseInt(value))}
                >
                  <SelectTrigger id="installments-select">
                    <SelectValue placeholder="Selecciona el número de cuotas" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: maxInstallments }, (_, i) => i + 1).map(
                      (num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? "cuota" : "cuotas"}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Slider para monto de inversión */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="investment-slider">Monto de Inversión</Label>
                  <span className="text-lg font-semibold text-primary">
                    {formatCurrency(investmentAmount)}
                  </span>
                </div>
                <Slider
                  id="investment-slider"
                  min={minInvestment}
                  max={maxInvestment}
                  step={selectedProject.unitPrice}
                  value={[investmentAmount]}
                  onValueChange={([value]) => setInvestmentAmount(value)}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{formatCurrency(minInvestment)}</span>
                  <span>{formatCurrency(maxInvestment)}</span>
                </div>
              </div>

              {/* Información del proyecto seleccionado */}
              <div className="pt-4 border-t">
                <h3 className="font-semibold mb-3">Detalles del Proyecto</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Precio por Unidad:</p>
                    <p className="font-medium">
                      {formatCurrency(selectedProject.unitPrice)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Inversión Mínima:</p>
                    <p className="font-medium">{formatCurrency(minInvestment)}</p>
                  </div>
    <div>
                    <p className="text-muted-foreground">Renta Mensual:</p>
                    <p className="font-medium">
                      {formatCurrency(selectedProject.minRent)} -{" "}
                      {formatCurrency(selectedProject.maxRent)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Fase:</p>
                    <p className="font-medium">{selectedProject.phase}</p>
                  </div>
                </div>
              </div>

              {/* Botón para simular */}
              <Button
                onClick={handleSimulate}
                disabled={isSimulating || !selectedProject}
                className="w-full"
                size="lg"
              >
                {isSimulating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Simulando...
                  </>
                ) : (
                  "Simular Inversión"
                )}
              </Button>

              {simulationError && (
                <div className="p-3 border border-destructive/50 rounded-md bg-destructive/10">
                  <p className="text-sm text-destructive">{simulationError}</p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Resultados de la simulación */}
      {simulationData && selectedProject && (
        <SimulationResults
          simulationData={simulationData}
          projectName={selectedProject.name}
          isBlurred={!user && !hasSubmittedLead}
        />
      )}

              {/* Modal de captura de leads */}
              <LeadCaptureModal
                isOpen={showLeadModal}
                onClose={() => setShowLeadModal(false)}
                onSubmit={handleLeadSubmit}
                onLoginRedirect={() => {
                  // Guardar estado actual antes de redirigir al login
                  useSimulatorStore.getState().saveSimulationState();
                }}
              />
    </div>
  );
}
