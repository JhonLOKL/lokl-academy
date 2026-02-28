import axios from "axios";
import api from "@/lib/axios-config";
import { postApi } from "@/schemas/api-schema";
import {
  SimulationInput,
  SimulationData,
  SimulationApiResponseSchema,
} from "@/schemas/simulator-schema";
import {
  SaveSimulationInput,
  SaveSimulationApiResponseSchema,
} from "@/schemas/save-simulation-schema";
import {
  QuiivenContactInput,
  QuiivenContactInputSchema,
} from "@/schemas/quiiven-schema";
import {
  WhatsAppMessageInput,
  WhatsAppMessageInputSchema,
} from "@/schemas/whatsapp-message-schema";
import { urls } from "@/config/urls";

export const createSimulationService = async (
  input: SimulationInput
): Promise<SimulationData> => {
  try {
    const url = `/api/simulator/createSimulation`;
    const response = await postApi(url, input, false);

    // Validar y parsear la respuesta con el schema
    const validatedResponse = SimulationApiResponseSchema.parse(response);

    if (!validatedResponse.success) {
      throw new Error(validatedResponse.message || "Error al crear la simulación");
    }

    return validatedResponse.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error en la API de simulación:", error.response?.data);
      throw new Error(
        error.response?.data?.message || "Error al crear la simulación"
      );
    }
    console.error("Error al validar la simulación:", error);
    throw error;
  }
};

export const saveSimulationService = async (
  input: SaveSimulationInput,
  isAuthenticated: boolean
): Promise<string | null> => {
  try {
    const url = `/api/simulator/saveSimulation`;
    const response = await postApi(url, input, isAuthenticated);

    // Validar y parsear la respuesta con el schema
    const validatedResponse = SaveSimulationApiResponseSchema.parse(response);

    if (!validatedResponse.success) {
      throw new Error(validatedResponse.message || "Error al guardar la simulación");
    }

    return validatedResponse.data?.simulationId || null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error en la API al guardar simulación:", error.response?.data);
      throw new Error(
        error.response?.data?.message || "Error al guardar la simulación"
      );
    }
    console.error("Error al validar respuesta de guardado:", error);
    throw error;
  }
};

/**
 * Servicio para crear un contacto en Quiiven a través del webhook de n8n
 * @param input - Datos del contacto
 * @returns Respuesta del webhook
 */
export const createQuiivenContactService = async (
  input: QuiivenContactInput
) => {
  try {
    // Validar los datos de entrada
    const validatedInput = QuiivenContactInputSchema.parse(input);

    // Crear la fecha con el formato requerido
    const date = new Date();
    const offset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() - offset);
    const createdAt = localDate.toISOString().replace("T", " ").replace("Z", "");

    // Preparar el payload para el webhook
    const payload = {
      name: validatedInput.name,
      email: validatedInput.email,
      investmentValue: validatedInput.investmentValue,
      shares: validatedInput.shares,
      numberInstallments: validatedInput.numberInstallments,
      phone: validatedInput.phone,
      leadOrigin: validatedInput.leadOrigin,
      createdAt,
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
      console.error("Error en el webhook de Quiiven:", error.response?.data);
      throw new Error(
        error.response?.data?.message || "Error al crear el contacto en Quiiven"
      );
    }
    console.error("Error al crear contacto en Quiiven:", error);
    throw error;
  }
};

/**
 * Servicio para enviar el primer mensaje de WhatsApp con imagen
 * @param input - Datos del mensaje (nombre, proyecto, email, teléfono)
 * @returns Respuesta del servicio de chat
 */
export const sendFirstMessageService = async (
  input: WhatsAppMessageInput
) => {
  try {
    // Validar los datos de entrada
    const validatedInput = WhatsAppMessageInputSchema.parse(input);

    // Preparar el payload
    const payload = {
      name: validatedInput.name,
      projectId: validatedInput.projectId,
      email: validatedInput.email,
      numberToSend: validatedInput.numberToSend,
    };

    // Hacer la petición a la API de chat
    const response = await api.post(
      `${urls.NEW_API_URL}chat/sendMessageWithImage`,
      payload
    );

    return {
      success: true,
      message: "Mensaje enviado exitosamente",
      data: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error al enviar mensaje de WhatsApp:", error.response?.data);
      throw new Error(
        error.response?.data?.message || "Error al enviar el mensaje de WhatsApp"
      );
    }
    console.error("Error al enviar mensaje de WhatsApp:", error);
    throw error;
  }
};
