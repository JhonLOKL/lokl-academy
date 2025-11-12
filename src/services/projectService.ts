import axios from "axios";
import { getApi } from "@/schemas/api-schema";
import { ProjectCard, ProjectCardsArraySchema } from "@/schemas/project-card-schema";

export type ProjectDetail = Record<string, unknown>;

export type ProjectHomePageInfo = Record<string, unknown>;

export const getProjectCardsService = async (): Promise<ProjectCard[]> => {
    try {
        const url = `/api/project/cards`;
        const response = await getApi(url);
        
        // Si la respuesta es un objeto con una propiedad que contiene el array
        const dataToValidate = Array.isArray(response) 
            ? response 
            : response?.data || response?.projects || response;
        
        // Validar y parsear la respuesta con el schema
        const validatedData = ProjectCardsArraySchema.parse(dataToValidate);
        return validatedData;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error en la API de proyectos:", error.response?.data);
            throw new Error(error.response?.data?.message || "Error al obtener proyectos");
        }
        console.error("Error al validar proyectos:", error);
        throw error;
    }
}

export const getProjectByIdService = async (id: string): Promise<ProjectDetail> => {
    try {
        const url = `/api/project/${id}`;
        const response = await getApi(url);
        return response as ProjectDetail;
    } catch (error) {
        console.error("Error al obtener proyecto:", error);
        throw error;
    }
}

export const getProjectHomePageInfoByCodeService = async (
    projectCode: string
): Promise<ProjectHomePageInfo> => {
    try {
        const url = `/api/project/homePage/${encodeURIComponent(projectCode)}`;
        const response = await getApi(url, true);
        return response as ProjectHomePageInfo;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error al obtener información del home del proyecto:", error.response?.data);
            throw new Error(
                error.response?.data?.message || "Error al obtener información del home del proyecto"
            );
        }
        console.error("Error al obtener información del home del proyecto:", error);
        throw error;
    }
};