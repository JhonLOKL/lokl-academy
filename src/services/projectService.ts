import axios from "axios"
import { getApi } from "@/schemas/api-schema"

export const getProjectCards = async () => {
    try {
        const url = `/api/project/cards`
        return await getApi(url)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status) {
            return error.response.data
        }
    }
}