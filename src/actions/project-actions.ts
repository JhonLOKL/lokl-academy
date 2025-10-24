import { getProjectCards } from "@/services/projectService"

export const getProjectCardsAction = async () => {
    try {
        const response = await getProjectCards()
        return response
    } catch (error) {
        console.error("Error al obtener las tarjetas de proyectos.", error)
        return {
            success: false,
            error: "Error al obtener las tarjetas de proyectos.",
            data: []
        }
    }
}