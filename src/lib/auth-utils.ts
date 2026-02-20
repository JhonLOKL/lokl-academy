import { useAuthStore } from "@/store/auth-store";
// import { validateToken } from "@/schemas/api-schema";

/**
 * Verifica si el usuario está autenticado con un token válido
 * @returns {boolean} true si el usuario está autenticado con un token válido, false en caso contrario
 */
export const isAuthenticated = (): boolean => {
  const user = useAuthStore.getState().user;
  
  if (!user) return false;
  
  // Asumimos que si hay usuario en el store, estamos autenticados.
  // El backend rechazará peticiones con 401 si la cookie es inválida/expirada,
  // lo que disparará el logout en el interceptor de axios.
  return true;
};

/**
 * Obtiene el token actual si es válido
 * @returns {string | null} El token si es válido, null en caso contrario
 * @deprecated Ya no tenemos acceso al token porque se usa cookie HttpOnly.
 */
export const getValidToken = (): string | null => {
  // Retornamos null porque ya no hay token accesible
  return null;
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

// ==============================================
// Redirección post-login
// ==============================================
const POST_LOGIN_REDIRECT_KEY = "lokl_post_login_redirect_path";

export const setPostLoginRedirect = (path: string) => {
  try {
    if (typeof window !== "undefined" && path) {
      localStorage.setItem(POST_LOGIN_REDIRECT_KEY, path);
    }
  } catch {
    // noop
  }
};

export const getPostLoginRedirect = (): string | null => {
  try {
    if (typeof window !== "undefined") {
      return localStorage.getItem(POST_LOGIN_REDIRECT_KEY);
    }
  } catch {
    // noop
  }
  return null;
};

export const consumePostLoginRedirect = (): string | null => {
  const path = getPostLoginRedirect();
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem(POST_LOGIN_REDIRECT_KEY);
    }
  } catch {
    // noop
  }
  return path;
};

/**
 * Si no hay sesión, guarda el destino y redirige a login.
 * Retorna true si autenticado, false si se redirigió.
 */
export const ensureLoginOrRedirect = (
  targetPath: string,
  redirectFn: (path: string) => void
): boolean => {
  if (!isAuthenticated()) {
    setPostLoginRedirect(targetPath);
    redirectFn("/login");
    return false;
  }
  return true;
};
