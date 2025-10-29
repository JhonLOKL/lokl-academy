import { parsePhoneNumber } from "react-phone-number-input";

/**
 * Extrae información del número de teléfono en formato internacional
 * @param phoneNumber - Número en formato internacional (ej: "+573001234567")
 * @returns Objeto con código de país y número sin código
 */
export function parsePhoneData(phoneNumber: string) {
  try {
    const parsed = parsePhoneNumber(phoneNumber);
    
    if (parsed) {
      return {
        fullPhone: phoneNumber,
        countryCode: `+${parsed.countryCallingCode}`,
        phoneNumber: parsed.nationalNumber,
        country: parsed.country,
        isValid: parsed.isValid(),
      };
    }
  } catch (error) {
    console.error("Error parsing phone number:", error);
  }

  // Fallback si no se puede parsear
  return {
    fullPhone: phoneNumber,
    countryCode: phoneNumber.split(' ')[0] || phoneNumber.substring(0, 3),
    phoneNumber: phoneNumber.replace(/^\+\d+\s*/, ''),
    country: undefined,
    isValid: false,
  };
}

