"use client";

import React, { useEffect } from "react";
import SimulatorPhase1 from "./simulator-phase-1";
import { ProjectCard } from "@/schemas/project-card-schema";
import { useSimulatorStore } from "@/store/simulator-store";

interface SimulatorProps {
  project?: ProjectCard;
  simulatorName?: string; // Nombre del simulador para tracking
}

export default function Simulator({ 
  project, 
  simulatorName = "Simulador General" 
}: SimulatorProps) {
  const { setSelectedProject, selectedProject } = useSimulatorStore();

  // Si se pasa un proyecto como prop, establecerlo como seleccionado
  useEffect(() => {
    if (project && !selectedProject) {
      setSelectedProject(project);
    }
  }, [project, selectedProject, setSelectedProject]);

  return (
    <div id="simulador" className="container mx-auto p-6 scroll-mt-20">
      <h2 className="text-3xl font-bold mb-6">Simulador de Retorno de Inversión</h2>
      <SimulatorPhase1 simulatorName={simulatorName} />
    </div>
  );
}