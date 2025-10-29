import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

// Tipo para las opciones del dropdown
export type OptionType = {
  label: string;
  value: string;
  children?: OptionType[];
};

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

// Opciones para "Cómo nos conociste" - Dropdown anidado
export const howDidYouHearAboutUsOptions: OptionType[] = [
  {
    label: "Redes sociales",
    value: "redes_sociales",
    children: [
      { label: "Instagram", value: "instagram" },
      { label: "YouTube", value: "youtube" },
      { label: "LinkedIn", value: "linkedin" },
      { label: "Facebook", value: "facebook" },
      { label: "TikTok", value: "tiktok" },
    ],
  },
  {
    label: "Anuncio o publicidad",
    value: "anuncio_publicidad",
    children: [
      { label: "Instagram", value: "ad_instagram" },
      { label: "YouTube", value: "ad_youtube" },
      { label: "Google", value: "ad_google" },
      { label: "Facebook", value: "ad_facebook" },
      { label: "TikTok", value: "ad_tiktok" },
    ],
  },
  {
    label: "Creador de contenido",
    value: "creador_contenido",
    children: [
      { label: "Nicolás Abril", value: "nicolas_abril" },
      { label: "Mis propias finanzas", value: "mis_propias_finanzas" },
    ],
  },
  {
    label: "Búsqueda Google",
    value: "busqueda_google",
  },
  {
    label: "Referido",
    value: "referido",
    children: [
      { label: "Amigo", value: "referido_amigo" },
      { label: "Familiar", value: "referido_familiar" },
      { label: "Conocido", value: "referido_conocido" },
    ],
  },
  {
    label: "Alianza o Beneficio",
    value: "alianza_beneficio",
  },
  {
    label: "Embajador Lokl",
    value: "embajador_lokl",
  },
  {
    label: "Evento Presencial",
    value: "evento_presencial",
  },
  {
    label: "Evento Digital",
    value: "evento_digital",
  },
  {
    label: "Correo Electrónico",
    value: "correo_electronico",
  },
  {
    label: "Otro",
    value: "otro",
  },
];

