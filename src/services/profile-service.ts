import axios from "axios";
import api from "@/lib/axios-config";
import { urls } from "@/config/urls";
import { useAuthStore } from "@/store/auth-store";

export interface UploadPhotoResponse {
  success: boolean;
  message?: string;
  profilePhotoUrl?: string; // Ajustar según respuesta real del backend
  data?: {
      profilePhotoUrl?: string;
  };
}

export const uploadProfilePhotoService = async (file: File): Promise<UploadPhotoResponse> => {
  try {
    const formData = new FormData();
    formData.append('imagen', file);

    const token = useAuthStore.getState().token;
    const headers: Record<string, string> = {
        'Content-Type': 'multipart/form-data',
    };
    
    // Incluir token si existe, por compatibilidad
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    // La URL base suele terminar sin slash, o el endpoint empieza con slash. 
    // Ajustar según convención del proyecto. 
    // api-schema usa urls.URL_BASE_PATH + siteUrl
    console.log()
    const response = await api.post(`${urls.URL_BASE_PATH}/api/profile/uploadProfilePhoto`, formData, {
        headers,
        withCredentials: true,
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        console.error("Error en uploadProfilePhotoService:", error.response?.data);
        throw new Error(error.response?.data?.message || "Error al subir la imagen");
    }
    console.error("Error desconocido al subir foto:", error);
    throw error;
  }
};
