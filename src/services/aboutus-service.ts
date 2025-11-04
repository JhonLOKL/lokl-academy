import axios from "axios";
import { getApi } from "@/schemas/api-schema";


export const getAboutUsService = async () => {
    try {
        const url = `/api/businessInsiths/summaryInvestment`;
        return await getApi(url, true); 
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status) {
            return error.response.data;
        }
        throw error;
    }
};


export const getHomeIndicators = getAboutUsService;
