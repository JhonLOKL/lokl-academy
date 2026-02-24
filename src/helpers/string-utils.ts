/**
 * Capitaliza la primera letra de un string
 * @param str - String a capitalizar
 * @returns String con la primera letra en mayúscula
 */
export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
