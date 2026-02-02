import { submitSatisfactionSurveyService } from "@/services/SatisfactionSurvey-service";
import {
  SatisfactionSurveyInput,
  SatisfactionSurveyResponse,
} from "@/schemas/satisfaction-survey-schema";

export const submitSatisfactionSurveyAction = async (
  input: SatisfactionSurveyInput
): Promise<SatisfactionSurveyResponse> => {
  try {
    const data = await submitSatisfactionSurveyService(input);

    return {
      success: true,
      data: {
        id: data?.id,
        message: data?.message || "Encuesta enviada exitosamente",
      },
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al enviar la encuesta de satisfacción.";

    console.error("Error al enviar la encuesta:", error);

    return {
      success: false,
      error: errorMessage,
    };
  }
};
