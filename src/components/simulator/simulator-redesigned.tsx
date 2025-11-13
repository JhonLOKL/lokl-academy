"use client";

import { useState, useEffect, useRef } from "react";
import { useSimulatorStore } from "@/store/simulator-store";
import { useAuthStore } from "@/store/auth-store";
import { useUtmStore } from "@/store/utm-store";
import { getProjectCardsAction } from "@/actions/project-actions";
import { createSimulationAction, saveSimulationAction, createQuiivenContactAction, sendFirstMessageAction } from "@/actions/simulator-actions";
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
import InvestorLevelsBanner from "./investor-levels-banner";

interface SimulatorRedesignedProps {
  simulatorName?: string;
  hideRightColumn?: boolean;
  defaultProjectCode?: string;
}

export default function SimulatorRedesigned({
  simulatorName = "Simulador General",
  hideRightColumn,
  defaultProjectCode,
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
    prefetchedSimulationData,
    setPrefetchedSimulationData,
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
  const [leadFormData, setLeadFormData] = useState<LeadFormData | null>(null);
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Detectar cuando el simulador entra al viewport para diferir la carga de proyectos
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredViewport(true);
          observer.disconnect();
        }
      },
      { root: null, threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Si hay una simulación precalculada (desde el hero), úsala y muestra fase 3 directamente
  useEffect(() => {
    if (prefetchedSimulationData) {
      setSimulationData(prefetchedSimulationData);
      setCurrentPhase(3);
      setHasSimulatedWithData(true);
      setPrefetchedSimulationData(null);
    }
  }, [prefetchedSimulationData, setPrefetchedSimulationData]);

  // Cargar proyectos disponibles cuando el simulador sea visible
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
      } finally {
        setLoadingProjects(false);
      }
    };

    if (!hasEnteredViewport) {
      return;
    }

    if (availableProjects.length === 0 && !isLoadingProjects) {
      loadProjects();
    }
  }, [hasEnteredViewport, availableProjects.length, isLoadingProjects, setAvailableProjects, setLoadingProjects, setProjectsError]);

  // Seleccionar proyecto por defecto según la página
  useEffect(() => {
    if (!defaultProjectCode || availableProjects.length === 0) {
      return;
    }

    const projectByCode = availableProjects.find(
      (project) => project.projectCode === defaultProjectCode
    );

    if (!projectByCode) {
      return;
    }

    const isDifferentProject =
      !selectedProject || selectedProject.projectCode !== projectByCode.projectCode;

    if (isDifferentProject) {
      setSelectedProject(projectByCode);
    }
  }, [availableProjects, defaultProjectCode, selectedProject, setSelectedProject]);

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
        const newSimulationData = response.data;
        setSimulationData(newSimulationData);

        // Guardar la nueva simulación (el usuario ya tiene datos)
        if (user) {
          await saveSimulationWithAuth(newSimulationData);
        } else if (hasSubmittedLead && leadFormData) {
          await saveSimulationWithLeadData(newSimulationData, leadFormData);
        } else if (hasSubmittedLead && !leadFormData) {
          console.warn("Lead marcado como enviado pero sin datos almacenados");
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

  const saveSimulationWithLeadData = async (
    simData: SimulationData,
    leadData: LeadFormData
  ) => {
    if (!selectedProject) return;

    try {
      const phoneData = parsePhoneData(leadData.phone);
      // Si installments es 1 (pago único), enviar 0 a la API
      const installmentsToSend = installments === 1 ? 0 : installments;

      await saveSimulationAction(
        {
          countryCodePhone: phoneData.countryCode,
          email: leadData.email,
          installments: installmentsToSend,
          investmentValue: investmentAmount,
          leadOrigin: leadData.howDidYouHearAboutUs,
          name: `${leadData.firstName} ${leadData.lastName}`,
          phone: phoneData.phoneNumber,
          projectId: selectedProject.id,
          simulator: simulatorName,
          termsAccepted: leadData.termsAccepted,
          unitsQuantity: simData.unitsAmount,
          ...(utmSource && { utmSource }),
          ...(utmMedium && { utmMedium }),
          ...(utmCampaign && { utmCampaign }),
          ...(utmTerm && { utmTerm }),
          ...(utmContent && { utmContent }),
        },
        false
      );
    } catch (error) {
      console.error("Error al guardar simulación para lead:", error);
    }
  };

  const handleLeadSubmit = async (data: LeadFormData) => {
    const phoneData = parsePhoneData(data.phone);
    
    // Guardar datos del formulario para usar en onFirstSimulationWithData
    setLeadFormData(data);

    if (simulationData && selectedProject) {
      try {
        await saveSimulationWithLeadData(simulationData, data);

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

      // 1. Guardar lead en CRM (upsertLeadAction)
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

      // 2. Enviar datos a Quiiven (solo si hay datos de simulación)
      if (simulationData && selectedProject) {
        const quiivenData = {
          name: userData.name,
          email: userData.email,
          investmentValue: investmentAmount.toString(),
          shares: simulationData.unitsAmount,
          numberInstallments: installments === 1 ? 0 : installments,
          phone: userData.phone || '',
          termsAccepted: true,
          leadOrigin: userData.leadOrigin || 'Simulador',
          utmSource,
          utmMedium,
          utmCampaign,
          utmTerm,
          utmContent,
        };

        console.log('Enviando datos a Quiiven:', quiivenData);
        const quiivenResponse = await createQuiivenContactAction(quiivenData);
        
        if (quiivenResponse.success) {
          console.log('✅ Contacto creado exitosamente en Quiiven');
        } else {
          console.error('❌ Error al crear contacto en Quiiven:', quiivenResponse.error);
        }

        // 3. Enviar mensaje de WhatsApp (solo si hay teléfono)
        if (userData.phone) {
          const whatsappData = {
            name: userData.name,
            projectId: selectedProject.id,
            email: userData.email,
            numberToSend: userData.phone,
          };

          console.log('📱 Enviando mensaje de WhatsApp:', whatsappData);
          const whatsappResponse = await sendFirstMessageAction(whatsappData);
          
          if (whatsappResponse.success) {
            if (whatsappResponse.skipped) {
              console.log('⏱️ Mensaje de WhatsApp omitido:', whatsappResponse.message);
            } else {
              console.log('✅ Mensaje de WhatsApp enviado exitosamente');
            }
          } else {
            console.error('❌ Error al enviar mensaje de WhatsApp:', whatsappResponse.error);
          }
        } else {
          console.log('⚠️ No se envió mensaje de WhatsApp: teléfono no disponible');
        }
      }
    } catch (error) {
      console.error('❌ Error en onFirstSimulationWithData:', error);
    }
  };

  const handleLoginRedirect = () => {
    useSimulatorStore.getState().saveSimulationState();
  };

  return (
    <div ref={containerRef} className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-[#5352F6]">Simulador</span> de inversiones
        </h2>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Calcula el retorno de tu inversión y descubre cómo hacer crecer tu patrimonio con LOKL
        </p>
      </div>

      {/* Banner de niveles de inversionista - Desktop: antes de columnas */}
      {selectedProject && (
        <div className="hidden md:block">
          <InvestorLevelsBanner
            currentUnits={Math.round(investmentAmount / (selectedProject.unitPrice || 1))}
            onUnitsChange={(units) => {
              const newAmount = units * selectedProject.unitPrice;
              setInvestmentAmount(newAmount);
            }}
          />
        </div>
      )}

      {/* Contenido de fases */}
      <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto" data-simulator-section>
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
        <div className={hideRightColumn && currentPhase !== 3 ? "hidden" : ""}>
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
              bannerComponent={
                <InvestorLevelsBanner
                  currentUnits={Math.round(investmentAmount / selectedProject.unitPrice)}
                  onUnitsChange={(units) => {
                    const newAmount = units * selectedProject.unitPrice;
                    setInvestmentAmount(newAmount);
                  }}
                />
              }
            />
          )}
        </div>
      </div>

      {/* Banner de niveles de inversionista - Mobile: después de columnas (solo fases 1 y 2) */}
      {selectedProject && currentPhase !== 3 && (
        <div className="md:hidden max-w-7xl mx-auto mt-8">
          <InvestorLevelsBanner
            currentUnits={Math.round(investmentAmount / (selectedProject.unitPrice || 1))}
            onUnitsChange={(units) => {
              const newAmount = units * selectedProject.unitPrice;
              setInvestmentAmount(newAmount);
            }}
          />
        </div>
      )}

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

