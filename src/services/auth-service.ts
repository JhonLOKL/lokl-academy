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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const signUpService = async ({ email, password, countryPhoneCode, firstName, lastName, phone, leadOrigin, pageOrigin, referralCode, termsAccepted }: { email: string, password: string, countryPhoneCode: string, firstName: string, lastName: string, phone: string, leadOrigin: string, pageOrigin: string, referralCode: string, termsAccepted: boolean }) => {
    try {
        const url = `/api/auth/signUp`
        const fixLeadOrigin = 'Registro academy'
        return await postApi(url, { email, password, countryPhoneCode, firstName, lastName, phone, leadOrigin: fixLeadOrigin, pageOrigin, referralCode, termsAccepted })
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status) {
            return error.response.data
        }
    }
}