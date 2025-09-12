import { urls } from "@/config/urls";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useAuthStore } from "@/store/auth-store";

// Función para validar si el token está activo y no expirado
export const validateToken = (): boolean => {
  const token = useAuthStore.getState().token;
  const logout = useAuthStore.getState().logout;
  
  if (!token) return false;
  
  try {
    const payload = jwt.decode(token) as { exp: number } | null;
    
    if (!payload || !payload.exp) {
      console.error('Token inválido o sin fecha de expiración');
      logout();
      return false;
    }
    
    const isExpired = Date.now() >= payload.exp * 1000;
    
    if (isExpired) {
      console.log('Token expirado, cerrando sesión');
      logout();
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    logout();
    return false;
  }
};

// ⚡ función para armar headers dinámicos
const getHeaders = (isNeedToken: boolean) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (isNeedToken) {
    const token = useAuthStore.getState().token;
    if (token && validateToken()) {
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
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
      useAuthStore.getState().logout();
    }
    throw error;
  }
};
