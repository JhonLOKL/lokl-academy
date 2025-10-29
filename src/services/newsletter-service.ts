import { postApi } from "@/schemas/api-schema"

export const subscribeToNewsletter = async (email: string) => {
    try {
        const response = await postApi(`/api/newsletter/`, { email })
        return { data: response }
    } catch (error) {
        throw error
    }
}