import { urls } from "@/config/urls";
import axios from "axios";
// import jwt from "jsonwebtoken";
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
// =======================
export const getApi = async (siteUrl: string, isNeedToken = false) => {
  try {
    const response = await axios.get(urls.URL_BASE_PATH + siteUrl, {
      headers: getHeaders(isNeedToken),
      withCredentials: true, // Habilitar envío de cookies
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
      useAuthStore.getState().logout();
    }
    throw error;
  }
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
  try {
    const response = await axios.post(urls.URL_BASE_PATH + siteUrl, body, {
      headers: getHeaders(isNeedToken),
      withCredentials: true, // Habilitar envío de cookies
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
      useAuthStore.getState().logout();
    }
    throw error;
  }
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
  try {
    const response = await axios.put(urls.URL_BASE_PATH + siteUrl, body, {
      headers: getHeaders(isNeedToken),
      withCredentials: true, // Habilitar envío de cookies
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
      useAuthStore.getState().logout();
    }
    throw error;
  }
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
  try {
    const response = await axios.patch(urls.URL_BASE_PATH + siteUrl, body, {
      headers: getHeaders(isNeedToken),
      withCredentials: true, // Habilitar envío de cookies
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
      useAuthStore.getState().logout();
    }
    throw error;
  }
};
