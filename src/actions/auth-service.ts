import { signInService, signUpService } from "@/services/auth-service";

export const signInAction = async ({ email, password }: { email: string, password: string }) => {
    try {
        const resp = await signInService({ email, password })
        if (!resp?.success) return { success: false, message: resp.message }
        return { success: true, message: resp.message, token: resp.data }
    } catch (error) {
        console.error(error)
        return { success: false, message: "Error al iniciar sesión" }
    }
}
export const signUpAction = async ({
    email,
    password,
    countryPhoneCode,
    firstName,
    lastName,
    phone,
    leadOrigin,
    pageOrigin,
    referralCode,
    termsAccepted
}: {
    email: string, password: string, countryPhoneCode: string, firstName: string, lastName: string,
    phone: string, leadOrigin: string, pageOrigin: string, referralCode: string, termsAccepted: boolean
}) => {
    try {
        const resp = await signUpService({ email, password, countryPhoneCode, firstName, lastName, phone, leadOrigin, pageOrigin, referralCode, termsAccepted })
        if (!resp?.success) return { success: false, message: resp.message }
        return { success: true, message: resp.message, token: resp.data.token }
    } catch (error) {
        console.error(error)
        return { success: false, message: "Error al iniciar sesión" }
    }
}