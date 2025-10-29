"use client";

import { useState, useEffect } from "react";
import { useSimulatorStore } from "@/store/simulator-store";
import { useAuthStore } from "@/store/auth-store";
import { useUtmStore } from "@/store/utm-store";
import { getProjectCardsAction } from "@/actions/project-actions";
import { createSimulationAction, saveSimulationAction } from "@/actions/simulator-actions";
import { upsertLeadAction } from "@/actions/user-action";
import { SimulationData } from "@/schemas/simulator-schema";
import { LeadFormData } from "@/schemas/lead-schema";
import { parsePhoneData } from "@/lib/phone-utils";

// Importar componentes de fases
import Phase1Config from "./phases/phase-1-config";
import ProjectPreview from "./phases/project-preview";
import Phase2LeadCapture from "./phases/phase-2-lead-capture";
import ResultsBlurred from "./phases/results-blurred";
import Phase3Summary from "./phases/phase-3-summary";
import ResultsFinal from "./phases/results-final";

interface SimulatorRedesignedProps {
  simulatorName?: string;
}

export default function SimulatorRedesigned({
  simulatorName = "Simulador General",
}: SimulatorRedesignedProps) {
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

  const { user } = useAuthStore();
  const { utmSource, utmMedium, utmCampaign, utmTerm, utmContent } = useUtmStore();

  // Estados locales
  const [currentPhase, setCurrentPhase] = useState<1 | 2 | 3>(1);
  const [simulationData, setSimulationData] = useState<SimulationData | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationError, setSimulationError] = useState<string | null>(null);
  const [hasSubmittedLead, setHasSubmittedLead] = useState(false);
  const [hasSimulatedWithData, setHasSimulatedWithData] = useState(false);
  const [, setLeadFormData] = useState<LeadFormData | null>(null);

  // Cargar proyectos disponibles
  useEffect(() => {
    const loadProjects = async () => {
      setLoadingProjects(true);
      try {
        const response = await getProjectCardsAction();
        if (response.success && response.projects) {
          const validProjects = response.projects.filter(
            (project) => project.phase !== "Etapa 0"
          );
          setAvailableProjects(validProjects);
        } else {
          setProjectsError(response.error || "Error al cargar proyectos");
        }
      } catch (error) {
        setProjectsError(
          error instanceof Error ? error.message : "Error al cargar proyectos"
        );
      }
    };

    if (availableProjects.length === 0 && !isLoadingProjects) {
      loadProjects();
    }
  }, [availableProjects.length, isLoadingProjects, setAvailableProjects, setLoadingProjects, setProjectsError]);

  // Handlers
  const handleProjectChange = (projectId: string) => {
    const project = availableProjects.find((p) => p.id === projectId);
    if (project) {
      setSelectedProject(project);
    }
  };

  const handleCalculate = async () => {
    if (!selectedProject) {
      setSimulationError("Debes seleccionar un proyecto");
      return;
    }

    setIsSimulating(true);
    setSimulationError(null);

    try {
      // Si installments es 1 (pago único), enviar 0 a la API
      const installmentsToSend = installments === 1 ? 0 : installments;

      const response = await createSimulationAction({
        projectId: selectedProject.id,
        investmentValue: investmentAmount,
        installmentsNumber: installmentsToSend,
      });

      if (response.success && response.data) {
        setSimulationData(response.data);

        // Si el usuario está autenticado, ir directo a fase 3
        if (user) {
          await saveSimulationWithAuth(response.data);
          setCurrentPhase(3);
        } else {
          // Si no está autenticado, ir a fase 2
          setCurrentPhase(2);
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

  // Handler para recalcular desde la fase 3
  const handleRecalculate = async () => {
    if (!selectedProject) {
      setSimulationError("Debes seleccionar un proyecto");
      return;
    }

    setIsSimulating(true);
    setSimulationError(null);

    try {
      // Si installments es 1 (pago único), enviar 0 a la API
      const installmentsToSend = installments === 1 ? 0 : installments;

      const response = await createSimulationAction({
        projectId: selectedProject.id,
        investmentValue: investmentAmount,
        installmentsNumber: installmentsToSend,
      });

      if (response.success && response.data) {
        setSimulationData(response.data);

        // Guardar la nueva simulación (el usuario ya tiene datos)
        if (user) {
          await saveSimulationWithAuth(response.data);
        } else if (hasSubmittedLead) {
          // Si ya envió el lead, también guardamos
          // Nota: aquí necesitarías guardar los datos del lead en un state si quieres
          // guardar simulaciones subsecuentes. Por ahora solo actualizamos los resultados.
          console.log("Simulación actualizada - lead ya enviado");
        }

        // Permanecer en fase 3
        setCurrentPhase(3);
      } else {
        setSimulationError(response.error || "Error al recalcular la simulación");
      }
    } catch (error) {
      setSimulationError(
        error instanceof Error ? error.message : "Error al recalcular la simulación"
      );
    } finally {
      setIsSimulating(false);
    }
  };

  const saveSimulationWithAuth = async (simData: SimulationData) => {
    if (!selectedProject || !user) return;

    try {
      // Si installments es 1 (pago único), enviar 0 a la API
      const installmentsToSend = installments === 1 ? 0 : installments;

      await saveSimulationAction(
        {
          email: user.email,
          installments: installmentsToSend,
          investmentValue: investmentAmount,
          name: `${user.firstName} ${user.lastName}`,
          projectId: selectedProject.id,
          simulator: simulatorName,
          termsAccepted: true,
          unitsQuantity: simData.unitsAmount,
          ...(utmSource && { utmSource }),
          ...(utmMedium && { utmMedium }),
          ...(utmCampaign && { utmCampaign }),
          ...(utmTerm && { utmTerm }),
          ...(utmContent && { utmContent }),
        },
        true
      );

      // Ejecutar función de primera simulación con datos completos
      if (!hasSimulatedWithData) {
        onFirstSimulationWithData({
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          isAuthenticated: true,
          ...(user.phone && { phone: user.phone }),
          ...(user.leadOrigin && { leadOrigin: user.leadOrigin }),
        });
        setHasSimulatedWithData(true);
      }
    } catch (error) {
      console.error("Error al guardar simulación:", error);
    }
  };

  const handleLeadSubmit = async (data: LeadFormData) => {
    const phoneData = parsePhoneData(data.phone);
    
    // Guardar datos del formulario para usar en onFirstSimulationWithData
    setLeadFormData(data);

    if (simulationData && selectedProject) {
      try {
        // Si installments es 1 (pago único), enviar 0 a la API
        const installmentsToSend = installments === 1 ? 0 : installments;

        await saveSimulationAction(
          {
            countryCodePhone: phoneData.countryCode,
            email: data.email,
            installments: installmentsToSend,
            investmentValue: investmentAmount,
            leadOrigin: data.howDidYouHearAboutUs,
            name: `${data.firstName} ${data.lastName}`,
            phone: phoneData.phoneNumber,
            projectId: selectedProject.id,
            simulator: simulatorName,
            termsAccepted: data.termsAccepted,
            unitsQuantity: simulationData.unitsAmount,
            ...(utmSource && { utmSource }),
            ...(utmMedium && { utmMedium }),
            ...(utmCampaign && { utmCampaign }),
            ...(utmTerm && { utmTerm }),
            ...(utmContent && { utmContent }),
          },
          false
        );

        // Ejecutar función de primera simulación con datos completos
        if (!hasSimulatedWithData) {
          onFirstSimulationWithData({
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            isAuthenticated: false,
            phone: phoneData.fullPhone,
            leadOrigin: data.howDidYouHearAboutUs,
          });
          setHasSimulatedWithData(true);
        }

        setHasSubmittedLead(true);
        setCurrentPhase(3);
      } catch (error) {
        console.error("Error al guardar simulación con datos del lead:", error);
      }
    }
  };

  const onFirstSimulationWithData = async (userData: {
    name: string;
    email: string;
    isAuthenticated: boolean;
    phone?: string;
    leadOrigin?: string;
  }) => {
    try {
      // Extraer firstName del nombre completo
      const nameParts = userData.name.split(' ');
      const firstName = nameParts[0] || '';

      // Preparar datos para upsertLeadAction
      const leadData = {
        email: userData.email,
        firstName: firstName,
        ...(selectedProject && { project: selectedProject.name }),
        ...(userData.phone && { phone: userData.phone }),
        ...(userData.leadOrigin && { leadOrigin: userData.leadOrigin }),
        ...(utmSource && { utmSource }),
        ...(utmMedium && { utmMedium }),
        ...(utmCampaign && { utmCampaign }),
        ...(utmTerm && { utmTerm }),
        ...(utmContent && { utmContent }),
        origin: 'Simulador',
        status: userData.isAuthenticated ? 'Interesado' : 'Interesado',
      };

      console.log('Guardando lead por primera vez:', leadData);
      const response = await upsertLeadAction(leadData);
      
      if (response.success) {
        console.log('✅ Lead guardado exitosamente en primera simulación');
      } else {
        console.error('❌ Error al guardar lead:', response.message);
      }
    } catch (error) {
      console.error('❌ Error en onFirstSimulationWithData:', error);
    }
  };

  const handleLoginRedirect = () => {
    useSimulatorStore.getState().saveSimulationState();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-[#5352F6]">Simulador</span> de inversiones
        </h2>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Calcula el retorno de tu inversión y descubre cómo hacer crecer tu patrimonio con LOKL
        </p>
      </div>

      {/* Contenido de fases */}
      <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Columna Izquierda */}
        <div>
          {currentPhase === 1 && (
            <Phase1Config
              selectedProject={selectedProject}
              availableProjects={availableProjects}
              isLoadingProjects={isLoadingProjects}
              projectsError={projectsError}
              investmentAmount={investmentAmount}
              installments={installments}
              onProjectChange={handleProjectChange}
              onInvestmentChange={setInvestmentAmount}
              onInstallmentsChange={setInstallments}
              onCalculate={handleCalculate}
              isCalculating={isSimulating}
            />
          )}

          {currentPhase === 2 && (
            <Phase2LeadCapture
              onSubmit={handleLeadSubmit}
              onLoginRedirect={handleLoginRedirect}
            />
          )}

          {currentPhase === 3 && selectedProject && simulationData && (
            <Phase3Summary
              project={selectedProject}
              simulationData={simulationData}
              investmentAmount={investmentAmount}
              installments={installments}
              availableProjects={availableProjects}
              onProjectChange={handleProjectChange}
              onInvestmentChange={setInvestmentAmount}
              onInstallmentsChange={setInstallments}
              onRecalculate={handleRecalculate}
              isRecalculating={isSimulating}
            />
          )}
        </div>

        {/* Columna Derecha */}
        <div>
          {currentPhase === 1 && selectedProject && (
            <ProjectPreview project={selectedProject} />
          )}

          {currentPhase === 2 && selectedProject && simulationData && (
            <ResultsBlurred
              project={selectedProject}
              simulationData={simulationData}
            />
          )}

          {currentPhase === 3 && selectedProject && simulationData && (
            <ResultsFinal
              project={selectedProject}
              simulationData={simulationData}
            />
          )}
        </div>
      </div>

      {/* Error message */}
      {simulationError && (
        <div className="max-w-7xl mx-auto mt-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            {simulationError}
          </div>
        </div>
      )}
    </div>
  );
}

