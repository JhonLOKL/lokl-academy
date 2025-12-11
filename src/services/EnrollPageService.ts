import { postApi, getApi, patchApi } from "@/schemas/api-schema"
import axios from "axios"

export const enrollPageService = async (body: {
    name: string
    notes: Record<string, unknown>
}) => {
    try {
        const url = `/api/enroll/create-enroll`
        return await postApi(url, body, true)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status) {
            return error.response.data
        }
    }
}

export const getEnrollPageService = async () => {
    try {
        const url = `/api/enroll/get-enroll`
        return await getApi(url, true)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status) {
            return error.response.data
        }
    }
}

export const updateEnrollPageService = async (body: {
    notes: Record<string, unknown>
}) => {
    try {
        const url = `/api/enroll/update-enroll`
        return await patchApi(url, body, true)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status) {
            return error.response.data
        }
    }
}

export const sendRewardWebhook = async (body: {
    userId: string
    day: number
}) => {
    try {
        const url = 'https://lokl.app.n8n.cloud/webhook/e5e12389-5f17-4207-8fd4-f54515e0a6cf'
        return await axios.post(url, body)
    } catch (error) {
        console.error("Error sending reward webhook:", error)
        // No retornamos error para no interrumpir el flujo principal si el webhook falla
        return { success: false }
    }
}

