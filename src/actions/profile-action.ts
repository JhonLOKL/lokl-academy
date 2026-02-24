import { uploadProfilePhotoService } from "@/services/profile-service";

export const uploadProfilePhotoAction = async (file: File) => {
  try {
    const response = await uploadProfilePhotoService(file);
    return { success: true, data: response };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    return {
      success: false,
      message: errorMessage || "Error al subir la foto de perfil",
    };
  }
};
