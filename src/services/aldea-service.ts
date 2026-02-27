import axios from "axios";
export { upsertLeadService as upsertAldeaLeadService } from "@/services/user-service";
export type { } from "@/services/user-service";

export interface WhatsAppAldeaMessageInput {
    name: string;
    projectId: string;
    email: string;
    numberToSend: string;
}

export const sendAldeaMessageService = async (input: WhatsAppAldeaMessageInput) => {
    try {
        const url = `/api/aldea/sendMessage`;
        const response = await axios.post(url, input);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status) {
            return error.response.data;
        }
        throw error;
    }
};

export interface EnrollLeadInput {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    countryPhoneCode: string;
    leadOrigin: string;
    projectIds: string[];
}

export const enrollLeadService = async (input: EnrollLeadInput) => {
    try {
        const url = `/api/aldea/enrollment`;
        const response = await axios.post(url, input);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status) {
            return error.response.data;
        }
        throw error;
    }
};
