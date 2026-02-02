import { postApi } from "@/schemas/api-schema";
import { SatisfactionSurveyInput } from "@/schemas/satisfaction-survey-schema";

export const submitSatisfactionSurveyService = async (
  data: SatisfactionSurveyInput
) => {
  try {
    const response = await postApi(`/api/satisfaction-survey/`, data, false);
    return response;
  } catch (error) {
    throw error;
  }
};
