import { create } from 'zustand';
import { ProjectCard } from '@/schemas/project-card-schema';

export interface SimulationData {
  selectedProject: ProjectCard | null;
  investmentAmount: number;
  installments: number;
  availableProjects: ProjectCard[];
  isLoadingProjects: boolean;
  projectsError: string | null;
}

interface SimulatorState extends SimulationData {
  setSelectedProject: (project: ProjectCard | null) => void;
  setInvestmentAmount: (amount: number) => void;
  setInstallments: (installments: number) => void;
  setAvailableProjects: (projects: ProjectCard[]) => void;
  setLoadingProjects: (loading: boolean) => void;
  setProjectsError: (error: string | null) => void;
  resetSimulation: () => void;
}

const initialState: SimulationData = {
  selectedProject: null,
  investmentAmount: 0,
  installments: 1,
  availableProjects: [],
  isLoadingProjects: false,
  projectsError: null,
};

export const useSimulatorStore = create<SimulatorState>((set) => ({
  ...initialState,

  setSelectedProject: (project) => set({ 
    selectedProject: project,
    // Resetear el monto al mínimo del proyecto seleccionado
    investmentAmount: project ? project.unitPrice * project.minInvestmentUnits : 0,
    // Resetear cuotas al mínimo
    installments: 1,
  }),

  setInvestmentAmount: (amount) => set({ investmentAmount: amount }),

  setInstallments: (installments) => set({ installments }),

  setAvailableProjects: (projects) => set((state) => {
    // Si no hay proyecto seleccionado y hay proyectos disponibles, seleccionar el primero
    const shouldSelectFirst = !state.selectedProject && projects.length > 0;
    const firstProject = shouldSelectFirst ? projects[0] : null;
    
    return {
      availableProjects: projects,
      selectedProject: shouldSelectFirst ? firstProject : state.selectedProject,
      investmentAmount: shouldSelectFirst && firstProject 
        ? firstProject.unitPrice * firstProject.minInvestmentUnits 
        : state.investmentAmount,
      isLoadingProjects: false,
      projectsError: null,
    };
  }),

  setLoadingProjects: (loading) => set({ isLoadingProjects: loading }),
  
  setProjectsError: (error) => set({ projectsError: error, isLoadingProjects: false }),

  resetSimulation: () => set(initialState),
}));

