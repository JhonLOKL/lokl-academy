import { z } from "zod";

// Schema para parámetros UTM (opcionales)
const UtmParamsSchema = {
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmTerm: z.string().optional(),
  utmContent: z.string().optional(),
};

// Schema para guardar simulación (usuario no autenticado)
export const SaveSimulationGuestSchema = z.object({
  countryCodePhone: z.string(),
  email: z.string().email(),
  installments: z.number().int().positive(),
  investmentValue: z.number().positive(),
  leadOrigin: z.string(),
  name: z.string(),
  phone: z.string(),
  projectId: z.string().uuid(),
  simulator: z.string(),
  termsAccepted: z.boolean(),
  unitsQuantity: z.number().positive(),
  ...UtmParamsSchema, // Agregar parámetros UTM opcionales
});

// Schema para guardar simulación (usuario autenticado)
export const SaveSimulationAuthSchema = z.object({
  email: z.string().email(),
  installments: z.number().int().positive(),
  investmentValue: z.number().positive(),
  name: z.string(),
  projectId: z.string().uuid(),
  simulator: z.string(),
  termsAccepted: z.boolean(),
  unitsQuantity: z.number().positive(),
  ...UtmParamsSchema, // Agregar parámetros UTM opcionales
});

// Schema unificado para input (puede ser cualquiera de los dos)
export const SaveSimulationInputSchema = z.union([
  SaveSimulationGuestSchema,
  SaveSimulationAuthSchema,
]);

export type SaveSimulationGuest = z.infer<typeof SaveSimulationGuestSchema>;
export type SaveSimulationAuth = z.infer<typeof SaveSimulationAuthSchema>;
export type SaveSimulationInput = z.infer<typeof SaveSimulationInputSchema>;

// Schema para la respuesta de la API
export const SaveSimulationApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    simulationId: z.string().optional(),
  }).optional(),
});

export type SaveSimulationApiResponse = z.infer<typeof SaveSimulationApiResponseSchema>;

// Schema para la respuesta del servicio/action
export const SaveSimulationResponseSchema = z.object({
  success: z.boolean(),
  simulationId: z.string().nullable(),
  error: z.string().optional(),
});

export type SaveSimulationResponse = z.infer<typeof SaveSimulationResponseSchema>;

