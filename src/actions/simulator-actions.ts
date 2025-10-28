import { createSimulationService, saveSimulationService } from "@/services/simulator-service";
import {
  SimulationInput,
  SimulationResponse,
} from "@/schemas/simulator-schema";
import {
  SaveSimulationInput,
  SaveSimulationResponse,
} from "@/schemas/save-simulation-schema";

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

