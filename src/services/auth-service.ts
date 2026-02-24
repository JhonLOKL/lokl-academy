import { postApi } from "@/schemas/api-schema"
import axios from "axios"

export const signInService = async ({ email, password }: { email: string, password: string }) => {
    try {
        const url = `/api/auth/signIn`
        return await postApi(url, { email, password })
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status) {
            return error.response.data
        }
    }
}

export const signUpService = async ({ email, password, countryPhoneCode, firstName, lastName, phone, leadOrigin, pageOrigin, referralCode, termsAccepted, utmSource, utmMedium, utmCampaign, utmTerm, utmContent }: { email: string, password: string, countryPhoneCode: string, firstName: string, lastName: string, phone: string, leadOrigin: string, pageOrigin: string, referralCode: string, termsAccepted: boolean, utmSource?: string, utmMedium?: string, utmCampaign?: string, utmTerm?: string, utmContent?: string }) => {
    try {
        const url = `/api/auth/signUp`
        // leadOrigin debe reflejar la selección del usuario ("¿Cómo nos conociste?")
        // (si llega vacío, usar fallback para no enviar undefined)
        const resolvedLeadOrigin = leadOrigin?.trim() ? leadOrigin : "Registro academy"
        return await postApi(url, { email, password, countryPhoneCode, firstName, lastName, phone, leadOrigin: resolvedLeadOrigin, pageOrigin, referralCode, termsAccepted, utmSource, utmMedium, utmCampaign, utmTerm, utmContent })
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status) {
            return error.response.data
        }
    }
}