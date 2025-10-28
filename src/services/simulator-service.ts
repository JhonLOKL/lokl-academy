import axios from "axios";
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

