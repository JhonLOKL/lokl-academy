import { subscribeToNewsletter } from "@/services/newsletter-service"

export const subscribeToNewsletterAction = async (email: string) => {
    try {
        const response = await subscribeToNewsletter(email)
        return { data: response }
    } catch (error) {
        console.error("Error al suscribirse al newsletter", error)
        return {
            success: false,
            message: "Error al suscribirse al newsletter",
            error: "Error al suscribirse al newsletter"
        }
    }
}