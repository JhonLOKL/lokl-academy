import {
    getProjectCardsService,
    getProjectHomePageInfoByCodeService,
    ProjectHomePageInfo,
} from "@/services/projectService";
import { ProjectCardsResponse } from "@/schemas/project-card-schema";
import { useProjectStore } from "@/store/project-store";

export const getProjectCardsAction = async (): Promise<ProjectCardsResponse> => {
    // Obtener el estado actual del store
    const store = useProjectStore.getState();
    
    // Si no debemos hacer fetch (ya está cargando o el cache es válido), retornar los datos existentes
    if (!store.shouldFetch()) {
        return {
            success: true,
            projects: store.projects,
        };
    }

    try {
        // Marcar como loading
        store.setLoading(true);
        
        // Obtener proyectos desde el servicio
        const projects = await getProjectCardsService();
        
        // Actualizar el store con los proyectos
        store.setProjects(projects);
        // Marcar fin de carga
        store.setLoading(false);
        
        return {
            success: true,
            projects: projects,
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Error al obtener las tarjetas de proyectos.";
        
        console.error("Error al obtener las tarjetas de proyectos.", error);
        
        // Actualizar el store con el error
        store.setError(errorMessage);
        
        return {
            success: false,
            error: errorMessage,
            projects: [],
        };
    }
}

type ProjectHomePageInfoActionResponse =
    | { success: true; data: ProjectHomePageInfo }
    | { success: false; error: string };

const getProjectHomePageInfo = async (
    projectCode: string
): Promise<ProjectHomePageInfoActionResponse> => {
    try {
        const data = await getProjectHomePageInfoByCodeService(projectCode);

        return {
            success: true,
            data,
        };
    } catch (error) {
        const errorMessage =
            error instanceof Error
                ? error.message
                : "Error al obtener la información del home del proyecto.";

        console.error("Error al obtener la información del home del proyecto.", error);

        return {
            success: false,
            error: errorMessage,
        };
    }
};

export const getNidoDeAguaHomeInfoAction = () =>
    getProjectHomePageInfo("nido-de-agua");

export const getIndieUniverseHomeInfoAction = () =>
    getProjectHomePageInfo("indie-universe");