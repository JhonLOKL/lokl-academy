import {
  createInvestorProfileService,
  generateLeadInCRMService,
  createContactInFormQuiivenService,
} from "@/services/discoveryourinvestorprofile-service";
import {
  InvestorProfileInput,
  InvestorProfileResponse,
  CreateLeadInput,
  CreateLeadResponse,
  QuiivenFormContactInput,
  QuiivenFormContactResponse,
} from "@/schemas/investor-profile-schema";

/**
 * Action para crear un perfil de inversor
 * @param input - Datos del perfil de inversor
 * @returns Respuesta de la operación
 */
export const createInvestorProfileAction = async (
  input: InvestorProfileInput
): Promise<InvestorProfileResponse> => {
  try {
    const response = await createInvestorProfileService(input);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al crear el perfil de inversor.";

    console.error("Error en createInvestorProfileAction:", error);

    return {
      success: false,
      error: errorMessage,
    };
  }
};

/**
 * Action para generar un lead en el CRM
 * @param input - Datos del lead
 * @returns Respuesta de la operación
 */
export const generateLeadInCRMAction = async (
  input: CreateLeadInput
): Promise<CreateLeadResponse> => {
  try {
    const response = await generateLeadInCRMService(input);

    return {
      success: true,
      message: response.message,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al generar el lead en el CRM.";

    console.error("Error en generateLeadInCRMAction:", error);

    return {
      success: false,
      error: errorMessage,
    };
  }
};

/**
 * Action para crear un contacto en Quiiven desde el formulario
 * @param input - Datos del contacto
 * @returns Respuesta de la operación
 */
export const createContactInFormQuiivenAction = async (
  input: QuiivenFormContactInput
): Promise<QuiivenFormContactResponse> => {
  try {
    const response = await createContactInFormQuiivenService(input);

    return {
      success: true,
      message: response.message,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al crear el contacto en Quiiven.";

    console.error("Error en createContactInFormQuiivenAction:", error);

    return {
      success: false,
      error: errorMessage,
    };
  }
};

