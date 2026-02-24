/**
 * Formatea la próxima fecha (14 días desde hoy) en formato DD/MM/YYYY
 * @returns string con la fecha formateada
 */
export const formatNextDate = (): string => {
  const today = new Date();
  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + 14);
  
  const day = String(nextDate.getDate()).padStart(2, '0');
  const month = String(nextDate.getMonth() + 1).padStart(2, '0');
  const year = nextDate.getFullYear();
  
  return `${day}/${month}/${year}`;
};

/**
 * Formatea una fecha en formato DD/MM/YYYY
 * @param date - Fecha a formatear
 * @returns string con la fecha formateada
 */
export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
};

/**
 * Formatea un número como moneda COP
 * @param amount - Monto a formatear
 * @returns string con el monto formateado
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Desplaza suavemente a una sección de la página
 * @param sectionId - ID de la sección a la que desplazarse
 * @param distance - Distancia adicional desde el top (default: 0)
 */
export const scrollToSection = (sectionId: string, distance: number = 0): void => {
  const element = document.getElementById(sectionId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - distance;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

/**
 * Capitaliza la primera letra de un string
 * @param str - String a capitalizar
 * @returns String con la primera letra en mayúscula
 */
export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};