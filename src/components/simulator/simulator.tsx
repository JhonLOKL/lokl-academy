"use client";

import React, { useEffect } from "react";
import SimulatorRedesigned from "./simulator-redesigned";
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
    <div id="simulador" className="scroll-mt-20 bg-gradient-to-b from-slate-50 to-white">
      <SimulatorRedesigned simulatorName={simulatorName} />
    </div>
  );
}