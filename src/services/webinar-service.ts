import { getApi, postApi } from "@/schemas/api-schema"
import axios from "axios"

export const getWebinarsService = async () => {
    try {
        const url = `/api/academy/webinars`
        return await getApi(url,true)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status) {
            return error.response.data
        }
    }
}


export const enrollWebinarService = async (body: { webinarId: string }) => {
    try {
        const url = `/api/academy/enroll/webinar`
        return await postApi(url, body, true)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status) {
            return error.response.data
        }
    }
}

export const getAllEnrolledWebinarsService = async () => {
    try {
        const url = `/api/academy/enroll/webinar`
        return await getApi(url,true)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status) {
            return error.response.data
        }
    }
}
