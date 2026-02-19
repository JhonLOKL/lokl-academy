export interface SurveyResponse {
  question: string;
  answer: string;
}

export interface SatisfactionSurveyInput {
  email: string;
  phone: string;
  responses: SurveyResponse[];
}

export interface SatisfactionSurveyResponse {
  success: boolean;
  data?: {
    id?: string;
    message?: string;
  };
  error?: string;
}
