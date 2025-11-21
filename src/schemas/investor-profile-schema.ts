import { z } from "zod";

// Schema para los scores del test de perfil de inversor
export const InvestorScoresSchema = z.object({
  NOVICE: z.number(),
  DREAMER: z.number(),
  EXPERT: z.number(),
  VISIONARY: z.number(),
  totalPoints: z.number(),
});

export type InvestorScores = z.infer<typeof InvestorScoresSchema>;

// Schema para los datos de entrada del perfil de inversor
export const InvestorProfileInputSchema = z.object({
  firstName: z.string().min(1, "El nombre es requerido"),
  lastName: z.string().min(1, "El apellido es requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(1, "El teléfono es requerido"),
  investorProfile: z.string().min(1, "El perfil de inversor es requerido"),
  scores: InvestorScoresSchema,
  testResponses: z.any(), // Puede ser cualquier estructura de respuestas
  testVersion: z.string().min(1, "La versión del test es requerida"),
});

export type InvestorProfileInput = z.infer<typeof InvestorProfileInputSchema>;

// Schema para la respuesta de la API
export const InvestorProfileApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z.any().optional(),
});

export type InvestorProfileApiResponse = z.infer<typeof InvestorProfileApiResponseSchema>;

// Schema para la respuesta del servicio/action
export const InvestorProfileResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
});

export type InvestorProfileResponse = z.infer<typeof InvestorProfileResponseSchema>;

// Schema para crear un lead en el CRM
export const CreateLeadInputSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  investment: z.string().optional(),
  shares: z.number().int().optional(),
  numberInstallments: z.number().int().optional(),
  phone: z.string().min(1, "El teléfono es requerido"),
  termsAccepted: z.boolean().optional().default(false),
  leadOrigin: z.string().min(1, "El origen del lead es requerido"),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmTerm: z.string().optional(),
  utmContent: z.string().optional(),
  projectId: z.string().optional(),
  origin: z.string().optional(),
});

export type CreateLeadInput = z.infer<typeof CreateLeadInputSchema>;

// Schema para la respuesta del CRM
export const CreateLeadResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  error: z.string().optional(),
});

export type CreateLeadResponse = z.infer<typeof CreateLeadResponseSchema>;

// Schema para crear contacto en Quiiven desde el formulario
export const QuiivenFormContactInputSchema = z.object({
  countryPhoneCode: z.string().optional(),
  email: z.string().email("Email inválido"),
  firstName: z.string().min(1, "El nombre es requerido"),
  lastName: z.string().min(1, "El apellido es requerido"),
  origin: z.string().optional(),
  leadOrigin: z.string().optional(),
  phone: z.string().min(1, "El teléfono es requerido"),
  projectNames: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmTerm: z.string().optional(),
  utmContent: z.string().optional(),
});

export type QuiivenFormContactInput = z.infer<typeof QuiivenFormContactInputSchema>;

// Schema para la respuesta de Quiiven
export const QuiivenFormContactResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  error: z.string().optional(),
});

export type QuiivenFormContactResponse = z.infer<typeof QuiivenFormContactResponseSchema>;

