import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

// Schema para el formulario de captura de leads
export const LeadFormSchema = z.object({
  firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  phone: z.string()
    .min(1, "El número de teléfono es requerido")
    .refine((value) => {
      // Validar usando la librería react-phone-number-input
      return isValidPhoneNumber(value);
    }, "Número de teléfono inválido"),
  howDidYouHearAboutUs: z.string().min(1, "Selecciona una opción"),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar los términos y condiciones",
  }),
});

export type LeadFormData = z.infer<typeof LeadFormSchema>;

// Opciones para "Cómo nos conociste"
export const HOW_DID_YOU_HEAR_OPTIONS = [
  { value: "redes_sociales", label: "Redes Sociales" },
  { value: "google", label: "Búsqueda en Google" },
  { value: "recomendacion", label: "Recomendación de un amigo" },
  { value: "publicidad", label: "Publicidad" },
  { value: "eventos", label: "Eventos" },
  { value: "otro", label: "Otro" },
] as const;

