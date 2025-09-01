import { urls } from "@/config/urls";
import axios from "axios";

// ⚡ función para armar headers dinámicos
const getHeaders = (isNeedToken: boolean) => {
  const token = "useAuthStore.getState().token;" // TODO: Bring token

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (isNeedToken && token) {
    headers.Authorization = `Bearer ${token}`;
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
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      /* removeToken(); */
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
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      /* removeToken(); */
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
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      /* removeToken(); */
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
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      /* removeToken(); */
    }
    throw error;
  }
};
