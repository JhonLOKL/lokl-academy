import { uploadProfilePhotoService } from "@/services/profile-service";

export const uploadProfilePhotoAction = async (file: File) => {
  try {
    const response = await uploadProfilePhotoService(file);
    return { success: true, data: response };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Error al subir la foto de perfil",
    };
  }
};
