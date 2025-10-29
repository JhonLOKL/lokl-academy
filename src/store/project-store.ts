import { create } from 'zustand';
import { ProjectCard } from '@/schemas/project-card-schema';

interface ProjectState {
  projects: ProjectCard[];
  isLoading: boolean;
  error: string | null;
  lastFetchTime: number | null;
  setProjects: (projects: ProjectCard[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearProjects: () => void;
  shouldFetch: () => boolean;
}

// Cache válido por 5 minutos (300000 ms)
const CACHE_DURATION = 5 * 60 * 1000;

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  isLoading: false,
  error: null,
  lastFetchTime: null,

  setProjects: (projects) => set({ 
    projects, 
    lastFetchTime: Date.now(),
    error: null 
  }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error, isLoading: false }),

  clearProjects: () => set({ 
    projects: [], 
    isLoading: false, 
    error: null,
    lastFetchTime: null 
  }),

  // Determina si debemos hacer fetch o usar el cache
  shouldFetch: () => {
    const state = get();
    
    // Si ya está cargando, no hacer fetch
    if (state.isLoading) return false;
    
    // Si no hay proyectos, hacer fetch
    if (state.projects.length === 0) return true;
    
    // Si no hay lastFetchTime, hacer fetch
    if (!state.lastFetchTime) return true;
    
    // Si el cache expiró, hacer fetch
    const now = Date.now();
    const timeSinceLastFetch = now - state.lastFetchTime;
    return timeSinceLastFetch > CACHE_DURATION;
  },
}));

