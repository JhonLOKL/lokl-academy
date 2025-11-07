import { createSimulationService, saveSimulationService, createQuiivenContactService, sendFirstMessageService } from "@/services/simulator-service";
import {
  SimulationInput,
  SimulationResponse,
} from "@/schemas/simulator-schema";
import {
  SaveSimulationInput,
  SaveSimulationResponse,
} from "@/schemas/save-simulation-schema";
import {
  QuiivenContactInput,
  QuiivenActionResponse,
} from "@/schemas/quiiven-schema";
import {
  WhatsAppMessageInput,
  WhatsAppActionResponse,
} from "@/schemas/whatsapp-message-schema";

export const createSimulationAction = async (
  input: SimulationInput
): Promise<SimulationResponse> => {
  try {
    const data = await createSimulationService(input);

    return {
      success: true,
      data,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al crear la simulación.";

    console.error("Error al crear la simulación:", error);

    return {
      success: false,
      data: null,
      error: errorMessage,
    };
  }
};

export const saveSimulationAction = async (
  input: SaveSimulationInput,
  isAuthenticated: boolean
): Promise<SaveSimulationResponse> => {
  try {
    const simulationId = await saveSimulationService(input, isAuthenticated);

    return {
      success: true,
      simulationId,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al guardar la simulación.";

    console.error("Error al guardar la simulación:", error);

    return {
      success: false,
      simulationId: null,
      error: errorMessage,
    };
  }
};

/**
 * Action para crear un contacto en Quiiven
 * @param input - Datos del contacto
 * @returns Respuesta de la operación
 */
export const createQuiivenContactAction = async (
  input: QuiivenContactInput
): Promise<QuiivenActionResponse> => {
  try {
    const response = await createQuiivenContactService(input);

    return {
      success: true,
      message: response.message,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al crear el contacto en Quiiven.";

    console.error("Error en createQuiivenContactAction:", error);

    return {
      success: false,
      error: errorMessage,
    };
  }
};

/**
 * Action para enviar el primer mensaje de WhatsApp con imagen
 * Incluye lógica para evitar contactar al mismo lead más de una vez al día
 * @param input - Datos del mensaje (nombre, proyecto, email, teléfono)
 * @returns Respuesta de la operación
 */
export const sendFirstMessageAction = async (
  input: WhatsAppMessageInput
): Promise<WhatsAppActionResponse> => {
  try {
    // Verificar si ya se contactó al lead en las últimas 24 horas
    const lastContact = typeof window !== 'undefined' 
      ? localStorage.getItem("lastContactByLaura") 
      : null;

    if (lastContact) {
      const lastContactDate = new Date(lastContact);
      const now = new Date();
      const hoursDiff = (now.getTime() - lastContactDate.getTime()) / (1000 * 60 * 60);

      // Si han pasado menos de 24 horas, no enviar el mensaje
      if (hoursDiff < 24) {
        console.log(
          `⏱️ Ya se contactó a esta persona hace ${hoursDiff.toFixed(1)} horas. ` +
          `Se requieren 24 horas entre contactos. Último contacto: ${lastContactDate.toISOString()}`
        );
        
        return {
          success: true,
          skipped: true,
          message: `Ya se contactó a esta persona hace ${hoursDiff.toFixed(1)} horas. Se requieren 24 horas entre contactos.`,
        };
      }
    }

    // Si no existe lastContact o han pasado más de 24 horas, enviar el mensaje
    console.log('📱 Enviando primer mensaje de WhatsApp:', input);
    const response = await sendFirstMessageService(input);

    // Guardar la fecha actual en localStorage
    if (typeof window !== 'undefined') {
      const now = new Date();
      localStorage.setItem("lastContactByLaura", now.toISOString());
      console.log('✅ Mensaje enviado y fecha guardada:', now.toISOString());
    }

    return {
      success: true,
      message: response.message,
      skipped: false,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al enviar el mensaje de WhatsApp.";

    console.error("❌ Error en sendFirstMessageAction:", error);

    return {
      success: false,
      error: errorMessage,
      skipped: false,
    };
  }
};
