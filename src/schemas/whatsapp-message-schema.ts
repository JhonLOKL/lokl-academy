import { z } from "zod";

// Schema para los datos de entrada del mensaje de WhatsApp
export const WhatsAppMessageInputSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  projectId: z.string().min(1, "El ID del proyecto es requerido"),
  email: z.string().email("Email inválido"),
  numberToSend: z.string().min(1, "El número de teléfono es requerido"),
});

export type WhatsAppMessageInput = z.infer<typeof WhatsAppMessageInputSchema>;

// Schema para la respuesta de la API
export const WhatsAppMessageResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
});

export type WhatsAppMessageResponse = z.infer<typeof WhatsAppMessageResponseSchema>;

// Schema para la respuesta del servicio/action
export const WhatsAppActionResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  error: z.string().optional(),
  skipped: z.boolean().optional(), // Para indicar si se saltó por el límite de 24h
});

export type WhatsAppActionResponse = z.infer<typeof WhatsAppActionResponseSchema>;

