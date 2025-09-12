import { getUserProfileService } from "@/services/user-service"

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
