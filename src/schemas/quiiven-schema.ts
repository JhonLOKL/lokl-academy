import { z } from "zod";

// Schema para los datos de entrada del contacto de Quiiven
export const QuiivenContactInputSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Email inválido").optional().default(""),
  investmentValue: z.string().min(1, "El valor de inversión es requerido"),
  shares: z.number().int().positive("El número de acciones debe ser positivo"),
  numberInstallments: z.number().int().min(0, "El número de cuotas no puede ser negativo"),
  phone: z.string().optional().default(""),
  termsAccepted: z.boolean().optional().default(false),
  leadOrigin: z.string().optional().default(""),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmTerm: z.string().optional(),
  utmContent: z.string().optional(),
});

export type QuiivenContactInput = z.infer<typeof QuiivenContactInputSchema>;

// Schema para la respuesta del webhook de Quiiven
export const QuiivenContactResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
});

export type QuiivenContactResponse = z.infer<typeof QuiivenContactResponseSchema>;

// Schema para la respuesta del servicio/action
export const QuiivenActionResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  error: z.string().optional(),
});

export type QuiivenActionResponse = z.infer<typeof QuiivenActionResponseSchema>;

