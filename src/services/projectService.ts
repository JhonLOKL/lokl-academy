import axios from "axios";
import { getApi } from "@/schemas/api-schema";
import { ProjectCard, ProjectCardsArraySchema } from "@/schemas/project-card-schema";

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