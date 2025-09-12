import { useAuthStore } from "@/store/auth-store";
import { validateToken } from "@/schemas/api-schema";

/**
 * Verifica si el usuario está autenticado con un token válido
 * @returns {boolean} true si el usuario está autenticado con un token válido, false en caso contrario
 */
export const isAuthenticated = (): boolean => {
  const token = useAuthStore.getState().token;
  
  if (!token) return false;
  
  return validateToken();
};

/**
 * Obtiene el token actual si es válido
 * @returns {string | null} El token si es válido, null en caso contrario
 */
export const getValidToken = (): string | null => {
  const token = useAuthStore.getState().token;
  
  if (!token || !validateToken()) {
    return null;
  }
  
  return token;
};

/**
 * Redirige al usuario a la página de login si no está autenticado
 * @param {Function} redirectFn - Función para redirigir (normalmente router.push)
 * @param {string} redirectPath - Ruta a la que redirigir si no está autenticado
 * @returns {boolean} true si el usuario está autenticado, false si fue redirigido
 */
export const requireAuth = (
  redirectFn: (path: string) => void,
  redirectPath: string = "/login"
): boolean => {
  if (!isAuthenticated()) {
    redirectFn(redirectPath);
    return false;
  }
  
  return true;
};
