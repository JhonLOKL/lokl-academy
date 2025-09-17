import { getApi } from "@/schemas/api-schema"
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
