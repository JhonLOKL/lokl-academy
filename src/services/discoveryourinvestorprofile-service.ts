import axios from "axios";
import api from "@/lib/axios-config";
import {
  InvestorProfileInput,
  InvestorProfileInputSchema,
  InvestorProfileApiResponseSchema,
  CreateLeadInput,
  CreateLeadInputSchema,
  QuiivenFormContactInput,
  QuiivenFormContactInputSchema,
} from "@/schemas/investor-profile-schema";

/**
 * Función auxiliar para capitalizar palabras
 * @param str - Cadena a capitalizar
 * @returns Cadena con cada palabra capitalizada
 */
const CapitalizeWords = (str: string): string => {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Servicio para crear un perfil de inversor
 * @param input - Datos del perfil de inversor
 * @returns Respuesta de la API
 */
export const createInvestorProfileService = async (
  input: InvestorProfileInput
) => {
  try {
    // Validar los datos de entrada
    const validatedInput = InvestorProfileInputSchema.parse(input);

    // Preparar el payload
    const payload = {
      firstName: validatedInput.firstName,
      lastName: validatedInput.lastName,
      email: validatedInput.email,
      phone: validatedInput.phone,
      investorProfile: validatedInput.investorProfile,
      scores: validatedInput.scores,
      testResponses: validatedInput.testResponses,
      testVersion: validatedInput.testVersion,
    };

    // Hacer la petición a la API
    const response = await api.post(
      `/api/lead/investorProfile`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Validar la respuesta
    const validatedResponse = InvestorProfileApiResponseSchema.parse(response.data);

    return {
      success: true,
      message: "Perfil de inversor creado exitosamente",
      data: validatedResponse.data || response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error al crear perfil de inversor:", error.response?.data);
      throw new Error(
        error.response?.data?.message || "Error al crear el perfil de inversor"
      );
    }
    console.error("Error al crear perfil de inversor:", error);
    throw error;
  }
};

/**
 * Servicio para generar un lead en el CRM
 * @param input - Datos del lead
 * @returns Respuesta de la API
 */
export const generateLeadInCRMService = async (
  input: CreateLeadInput
) => {
  try {
    // Validar los datos de entrada
    const validatedInput = CreateLeadInputSchema.parse(input);

    let project = undefined;
    
    // Si hay projectId, obtener el nombre del proyecto
    if (validatedInput.projectId) {
      try {
        // Importar dinámicamente para evitar dependencias circulares
        const { getProjectByIdService } = await import("@/services/projectService");
        const resp = await getProjectByIdService(validatedInput.projectId);
        if (resp && typeof resp === 'object' && 'name' in resp) {
          project = CapitalizeWords(String(resp.name));
        }
      } catch (error) {
        console.warn("No se pudo obtener el proyecto:", error);
      }
    }

    // Preparar el payload
    const payload = {
      firstName: validatedInput.name,
      phone: validatedInput.phone,
      email: validatedInput.email,
      leadOrigin: validatedInput.leadOrigin,
      origin: validatedInput.origin,
      project,
      status: "Interesado",
      utmSource: validatedInput.utmSource,
      utmMedium: validatedInput.utmMedium,
      utmCampaign: validatedInput.utmCampaign,
      utmTerm: validatedInput.utmTerm,
      utmContent: validatedInput.utmContent,
    };

    // Hacer la petición a la API
    const response = await api.post(
      `/api/sheets/upsertLead`,
      payload
    );

    return {
      success: true,
      message: "Lead creado exitosamente en el CRM",
      data: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error al generar lead en CRM:", error.response?.data);
      throw new Error(
        error.response?.data?.message || "Error al generar el lead en el CRM"
      );
    }
    console.error("Error al generar lead en CRM:", error);
    throw error;
  }
};

/**
 * Servicio para crear un contacto en Quiiven desde el formulario
 * @param input - Datos del contacto
 * @returns Respuesta del webhook
 */
export const createContactInFormQuiivenService = async (
  input: QuiivenFormContactInput
) => {
  try {
    // Validar los datos de entrada
    const validatedInput = QuiivenFormContactInputSchema.parse(input);

    // Preparar el payload
    const payload = {
      countryPhoneCode: validatedInput.countryPhoneCode,
      email: validatedInput.email,
      firstName: validatedInput.firstName,
      lastName: validatedInput.lastName,
      origin: validatedInput.origin,
      leadOrigin: validatedInput.leadOrigin,
      phone: validatedInput.phone,
      projectNames: validatedInput.projectNames,
      utmSource: validatedInput.utmSource,
      utmMedium: validatedInput.utmMedium,
      utmCampaign: validatedInput.utmCampaign,
      utmTerm: validatedInput.utmTerm,
      utmContent: validatedInput.utmContent,
    };

    // Hacer la petición al webhook de n8n
    const response = await api.post(
      "https://lokl.app.n8n.cloud/webhook/loklnidodeagua",
      payload
    );

    return {
      success: true,
      message: "Contacto creado exitosamente en Quiiven",
      data: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error al crear contacto en Quiiven:", error.response?.data);
      throw new Error(
        error.response?.data?.message || "Error al crear el contacto en Quiiven"
      );
    }
    console.error("Error al crear contacto en Quiiven:", error);
    throw error;
  }
};

