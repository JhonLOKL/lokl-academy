import { getApi, postApi } from "@/schemas/api-schema"
import axios from "axios"

export const getUserProfileService = async () => {
    try {
        const url = `/api/user`
        return await getApi(url, true)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status) {
            return error.response.data
        }
    }
}

export const upsertLeadService = async (leadData: {
    email: string
    firstName: string
    lastName?: string
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
        const url = `/api/sheets/upsertLead`
        return await postApi(url, leadData, true)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status) {
            return error.response.data
        }
        throw error
    }
}