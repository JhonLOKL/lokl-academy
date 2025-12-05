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

