import { getAboutUsService } from "@/services/aboutus-service";

export const getAboutUsAction = async () => {
    try {
        const response = await getAboutUsService();
        
        if (response && response?.success) {
            return {
                success: true,
                message: "Indicadores obtenidos correctamente",
                data: response.data
            };
        }
        
        return response;
    } catch (error) {
        console.error("Error al obtener los indicadores de About Us:", error);
        return {
            success: false,
            message: "Error al obtener los indicadores",
            error: "Error al obtener los indicadores"
        };
    }
};

/**
 * Alias para obtener indicadores del home (reutiliza el servicio de About Us)
 */
export const getHomeIndicatorsAction = getAboutUsAction;