"use client";

import { useEffect } from "react";
import { ProjectCard } from "@/schemas/project-card-schema";
import { useSimulatorStore } from "@/store/simulator-store";
import SimulatorRedesigned from "./simulator-redesigned";

interface SimulatorProps {
  project?: ProjectCard;
  simulatorName?: string; // Nombre del simulador para tracking
  hideRightColumn?: boolean;
  defaultProjectCode?: string;
}

export default function Simulator({ 
  project, 
  simulatorName = "Simulador General",
  hideRightColumn,
  defaultProjectCode,
}: SimulatorProps) {
  const { setSelectedProject, selectedProject } = useSimulatorStore();

  // Si se pasa un proyecto como prop, establecerlo como seleccionado
  useEffect(() => {
    if (project && !selectedProject) {
      setSelectedProject(project);
    }
  }, [project, selectedProject, setSelectedProject]);

  return (
    <div className="scroll-mt-20 bg-gradient-to-b from-slate-50 to-white">
      <SimulatorRedesigned
        simulatorName={simulatorName}
        hideRightColumn={hideRightColumn}
        defaultProjectCode={defaultProjectCode}
      />
    </div>
  );
}