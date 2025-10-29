import { getUserProfileService, upsertLeadService } from "@/services/user-service"

export const getUserProfileAction = async () => {
    try {
        const response = await getUserProfileService()
        return response
    } catch (error) {
        console.error("Error al obtener el perfil del usuario:", error)
        return {
            success: false,
            message: "Error al obtener el perfil del usuario"
        }
    }
}

export const upsertLeadAction = async (leadData: {
    email: string
    firstName: string
    leadOrigin?: string
    origin?: string
    phone?: string
    project?: string
    status?: string
    utmSource?: string
    utmMedium?: string
    utmCampaign?: string
    utmTerm?: string
    utmContent?: string
}) => {
    try {
        const response = await upsertLeadService(leadData)
        return response
    } catch (error) {
        console.error("Error al crear/actualizar el lead:", error)
        return {
            success: false,
            message: "Error al crear/actualizar el lead"
        }
    }
}
