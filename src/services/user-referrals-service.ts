import axios from "axios";
import { getApi } from "@/schemas/api-schema";
import { UserReferralsResponse, UserReferralsResponseSchema } from "@/schemas/user-referrals-schema";

export async function getUserReferralsService(): Promise<UserReferralsResponse> {
  try {
    const response = await getApi("/api/user/referrals", true);
    
    // Validación opcional con Zod para asegurar tipos en runtime
    const parsed = UserReferralsResponseSchema.safeParse(response);
    if (!parsed.success) {
      console.warn("La respuesta de referidos no coincide con el esquema esperado:", parsed.error);
      // Retornamos la respuesta tal cual si falla el parseo estricto, o lanzamos error según preferencia.
      // Por ahora confiamos en el casting si la estructura básica es correcta.
    }

    return response as UserReferralsResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error en API de referidos:", error.response?.data);
      throw new Error(error.response?.data?.message || "Error al obtener referidos");
    }
    console.error("Error al obtener referidos:", error);
    throw error;
  }
}
