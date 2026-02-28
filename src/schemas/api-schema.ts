import { urls } from "@/config/urls";
import api from "@/lib/axios-config";
import { useAuthStore } from "@/store/auth-store";

// Función para validar si el token está activo y no expirado
// Deprecado: La validación ahora se maneja por cookies en el backend.
// Se mantiene por compatibilidad pero siempre retorna true.
export const validateToken = (): boolean => {
  return true;
};

// ⚡ función para armar headers dinámicos
const getHeaders = (isNeedToken: boolean) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // El token ya no se envía en los headers por defecto, se usa cookie HttpOnly
  // Sin embargo, si hay un token en el store (fallback), lo enviamos
  if (isNeedToken) {
    const token = useAuthStore.getState().token;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }
  
  return headers;
};

// =======================
// GET
// NOTA: El manejo de errores 401/403 se hace SOLO en el interceptor global
// de axios-config.ts para evitar llamadas duplicadas a logout().
// =======================
export const getApi = async (siteUrl: string, isNeedToken = false) => {
  const response = await api.get(urls.URL_BASE_PATH + siteUrl, {
    headers: getHeaders(isNeedToken),
    withCredentials: true,
  });
  return response.data;
};

// =======================
// POST
// =======================
export const postApi = async (
  siteUrl: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any = {},
  isNeedToken = false
) => {
  const response = await api.post(urls.URL_BASE_PATH + siteUrl, body, {
    headers: getHeaders(isNeedToken),
    withCredentials: true,
  });
  return response.data;
};

// =======================
// PUT
// =======================
export const putApi = async (
  siteUrl: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any = {},
  isNeedToken = false
) => {
  const response = await api.put(urls.URL_BASE_PATH + siteUrl, body, {
    headers: getHeaders(isNeedToken),
    withCredentials: true,
  });
  return response.data;
};

// =======================
// PATCH
// =======================
export const patchApi = async (
  siteUrl: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any = {},
  isNeedToken = false
) => {
  const response = await api.patch(urls.URL_BASE_PATH + siteUrl, body, {
    headers: getHeaders(isNeedToken),
    withCredentials: true,
  });
  return response.data;
};
