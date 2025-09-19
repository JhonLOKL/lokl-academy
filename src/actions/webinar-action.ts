import { getWebinarsService, enrollWebinarService } from "@/services/webinar-service"
import { Webinar } from "@/lib/webinar/schema"

export const getWebinarsAction = async (): Promise<{ webinars: Webinar[], error?: string }> => {
    try {
        const response = await getWebinarsService()
        if (!response?.success) {
            return {
                error: response.message,
                webinars: []
            }
        }
        return { webinars: response.data.webinars }
    } catch (error) {
        console.error("Error al obtener los webinars.", error)
        return {
            error: "Error al obtener los webinars, intente mas tarde.",
            webinars: []
        }
    }
}

export const enrollWebinarAction = async (body: { webinarId: string }): Promise<{ success: boolean, message: string, error?: string }> => {
    try {
        const response = await enrollWebinarService(body)
        if (!response?.success) {
            return {
                success: false,
                message: response.message,
                error: response.message,
            }
        }
        return {
            success: true,
            message: "Webinar inscrito correctamente",
            error: undefined,
        }
    } catch (error) {
        console.error("Error al inscribir al webinar, intente mas tarde.", error)
        return {
            success: false,
            message: "Error al inscribir al webinar, intente mas tarde.",
            error: "Error al inscribir al webinar, intente mas tarde."
        }
    }
}
